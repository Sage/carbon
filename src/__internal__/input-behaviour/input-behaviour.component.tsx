import React, { useContext } from "react";
import PropTypes from "prop-types";

import { InlineInputsContext } from "../../components/inline-inputs";
import useInputBehaviour, { InputContextProps } from "./useInputBehaviour";

const InputContext = React.createContext<InputContextProps>({});

export interface InputBehaviourProps {
  children?: React.ReactNode;
}

const InputBehaviour = ({ children }: InputBehaviourProps) => {
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
