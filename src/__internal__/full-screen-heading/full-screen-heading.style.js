import styled, { css } from "styled-components";
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
  align-items: baseline;

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

  .carbon-heading {
    width: auto;
    .carbon-heading__header {
      background-color: transparent;
      align-items: center;
      display: flex;
      padding-bottom: 0;
      border: none;
      margin: 22px 24px 24px 0;

      .icon-chevron_left:before {
        font-size: 24px;
      }

      .carbon-heading__back {
        margin-top: -8px;
        margin-left: -5px;
      }
    }
  }
`;

StyledFullScreenHeading.defaultProps = {
  theme: baseTheme,
};

export default StyledFullScreenHeading;
