function validateComponent(code) {
  const errors = [];
  const source = String(code || "").trim();

  if (!/export\s+default\s+function\s+[A-Z][A-Za-z0-9_]*/.test(source)) {
    errors.push('Missing "export default function <ComponentName>" declaration.');
  }
  if (source.includes("```")) {
    errors.push("Contains leftover markdown code fences.");
  }
  if (source.length < 80) {
    errors.push("Generated code is too short to be a real component.");
  }
  if (/\bfetch\s*\(/.test(source) || /\baxios\b/.test(source)) {
    errors.push("Generated components must not call external APIs directly.");
  }
  if (/^\s*import\s+/m.test(source)) {
    errors.push("Generated components must not contain import statements.");
  }

  const openBraces = (source.match(/{/g) || []).length;
  const closeBraces = (source.match(/}/g) || []).length;
  if (openBraces !== closeBraces) {
    errors.push(`Mismatched braces: ${openBraces} open vs ${closeBraces} close.`);
  }

  return { isValid: errors.length === 0, errors };
}

module.exports = { validateComponent };
