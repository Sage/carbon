import { css } from "styled-components";
import { ButtonProps } from "./button.component";

export type Size = ButtonProps["size"];
export type Variant = ButtonProps["variant"];
export type VariantType = ButtonProps["variantType"];
export type ConfigEntry = Record<
  "active" | "default" | "disabled" | "hover",
  string
>;

export type ColorConfig = {
  [key in NonNullable<Variant>]: {
    [key in NonNullable<VariantType>]?: {
      background: ConfigEntry;
      border: ConfigEntry;
      label: ConfigEntry;
    };
  };
};

export type InverseColorConfig = {
  [key in NonNullable<VariantType>]?: {
    background: ConfigEntry;
    border: ConfigEntry;
    label: ConfigEntry;
  };
};

export type PropConfig = {
  [key in NonNullable<Size>]: {
    borderRadius: string;
    fontSize: string;
    height: string;
    iconOnlyWidth: string;
    paddingVertical: string;
    paddingHorizontal: string;
  };
};

export const propsForSize: PropConfig = {
  xs: {
    borderRadius: "var(--global-radius-action-l, 16px)",
    fontSize: "13px",
    height: "var(--global-size-xs, 24px)",
    iconOnlyWidth: "var(--global-size-xs, 24px)",
    paddingVertical: "0px",
    paddingHorizontal: "8px",
  },
  small: {
    borderRadius: "var(--global-radius-action-l, 16px)",
    fontSize: "14px",
    height: "var(--global-size-s, 32px)",
    iconOnlyWidth: "var(--global-size-s, 32px)",
    paddingVertical: "2px",
    paddingHorizontal: "12px",
  },
  medium: {
    borderRadius: "var(--global-radius-action-xl, 20px)",
    fontSize: "14px",
    height: "var(--global-size-m, 40px)",
    iconOnlyWidth: "var(--global-size-m, 40px)",
    paddingVertical: "6px",
    paddingHorizontal: "16px",
  },
  large: {
    borderRadius: "var(--global-radius-action2xl, 24px)",
    fontSize: "16px",
    height: "var(--global-size-l, 48px)",
    iconOnlyWidth: "var(--global-size-l, 48px)",
    paddingVertical: "6px",
    paddingHorizontal: "16px",
  },
};

export const inverseColourSettings: InverseColorConfig = {
  primary: {
    background: {
      active: "var(--button-typical-primary-inverse-bg-active, #8FFF98)",
      default: "var(--button-typical-primary-inverse-bg-default, #00F142)",
      disabled:
        "var(--button-typical-primary-inverse-bg-disabled, rgba(255, 255, 255, 0.30))",
      hover: "var(--button-typical-primary-inverse-bg-hover, #46FB5E)",
    },
    border: {
      active: "transparent",
      default: "transparent",
      disabled: "transparent",
      hover: "transparent",
    },
    label: {
      active: "var(--button-typical-primary-label-active, #000)",
      default: "var(--button-typical-primary-inverse-label-default, #000)",
      disabled: "var(--button-typical-primary-inverse-label-disabled, #000)",
      hover: "var(--button-typical-primary-inverse-label-active, #000)",
    },
  },
  secondary: {
    background: {
      active:
        "var(--button-typical-secondary-inverse-bg-active, rgba(0, 241, 67, 0.30))",
      default:
        "var(--button-typical-secondary-inverse-bg-default, rgba(0, 241, 67, 0.03))",
      disabled: "transparent",
      hover:
        "var(--button-typical-secondary-inverse-bg-hover, rgba(0, 241, 67, 0.15))",
    },
    border: {
      active: "var(--button-typical-secondary-inverse-border-active, #8FFF98)",
      default:
        "var(--button-typical-secondary-inverse-border-default, rgba(0, 241, 67, 0.80))",
      disabled:
        "var(--button-typical-secondary-inverse-border-disabled, rgba(255, 255, 255, 0.30))",
      hover: "var(--button-typical-secondary-inverse-border-hover, #46FB5E)",
    },
    label: {
      active: "var(--button-typical-secondary-inverse-label-actve, #FFF)",
      default:
        "var(--button-typical-secondary-inverse-label-default, rgba(255, 255, 255, 0.90))",
      disabled:
        "var(--button-typical-secondary-inverse-label-disabled, rgba(255, 255, 255, 0.42))",
      hover: "var(--button-typical-secondary-inverse-label-hover, #FFF)",
    },
  },
  tertiary: {
    background: {
      active:
        "var(--button-typical-tertiary-inverse-bg-active, rgba(0, 241, 67, 0.30))",
      default:
        "var(--button-typical-tertiary-inverse-bg-default, rgba(255, 255, 255, 0.00))",
      disabled: "transparent",
      hover:
        "var(--button-typical-tertiary-inverse-bg-hover, rgba(0, 241, 67, 0.15))",
    },
    border: {
      active: "var(--button-typical-tertiary-inverse-border-active, #8FFF98)",
      default:
        "var(--button-typical-tertiary-inverse-border-default, rgba(0, 241, 67, 0.80))",
      disabled:
        "var(--button-typical-tertiary-inverse-border-disabled, rgba(255, 255, 255, 0.30))",
      hover: "var(--button-typical-tertiary-inverse-border-hover, #46FB5E)",
    },
    label: {
      active: "var(--button-typical-tertiary-inverse-label-active, #FFF)",
      default:
        "var(--button-typical-tertiary-inverse-label-default, rgba(255, 255, 255, 0.90))",
      disabled:
        "var(--button-typical-tertiary-inverse-label-disabled, rgba(255, 255, 255, 0.42))",
      hover: "var(--button-typical-tertiary-inverse-label-hover, #FFF)",
    },
  },
  subtle: {
    background: {
      active:
        "var(--button-typical-subtle-inverse-bg-active, rgba(255, 255, 255, 0.15))",
      default: "transparent",
      disabled: "transparent",
      hover:
        "var(--button-typical-subtle-inverse-bg-hover, rgba(255, 255, 255, 0.10))",
    },
    border: {
      active: "transparent",
      default: "transparent",
      disabled: "transparent",
      hover: "transparent",
    },
    label: {
      active: "var(--button-typical-subtle-inverse-label-active, #FFF)",
      default:
        "var(--button-typical-subtle-inverse-label-default, rgba(255, 255, 255, 0.90))",
      disabled:
        "var(--button-typical-subtle-inverse-label-disabled, rgba(255, 255, 255, 0.42))",
      hover: "var(--button-typical-subtle-inverse-label-hover, #FFF)",
    },
  },
};

export const colourSettings: ColorConfig = {
  default: {
    primary: {
      background: {
        active: "var(--button-typical-primary-bg-active, #005E14)",
        default: "var(--button-typical-primary-bg-default, #00811F)",
        disabled: "var(--button-typical-primary-bg-disabled, #0000004D)",
        hover: "var(--button-typical-primary-bg-hover, #007219)",
      },
      border: {
        active: "transparent",
        default: "transparent",
        disabled: "transparent",
        hover: "transparent",
      },
      label: {
        active: "var(--button-typical-primary-label-active, #FFFFFF)",
        default: "var(--button-typical-primary-label-default, #FFFFFF)",
        disabled: "var(--button-typical-primary-label-disabled, #FFFFFF)",
        hover: "var(--button-typical-primary-label-hover, #FFFFFF)",
      },
    },
    secondary: {
      background: {
        active: "var(--button-typical-secondary-bg-active, #005E14)",
        default: "var(--button-typical-secondary-bg-default, #00812008)",
        disabled: "var(--button-typical-secondary-bg-disabled, transparent)",
        hover: "var(--button-typical-secondary-bg-hover, #00812026)",
      },
      border: {
        active: "var(--button-typical-secondary-border-active, #005E14)",
        default: "var(--button-typical-secondary-border-default, #008120CC)",
        disabled: "var(--button-typical-secondary-border-disabled, #0000004D)",
        hover: "var(--button-typical-secondary-border-hover, #007219)",
      },
      label: {
        active: "var(--button-typical-secondary-label-active, #000000)",
        default: "var(--button-typical-secondary-label-default, #000000)",
        disabled: "var(--button-typical-secondary-label-disabled, #0000006B)",
        hover: "var(--button-typical-secondary-label-hover, #000000)",
      },
    },
    tertiary: {
      background: {
        active: "var(--button-typical-tertiary-bg-active, #005E14)",
        default: "var(--button-typical-tertiary-bg-default, #FFFFFF00)",
        disabled: "var(--button-typical-tertiary-bg-disabled, transparent)",
        hover: "var(--button-typical-tertiary-bg-hover, #00812026)",
      },
      border: {
        active: "var(--button-typical-tertiary-border-active, #005E14)",
        default: "var(--button-typical-tertiary-border-default, #008120CC)",
        disabled: "var(--button-typical-tertiary-border-disabled, #0000004D)",
        hover: "var(--button-typical-tertiary-border-hover, #007219)",
      },
      label: {
        active: "var(--button-typical-tertiary-label-active, #000000)",
        default: "var(--button-typical-tertiary-label-default, #000000)",
        disabled: "var(--button-typical-tertiary-label-disabled, #0000006B)",
        hover: "var(--button-typical-tertiary-label-hover, #000000)",
      },
    },
    subtle: {
      background: {
        active: "var(--button-typical-subtle-bg-active, #005E14)",
        default: "transparent",
        disabled: "transparent",
        hover: "var(--button-typical-subtle-bg-hover, #0000001A)",
      },
      border: {
        active: "transparent",
        default: "transparent",
        disabled: "transparent",
        hover: "transparent",
      },
      label: {
        active: "var(--button-typical-subtle-label-active, #000000)",
        default: "var(--button-typical-subtle-label-default, #000000)",
        disabled: "var(--button-typical-subtle-label-disabled, #0000006B)",
        hover: "var(--button-typical-subtle-label-hover, #000000)",
      },
    },
  },
  destructive: {
    primary: {
      background: {
        active: "",
        default: "var(--button-destructive-primary-bg-default, #DB004E)",
        disabled: "var(--button-destructive-primary-bg-disabled, #0000004D)",
        hover: "var(--button-destructive-primary-bg-hover, #C40044)",
      },
      label: {
        active: "",
        default: "var(--button-destructive-primary-label-default, #FFFFFF)",
        disabled: "var(--button-destructive-primary-label-disabled, #FFFFFF)",
        hover: "var(--button-destructive-primary-label-hover, #FFFFFF)",
      },
      border: {
        active: "",
        default: "transparent",
        disabled: "transparent",
        hover: "transparent",
      },
    },
    secondary: {
      background: {
        active: "",
        default: "transparent",
        disabled: "transparent",
        hover:
          "var(--button-destructive-secondary-bg-hover, rgba(219, 1, 78, 0.15))",
      },
      label: {
        active: "",
        default: "var(--button-destructive-secondary-label-default, #DB004E)",
        disabled:
          "var(--button-destructive-secondary-label-disabled, rgba(0, 0, 0, 0.42))",
        hover: "var(--button-destructive-secondary-label-default, #C40044)",
      },
      border: {
        active: "",
        default: "var(--button-destructive-secondary-border-default, #DB004E)",
        disabled:
          "var(--button-destructive-secondary-border-disabled, #0000004D)",
        hover: "var(--button-destructive-secondary-border-hover, #C40044)",
      },
    },
  },
  ai: {
    secondary: {
      background: {
        active:
          "var(--button-ai-bg-active, linear-gradient(90deg, var(--mode-color-action-ai-active-stop-1, rgba(18, 160, 56, 0.15)) 0%, var(--mode-color-action-ai-active-stop-2, rgba(20, 145, 151, 0.15)) 40%, var(--mode-color-action-ai-active-stop-3, rgba(168, 124, 251, 0.15)) 90%))",
        default: "transparent",
        disabled: "transparent",
        hover:
          "var(--button-ai-bg-hover, linear-gradient(90deg, var(--mode-color-action-ai-hover-stop-1, rgba(18, 160, 56, 0.08)) 0%, var(--mode-color-action-ai-hover-stop-2, rgba(20, 145, 151, 0.08)) 40%, var(--mode-color-action-ai-hover-stop-3, rgba(168, 124, 251, 0.08)) 90%))",
      },
      border: {
        active: "var(--button-ai-border-active, #13A038)",
        default: "var(--button-ai-border-default, #13A038)",
        disabled: "var(--button-ai-border-disabled, rgba(0, 0, 0, 0.30))",
        hover: "var(--button-ai-border-hover, #13A038)",
      },
      label: {
        active: "var(--button-ai-label-active, #000000)",
        default: "var(--button-ai-label-default, #000000E6)",
        disabled: "var(--button-ai-label-disabled, #0000006B)",
        hover: "var(--button-ai-label-hover, #000000)",
      },
    },
  },
};

export const gradientAnimation = css`
  @keyframes gradient-loop {
    0% {
      background-position: 0% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
