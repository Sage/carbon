import styled from 'styled-components';
import StyledButton from '../button/button.style';
import { getMainSplitButtonClassicStyles } from './split-button-classic.style';
import baseTheme from '../../style/themes/base';

const StyledSplitButton = styled.div`
  display: inline-block;
  position: relative;
  
  & > ${StyledButton} {
    margin: 0;

    &:focus {
      border: 3px solid ${({ theme }) => theme.colors.focus};
      outline: none;
      margin: -1px;
    }
  }

  ${getMainSplitButtonClassicStyles}
`;

StyledSplitButton.defaultProps = {
  theme: baseTheme
};

export default StyledSplitButton;
