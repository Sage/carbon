import styled from 'styled-components';
import Button from '../button';

const StyledConfirmButtons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
`;

export { StyledConfirmButtons, StyledButton };
