interface Colors {
  primary: string;
  primaryHover?: string;
  primaryActive?: string;
  onPrimary?: string;
  onPrimaryHover?: string;
  onPrimaryActive?: string;
}

export interface BrandColors {
  light: Colors & { inverse?: Colors };
  dark?: Colors & { inverse?: Colors };
}

// Utility to convert a hex colour to an rgba/hex with opacity
// (for the derived alt tokens)
function withOpacity(hex: string, opacity: number): string {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${alpha}`;
}

const DEFAULT_ALT_OPACITY = 0.8;
const DEFAULT_ALT3_OPACITY = 0.03;
const HOVER_ALT_OPACITY = 0.15;
const ACTIVE_ALT_OPACITY = 0.3;

function buildActionRules(colors: Colors, prefix: string): string[] {
  const rules: string[] = [];
  const tokenPrefix = `--mode-color-action-main-${prefix}`;

  const {
    primary,
    primaryHover,
    primaryActive,
    onPrimary,
    onPrimaryHover,
    onPrimaryActive,
  } = colors;

  rules.push(`${tokenPrefix}default: ${primary};`);
  rules.push(
    `${tokenPrefix}default-alt: ${withOpacity(primary, DEFAULT_ALT_OPACITY)};`,
  );
  rules.push(
    `${tokenPrefix}default-alt3: ${withOpacity(primary, DEFAULT_ALT3_OPACITY)};`,
  );

  if (primaryHover) {
    rules.push(`${tokenPrefix}hover: ${primaryHover};`);
    rules.push(
      `${tokenPrefix}hover-alt: ${withOpacity(primaryHover, HOVER_ALT_OPACITY)};`,
    );
    rules.push(`${tokenPrefix}default-alt2: ${primaryHover};`);
  }

  if (primaryActive) {
    rules.push(`${tokenPrefix}active: ${primaryActive};`);
    rules.push(
      `${tokenPrefix}active-alt: ${withOpacity(primaryActive, ACTIVE_ALT_OPACITY)};`,
    );
    rules.push(`${tokenPrefix}hover-alt2: ${primaryActive};`);
  }

  if (onPrimary) {
    rules.push(`${tokenPrefix}with-default: ${onPrimary};`);
    rules.push(`${tokenPrefix}with-hover: ${onPrimaryHover ?? onPrimary};`);
    rules.push(`${tokenPrefix}with-active: ${onPrimaryActive ?? onPrimary};`);
  } else {
    if (onPrimaryHover) {
      rules.push(`${tokenPrefix}with-hover: ${onPrimaryHover};`);
    }
    if (onPrimaryActive) {
      rules.push(`${tokenPrefix}with-active: ${onPrimaryActive};`);
    }
  }
  return rules;
}

export const buildOverrideTokens = (overrides: BrandColors): string => {
  const lightRules: string[] = [];
  const darkRules: string[] = [];

  const { light, dark } = overrides;

  if (light) {
    const { inverse } = light;
    lightRules.push(...buildActionRules(light, ""));
    if (inverse) {
      lightRules.push(...buildActionRules(inverse, "inverse-"));
    }
  }
  if (dark) {
    const { inverse } = dark;
    darkRules.push(...buildActionRules(dark, ""));
    if (inverse) {
      darkRules.push(...buildActionRules(inverse, "inverse-"));
    }
  }

  const darkBlock = darkRules.length
    ? `&.carbon-dark-mode, &[data-carbon-theme="dark"] { ${darkRules.join(" ")} }`
    : "";

  return [...lightRules, darkBlock].join("\n  ");
};
