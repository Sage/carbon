import React from "react";
import propTypes from "prop-types";
import Typography from "./typography.component";

const getListStyleType = (as) => {
  if (as === "ul") {
    return "square";
  }
  return "decimal";
};

const List = ({ children, as = "ul", ...props }) => (
  <Typography
    variant="p"
    as={as}
    listStyleType={getListStyleType(as)}
    {...props}
  >
    {children}
  </Typography>
);

List.propTypes = {
  ...Typography.propTypes,
  as: propTypes.oneOf(["ul", "ol"]),
};

const ListItem = ({ children, ...props }) => (
  <Typography as="li" variant="p" m="0 0 8px 16px" {...props}>
    {children}
  </Typography>
);

ListItem.propTypes = {
  ...Typography.propTypes,
};
export { List, ListItem };
