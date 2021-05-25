import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import StyledCardFooter from "./card-footer.style";

const CardFooter = ({ spacing, children, ...props }) => {
  return (
    <StyledCardFooter
      key="card-footer"
      data-element="card-footer"
      spacing={spacing}
      {...props}
    >
      {children}
    </StyledCardFooter>
  );
};

CardFooter.propTypes = {
  ...styledSystemPropTypes.space,
  children: PropTypes.node.isRequired,
  /** Predefined size of CardFooter for applying padding (small | medium | large). For more granular control these can be over-ridden by Spacing props from styled-system (see table below). */
  spacing: PropTypes.oneOf(["small", "medium", "large"]),
};

export default CardFooter;
