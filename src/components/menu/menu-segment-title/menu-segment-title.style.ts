import styled, { css } from "styled-components";

import { MenuVariantType } from "../menu.component";
import { VariantType } from "../menu-item";
import menuConfigVariants from "../menu.config";

interface StyledTitleProps {
  $variant?: VariantType;
  $menuVariant: MenuVariantType;
  $shouldWrap?: boolean;
  $isInFullscreen?: boolean;
}

const StyledTitle = styled.h2<StyledTitleProps>`
  ${({ $menuVariant, $variant, $shouldWrap, $isInFullscreen }) => css`
    margin: var(--global-space-none);
    padding: var(--global-space-comp-s) var(--global-space-comp-l)
      var(--global-space-none);
    text-transform: uppercase;
    cursor: default;
    white-space: ${$shouldWrap ? "normal" : "nowrap"};

    font-size: 12px;
    font-weight: 500;
    line-height: 150%;
    color: ${menuConfigVariants[$menuVariant].title};
    background-color: ${menuConfigVariants[$menuVariant].submenuItemBackground};

    ${$variant === "alternate" &&
    css`
      background-color: ${menuConfigVariants[$menuVariant].alternate};
    `}

    ${$isInFullscreen &&
    css`
      background-color: ${menuConfigVariants[$menuVariant].background};
      padding: var(--global-space-comp-s) var(--global-space-comp-l);
    `}
  `}
`;

const StyledSegmentChildren = styled.ul`
  padding: 0;
`;

export { StyledTitle, StyledSegmentChildren };
