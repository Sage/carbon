import React from "react";
import { ComponentMeta } from "@storybook/react";

import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Box from "../box";
import Number, { NumberProps } from "./number.component";
import { commonTextboxArgTypes } from "../textbox/textbox-test.stories";

export default {
  title: "Number Input/Test",
  parameters: {
    info: { disable: true },
  },
  argTypes: {
    deferTimeout: {
      control: {
        type: "number",
      },
    },
    ...commonTextboxArgTypes(),
  },
} as ComponentMeta<typeof Number>;

export const StringValidation = () => (
  <>
    {["error", "warning", "info"].map((validationType) => (
      <React.Fragment key={`${validationType}-string-component`}>
        <Number
          label="Number"
          value="123456"
          {...{ [validationType]: "Message" }}
          mb={2}
        />
        <Number
          label="Number - readOnly"
          value="123456"
          readOnly
          {...{ [validationType]: "Message" }}
          mb={2}
        />
      </React.Fragment>
    ))}
  </>
);

StringValidation.storyName = "string validation";

export const StringValidationWithTooltipPositionOverriden = () => (
  <>
    {["error", "warning", "info"].map((validationType) => (
      <React.Fragment key={`${validationType}-string-component`}>
        <Number
          label="Number"
          value="123456"
          {...{ [validationType]: "Message" }}
          mb={2}
          tooltipPosition="bottom"
        />
      </React.Fragment>
    ))}
  </>
);

StringValidationWithTooltipPositionOverriden.storyName =
  "string validation with tooltipPosition overriden";

export const StringValidationOnLabel = () => (
  <>
    {["error", "warning", "info"].map((validationType) => (
      <React.Fragment key={`${validationType}-string-label`}>
        <Number
          label="Number"
          value="123456"
          validationOnLabel
          {...{ [validationType]: "Message" }}
          mb={2}
        />
        <Number
          label="Number - readOnly"
          value="123456"
          validationOnLabel
          readOnly
          {...{ [validationType]: "Message" }}
          mb={2}
        />
      </React.Fragment>
    ))}
  </>
);

StringValidationOnLabel.storyName = "string validation on label";

export const StringValidationOnLabelWithTooltipPositionOverriden = () => (
  <>
    {["error", "warning", "info"].map((validationType) => (
      <React.Fragment key={`${validationType}-string-label`}>
        <Number
          label="Number"
          value="123456"
          validationOnLabel
          {...{ [validationType]: "Message" }}
          mb={2}
          tooltipPosition="top"
        />
      </React.Fragment>
    ))}
  </>
);

StringValidationOnLabel.storyName =
  "string validation on label with tooltipPosition overriden";

export const BooleanValidation = () => (
  <>
    {["error", "warning", "info"].map((validationType) => (
      <React.Fragment key={`${validationType}-boolean-component`}>
        <Number
          label="Number"
          value="123456"
          {...{ [validationType]: true }}
          mb={2}
        />
        <Number
          label="Number - readOnly"
          value="123456"
          readOnly
          {...{ [validationType]: true }}
          mb={2}
        />
      </React.Fragment>
    ))}
  </>
);

BooleanValidation.storyName = "boolean validation";

export const NewValidation = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      {["error", "warning"].map((validationType) =>
        ["small", "medium", "large"].map((size) => (
          <Box key={`${size}-${validationType}-string-component`} width="296px">
            <Number
              label={`${size} - ${validationType}`}
              value="123456"
              size={size as NumberProps["size"]}
              {...{ [validationType]: "Message" }}
              m={4}
            />
            <Number
              label={`readOnly - ${size} - ${validationType}`}
              value="123456"
              readOnly
              size={size as NumberProps["size"]}
              {...{ [validationType]: "Message" }}
              m={4}
            />
          </Box>
        ))
      )}
    </CarbonProvider>
  );
};

NewValidation.storyName = "new validation";
