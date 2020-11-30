import styled, { css } from "styled-components";
import { space } from "styled-system";
import { baseTheme } from "../../style/themes";
import Box from "../box";

const StyledNavigationBar = styled(Box)`
  margin: 0 auto;
  padding: 0 40px;

  ${space}

  @media only screen and (max-width: 1366px) {
    padding: 0 30px;
  }

  @media only screen and (max-width: 1024px) {
    padding: 0 25px;
  }

  @media screen {
    ${space}
  }

  .carbon-logo {
    margin-right: 10px;
  }

  ${({ navigationType, theme }) => css`
    min-height: 40px;
    background-color: ${theme.navigationBar.light.background};
    border-bottom: 1px solid ${theme.navigationBar.light.borderBottom};

    ${navigationType === "dark" &&
    css`
      background-color: ${theme.navigationBar.dark.background};
      border-bottom: 1px solid ${theme.navigationBar.dark.borderBottom};
      color: ${theme.colors.white};
    `}
  `}
`;

export const StyledNavigationBarContent = styled.div`
  line-height: 40px;
  max-width: 1600px;
  min-width: 958px;

  & > * {
    box-sizing: border-box;
    display: inline-block;
    height: 40px;
    vertical-align: middle;
  }
`;

StyledNavigationBar.defaultProps = {
  theme: baseTheme,
};

export default StyledNavigationBar;
