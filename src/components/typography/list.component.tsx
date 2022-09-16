import React from "react";
import { SpaceProps } from "styled-system";
import Typography, { TypographyProps } from "./typography.component";

export interface ListProps extends SpaceProps, TypographyProps {
  children?: React.ReactNode;
}

export interface ListItemProps extends SpaceProps, TypographyProps {
  children?: React.ReactNode;
}

const getListStyleType = (as?: React.ElementType) => {
  if (as === "ul") {
    return "square";
  }
  return "decimal";
};

const List = ({ children, as = "ul", ...props }: ListProps) => (
  <Typography
    variant="p"
    as={as}
    listStyleType={getListStyleType(as)}
    {...props}
  >
    {children}
  </Typography>
);

const ListItem = ({ children, ...props }: ListItemProps) => (
  <Typography as="li" variant="p" m="0 0 8px 16px" {...props}>
    {children}
  </Typography>
);
export { List, ListItem };
