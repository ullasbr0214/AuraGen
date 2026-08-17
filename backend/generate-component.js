// generate-component.js
require('dotenv').config();
const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { SYSTEM_PROMPT } = require('./system-prompt');
const { validateComponent } = require('./validate-component');

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-flash-latest';
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1000;

const MAX_OUTPUT_TOKENS = parseInt(process.env.GEMINI_MAX_OUTPUT_TOKENS || '4096', 10);
const TEMPERATURE = parseFloat(process.env.GEMINI_TEMPERATURE || '0.4');

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: GEMINI_MODEL,
  temperature: TEMPERATURE,
  maxOutputTokens: MAX_OUTPUT_TOKENS,
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function classifyError(err) {
  const msg = (err?.message || '').toLowerCase();
  const status = err?.status || err?.response?.status;

  const isQuotaError =
    status === 429 ||
    msg.includes('quota') ||
    msg.includes('rate limit') ||
    msg.includes('resource_exhausted');

  const isTransient =
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504 ||
    msg.includes('timeout') ||
    msg.includes('econnreset') ||
    msg.includes('network') ||
    msg.includes('fetch failed');

  return { isQuotaError, isTransient };
}

function parseDelimitedResponse(raw) {
  let text = String(raw || '').trim();

  const explanationMatch = text.match(
    /---EXPLANATION---\s*([\s\S]*?)\s*---JSX---/
  );

  const jsxMatch = text.match(
    /---JSX---\s*([\s\S]*)/
  );

  let explanation = explanationMatch
    ? explanationMatch[1].trim()
    : '';

  let jsx = jsxMatch
    ? jsxMatch[1].trim()
    : text;

  // Remove Markdown code fences
  jsx = jsx
    .replace(/^```(?:jsx|tsx|javascript|js)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  if (!explanation) {
    explanation =
      'Component generated successfully by AuraGen AI.';
  }

  return {
    explanation,
    jsx,
  };
}

function computeCognitiveMetrics(telemetry = {}) {
  const hesitation = Number(telemetry.hesitation) || 0;
  const clicks = Number(telemetry.clicks) || 0;

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  const cognitiveLoad = clamp(Math.round(hesitation * 9 + clicks * 6), 0, 100);

  let stressLevel;
  if (cognitiveLoad >= 70) stressLevel = 'High';
  else if (cognitiveLoad >= 40) stressLevel = 'Medium';
  else stressLevel = 'Low';

  const focusScore = clamp(100 - Math.round(cognitiveLoad * 0.8), 0, 100);

  return { cognitiveLoad, stressLevel, focusScore };
}

async function generateComponent(userPrompt, telemetry = {}) {
  const requestStart = Date.now();
  const metrics = computeCognitiveMetrics(telemetry);

  console.log(
    `[AuraGen] Request received | prompt: "${userPrompt}" | model: ${GEMINI_MODEL} | ` +
      `temp: ${TEMPERATURE} | maxTokens: ${MAX_OUTPUT_TOKENS} | ` +
      `telemetry: hesitation=${telemetry.hesitation ?? 'n/a'}s clicks=${telemetry.clicks ?? 'n/a'} | ` +
      `metrics: load=${metrics.cognitiveLoad} stress=${metrics.stressLevel} focus=${metrics.focusScore}`
  );

  let lastError = null;

  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
    try {
      if (attempt > 1) {
        console.log(`[AuraGen] Retry attempt ${attempt - 1}/${MAX_RETRIES}...`);
      }

    console.log(`[AuraGen] Sending request to Gemini...`);

const response = await model.invoke([
  { role: 'system', content: SYSTEM_PROMPT },
  { role: 'user', content: userPrompt },
]);
      const generationTimeMs = Date.now() - requestStart;
      console.log(`[AuraGen] Gemini responded in ${generationTimeMs}ms`);

      const { explanation, jsx } = parseDelimitedResponse(response.content);

      const validation = validateComponent(jsx);
      console.log(
        `[AuraGen] Validation result: ${validation.isValid ? 'PASSED' : 'FAILED'}` +
          (validation.errors.length ? ` | issues: ${validation.errors.join(' | ')}` : '')
      );

      if (!validation.isValid) {
        return {
          success: false,
          error: `Generated component failed validation: ${validation.errors.join(' ')}`,
        };
      }

      console.log(`[AuraGen] Success | total time: ${Date.now() - requestStart}ms`);
      return {
        success: true,
        jsx,
        explanation,
        ...metrics,
      };
    } catch (err) {
      lastError = err;
      const { isQuotaError, isTransient } = classifyError(err);

      console.error(`[AuraGen] Error on attempt ${attempt}: ${err.message}`);

      if (isQuotaError) {
        return {
          success: false,
          error: 'Gemini API quota exceeded. Please wait a bit before trying again, or check the API plan limits.',
        };
      }

      const attemptsLeft = attempt <= MAX_RETRIES;
      if (isTransient && attemptsLeft) {
        await sleep(RETRY_DELAY_MS * attempt);
        continue;
      }

      break;
    }
  }

  console.error(`[AuraGen] Giving up after ${MAX_RETRIES + 1} attempt(s): ${lastError?.message}`);
  return {
    success: false,
    error: `AI generation failed: ${lastError?.message || 'Unknown error'}`,
  };
}

module.exports = { generateComponent };