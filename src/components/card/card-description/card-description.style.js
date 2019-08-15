import styled, { css } from 'styled-components';

const StyledCardDescription = styled.div`
${({ theme }) => {
    return css`
      text-align: center;
      margin-bottom: 32px;

      p {
        margin: 0;
      }

      .primary-description {
        color: ${theme.card.descriptionPrimary};
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.48px;
        margin-bottom: 10px;
        text-align: center  
      }

      .secondary-description {
        color: ${theme.card.descriptionSecondary};
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 8px;
        text-align: center;
      }

      .tertiary-description {
        color: ${theme.card.descriptionTertiary};
        font-size: 12px;
        text-align: center;
        text-transform: uppercase;
      }
  `;
  }
}`;

export default StyledCardDescription;
