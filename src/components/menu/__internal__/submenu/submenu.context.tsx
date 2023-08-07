import React from "react";

export interface SubmenuContextProps {
  submenuFocusId?: string | null;
  updateFocusId?: (id: string) => void;
  handleKeyDown?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
  shiftTabPressed?: boolean;
  blockIndex?: number;
}

const SubmenuContext = React.createContext<SubmenuContextProps>({});

export default SubmenuContext;
