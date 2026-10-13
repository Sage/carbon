import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box/box.component";
import { LoaderSpinner } from ".";
import { LOADER_SPINNER_SIZES as sizes } from "./loader-spinner.config";

const blackBackground: React.CSSProperties = {
  backgroundColor: "rgb(0, 0, 0)",
};

const lightGreyBackground: React.CSSProperties = {
  backgroundColor: "rgb(211, 211, 211)",
};

const blackLoaderBackground: React.CSSProperties = {
  display: "flex",
  height: "80px",
  width: "220px",
  padding: "var(--global-space-layout-2-xs)",
  backgroundColor: "rgb(0, 0, 0)",
};

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof LoaderSpinner> = {
  title: "Deprecated/Loader Spinner",
  component: LoaderSpinner,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: { disableSnapshot: true },
  },
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
    <div style={blackBackground}>
      <LoaderSpinner mx="3" showSpinnerLabel={false} variant="inverse" />
    </div>
    <div style={lightGreyBackground}>
      <LoaderSpinner mx="3" showSpinnerLabel={false} variant="gradient-grey" />
    </div>
    <div style={lightGreyBackground}>
      <LoaderSpinner mx="3" showSpinnerLabel={false} variant="gradient-white" />
    </div>
  </Box>
);
Variants.storyName = "Variants";

export const LabelColor: Story = () => (
  <div style={blackLoaderBackground}>
    <LoaderSpinner mx="3" variant="inverse" />
    <LoaderSpinner mx="3" variant="gradient-white" />
  </div>
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
