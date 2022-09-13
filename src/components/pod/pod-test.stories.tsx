import React from "react";
import { ComponentMeta } from "@storybook/react";

import specialCharacters from "../../__internal__/utils/argTypes/specialCharacters";
import Pod, { PodProps } from "./pod.component";
import { POD_ALIGNMENTS, POD_SIZES, POD_VARIANTS } from "./pod.config";

export default {
  component: Pod,
  title: "Pod/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
    controls: {
      sort: "alpha",
      exclude: ["data-component", "data-element", "data-role", "className"],
    },
  },
  argTypes: {
    size: {
      options: POD_SIZES,
      control: {
        type: "select",
      },
    },
    alignTitle: {
      options: POD_ALIGNMENTS,
      control: {
        type: "select",
      },
    },
    variant: {
      options: POD_VARIANTS,
      control: {
        type: "select",
      },
    },
    children: {
      control: { type: "text" },
    },
    title: {
      control: { type: "text" },
    },
    subtitle: {
      control: { type: "text" },
    },
    footer: {
      control: { type: "text" },
    },
    height: { control: { type: "number", min: 0, max: 300 } },
    childrenSpecialCharacters: specialCharacters,
    titleSpecialCharacters: specialCharacters,
    subtitleSpecialCharacters: specialCharacters,
    footerSpecialCharacters: specialCharacters,
    onEdit: { action: "onEdit", control: false },
    onDelete: { action: "onDelete", control: false },
    onUndo: { action: "onUndo", control: false },
  },
} as ComponentMeta<typeof Pod>;

export const Default = ({
  children,
  childrenSpecialCharacters,
  title,
  titleSpecialCharacters,
  subtitle,
  subtitleSpecialCharacters,
  footer,
  footerSpecialCharacters,
  ...args
}: {
  childrenSpecialCharacters?: string;
  titleSpecialCharacters?: string;
  subtitleSpecialCharacters?: string;
  footerSpecialCharacters?: string;
} & PodProps) => (
  <Pod
    title={title || titleSpecialCharacters}
    subtitle={subtitle || subtitleSpecialCharacters}
    footer={footer || footerSpecialCharacters}
    {...args}
  >
    {children || childrenSpecialCharacters}
  </Pod>
);

Default.storyName = "default";
Default.args = {
  alignTitle: "left",
  border: true,
  size: "medium",
  variant: "primary",
  children: "",
  childrenSpecialCharacters: undefined,
  displayEditButtonOnHover: false,
  editContentFullWidth: false,
  footer: "",
  footerSpecialCharacters: undefined,
  height: undefined,
  internalEditButton: false,
  softDelete: false,
  subtitle: "",
  subtitleSpecialCharacters: undefined,
  title: "",
  titleSpecialCharacters: undefined,
  triggerEditOnContent: false,
};
