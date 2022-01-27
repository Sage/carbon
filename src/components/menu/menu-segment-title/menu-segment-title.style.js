import styled, { css } from "styled-components";
import { baseTheme } from "../../../style/themes";

const StyledTitle = styled.div`
  ${({ menuType, theme, variant }) => css`
    padding: 16px 16px 8px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 12px;
    cursor: default;
    color: ${theme.menu[menuType].title};
    ${variant === "alternate"
      ? `background: ${theme.menu[menuType].alternate};`
      : ""};
  `}
`;

StyledTitle.defaultProps = {
  theme: baseTheme,
};

export default StyledTitle;
