import React, { useCallback } from "react";

interface SharedProps {
  childrenMap: {
    [key: string]: {
      onKeyDown?: (
        ev: React.KeyboardEvent<HTMLElement>,
        index?: number
      ) => void;
      index?: number;
      ref?: React.RefObject<HTMLElement>;
      checked?: boolean;
    };
  };
  [key: string]: unknown;
}
export interface ChildrenMapperContextProps extends SharedProps {
  registerChild?: (id: string, props?: Record<string, unknown>) => void;
  unregisterChild?: (id: string) => void;
}

export const ChildrenMapperContext = React.createContext<ChildrenMapperContextProps>(
  {
    childrenMap: {},
  }
);

interface ChildrenMapperProviderProps extends SharedProps {
  children: React.ReactNode;
  registeredChildren: Array<[string, Record<string, unknown> | undefined]>;
  setRegisteredChildren: (
    cb: (
      value: Array<[string, Record<string, unknown> | undefined]>
    ) => Array<[string, Record<string, unknown> | undefined]>
  ) => void;
}

const ChildrenMapperProvider = ({
  children,
  registeredChildren,
  setRegisteredChildren,
  ...rest
}: ChildrenMapperProviderProps) => {
  const registerChildFn = useCallback(
    (id: string, childProps?: Record<string, unknown>) => {
      if (registeredChildren.some(([childId]) => childId === id)) return;

      setRegisteredChildren((previousState) => [
        ...previousState,
        [id, childProps],
      ]);
    },
    [registeredChildren, setRegisteredChildren]
  );

  const unregisterChildFn = useCallback(
    (id: string) => {
      setRegisteredChildren((previousState) =>
        previousState.filter(([childId]) => childId !== id)
      );
    },
    [setRegisteredChildren]
  );

  return (
    <ChildrenMapperContext.Provider
      value={{
        registerChild: registerChildFn,
        unregisterChild: unregisterChildFn,
        ...rest,
      }}
    >
      {children}
    </ChildrenMapperContext.Provider>
  );
};

ChildrenMapperProvider.displayName = "ChildrenMapper";

export default ChildrenMapperProvider;
