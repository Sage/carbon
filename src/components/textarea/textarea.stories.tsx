import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";

import CarbonProvider from "../carbon-provider/carbon-provider.component";

import Textarea from ".";

export const DefaultStory: ComponentStory<typeof Textarea> = () => {
  const [state, setState] = useState("");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Textarea label="Textarea" value={state} onChange={setValue} />;
};

export const DisabledStory: ComponentStory<typeof Textarea> = () => {
  return <Textarea label="Textarea" disabled />;
};

export const LabelAlignStory: ComponentStory<typeof Textarea> = () => {
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

export const ReadOnlyStory: ComponentStory<typeof Textarea> = () => {
  return <Textarea label="Textarea" readOnly />;
};

export const AutoFocusStory: ComponentStory<typeof Textarea> = () => {
  return <Textarea label="Textarea" autoFocus />;
};
AutoFocusStory.parameters = { chromatic: { disable: true } };

export const ExpandableStory: ComponentStory<typeof Textarea> = () => {
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
ExpandableStory.parameters = { chromatic: { disable: true } };

export const CharacterLimitStory: ComponentStory<typeof Textarea> = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      expandable
      value={value}
      onChange={({ target }) => setValue(target.value)}
      characterLimit="50"
    />
  );
};

export const UnenforcedCharacterLimitStory: ComponentStory<
  typeof Textarea
> = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      expandable
      value={value}
      onChange={({ target }) => setValue(target.value)}
      characterLimit="50"
      enforceCharacterLimit={false}
      warnOverLimit
    />
  );
};
UnenforcedCharacterLimitStory.parameters = { chromatic: { disable: true } };

export const LabelInlineStory: ComponentStory<typeof Textarea> = () => {
  return <Textarea label="Textarea" labelInline />;
};

export const CustomWidthStory: ComponentStory<typeof Textarea> = () => {
  return (
    <Textarea label="Textarea" labelInline labelWidth={50} inputWidth={50} />
  );
};

export const FieldHelpStory: ComponentStory<typeof Textarea> = () => {
  return <Textarea label="Textarea" fieldHelp="Help" />;
};

export const LabelHelpStory: ComponentStory<typeof Textarea> = () => {
  return <Textarea label="Textarea" labelHelp="Help" helpAriaLabel="Help" />;
};

export const RequiredStory: ComponentStory<typeof Textarea> = () => {
  return <Textarea label="Textarea" required />;
};

export const ValidationStringStory: ComponentStory<typeof Textarea> = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-string-component`}>
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
        </div>
      ))}
    </>
  );
};

export const ValidationStringPositionStory: ComponentStory<
  typeof Textarea
> = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <Textarea
            label="Textarea"
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="bottom"
          />
        </div>
      ))}
    </>
  );
};
ValidationStringPositionStory.parameters = { chromatic: { disable: true } };

export const ValidationLabelStory: ComponentStory<typeof Textarea> = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-string-label`}>
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
        </div>
      ))}
    </>
  );
};

export const ValidationLabelPositionStory: ComponentStory<
  typeof Textarea
> = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-string-label`}>
          <Textarea
            label="Textarea"
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="top"
          />
        </div>
      ))}
    </>
  );
};
ValidationLabelPositionStory.parameters = { chromatic: { disable: true } };

export const NewDesignValidationStory: ComponentStory<typeof Textarea> = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      {["error", "warning"].map((validationType) => (
        <div
          style={{ width: "296px" }}
          key={`${validationType}-string-component`}
        >
          <Textarea
            label={`${validationType}`}
            {...{ [validationType]: "Message" }}
            m={4}
          />
          <Textarea
            label={`readOnly - ${validationType}`}
            readOnly
            {...{ [validationType]: "Message" }}
            m={4}
          />
        </div>
      ))}
    </CarbonProvider>
  );
};

export const ValidationBooleanStory: ComponentStory<typeof Textarea> = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-boolean-component`}>
          <Textarea label="Textarea" {...{ [validationType]: true }} mb={2} />
          <Textarea
            label="Textarea - readOnly"
            readOnly
            {...{ [validationType]: true }}
            mb={2}
          />
        </div>
      ))}
    </>
  );
};
