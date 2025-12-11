import React from "react";
import { StoryObj, StoryFn } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import Form from ".";
import Button from "../button";
import Textbox from "../textbox";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Textarea from "../textarea";
import DateInput from "../date";
import { RadioButton, RadioButtonGroup } from "../radio-button";
import { Checkbox } from "../checkbox";
import Switch from "../switch";

type Story = StoryObj<typeof Form>;

export default {
  title: "Form/Interactions",
  component: Form,
  parameters: {
    info: { disable: true },
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export const FocusManagement: Story = {
  render: (args) => (
    <Form
      {...args}
      leftSideButtons={<Button>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      fieldSpacing={4}
    >
      <Textbox
        label="Textbox 1"
        name="textbox-1"
        value=""
        onChange={() => {}}
      />
      <Textbox
        label="Textbox 2"
        name="textbox-2"
        value=""
        error="This field is required"
        onChange={() => {}}
      />
      <RadioButtonGroup
        name="legend"
        legend="Legend"
        value=""
        onChange={() => {}}
      >
        <RadioButton
          id="group-1-input-1"
          value="group-1-input-1"
          label="Option 1"
        />
        <RadioButton
          id="group-1-input-2"
          value="group-1-input-2"
          label="Option 2"
        />
      </RadioButtonGroup>
      <DateInput label="Date picker" value="" onChange={() => {}} />
      <Textarea
        label="Textbox 3"
        name="textbox-3"
        value=""
        onChange={() => {}}
      />
      <Checkbox
        name="checkbox-1"
        label="Checkbox"
        required
        checked={false}
        onChange={() => {}}
      />
      <Checkbox
        name="checkbox-2"
        label="Checkbox"
        required
        checked={false}
        onChange={() => {}}
      />
      <Button buttonType="tertiary">Tertiary</Button>
      <Textbox
        label="Textbox 4"
        name="textbox-4"
        value=""
        onChange={() => {}}
      />
      <Switch
        name="switch"
        label="Switch"
        checked={false}
        value=""
        onChange={() => {}}
      />
      <Textbox
        label="Textbox 5"
        name="textbox-5"
        value=""
        onChange={() => {}}
      />
    </Form>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);

    const firstInput = canvas.getByRole("textbox", { name: /textbox 1/i });
    const secondInput = canvas.getByRole("textbox", { name: /textbox 2/i });
    const firstRadio = canvas.getByRole("radio", { name: /option 1/i });
    const datepickerInput = canvas.getByRole("textbox", {
      name: /date picker/i,
    });
    const textarea = canvas.getByRole("textbox", { name: /textbox 3/i });
    const checkboxes = canvas.getAllByRole("checkbox", { name: /checkbox/i });
    const tertiaryButton = canvas.getByRole("button", { name: /tertiary/i });
    const fourthInput = canvas.getByRole("textbox", { name: /textbox 4/i });
    const switchElement = canvas.getByRole("switch", { name: /switch/i });
    const fifthInput = canvas.getByRole("textbox", { name: /textbox 5/i });
    const cancelButton = canvas.getByRole("button", { name: /cancel/i });
    const saveButton = canvas.getByRole("button", { name: /save/i });

    await userEvent.tab();
    await expect(firstInput).toHaveFocus();

    await userEvent.tab();
    await expect(secondInput).toHaveFocus();

    await userEvent.tab();
    await expect(firstRadio).toHaveFocus();

    await userEvent.tab();
    await expect(datepickerInput).toHaveFocus();

    await userEvent.tab();
    await expect(textarea).toHaveFocus();

    await userEvent.tab();
    await expect(checkboxes[0]).toHaveFocus();

    await userEvent.tab();
    await expect(checkboxes[1]).toHaveFocus();

    await userEvent.tab();
    await expect(tertiaryButton).toHaveFocus();

    await userEvent.tab();
    await expect(fourthInput).toHaveFocus();

    await userEvent.tab();
    await expect(switchElement).toHaveFocus();

    await userEvent.tab();
    await expect(fifthInput).toHaveFocus();

    await userEvent.tab();
    await expect(cancelButton).toHaveFocus();

    await userEvent.tab();
    await expect(saveButton).toHaveFocus();

    await userEvent.tab({ shift: true });
    await expect(cancelButton).toHaveFocus();

    await userEvent.tab({ shift: true });
    await expect(fifthInput).toHaveFocus();

    await userEvent.tab({ shift: true });
    await expect(switchElement).toHaveFocus();

    await userEvent.tab({ shift: true });
    await expect(fourthInput).toHaveFocus();
  },
  decorators: [
    (StoryToRender: StoryFn) => (
      <CarbonProvider>
        <StoryToRender />
      </CarbonProvider>
    ),
  ],
};

FocusManagement.storyName = "Focus Management";
FocusManagement.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
};
