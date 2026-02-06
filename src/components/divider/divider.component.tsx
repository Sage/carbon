import React, { useContext } from "react";
import { SpaceProps } from "styled-system";
import MenuContext from "../menu/__internal__/menu.context";
import {
  StyledVerticalDividerWrapper,
  StyledVerticalDivider,
  StyledHorizontalDivider,
} from "./divider.style";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";

export interface DividerProps extends SpaceProps, TagProps {
  /** Sets Divider type */
  type?: "vertical" | "horizontal";
  /** Sets Divider variant */
  variant?: "typical" | "prominent";
  /** Set the style of the Divider to inverse */
  inverse?: boolean;
  /** Shorthand for the height attribute.
   * Only available for the `vertical` type.
   * */
  h?: number | string;
  /** Height attribute of the component.
   * Only available for the `vertical` type.
   * */
  height?: number | string;
  /**
   * Sets the display: inline css attribute on the component
   * To be used in non-flex containers.
   * Only available for the `vertical` type.
   */
  displayInline?: boolean;
  /**
   * Set the divider to be hidden from screen readers.
   * Please note that this cannot be overridden when inside a Menu.
   * */
  "aria-hidden"?: boolean;
  /** Breakpoint for adaptive left and right margins (below the breakpoint they go to 0).
   * Enables the adaptive behaviour when set.
   * Only available for `horizontal` type.
   * */
  adaptiveMxBreakpoint?: number;
}

const Divider = ({
  type = "vertical",
  h,
  height,
  displayInline = false,
  "aria-hidden": ariaHidden,
  variant = "typical",
  inverse = false,
  adaptiveMxBreakpoint,
  ml,
  mr,
  ...rest
}: DividerProps): JSX.Element => {
  const { inMenu } = useContext(MenuContext);
  const largeScreen = useIsAboveBreakpoint(adaptiveMxBreakpoint);

  if (type === "horizontal") {
    let marginLeft = ml;
    let marginRight = mr;
    if (adaptiveMxBreakpoint && !largeScreen) {
      marginLeft = 0;
      marginRight = 0;
    }
    return (
      <StyledHorizontalDivider
        data-role="divider"
        aria-hidden={ariaHidden}
        variant={variant}
        inverse={inverse}
        ml={marginLeft}
        mr={marginRight}
        mt={rest.mt || 3}
        mb={rest.mb || 3}
        {...rest}
        {...tagComponent("divider", rest)}
      />
    );
  }

  return (
    <StyledVerticalDividerWrapper
      data-role="divider"
      p={rest.p || 3}
      height={h || height}
      displayInline={displayInline}
      ml={ml}
      mr={mr}
      {...rest}
      as={inMenu ? "li" : "div"}
      aria-hidden={inMenu || ariaHidden}
      {...tagComponent("divider", { ...rest })}
    >
      <StyledVerticalDivider
        data-role="divider-content"
        variant={variant}
        inverse={inverse}
      />
    </StyledVerticalDividerWrapper>
  );
};

Divider.displayName = "Divider";

export default Divider;
