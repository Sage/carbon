import styled, { css } from "styled-components";

import SwitchSliderPanel from "./switch-slider-panel.style";
import StyledValidationIcon from "../../../__internal__/validations/validation-icon.style";
import { SwitchSliderProps } from "./switch-slider.component";
import baseTheme, { ThemeObject } from "../../../style/themes/base";

interface StyledSwitchSliderProps
  extends Pick<
    SwitchSliderProps,
    "checked" | "disabled" | "size" | "error" | "warning"
  > {
  isLoading?: boolean;
  theme?: Partial<ThemeObject>;
}

const StyledSwitchSlider = styled.span`
  ${({
    checked,
    isLoading,
    disabled,
    size,
    error,
    warning,
    theme,
  }: StyledSwitchSliderProps) => css`
    display: flex;
    font-size: 12px;
    font-weight: bold;
    height: 28px;
    left: 0;
    letter-spacing: 1px;
    position: absolute;
    text-transform: uppercase;
    top: 0;
    width: 64px;
    min-width: fit-content;
    z-index: 2;
    border-radius: ${theme?.roundedCornersOptOut
      ? "90px"
      : "var(--borderRadius400)"};
    border-style: solid;
    border-color: var(--colorsActionMinor400);
    border-width: var(--borderWidth200);
    box-sizing: border-box;

    &::before {
      background-color: var(--colorsActionMinor400);
      bottom: 4px;
      content: "";
      height: 16px;
      position: absolute;
      left: 4px;
      transition: transform 0.4s;
      width: 16px;
      z-index: 1;
      border-radius: 50%;
    }

    ${checked &&
    `
      background-color: var(--colorsActionMinor500);
      border-color: var(--colorsActionMinorTransparent);

      &::before {
        transform: translateX(36px);
        background-color: var(--colorsActionMinorYang100);
      }

    `}

    ${disabled &&
    !isLoading &&
    css`
      border-color: var(--colorsActionDisabled600);

      &::before {
        background-color: var(--colorsActionDisabled600);
      }

      ${SwitchSliderPanel} {
        color: var(--colorsUtilityYin030);
      }

      ${checked &&
      `
        background-color: var(--colorsActionDisabled500);
        border-color: var(--colorsActionMinorTransparent);

        &::before {
          background-color: var(--colorsActionMinorYang100);
        }

        ${SwitchSliderPanel} { color: var(--colorsUtilityYin030); }
      `}
    `}

    ${size === "large" &&
    css`
      ${theme?.roundedCornersOptOut ? "border-radius: 30px;" : ""}
      &::before {
        height: 32px;
        width: 32px;

        ${checked &&
        `
          transform: translateX(38px);
        `}
      }
    `}

    ${isLoading &&
    css`
      &::before {
        display: none;
      }
    `}

    ${warning &&
    !disabled &&
    css`
      border-color: var(--colorsSemanticCaution500);
    `}

    ${error &&
    !disabled &&
    css`
      border-color: var(--colorsSemanticNegative500);
    `}

    ${StyledValidationIcon} {
      position: absolute;
      right: -30px;
      height: 100%;
    }
  `}
`;

StyledSwitchSlider.defaultProps = {
  theme: baseTheme,
};

export default StyledSwitchSlider;
