import React from "react";
import { select, text, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import OptionsHelper from "../../utils/helpers/options-helper";
import Accordion from "./accordion.component";
import AccordionGroup from "./accordion-group.component";
import Textbox from "../../__experimental__/components/textbox";

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
      <Textbox label="Textbox in an Accordion" />
    </Accordion>
    <Accordion title="Second Accordion" onChange={action("expansionToggled")}>
      <Textbox label="Textbox in an Accordion" />
    </Accordion>
    <Accordion title="Third Accordion" onChange={action("expansionToggled")}>
      <div>Content</div>
      <div>Content</div>
      <div>Content</div>
    </Accordion>
  </AccordionGroup>
);

Default.story = {
  name: "default",
};

Grouped.story = {
  name: "grouped",
};
