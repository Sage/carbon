import React from "react";
import propTypes from "@styled-system/prop-types";
import PropTypes from "prop-types";
import { StyledDd } from "./definition-list.style";

const Dd = ({ children, ...rest }) => {
  const { mb } = rest;
  return (
    <StyledDd mb={mb || 2} {...rest}>
      {children}
    </StyledDd>
  );
};

Dd.propTypes = {
  ...propTypes.space,
  /** Prop to render string or node in the `<Dd></Dd>` tags */
  children: PropTypes.node.isRequired,
};

export default Dd;
