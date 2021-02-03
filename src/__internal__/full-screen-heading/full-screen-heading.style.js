import styled, { css } from "styled-components";
import {
  StyledHeader,
  StyledHeading,
} from "../../components/heading/heading.style";
import StyledIconButton from "../../components/icon-button/icon-button.style";
import baseTheme from "../../style/themes/base";

export const StyledHeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledFullScreenHeading = styled.div`
  ${({ hasContent }) =>
    hasContent &&
    css`
      border-bottom: 1px solid ${({ theme }) => theme.disabled.border};
    `}
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  padding: 0 16px;
  @media screen and (min-width: 600px) {
    padding: 0 24px;
  }
  @media screen and (min-width: 960px) {
    padding: 0 32px;
  }
  @media screen and (min-width: 1260px) {
    padding: 0 40px;
  }

  ${StyledHeading} {
    width: auto;
    margin-bottom: 24px;

    ${StyledHeader} {
      background-color: transparent;
      padding-bottom: 0;
      margin: 22px 24px 0 0;
    }
  }

  ${StyledIconButton} {
    margin-top: 26px;
  }
`;

StyledFullScreenHeading.defaultProps = {
  theme: baseTheme,
};

export default StyledFullScreenHeading;
