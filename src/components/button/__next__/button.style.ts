import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import { ButtonProps } from "./button.component";
import addFocusStyling from "../../../style/utils/add-focus-styling";
import { IconType } from "../../portrait/portrait.stories";

type Size = ButtonProps["size"];
type Variant = ButtonProps["variant"];
type VariantType = ButtonProps["variantType"];
type ConfigEntry = Record<"active" | "default" | "disabled" | "hover", string>;

type ColorConfig = {
  [key in Variant]: {
    [key in VariantType]?: {
      background: ConfigEntry;
      border: ConfigEntry;
      label: ConfigEntry;
    };
  };
};

type PropConfig = {
  [key in Size]: {
    borderRadius: string;
    fontSize: string;
    fontWeight: string;
    height: string;
    iconOnlyWidth: string;
    lineHeight: string;
    paddingVertical: string;
    paddingHorizontal: string;
  };
};

const propsForSize: PropConfig = {
  xs: {
    borderRadius: "16px",
    fontSize: "13px",
    fontWeight: "var(--fontWeights500)",
    height: "24px",
    iconOnlyWidth: "24px",
    lineHeight: "150%",
    paddingVertical: "2px",
    paddingHorizontal: "8px",
  },
  small: {
    borderRadius: "16px",
    fontSize: "14px",
    fontWeight: "var(--fontWeights500)",
    height: "32px",
    iconOnlyWidth: "32px",
    lineHeight: "150%",
    paddingVertical: "4px",
    paddingHorizontal: "12px",
  },
  medium: {
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "var(--fontWeights500)",
    height: "40px",
    iconOnlyWidth: "40px",
    lineHeight: "150%",
    paddingVertical: "8px",
    paddingHorizontal: "16px",
  },
  large: {
    borderRadius: "24px",
    fontSize: "16px",
    fontWeight: "var(--fontWeights500)",
    height: "48px",
    iconOnlyWidth: "48px",
    lineHeight: "150%",
    paddingVertical: "8px",
    paddingHorizontal: "16px",
  },
};

const colourSettings: ColorConfig = {
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
    primary: {
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

/**
 * I've split this out into a separate styling for two reasons:
 * - AI tokens don't seem to be ready yet;
 * - The structure of the CSS is different (and will be until such a time
 *   as the above is rectified)
 */
const getCSSForAIStyle = ({
  disabled,
  size,
}: Pick<ButtonProps, "disabled" | "size">) => css`
  position: relative;
  z-index: 0;
  border: 2px solid transparent;
  border-radius: ${propsForSize[size].borderRadius};
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(
        90deg,
        var(--mode-color-ai-stop-1, #13a038) 0%,
        var(--mode-color-ai-stop-2, #149197) 40%,
        var(--mode-color-ai-stop-3, #a87cfb) 100%
      )
      border-box;
  background-clip: padding-box, border-box;
  color: var(--button-ai-label-default, #000000e6);
  font-size: ${propsForSize[size].fontSize};
  font-weight: ${propsForSize[size].fontWeight};
  line-height: ${propsForSize[size].lineHeight};
  min-height: ${propsForSize[size].height};
  padding: ${propsForSize[size].paddingVertical}
    ${propsForSize[size].paddingHorizontal};
  transition:
    background 0.25s ease,
    color 0.25s ease;

  &:hover {
    background:
      linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.85) 0%,
          rgba(255, 255, 255, 0.85) 100%
        )
        padding-box,
      linear-gradient(
          90deg,
          var(--mode-color-action-ai-hover-stop-1, rgba(18, 160, 56, 0.08)) 0%,
          var(--mode-color-action-ai-hover-stop-2, rgba(20, 145, 151, 0.08)) 40%,
          var(--mode-color-action-ai-hover-stop-3, rgba(168, 124, 251, 0.08))
            90%
        )
        padding-box,
      linear-gradient(
          90deg,
          var(--mode-color-ai-stop-1, #13a038) 0%,
          var(--mode-color-ai-stop-2, #149197) 40%,
          var(--mode-color-ai-stop-3, #a87cfb) 100%
        )
        border-box;
    background-clip: padding-box, padding-box, border-box;
  }

  &:active {
    background:
      linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.85) 0%,
          rgba(255, 255, 255, 0.85) 100%
        )
        padding-box,
      linear-gradient(
          90deg,
          var(--mode-color-action-ai-active-stop-1, rgba(18, 160, 56, 0.15)) 0%,
          var(--mode-color-action-ai-active-stop-2, rgba(20, 145, 151, 0.15))
            40%,
          var(--mode-color-action-ai-active-stop-3, rgba(168, 124, 251, 0.15))
            90%
        )
        padding-box,
      linear-gradient(
          90deg,
          var(--mode-color-ai-stop-1, #13a038) 0%,
          var(--mode-color-ai-stop-2, #149197) 40%,
          var(--mode-color-ai-stop-3, #a87cfb) 100%
        )
        border-box;
    background-clip: padding-box, padding-box, border-box;
  }

  ${disabled &&
  css`
    background: none;
    border: 2px solid var(--button-ai-border-disabled, rgba(0, 0, 0, 0.3));
    cursor: not-allowed;
    color: var(--button-ai-label-disabled, #0000006b);
  `}
`;

const getCSSForStyle = ({
  disabled,
  size,
  variant,
  variantType,
}: Pick<ButtonProps, "disabled" | "size" | "variant" | "variantType">) => css`
  background-color: ${colourSettings[variant][variantType]?.background.default};
  border: ${variantType === "tertiary" ? "1px" : "2px"} solid
    ${colourSettings[variant][variantType]?.border.default};
  border-radius: ${propsForSize[size].borderRadius};
  color: ${colourSettings[variant][variantType]?.label.default};
  font-size: ${propsForSize[size].fontSize};
  font-weight: ${propsForSize[size].fontWeight};
  line-height: ${propsForSize[size].lineHeight};
  min-height: ${propsForSize[size].height};
  padding: ${propsForSize[size].paddingVertical}
    ${propsForSize[size].paddingHorizontal};

  ${disabled
    ? css`
        background-color: ${colourSettings[variant][variantType]?.background
          .disabled};
        border: ${variantType === "tertiary" ? "1px" : "2px"} solid
          ${colourSettings[variant][variantType]?.border.disabled};
        color: ${colourSettings[variant][variantType]?.label.disabled};
        cursor: not-allowed;
      `
    : css`
        &:active {
          background-color: ${colourSettings[variant][variantType]?.background
            .active};
          color: ${colourSettings[variant][variantType]?.label.active};
        }

        &:hover {
          background-color: ${colourSettings[variant][variantType]?.background
            .hover};
          color: ${colourSettings[variant][variantType]?.label.hover};
        }
      `}
`;

type StyledButtonProps = ButtonProps &
  SpaceProps & {
    allowMotion?: boolean;
    iconOnly?: boolean;
  };

export const StyledChildContainer = styled.div<{ flip: boolean }>`
  display: flex;
  flex-direction: ${({ flip }) => (flip ? "row-reverse" : "row")};
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

export const StyledLoadingContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

export const StyledButton = styled.button<StyledButtonProps>`
  ${space}

  align-items: center;
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  outline-offset: 0;
  text-decoration: none;
  vertical-align: middle;

  ${({ disabled, size, variant, variantType }) => {
    if (variant === "ai") {
      return getCSSForAIStyle({
        disabled,
        size: size as Size,
      });
    }

    /**
     * XS should fall back to the "default secondary" colour scheme
     * */
    if (size === "xs" && (variantType === "primary" || variant !== "default")) {
      return getCSSForStyle({
        disabled,
        size: "xs",
        variant: "default",
        variantType: "secondary",
      });
    }

    /**
     * Unsupported combinations of variant and variantType should fall back to
     * the "primary" variant type for said variant
     * */
    if (
      variant === "destructive" &&
      ["tertiary", "subtle"].includes(variantType)
    ) {
      return getCSSForStyle({
        disabled,
        size: size as Size,
        variant: variant as Variant,
        variantType: "primary",
      });
    }

    return getCSSForStyle({
      disabled,
      size: size as Size,
      variant: variant as Variant,
      variantType: variantType as VariantType,
    });
  }}

  ${({ fullWidth, iconOnly, size, noWrap }) => css`
    ${noWrap ? "white-space: nowrap" : "flex-flow: wrap"};
    ${fullWidth &&
    css`
      width: 100%;
    `}

    ${iconOnly &&
    css`
      height: ${propsForSize[size].height};
      padding: 0;
      width: ${propsForSize[size].iconOnlyWidth};
    `}

    ${IconType &&
    css`
      padding: 0px ${propsForSize[size].paddingHorizontal};
    `}
  `}

  &:focus {
    ${addFocusStyling()}
  }
`;

export default StyledButton;
