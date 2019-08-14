import styled, { css } from 'styled-components';

const StyledCardHeader = styled.div`
  ${() => {
    return css`
      padding: 32px 32px 0;
      margin-bottom: 24px;
    `;
  }
}`;

export default StyledCardHeader;
