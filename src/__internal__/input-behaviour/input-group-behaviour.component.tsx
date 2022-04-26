import React from "react";

import useInputBehaviour, { InputContextProps } from "./useInputBehaviour";
import { InputBehaviourProps } from "./input-behaviour.component";

const InputGroupContext = React.createContext<InputContextProps>({});

export interface InputGroupBehaviourProps extends InputBehaviourProps {
  blockGroupBehaviour?: boolean;
}

const InputGroupBehaviour = ({
  children,
  blockGroupBehaviour,
}: InputGroupBehaviourProps) => {
  const contextValue = useInputBehaviour(blockGroupBehaviour);

  return (
    <InputGroupContext.Provider value={contextValue}>
      {children}
    </InputGroupContext.Provider>
  );
};

export { InputGroupContext, InputGroupBehaviour };
