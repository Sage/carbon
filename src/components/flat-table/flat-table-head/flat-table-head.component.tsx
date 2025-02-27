import React, { useEffect, useState, useRef } from "react";
import { TagProps } from "../../../__internal__/utils/helpers/tags";
import StyledFlatTableHead from "./flat-table-head.style";
import { buildPositionMap } from "../__internal__";
import FlatTableHeadContext from "./__internal__/flat-table-head.context";

export interface FlatTableHeadProps extends TagProps {
  /** Array of FlatTableRow. */
  children: React.ReactNode;
}

export const FlatTableHead = ({ children, ...rest }: FlatTableHeadProps) => {
  const ref = useRef<HTMLTableSectionElement>(null);
  const [stickyOffsets, setStickyOffsets] = useState<Record<string, number>>(
    {},
  );

  useEffect(() => {
    const headerRows = ref.current?.querySelectorAll("tr");

    /* istanbul ignore else */
    if (headerRows) {
      setStickyOffsets(
        buildPositionMap(Array.from(headerRows), "offsetHeight"),
      );
    } else {
      setStickyOffsets({});
    }
  }, [children]);

  return (
    <StyledFlatTableHead ref={ref} data-component="flat-table-head" {...rest}>
      <FlatTableHeadContext.Provider value={{ stickyOffsets }}>
        {children}
      </FlatTableHeadContext.Provider>
    </StyledFlatTableHead>
  );
};

export default FlatTableHead;
