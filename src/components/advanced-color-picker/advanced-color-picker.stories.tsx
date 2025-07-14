import React, { useState, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { allModes } from "../../../.storybook/modes";
import isChromatic from "../../../.storybook/isChromatic";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import AdvancedColorPicker from ".";
import Message from "../message";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const defaultOpenState = isChromatic();

const meta: Meta<typeof AdvancedColorPicker> = {
  title: "Advanced Color Picker",
  component: AdvancedColorPicker,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: {
      modes: {
        desktop: allModes.chromatic,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        {defaultOpenState ? (
          <Box width="100%" height={900}>
            <Story />
          </Box>
        ) : (
          <Story />
        )}
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AdvancedColorPicker>;

export const Default: Story = () => {
  const [open, setOpen] = useState(defaultOpenState);
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
Default.storyName = "Default";

export const RestoreFocusOnCloseStory: Story = () => {
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);

  const [color, setColor] = useState("orchid");
  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setColor(target.value);
  };
  return (
    <>
      <AdvancedColorPicker
        restoreFocusOnClose={false}
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
          setShowMessage(false);
        }}
        onClose={() => {
          setOpen(false);
          setShowMessage(true);
          setTimeout(() => messageRef.current?.focus(), 1);
        }}
        onBlur={() => {}}
        open={open}
        mb={showMessage ? 5 : 0}
      />
      {showMessage && (
        <Message
          ref={messageRef}
          variant="error"
          onDismiss={() => setShowMessage(false)}
        >
          Some custom message
        </Message>
      )}
    </>
  );
};
RestoreFocusOnCloseStory.storyName = "With Restore Focus Close";
RestoreFocusOnCloseStory.parameters = { chromatic: { disableSnapshot: true } };
