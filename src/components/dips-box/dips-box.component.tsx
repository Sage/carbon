import React from "react";
import { StyledDipsBox } from "./dips-box.style";
import {
  PaddingProps,
  MarginProps,
  FlexboxProps,
  LayoutProps,
} from "./utils/spacing-types";

export interface DipsBoxProps
  extends PaddingProps,
    MarginProps,
    FlexboxProps,
    LayoutProps {
  children?: React.ReactNode;
}

export const DipsBox = React.forwardRef<HTMLDivElement, DipsBoxProps>(
  (props, ref) => {
    const { children, ...rest } = props;

    return (
      <StyledDipsBox ref={ref} {...rest}>
        {children}
      </StyledDipsBox>
    );
  },
);

export default DipsBox;
DipsBox.displayName = "DipsBox";
