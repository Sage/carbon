import styled, { css } from "styled-components";
import { baseTheme } from "../../../style/themes";

const StyledDivider = styled.div`
  cursor: default;
  ${({ menuType, theme, size }) => css`
    margin: 0px ${size === "large" ? "" : "16px"};
    height: ${size === "large" ? "4px" : "1px"};
    background: ${theme.menu[menuType].divider};
  `}
`;

StyledDivider.defaultProps = {
  theme: baseTheme,
};

export default StyledDivider;
