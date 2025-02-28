import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/test";
import AdvancedColorPicker, { AdvancedColorPickerProps } from ".";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";

export default {
  title: "Advanced Color Picker/Test",
  includeStories: [
    "Default",
    "OnBlurExample",
    "AdvancedColorPickerClick",
    "AdvancedColorPickerKeyboard",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Default = (args: Partial<AdvancedColorPickerProps>) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("orchid");
  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setColor(target.value);
  };
  return (
    <AdvancedColorPicker
      {...args}
      name="advancedPicker"
      availableColors={[
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
      ]}
      defaultColor="#EBAEDE"
      selectedColor={color}
      onChange={onChange}
      onOpen={() => {
        setOpen(!open);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onBlur={() => {}}
      open={open}
    />
  );
};

export const AdvancedColorPickerCustom = ({
  onChange,
  ...props
}: Partial<AdvancedColorPickerProps>) => {
  const [open, setOpen] = React.useState(true);
  const [color, setColor] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (onChange) {
      onChange(e);
    }
    setColor(value);
  };
  return (
    <AdvancedColorPicker
      name="advancedColor"
      availableColors={[
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
      ]}
      defaultColor="#EBAEDE"
      selectedColor={color}
      onChange={handleChange}
      onOpen={() => {
        setOpen(open);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onBlur={() => {}}
      open={open}
      {...props}
    />
  );
};

const colors = [
  { label: "red", value: "red" },
  { label: "yellow", value: "yellow" },
  { label: "green", value: "green" },
  { label: "blue", value: "blue" },
  { label: "hotpink", value: "hotpink" },
];

export const OnBlurExample = () => {
  const [color, setColor] = useState("red");
  const onChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setColor(e.target.value);
  };
  const onBlur = () => {
    console.log("onBlur called");
  };
  return (
    <AdvancedColorPicker
      availableColors={colors}
      selectedColor={color}
      onChange={onChange}
      defaultColor=""
      name="choose a colour"
      onBlur={onBlur}
    />
  );
};

// Play Functions
const meta: Meta<typeof AdvancedColorPicker> = {
  title: "AdvancedColorPicker",
  component: AdvancedColorPicker,
  parameters: { chromatic: { disableSnapshot: true } },
};

export { meta };

type Story = StoryObj<typeof AdvancedColorPicker>;

const AdvancedColorPickerDefaultComponent = () => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("orchid");
  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setColor(target.value);
  };
  return (
    <AdvancedColorPicker
      name="advancedPicker"
      availableColors={[
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
      ]}
      defaultColor="#EBAEDE"
      selectedColor={color}
      onChange={onChange}
      onOpen={() => {
        setOpen(!open);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onBlur={() => {}}
      open={open}
    />
  );
};

export const AdvancedColorPickerClick: Story = {
  render: () => <AdvancedColorPickerDefaultComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Change colour" }),
    );
  },
  decorators: [
    (StoryToRender) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryToRender />
      </div>
    ),
  ],
};

AdvancedColorPickerClick.storyName = "AdvancedColorPicker Click";
AdvancedColorPickerClick.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const AdvancedColorPickerKeyboard: Story = {
  render: () => <AdvancedColorPickerDefaultComponent />,
  play: async () => {
    await userEvent.tab();
    await waitFor(() => userInteractionPause(300));
    await userEvent.keyboard("{enter}");
    await waitFor(() => userInteractionPause(300));

    await userEvent.tab();
    await waitFor(() => userInteractionPause(300));
    await userEvent.tab();
    await waitFor(() => userInteractionPause(300));

    await userEvent.keyboard("{arrowdown}");
    await waitFor(() => userInteractionPause(300));
    await userEvent.keyboard("{arrowright}");
    await waitFor(() => userInteractionPause(300));

    await userEvent.keyboard("{enter}");
  },
};

AdvancedColorPickerKeyboard.storyName = "AdvancedColorPicker Keyboard";
