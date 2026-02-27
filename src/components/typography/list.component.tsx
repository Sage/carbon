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

/**
 * @deprecated The List component is part of the legacy Typography system and will be removed in a future release.
 * Use proper semantic HTML list elements (ul, ol, li) with Typography components inside instead.
 *
 * Example migration:
 * ```tsx
 * // Before
 * <List>
 *   <ListItem>Item 1</ListItem>
 *   <ListItem>Item 2</ListItem>
 * </List>
 *
 * // After
 * <ul>
 *   <li><Typography>Item 1</Typography></li>
 *   <li><Typography>Item 2</Typography></li>
 * </ul>
 * ```
 */
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

/**
 * @deprecated The ListItem component is part of the legacy Typography system and will be removed in a future release.
 * Use semantic HTML li elements with Typography components inside instead.
 */
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
