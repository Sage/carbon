import styled, { css } from 'styled-components';
import ClassicSwitchSliderPanelStyles from './switch-slider-panel-classic.style';

const SwitchSliderPanel = styled.div`
  ${({ theme }) => css`
    border: 0;
    color: ${theme.colors.white};
    margin: auto;

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

export default SwitchSliderPanel;
