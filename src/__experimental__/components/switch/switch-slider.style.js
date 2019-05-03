import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import SwitchSliderPanel from './switch-slider-panel.style';
import ClassicSwitchSliderStyles from './switch-slider-classic.style';

const StyledSwitchSlider = styled.span`
  ${({
    checked, disabled, size, theme
  }) => css`
    background-color: #ccd6db;
    bottom: 0;
    display: flex;
    font-size: 12px;
    font-weight: bold;
    height: 24px;
    left: 0;
    letter-spacing: 1px;
    position: absolute;
    right: 0;
    top: 0;
    width: 60px;

    &::before {
      background-color: #ffffff;
      bottom: 2px;
      box-shadow: 0 3px 3px 0 rgba(0,20,29,0.2), 0 2px 4px 0 rgba(0,20,29,0.15);
      content: "";
      height: 20px;
      position: absolute;
      left: 2px;
      transition: transform .4s;
      width: 20px;
    }

    ${SwitchSliderPanel}[type=${checked ? 'off' : 'on'}] {
      display: none;
    }

    ${checked && `
      background-color: ${theme.colors.primary};

      &::before {
        transform: translateX(36px);
      }
    `}

    ${disabled && `
      background-color: #e6ebed;

      &::before {
        opacity: 0.8;
      }

      ${SwitchSliderPanel} { color: rgba(0, 0, 0, 0.55); }
    `}

    ${disabled && checked && `
      background-color: ${theme.colors.disabled};

      ${SwitchSliderPanel} { color: #ffffff; }
    `}

    ${size === 'large' && `
      &::before {
        height: 36px;
        width: 36px;
      }
    `}

    ${ClassicSwitchSliderStyles}
  `}
`;

StyledSwitchSlider.PropTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  theme: PropTypes.object
};

StyledSwitchSlider.defaultProps = {
  theme: baseTheme
};

export default StyledSwitchSlider;
