import React from "react";
import { StoryObj } from "@storybook/react/*";
import Box from "../box";
import Typography from "../typography";
import Hr, { HrProps } from ".";

export default {
  title: "Deprecated/Hr/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

type StoryType = StoryObj<typeof Hr>;

export const Default = (props: HrProps) => {
  return <Hr {...props} />;
};

Default.storyName = "default";

export const InVariousFlexContainers: StoryType = () => {
  return (
    <>
      <Box
        padding="25px"
        display="flex"
        flexDirection="column"
        minWidth="320px"
        maxWidth="1024px"
      >
        <Typography>Flex container with minWidth and maxWidth</Typography>
        <Hr my={2} />
      </Box>
      <Box padding="25px" display="flex" flexDirection="column" width="500px">
        <Typography>Flex container with width</Typography>
        <Hr my={2} />
      </Box>
      <Box padding="25px" minWidth="320px" maxWidth="1024px">
        <Typography>Block container with minWidth and maxWidth</Typography>
        <Hr my={2} />
      </Box>
    </>
  );
};

InVariousFlexContainers.storyName = "In Various Flex Containers";
InVariousFlexContainers.decorators = [
  (Story) => (
    <Box width="97vw" height="97vh">
      <Story />
    </Box>
  ),
];
InVariousFlexContainers.parameters = {
  chromatic: { disable: false },
};
