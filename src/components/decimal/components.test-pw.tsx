import React, { useState } from "react";

import Decimal, { DecimalProps, CustomEvent } from ".";
import Box from "../box/box.component";
import CarbonProvider from "../carbon-provider/carbon-provider.component";

export const DefaultStory = (
  args: Partial<DecimalProps> & { message?: string | boolean },
) => {
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

export const Disabled = () => <DefaultStory disabled />;

export const Prefix = () => <DefaultStory prefix="£" maxWidth="20%" />;

export const LabelAlign = () => {
  const [state, setState] = useState({
    right: "0.01",
    left: "0.01",
  });
  const handleChange =
    (alignment: DecimalProps["labelAlign"]) => (e: CustomEvent) => {
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

export const ReadOnly = () => <DefaultStory readOnly />;

export const Empty = () => <DefaultStory allowEmptyValue />;

export const WithCustomPrecision = () => {
  const [state, setState] = useState("0.0001");
  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };
  return (
    <Decimal label="Decimal" value={state} onChange={setValue} precision={4} />
  );
};

export const LabelInline = () => <DefaultStory labelInline />;

export const WithCustomLabelWidthAndInputWidth = (
  props: Partial<DecimalProps>,
) => <DefaultStory labelWidth={10} inputWidth={90} labelInline {...props} />;

export const WithCustomMaxWidth = () => <DefaultStory maxWidth="50%" />;

export const WithFieldHelp = (props: Partial<DecimalProps>) => (
  <DefaultStory fieldHelp="Help" {...props} />
);

export const WithLabelHelp = (props: Partial<DecimalProps>) => (
  <DefaultStory labelHelp="Help" helpAriaLabel="Help" {...props} />
);

export const Required = () => <DefaultStory required />;

export const LeftAligned = () => <DefaultStory align="left" />;

type Validation = "error" | "warning" | "info";

export const Validations = (
  args: Partial<DecimalProps> & { message?: string | boolean },
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
            value={state[validationType]}
            onChange={handleChange(validationType)}
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

export const ValidationsStringComponent = () => (
  <DefaultStory message="Message" />
);

export const ValidationsStringLabel = () => (
  <DefaultStory message="Message" validationOnLabel />
);

export const ValidationsBoolean = () => <DefaultStory message />;

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
          <Box width="296px" key={`${size}-${validationType}`}>
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
              value={state[validationType]}
              onChange={handleChange(validationType)}
              size={size}
              readOnly
              {...{ [validationType]: "Message" }}
              m={4}
            />
          </Box>
        )),
      )}
    </CarbonProvider>
  );
};

export const ValidationsTooltip = () => {
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
          />
        </div>
      ))}
    </>
  );
};

export const ValidationsTooltipLabel = () => <DefaultStory validationOnLabel />;
