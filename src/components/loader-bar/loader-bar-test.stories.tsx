import React from "react";
import LoaderBar, { LoaderBarProps } from ".";
import { LOADER_BAR_SIZES } from "./loader-bar.config";

export default {
  title: "Loader Bar/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    size: {
      options: LOADER_BAR_SIZES,
      control: {
        type: "select",
      },
    },
  },
};

export const Default = ({ size, ...args }: LoaderBarProps) => {
  return <LoaderBar size={size} {...args} />;
};
