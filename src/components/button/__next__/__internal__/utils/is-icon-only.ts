import { ReactNode, Children, isValidElement, FunctionComponent } from "react";
import { isFragment } from "react-is";

const isIconOnly = (children: ReactNode): boolean => {
  if (!children) return false;

  const childArray = Children.toArray(children);

  return childArray.every((child) => {
    // Check if it's a React element
    if (!isValidElement(child)) {
      // If it's a string, check if it's only whitespace
      if (typeof child === "string") {
        return !child.trim().length;
      }
      // Numbers, booleans etc
      return false;
    }

    // Check if it's an Icon component
    if ((child.type as FunctionComponent).displayName === "Icon") {
      return true;
    }

    // Check if it's a Fragment with nested children
    if (isFragment(child)) {
      return isIconOnly(child.props.children);
    }

    // Any other element counts as content
    return false;
  });
};

export default isIconOnly;
