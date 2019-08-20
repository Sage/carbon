import styled, { css } from 'styled-components';
import {
  ALIGN_LEFT,
  ALIGN_RIGHT,
  POSITION_HEADER,
  POSITION_MIDDLE,
  POSITION_FOOTER
} from '../card.const';

const StyledCardSection = styled.div`
  ${({
    alignment,
    positionType,
    primary,
    secondary,
    tertiary,
    theme
  }) => {
    return css`
      ${alignment === ALIGN_LEFT && css`
        width: 50%;
        text-align: left;
      `}

      ${alignment === ALIGN_RIGHT && css`
        width: 50%;
        text-align: right;
      `}

      ${primary && positionType === POSITION_HEADER && css`
        font-size: 22px;
        font-weight: 700;
        line-height: 26px;
        margin: 0;
      `}

      ${secondary && positionType === POSITION_HEADER && css`
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
        margin: 0;
      `}

      ${primary && positionType === POSITION_MIDDLE && css`
        color: ${theme.card.middlePrimary};
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.48px;
        margin-bottom: 10px;

        ${!alignment && css`
          text-align: center;
        `}
      `}

      ${secondary && positionType === POSITION_MIDDLE && css`
        color: ${theme.card.middleSecondary};
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 8px;

        ${!alignment && css`
          text-align: center;
        `}
      `}

      ${tertiary && positionType === POSITION_MIDDLE && css`
        color: ${theme.card.middleTertiary};
        font-size: 12px;
        
        ${!alignment && css`
          text-align: center;
        `}
        
        text-transform: uppercase;
      `}

      ${primary && positionType === POSITION_FOOTER && css`
        line-height: 30px;
        margin: 0;
        color:${theme.card.footerText};
        font-weight: 600;
        padding: 12px 0;
      `}
    `;
  }
}`;

export default StyledCardSection;
