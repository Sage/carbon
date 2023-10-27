import React, { useState } from "react";
import { ComponentStory, StoryFn } from "@storybook/react";

import GroupedCharacter, { GroupedCharacterProps, CustomEvent } from ".";
import CarbonProvider from "../carbon-provider/carbon-provider.component";

export const DefaultStory = () => {
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

export const Sizes = () => {
  const [state, setState] = useState({
    small: "1231231",
    medium: "1231231",
    large: "1231231",
  });

  const handleChange = (size: "small" | "medium" | "large") => (
    e: CustomEvent
  ) => {
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

export const AutoFocus = () => {
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
      autoFocus
    />
  );
};
AutoFocus.parameters = { chromatic: { disableSnapshot: true } };

export const Disabled = () => {
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
Disabled.args = { disabled: true };

export const LabelInline = () => {
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
LabelInline.parameters = { chromatic: { disableSnapshot: true } };

export const LabelInputWidth = () => {
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
      labelWidth={50}
      inputWidth={50}
    />
  );
};

export const FieldHelp = () => {
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

export const InputHint = () => {
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

export const LabelHelp = () => {
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

export const Required = () => {
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

export const LabelAlign = () => {
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

export const VariousSeparators = () => {
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

export const VariousGroups = () => {
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

export const Validations: StoryFn = (
  args: Partial<GroupedCharacterProps> & { message?: string | boolean }
) => {
  const [state, setState] = useState({
    error: "1231231",
    warning: "1231231",
    info: "1231231",
  });

  const handleChange = (validation: string) => (e: CustomEvent) => {
    setState({ ...state, [validation]: e.target.value.rawValue });
  };

  return (
    <>
      {(["error", "warning", "info"] as const).map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <GroupedCharacter
            label="GroupedCharacter"
            value={state[validationType]}
            onChange={handleChange(validationType)}
            groups={[2, 2, 3]}
            separator="-"
            {...{ [validationType]: args.message }}
            mb={2}
            {...args}
          />
          <GroupedCharacter
            label="GroupedCharacter - readOnly"
            value="1231231"
            groups={[2, 2, 3]}
            separator="-"
            readOnly
            {...{ [validationType]: args.message }}
            mb={2}
            {...args}
          />
        </div>
      ))}
    </>
  );
};

export const ValidationsStringComponent = Validations.bind({});
ValidationsStringComponent.args = {
  message: "Message",
};

export const ValidationsStringLabel = Validations.bind({});
ValidationsStringLabel.args = {
  message: "Message",
  validationOnLabel: true,
};

export const ValidationsBoolean = Validations.bind({});
ValidationsBoolean.args = {
  message: true,
};

export const ValidationsRedesign = () => {
  const [state, setState] = useState({
    error: "1231231",
    warning: "1231231",
  });

  const handleChange = (validation: string) => (e: CustomEvent) => {
    setState({ ...state, [validation]: e.target.value.rawValue });
  };

  return (
    <CarbonProvider validationRedesignOptIn>
      {(["error", "warning"] as const).map((validationType) =>
        (["small", "medium", "large"] as const).map((size) => (
          <div
            style={{ width: "296px" }}
            key={`${size}-${validationType}-string-component`}
          >
            <GroupedCharacter
              label={`${size} - ${validationType}`}
              value={state[validationType]}
              onChange={handleChange(validationType)}
              groups={[2, 2, 3]}
              size={size}
              separator="-"
              {...{ [validationType]: "Message" }}
              m={4}
            />
            <GroupedCharacter
              label={`readOnly - ${size} - ${validationType}`}
              value="1231231"
              groups={[2, 2, 3]}
              size={size}
              separator="-"
              readOnly
              {...{ [validationType]: "Message" }}
              m={4}
            />
          </div>
        ))
      )}
    </CarbonProvider>
  );
};

export const ValidationsTooltip: ComponentStory<typeof GroupedCharacter> = (
  args
) => {
  const [state, setState] = useState({
    error: "1231231",
    warning: "1231231",
    info: "1231231",
  });

  const handleChange = (validation: string) => (e: CustomEvent) => {
    setState({ ...state, [validation]: e.target.value.rawValue });
  };

  return (
    <>
      {(["error", "warning", "info"] as const).map((validationType) => (
        <div key={`${validationType}-string-label`}>
          <GroupedCharacter
            label="GroupedCharacter"
            value={state[validationType]}
            onChange={handleChange(validationType)}
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="bottom"
            {...args}
            groups={[2, 2, 3]}
            separator="-"
          />
        </div>
      ))}
    </>
  );
};
ValidationsTooltip.parameters = { chromatic: { disableSnapshot: true } };

export const ValidationsTooltipLabel = ValidationsTooltip.bind({});
ValidationsTooltipLabel.args = { validationOnLabel: true };
ValidationsTooltipLabel.parameters = { chromatic: { disableSnapshot: true } };
