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
   * Flips to outer focus shadow when in dark mode.
   */
  ring?: string;
  /**
   * The color of the outer focus shadow for the brand color.
   * Flips to inner shadow when in dark mode.
   */
  contrast?: string;
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
   * e.g. "0.5" for 50% border radius.
   */
  borderRadiusScale?: number;
}

const HEX_WITH_ALPHA_LENGTH = 9; // #RRGGBBAA
const HEX_WITH_ALPHA_REGEX = /^#([A-Fa-f0-9]{8})$/; // Matches #RRGGBBAA

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

  // Strip any existing alpha channel before applying the new one.
  // normaliseHex / rgbToHex can return 8-digit hex (#RRGGBBAA);
  // truncate to 6-digit so we don't produce an invalid 10-digit value.
  const baseHex =
    hex.length === HEX_WITH_ALPHA_LENGTH && HEX_WITH_ALPHA_REGEX.test(hex)
      ? hex.slice(0, 7)
      : hex;

  // CSS hex alpha uses an 8-bit channel (00-FF),
  // so convert opacity from 0-1 to 0-255 before converting to hex.
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

  return `${baseHex}${alpha}`;
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
    const { ring, contrast, alt, inverse } = focus;

    /* istanbul ignore else */
    if (ring) {
      lightRules.push(`--mode-color-action-focus-default: ${ring};`);
      darkRules.push(`--mode-color-action-focus-with-default: ${ring};`);
    }
    /* istanbul ignore else */
    if (contrast) {
      lightRules.push(`--mode-color-action-focus-with-default: ${contrast};`);
      darkRules.push(`--mode-color-action-focus-default: ${contrast};`);
    }
    /* istanbul ignore else */
    if (alt) {
      lightRules.push(`--mode-color-action-focus-with-default-alt: ${alt};`);
      darkRules.push(`--mode-color-action-focus-with-default-alt: ${alt};`);
    }

    /* istanbul ignore else */
    if (inverse) {
      const {
        ring: inverseRing,
        contrast: inverseContrast,
        alt: inverseAlt,
      } = inverse;
      /* istanbul ignore else */
      if (inverseRing) {
        lightRules.push(
          `--mode-color-action-focus-inverse-default: ${inverseRing};`,
        );
        darkRules.push(
          `--mode-color-action-focus-inverse-with-default: ${inverseRing};`,
        );
      }
      /* istanbul ignore else */
      if (inverseContrast) {
        lightRules.push(
          `--mode-color-action-focus-inverse-with-default: ${inverseContrast};`,
        );
        darkRules.push(
          `--mode-color-action-focus-inverse-default: ${inverseContrast};`,
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

  if (borderRadiusScale !== undefined) {
    lightRules.push(`--global-radius-scale: ${borderRadiusScale};`);
  }

  const darkBlock = darkRules.length
    ? `&.carbon-dark-mode, &[data-carbon-theme="dark"] { ${darkRules.join(" ")} }`
    : "";

  return [...lightRules, darkBlock].join("\n  ");
};
