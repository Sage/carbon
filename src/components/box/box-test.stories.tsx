import React from "react";

import Box from ".";
import RadioButton, { RadioButtonGroup } from "../radio-button";

export default {
  title: "Box/Test",
  includeStories: "Default",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
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

export const Default = ({ ...props }) => {
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

export const BoxComponentMulti = ({ ...props }) => {
  return (
    <div>
      <Box display="flex" data-element="box" bg="blue" {...props}>
        <Box
          width="100px"
          height="100px"
          bg="primary"
          color="yellow"
          data-element="boxone"
          {...props}
        >
          {" "}
          Supercalifrajilisticexpialidocious Word{" "}
        </Box>
        <Box
          width="100px"
          height="100px"
          bg="primary"
          color="yellow"
          data-element="boxtwo"
          {...props}
        >
          {" "}
          Box Two Box Two Box Two Box Two Box Two{" "}
        </Box>
        <Box
          width="100px"
          height="100px"
          bg="primary"
          color="yellow"
          data-element="boxthree"
          {...props}
        >
          {" "}
          Box Three Box Three Box Three Box Three{" "}
        </Box>
      </Box>
    </div>
  );
};

export const BoxComponentSticky = () => {
  return (
    <Box data-element="scrollable-box" height="95vh" overflowY="auto">
      <Box position="sticky" top="0px" height="100px" bg="black">
        foo
      </Box>
      <Box>
        <Box height="100px">Foo</Box>
        <RadioButtonGroup inline legend="test" name="test-group">
          <RadioButton id="test-1" value="1" label="first" size="large" />
          <RadioButton id="test-2" value="2" label="second" size="large" />
        </RadioButtonGroup>
        <Box height="110vh">Foo</Box>
      </Box>
    </Box>
  );
};
