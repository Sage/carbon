import styled from 'styled-components';
import ClassicSwitchSliderPanelStyles from './switch-slider-panel-classic.style';

const SwitchSliderPanel = styled.div`
  border: 0;
  color: #ffffff;
  margin: auto;

  &[type='on'] {
    margin-left: 9px;
  }

  &[type='off'] {
    color: rgba(0, 0, 0, 0.9);
    margin-right: 6px;
  }

  ${ClassicSwitchSliderPanelStyles}
`;

export default SwitchSliderPanel;
