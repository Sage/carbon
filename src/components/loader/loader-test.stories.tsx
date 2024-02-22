import React from "react";
import Loader, { LoaderProps } from ".";
import Button from "../button";
import { LOADER_SIZES } from "./loader.config";

export default {
  title: "Loader/Test",
  includeStories: ["Default"],
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
      options: ["default", "colorful"],
      control: {
        type: "select",
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
  return <Loader size={size} variant={variant} />;
};

Default.storyName = "default";
Default.args = {
  size: "medium",
};
