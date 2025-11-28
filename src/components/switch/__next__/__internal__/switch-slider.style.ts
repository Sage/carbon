import styled, { css } from "styled-components";

import StyledValidationIcon from "../../../../__internal__/validations/validation-icon.style";

import SwitchSliderPanel from "./switch-slider-panel.style";
import { SwitchSliderProps } from "./switch-slider.component";

interface StyledSwitchSliderProps
  extends Pick<SwitchSliderProps, "checked" | "disabled" | "size"> {
  isLoading?: boolean;
}

const StyledSwitchSlider = styled.div`
  ${({ checked, isLoading, disabled, size }: StyledSwitchSliderProps) => css`
    align-items: center;
    background: var(--input-switch-bg-default, #fff);
    border: var(--global-borderwidth-S, 2px) solid
      var(--input-switch-border-default, #75838f);
    border-radius: var(--global-radius-container-circle, 999px);
    box-sizing: border-box;
    display: flex;
    font-size: 12px;
    font-weight: 500;
    height: var(--global-size-XS, 24px);
    left: 0;
    letter-spacing: 1px;
    margin-top: ${size === "large" ? "-47px" : "-28px"};
    position: relative;
    text-transform: uppercase;
    top: 0;
    width: var(--global-size-M, 40px);
    z-index: 1;

    // The slider circle
    &::before {
      border-radius: var(--global-radius-container-circle, 999px);
      background: var(--input-switch-fg-default, #75838f);
      bottom: 2px;
      content: "";
      height: ${size === "large" ? "var(--spacing400)" : "var(--spacing200)"};
      position: absolute;
      left: 2px;
      transition: margin-left 0.4s;
      width: ${size === "large" ? "var(--spacing400)" : "var(--spacing200)"};
      z-index: 1;
    }

    ${checked &&
    css`
      border-radius: var(--global-radius-container-circle, 999px);
      border: var(--global-borderwidth-S, 2px) solid
        var(--input-switch-border-active, rgba(0, 0, 0, 0));
      background: var(--input-switch-bg-active, #000);

      /* The slider circle */
      &::before {
        margin-left: calc(100% - ${size === "large" ? "4px" : "19px"});
        border-radius: var(--global-radius-container-circle, 999px);
        background: var(--input-switch-fg-active, #fff);
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
      css`
        background-color: var(--colorsActionDisabled500);
        border-color: var(--colorsActionMinorTransparent);

        &::before {
          background-color: var(--colorsActionMinorYang100);
        }

        ${SwitchSliderPanel} {
          color: var(--colorsUtilityYin030);
        }
      `}
    `}

    ${isLoading &&
    css`
      &::before {
        display: none;
      }
    `}

    ${StyledValidationIcon} {
      position: absolute;
      right: -30px;
      height: 100%;
    }
  `}
`;

const HiddenContent = styled.div`
  ${({ size }: Pick<StyledSwitchSliderProps, "size">) => css`
    visibility: hidden;
    height: 0px;
    padding-left: ${size === "large"
      ? "var(--spacing700)"
      : "var(--spacing500)"};
  `}
`;

export { StyledSwitchSlider, HiddenContent };
export default StyledSwitchSlider;
