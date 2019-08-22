import styled, { css } from 'styled-components';
import { POSITION_HEADER, POSITION_MIDDLE, POSITION_FOOTER } from '../card.const';

const StyledCardPosition = styled.div`
  ${({ positionType, theme }) => {
    return css`
      ${positionType === POSITION_HEADER && css`
          padding: 32px 32px;
          min-height: 48px;
      `};

      ${positionType === POSITION_MIDDLE && css`
        padding: 0 32px;
        margin-bottom: 32px;
      `}

      ${positionType === POSITION_FOOTER && css` 
        background-color: ${theme.card.footerBackground};
        border-top: ${theme.card.footerBorder};
        height: 56px;
        line-height: 56px;
        padding: 0 32px;
      `}
    `;
  }
}`;

export default StyledCardPosition;
