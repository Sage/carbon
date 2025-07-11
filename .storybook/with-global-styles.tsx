import { Decorator } from "@storybook/react-vite";
import React from "react";
import GlobalStyle from "../src/style/global-style";

const withGlobalStyles: Decorator = (Story) => (
  <>
    <GlobalStyle />
    <Story />
  </>
);
export default withGlobalStyles;
