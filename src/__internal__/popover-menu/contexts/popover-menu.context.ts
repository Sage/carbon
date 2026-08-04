import { createContext } from "react";

export interface PopoverControlProps {
  "aria-haspopup": "listbox" | "true";
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  role?: string;
  "aria-activedescendant"?: string;
}

export interface SubmenuRenderProps {
  open: boolean;
  submenu: React.ReactNode;
  submenuWidth?: string;
  size: "small" | "medium" | "large";
  onClose: () => void;
  ref: React.RefObject<HTMLUListElement>;
  control: (props: PopoverControlProps) => React.ReactNode;
  triggerRef: React.RefObject<HTMLLIElement>;
}

export interface PopoverMenuContextProps {
  size: "small" | "medium" | "large";
  isButtonMenu?: boolean;
  isSubmenu?: boolean;
  onSubmenuCloseContext?: () => void;
  focusSubmenuParent?: () => void;
  renderSubmenu?: (props: SubmenuRenderProps) => React.ReactNode;
}

export const PopoverMenuContext = createContext<PopoverMenuContextProps>({
  size: "medium",
  isButtonMenu: false,
  isSubmenu: false,
});
