import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import RichTextEditor from "./rich-text-editor.component";

const meta: Meta<typeof RichTextEditor> = {
  title: "Rich Text Editor",
  component: RichTextEditor,
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = () => {
  return <RichTextEditor label="Rich Text Editor" />;
};
Default.storyName = "Default";

export const Required: Story = () => {
  return <RichTextEditor label="Rich Text Editor" isRequired />;
};
Required.storyName = "Required";

export const Optional: Story = () => {
  return <RichTextEditor label="Rich Text Editor" optional />;
};
Optional.storyName = "Optional";

export const CharacterLimit: Story = () => {
  return <RichTextEditor label="Rich Text Editor" characterLimit={50} />;
};
CharacterLimit.storyName = "With Character Limit";

export const CommandButtons: Story = () => {
  return <RichTextEditor label="Rich Text Editor" showCommandButtons />;
};
CommandButtons.storyName = "With Command Buttons";

export const OnChange: Story = () => {
  const [state, setState] = React.useState<string | undefined>(undefined);
  return (
    <RichTextEditor
      label="Rich Text Editor"
      onChange={setState}
      showCommandButtons
      onSave={() => state && alert(state)}
    />
  );
};
OnChange.storyName = "With onChange Handler";
