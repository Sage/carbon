import createContext from "../../../__internal__/utils/createContext";
import { DlProps } from "../dl.component";

type DlContextType = Required<
  Pick<DlProps, "asSingleColumn" | "dtTextAlign" | "ddTextAlign">
>;

const [DlProvider, useDlContext] = createContext.strict<DlContextType>({
  name: "DlContext",
  errorMessage:
    "Carbon DefinitionList: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
  defaultValue: {
    asSingleColumn: false,
    dtTextAlign: "right",
    ddTextAlign: "left",
  },
});

export { DlProvider, useDlContext };
