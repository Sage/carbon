import styled, { css } from 'styled-components';
import OptionsHelper from '../../../utils/helpers/options-helper';

const { cardSectionPositions } = OptionsHelper;

const StyledCardPosition = styled.div`
  ${({ positionType, theme }) => {
    return css`
      ${positionType === cardSectionPositions.header && css`
          padding: 32px 32px;
          min-height: 48px;
      `};

      ${positionType === cardSectionPositions.middle && css`
        padding: 0 32px;
        margin-bottom: 32px;
      `}

      ${positionType === cardSectionPositions.footer && css` 
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
