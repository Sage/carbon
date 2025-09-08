import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect, waitFor } from "@storybook/test";
import AdvancedColorPicker from "./advanced-color-picker.component";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";
import Box from "../box";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";

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

async function ensurePickerIsOpen(trigger: HTMLElement) {
  const portal = within(document.body);
  const radiosCount = () => portal.queryAllByRole("radio").length;

  if (radiosCount() === 0) {
    await userEvent.click(trigger);
  }

  await waitFor(() => expect(radiosCount()).toBeGreaterThan(0));
}

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

    await ensurePickerIsOpen(trigger);
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

    await ensurePickerIsOpen(trigger);
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
  parameters: {
    chromatic: { disableSnapshot: true },
  },
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

    await ensurePickerIsOpen(trigger);
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
    await userInteractionPause(300);

    const portal = within(document.body);

    await waitFor(() =>
      expect(portal.queryAllByRole("radio").length).toBeGreaterThan(0),
    );

    const mintRadioOption = await portal.findByLabelText(/mint/i);

    await userEvent.keyboard("{Tab}");
    await userInteractionPause(50);

    mintRadioOption.focus();
    await waitFor(() => expect(mintRadioOption).toHaveFocus());

    const pinkRadioOption = await portal.findByLabelText(/pink/i);
    await userEvent.click(pinkRadioOption);
    await userEvent.keyboard(" ");

    await waitFor(() => expect(portal.queryByRole("radio")).toBeNull());
    await waitFor(() => expect(trigger).toHaveFocus());

    await userEvent.click(trigger);
    await userInteractionPause(300);

    const mintAgain = await portal.findByLabelText(/mint/i);
    mintAgain.focus();
    await waitFor(() => expect(mintAgain).toHaveFocus());
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

export const RestoreOnFocus: Story = {
  render: () => (
    <Box mb={3}>
      <AdvancedColorPickerWithState
        initialColor="#B4AEEA"
        restoreFocusOnClose
      />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /change colo(u)?r/i });

    await userEvent.click(trigger);
    const portal = within(document.body);

    const purple = await portal.findByLabelText(/purple/i);
    await userEvent.click(purple);
    purple.focus();
    await userEvent.keyboard(" ");

    await waitFor(() => expect(portal.queryAllByRole("radio")).toHaveLength(0));
    await waitFor(() => expect(trigger).toHaveFocus());

    await userEvent.click(trigger);
    const purpleChecked = await portal.findByLabelText(/purple/i, {
      selector: "input:checked",
    });

    purpleChecked.focus();
    await waitFor(() => expect(purpleChecked).toHaveFocus());
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
RestoreOnFocus.storyName = "Restore On Focus";

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

    await ensurePickerIsOpen(trigger);
    const mintForSnapshot = await within(document.body).findByLabelText(
      /mint/i,
    );
    mintForSnapshot.focus();
    await waitFor(() => expect(mintForSnapshot).toHaveFocus());
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
