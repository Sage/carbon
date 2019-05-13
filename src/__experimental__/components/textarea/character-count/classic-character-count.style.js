import styled, { css } from 'styled-components';

const StyledClassicCharacterCount = styled.div`
  text-align: right;
  margin-top: 4px;
  margin-bottom: 4px;

  span {
    font-weight: 700;
  }

  ${({ isOverLimit, theme }) => isOverLimit && css`
    color: ${theme.colors.error}
  `}

`;

export default StyledClassicCharacterCount;
