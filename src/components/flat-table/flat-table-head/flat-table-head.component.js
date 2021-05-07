import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import StyledFlatTableHead from "./flat-table-head.style";

const getRefs = (length) => Array.from({ length }, () => React.createRef());

const FlatTableHead = ({ children }) => {
  const [rowHeights, setRowHeights] = useState([]);
  const refs = getRefs(React.Children.count(children));

  useEffect(() => {
    if (React.Children.count(children) > 1) {
      setRowHeights(refs.map((ref) => ref.current.clientHeight));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (React.Children.count(children) === 1) {
    return <StyledFlatTableHead>{children}</StyledFlatTableHead>;
  }

  return (
    <StyledFlatTableHead>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          ...child.props,
          stickyOffset: rowHeights.slice(0, index).reduce((a, b) => a + b, 0),
          ref: refs[index],
        })
      )}
    </StyledFlatTableHead>
  );
};

FlatTableHead.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FlatTableHead;
