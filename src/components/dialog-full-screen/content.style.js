import styled, { css } from "styled-components";
import FullScreenHeading from "../../__internal__/full-screen-heading/full-screen-heading.style";
import contentClassicStyle from "./content-classic.style";

const StyledContent = styled.div`
  overflow-y: auto;
  padding: 0 16px;

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

  ${({ headingHeight }) => css`
    ${FullScreenHeading} + & {
      height: calc(100% - ${headingHeight}px);
    }
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

  ${contentClassicStyle}
`;

StyledContent.defaultProps = {
  headingHeight: 0,
};

export default StyledContent;
