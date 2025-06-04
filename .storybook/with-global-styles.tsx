import { Decorator } from "@storybook/react";
import React from "react";
import GlobalStyle from "../src/style/global-style";

const withGlobalStyles: Decorator = (Story) => {
  // Check if CSS custom property exists
  // const hasGlobalStyles = getComputedStyle(
  //   document.documentElement,
  // ).getPropertyValue("--carbon-global-styles-loaded");

  // if (hasGlobalStyles) {
  //   return <Story />;
  // }

  return (
    <>
      <GlobalStyle />
      <Story />
    </>
  );
};

export default withGlobalStyles;
