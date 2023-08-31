import React, { createContext } from "react";

export interface FlatTableRowContextProps {
  expandable?: boolean;
  onClick?: (ev?: React.MouseEvent<HTMLElement>) => void;
  onKeyDown?: (ev: React.KeyboardEvent<HTMLElement>) => void;
  firstCellId: string | null;
  leftPositions: Record<string, number>;
  rightPositions: Record<string, number>;
  firstColumnExpandable?: boolean;
}

export default createContext<FlatTableRowContextProps>({
  firstCellId: "",
  leftPositions: {},
  rightPositions: {},
});
