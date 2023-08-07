import React from "react";
import { action } from "@storybook/addon-actions";
import ButtonMinor, { ButtonMinorProps } from "./button-minor.component";
import { ICONS } from "../icon/icon-config";
import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  BUTTON_ICON_POSITIONS,
} from "../button/button.config";

export default {
  title: "Button Minor/Test",
  includeStories: ["DefaultStory"],
  parameters: {
    info: { disable: true },
    chromatic: { disableSnapshot: true },
  },
};
const commonArgTypesButtonMinor = {
  size: {
    options: BUTTON_SIZES,
    control: { type: "select" },
  },
  buttonType: {
    options: BUTTON_VARIANTS,
    control: {
      type: "select",
    },
  },
  iconType: {
    options: [...ICONS, ""],
    control: {
      type: "select",
    },
  },
  iconPosition: {
    options: BUTTON_ICON_POSITIONS,
    control: { type: "select" },
  },
  href: {
    control: {
      type: "text",
    },
  },
};
const commonArgsButtonMinor = {
  size: "medium",
  subtext: "",
  buttonType: "secondary",
  fullWidth: false,
  disabled: false,
  destructive: false,
  noWrap: false,
  href: undefined,
  iconPosition: "before",
};
export const DefaultStory = (props: ButtonMinorProps) => (
  <ButtonMinor onClick={action("click")} {...props}>
    Example Button
  </ButtonMinor>
);
export const Default = (props: ButtonMinorProps) => <ButtonMinor {...props} />;
export const ButtonMinorCustom = (props: ButtonMinorProps) => (
  <ButtonMinor {...props}>Example Button</ButtonMinor>
);
export const ButtonMinorDifferentTypes = (props: ButtonMinorProps) => {
  return (
    <div>
      <ButtonMinor buttonType="primary" {...props}>
        Primary
      </ButtonMinor>
      <ButtonMinor buttonType="secondary" {...props}>
        Secondary
      </ButtonMinor>
      <ButtonMinor buttonType="tertiary" {...props}>
        Tertiary
      </ButtonMinor>
    </div>
  );
};
DefaultStory.story = {
  name: "default",
  args: {
    ...commonArgsButtonMinor,
  },
  argTypes: {
    ...commonArgTypesButtonMinor,
  },
};
