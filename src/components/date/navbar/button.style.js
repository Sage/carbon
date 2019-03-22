import styled from 'styled-components';
import baseTheme from '../../../style/themes/base';

const StyledButton = styled.button`
  align-items: center;
  display: block;
  border: none;
  background-color: transparent;
  box-shadow: none;
  cursor: pointer;
  height: 40px;
  width: 40px;
  padding: 0;
`;

StyledButton.defaultProps = {
  theme: baseTheme
};

export default StyledButton;
