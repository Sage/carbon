import React from "react";
import {
  FlexBasisProps,
  FlexGrowProps,
  JustifyContentProps,
  MaxWidthProps,
  PaddingProps,
} from "styled-system";
import Box from "../../box";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import StyledDivider from "./flow-cell.style";
import Hr from "../../hr/hr.component";

export interface FlowCellProps
  extends TagProps,
    PaddingProps,
    FlexGrowProps,
    FlexBasisProps,
    JustifyContentProps,
    MaxWidthProps {
  /** The content to render within the responsive cell. */
  children: React.ReactNode;
  hasDivider?: boolean;
}

export const ResponsiveCell = ({
  children,
  flexGrow = 1,
  flexBasis = "160px",
  hasDivider,
  ...rest
}: FlowCellProps) => {
  return (
    <Box
      display="flex"
      position="relative"
      flexGrow={flexGrow}
      flexBasis={flexBasis}
      flexShrink={0}
      {...rest}
      {...tagComponent("responsive-cell", rest)}
    >
      {children}
      {hasDivider ? (
        <StyledDivider>
          <Hr m={0} />
        </StyledDivider>
      ) : null}
    </Box>
  );
};

export default ResponsiveCell;
