import React from "react";

import DismissibleBox, { DismissibleBoxProps } from ".";
import Box from "../box";
import Typography from "../typography";
import VerticalDivider from "../vertical-divider";
import Image from "../image";
import point from "../../../.assets/point.svg";

export default {
  title: "Dismissible Box/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    width: {
      control: {
        type: "text",
      },
    },
    variant: {
      options: ["dark", "light"],
      control: {
        type: "select",
      },
    },
  },
};

export const Default = ({ ...props }: Partial<DismissibleBoxProps>) => {
  return (
    <Box p={2}>
      <DismissibleBox onClose={() => {}} {...props}>
        <Box display="flex">
          <Typography mb={0}>Hello All!</Typography>
          <VerticalDivider p={0} px={2} />
          <Image alt="Example alt text" src={point} width="120px" />
        </Box>
      </DismissibleBox>
    </Box>
  );
};

Default.storyName = "default";
