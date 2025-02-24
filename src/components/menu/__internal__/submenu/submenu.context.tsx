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
  submenuHasMaxWidth?: boolean;
}

const SubmenuContext = React.createContext<SubmenuContextProps>({});

export default SubmenuContext;
