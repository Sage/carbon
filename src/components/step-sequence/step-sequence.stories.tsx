import React from "react";
import { ComponentStory } from "@storybook/react";

import { StepSequence, StepSequenceItem } from ".";
import Box from "../box";
import useMediaQuery from "../../hooks/useMediaQuery";

export const DefaultStory: ComponentStory<typeof StepSequence> = () => (
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

export const Vertical: ComponentStory<typeof StepSequence> = () => (
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

export const WithHiddenIndicators: ComponentStory<typeof StepSequence> = () => (
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

export const ResponsiveExample: ComponentStory<typeof StepSequence> = () => {
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

ResponsiveExample.parameters = { chromatic: { viewports: [700] } };
