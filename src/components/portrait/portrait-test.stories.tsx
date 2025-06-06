import React from "react";
import { action } from "storybook/actions";
import { ICONS } from "../icon/icon-config";
import { PORTRAIT_SHAPES, PORTRAIT_SIZES } from "./portrait.config";
import Portrait, { PortraitProps } from "./portrait.component";

export default {
  title: "Portrait/Test",
  includeStories: ["Default", "CustomColors"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    iconType: {
      options: ICONS,
      control: {
        type: "select",
      },
    },
    size: {
      options: PORTRAIT_SIZES,
      control: {
        type: "select",
      },
    },
    shape: {
      options: PORTRAIT_SHAPES,
      control: {
        type: "select",
      },
    },
    backgroundColor: {
      control: {
        type: "color",
      },
    },
    foregroundColor: {
      control: {
        type: "color",
      },
    },
  },
};

export const Default = ({ alt, ...args }: PortraitProps) => (
  <Portrait onClick={action("click")} alt={alt} {...args} />
);

Default.storyName = "default";
Default.args = {
  alt: "",
  darkBackground: false,
  src: "",
  initials: "",
  iconType: undefined,
  size: "M",
  shape: "circle",
};

export const CustomColors = ({
  backgroundColor,
  foregroundColor,
  ...args
}: PortraitProps) => (
  <Portrait
    onClick={action("click")}
    backgroundColor={backgroundColor}
    foregroundColor={foregroundColor}
    {...args}
  />
);

CustomColors.storyName = "Custom Colors";
CustomColors.args = {
  src: "",
  initials: "",
  iconType: "accessibility_web",
  size: "M",
  shape: "circle",
  backgroundColor: "#000000",
  foregroundColor: "#FFFFFF",
};

export const PortraitDefaultComponent = ({ ...props }) => {
  return <Portrait {...props} />;
};

export const PortraitComponent = ({ ...props }) => {
  return (
    <Portrait
      tooltipMessage="Rebecca Smith"
      tooltipIsVisible
      src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
      {...props}
    />
  );
};
