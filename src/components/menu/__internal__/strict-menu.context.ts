import createStrictContext from "../../../__internal__/utils/createStrictContext";

export interface StrictMenuContextType {
  variant: "white" | "black";
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
      variant: "white",
      openSubmenuId: null,
      setOpenSubmenuId: /* istanbul ignore next */ () => {},
    },
  });

export { StrictMenuProvider, useStrictMenuContext };
