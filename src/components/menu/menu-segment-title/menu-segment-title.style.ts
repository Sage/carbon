import styled, { css } from "styled-components";

import { VariantType } from "../menu-item";
import menuConfigVariants from "../menu.config";

interface StyledTitleProps {
  $variant?: VariantType;
  $menuVariant: "white" | "black";
  $shouldWrap?: boolean;
  $isInFullscreen?: boolean;
}

const StyledTitle = styled.h2<StyledTitleProps>`
  ${({ $menuVariant, $variant, $shouldWrap, $isInFullscreen }) => css`
    margin: 0;
    padding: 0 var(--global-space-comp-l);
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
