import React from "react";
import Image from ".";
import { StyledImageProps } from "./image.style";
import pointSvg from "../../../.assets/point.svg";

export default {
  title: "Image/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    m: {
      control: {
        type: "number",
      },
    },
    p: {
      control: {
        type: "number",
      },
    },
    alt: {
      control: {
        type: "text",
      },
    },
    decorative: {
      control: {
        type: "boolean",
      },
    },
    position: {
      options: ["absolute", "fixed", "relative", "static", "sticky"],
      control: {
        type: "select",
      },
    },
    top: {
      control: {
        type: "text",
      },
    },
    right: {
      control: {
        type: "text",
      },
    },
    bottom: {
      control: {
        type: "text",
      },
    },
    left: {
      control: {
        type: "text",
      },
    },
  },
};

export const Default = (args: StyledImageProps) => {
  return <Image src={pointSvg} alt="alt" {...args} />;
};

Default.storyName = "default";
