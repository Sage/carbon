import React from "react";
import PropTypes from "prop-types";

import useInputBehaviour from "./useInputBehaviour";

const defaultValue = {};
const InputContext = React.createContext(defaultValue);

const InputBehaviour = ({ children }) => {
  const contextValue = useInputBehaviour();

  return (
    <InputContext.Provider value={contextValue}>
      {children}
    </InputContext.Provider>
  );
};

InputBehaviour.propTypes = {
  children: PropTypes.node,
};

export { InputContext, InputBehaviour };
