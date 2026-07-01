import { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

import { StepSequence, StepSequenceItem, StepSequenceProps } from ".";
import useMediaQuery from "../../hooks/useMediaQuery";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const meta: Meta<typeof StepSequence> = {
  title: "Step Sequence",
  component: StepSequence,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  args: {
    currentStep: 2,
    orientation: "vertical",
    size: "medium",
  },
  argTypes: {
    currentStep: {
      control: {
        type: "range",
        min: 1,
        max: 5,
        step: 1,
      },
    },
    orientation: {
      options: ["horizontal", "vertical"],
      control: { type: "select" },
    },
    size: {
      options: ["small", "medium"],
      control: { type: "select" },
    },
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof StepSequence>;

export const DefaultStory: Story = (props: StepSequenceProps) => {
  return (
    <StepSequence {...props}>
      <StepSequenceItem
        stepNumber={1}
        title="Planning"
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      />
      <StepSequenceItem
        stepNumber={2}
        title="Design"
        description={"This is step 2"}
      />
      <StepSequenceItem stepNumber={3} title="Development" />
      <StepSequenceItem stepNumber={4} title="QA" />
      <StepSequenceItem
        stepNumber={5}
        title="Release"
        description={"This is step 5"}
      />
    </StepSequence>
  );
};
DefaultStory.storyName = "Default";
DefaultStory.args = {
  currentStep: 1,
};

export const Horizontal: Story = (props: StepSequenceProps) => {
  return (
    <StepSequence {...props} orientation={"horizontal"}>
      <StepSequenceItem
        stepNumber={1}
        title="Planning"
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      />
      <StepSequenceItem
        stepNumber={2}
        title="Design"
        description={"This is step 2"}
      />
      <StepSequenceItem stepNumber={3} title="Development" />
      <StepSequenceItem stepNumber={4} title="QA" />
      <StepSequenceItem
        stepNumber={5}
        title="Release"
        description={"This is step 5"}
      />
    </StepSequence>
  );
};
Horizontal.storyName = "Horizontal";

export const Size: Story = ({ ...props }) => {
  return (
    <div>
      <StepSequence currentStep={props.currentStep} size={props.size}>
        <StepSequenceItem
          stepNumber={1}
          title="Planning"
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          }
        />
        <StepSequenceItem
          stepNumber={2}
          title="Design"
          description={"This is step 2"}
        />
        <StepSequenceItem stepNumber={3} title="Development" />
        <StepSequenceItem stepNumber={4} title="QA" />
        <StepSequenceItem
          stepNumber={5}
          title="Release"
          description={"This is step 5"}
        />
      </StepSequence>
    </div>
  );
};
Size.storyName = "Size";
Size.args = {
  size: "small",
};

export const Responsive: Story = (props: StepSequenceProps) => {
  const displayVertical = useMediaQuery("(max-width: 760px)");

  return (
    <StepSequence
      currentStep={props.currentStep}
      orientation={displayVertical ? "vertical" : "horizontal"}
    >
      <StepSequenceItem
        stepNumber={1}
        title="Planning"
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      />
      <StepSequenceItem
        stepNumber={2}
        title="Design"
        description={"This is step 2"}
      />
      <StepSequenceItem stepNumber={3} title="Development" />
      <StepSequenceItem stepNumber={4} title="QA" />
      <StepSequenceItem
        stepNumber={5}
        title="Release"
        description={"This is step 5"}
      />
    </StepSequence>
  );
};
Responsive.storyName = "Responsive";

export const LabelOverrides: Story = (props: StepSequenceProps) => {
  return (
    <StepSequence {...props}>
      <StepSequenceItem
        stepNumber={1}
        title="Planning"
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      />
      <StepSequenceItem
        stepNumber={2}
        title="Design"
        description={"This is step 2"}
      />
      <StepSequenceItem stepNumber={3} title="Development" />
      <StepSequenceItem stepNumber={4} title="QA" />
      <StepSequenceItem
        stepNumber={5}
        title="Release"
        description={"This is step 5"}
      />
    </StepSequence>
  );
};
LabelOverrides.storyName = "Label Overrides";
LabelOverrides.args = {
  currentStep: 1,
  hiddenCompleteLabel: "Finished",
  hiddenCurrentLabel: "Active",
  hiddenIncompleteLabel: "Not Started",
};
