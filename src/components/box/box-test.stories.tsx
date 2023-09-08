import React from "react";
import Box, { BoxProps } from ".";

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
    scrollVariant: {
      options: ["dark", "light"],
      control: {
        type: "select",
      },
    },
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
    tabIndex: {
      control: {
        type: "number",
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
    boxShadow: {
      control: {
        type: "text",
      },
    },
  },
};

export const Default = (props: Partial<BoxProps>) => {
  return (
    <Box
      m={3}
      p={3}
      width={400}
      height={400}
      data-element="box"
      bg="primary"
      color="white"
      {...props}
    >
      This is some sample text
    </Box>
  );
};

Default.storyName = "default";
