import React from "react";
import PropTypes from "prop-types";

import useInputBehaviour from "./useInputBehaviour";

const defaultValue = {};
const InputGroupContext = React.createContext(defaultValue);

const InputGroupBehaviour = ({ children, blockGroupBehaviour }) => {
  const contextValue = useInputBehaviour(blockGroupBehaviour);

  return (
    <InputGroupContext.Provider value={contextValue}>
      {children}
    </InputGroupContext.Provider>
  );
};

InputGroupBehaviour.propTypes = {
  children: PropTypes.node,
  blockGroupBehaviour: PropTypes.bool,
};

export { InputGroupContext, InputGroupBehaviour };
