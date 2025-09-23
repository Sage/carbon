import React from "react";
import Loader, { LoaderProps } from ".";
import Button from "../button";
import { LOADER_SIZES } from "./loader.config";
import Box from "../box";

export default {
  title: "Deprecated/Loader/Test",
  includeStories: ["Default", "InsideButtons"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    isActive: {
      control: {
        type: "boolean",
      },
    },
    isInsideButton: {
      control: {
        type: "boolean",
      },
    },
    size: {
      options: LOADER_SIZES,
      control: {
        type: "select",
      },
    },
    variant: {
      options: ["default", "gradient"],
      control: {
        type: "select",
      },
    },
    loaderLabel: {
      control: {
        type: "text",
      },
    },
    "aria-label": {
      control: {
        type: "text",
      },
    },
  },
};

export const Default = ({
  isInsideButton,
  size,
  isActive,
  variant,
  ...args
}: LoaderProps) => {
  if (isInsideButton) {
    return (
      <Button buttonType="primary" disabled={!isActive}>
        <Loader
          {...{
            isInsideButton,
            size,
            isActive,
            variant,
            ...args,
          }}
        />
      </Button>
    );
  }
  return <Loader size={size} variant={variant} {...args} />;
};

Default.storyName = "default";
Default.args = {
  size: "medium",
};

export const InsideButtons = () => {
  return (
    <>
      <Button buttonType="primary" aria-label="Loading">
        <Loader isInsideButton />
      </Button>
      <Button ml={2} buttonType="primary" destructive aria-label="Loading">
        <Loader isInsideButton />
      </Button>
      <Button ml={2} destructive aria-label="Loading">
        <Loader isInsideButton />
      </Button>
      <Button ml={2} buttonType="tertiary" aria-label="Loading">
        <Loader isInsideButton />
      </Button>
      <Button ml={2} buttonType="secondary" aria-label="Loading">
        <Loader isInsideButton />
      </Button>
      <Box id="dark-background" mt={2} p={2} width="fit-content" bg="#000000">
        <Button m={2} buttonType="darkBackground" aria-label="Loading">
          <Loader isInsideButton />
        </Button>
      </Box>
    </>
  );
};
InsideButtons.storyName = "Inside Buttons";
InsideButtons.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
