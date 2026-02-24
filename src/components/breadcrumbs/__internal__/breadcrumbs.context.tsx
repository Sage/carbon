import createStrictContext from "../../../__internal__/utils/createStrictContext";

export type BreadcrumbsContextType = {
  inverse?: boolean;
};

const [BreadcrumbsProvider, useBreadcrumbsContext] =
  createStrictContext<BreadcrumbsContextType>({
    name: "BreadcrumbsContext",
    errorMessage:
      "Carbon Breadcrumbs: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    defaultValue: {
      inverse: false,
    },
  });

export { BreadcrumbsProvider, useBreadcrumbsContext };
