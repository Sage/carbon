import React from "react";
import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager } from "styled-components";

const shouldForwardProp = (
  propName: string,
  target: string | React.ElementType,
) => {
  if (typeof target === "string") {
    return isPropValid(propName);
  }
  return true;
};

const CarbonStyleSheetManager = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <StyleSheetManager shouldForwardProp={shouldForwardProp}>
    {children}
  </StyleSheetManager>
);

export default CarbonStyleSheetManager;
