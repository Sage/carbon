import React, { useState } from "react";
import CarbonProvider from "../carbon-provider";
import Textarea, { TextareaProps } from ".";
import Box from "../box";

interface TextareaTestProps extends TextareaProps {
  labelHelp?: string;
}

export const Default = ({
  placeholder,
  label,
  labelHelp,
  characterLimit,
  fieldHelp,
  ...args
}: TextareaTestProps) => {
  const [state, setState] = useState("");
  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState(value);
  };
  return (
    <Textarea
      {...args}
      name="textarea"
      onChange={handleChange}
      value={state}
      placeholder={placeholder}
      label={label}
      labelHelp={labelHelp}
      helpAriaLabel={labelHelp}
      characterLimit={characterLimit}
      fieldHelp={fieldHelp}
    />
  );
};

export const TextareaComponent = (props: Partial<TextareaProps>) => {
  const [state, setState] = React.useState("");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textarea label="Textarea" value={state} onChange={setValue} {...props} />
  );
};

export const InScrollableContainer = () => {
  const [value, setValue] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus in ornare quam viverra orci sagittis eu. Pellentesque nec nam aliquam sem et tortor consequat. Nibh sit amet commodo nulla. Cursus metus aliquam eleifend mi. Mi proin sed libero enim sed faucibus turpis in. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Est lorem ipsum dolor sit amet consectetur. Morbi enim nunc faucibus a pellentesque sit. Ultrices neque ornare aenean euismod elementum nisi quis eleifend quam. Dapibus ultrices in iaculis nunc sed augue lacus viverra. Feugiat vivamus at augue eget arcu dictum varius. Eget velit aliquet sagittis id consectetur purus ut faucibus. Tincidunt arcu non sodales neque sodales. Ipsum faucibus vitae aliquet nec ullamcorper sit. Faucibus a pellentesque sit amet. Amet porttitor eget dolor morbi non. Arcu non odio euismod lacinia at quis risus sed vulputate. Blandit volutpat maecenas volutpat blandit. Purus ut faucibus pulvinar elementum integer enim neque. Viverra mauris in aliquam sem fringilla ut morbi.",
  );
  return (
    <Box
      data-role="scrollable-box"
      overflowY="auto"
      height="300px"
      width="300px"
    >
      <Textarea
        value={value}
        onChange={({ target }) => setValue(target.value)}
        expandable
        rows={5}
        m={2}
      />
    </Box>
  );
};

export const DisabledExample = () => {
  return <Textarea label="Textarea" disabled />;
};

export const LabelAlignExample = () => {
  return (
    <>
      {(["right", "left"] as const).map((alignment) => (
        <Textarea
          label="Textarea"
          labelInline
          inputWidth={50}
          key={alignment}
          labelAlign={alignment}
        />
      ))}
    </>
  );
};

export const ReadOnlyExample = () => {
  return <Textarea label="Textarea" readOnly />;
};

export const AutoFocusExample = () => {
  return <Textarea label="Textarea" autoFocus />;
};

export const ExpandableExample = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      expandable
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};

export const CharacterLimitExample = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      inputHint="Hint text (optional)."
      expandable
      value={value}
      onChange={({ target }) => setValue(target.value)}
      characterLimit={50}
    />
  );
};

export const CharacterLimitExampleWithButton = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <Textarea
        label="Textarea"
        inputHint="Hint text (optional)."
        expandable
        value={value}
        onChange={({ target }) => setValue(target.value)}
        characterLimit={50}
      />
      <button type="button" onClick={() => {}}>
        Click Me
      </button>
    </>
  );
};

export const LabelInlineExample = () => {
  return <Textarea label="Textarea" labelInline />;
};

export const CustomWidthExample = () => {
  return (
    <Textarea label="Textarea" labelInline labelWidth={50} inputWidth={50} />
  );
};

export const FieldHelpExample = () => {
  return <Textarea label="Textarea" fieldHelp="Help" />;
};

export const MaxWidthExample = () => {
  return <Textarea label="Textarea" maxWidth="70%" />;
};

export const InputHintExample = () => {
  return <Textarea label="Textarea" inputHint="Hint text (optional)." />;
};

export const LabelHelpExample = () => {
  return <Textarea label="Textarea" labelHelp="Help" helpAriaLabel="Help" />;
};

export const RequiredExample = () => {
  return <Textarea label="Textarea" required />;
};

export const ValidationStringExample = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <Box key={`${validationType}-string-component`}>
          <Textarea
            label="Textarea"
            {...{ [validationType]: "Message" }}
            mb={2}
          />
          <Textarea
            label="Textarea - readOnly"
            readOnly
            {...{ [validationType]: "Message" }}
            mb={2}
          />
        </Box>
      ))}
    </>
  );
};

export const ValidationStringPositionExample = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <Box key={`${validationType}-string-component`}>
          <Textarea
            label="Textarea"
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="bottom"
          />
        </Box>
      ))}
    </>
  );
};

export const ValidationLabelExample = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <Box key={`${validationType}-string-label`}>
          <Textarea
            label="Textarea"
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
          />
          <Textarea
            label="Textarea - readOnly"
            validationOnLabel
            readOnly
            {...{ [validationType]: "Message" }}
            mb={2}
          />
        </Box>
      ))}
    </>
  );
};

export const ValidationLabelPositionExample = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <Box key={`${validationType}-string-label`}>
          <Textarea
            label="Textarea"
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="top"
          />
        </Box>
      ))}
    </>
  );
};

export const NewDesignValidationExample = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      {["error", "warning"].map((validationType) => (
        <Box width={296} key={`${validationType}-string-component`}>
          <Textarea
            label={`${validationType}`}
            inputHint="Hint text (optional)."
            {...{ [validationType]: "Message" }}
            m={4}
          />
          <Textarea
            label={`readOnly - ${validationType}`}
            inputHint="Hint text (optional)."
            readOnly
            {...{ [validationType]: "Message" }}
            m={4}
          />
        </Box>
      ))}
    </CarbonProvider>
  );
};

export const ValidationBooleanExample = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <Box key={`${validationType}-boolean-component`}>
          <Textarea label="Textarea" {...{ [validationType]: true }} mb={2} />
          <Textarea
            label="Textarea - readOnly"
            readOnly
            {...{ [validationType]: true }}
            mb={2}
          />
        </Box>
      ))}
    </>
  );
};
