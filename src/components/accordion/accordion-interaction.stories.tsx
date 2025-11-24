import { action } from "@storybook/addon-actions";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import React from "react";

import { Accordion, AccordionGroup } from ".";
import Box from "../box";
import Textbox, { TextboxProps } from "../textbox";

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

export const FocusManagement: Story = {
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
  play: async () => {
    if (!allowInteractions()) {
      return;
    }
    await userEvent.tab();

    await userEvent.keyboard("{Enter}", { delay: 100 });
    await expect(
      await within(document.body).findByText("Content1"),
    ).toBeVisible();
    await userEvent.keyboard("{Enter}");
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

FocusManagement.storyName = "Focus Management";
FocusManagement.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const MixedAccordionStates: Story = {
  render: (args) => (
    <AccordionGroup>
      <Accordion
        {...args}
        onChange={action("expansionToggled")}
        title="First Accordion"
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
    await userEvent.click(accordionToggles[0], { delay: 200 });
    await userEvent.click(accordionToggles[2], { delay: 200 });
    await userEvent.click(accordionToggles[1], { delay: 200 });
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

MixedAccordionStates.storyName = "Mixed Accordion States";
MixedAccordionStates.parameters = {
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

    await userEvent.click(accordionToggle[0], { delay: 100 });

    const textboxes = canvas.queryAllByRole("textbox");
    const textbox = textboxes[0];
    await userEvent.type(textbox, "Text input in Accordion", { delay: 100 });
    await userEvent.click(accordionToggle[0], { delay: 100 });
    await userEvent.click(accordionToggle[0], { delay: 100 });
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

export const ToggleGroupedAccordions: Story = {
  render: (args) => (
    <AccordionGroup>
      <Accordion
        {...args}
        onChange={action("expansionToggled")}
        title="First Accordion"
      >
        <Box p={2}>
          <ControlledTextbox label="Textbox in an Accordion" />
        </Box>
      </Accordion>
      <Accordion
        {...args}
        onChange={action("expansionToggled")}
        title="Second Accordion"
      >
        <Box p={2}>
          <ControlledTextbox label="Textbox in an Accordion" />
        </Box>
      </Accordion>
      <Accordion
        {...args}
        onChange={action("expansionToggled")}
        title="Third Accordion"
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

    accordionToggles.forEach(async (toggle) => {
      await userEvent.click(toggle);
    });

    accordionToggles.forEach(async (toggle) => {
      await userEvent.click(toggle, { delay: 500 });
      await expect(accordionToggles[2]).toHaveFocus();
    });
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

ToggleGroupedAccordions.storyName = "Toggle Grouped Accordions";
ToggleGroupedAccordions.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const ToggleViaKeyboard: Story = {
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

    accordionToggle[0].focus();

    await userEvent.keyboard("{Enter}");
    await expect(
      await within(document.body).findByText("Content1"),
    ).toBeVisible();
    await userEvent.keyboard("{Enter}", { delay: 500 });

    await userEvent.keyboard(" ", { delay: 500 });
    await expect(
      await within(document.body).findByText("Content1"),
    ).toBeVisible();
    await userEvent.keyboard(" ");
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

ToggleViaKeyboard.storyName = "Toggle Via Keyboard";
ToggleViaKeyboard.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: true },
};
