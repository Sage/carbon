import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import { StepSequence, StepSequenceItem } from ".";

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const meta: Meta<typeof StepSequence> = {
  title: "Step Sequence",
  component: StepSequence,
  subcomponents: { StepSequenceItem },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof StepSequence>;

export const HorizontalOrientation: Story = {
  render: ({ ...args }) => (
    <StepSequence {...args}>
      <StepSequenceItem
        aria-label="Step 1 of 5"
        indicator="1"
        status="complete"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Personal Details"
      />
      <StepSequenceItem
        aria-label="Step 2 of 5"
        indicator="2"
        status="complete"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Delivery Address"
      />
      <StepSequenceItem
        aria-label="Step 3 of 5"
        indicator="3"
        status="current"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Delivery Details"
      />
      <StepSequenceItem
        aria-label="Step 4 of 5"
        indicator="4"
        status="incomplete"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Payment"
      />
      <StepSequenceItem
        aria-label="Step 5 of 5"
        indicator="5"
        status="incomplete"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Confirmation"
      />
    </StepSequence>
  ),
  args: {
    orientation: "horizontal",
  },
};

export const VerticalOrientation: Story = {
  ...HorizontalOrientation,
  args: {
    orientation: "vertical",
  },
};

export const SmallSize: Story = {
  ...HorizontalOrientation,
  args: {
    size: "small",
  },
};

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor";

export const WithItemDescription: Story = {
  render: ({ ...args }) => (
    <StepSequence {...args}>
      <StepSequenceItem
        aria-label="Step 1 of 5"
        indicator="1"
        status="complete"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Personal Details"
        description={description}
      />
      <StepSequenceItem
        aria-label="Step 2 of 5"
        indicator="2"
        status="complete"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Delivery Address"
        description={description}
      />
      <StepSequenceItem
        aria-label="Step 3 of 5"
        indicator="3"
        status="current"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Delivery Details"
        description={description}
      />
      <StepSequenceItem
        aria-label="Step 4 of 5"
        indicator="4"
        status="incomplete"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Payment"
        description={description}
      />
      <StepSequenceItem
        aria-label="Step 5 of 5"
        indicator="5"
        status="incomplete"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        title="Confirmation"
        description={description}
      />
    </StepSequence>
  ),
};
