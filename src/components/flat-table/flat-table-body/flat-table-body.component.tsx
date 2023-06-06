import React from "react";

export interface FlatTableBodyProps {
  /** Array of FlatTableRow. */
  children: React.ReactNode;
}

export const FlatTableBody = React.forwardRef<
  HTMLTableSectionElement,
  FlatTableBodyProps
>(({ children, ...rest }: FlatTableBodyProps, ref) => {
  return (
    <tbody ref={ref} {...rest}>
      {children}
    </tbody>
  );
});

FlatTableBody.displayName = "FlatTableBody";

export default FlatTableBody;
