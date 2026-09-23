import styled, { css } from "styled-components";
import menuConfigVariants from "../menu.config";
import { MenuDividerProps } from "./menu-divider.component";

interface StyledDividerProps {
  $menuVariant: "white" | "black";
  $size: MenuDividerProps["size"];
  $inFullscreenView?: boolean;
}

const StyledDivider = styled.div<StyledDividerProps>`
  ${({ $menuVariant, $size, $inFullscreenView }) => css`
    background-color: ${menuConfigVariants[$menuVariant].divider};
    margin: 0 var(--global-space-comp-l);
    height: 1px;

    ${$inFullscreenView &&
    css`
      margin: var(--global-space-comp-s) var(--global-space-comp-l);
    `}

    ${$size === "large" &&
    css`
      margin: 0;
      height: 4px;
    `}
  `}
`;

export default StyledDivider;
