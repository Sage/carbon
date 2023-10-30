import React, { useState } from "react";
import { ComponentStory, StoryFn } from "@storybook/react";

import Decimal, { DecimalProps, CustomEvent } from ".";
import CarbonProvider from "../carbon-provider/carbon-provider.component";

export const DefaultStory: ComponentStory<typeof Decimal> = (args) => {
  const [state, setState] = useState("0.01");
  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };

  return (
    <Decimal label="Decimal" value={state} onChange={setValue} {...args} />
  );
};

export const Sizes = () => {
  const [state, setState] = useState({
    small: "0.01",
    medium: "0.01",
    large: "0.01",
  });

  const handleChange = (size: DecimalProps["size"]) => (e: CustomEvent) => {
    setState({ ...state, [size || "small"]: e.target.value.rawValue });
  };

  return (["small", "medium", "large"] as const).map((size) => (
    <Decimal
      key={`Decimal - ${size}`}
      label={`Decimal - ${size}`}
      value={state[size]}
      onChange={handleChange(size)}
      size={size}
      mb={2}
    />
  ));
};

export const Disabled = DefaultStory.bind({});
Disabled.args = { disabled: true };

export const Prefix = DefaultStory.bind({});
Prefix.args = { prefix: "£", maxWidth: "20%" };

export const LabelAlign = () => {
  const [state, setState] = useState({
    right: "0.01",
    left: "0.01",
  });
  const handleChange = (alignment: DecimalProps["labelAlign"]) => (
    e: CustomEvent
  ) => {
    setState({ ...state, [alignment || "left"]: e.target.value.rawValue });
  };
  return (["right", "left"] as const).map((alignment) => (
    <Decimal
      label="Decimal"
      labelInline
      inputWidth={50}
      key={alignment}
      labelAlign={alignment}
      value={state[alignment]}
      onChange={handleChange(alignment)}
    />
  ));
};

export const ReadOnly = DefaultStory.bind({});
ReadOnly.args = { readOnly: true };

export const Empty = DefaultStory.bind({});
Empty.args = { allowEmptyValue: true };

export const WithCustomPrecision = () => {
  const [state, setState] = useState("0.0001");
  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };
  return (
    <Decimal label="Decimal" value={state} onChange={setValue} precision={4} />
  );
};

export const LabelInline = DefaultStory.bind({});
LabelInline.args = { labelInline: true };
LabelInline.parameters = { chromatic: { disableSnapshot: true } };

export const WithCustomLabelWidthAndInputWidth = DefaultStory.bind({});
WithCustomLabelWidthAndInputWidth.args = {
  labelWidth: 10,
  inputWidth: 90,
  labelInline: true,
};

export const WithCustomMaxWidth = DefaultStory.bind({});
WithCustomMaxWidth.args = {
  maxWidth: "50%",
};

export const WithFieldHelp = DefaultStory.bind({});
WithFieldHelp.args = { fieldHelp: "Help" };

export const WithLabelHelp = DefaultStory.bind({});
WithLabelHelp.args = {
  labelHelp: "Help",
  helpAriaLabel: "Help",
};

export const WithInputHint = DefaultStory.bind({});
WithInputHint.args = {
  inputHint: "Hint text (optional).",
};

export const Required = DefaultStory.bind({});
Required.args = { required: true };

export const LeftAligned = DefaultStory.bind({});
LeftAligned.args = { align: "left" };

type Validation = "error" | "warning" | "info";

export const Validations: StoryFn = (
  args: Partial<DecimalProps> & { message?: string | boolean }
) => {
  const [state, setState] = useState({
    error: "0.01",
    warning: "0.01",
    info: "0.01",
  });

  const handleChange = (validation: Validation) => (e: CustomEvent) => {
    setState({ ...state, [validation]: e.target.value.rawValue });
  };

  return (
    <>
      {(["error", "warning", "info"] as const).map((validationType) => (
        <div key={`${validationType}`}>
          <Decimal
            label="Decimal"
            value={state[validationType]}
            onChange={handleChange(validationType)}
            {...{ [validationType]: args.message }}
            mb={2}
            {...args}
          />
          <Decimal
            label="Decimal - readOnly"
            value="0.01"
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
    error: "0.01",
    warning: "0.01",
  });
  const handleChange = (validation: Validation) => (e: CustomEvent) => {
    setState({ ...state, [validation]: e.target.value.rawValue });
  };
  return (
    <CarbonProvider validationRedesignOptIn>
      {(["error", "warning"] as const).map((validationType) =>
        (["small", "medium", "large"] as const).map((size) => (
          <div style={{ width: "296px" }} key={`${size}-${validationType}`}>
            <Decimal
              label={`${size} - ${validationType}`}
              value={state[validationType]}
              size={size}
              onChange={handleChange(validationType)}
              {...{ [validationType]: "Message" }}
              m={4}
            />
            <Decimal
              label={`readOnly - ${size} - ${validationType}`}
              value="0.01"
              size={size}
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

export const ValidationsTooltip: ComponentStory<typeof Decimal> = (args) => {
  const [state, setState] = useState({
    error: "0.01",
    warning: "0.01",
    info: "0.01",
  });
  const handleChange = (validation: Validation) => (e: CustomEvent) => {
    setState({ ...state, [validation]: e.target.value.rawValue });
  };
  return (
    <>
      {(["error", "warning", "info"] as const).map((validationType) => (
        <div key={`${validationType}`}>
          <Decimal
            label="Decimal"
            value={state[validationType]}
            onChange={handleChange(validationType)}
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="bottom"
            {...args}
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
