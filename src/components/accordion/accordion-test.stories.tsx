import React from "react";
import { action } from "@storybook/addon-actions";

import { Accordion, AccordionGroup } from ".";
import Textbox from "../textbox";
import Box from "../box";

export default {
  title: "Accordion/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    iconAlign: {
      options: ["left", "right"],
      control: {
        type: "select",
      },
    },
    iconType: {
      options: ["chevron_down", "dropdown"],
      control: {
        type: "select",
      },
    },
    borders: {
      options: ["default", "full"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["large", "small"],
      control: {
        type: "select",
      },
    },
    scheme: {
      options: ["white", "transparent"],
      control: {
        type: "select",
      },
    },
  },
};

export const Default = ({ ...args }) => (
  <Accordion
    onChange={action("expansionToggled")}
    {...{
      iconAlign: "right",
      customPadding: 0,
      title: "Title",
      subTitle: "Sub Title",
      width: "100%",
      ...args,
    }}
  >
    <div>Content</div>
    <div>Content</div>
    <div>Content</div>
  </Accordion>
);

export const Grouped = () => (
  <AccordionGroup>
    <Accordion title="First Accordion" onChange={action("expansionToggled")}>
      <Box p={2}>
        <Textbox label="Textbox in an Accordion" />
      </Box>
    </Accordion>
    <Accordion title="Second Accordion" onChange={action("expansionToggled")}>
      <Box p={2}>
        <Textbox label="Textbox in an Accordion" />
      </Box>
    </Accordion>
    <Accordion title="Third Accordion" onChange={action("expansionToggled")}>
      <Box p={2}>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
      </Box>
    </Accordion>
  </AccordionGroup>
);
