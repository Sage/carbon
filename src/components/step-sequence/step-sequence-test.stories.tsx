import React from "react";
import StepSequence, { StepSequenceProps } from "./step-sequence.component";
import StepSequenceItem, {
  StepSequenceItemProps,
} from "./step-sequence-item/step-sequence-item.component";

export default {
  title: "Step Sequence/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    orientation: {
      options: ["horizontal", "vertical"],
      control: {
        type: "select",
      },
    },
    status: {
      options: ["complete", "current", "incomplete"],
      control: {
        type: "select",
      },
    },
  },
};

export const StepSequenceStory = (args: Partial<StepSequenceProps>) => (
  <StepSequence {...args}>
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

StepSequenceStory.storyName = "step sequence";
StepSequenceStory.args = {
  orientation: "horizontal",
};

interface StepSequenceItemStoryProps extends StepSequenceItemProps {
  hideIndicator?: boolean;
}

export const StepSequenceItemStory = ({
  indicator,
  hideIndicator,
  hiddenCompleteLabel,
  hiddenCurrentLabel,
  ariaLabel,
  children,
  ...args
}: StepSequenceItemStoryProps) => (
  <StepSequence>
    <StepSequenceItem
      indicator={indicator || "1"}
      hideIndicator={hideIndicator}
      hiddenCompleteLabel={hiddenCompleteLabel}
      hiddenCurrentLabel={hiddenCurrentLabel}
      aria-label={ariaLabel}
      {...args}
    >
      {children}
    </StepSequenceItem>
  </StepSequence>
);

StepSequenceItemStory.storyName = "step sequence item";

StepSequenceItemStory.args = {
  indicator: "1",
  hideIndicator: false,
  status: "incomplete",
  hiddenCompleteLabel: "",
  hiddenCurrentLabel: "",
  ariaLabel: "Step 1 of 5",
  children: "Step Label",
};
