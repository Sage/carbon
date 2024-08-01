import React from "react";
import GlobalStyle from "../src/style/global-style";

export default function withGlobalStyles(content) {
  return (
    <>
      <GlobalStyle />
      {content()}
    </>
  );
}
