import { css } from "styled-components";

export type Size = "xs" | "small" | "medium" | "large";
export type Variant = "default" | "destructive" | "gradient";
export type VariantType = "primary" | "secondary" | "tertiary" | "subtle";
export type ConfigEntry = Record<
  "active" | "default" | "disabled" | "hover",
  string
>;

export type ColorConfig = {
  [key in Variant]: {
    [key in VariantType]?: {
      background: ConfigEntry;
      border: ConfigEntry;
      label: ConfigEntry;
    };
  };
};

export type InverseColorConfig = {
  [key in VariantType]: {
    background: ConfigEntry;
    border: ConfigEntry;
    label: ConfigEntry;
  };
};

export type PropConfig = {
  [key in Size]: {
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
    borderRadius: "var(--global-radius-action-l)",
    fontSize: "13px",
    height: "var(--global-size-xs)",
    iconOnlyWidth: "var(--global-size-xs)",
    paddingVertical: "0px",
    paddingHorizontal: "8px",
  },
  small: {
    borderRadius: "var(--global-radius-action-l)",
    fontSize: "14px",
    height: "var(--global-size-s)",
    iconOnlyWidth: "var(--global-size-s)",
    paddingVertical: "2px",
    paddingHorizontal: "12px",
  },
  medium: {
    borderRadius: "var(--global-radius-action-xl)",
    fontSize: "14px",
    height: "var(--global-size-m)",
    iconOnlyWidth: "var(--global-size-m)",
    paddingVertical: "6px",
    paddingHorizontal: "16px",
  },
  large: {
    borderRadius: "var(--global-radius-action2xl)",
    fontSize: "16px",
    height: "var(--global-size-l)",
    iconOnlyWidth: "var(--global-size-l)",
    paddingVertical: "6px",
    paddingHorizontal: "16px",
  },
};

export const inverseColourSettings: InverseColorConfig = {
  primary: {
    background: {
      active: "var(--button-typical-primary-inverse-bg-active)",
      default: "var(--button-typical-primary-inverse-bg-default)",
      disabled: "var(--button-typical-primary-inverse-bg-disabled)",
      hover: "var(--button-typical-primary-inverse-bg-hover)",
    },
    border: {
      active: "transparent",
      default: "transparent",
      disabled: "transparent",
      hover: "transparent",
    },
    label: {
      active: "var(--button-typical-primary-label-active)",
      default: "var(--button-typical-primary-inverse-label-default)",
      disabled: "var(--button-typical-primary-inverse-label-disabled)",
      hover: "var(--button-typical-primary-inverse-label-active)",
    },
  },
  secondary: {
    background: {
      active: "var(--button-typical-secondary-inverse-bg-active)",
      default: "var(--button-typical-secondary-inverse-bg-default)",
      disabled: "transparent",
      hover: "var(--button-typical-secondary-inverse-bg-hover)",
    },
    border: {
      active: "var(--button-typical-secondary-inverse-border-active)",
      default: "var(--button-typical-secondary-inverse-border-default)",
      disabled: "var(--button-typical-secondary-inverse-border-disabled)",
      hover: "var(--button-typical-secondary-inverse-border-hover)",
    },
    label: {
      active: "var(--button-typical-secondary-inverse-label-active)",
      default: "var(--button-typical-secondary-inverse-label-default)",
      disabled: "var(--button-typical-secondary-inverse-label-disabled)",
      hover: "var(--button-typical-secondary-inverse-label-hover)",
    },
  },
  tertiary: {
    background: {
      active: "var(--button-typical-tertiary-inverse-bg-active)",
      default: "var(--button-typical-tertiary-inverse-bg-default)",
      disabled: "transparent",
      hover: "var(--button-typical-tertiary-inverse-bg-hover)",
    },
    border: {
      active: "var(--button-typical-tertiary-inverse-border-active)",
      default: "var(--button-typical-tertiary-inverse-border-default)",
      disabled: "var(--button-typical-tertiary-inverse-border-disabled)",
      hover: "var(--button-typical-tertiary-inverse-border-hover)",
    },
    label: {
      active: "var(--button-typical-tertiary-inverse-label-active)",
      default: "var(--button-typical-tertiary-inverse-label-default)",
      disabled: "var(--button-typical-tertiary-inverse-label-disabled)",
      hover: "var(--button-typical-tertiary-inverse-label-hover)",
    },
  },
  subtle: {
    background: {
      active: "var(--button-typical-subtle-inverse-bg-active)",
      default: "transparent",
      disabled: "transparent",
      hover: "var(--button-typical-subtle-inverse-bg-hover)",
    },
    border: {
      active: "transparent",
      default: "transparent",
      disabled: "transparent",
      hover: "transparent",
    },
    label: {
      active: "var(--button-typical-subtle-inverse-label-active)",
      default: "var(--button-typical-subtle-inverse-label-default)",
      disabled: "var(--button-typical-subtle-inverse-label-disabled)",
      hover: "var(--button-typical-subtle-inverse-label-hover)",
    },
  },
};

export const colourSettings: ColorConfig = {
  default: {
    primary: {
      background: {
        active: "var(--button-typical-primary-bg-active)",
        default: "var(--button-typical-primary-bg-default)",
        disabled: "var(--button-typical-primary-bg-disabled)",
        hover: "var(--button-typical-primary-bg-hover)",
      },
      border: {
        active: "transparent",
        default: "transparent",
        disabled: "transparent",
        hover: "transparent",
      },
      label: {
        active: "var(--button-typical-primary-label-active)",
        default: "var(--button-typical-primary-label-default)",
        disabled: "var(--button-typical-primary-label-disabled)",
        hover: "var(--button-typical-primary-label-hover)",
      },
    },
    secondary: {
      background: {
        active: "var(--button-typical-secondary-bg-active)",
        default: "var(--button-typical-secondary-bg-default)",
        disabled: "var(--button-typical-secondary-bg-disabled)",
        hover: "var(--button-typical-secondary-bg-hover)",
      },
      border: {
        active: "var(--button-typical-secondary-border-active)",
        default: "var(--button-typical-secondary-border-default)",
        disabled: "var(--button-typical-secondary-border-disabled)",
        hover: "var(--button-typical-secondary-border-hover)",
      },
      label: {
        active: "var(--button-typical-secondary-label-active)",
        default: "var(--button-typical-secondary-label-default)",
        disabled: "var(--button-typical-secondary-label-disabled)",
        hover: "var(--button-typical-secondary-label-hover)",
      },
    },
    tertiary: {
      background: {
        active: "var(--button-typical-tertiary-bg-active)",
        default: "var(--button-typical-tertiary-bg-default)",
        disabled: "var(--button-typical-tertiary-bg-disabled)",
        hover: "var(--button-typical-tertiary-bg-hover)",
      },
      border: {
        active: "var(--button-typical-tertiary-border-active)",
        default: "var(--button-typical-tertiary-border-default)",
        disabled: "var(--button-typical-tertiary-border-disabled)",
        hover: "var(--button-typical-tertiary-border-hover)",
      },
      label: {
        active: "var(--button-typical-tertiary-label-active)",
        default: "var(--button-typical-tertiary-label-default)",
        disabled: "var(--button-typical-tertiary-label-disabled)",
        hover: "var(--button-typical-tertiary-label-hover)",
      },
    },
    subtle: {
      background: {
        active: "var(--button-typical-subtle-bg-active)",
        default: "transparent",
        disabled: "transparent",
        hover: "var(--button-typical-subtle-bg-hover)",
      },
      border: {
        active: "transparent",
        default: "transparent",
        disabled: "transparent",
        hover: "transparent",
      },
      label: {
        active: "var(--button-typical-subtle-label-active)",
        default: "var(--button-typical-subtle-label-default)",
        disabled: "var(--button-typical-subtle-label-disabled)",
        hover: "var(--button-typical-subtle-label-hover)",
      },
    },
  },
  destructive: {
    primary: {
      background: {
        active: "",
        default: "var(--button-destructive-primary-bg-default)",
        disabled: "var(--button-destructive-primary-bg-disabled)",
        hover: "var(--button-destructive-primary-bg-hover)",
      },
      label: {
        active: "",
        default: "var(--button-destructive-primary-label-default)",
        disabled: "var(--button-destructive-primary-label-disabled)",
        hover: "var(--button-destructive-primary-label-hover)",
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
        hover: "var(--button-destructive-secondary-bg-hover)",
      },
      label: {
        active: "",
        default: "var(--button-destructive-secondary-label-default)",
        disabled: "var(--button-destructive-secondary-label-disabled)",
        hover: "var(--button-destructive-secondary-label-default)",
      },
      border: {
        active: "",
        default: "var(--button-destructive-secondary-border-default)",
        disabled: "var(--button-destructive-secondary-border-disabled)",
        hover: "var(--button-destructive-secondary-border-hover)",
      },
    },
  },
  gradient: {
    secondary: {
      background: {
        active:
          "var(--button-ai-bg-active, linear-gradient(90deg, var(--mode-color-action-ai-active-stop-1) 0%, var(--mode-color-action-ai-active-stop-2) 40%, var(--mode-color-action-ai-active-stop-3) 90%))",
        default: "transparent",
        disabled: "transparent",
        hover:
          "var(--button-ai-bg-hover, linear-gradient(90deg, var(--mode-color-action-ai-hover-stop-1) 0%, var(--mode-color-action-ai-hover-stop-2) 40%, var(--mode-color-action-ai-hover-stop-3) 90%))",
      },
      border: {
        active: "var(--button-ai-border-active)",
        default: "var(--button-ai-border-default)",
        disabled: "var(--button-ai-border-disabled)",
        hover: "var(--button-ai-border-hover)",
      },
      label: {
        active: "var(--button-ai-label-active)",
        default: "var(--button-ai-label-default)",
        disabled: "var(--button-ai-label-disabled)",
        hover: "var(--button-ai-label-hover)",
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
