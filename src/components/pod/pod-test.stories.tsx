import React from "react";
import Pod, { PodProps } from "./pod.component";
import { POD_ALIGNMENTS, POD_SIZES, POD_VARIANTS } from "./pod.config";

export default {
  title: "Deprecated/Pod/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
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
    onEdit: { action: "onEdit", control: false },
    onDelete: { action: "onDelete", control: false },
    onUndo: { action: "onUndo", control: false },
  },
};

export const Default = ({ children, ...args }: PodProps) => (
  <Pod {...args}>{children}</Pod>
);

Default.storyName = "default";
Default.args = {
  children: "",
  title: "",
  subtitle: "",
  footer: "",
  alignTitle: "left",
  border: true,
  size: "medium",
  variant: "primary",
  displayEditButtonOnHover: false,
  editContentFullWidth: false,
  height: undefined,
  internalEditButton: false,
  softDelete: false,
  triggerEditOnContent: false,
};
