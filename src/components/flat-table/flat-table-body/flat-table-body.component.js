import React from "react";
import PropTypes from "prop-types";

const FlatTableBody = React.forwardRef(({ children, ...rest }, ref) => {
  return (
    <tbody ref={ref} {...rest}>
      {children}
    </tbody>
  );
});

FlatTableBody.propTypes = {
  /** Array of FlatTableRow. */
  children: PropTypes.node.isRequired,
};

export default FlatTableBody;
