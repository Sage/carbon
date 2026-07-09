import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import { StepSequence, StepSequenceItem, StepSequenceProps } from ".";
import Box from "../box";

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const meta: Meta<typeof StepSequence> = {
  title: "Step Sequence/Test",
  component: StepSequence,
  subcomponents: { StepSequenceItem },
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    themeProvider: { chromatic: { theme: "sage" } },
  },
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof StepSequence>;

const StepSequenceComponent = ({
  orientation,
  size,
  description,
}: Pick<StepSequenceProps, "orientation" | "size"> & {
  description?: string;
}) => (
  <StepSequence orientation={orientation} size={size}>
    <StepSequenceItem
      indicator="1"
      status="complete"
      description={description}
      title="Personal Details"
    />
    <StepSequenceItem
      indicator="2"
      status="complete"
      description={description}
      title="Delivery Address"
    />
    <StepSequenceItem
      indicator="3"
      status="current"
      description={description}
      title="Delivery Details"
    />
    <StepSequenceItem
      indicator="4"
      status="incomplete"
      description={description}
      title="Payment"
    />
    <StepSequenceItem
      indicator="5"
      status="incomplete"
      description={description}
      title="Confirmation"
    />
  </StepSequence>
);

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor";

export const ChromaticSnapshotsStory: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={6}>
      <StepSequenceComponent />
      <StepSequenceComponent size="small" />
      <StepSequenceComponent description={description} />
      <StepSequenceComponent size="small" description={description} />
      <Box display="flex" flexDirection="row" gap={6}>
        <StepSequenceComponent orientation="vertical" />
        <StepSequenceComponent
          orientation="vertical"
          description={description}
        />
        <StepSequenceComponent size="small" orientation="vertical" />
        <StepSequenceComponent
          size="small"
          orientation="vertical"
          description={description}
        />
      </Box>
    </Box>
  ),
};
