import React from "react";

const checkChildrenForString = (children: React.ReactNode): boolean => {
  return React.Children.toArray(children).some((child) => {
    if (typeof child === "string") {
      return true;
    }

    return React.isValidElement(child)
      ? checkChildrenForString(child.props.children)
      : false;
  });
};

export default checkChildrenForString;
