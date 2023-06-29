import React, { createContext, useCallback, useState } from "react";

export interface FlatTableRowContextProps {
  isSubRow: boolean;
  firstRowId: string;
  addRow: (id: string) => void;
  removeRow: (id: string) => void;
}

export const FlatTableRowContext = createContext<FlatTableRowContextProps>({
  isSubRow: true,
  firstRowId: "",
  addRow: () => {},
  removeRow: () => {},
});

const FlatTableRowProvider = ({ children }: { children: React.ReactNode }) => {
  const [rowIds, setRowIds] = useState<string[]>([]);

  const addRow = useCallback((id: string) => {
    setRowIds((p) => [...p, id]);
  }, []);

  const removeRow = useCallback((id: string) => {
    setRowIds((p) => p.filter((rowId) => rowId !== id));
  }, []);

  return (
    <FlatTableRowContext.Provider
      value={{ isSubRow: true, firstRowId: rowIds[0], addRow, removeRow }}
    >
      {children}
    </FlatTableRowContext.Provider>
  );
};

FlatTableRowProvider.displayName = "FlatTableRowProvider";

export default FlatTableRowProvider;
