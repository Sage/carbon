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
  },
};

export const Default = ({
  isInsideButton,
  size,
  isActive,
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
            ...args,
          }}
        />
      </Button>
    );
  }
  return <Loader size={size} />;
};

Default.storyName = "default";
Default.args = {
  size: "medium",
};

export const LoaderInsideButtonTest = ({ ...props }) => {
  return (
    <Button buttonType="primary" aria-label="Loading">
      <Loader isInsideButton {...props} />
    </Button>
  );
};
