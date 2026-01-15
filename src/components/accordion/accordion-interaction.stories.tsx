import { action } from "@storybook/addon-actions";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import React, { useState } from "react";

import { Accordion, AccordionGroup } from ".";
import Box from "../box";
import Textbox, { TextboxProps } from "../textbox";
import Button from "../button";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof Accordion>;

export default {
  title: "Accordion/Interactions",
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

export const ClickToOpen: Story = {
  render: (args) => (
    <Accordion
      onChange={action("expansionToggled")}
      {...{
        ...args,
        "data-role": "accordion",
        customPadding: 0,
        title: "Title",
        subTitle: "Sub Title",
        width: "100%",
      }}
    >
      <Box mt={2}>Content1</Box>
      <Box>Content2</Box>
      <Box>Content3</Box>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const accordionToggle = canvas.getAllByRole("button");

    await userEvent.click(accordionToggle[0]);
    await userEvent.click(accordionToggle[0]);
    await userEvent.click(accordionToggle[0]);
    await expect(
      await within(document.body).findByText("Content1"),
    ).toBeInTheDocument();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

ClickToOpen.storyName = "Click To Open";
ClickToOpen.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const MixedAccordionStatesAndIcons: Story = {
  render: (args) => (
    <AccordionGroup>
      <Accordion
        {...args}
        onChange={action("expansionToggled")}
        title="First Accordion"
        iconType="chevron_down"
      >
        <Box p={2}>
          <Textbox
            label="Textbox in an Accordion"
            value=""
            onChange={() => {}}
          />
        </Box>
      </Accordion>
      <Accordion
        {...args}
        onChange={action("expansionToggled")}
        title="Second Accordion"
        iconType="chevron_down_thick"
      >
        <Box p={2}>
          <Textbox
            label="Textbox in an Accordion"
            value=""
            onChange={() => {}}
          />
        </Box>
      </Accordion>
      <Accordion
        {...args}
        onChange={action("expansionToggled")}
        title="Third Accordion"
        iconType="dropdown"
      >
        <Box p={2}>
          <Box mt={2}>Content</Box>
          <Box>Content</Box>
          <Box>Content</Box>
        </Box>
      </Accordion>
    </AccordionGroup>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const accordionToggles = canvas.getAllByRole("button");

    await userEvent.click(accordionToggles[2]);
    await userEvent.click(accordionToggles[0]);
    await expect(accordionToggles[0]).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(accordionToggles[2]);
    await expect(accordionToggles[2]).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(accordionToggles[1]);
    await expect(accordionToggles[1]).toHaveAttribute("aria-expanded", "true");
    await expect(accordionToggles[1]).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

MixedAccordionStatesAndIcons.storyName = "Mixed Accordion States and Icons";
MixedAccordionStatesAndIcons.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

const ControlledTextbox = (args: Omit<TextboxProps, "onChange" | "value">) => {
  const [value, setValue] = React.useState("");

  return (
    <Textbox
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const NestedComponentInteractions: Story = {
  render: (args) => (
    <Accordion
      onChange={action("expansionToggled")}
      {...{
        ...args,
        "data-role": "accordion",
        customPadding: 0,
        title: "Title",
        subTitle: "Sub Title",
        width: "100%",
      }}
    >
      <Box p={2}>
        <ControlledTextbox role="textbox" label="Textbox in an Accordion" />
      </Box>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const accordionToggle = canvas.getAllByRole("button");
    const textboxes = canvas.queryAllByRole("textbox");
    const textbox = textboxes[0];

    await userEvent.click(accordionToggle[0]);
    await expect(
      await within(document.body).findByText("Textbox in an Accordion"),
    ).toBeInTheDocument();
    await userEvent.type(textbox, "Text input in Accordion");
    await userEvent.click(accordionToggle[0]);
    await expect(textbox).not.toBeVisible();
    await userEvent.click(accordionToggle[0]);
    await expect(
      await within(document.body).findByText("Textbox in an Accordion"),
    ).toBeVisible();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

NestedComponentInteractions.storyName = "Nested Component Interactions";
NestedComponentInteractions.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

const DynamicContentHeightComponent = () => {
  const [contentCount, setContentCount] = useState(3);
  const modifyContentCount = (modifier: number) => {
    if (!contentCount && modifier === -1) {
      return;
    }

    setContentCount(contentCount + modifier);
  };
  return (
    <>
      <Button onClick={() => modifyContentCount(1)}>Add content</Button>
      <Button onClick={() => modifyContentCount(-1)} ml={2}>
        Remove content
      </Button>
      <Accordion onChange={action("expansionToggled")} mt={2} title="Title">
        {Array.from(Array(contentCount).keys()).map((value) => (
          <Box key={value} mt={2}>
            Content
          </Box>
        ))}
      </Accordion>
    </>
  );
};

export const DynamicContentHeight: Story = {
  render: () => <DynamicContentHeightComponent />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const button = canvas.getAllByRole("button");
    const accordionToggle = canvas.getAllByRole("button")[2];
    const contentElements = within(document.body).getAllByText("Content");

    await userEvent.click(accordionToggle);
    await userEvent.click(button[0]);
    await userEvent.click(button[0]);
    await userEvent.click(button[1]);
    await userEvent.click(button[1]);

    expect(contentElements).toHaveLength(3);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

DynamicContentHeight.storyName = "Dynamic Content Height";
DynamicContentHeight.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};
