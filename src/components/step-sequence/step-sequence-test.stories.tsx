import { Meta } from "@storybook/react-vite";

import React from "react";

import Box from "../box";

import { StepSequence, StepSequenceItem } from ".";

const meta: Meta<typeof StepSequence> = {
  title: "Step Sequence/Test",
  component: StepSequence,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    info: { disable: true },
  },
  args: {
    currentStep: 2,
    orientation: "vertical",
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
  },
};

export default meta;

export const ChromaticSnapshotsStory = () => (
  <Box display="flex" flexDirection="column" gap={6}>
    <StepSequence currentStep={2} orientation="horizontal">
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

    <StepSequence currentStep={2}>
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
  </Box>
);

ChromaticSnapshotsStory.storyName = "Step Sequence Chromatic Snapshots";
ChromaticSnapshotsStory.parameters = {
  chromatic: { disableSnapshot: false, viewports: [700, 1200] },
  themeProvider: { chromatic: { theme: "sage" } },
};
