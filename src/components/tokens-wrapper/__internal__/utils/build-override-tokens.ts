export interface BrandColors {
  light: {
    primary: string; // → mode.color.action.main.default
    //   (also derives defaultAlt @ 80% opacity, defaultAlt3 @ 3% opacity)
    primaryHover?: string; // → mode.color.action.main.hover
    //   (also derives hoverAlt with button.hover modifier applied)
    primaryActive?: string; // → mode.color.action.main.active
    //   (also derives activeAlt with button.active modifier applied)
    onPrimary?: string; // → mode.color.action.main.withDefault
    onPrimaryHover?: string; // → mode.color.action.main.withHover  (defaults to onPrimary)
    onPrimaryActive?: string; // → mode.color.action.main.withActive (defaults to onPrimary)
  };
  dark?: {
    primary: string; // → mode.color.action.main.default
    //   (also derives.defaultAlt,.defaultAlt3)
    primaryHover?: string; // → mode.color.action.main.hover
    //   (also derives.hoverAlt)
    primaryActive?: string; // → mode.color.action.main.active
    //   (also derives.activeAlt)
    onPrimary?: string; // → mode.color.action.main.withDefault
    onPrimaryHover?: string; // → mode.color.action.main.withHover
    onPrimaryActive?: string; // → mode.color.action.main.withActive
  };
}

// Utility to convert a hex colour to an rgba/hex with opacity
// (for the derived alt tokens)
function withOpacity(hex: string, opacity: number): string {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${alpha}`;
}

export const buildOverrideTokens = (overrides: BrandColors): string => {
  const lightRules: string[] = [];
  const darkRules: string[] = [];

  const { light, dark } = overrides;

  if (light) {
    const {
      primary,
      primaryHover,
      primaryActive,
      onPrimary,
      onPrimaryHover,
      onPrimaryActive,
    } = light;
    lightRules.push(`--mode-color-action-main-default: ${primary};`);
    lightRules.push(
      `--mode-color-action-main-default-alt: ${withOpacity(primary, 0.8)};`,
    );
    lightRules.push(
      `--mode-color-action-main-default-alt3: ${withOpacity(primary, 0.03)};`,
    );

    if (primaryHover) {
      lightRules.push(`--mode-color-action-main-hover: ${primaryHover};`);
      lightRules.push(
        `--mode-color-action-main-hover-alt: ${withOpacity(primaryHover, 0.15)};`,
      ); // button.hover modifier
      lightRules.push(
        `--mode-color-action-main-default-alt2: ${primaryHover};`,
      ); // link colour aliases hover
    }

    if (primaryActive) {
      lightRules.push(`--mode-color-action-main-active: ${primaryActive};`);
      lightRules.push(
        `--mode-color-action-main-active-alt: ${withOpacity(primaryActive, 0.3)};`,
      ); // button.active modifier
      lightRules.push(`--mode-color-action-main-hover-alt2: ${primaryActive};`); // link hover aliases active
    }

    if (onPrimary) {
      lightRules.push(`--mode-color-action-main-with-default: ${onPrimary};`);
      lightRules.push(
        `--mode-color-action-main-with-hover: ${onPrimaryHover ?? onPrimary};`,
      );
      lightRules.push(
        `--mode-color-action-main-with-active: ${onPrimaryActive ?? onPrimary};`,
      );
    } else {
      if (onPrimaryHover)
        lightRules.push(
          `--mode-color-action-main-with-hover: ${onPrimaryHover};`,
        );
      if (onPrimaryActive)
        lightRules.push(
          `--mode-color-action-main-with-active: ${onPrimaryActive};`,
        );
    }
  }

  if (dark) {
    const {
      primary,
      primaryHover,
      primaryActive,
      onPrimary,
      onPrimaryHover,
      onPrimaryActive,
    } = dark;
    darkRules.push(`--mode-color-action-main-default: ${primary};`);
    darkRules.push(
      `--mode-color-action-main-default-alt: ${withOpacity(primary, 0.8)};`,
    );
    darkRules.push(
      `--mode-color-action-main-default-alt3: ${withOpacity(primary, 0.03)};`,
    );

    if (primaryHover) {
      darkRules.push(`--mode-color-action-main-hover: ${primaryHover};`);
      darkRules.push(
        `--mode-color-action-main-hover-alt: ${withOpacity(primaryHover, 0.15)};`,
      );
      darkRules.push(`--mode-color-action-main-default-alt2: ${primaryHover};`);
    }

    if (primaryActive) {
      darkRules.push(`--mode-color-action-main-active: ${primaryActive};`);
      darkRules.push(
        `--mode-color-action-main-active-alt: ${withOpacity(primaryActive, 0.3)};`,
      );
      darkRules.push(`--mode-color-action-main-hover-alt2: ${primaryActive};`);
    }

    if (onPrimary) {
      darkRules.push(`--mode-color-action-main-with-default: ${onPrimary};`);
      darkRules.push(
        `--mode-color-action-main-with-hover: ${onPrimaryHover ?? onPrimary};`,
      );
      darkRules.push(
        `--mode-color-action-main-with-active: ${onPrimaryActive ?? onPrimary};`,
      );
    } else {
      if (onPrimaryHover)
        darkRules.push(
          `--mode-color-action-main-with-hover: ${onPrimaryHover};`,
        );
      if (onPrimaryActive)
        darkRules.push(
          `--mode-color-action-main-with-active: ${onPrimaryActive};`,
        );
    }
  }

  const darkBlock = darkRules.length
    ? `&.carbon-dark-mode, &[data-carbon-theme="dark"] { ${darkRules.join(" ")} }`
    : "";

  return [...lightRules, darkBlock].join("\n  ");
};
