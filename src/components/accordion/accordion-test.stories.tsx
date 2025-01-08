import React from "react";
import { action } from "@storybook/addon-actions";
import { Accordion, AccordionGroup } from ".";
import Textbox from "../textbox";
import Box from "../box";
import MultiActionButton from "../multi-action-button";
import SplitButton from "../split-button";
import Button from "../button/button.component";

export default {
  title: "Accordion/Test",
  includeStories: ["Default", "Grouped", "AccordionWithMultiAction"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
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
      options: ["chevron_down", "chevron_down_thick", "dropdown"],
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
    variant: {
      options: ["standard", "subtle"],
      control: {
        type: "select",
      },
    },
    disableContentPadding: {
      control: {
        type: "boolean",
      },
    },
  },
};

export const Default = ({ ...args }) => (
  <Accordion
    onChange={action("expansionToggled")}
    {...{
      customPadding: 0,
      title: "Title",
      subTitle: "Sub Title",
      width: "100%",
      ...args,
    }}
  >
    <Box mt={2}>Content</Box>
    <Box>Content</Box>
    <Box>Content</Box>
  </Accordion>
);

Default.storyName = "default";

export const Grouped = ({ ...args }) => (
  <AccordionGroup>
    <Accordion
      title="First Accordion"
      onChange={action("expansionToggled")}
      {...args}
    >
      <Box p={2}>
        <Textbox label="Textbox in an Accordion" />
      </Box>
    </Accordion>
    <Accordion
      title="Second Accordion"
      onChange={action("expansionToggled")}
      {...args}
    >
      <Box p={2}>
        <Textbox label="Textbox in an Accordion" />
      </Box>
    </Accordion>
    <Accordion
      title="Third Accordion"
      onChange={action("expansionToggled")}
      {...args}
    >
      <Box p={2}>
        <Box mt={2}>Content</Box>
        <Box>Content</Box>
        <Box>Content</Box>
      </Box>
    </Accordion>
  </AccordionGroup>
);

Grouped.storyName = "grouped";

export const AccordionWithMultiAction = () => {
  return (
    <Accordion title="Accordion">
      <MultiActionButton text="Multi Action Button">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button>Button 4</Button>
        <Button>Button 5</Button>
      </MultiActionButton>
      <SplitButton text="Split Button">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button>Button 4</Button>
        <Button>Button 5</Button>
      </SplitButton>
    </Accordion>
  );
};

AccordionWithMultiAction.storyName =
  "Accordion with MultiAction and Split Button";
