import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box/box.component";
import { LoaderSpinner } from ".";
import { LOADER_SPINNER_SIZES as sizes } from "./loader-spinner.config";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof LoaderSpinner> = {
  title: "Loader Spinner",
  component: LoaderSpinner,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: { themeProvider: { chromatic: { theme: "sage" } } },
};

export default meta;
type Story = StoryObj<typeof LoaderSpinner>;

export const Default: Story = () => (
  <Box display="flex">
    <LoaderSpinner />
  </Box>
);
Default.storyName = "Default";

export const OverrideSpinnerLabel: Story = () => (
  <Box display="flex">
    <LoaderSpinner mx="3" spinnerLabel="Processing..." variant="action" />
    <LoaderSpinner mx="3" spinnerLabel="Saving..." variant="neutral" />
    <LoaderSpinner
      mx="3"
      spinnerLabel="Loading... This can take a few seconds... Or a few minutes..."
      variant="action"
    />
  </Box>
);
OverrideSpinnerLabel.storyName = "Override Spinner Label";

export const Sizes: Story = () => {
  return (
    <Box display="flex" alignItems="baseline">
      {sizes.map((size) => (
        <LoaderSpinner mx="20px" key={size} size={size} />
      ))}
    </Box>
  );
};
Sizes.storyName = "Sizes";

export const ShowSpinnerLabel: Story = () => (
  <Box display="flex">
    <LoaderSpinner showSpinnerLabel={false} />
  </Box>
);
ShowSpinnerLabel.storyName = "Show Spinner Label";

export const Variants: Story = () => (
  <Box display="flex">
    <LoaderSpinner mx="3" showSpinnerLabel={false} variant="action" />
    <LoaderSpinner mx="3" showSpinnerLabel={false} variant="neutral" />
    <Box backgroundColor="black">
      <LoaderSpinner mx="3" showSpinnerLabel={false} variant="inverse" />
    </Box>
    <Box backgroundColor="lightgrey">
      <LoaderSpinner mx="3" showSpinnerLabel={false} variant="gradient-grey" />
    </Box>
    <Box backgroundColor="lightgrey">
      <LoaderSpinner mx="3" showSpinnerLabel={false} variant="gradient-white" />
    </Box>
  </Box>
);
Variants.storyName = "Variants";

export const LabelColor: Story = () => (
  <Box display="flex" backgroundColor="black" height="80px" width="220px" p={2}>
    <LoaderSpinner mx="3" variant="inverse" />
    <LoaderSpinner mx="3" variant="gradient-white" />
  </Box>
);
LabelColor.storyName = "Label Color";

export const HasMotion: Story = () => (
  <Box display="flex">
    <LoaderSpinner mx="3" hasMotion={false} />
    <LoaderSpinner mx="3" variant="gradient-grey" hasMotion={false} />
  </Box>
);
HasMotion.storyName = "Has Motion";

export const IsTracked: Story = () => (
  <Box display="flex">
    <LoaderSpinner isTracked />
  </Box>
);
IsTracked.storyName = "Is Tracked";

export const AnimationTime: Story = () => (
  <Box display="flex">
    <LoaderSpinner mx="3" animationTime={5} />
    <LoaderSpinner mx="3" variant="gradient-grey" animationTime={5} />
    <LoaderSpinner mx="3" isTracked animationTime={5} />
  </Box>
);
AnimationTime.storyName = "Animation Time";
