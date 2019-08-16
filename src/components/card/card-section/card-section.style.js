import styled, { css } from 'styled-components';

const StyledCardSection = styled.div`
  ${({ theme }) => {
    return css`
      .positionheader {
        padding: 32px 32px;
        min-height: 48px;
      }

      .positionheader .texttypeprimary {
        font-size: 22px;
        font-weight: 700;
        line-height: 26px;
        margin: 0;
      }

      .positionheader .texttypesecondary {
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
        margin: 0;
      }

      .positionmiddle {
        text-align: center;
        margin-bottom: 32px;
      }

      .positionmiddle .texttypeprimary {
        color: ${theme.card.middlePrimary};
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.48px;
        margin-bottom: 10px;
        text-align: center; 
      }

      .positionmiddle .texttypesecondary {
        color: ${theme.card.middleSecondary};
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 8px;
        text-align: center;
      }

      .positionmiddle .texttypetertiary {
        color: ${theme.card.middleTertiary};
        font-size: 12px;
        text-align: center;
        text-transform: uppercase;
      }

      .positionfooter {
        background-color: ${theme.card.footerBackground};
        border-top: ${theme.card.footerBorder};
        height: 56px;
        line-height: 56px;
        padding: 0;
        text-align: center;
      }

      .positionfooter .texttypeprimary {
        line-height: 30px;
        margin: 0;
        color:${theme.card.footerText};
        font-weight: 600;
        padding: 12px 0;

      }
    `;
  }
}`;

export default StyledCardSection;
