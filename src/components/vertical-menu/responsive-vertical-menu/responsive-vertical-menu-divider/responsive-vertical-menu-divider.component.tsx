import React from "react";
import { MarginProps } from "styled-system";

import {
  StyledResponsiveVerticalMenuDivider,
  StyledHr,
} from "./responsive-vertical-menu-divider.style";
import { filterStyledSystemMarginProps } from "../../../../style/utils";
import { useDepth } from "../__internal__/depth.context";
import { useResponsiveVerticalMenu } from "../responsive-vertical-menu.context";

export interface ResponsiveVerticalMenuDividerProps extends MarginProps {}

export const ResponsiveVerticalMenuDivider = (
  props: ResponsiveVerticalMenuDividerProps,
) => {
  const depth = useDepth();
  const { responsiveMode } = useResponsiveVerticalMenu();

  return (
    <StyledResponsiveVerticalMenuDivider
      data-component="responsive-vertical-menu-divider"
      data-element="responsive-vertical-menu-divider"
      data-role="responsive-vertical-menu-divider"
      depth={depth}
      responsive={responsiveMode}
    >
      <StyledHr {...filterStyledSystemMarginProps(props)} />
    </StyledResponsiveVerticalMenuDivider>
  );
};

export default ResponsiveVerticalMenuDivider;
