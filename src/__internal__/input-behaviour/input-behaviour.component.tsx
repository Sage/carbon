import React from "react";
import useInputBehaviour, { InputContextProps } from "./useInputBehaviour";

const InputContext = React.createContext<InputContextProps>({});

export interface InputBehaviourProps {
  children?: React.ReactNode;
}

const InputBehaviour = ({ children }: InputBehaviourProps) => {
  const contextValue = useInputBehaviour();

  return (
    <InputContext.Provider value={{ ...contextValue }}>
      {children}
    </InputContext.Provider>
  );
};

export { InputContext, InputBehaviour };
