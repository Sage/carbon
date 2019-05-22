import styled from 'styled-components';
import StyledButton from '../button/button.style';

const StyledSplitButton = styled.div`
  display: inline-block;
  position: relative;

  ${StyledButton} {
    margin: 0;

    &:focus {
      outline-offset: -3px;
    }
  }
`;

export default StyledSplitButton;
