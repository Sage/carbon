import React, { useContext } from "react";
import PropTypes from "prop-types";

import { InlineInputsContext } from "../../components/inline-inputs/inline-inputs.component";
import useInputBehaviour from "./useInputBehaviour";

const defaultValue = {};
const InputContext = React.createContext(defaultValue);

const InputBehaviour = ({ children }) => {
  const contextValue = useInputBehaviour();
  const { ariaLabelledBy } = useContext(InlineInputsContext);

  return (
    <InputContext.Provider value={{ ...contextValue, ariaLabelledBy }}>
      {children}
    </InputContext.Provider>
  );
};

InputBehaviour.propTypes = {
  children: PropTypes.node,
};

export { InputContext, InputBehaviour };
