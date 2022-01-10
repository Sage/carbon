import styled, { css } from "styled-components";
import { StyledFormFooter, StyledFormContent } from "../form/form.style";

const StyledContent = styled.div`
  overflow-y: auto;
  padding: 0 16px;
  flex: 1;

  ${StyledFormContent}.sticky {
    padding-right: 16px;
    padding-left: 16px;
    margin-right: -16px;
    margin-left: -16px;

    @media screen and (min-width: 600px) {
      padding-right: 24px;
      padding-left: 24px;
      margin-right: -24px;
      margin-left: -24px;
    }
    @media screen and (min-width: 960px) {
      padding-right: 32px;
      padding-left: 32px;
      margin-right: -32px;
      margin-left: -32px;
    }
    @media screen and (min-width: 1260px) {
      padding-right: 40px;
      padding-left: 40px;
      margin-right: -40px;
      margin-left: -40px;
    }
  }

  ${StyledFormFooter}.sticky {
    padding: 16px;

    margin-right: -16px;
    margin-left: -16px;
    width: calc(100% + 32px);

    @media screen and (min-width: 600px) {
      padding: 16px 24px;
      margin-right: -24px;
      margin-left: -24px;
      width: calc(100% + 48px);
    }
    @media screen and (min-width: 960px) {
      padding: 16px 32px;
      margin-right: -32px;
      margin-left: -32px;
      width: calc(100% + 64px);
    }
    @media screen and (min-width: 1260px) {
      padding: 16px 40px;
      margin-right: -40px;
      margin-left: -40px;
      width: calc(100% + 80px);
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
