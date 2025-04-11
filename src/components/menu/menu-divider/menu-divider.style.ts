import styled, { css } from "styled-components";
import menuConfigVariants from "../menu.config";
import { MenuDividerProps } from "./menu-divider.component";
import { MenuType } from "../__internal__/strict-menu.context";

const StyledDivider = styled.div<MenuDividerProps & { menuType: MenuType }>`
  cursor: default;
  ${({ menuType, size }) => css`
    margin: 0px ${size === "large" ? "" : "16px"};
    height: ${size === "large" ? "4px" : "1px"};
    background-color: ${menuConfigVariants[menuType].divider};
  `}
`;

export default StyledDivider;
