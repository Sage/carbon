import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import baseTheme from "../../../style/themes/base";
import SwitchSliderPanel from "./switch-slider-panel.style";
import StyledValidationIcon from "../../../components/validations/validation-icon.style";

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

    ${info &&
    !disabled &&
    css`
      box-shadow: inset 1px 1px 0 ${theme.colors.info},
        inset -1px -1px 0 ${theme.colors.info};
    `}
    ${warning &&
    !disabled &&
    css`
      box-shadow: inset 1px 1px 0 ${theme.colors.warning},
        inset -1px -1px 0 ${theme.colors.warning};
    `}
      ${error &&
    !disabled &&
    css`
      box-shadow: inset 2px 2px 0 ${theme.colors.error},
        inset -2px -2px 0 ${theme.colors.error};
    `}

    &::before {
      background-color: ${theme.colors.white};
      bottom: 2px;
      box-shadow: ${theme.shadows.cards};
      content: "";
      height: 20px;
      position: absolute;
      left: 2px;
      transition: transform 0.4s;
      width: 20px;
      z-index: 1;
    }

    ${checked &&
    `
      background-color: ${theme.colors.primary};

      &::before {
        transform: translateX(36px);
      }
    `}

    ${disabled &&
    css`
      background-color: ${theme.disabled.background};

      &::before {
        opacity: 0.8;
      }

      ${SwitchSliderPanel} {
        color: ${theme.disabled.disabled};
      }

      ${checked &&
      `
        background-color: ${theme.colors.disabled};

        ${SwitchSliderPanel} { color: ${theme.colors.white}; }
      `}
    `}

    ${size === "large" &&
    css`
      &::before {
        height: 36px;
        width: 36px;

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
