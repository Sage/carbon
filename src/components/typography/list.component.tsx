import React, { useContext } from "react";
import Typography, {
  TypographyProps,
  VariantTypes,
} from "./typography.component";
import ListContext, { ListContextProps } from "./list.context";
import Logger from "../../__internal__/utils/logger";

let childVariantDeprecationWarning = false;

export interface ListProps extends TypographyProps {
  children?: React.ReactNode;
}

export interface ListItemProps extends TypographyProps {
  /** (Deprecated) The visual style to apply to the component */
  variant?: VariantTypes;
  children?: React.ReactNode;
}

const getListStyleType = (as?: React.ElementType) => {
  if (as === "ul") {
    return "square";
  }
  return "decimal";
};

const List = ({ children, as = "ul", variant = "p", ...props }: ListProps) => (
  <Typography
    variant={variant}
    as={as}
    listStyleType={getListStyleType(as)}
    {...props}
  >
    <ListContext.Provider value={{ variant }}>{children}</ListContext.Provider>
  </Typography>
);

const ListItem = ({ children, ...props }: ListItemProps) => {
  if (props.variant && !childVariantDeprecationWarning) {
    Logger.deprecate(
      "The use of `variant` on `ListItem` is deprecated. Please set it via `List` instead.",
    );
    childVariantDeprecationWarning = true;
  }

  const { variant: parentListVariant } =
    useContext<ListContextProps>(ListContext);

  return (
    <Typography as="li" variant={parentListVariant} m="0 0 8px 16px" {...props}>
      {children}
    </Typography>
  );
};
export { List, ListItem };
