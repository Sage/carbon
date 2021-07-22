import React from "react";
import { select, text, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import OptionsHelper from "../../utils/helpers/options-helper";
import Accordion from "./accordion.component";
import AccordionGroup from "./accordion-group/accordion-group.component";
import Textbox from "../textbox";
import Box from "../box";

export default {
  title: "Design System/Accordion/Test",
  component: Accordion,
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
    chromatic: {
      disable: true,
    },
  },
};

export const Default = () => {
  return (
    <Accordion
      iconType={select("iconType", ["chevron_down", "dropdown"])}
      iconAlign={select("iconAlign", OptionsHelper.alignBinary, "right")}
      borders={select("borders", ["default", "full"])}
      size={select("size", ["large", "small"])}
      customPadding={number("customPadding", 0)}
      scheme={select("scheme", ["white", "transparent"])}
      title={text("title", "Title")}
      subTitle={text("subTitle", "Sub Title")}
      width={text("width", "100%")}
      onChange={action("expansionToggled")}
    >
      <div>Content</div>
      <div>Content</div>
      <div>Content</div>
    </Accordion>
  );
};

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

Default.story = {
  name: "default",
};

Grouped.story = {
  name: "grouped",
};
