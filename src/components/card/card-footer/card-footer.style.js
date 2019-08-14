import styled, { css } from 'styled-components';

const StyledCardFooter = styled.div`
${({ theme }) => {
    return css`
      background-color: ${theme.card.footerBackground};
      border-top: ${theme.card.footerBorder};
      height: 56px;
      line-height: 56px;
      padding: 0;
      text-align: center;
    `;
  }
}`;

export default StyledCardFooter;
