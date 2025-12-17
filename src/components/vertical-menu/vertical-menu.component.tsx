import React from "react";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

import { StyledVerticalMenu, StyledList } from "./vertical-menu.style";
import { VerticalMenuProvider } from "./__internal__/vertical-menu.context";

export interface VerticalMenuProps extends TagProps {
  /** An aria-label attribute for the menu */
  "aria-label"?: string;
  /** An aria-labelledby attribute for the menu */
  "aria-labelledby"?: string;
  /** Width of the menu */
  width?: string;
  /** Content of the menu - VerticalMenuItem */
  children: React.ReactNode;
  /** Height of the menu */
  height?: string;
}

export const VerticalMenu = ({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  width = "322px",
  children,
  height = "100%",
  ...rest
}: VerticalMenuProps) => {
  return (
    <StyledVerticalMenu
      boxSizing="border-box"
      scrollVariant="dark"
      backgroundColor="var(--colorsComponentsLeftnavWinterStandardBackground)"
      width={width}
      height={height}
      py={1}
      as="nav"
      overflow="auto"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      {...tagComponent("vertical-menu", rest)}
    >
      <StyledList>
        <VerticalMenuProvider value={{ isFullScreen: false }}>
          {children}
        </VerticalMenuProvider>
      </StyledList>
    </StyledVerticalMenu>
  );
};

export default VerticalMenu;
