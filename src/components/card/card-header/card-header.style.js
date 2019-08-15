import styled, { css } from 'styled-components';

const StyledCardHeader = styled.div`
  ${() => {
    return css`
      padding: 32px 32px;
      min-height: 48px;

      h2{
        font-size: 22px;
        font-weight: 700;
        line-height: 26px;
      }

      p{
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
      }
      
      h2, p{
        margin: 0;
      }
    `;
  }
}`;

export default StyledCardHeader;
