import React from "react";
import PropTypes from "prop-types";

const DeprecationWarning = ({ children }) => (
  <div
    style={{
      backgroundColor: "red",
      textAlign: "center",
      color: "white",
      padding: 20,
      fontWeight: "bold",
      marginBottom: 10,
    }}
  >
    {children}
  </div>
);

DeprecationWarning.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DeprecationWarning;
