import createContext from "../../../__internal__/utils/createContext";

interface VerticalMenuContextType {
  isFullScreen: boolean;
}

const [VerticalMenuProvider, useVerticalMenuContext] =
  createContext.strict<VerticalMenuContextType>({
    name: "VerticalMenuContext",
    errorMessage:
      "Carbon VerticalMenu: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    defaultValue: {
      isFullScreen: false,
    },
  });

export { VerticalMenuProvider, useVerticalMenuContext };
