import styled from 'styled-components';
import StyledButton from '../button/button.style';

const StyledConfirmButtons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;

  ${StyledButton} {
    margin-left: 10px;
  }
`;

export default StyledConfirmButtons;
