import React from "react";
import { within } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";

import Box, { BoxProps } from ".";

export default {
  title: "Box/Test",
  includeStories: ["Default", "BoxScroll"],
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

// Play Functions
const meta: Meta<typeof Box> = {
  title: "Box",
  component: Box,
  parameters: { chromatic: { disableSnapshot: true } },
};

export { meta };

type Story = StoryObj<typeof Box>;

export const DefaultScrollableBoxComponent = () => {
  return (
    <div>
      <Box
        display="inline-block"
        size="150px"
        overflow="auto"
        scrollVariant="light"
        mr="20px"
        data-role="parent-box-one"
      >
        <Box
          width="100px"
          height="100px"
          bg="primary"
          display="inline-block"
          m="5px"
        />
        <Box
          width="100px"
          height="100px"
          bg="primary"
          display="inline-block"
          m="5px"
        />
        <Box
          width="100px"
          height="100px"
          bg="primary"
          display="inline-block"
          m="5px"
        />
      </Box>
    </div>
  );
};

export const BoxScroll: Story = {
  render: () => <DefaultScrollableBoxComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const BoxElementOne = canvas.getByTestId("parent-box-one");
    await BoxElementOne.scrollTo(0, 500);
  },
  decorators: [
    (StoryToRender) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryToRender />
      </div>
    ),
  ],
};

BoxScroll.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};
