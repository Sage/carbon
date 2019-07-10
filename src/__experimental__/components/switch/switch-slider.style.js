import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import SwitchSliderPanel from './switch-slider-panel.style';
import ClassicSwitchSliderStyles from './switch-slider-classic.style';

const StyledSwitchSlider = styled.span`
  ${({
    checked, disabled, size, theme
  }) => css`
    background-color: ${theme.switch.off};
    display: flex;
    font-size: 12px;
    font-weight: bold;
    height: 24px;
    left: 0;
    letter-spacing: 1px;
    position: absolute;
    top: 0;
    width: 60px;
    z-index: 2;

    &::before {
      background-color: ${theme.colors.white};
      bottom: 2px;
      box-shadow: ${theme.shadows.cards};
      content: "";
      height: 20px;
      position: absolute;
      left: 2px;
      transition: transform .4s;
      width: 20px;
      z-index: 1;
    }

    ${checked && `
      background-color: ${theme.colors.primary};

      &::before {
        transform: translateX(36px);
      }
    `}

    ${disabled && css`
      background-color: ${theme.disabled.background};

      &::before {
        opacity: 0.8;
      }

      ${SwitchSliderPanel} { color: ${theme.disabled.disabled}; }

      ${checked && `
        background-color: ${theme.colors.disabled};

        ${SwitchSliderPanel} { color: ${theme.colors.white}; }
      `}
    `}

    ${size === 'large' && css`
      &::before {
        height: 36px;
        width: 36px;

        ${checked && `
          transform: translateX(38px);
        `}
      }
    `}

    ${ClassicSwitchSliderStyles}
  `}
`;

StyledSwitchSlider.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  theme: PropTypes.object
};

StyledSwitchSlider.defaultProps = {
  theme: baseTheme
};

export default StyledSwitchSlider;
