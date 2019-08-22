import styled, { css } from 'styled-components';

const StyledHeaderPrimary = styled.div`
  font-size: 22px;
  font-weight: 700;
  line-height: 26px;
  margin: 0;
`;

const StyledHeaderSecondary = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  margin: 0;
`;

const StyledMiddlePrimary = styled.div`
  ${({
    theme
  }) => {
    return css`
      color: ${theme.card.middlePrimary};
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.48px;
      margin-bottom: 10px;
    `;
  }
}`;

const StyledMiddleSecondary = styled.div`
  ${({
    theme
  }) => {
    return css`
      color: ${theme.card.middleSecondary};
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 8px;
    `;
  }
}`;

const StyledMiddleTertiary = styled.div`
${({
    theme
  }) => {
    return css`
      color: ${theme.card.middleTertiary};
      font-size: 12px;
      text-transform: uppercase;
    `;
  }
}`;

const StyledFooterPrimary = styled.div`
${({
    theme
  }) => {
    return css`
    line-height: 30px;
    margin: 0;
    color:${theme.card.footerText};
    font-weight: 600;
    padding: 12px 0;
  `;
  }
}`;

const StyledCardSection = styled.div`
  ${({ align }) => {
    return css`
      width: 100%;
      ${align && css`
        text-align: ${align};
      `}
      ${!align && css`
        text-align: center;
      `}
    `;
  }
}`;

export {
  StyledCardSection,
  StyledHeaderPrimary,
  StyledHeaderSecondary,
  StyledMiddlePrimary,
  StyledMiddleSecondary,
  StyledMiddleTertiary,
  StyledFooterPrimary
};
