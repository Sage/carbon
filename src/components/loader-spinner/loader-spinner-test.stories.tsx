import React from "react";
import Box from "../box";
import { LoaderSpinner, LoaderSpinnerProps } from ".";
import {
  LOADER_SPINNER_SIZES,
  LOADER_SPINNER_VARIANTS,
} from "./loader-spinner.config";

export default {
  title: "Deprecated/Loader Spinner/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    spinnerLabel: {
      control: {
        type: "text",
      },
    },
    size: {
      options: LOADER_SPINNER_SIZES,
      control: {
        type: "select",
      },
    },
    showSpinnerLabel: {
      control: {
        type: "boolean",
      },
    },
    variant: {
      options: LOADER_SPINNER_VARIANTS,
      control: {
        type: "select",
      },
    },
    hasMotion: {
      control: {
        type: "boolean",
      },
    },
    isTracked: {
      control: {
        type: "boolean",
      },
    },
    animationTime: {
      control: {
        type: "number",
      },
    },
  },
};

export const Default = (props: Partial<LoaderSpinnerProps>) => (
  <Box p={3} backgroundColor="darkgrey" width="100%" height="200px">
    <LoaderSpinner {...props} />
  </Box>
);

Default.storyName = "default";
