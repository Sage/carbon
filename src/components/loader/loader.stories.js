import React from "react";
import { select, boolean } from "@storybook/addon-knobs";
import Loader from ".";
import Button from "../button";
import { LOADER_SIZES } from "./loader.config";

export default {
  title: "Design System/Loader/Test",
  component: Loader,
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

export const Default = () => {
  const size = select("size", LOADER_SIZES, Loader.defaultProps.size);
  const isInsideButton = boolean("isInsideButton", false);
  const isActive = isInsideButton
    ? boolean("isActive", Loader.defaultProps.isActive)
    : undefined;

  if (isInsideButton) {
    return (
      <Button buttonType="primary" disabled={!isActive}>
        <Loader
          size={size}
          isInsideButton={isInsideButton}
          isActive={isActive}
        />
      </Button>
    );
  }
  return <Loader size={size} />;
};

Default.story = {
  name: "default",
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
