import React from "react";
import { ComponentStory } from "@storybook/react";
import Box from "../box/box.component";
import { LoaderSpinner } from ".";
import { LOADER_SPINNER_SIZES as sizes } from "./loader-spinner.config";

export const DefaultStory: ComponentStory<typeof LoaderSpinner> = () => (
  <LoaderSpinner />
);

export const Sizes: ComponentStory<typeof LoaderSpinner> = () => {
  return (
    <Box display="flex" alignItems="baseline">
      {sizes.map((size) => (
        <LoaderSpinner mx="20px" key={size} size={size} />
      ))}
    </Box>
  );
};

export const ShowSpinnerLabel: ComponentStory<typeof LoaderSpinner> = () => (
  <LoaderSpinner showSpinnerLabel={false} />
);

export const Variants: ComponentStory<typeof LoaderSpinner> = () => (
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

export const LabelColor: ComponentStory<typeof LoaderSpinner> = () => (
  <Box display="flex" backgroundColor="black" height="80px" width="220px" p={2}>
    <LoaderSpinner mx="3" variant="inverse" />
    <LoaderSpinner mx="3" variant="gradient-white" />
  </Box>
);

export const HasMotion: ComponentStory<typeof LoaderSpinner> = () => (
  <Box display="flex">
    <LoaderSpinner mx="3" hasMotion={false} />
    <LoaderSpinner mx="3" variant="gradient-grey" hasMotion={false} />
  </Box>
);

export const IsTracked: ComponentStory<typeof LoaderSpinner> = () => (
  <LoaderSpinner isTracked />
);

export const AnimationTime: ComponentStory<typeof LoaderSpinner> = () => (
  <Box display="flex">
    <LoaderSpinner mx="3" animationTime={5} />
    <LoaderSpinner mx="3" variant="gradient-grey" animationTime={5} />
    <LoaderSpinner mx="3" isTracked animationTime={5} />
  </Box>
);
