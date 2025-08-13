import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect, waitFor } from "@storybook/test";
import AdvancedColorPicker from "./advanced-color-picker.component";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";
import Box from "../box";

type Story = StoryObj<typeof AdvancedColorPicker>;

export default {
  title: "Advanced Color Picker/Interactions",
  component: AdvancedColorPicker,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

const mockColors = [
  { value: "#FFFFFF", label: "white" },
  { value: "transparent", label: "transparent" },
  { value: "#000000", label: "black" },
  { value: "#A3CAF0", label: "blue" },
  { value: "#FD9BA3", label: "pink" },
  { value: "#B4AEEA", label: "purple" },
  { value: "#ECE6AF", label: "goldenrod" },
  { value: "#EBAEDE", label: "orchid" },
  { value: "#EBC7AE", label: "desert" },
  { value: "#AEECEB", label: "turquoise" },
  { value: "#AEECD6", label: "mint" },
];

const AdvancedColorPickerWithState = ({
  initialColor = "#EBAEDE",
  ...props
}) => {
  const [selectedColor, setSelectedColor] = useState(initialColor);

  return (
    <AdvancedColorPicker
      {...props}
      selectedColor={selectedColor}
      onChange={(e) => setSelectedColor(e.target.value)}
      availableColors={mockColors}
      name="color-picker"
      defaultColor="#EBAEDE"
    />
  );
};

export const ColorSelection: Story = {
  render: () => (
    <Box mb={3}>
      <AdvancedColorPickerWithState />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: /change colo(u)?r/i });
    await userEvent.click(trigger);

    const portal = within(document.body);

    const blue = await portal.findByLabelText(/blue/i);
    await userEvent.click(blue);

    await portal.findByLabelText(/blue/i, { selector: "input:checked" });
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
ColorSelection.storyName = "Color Selection";

export const ColorPreviewInteraction: Story = {
  render: () => (
    <Box mb={3}>
      <AdvancedColorPickerWithState initialColor="#EBAEDE" />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: /change colo(u)?r/i });
    await userEvent.click(trigger);

    const portal = within(document.body);

    const goldenrodRadioOption = await portal.findByLabelText(/goldenrod/i);
    await userEvent.click(goldenrodRadioOption);
    await portal.findByLabelText(/goldenrod/i, { selector: "input:checked" });

    await waitFor(() =>
      expect(canvas.getByText(/goldenrod/i)).toBeInTheDocument(),
    );

    const desertRadioOption = await portal.findByLabelText(/desert/i);
    await userEvent.click(desertRadioOption);
    await portal.findByLabelText(/desert/i, { selector: "input:checked" });

    await waitFor(() =>
      expect(canvas.getByText(/desert/i)).toBeInTheDocument(),
    );
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
ColorPreviewInteraction.storyName = "Color Preview Interaction";

export const DialogOpenAndCloseStates: Story = {
  render: () => (
    <Box mb={3}>
      <AdvancedColorPickerWithState />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: /change colo(u)?r/i });
    await userEvent.click(trigger);

    const portal = within(document.body);

    const blueRadioOption = await portal.findByLabelText(/blue/i);
    expect(blueRadioOption).toBeInTheDocument();

    await userEvent.click(blueRadioOption);
    await userEvent.keyboard("{Enter}");

    await waitFor(() =>
      expect(portal.queryByLabelText(/blue/i)).not.toBeInTheDocument(),
    );

    await userEvent.click(trigger);
    await portal.findByLabelText(/blue/i);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
DialogOpenAndCloseStates.storyName = "Dialog Open And Close States";

export const FocusManagement: Story = {
  render: () => (
    <Box mb={3}>
      <AdvancedColorPickerWithState initialColor="#AEECD6" />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: /change colo(u)?r/i });
    await userEvent.click(trigger);

    const portal = within(document.body);
    const mintRadioOption = await portal.findByLabelText(/mint/i);

    await userEvent.keyboard("{Shift>}{Tab}{/Shift}");
    await waitFor(() => expect(mintRadioOption).toHaveFocus());

    const pinkRadioOption = await portal.findByLabelText(/pink/i);
    await userEvent.click(pinkRadioOption);
    await userEvent.keyboard(" ");

    await waitFor(() =>
      expect(portal.queryByLabelText(/mint|pink/i)).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(trigger).toHaveFocus());
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

export const ColorGridNavigation: Story = {
  render: () => (
    <Box mb={3}>
      <AdvancedColorPickerWithState />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /change colo(u)?r/i });
    await userEvent.click(trigger);

    const portal = within(document.body);
    const labels = ["white", "blue", "pink", "turquoise", "mint"] as const;

    for (const label of labels) {
      const option = await portal.findByLabelText(
        new RegExp(`^${label}$`, "i"),
      );
      await userEvent.click(option);
      await portal.findByLabelText(new RegExp(`^${label}$`, "i"), {
        selector: "input:checked",
      });
    }

    const lastOption = portal.getByLabelText(/mint/i);
    lastOption.focus();
    await userEvent.keyboard(" ");

    await waitFor(() => expect(portal.queryByRole("radio")).toBeNull());
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
ColorGridNavigation.storyName = "Color Grid Navigation";

export const ControlledVsUncontrolled: Story = {
  render: () => (
    <Box display="flex" gap="32px">
      <Box>
        <h4>Controlled</h4>
        <AdvancedColorPickerWithState initialColor="#EBAEDE" />
      </Box>
      <Box>
        <h4>Uncontrolled</h4>
        <AdvancedColorPicker
          availableColors={mockColors}
          name="uncontrolled-picker"
          defaultColor="#EBAEDE"
        />
      </Box>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("button", {
      name: /change colo(u)?r/i,
    });
    expect(triggers).toHaveLength(2);

    await userEvent.click(triggers[0]);

    const portal = within(document.body);

    const mintRadioOption = await portal.findByLabelText(/mint/i);
    await userEvent.click(mintRadioOption);
    await portal.findByLabelText(/mint/i, { selector: "input:checked" });

    await waitFor(() => expect(portal.queryByRole("radio")).toBeNull());

    await userEvent.click(triggers[1]);
    const purple = await portal.findByLabelText(/purple/i);
    await userEvent.click(purple);
    await portal.findByLabelText(/purple/i, { selector: "input:checked" });
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
ControlledVsUncontrolled.storyName = "Controlled vs Uncontrolled";
