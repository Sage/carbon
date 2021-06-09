import styled, { css } from "styled-components";

import { baseTheme } from "../../../style/themes";

const StyledNavigationItem = styled.li`
  width: 100%;

  a {
    cursor: pointer;
    display: block;
    text-decoration: none;
    color: ${({ theme }) => theme.text.color};
    background-color: transparent;
    border-left: 3px solid ${({ theme }) => theme.disabled.background};
    font-weight: 700;
    padding: 12px 24px;

    &:focus {
      outline: none;
      position: relative;

      &:before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: -3px;
        right: 0;
        z-index: 1;
        box-shadow: 0 0 6px ${({ theme }) => theme.colors.focus};
      }
    }

    &:hover {
      background-color: ${({ isSelected, theme }) =>
        !isSelected && theme.anchorNavigation.navItemHoverBackground};
    }

    ${({ isSelected, theme }) =>
      isSelected &&
      css`
        background-color: ${theme.colors.white};
        border-left-color: ${theme.colors.primary};
      `}
  }
`;

StyledNavigationItem.defaultProps = {
  theme: baseTheme,
};

export default StyledNavigationItem;
