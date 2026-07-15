import Logger from "../../../../__internal__/utils/logger";
import {
  normaliseHex,
  rgbToHex,
  hslToHex,
  namedColorToHex,
} from "../../../../style/utils/get-hex-value";

export interface Colors {
  /**
   * The primary brand color for the theme.
   * This is the main color used for buttons, links, and other interactive elements.
   */
  primaryBrand: string;
  /**
   * The primary brand color for the theme when hovered.
   * This is the color used for buttons, links, and other interactive elements when hovered.
   */
  primaryBrandHover?: string;
  /**
   * The primary brand color for the theme when active.
   * This is the color used for buttons, links, and other interactive elements when active.
   */
  primaryBrandActive?: string;
  /**
   * The color used for text and icons on top of the primary brand color.
   * This is typically a light color to ensure good contrast with the primary brand color.
   */
  onPrimaryBrand?: string;
  /**
   * The color used for text and icons on top of the primary brand color when hovered.
   * This is typically a light color to ensure good contrast with the primary brand color.
   */
  onPrimaryBrandHover?: string;
  /**
   * The color used for text and icons on top of the primary brand color when active.
   * This is typically a light color to ensure good contrast with the primary brand color.
   */
  onPrimaryBrandActive?: string;
}

export interface FocusColors {
  /**
   * The color of the inner focus shadow for the brand color.
   * Flips when in dark mode.
   */
  inner?: string;
  /**
   * The color of the outer focus shadow for the brand color.
   * Flips when in dark mode.
   */
  outer?: string;
  /**
   * The background color for Link focus state.
   */
  alt?: string;
}

export interface BrandOverrides {
  /**
   * The brand color overrides for light mode.
   */
  light?: Colors & { inverse?: Colors };
  /**
   * The brand color overrides for dark mode.
   */
  dark?: Colors & { inverse?: Colors };
  /**
   * The focus color overrides for the brand color.
   */
  focus?: FocusColors & { inverse?: FocusColors };
  /**
   * The font family overrides for the brand.
   * This allows customisation of the font family for different text elements within the brand.
   */
  font?: {
    family?: {
      component?: string;
      heading?: string;
      subheading?: string;
      body?: string;
      other?: string;
    };
  };
  /**
   * The border radius scale for the brand.
   * This allows customisation of the border radius for different UI elements within the brand.
   * Expected to be a string representing a number, e.g., "0.5" for 50% border radius.
   */
  borderRadiusScale?: string;
}

function withOpacity(color: string, opacity: number): string {
  const trimmed = color.trim();
  let hex = "";

  if (trimmed.startsWith("#")) {
    hex = normaliseHex(trimmed);
  } else if (trimmed.startsWith("rgb")) {
    hex = rgbToHex(trimmed);
  } else if (trimmed.startsWith("hsl")) {
    hex = hslToHex(trimmed);
  } else {
    const namedHex = namedColorToHex(trimmed);
    if (namedHex) {
      hex = namedHex;
    }
  }

  if (!hex.length) {
    Logger.warn(
      `Unable to parse color value "${trimmed}". Please provide a valid hex, rgb(a), hsl(a), or named color.`,
    );

    return trimmed;
  }

  // CSS hex alpha uses an 8-bit channel (00-FF),
  // so convert opacity from 0-1 to 0-255 before converting to hex.
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

  return `${hex}${alpha}`;
}

const DEFAULT_ALT_OPACITY = 0.8;
const DEFAULT_ALT3_OPACITY = 0.03;
const HOVER_ALT_OPACITY = 0.15;
const ACTIVE_ALT_OPACITY = 0.3;

function generateBrandColorTokens(colors: Colors, prefix: string): string[] {
  const rules: string[] = [];
  const tokenPrefix = `--mode-color-action-main-${prefix}`;

  const {
    primaryBrand,
    primaryBrandHover,
    primaryBrandActive,
    onPrimaryBrand,
    onPrimaryBrandHover,
    onPrimaryBrandActive,
  } = colors;

  rules.push(`${tokenPrefix}default: ${primaryBrand};`);
  rules.push(
    `${tokenPrefix}default-alt: ${withOpacity(primaryBrand, DEFAULT_ALT_OPACITY)};`,
  );
  rules.push(
    `${tokenPrefix}default-alt3: ${withOpacity(primaryBrand, DEFAULT_ALT3_OPACITY)};`,
  );

  if (primaryBrandHover) {
    rules.push(`${tokenPrefix}hover: ${primaryBrandHover};`);
    rules.push(
      `${tokenPrefix}hover-alt: ${withOpacity(primaryBrandHover, HOVER_ALT_OPACITY)};`,
    );
    rules.push(`${tokenPrefix}default-alt2: ${primaryBrandHover};`);
  }

  if (primaryBrandActive) {
    rules.push(`${tokenPrefix}active: ${primaryBrandActive};`);
    rules.push(
      `${tokenPrefix}active-alt: ${withOpacity(primaryBrandActive, ACTIVE_ALT_OPACITY)};`,
    );
    rules.push(`${tokenPrefix}hover-alt2: ${primaryBrandActive};`);
  }

  if (onPrimaryBrand) {
    rules.push(`${tokenPrefix}with-default: ${onPrimaryBrand};`);
    rules.push(
      `${tokenPrefix}with-hover: ${onPrimaryBrandHover ?? onPrimaryBrand};`,
    );
    rules.push(
      `${tokenPrefix}with-active: ${onPrimaryBrandActive ?? onPrimaryBrand};`,
    );
  } else {
    if (onPrimaryBrandHover) {
      rules.push(`${tokenPrefix}with-hover: ${onPrimaryBrandHover};`);
    }
    if (onPrimaryBrandActive) {
      rules.push(`${tokenPrefix}with-active: ${onPrimaryBrandActive};`);
    }
  }
  return rules;
}

export const overrideTokens = (overrides: BrandOverrides): string => {
  const lightRules: string[] = [];
  const darkRules: string[] = [];

  const { light, dark, focus, font, borderRadiusScale } = overrides;

  if (light) {
    const { inverse } = light;
    lightRules.push(...generateBrandColorTokens(light, ""));
    if (inverse) {
      lightRules.push(...generateBrandColorTokens(inverse, "inverse-"));
    }
  }

  if (dark) {
    const { inverse } = dark;
    darkRules.push(...generateBrandColorTokens(dark, ""));
    if (inverse) {
      darkRules.push(...generateBrandColorTokens(inverse, "inverse-"));
    }
  }

  if (focus) {
    const { inner, outer, alt, inverse } = focus;

    /* istanbul ignore else */
    if (inner) {
      lightRules.push(`--mode-color-action-focus-default: ${inner};`);
      darkRules.push(`--mode-color-action-focus-with-default: ${inner};`);
    }
    /* istanbul ignore else */
    if (outer) {
      lightRules.push(`--mode-color-action-focus-with-default: ${outer};`);
      darkRules.push(`--mode-color-action-focus-default: ${outer};`);
    }
    /* istanbul ignore else */
    if (alt) {
      lightRules.push(`--mode-color-action-focus-with-default-alt: ${alt};`);
      darkRules.push(`--mode-color-action-focus-with-default-alt: ${alt};`);
    }

    /* istanbul ignore else */
    if (inverse) {
      const {
        inner: inverseInner,
        outer: inverseOuter,
        alt: inverseAlt,
      } = inverse;
      /* istanbul ignore else */
      if (inverseInner) {
        lightRules.push(
          `--mode-color-action-focus-inverse-default: ${inverseInner};`,
        );
        darkRules.push(
          `--mode-color-action-focus-inverse-with-default: ${inverseInner};`,
        );
      }
      /* istanbul ignore else */
      if (inverseOuter) {
        lightRules.push(
          `--mode-color-action-focus-inverse-with-default: ${inverseOuter};`,
        );
        darkRules.push(
          `--mode-color-action-focus-inverse-default: ${inverseOuter};`,
        );
      }
      /* istanbul ignore else */
      if (inverseAlt) {
        lightRules.push(
          `--mode-color-action-focus-inverse-with-default-alt: ${inverseAlt};`,
        );
        darkRules.push(
          `--mode-color-action-focus-inverse-with-default-alt: ${inverseAlt};`,
        );
      }
    }
  }

  if (font) {
    const { family } = font;
    const { component, heading, subheading, body, other } =
      family ?? /* istanbul ignore next */ {};

    /* istanbul ignore else */
    if (heading) {
      lightRules.push(`--global-font-families-heading: ${heading};`);
    }
    /* istanbul ignore else */
    if (subheading) {
      lightRules.push(`--global-font-families-subheading: ${subheading};`);
    }
    /* istanbul ignore else */
    if (body) {
      lightRules.push(`--global-font-families-body: ${body};`);
    }
    /* istanbul ignore else */
    if (component) {
      lightRules.push(`--global-font-families-component: ${component};`);
    }
    /* istanbul ignore else */
    if (other) {
      lightRules.push(`--global-font-families-other: ${other};`);
    }
  }

  if (borderRadiusScale) {
    lightRules.push(`--global-radius-scale: ${borderRadiusScale};`);
  }

  const darkBlock = darkRules.length
    ? `&.carbon-dark-mode, &[data-carbon-theme="dark"] { ${darkRules.join(" ")} }`
    : "";

  return [...lightRules, darkBlock].join("\n  ");
};
