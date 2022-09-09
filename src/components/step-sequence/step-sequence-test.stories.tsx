import React from "react";

import specialCharacters from "../../__internal__/utils/argTypes/specialCharacters";
import StepSequence, { StepSequenceProps } from "./step-sequence.component";
import StepSequenceItem, {
  StepSequenceItemProps,
} from "./step-sequence-item/step-sequence-item.component";
import {
  STEP_SEQUENCE_ORIENTATION,
  STEP_SEQUENCE_STEPS,
} from "./step-sequence.config";

export default {
  title: "Step Sequence/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    orientation: {
      options: STEP_SEQUENCE_ORIENTATION,
      control: {
        type: "select",
      },
    },
    status: {
      options: STEP_SEQUENCE_STEPS,
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

StepSequenceStory.storyName = "Step Sequence";
StepSequenceStory.args = {
  orientation: "horizontal",
};

interface StepSequenceItemStoryProps extends StepSequenceItemProps {
  indicatorSpecialCharacters?: string;
  hideIndicator?: boolean;
  hiddenCompleteLabelSpecialCharacters?: string;
  hiddenCurrentLabelSpecialCharacters?: string;
  ariaLabelSpecialCharacters?: string;
  childrenSpecialCharacters?: string;
}

export const StepSequenceItemStory = ({
  indicatorSpecialCharacters,
  indicator,
  hideIndicator,
  hiddenCompleteLabelSpecialCharacters,
  hiddenCompleteLabel,
  hiddenCurrentLabelSpecialCharacters,
  hiddenCurrentLabel,
  ariaLabelSpecialCharacters,
  ariaLabel,
  childrenSpecialCharacters,
  children,
  ...args
}: StepSequenceItemStoryProps) => (
  <StepSequenceItem
    indicator={indicator || indicatorSpecialCharacters || "1"}
    hideIndicator={hideIndicator}
    hiddenCompleteLabel={
      hiddenCompleteLabel || hiddenCompleteLabelSpecialCharacters
    }
    hiddenCurrentLabel={
      hiddenCurrentLabel || hiddenCurrentLabelSpecialCharacters
    }
    aria-label={ariaLabel || ariaLabelSpecialCharacters}
    {...args}
  >
    {children || childrenSpecialCharacters}
  </StepSequenceItem>
);

StepSequenceItemStory.storyName = "Step Sequence Item";

StepSequenceItemStory.argTypes = {
  indicatorSpecialCharacters: specialCharacters,
  hiddenCompleteLabelSpecialCharacters: specialCharacters,
  hiddenCurrentLabelSpecialCharacters: specialCharacters,
  ariaLabelSpecialCharacters: specialCharacters,
  childrenSpecialCharacters: specialCharacters,
};

StepSequenceItemStory.args = {
  indicator: "1",
  hideIndicator: false,
  indicatorSpecialCharacters: undefined,
  status: "incomplete",
  hiddenCompleteLabel: "",
  hiddenCompleteLabelSpecialCharacters: undefined,
  hiddenCurrentLabel: "",
  hiddenCurrentLabelSpecialCharacters: undefined,
  ariaLabel: "Step 1 of 5",
  ariaLabelSpecialCharacters: undefined,
  children: "Step Label",
  childrenSpecialCharacters: undefined,
};
