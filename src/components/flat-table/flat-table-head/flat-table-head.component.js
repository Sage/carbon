import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import StyledFlatTableHead from "./flat-table-head.style";
import FlatTableRowHeader from "../flat-table-row-header";

const getRefs = (length) => Array.from({ length }, () => React.createRef());

const FlatTableHead = ({ children, ...rest }) => {
  const [rowHeights, setRowHeights] = useState([]);
  const refs = getRefs(React.Children.count(children));
  let hasFlatTableRowHeader;

  useEffect(() => {
    if (React.Children.count(children) > 1) {
      setRowHeights(refs.map((ref) => ref.current.clientHeight));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        hasFlatTableRowHeader = React.Children.toArray(
          child.props.children
        ).find((c) => c.type === FlatTableRowHeader);
        return React.cloneElement(child, {
          ...child.props,
          stickyOffset: rowHeights.slice(0, index).reduce((a, b) => a + b, 0),
          ref: refs[index],
          applyBorderLeft: previousRowHasHeader && !hasFlatTableRowHeader,
        });
      })}
    </StyledFlatTableHead>
  );
};

FlatTableHead.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FlatTableHead;
