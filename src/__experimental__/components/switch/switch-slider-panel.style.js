import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import ClassicSwitchSliderPanelStyles from './switch-slider-panel-classic.style';

const SwitchSliderPanel = styled.div`
  ${({ size, theme }) => css`
    border: 0;
    color: ${theme.colors.white};
    margin: auto;
    margin-top: ${size === 'large' ? '12px' : '5px'};

    &[type='on'] {
      margin-left: 9px;
    }

    &[type='off'] {
      color: ${theme.text.color};
      margin-right: 6px;
    }

    ${ClassicSwitchSliderPanelStyles}
  `}
`;

SwitchSliderPanel.propTypes = {
  theme: PropTypes.object
};

SwitchSliderPanel.defaultProps = {
  theme: baseTheme
};


export default SwitchSliderPanel;
