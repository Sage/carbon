import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import SwitchSliderPanel from './switch-slider-panel.style';

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
      background-color: white;
      bottom: 2px;
      box-shadow: 0 3px 3px 0 rgba(0,20,29,0.2), 0 2px 4px 0 rgba(0,20,29,0.15);
      content: "";
      height: 20px;
      position: absolute;
      left: 2px;
      -webkit-transition: transform .4s;
      transition: transform .4s;
      width: 20px;
    }

    ${SwitchSliderPanel}[type=${checked ? 'off' : 'on'}] {
      display: none;
    }

    ${checked && `
      background-color: ${theme.colors.primary};

      &::before {
        -webkit-transform: translateX(36px);
        -ms-transform: translateX(36px);
        transform: translateX(36px);
      }
    `}

    ${disabled && (checked ? `
      background-color: #66c8ad;
    ` : `
      background-color: #e6ebed;

      ${SwitchSliderPanel} { color: rgba(0, 0, 0, 0.55); }
    `)}

    ${size === 'large' && `
      &::before {
        height: 36px;
        width: 36px;
      }
    `}
  `}
`;

export default StyledSwitchSlider;
