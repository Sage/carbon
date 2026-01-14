import React from "react";
import { TagProps } from "../../../__internal__/utils/helpers/tags";

export interface FlatTableBodyProps extends TagProps {
  /** Array of FlatTableRow. */
  children: React.ReactNode;
}

const FlatTableBody = React.forwardRef<
  HTMLTableSectionElement,
  FlatTableBodyProps
>(({ children, ...rest }: FlatTableBodyProps, ref) => {
  return (
    <tbody ref={ref} data-component="flat-table-body" {...rest}>
      {children}
    </tbody>
  );
});

FlatTableBody.displayName = "FlatTableBody";

export default FlatTableBody;
