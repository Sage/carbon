import createStrictContext from "../../../__internal__/utils/createStrictContext";

export type BreadcrumbsContextType = {
  isDarkBackground: boolean;
};

const [BreadcrumbsProvider, useBreadcrumbsContext] =
  createStrictContext<BreadcrumbsContextType>({
    name: "BreadcrumbsContext",
    errorMessage:
      "Carbon Breadcrumbs: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    defaultValue: {
      isDarkBackground: false,
    },
  });

export { BreadcrumbsProvider, useBreadcrumbsContext };
