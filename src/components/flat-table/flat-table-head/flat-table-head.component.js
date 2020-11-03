import React from "react";
import PropTypes from "prop-types";
import StyledFlatTableHead from "./flat-table-head.style";

const FlatTableHead = ({ children }) => {
  return <StyledFlatTableHead>{children}</StyledFlatTableHead>;
};

FlatTableHead.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FlatTableHead;
