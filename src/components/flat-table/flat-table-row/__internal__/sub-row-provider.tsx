import React, { createContext, useCallback, useRef } from "react";

export interface SubRowContextProps {
  isSubRow?: boolean;
  firstRowId: string;
  addRow: (id: string) => void;
  removeRow: (id: string) => void;
}

export const SubRowContext = createContext<SubRowContextProps>({
  isSubRow: false,
  firstRowId: "",
  addRow: () => {},
  removeRow: () => {},
});

const SubRowProvider = ({ children }: { children: React.ReactNode }) => {
  const rowIds = useRef<string[]>([]);

  const addRow = useCallback((id: string) => {
    rowIds.current = [...rowIds.current, id];
  }, []);

  const removeRow = useCallback((id: string) => {
    rowIds.current = rowIds.current.filter((rowId) => rowId !== id);
  }, []);

  return (
    <SubRowContext.Provider
      value={{
        isSubRow: true,
        firstRowId: rowIds.current[0],
        addRow,
        removeRow,
      }}
    >
      {children}
    </SubRowContext.Provider>
  );
};

SubRowProvider.displayName = "SubRowProvider";

export default SubRowProvider;
