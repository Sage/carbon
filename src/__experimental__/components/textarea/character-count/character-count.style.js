import styled, { css } from 'styled-components';
import baseTheme from '../../../../style/themes/base';

const StyledCharacterCount = styled.div`
  text-align: right;
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: 4px;
  color: ${({ theme, isOverLimit }) => (isOverLimit ? theme.colors.error : theme.disabled.disabled)};

  ${({ isOverLimit }) => isOverLimit && css`
    font-weight: 700;    
  `}

`;

StyledCharacterCount.defaultProps = {
  theme: baseTheme
};

export default StyledCharacterCount;
