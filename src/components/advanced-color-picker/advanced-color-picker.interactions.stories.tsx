import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import AdvancedColorPicker from "./advanced-color-picker.component";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";
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
  { label: "Red", value: "#FF0000" },
  { label: "Blue", value: "#0000FF" },
  { label: "Green", value: "#00FF00" },
  { label: "Yellow", value: "#FFFF00" },
  { label: "Purple", value: "#800080" },
  { label: "Orange", value: "#FFA500" },
  { label: "Pink", value: "#FFC0CB" },
  { label: "Brown", value: "#A52A2A" },
];

const AdvancedColorPickerWithState = ({
  initialColor = "#FF0000",
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
      defaultColor="#FF0000"
    />
  );
};

export const BasicColorSelection: Story = {
  render: () => (
    <Box mb={3}>
      <AdvancedColorPickerWithState />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const colorPickerCell = canvas.getByTestId("color-picker-cell");
    await userEvent.click(colorPickerCell);
    await userInteractionPause(300);

    const blueColorOption = canvas.getByLabelText("Blue");
    expect(blueColorOption).toBeInTheDocument();

    await userEvent.click(blueColorOption);
    await userInteractionPause(300);

    expect(blueColorOption).toBeChecked();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
BasicColorSelection.storyName = "Basic Color Selection";

export const KeyboardNavigation: Story = {
  render: () => (
    <Box mb={3}>
      <AdvancedColorPickerWithState />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const colorPickerCell = canvas.getByTestId("color-picker-cell");
    await userEvent.click(colorPickerCell);
    await userEvent.keyboard("{Enter}");
    await userInteractionPause(300);

    await userEvent.tab();
    await userEvent.tab();

    await userEvent.keyboard(" ");
    await userInteractionPause(300);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
KeyboardNavigation.storyName = "Keyboard Navigation";

export const SpaceKeyInteraction: Story = {
  render: () => (
    <Box mb={3}>
      <AdvancedColorPickerWithState />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const colorPickerCell = canvas.getByTestId("color-picker-cell");
    await userEvent.click(colorPickerCell);
    await userEvent.keyboard(" ");
    await userInteractionPause(300);

    const greenColorOption = canvas.getByLabelText("Green");
    await userEvent.click(greenColorOption);
    await userEvent.keyboard(" ");
    await userInteractionPause(300);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
SpaceKeyInteraction.storyName = "Space Key Interaction";

export const ColorPreviewInteraction: Story = {
  render: () => (
    <Box mb={3}>
      <AdvancedColorPickerWithState initialColor="#800080" />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const colorPickerCell = canvas.getByTestId("color-picker-cell");
    await userEvent.click(colorPickerCell);
    await userInteractionPause(300);

    const colorPreview = canvas.getByTestId("color-picker-preview");
    expect(colorPreview).toBeInTheDocument();

    const yellowColorOption = canvas.getByLabelText("Yellow");
    await userEvent.click(yellowColorOption);
    await userInteractionPause(300);

    const orangeColorOption = canvas.getByLabelText("Orange");
    await userEvent.click(orangeColorOption);
    await userInteractionPause(300);
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

export const DialogOpenCloseStates: Story = {
  render: () => (
    <Box mb={3}>
      <AdvancedColorPickerWithState />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const colorPickerCell = canvas.getByTestId("color-picker-cell");
    await userEvent.click(colorPickerCell);
    await userInteractionPause(300);

    const blueColorOption = canvas.getByLabelText("Blue");
    expect(blueColorOption).toBeInTheDocument();

    await userEvent.click(blueColorOption);
    await userEvent.keyboard("{Enter}");
    await userInteractionPause(300);

    await userEvent.click(colorPickerCell);
    await userInteractionPause(300);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
DialogOpenCloseStates.storyName = "Dialog Open/Close States";

export const FocusManagement: Story = {
  render: () => (
    <Box mb={3}>
      <AdvancedColorPickerWithState initialColor="#00FF00" />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const colorPickerCell = canvas.getByTestId("color-picker-cell");
    await userEvent.click(colorPickerCell);
    await userEvent.keyboard("{Enter}");
    await userInteractionPause(300);

    const greenColorOption = canvas.getByLabelText("Green");
    expect(greenColorOption).toHaveFocus();

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab({ shift: true });
    await userInteractionPause(200);

    const pinkColorOption = canvas.getByLabelText("Pink");
    await userEvent.click(pinkColorOption);
    await userEvent.keyboard(" ");
    await userInteractionPause(300);
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

    const colorPickerCell = canvas.getByTestId("color-picker-cell");
    await userEvent.click(colorPickerCell);
    await userInteractionPause(300);

    const colorOptions = [
      canvas.getByLabelText("Red"),
      canvas.getByLabelText("Blue"),
      canvas.getByLabelText("Green"),
      canvas.getByLabelText("Yellow"),
      canvas.getByLabelText("Purple"),
    ];

    for (const color of colorOptions) {
      await userEvent.click(color);
      await userInteractionPause(200);
      expect(color).toBeChecked();
    }

    await userEvent.keyboard("{Enter}");
    await userInteractionPause(300);
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

export const AccessibilityInteraction: Story = {
  render: () => (
    <Box mb={3}>
      <AdvancedColorPickerWithState
        aria-label="Choose background color"
        aria-describedby="color-help-text"
      />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const colorPickerCell = canvas.getByTestId("color-picker-cell");
    expect(colorPickerCell).toHaveAttribute("aria-describedby");

    await userEvent.click(colorPickerCell);
    await userInteractionPause(300);

    const redColorOption = canvas.getByLabelText("Red");
    const blueColorOption = canvas.getByLabelText("Blue");

    expect(redColorOption).toHaveAttribute("aria-label", "Red");
    expect(blueColorOption).toHaveAttribute("aria-label", "Blue");

    await userEvent.click(blueColorOption);
    await userEvent.keyboard(" ");
    await userInteractionPause(300);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
AccessibilityInteraction.storyName = "Accessibility Interaction";

export const ControlledVsUncontrolled: Story = {
  render: () => (
    <Box display="flex" gap="32px">
      <Box>
        <h4>Controlled</h4>
        <AdvancedColorPickerWithState initialColor="#FF0000" />
      </Box>
      <Box>
        <h4>Uncontrolled</h4>
        <AdvancedColorPicker
          availableColors={mockColors}
          name="uncontrolled-picker"
          defaultColor="#0000FF"
        />
      </Box>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const allColorCells = canvasElement.querySelectorAll(
      '[data-element="color-picker-cell"]',
    );
    expect(allColorCells).toHaveLength(2);

    await userEvent.click(allColorCells[0]);
    await userInteractionPause(300);

    const greenInControlled =
      within(canvasElement).getAllByLabelText("Green")[0];
    await userEvent.click(greenInControlled);
    await userInteractionPause(300);

    await userEvent.click(allColorCells[1]);
    await userInteractionPause(300);

    const purpleInUncontrolled =
      within(canvasElement).getAllByLabelText("Purple")[1];
    await userEvent.click(purpleInUncontrolled);
    await userInteractionPause(300);
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
