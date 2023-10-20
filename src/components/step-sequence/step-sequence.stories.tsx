import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import useMediaQuery from "../../hooks/useMediaQuery";

import Box from "../box";
import { StepSequence, StepSequenceItem } from ".";

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const meta: Meta<typeof StepSequence> = {
  title: "Step Sequence",
  component: StepSequence,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof StepSequence>;

export const DefaultStory: Story = () => {
  return (
    <StepSequence>
      <StepSequenceItem
        aria-label="Step 1 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="1"
        status="complete"
      >
        Name
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 2 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="2"
        status="complete"
      >
        Delivery Address
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 3 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="3"
        status="current"
      >
        Delivery Details
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 4 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="4"
        status="incomplete"
      >
        Payment
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 5 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="5"
        status="incomplete"
      >
        Confirm
      </StepSequenceItem>
    </StepSequence>
  );
};
DefaultStory.storyName = "Default";

export const Vertical: Story = () => {
  return (
    <Box height="600px">
      <StepSequence orientation="vertical">
        <StepSequenceItem
          aria-label="Step 1 of 5"
          hiddenCompleteLabel="Complete"
          hiddenCurrentLabel="Current"
          indicator="1"
          status="complete"
        >
          Name
        </StepSequenceItem>
        <StepSequenceItem
          aria-label="Step 2 of 5"
          hiddenCompleteLabel="Complete"
          hiddenCurrentLabel="Current"
          indicator="2"
          status="complete"
        >
          Delivery Address
        </StepSequenceItem>
        <StepSequenceItem
          aria-label="Step 3 of 5"
          hiddenCompleteLabel="Complete"
          hiddenCurrentLabel="Current"
          indicator="3"
          status="current"
        >
          Delivery Details
        </StepSequenceItem>
        <StepSequenceItem
          aria-label="Step 4 of 5"
          hiddenCompleteLabel="Complete"
          hiddenCurrentLabel="Current"
          indicator="4"
          status="incomplete"
        >
          Payment
        </StepSequenceItem>
        <StepSequenceItem
          aria-label="Step 5 of 5"
          hiddenCompleteLabel="Complete"
          hiddenCurrentLabel="Current"
          indicator="5"
          status="incomplete"
        >
          Confirm
        </StepSequenceItem>
      </StepSequence>
    </Box>
  );
};
Vertical.storyName = "Vertical";

export const WithHiddenIndicators: Story = () => {
  return (
    <StepSequence>
      <StepSequenceItem
        aria-label="Step 1 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="1"
        status="complete"
      >
        Name
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 2 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="2"
        status="complete"
      >
        Delivery Address
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 3 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="3"
        hideIndicator
        status="current"
      >
        Delivery Details
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 4 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="4"
        hideIndicator
        status="incomplete"
      >
        Payment
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 5 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="5"
        hideIndicator
        status="incomplete"
      >
        Confirm
      </StepSequenceItem>
    </StepSequence>
  );
};
WithHiddenIndicators.storyName = "With Hidden Indicators";

export const ResponsiveExample: Story = () => {
  const displayVertical = useMediaQuery("(max-width: 760px)");
  return (
    <StepSequence orientation={displayVertical ? "vertical" : "horizontal"}>
      <StepSequenceItem
        aria-label="Step 1 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="1"
        status="complete"
      >
        Name
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 2 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="2"
        status="complete"
      >
        Delivery Address
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 3 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="3"
        status="current"
      >
        Delivery Details
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 4 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="4"
        status="incomplete"
      >
        Payment
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 5 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="5"
        status="incomplete"
      >
        Confirm
      </StepSequenceItem>
    </StepSequence>
  );
};
ResponsiveExample.storyName = "Responsive Example";
ResponsiveExample.parameters = { chromatic: { viewports: [700] } };
