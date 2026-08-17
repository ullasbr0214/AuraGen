// validate-component.js
// Checks that AI-generated JSX actually matches what AuraGen needs before
// it's sent anywhere. Catches bad output early instead of breaking the UI.

function validateComponent(code) {
  const errors = [];

  // Rule 1: Must be a default export function (any valid component name,
  // not locked to "WizardForm" — the pipeline supports any component now).
  const exportMatch = code.match(/export\s+default\s+function\s+([A-Za-z_$][A-Za-z0-9_$]*)/);
  if (!exportMatch) {
    errors.push('Missing "export default function <ComponentName>" declaration.');
  } else {
    const componentName = exportMatch[1];
    if (!/^[A-Z]/.test(componentName)) {
      errors.push(`Component name "${componentName}" must start with a capital letter.`);
    }
  }

  // Rule 2: Must not contain leftover markdown code fences
  if (code.includes('```')) {
    errors.push('Contains leftover markdown code fences (```).');
  }

  // Rule 3: Must not be suspiciously short (likely an error or empty response)
  if (code.trim().length < 50) {
    errors.push('Generated code is too short to be a real component.');
  }

  // Rule 4: Balance check — curly braces and parens
  const openBraces = (code.match(/{/g) || []).length;
  const closeBraces = (code.match(/}/g) || []).length;
  if (openBraces !== closeBraces) {
    errors.push(`Mismatched braces: ${openBraces} open vs ${closeBraces} close — code is likely incomplete.`);
  }

  const openParens = (code.match(/\(/g) || []).length;
  const closeParens = (code.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    errors.push(`Mismatched parentheses: ${openParens} open vs ${closeParens} close.`);
  }

  // Rule 5: Should not call fetch() or any external API directly
  if (/fetch\s*\(/.test(code)) {
    errors.push('Contains a fetch() call — components should not call external APIs directly.');
  }

  // Rule 6: No imports beyond React — the sandbox only provides React + hooks
  const importLines = code.match(/^import\s.+from\s+['"].+['"];?/gm) || [];
  const disallowedImports = importLines.filter((line) => !/from\s+['"]react['"]/.test(line));
  if (disallowedImports.length > 0) {
    errors.push(`Contains disallowed imports (only React is available): ${disallowedImports.join(' | ')}`);
  }

  // Rule 7: Flag unrecognized/custom hooks (lightweight sanity check)
  const hookCalls = code.match(/\buse[A-Z][A-Za-z]*\s*\(/g) || [];
  const knownHooks = ['useState', 'useEffect', 'useRef', 'useMemo', 'useCallback', 'useContext', 'useReducer'];
  const unknownHooks = hookCalls
    .map((h) => h.replace(/\s*\($/, ''))
    .filter((h) => !knownHooks.includes(h));
  if (unknownHooks.length > 0) {
    errors.push(`Uses unrecognized/custom hooks not available in the sandbox: ${[...new Set(unknownHooks)].join(', ')}`);
  }

  // Rule 8: Must actually return JSX
  if (!/return\s*\(?\s*</.test(code)) {
    errors.push('No JSX return statement detected — component may not render anything.');
  }

  // Rule 9: Basic unclosed-tag sanity check for the outermost wrapper tag
  const firstTagMatch = code.match(/<([A-Za-z][A-Za-z0-9.]*)/);
  if (firstTagMatch) {
    const tag = firstTagMatch[1];
    const openTagCount = (code.match(new RegExp(`<${tag}[\\s>]`, 'g')) || []).length;
    const closeTagCount = (code.match(new RegExp(`</${tag}>`, 'g')) || []).length;
    const selfClosing = (code.match(new RegExp(`<${tag}[^>]*/>`, 'g')) || []).length;
    if (openTagCount - selfClosing !== closeTagCount) {
      errors.push(`Outer <${tag}> tag looks unclosed or mismatched.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = { validateComponent };