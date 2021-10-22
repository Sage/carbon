import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import baseTheme from "../../../style/themes/base";
import SwitchSliderPanel from "./switch-slider-panel.style";
import StyledValidationIcon from "../../../__internal__/validations/validation-icon.style";

const StyledSwitchSlider = styled.span`
  ${({ checked, disabled, size, theme, error, warning, info }) => css`
    background-color: ${theme.switch.off};
    display: flex;
    font-size: 12px;
    font-weight: bold;
    height: 24px;
    left: 0;
    letter-spacing: 1px;
    position: absolute;
    text-transform: uppercase;
    top: 0;
    width: 60px;
    z-index: 2;
    border-radius: 90px;

    ${info &&
    !disabled &&
    css`
      box-shadow: inset 0px 0px 0px 1px ${theme.colors.info};
    `}
    ${warning &&
    !disabled &&
    css`
      box-shadow: inset 0px 0px 0px 1px ${theme.colors.warning};
    `}
      ${error &&
    !disabled &&
    css`
      box-shadow: inset 0px 0px 0px 2px ${theme.colors.error};
    `}

    &::before {
      background-color: ${theme.colors.white};
      bottom: 4px;
      box-shadow: ${theme.shadows.cards};
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
      background-color: ${theme.switch.on};

      &::before {
        transform: translateX(36px);
      }
    `}

    ${disabled &&
    css`
      background-color: ${theme.switch.offDisabled};

      &::before {
        opacity: 0.8;
      }

      ${SwitchSliderPanel} {
        color: ${theme.switch.disabledFontColor};
      }

      ${checked &&
      `
        background-color: ${theme.switch.onDisabled};

        ${SwitchSliderPanel} { color: ${theme.colors.white}; }
      `}
    `}

    ${size === "large" &&
    css`
      border-radius: 30px;
      &::before {
        height: 32px;
        width: 32px;

        ${checked &&
        `
          transform: translateX(38px);
        `}
      }
    `}

    ${StyledValidationIcon} {
      position: absolute;
      right: -30px;
      height: 100%;
    }
  `}
`;

StyledSwitchSlider.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  theme: PropTypes.object,
};

StyledSwitchSlider.defaultProps = {
  theme: baseTheme,
};

export default StyledSwitchSlider;
