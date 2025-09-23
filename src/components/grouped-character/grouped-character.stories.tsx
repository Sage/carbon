import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import GroupedCharacter, { CustomEvent } from ".";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof GroupedCharacter> = {
  title: "Deprecated/Grouped Character",
  component: GroupedCharacter,
  argTypes: {
    ...styledSystemProps,
  },
  excludeStories: ["Validations"],
};

export default meta;
type Story = StoryObj<typeof GroupedCharacter>;

export const DefaultStory: Story = () => {
  const [state, setState] = useState("1231231");

  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };

  return (
    <GroupedCharacter
      label="GroupedCharacter"
      value={state}
      onChange={setValue}
      groups={[2, 2, 3]}
      separator="-"
    />
  );
};
DefaultStory.storyName = "Default";

export const Sizes: Story = () => {
  const [state, setState] = useState({
    small: "1231231",
    medium: "1231231",
    large: "1231231",
  });

  const handleChange =
    (size: "small" | "medium" | "large") => (e: CustomEvent) => {
      setState({ ...state, [size]: e.target.value.rawValue });
    };

  return (["small", "medium", "large"] as const).map((size) => (
    <GroupedCharacter
      key={`GroupedCharacter - ${size}`}
      label={`GroupedCharacter - ${size}`}
      value={state[size]}
      onChange={handleChange(size)}
      groups={[2, 2, 3]}
      separator="-"
      size={size}
      mb={2}
    />
  ));
};
Sizes.storyName = "Sizes";

export const Disabled: Story = () => {
  const [state, setState] = useState("1231231");

  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };

  return (
    <GroupedCharacter
      label="GroupedCharacter"
      value={state}
      onChange={setValue}
      groups={[2, 2, 3]}
      separator="-"
      disabled
    />
  );
};
Disabled.storyName = "Disabled";
Disabled.args = { disabled: true };

export const LabelInline: Story = () => {
  const [state, setState] = useState("1231231");

  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };

  return (
    <GroupedCharacter
      label="GroupedCharacter"
      value={state}
      onChange={setValue}
      groups={[2, 2, 3]}
      separator="-"
      labelInline
    />
  );
};
LabelInline.storyName = "Label Inline";
LabelInline.parameters = { chromatic: { disableSnapshot: true } };

export const WithCustomMaxWidth: Story = () => {
  const [state, setState] = useState("1231231");
  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };
  return (
    <GroupedCharacter
      label="GroupedCharacter"
      value={state}
      onChange={setValue}
      groups={[2, 2, 3]}
      separator="-"
      maxWidth="50%"
    />
  );
};
WithCustomMaxWidth.storyName = "With Custom Max Width";

export const FieldHelp: Story = () => {
  const [state, setState] = useState("1231231");

  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };

  return (
    <GroupedCharacter
      label="GroupedCharacter"
      value={state}
      onChange={setValue}
      groups={[2, 2, 3]}
      separator="-"
      fieldHelp="Help"
    />
  );
};
FieldHelp.storyName = "Field Help";

export const InputHint: Story = () => {
  const [state, setState] = useState("1231231");

  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };

  return (
    <GroupedCharacter
      label="GroupedCharacter"
      value={state}
      onChange={setValue}
      groups={[2, 2, 3]}
      separator="-"
      inputHint="Hint text (optional)."
    />
  );
};
InputHint.storyName = "Input Hint";

export const LabelHelp: Story = () => {
  const [state, setState] = useState("1231231");

  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };

  return (
    <GroupedCharacter
      label="GroupedCharacter"
      value={state}
      onChange={setValue}
      groups={[2, 2, 3]}
      separator="-"
      labelHelp="Help"
      helpAriaLabel="Help"
    />
  );
};
LabelHelp.storyName = "Label Help";

export const Required: Story = () => {
  const [state, setState] = useState("1231231");

  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };

  return (
    <GroupedCharacter
      label="GroupedCharacter"
      value={state}
      onChange={setValue}
      groups={[2, 2, 3]}
      separator="-"
      required
    />
  );
};
Required.storyName = "Required";

export const LabelAlign: Story = () => {
  const [state, setState] = useState({
    right: "1231231",
    left: "1231231",
  });

  const handleChange = (alignment: string) => (e: CustomEvent) => {
    setState({ ...state, [alignment]: e.target.value.rawValue });
  };

  return (["right", "left"] as const).map((alignment) => (
    <GroupedCharacter
      label="GroupedCharacter"
      value={state[alignment]}
      onChange={handleChange(alignment)}
      groups={[2, 2, 3]}
      separator="-"
      labelInline
      inputWidth={50}
      key={alignment}
      labelAlign={alignment}
    />
  ));
};
LabelAlign.storyName = "Label Align";

export const VariousSeparators: Story = () => {
  const [state, setState] = useState({
    ".": "1231231",
    ",": "1231231",
    ", ": "1231231",
    " ": "1231231",
    "-": "1231231",
    "/": "1231231",
    "|": "1231231",
  });

  const handleChange = (separator: string) => (e: CustomEvent) => {
    setState({ ...state, [separator]: e.target.value.rawValue });
  };

  return ([".", ",", " ", "-", "/", "|"] as const).map((separator) => (
    <GroupedCharacter
      label="GroupedCharacter"
      value={state[separator]}
      onChange={handleChange(separator)}
      groups={[2, 2, 3]}
      separator={separator}
      key={separator}
    />
  ));
};
VariousSeparators.storyName = "Various Separators";

export const VariousGroups: Story = () => {
  const [state, setState] = useState({
    "2-2-3": "1231231",
    "1-2-4": "1231231",
    "3-2-2": "1231231",
    "3-1-3": "1231231",
  });

  const handleChange = (group: string) => (e: CustomEvent) => {
    setState({ ...state, [group]: e.target.value.rawValue });
  };

  return [
    [2, 2, 3],
    [1, 2, 4],
    [3, 2, 2],
    [3, 1, 3],
  ].map((group) => (
    <GroupedCharacter
      label="GroupedCharacter"
      value={state[group.join("-") as keyof typeof state]}
      onChange={handleChange(group.join("-"))}
      groups={group}
      separator="-"
      key={group.join("-")}
    />
  ));
};
VariousGroups.storyName = "Various Groups";
