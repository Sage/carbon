import createContext from "../../../__internal__/utils/createContext";

export type BreadcrumbsContextType = {
  isDarkBackground: boolean;
};

const [BreadcrumbsProvider, useBreadcrumbsContext] =
  createContext.strict<BreadcrumbsContextType>({
    name: "BreadcrumbsContext",
    errorMessage:
      "Carbon Breadcrumbs: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    defaultValue: {
      isDarkBackground: false,
    },
  });

export { BreadcrumbsProvider, useBreadcrumbsContext };
