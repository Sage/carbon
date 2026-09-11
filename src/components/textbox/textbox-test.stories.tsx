import React, { useState } from "react";
import { action } from "storybook/actions";
import { StoryObj } from "@storybook/react-vite";
import Textbox, { TextboxProps } from ".";
import Box from "../box";
import Link from "../link";
import {
  CommonTextboxArgs,
  commonTextboxArgTypes,
  getCommonTextboxArgs,
  getCommonTextboxArgsWithSpecialCharacters,
} from "./utils";
import useMultiInput from "../../hooks/use-multi-input";

export default {
  title: "Textbox/Test",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Default = (args: CommonTextboxArgs) => {
  const [state, setState] = useState("");
  const setValue = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState(value);
  };
  return (
    <div>
      <Textbox
        m={2}
        onClick={action("onClick")}
        iconOnClick={action("iconOnClick")}
        value={state}
        onChange={setValue}
        {...getCommonTextboxArgsWithSpecialCharacters(args)}
      />
    </div>
  );
};
Default.storyName = "Default";
Default.argTypes = commonTextboxArgTypes();
Default.args = getCommonTextboxArgs();

export const Validation = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Box display="flex" mb={2} justifyContent="space-evenly">
        <Box display="flex" flexDirection="column" mb={1}>
          <Textbox
            name="textbox small error above"
            label="Textbox small error above"
            inputHint="Hint text"
            size="small"
            error="Error message"
            value={state["textbox small error above"] || ""}
            onChange={setValue}
            mb={1}
          />
          <Textbox
            name="textbox small warning above"
            label="Textbox small warning above"
            inputHint="Hint text"
            size="small"
            warning="Warning message"
            value={state["textbox small warning above"] || ""}
            onChange={setValue}
            mb={1}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
          mb={2}
        >
          <Textbox
            name="textbox medium error above"
            label="Textbox medium error above"
            inputHint="Hint text"
            size="medium"
            error="Error message"
            value={state["textbox medium error above"] || ""}
            onChange={setValue}
            mb={1}
          />
          <Textbox
            name="textbox medium warning above"
            label="Textbox medium warning above"
            inputHint="Hint text"
            size="medium"
            warning="Warning message"
            value={state["textbox medium warning above"] || ""}
            onChange={setValue}
            mb={1}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
          mb={2}
        >
          <Textbox
            name="textbox large error above"
            label="Textbox large error above"
            inputHint="Hint text"
            size="large"
            error="Error message"
            value={state["textbox large error above"] || ""}
            onChange={setValue}
            mb={1}
          />
          <Textbox
            name="textbox large warning above"
            label="Textbox large warning above"
            inputHint="Hint text"
            size="large"
            warning="Warning message"
            value={state["textbox large warning above"] || ""}
            onChange={setValue}
            mb={1}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-evenly">
        <Box display="flex" flexDirection="column" mb={1}>
          <Textbox
            name="textbox small error below"
            validationMessagePositionTop={false}
            inputHint="Hint text"
            size="small"
            label="Textbox small error below"
            error="Error message"
            value={state["textbox small error below"] || ""}
            onChange={setValue}
            mb={1}
          />
          <Textbox
            name="textbox small warning below"
            validationMessagePositionTop={false}
            inputHint="Hint text"
            size="small"
            label="Textbox small warning below"
            warning="Warning message"
            value={state["textbox small warning below"] || ""}
            onChange={setValue}
            mb={1}
          />
        </Box>
        <Box display="flex" flexDirection="column" mb={1}>
          <Textbox
            name="textbox medium error below"
            validationMessagePositionTop={false}
            inputHint="Hint text"
            size="medium"
            label="Textbox medium error below"
            error="Error message"
            value={state["textbox medium error below"] || ""}
            onChange={setValue}
            mb={1}
          />
          <Textbox
            name="textbox medium warning below"
            validationMessagePositionTop={false}
            inputHint="Hint text"
            size="medium"
            label="Textbox medium warning below"
            warning="Warning message"
            value={state["textbox medium warning below"] || ""}
            onChange={setValue}
            mb={1}
          />
        </Box>
        <Box display="flex" flexDirection="column" mb={1}>
          <Textbox
            name="textbox large error below"
            validationMessagePositionTop={false}
            inputHint="Hint text"
            size="large"
            label="Textbox large error below"
            error="Error message"
            value={state["textbox large error below"] || ""}
            onChange={setValue}
            mb={1}
          />
          <Textbox
            name="textbox large warning below"
            validationMessagePositionTop={false}
            inputHint="Hint text"
            size="large"
            label="Textbox large warning below"
            warning="Warning message"
            value={state["textbox large warning below"] || ""}
            onChange={setValue}
            mb={1}
          />
        </Box>
      </Box>
    </>
  );
};
Validation.storyName = "Validation";

export const PrefixWithSizes = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      {["small", "medium", "large"].map((size) => (
        <Textbox
          key={`Textbox - ${size}`}
          label={`Textbox - ${size}`}
          value={state[size] || ""}
          onChange={setValue}
          prefix="prefix"
          name={size}
          size={size as TextboxProps["size"]}
          mb={2}
          placeholder="Textbox"
        />
      ))}
    </>
  );
};
PrefixWithSizes.storyName = "Prefix with sizes";

export const AutoFocus = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Box>
      <Textbox label="Textbox" value={state} onChange={setValue} autoFocus />
    </Box>
  );
};
AutoFocus.storyName = "Auto Focus";

export const FormFieldRelativePosition = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Box
      flexGrow={1}
      maxWidth="100%"
      display="flex"
      flexDirection="column"
      height="calc(100vh - 40px)"
    >
      <Box overflowY="auto" flexGrow={1}>
        <Box p="40px" overflow="auto">
          <Link href="#Textbox">Test Link</Link>
          <Box height={1000} />
          <Textbox
            value={state}
            onChange={setValue}
            characterLimit={2000}
            id="Textbox"
            label={"Textbox"}
          />
        </Box>
      </Box>
    </Box>
  );
};
FormFieldRelativePosition.storyName = "Form Field Relative Position";

type Story = StoryObj<typeof Textbox>;

// Documentation regression stories moved from the public docs.

export const DocumentationDefault: Story = () => {
  const [state, setState] = useState("");

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox
      label="Textbox"
      value={state}
      onChange={setValue}
      placeholder="Textbox"
    />
  );
};
DocumentationDefault.storyName = "DocumentationDefault";

export const CharacterCounter: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox
      label="Textbox"
      inputHint="Hint text (optional)."
      value={state}
      onChange={setValue}
      characterLimit={10}
    />
  );
};
CharacterCounter.storyName = "Character Counter";

export const Prefix: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox
      label="Textbox"
      value={state}
      onChange={setValue}
      prefix="prefix"
    />
  );
};
Prefix.storyName = "Prefix";

export const Sizes: Story = () => {
  const [smallState, setSmallState] = useState("");
  const [mediumState, setMediumState] = useState("");
  const [largeState, setLargeState] = useState("");
  const setValue = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    size: string,
  ) => {
    if (size === "small") setSmallState(target.value);
    else if (size === "medium") setMediumState(target.value);
    else if (size === "large") setLargeState(target.value);
  };
  return (
    <Box>
      <Textbox
        key={`Textbox - small`}
        label={`Textbox - small`}
        value={smallState}
        size={"small"}
        mb={2}
        onChange={(e) => setValue(e, "small")}
        placeholder="Textbox"
      />

      <Textbox
        key={`Textbox - medium`}
        label={`Textbox - medium`}
        value={mediumState}
        size={"medium"}
        mb={2}
        onChange={(e) => setValue(e, "medium")}
        placeholder="Textbox"
      />

      <Textbox
        key={`Textbox - large`}
        label={`Textbox - large`}
        value={largeState}
        size={"large"}
        mb={2}
        onChange={(e) => setValue(e, "large")}
        placeholder="Textbox"
      />
    </Box>
  );
};
Sizes.storyName = "Sizes";

export const Margins: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Textbox label="Textbox" value={state} onChange={setValue} m={4} />;
};
Margins.storyName = "Margins";

export const Disabled: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox
      inputIcon="calendar"
      label="Textbox"
      disabled
      value={state}
      onChange={setValue}
    />
  );
};
Disabled.storyName = "Disabled";

export const ReadOnly: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox
      label="Textbox"
      readOnly
      value={state}
      onChange={setValue}
      placeholder="Textbox"
    />
  );
};
ReadOnly.storyName = "Read Only";

export const WithLabelInline: Story = () => {
  const [state, setState] = useState("");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox
      label="Textbox"
      labelInline
      value={state}
      onChange={setValue}
      placeholder="Textbox"
    />
  );
};
WithLabelInline.storyName = "With Label Inline";

export const WithCustomLabelWidthAndInputWidth: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Textbox
      label="Textbox"
      value={state}
      onChange={setValue}
      labelInline
      labelWidth={50}
      inputWidth={50}
    />
  );
};
WithCustomLabelWidthAndInputWidth.storyName =
  "With Custom Label Width And Input Width";

export const WithCustomMaxWidth: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Textbox label="Textbox" value={state} onChange={setValue} maxWidth="50%" />
  );
};
WithCustomMaxWidth.storyName = "With Custom Max Width";

export const WithFieldHelp: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Textbox
      label="Textbox"
      value={state}
      onChange={setValue}
      fieldHelp="Help"
    />
  );
};
WithFieldHelp.storyName = "With Field Help";

export const WithInputHint: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Textbox
      label="Textbox"
      value={state}
      onChange={setValue}
      inputHint="Hint text (optional)."
    />
  );
};
WithInputHint.storyName = "With Input Hint";

export const Required: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Textbox label="Textbox" value={state} onChange={setValue} required />;
};
Required.storyName = "Required";

export const IsOptional: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Textbox label="Textbox" value={state} onChange={setValue} />;
};
IsOptional.storyName = "IsOptional";
