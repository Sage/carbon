import styled, { css } from "styled-components";

import { VariantType } from "../menu-item";
import menuConfigVariants from "../menu.config";
import { MenuType } from "../__internal__/strict-menu.context";

interface StyledTitleProps {
  variant?: VariantType;
  menuType: MenuType;
  shouldWrap?: boolean;
}

const StyledTitle = styled.h2<StyledTitleProps>`
  ${({ menuType, variant, shouldWrap }) => css`
    margin: 0px;
    padding: 16px 16px 8px;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    line-height: 14px;
    cursor: default;
    color: ${menuConfigVariants[menuType].title};
    ${variant === "alternate" &&
    `background-color: ${menuConfigVariants[menuType].alternate};`}
    white-space: ${shouldWrap ? "normal" : "nowrap"};
  `}
`;

const StyledSegmentChildren = styled.ul<{
  variant?: VariantType;
  menuType: MenuType;
}>`
  ${({ menuType, variant }) => css`
    padding: 0;

    li {
      list-style: none;
      ${variant === "alternate" &&
      css`
        background-color: ${menuConfigVariants[menuType].alternate};
      `}

      &:not(&:last-child) a,
      &:not(&:last-child) button,
      &:not(&:last-child) > span,
      &:not(&:last-child) > div {
        border-radius: var(--borderRadius000);
      }
    }
  `}
`;

export { StyledTitle, StyledSegmentChildren };
