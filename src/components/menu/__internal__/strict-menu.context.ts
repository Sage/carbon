import createStrictContext from "../../../__internal__/utils/createStrictContext";

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

const [StrictMenuProvider, useStrictMenuContext] =
  createStrictContext<StrictMenuContextType>({
    name: "MenuContext",
    errorMessage:
      "Carbon Menu: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    defaultValue: {
      menuType: "light",
      openSubmenuId: null,
      setOpenSubmenuId: /* istanbul ignore next */ () => {},
    },
  });

export { StrictMenuProvider, useStrictMenuContext };
