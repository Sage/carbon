import React, { useContext } from "react";
import propTypes from "@styled-system/prop-types";
import PropTypes from "prop-types";
import { StyledDt } from "./definition-list.style";
import DlContext from "./__internal__/dl.context";

const Dt = ({ children, ...rest }) => {
  const { asSingleColumn } = useContext(DlContext);

  return (
    <StyledDt
      data-element="dt"
      mb={rest.mb || asSingleColumn ? undefined : 2}
      pr={rest.pr || asSingleColumn ? undefined : 3}
      {...rest}
    >
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
