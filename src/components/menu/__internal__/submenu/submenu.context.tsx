import React from "react";

export interface SubmenuContextProps {
  submenuFocusId?: string | null;
  updateFocusId?: (id: string) => void;
  handleKeyDown?: (
    event:
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  blockIndex?: number;
  submenuMaxWidth?: string;
  closeSubmenu?: () => void;
}

const SubmenuContext = React.createContext<SubmenuContextProps>({});

export default SubmenuContext;
