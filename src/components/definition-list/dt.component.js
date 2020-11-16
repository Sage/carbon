import React from "react";
import propTypes from "@styled-system/prop-types";
import PropTypes from "prop-types";
import { StyledDt } from "./definition-list.style";

const Dt = ({ pr = 3, children, mb = 2, ...props }) => {
  return (
    <StyledDt data-element="dt" mb={mb} pr={pr} {...props}>
      {children}
    </StyledDt>
  );
};

Dt.propTypes = {
  ...propTypes.space,
  /** prop to render string for `<Dt />` */
  children: PropTypes.string.isRequired,
};

export default Dt;
