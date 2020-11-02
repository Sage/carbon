import React from "react";
import PropTypes from "prop-types";

import useInputBehaviour from "./useInputBehaviour";

const defaultValue = {};
const InputGroupContext = React.createContext(defaultValue);

const InputGroupBehaviour = ({ children }) => {
  const contextValue = useInputBehaviour();

  return (
    <InputGroupContext.Provider value={contextValue}>
      {children}
    </InputGroupContext.Provider>
  );
};

InputGroupBehaviour.propTypes = {
  children: PropTypes.node,
};

export { InputGroupContext, InputGroupBehaviour };
