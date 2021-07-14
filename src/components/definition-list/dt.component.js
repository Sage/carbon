import React from "react";
import propTypes from "@styled-system/prop-types";
import PropTypes from "prop-types";
import { StyledDt } from "./definition-list.style";

const Dt = ({ pr = 3, children, mb = 2, ...rest }) => {
  return (
    <StyledDt data-element="dt" mb={mb} pr={pr} {...rest}>
      {children}
    </StyledDt>
  );
};

Dt.propTypes = {
  ...propTypes.space,
  /** Child elements */
  children: PropTypes.node.isRequired,
};

export default Dt;
