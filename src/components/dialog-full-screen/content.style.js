import styled, { css } from "styled-components";
import { StyledFormFooter } from "../form/form.style";

const StyledContent = styled.div`
  overflow-y: auto;
  padding: 0 16px;
  flex: 1;

  ${StyledFormFooter}.sticky {
    padding: 16px;

    @media screen and (min-width: 600px) {
      padding: 16px 24px;
    }
    @media screen and (min-width: 960px) {
      padding: 16px 32px;
    }
    @media screen and (min-width: 1260px) {
      padding: 16px 40px;
    }
  }

  ${({ disableContentPadding }) => css`
    ${!disableContentPadding &&
    css`
      @media screen and (min-width: 600px) {
        padding: 0 24px;
      }
      @media screen and (min-width: 960px) {
        padding: 0 32px;
      }
      @media screen and (min-width: 1260px) {
        padding: 0 40px;
      }
    `}

    ${disableContentPadding &&
    css`
      padding: 0;
    `}
  `}

  ${({ hasHeader }) =>
    !hasHeader &&
    `
    padding-top: 0;
    margin-top: -25px;

    .carbon-app-wrapper {
      max-width: 100%;
      padding: 0;
      height: 70px;
    }
  `}
`;

export default StyledContent;
