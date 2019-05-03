import styled from 'styled-components';

const SwitchSliderPanel = styled.div`
  border: 0;
  color: white;
  margin: auto;

  &[type='on'] {
    margin-left: 9px;
  }

  &[type='off'] {
    color: rgba(0, 0, 0, 0.9);
    margin-right: 6px;
  }
`;

export default SwitchSliderPanel;
