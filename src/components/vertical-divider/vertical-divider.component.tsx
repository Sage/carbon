import React, { useContext } from "react";
import { SpaceProps } from "styled-system";
import MenuContext from "../menu/__internal__/menu.context";
import { StyledVerticalWrapper, StyledDivider } from "./vertical-divider.style";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import Logger from "../../__internal__/utils/logger";

/**
 * @deprecated `VerticalDivider` has been deprecated. See the Carbon documentation for migration details.
 */
type TintRange =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 66
  | 67
  | 68
  | 69
  | 70
  | 71
  | 72
  | 73
  | 74
  | 75
  | 76
  | 77
  | 78
  | 79
  | 80
  | 81
  | 82
  | 83
  | 84
  | 85
  | 86
  | 87
  | 88
  | 89
  | 90
  | 91
  | 92
  | 93
  | 94
  | 95
  | 96
  | 97
  | 98
  | 99
  | 100;

/**
 * @deprecated `VerticalDivider` has been deprecated. See the Carbon documentation for migration details.
 */
export interface VerticalDividerProps extends SpaceProps, TagProps {
  /** Shorthand for the height attribute */
  h?: number | string;
  /** Height attribute of the component */
  height?: number | string;
  /**
   * Sets the display: inline css attribute on the component
   * To be used in non-flex containers.
   */
  displayInline?: boolean;
  /** Custom tint of the divider, the supported rage is 1-100 */
  tint?: TintRange;
  /**
   * Set the divider to be hidden from screen readers.
   * Please note that this cannot be overridden when inside a Menu.
   * */
  "aria-hidden"?: boolean;
}

let deprecatedWarnTriggered = false;

/**
 * @deprecated `VerticalDivider` has been deprecated. See the Carbon documentation for migration details.
 */
export const VerticalDivider = ({
  h,
  height,
  displayInline = false,
  tint = 80,
  "aria-hidden": ariaHidden,
  ...props
}: VerticalDividerProps): JSX.Element => {
  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    Logger.deprecate(
      "`VerticalDivider` is deprecated and will soon be removed. Please use `Divider` instead.",
    );
  }

  const { inMenu } = useContext(MenuContext);

  return (
    <StyledVerticalWrapper
      data-role="vertical-divider"
      p={props.p || 3}
      height={h || height}
      displayInline={displayInline}
      {...props}
      as={inMenu ? "li" : "div"}
      aria-hidden={inMenu || ariaHidden}
      {...tagComponent("vertical-divider", props)}
    >
      <StyledDivider data-role="divider" tint={tint} />
    </StyledVerticalWrapper>
  );
};

VerticalDivider.displayName = "VerticalDivider";

export default VerticalDivider;
