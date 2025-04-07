import createContext from "../../../__internal__/utils/createContext";

export type MenuType = "light" | "dark" | "white" | "black";

export interface StrictMenuContextType {
  menuType: MenuType;
  openSubmenuId: string | null;
  inFullscreenView?: boolean;
  setOpenSubmenuId: (id: string | null) => void;
  registerItem?: (id: string) => void;
  unregisterItem?: (id: string) => void;
  focusId?: string;
  updateFocusId?: (id: string) => void;
}

const errorMessage =
  "Carbon Menu: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.";

const defaultValue: StrictMenuContextType = {
  menuType: "light",
  openSubmenuId: null,
  setOpenSubmenuId: /* istanbul ignore next */ () => {},
};

const [StrictMenuProvider, useStrictMenuContext] =
  createContext.strict<StrictMenuContextType>({
    name: "MenuContext",
    errorMessage,
    defaultValue,
  });

export { StrictMenuProvider, useStrictMenuContext };
