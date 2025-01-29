import React, { useContext } from "react";
import Typography, { TypographyProps } from "./typography.component";
import ListContext, { ListContextProps } from "./list.context";

export interface ListProps extends TypographyProps {
  children?: React.ReactNode;
}

export interface ListItemProps extends Omit<ListProps, "variant"> {
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
  const { variant: parentListVariant } =
    useContext<ListContextProps>(ListContext);

  return (
    <Typography as="li" m="0 0 8px 16px" {...props} variant={parentListVariant}>
      {children}
    </Typography>
  );
};
export { List, ListItem };
