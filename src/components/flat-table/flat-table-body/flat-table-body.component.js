import React from "react";
import PropTypes from "prop-types";

const FlatTableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

FlatTableBody.propTypes = {
  /** Array of FlatTableRow. */
  children: PropTypes.node.isRequired,
};

export default FlatTableBody;
