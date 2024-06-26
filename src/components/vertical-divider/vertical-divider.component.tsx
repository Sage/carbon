import React, { useContext } from "react";
import { SpaceProps } from "styled-system";
import { MenuContext } from "../menu/menu.component";
import { StyledVerticalWrapper, StyledDivider } from "./vertical-divider.style";

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

export interface VerticalDividerProps extends SpaceProps {
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
}

export const VerticalDivider = ({
  h,
  height,
  displayInline = false,
  tint = 80,
  ...props
}: VerticalDividerProps): JSX.Element => {
  const { inMenu } = useContext(MenuContext);

  return (
    <StyledVerticalWrapper
      data-component="vertical-divider"
      data-role="vertical-divider"
      p={props.p || 3}
      height={h || height}
      displayInline={displayInline}
      {...props}
      as={inMenu ? "li" : "div"}
      aria-hidden={!!inMenu}
    >
      <StyledDivider data-role="divider" tint={tint} />
    </StyledVerticalWrapper>
  );
};

VerticalDivider.displayName = "VerticalDivider";

export default VerticalDivider;
