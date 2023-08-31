import React, { createContext, useCallback, useState } from "react";

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
  const [rowIds, setRowIds] = useState<string[]>([]);

  const addRow = useCallback((id: string) => {
    setRowIds((p) => [...p, id]);
  }, []);

  const removeRow = useCallback((id: string) => {
    setRowIds((p) => p.filter((rowId) => rowId !== id));
  }, []);

  return (
    <SubRowContext.Provider
      value={{ isSubRow: true, firstRowId: rowIds[0], addRow, removeRow }}
    >
      {children}
    </SubRowContext.Provider>
  );
};

SubRowProvider.displayName = "SubRowProvider";

export default SubRowProvider;
