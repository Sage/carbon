import React from "react";
import { StyledNextBox } from "./next-box.style";
import {
  PaddingProps,
  MarginProps,
  FlexboxProps,
  LayoutProps,
} from "./utils/next-box-types";

export interface NextBoxProps
  extends PaddingProps,
    MarginProps,
    FlexboxProps,
    LayoutProps {
  children?: React.ReactNode;
}

export const NextBox = React.forwardRef<HTMLDivElement, NextBoxProps>(
  (props, ref) => {
    const { children, ...rest } = props;

    return (
      <StyledNextBox ref={ref} {...rest}>
        {children}
      </StyledNextBox>
    );
  },
);

export default NextBox;
NextBox.displayName = "NextBox";
