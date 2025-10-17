import { Decorator } from "@storybook/react";
import React from "react";
import GlobalStyle from "../src/style/global-style";

const withGlobalStyles: Decorator = (Story) => {
  return (
    <>
      <GlobalStyle />
      <Story />
    </>
  );
};

export default withGlobalStyles;
