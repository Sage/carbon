import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import RichTextEditor from "./rich-text-editor.component";

const meta: Meta<typeof RichTextEditor> = {
  title: "Rich Text Editor",
  component: RichTextEditor,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = () => {
  return <RichTextEditor />;
};
Default.storyName = "Default";
