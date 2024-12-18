import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import RichTextEditor from ".";

const meta: Meta<typeof RichTextEditor> = {
  title: "Rich Text Editor",
  component: RichTextEditor,
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = () => {
  return <RichTextEditor labelText="Rich Text Editor" />;
};
Default.storyName = "Default";

export const Required: Story = () => {
  return <RichTextEditor labelText="Rich Text Editor" required />;
};
Required.storyName = "Required";

export const Optional: Story = () => {
  return <RichTextEditor labelText="Rich Text Editor" isOptional />;
};
Optional.storyName = "Optional";

export const CharacterLimit: Story = () => {
  return <RichTextEditor labelText="Rich Text Editor" characterLimit={50} />;
};
CharacterLimit.storyName = "With Character Limit";

export const CommandButtons: Story = () => {
  const [state, setState] = React.useState<string | undefined>(undefined);
  return (
    <RichTextEditor
      labelText="Rich Text Editor"
      onCancel={() => alert("Cancelled")}
      onChange={setState}
      onSave={() => state && alert(state)}
    />
  );
};
CommandButtons.storyName = "With Command Buttons";

export const OnChange: Story = () => {
  const [state, setState] = React.useState<string | undefined>(undefined);
  return (
    <>
      <RichTextEditor labelText="Rich Text Editor" onChange={setState} />
      <div>Content: {state || "No content"}</div>
    </>
  );
};
OnChange.storyName = "With onChange Handler";

export const WithError: Story = () => {
  return (
    <RichTextEditor
      labelText="Rich Text Editor"
      error="error"
      characterLimit={100}
    />
  );
};
WithError.storyName = "With Error";

export const WithWarning: Story = () => {
  return (
    <RichTextEditor
      labelText="Rich Text Editor"
      warning="warning"
      characterLimit={100}
    />
  );
};
WithWarning.storyName = "With Warning";

export const OnSave: Story = () => {
  return (
    <RichTextEditor
      labelText="Rich Text Editor"
      onSave={(value) => value && alert(value)}
    />
  );
};
OnSave.storyName = "With onSave Handler";
