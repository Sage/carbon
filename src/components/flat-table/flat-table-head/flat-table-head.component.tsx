import React, { useEffect, useState, useRef } from "react";
import StyledFlatTableHead from "./flat-table-head.style";
import FlatTableRowHeader from "../flat-table-row-header";
import { FlatTableRowProps } from "../flat-table-row";

export interface FlatTableHeadProps {
  /** Array of FlatTableRow. */
  children: React.ReactNode;
}

const getRefs = (length: number) =>
  Array.from({ length }, () => React.createRef<HTMLTableRowElement>());

export const FlatTableHead = ({ children, ...rest }: FlatTableHeadProps) => {
  const [rowHeights, setRowHeights] = useState<number[]>([]);
  const refs = useRef(getRefs(React.Children.count(children)));
  let hasFlatTableRowHeader: boolean;

  useEffect(() => {
    if (React.Children.count(children) > 1) {
      setRowHeights(refs.current.map((ref) => ref.current?.clientHeight || 0));
    }
  }, [children]);

  if (React.Children.count(children) === 1) {
    return <StyledFlatTableHead {...rest}>{children}</StyledFlatTableHead>;
  }

  return (
    <StyledFlatTableHead {...rest}>
      {React.Children.map(children, (child, index) => {
        /* Applies left border if preceding row has a FlatTableRowHeader and current one does not. 
           This is only needed when the preceding row has rowSpans applied, 
           as in any other use case the rows will all have FlatTableRowHeaders */
        const previousRowHasHeader = !!hasFlatTableRowHeader;
        hasFlatTableRowHeader =
          React.isValidElement(child) &&
          !!React.Children.toArray(child.props.children).find(
            (c) =>
              React.isValidElement(c) &&
              (c.type as React.FunctionComponent).displayName ===
                FlatTableRowHeader.displayName
          );
        return (
          React.isValidElement(child) &&
          React.cloneElement(child as React.ReactElement<FlatTableRowProps>, {
            stickyOffset: rowHeights
              .slice(0, index)
              .reduce((a: number, b: number) => a + b, 0),
            ref: refs.current[index],
            applyBorderLeft: previousRowHasHeader && !hasFlatTableRowHeader,
          })
        );
      })}
    </StyledFlatTableHead>
  );
};

export default FlatTableHead;
