import React from "react";
import Box, { BoxProps } from ".";

const greenBackground: React.CSSProperties = {
  width: "fit-content",
  backgroundColor: "rgb(0, 125, 90)",
  color: "rgb(255, 255, 255)",
};

export default {
  title: "Box/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    boxSizing: {
      options: ["content-box", "border-box"],
      control: {
        type: "select",
      },
    },
    overflowWrap: {
      options: ["break-word", "anywhere"],
      control: {
        type: "select",
      },
    },
    gap: {
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      control: {
        type: "select",
      },
    },
    columnGap: {
      control: {
        type: "text",
      },
    },
    rowGap: {
      control: {
        type: "text",
      },
    },
  },
};

export const Default = (props: Partial<BoxProps>) => {
  return (
    <Box m={3}>
      <div style={greenBackground}>
        <Box p={3} width={400} height={400} data-element="box" {...props}>
          This is some sample text
        </Box>
      </div>
    </Box>
  );
};

Default.storyName = "default";
