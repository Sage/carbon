import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import styled from "styled-components";
import Box from "../src/components/box";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta = {
  title: "Documentation/Extending Styles of Carbon Components",
  tags: ["hideInSidebar"],
};

export default meta;

export const CustomStyledBoxExample: StoryObj = () => {
  const CustomStyledBox = styled(Box)`
    z-index: 2;
    border: solid 2px red;
  `;
  const CustomStyledBoxBorders = styled(Box)`
    border-right: dotted 2px red;
    border-left: solid 3px red;
    border-top: dashed 2px black;
    border-bottom: solid 2px black;
  `;
  return (
    <>
      <CustomStyledBox m={2} bg="aqua" height="250px" width="250px" />
      <CustomStyledBoxBorders m={2} bg="#CCCCCC" height="250px" width="250px" />
    </>
  );
};
CustomStyledBoxExample.storyName = "CustomStyledBox Example";
