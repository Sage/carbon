import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import Textbox from "../textbox";
import NumeralDate from ".";
import Box from "../box";
import {
  DayMonthDate,
  FullDate,
  NumeralDateEvent,
  NumeralDateProps,
} from "./numeral-date.component";
import CarbonProvider from "../carbon-provider";

export default {
  title: "Numeral Date/Test",
  component: NumeralDate,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
    controls: {
      exclude: [
        "value",
        "defaultValue",
        "onChange",
        "onBlur",
        "dayRef",
        "monthRef",
        "yearRef",
      ],
    },
  },
  argTypes: {
    fieldHelp: {
      control: {
        type: "text",
      },
    },
    labelHelp: {
      control: {
        type: "text",
      },
    },
    error: {
      control: {
        type: "text",
      },
    },
    warning: {
      control: {
        type: "text",
      },
    },
    info: {
      control: {
        type: "text",
      },
    },
  },
};

export const Default = (args: NumeralDateProps) => {
  const [dateValue, setDateValue] = useState<FullDate>({
    dd: "",
    mm: "",
    yyyy: "",
  });
  const handleChange = (event: NumeralDateEvent) => {
    setDateValue(event.target.value as FullDate);
    action("change")(event.target.value);
  };
  const handleBlur = (event: NumeralDateEvent) => {
    action("blur")(event.target.value);
  };
  return (
    <Box mt="120px">
      <NumeralDate
        onChange={handleChange}
        label="Numeral date"
        onBlur={handleBlur}
        value={dateValue}
        name="numeralDate_name"
        id="numeralDate_id"
        {...args}
      />
    </Box>
  );
};

Default.storyName = "default";
Default.args = {
  dateFormat: ["dd", "mm", "yyyy"],
};

export const DefaultWithOtherInputs = (args: NumeralDateProps) => {
  const [dateValue, setDateValue] = useState<FullDate>({
    dd: "",
    mm: "",
    yyyy: "",
  });
  const handleChange = (event: NumeralDateEvent) => {
    setDateValue(event.target.value as FullDate);
    action("change")(event.target.value);
  };
  const handleBlur = (event: NumeralDateEvent) => {
    action("blur")(event.target.value);
  };
  return (
    <Box display="flex" margin="56px 25px">
      <Textbox mr={1} label="Textbox One" />
      <Textbox mr={1} mt={0} label="Textbox Two" />
      <NumeralDate
        mr={1}
        mt={0}
        onChange={handleChange}
        label="Numeral date"
        onBlur={handleBlur}
        value={dateValue}
        name="numeralDate_name"
        id="numeralDate_id"
        {...args}
      />
      <Textbox mr={1} mt={0} label="Textbox Three" />
    </Box>
  );
};

DefaultWithOtherInputs.storyName = "with other inputs";
DefaultWithOtherInputs.args = {
  dateFormat: ["dd", "mm", "yyyy"],
};
DefaultWithOtherInputs.story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export const Validations = (args: NumeralDateProps<DayMonthDate>) => {
  const validationTypes = ["error", "warning", "info"];
  const [dateValue, setDateValue] = useState({ dd: "", mm: "" });
  const handleChange = (event: NumeralDateEvent<DayMonthDate>) => {
    setDateValue({ ...dateValue });
    action("change")(event.target.value);
  };
  const handleBlur = (event: NumeralDateEvent<DayMonthDate>) => {
    action("blur")(event.target.value);
  };
  return (
    <>
      <h4>Validations as string</h4>
      {validationTypes.map((validation) => (
        <NumeralDate<DayMonthDate>
          key={`${validation}-string`}
          onChange={handleChange}
          label="Numeral date"
          {...{ [validation]: "Message" }}
          onBlur={handleBlur}
          value={dateValue}
          name="numeralDate_name"
          id={`numeralDate_id_${validation}-string`}
          {...args}
        />
      ))}
      <h4>Validations as string on label</h4>
      {validationTypes.map((validation) => (
        <NumeralDate
          key={`${validation}-string-on-label`}
          onChange={handleChange}
          label="Numeral date"
          {...{ [validation]: "Message" }}
          onBlur={handleBlur}
          value={dateValue}
          name="numeralDate_name"
          id={`numeralDate_id_${validation}-string-label`}
          validationOnLabel
          {...args}
        />
      ))}
      <h4>Validations as boolean</h4>
      {validationTypes.map((validation) => (
        <NumeralDate
          key={`${validation}-boolean`}
          onChange={handleChange}
          label="Numeral date"
          {...{ [validation]: true }}
          onBlur={handleBlur}
          value={dateValue}
          name="numeralDate_name"
          id={`numeralDate_id_${validation}-boolean`}
          {...args}
        />
      ))}
    </>
  );
};

Validations.storyName = "validations";

export const NewDesignValidations = (args: NumeralDateProps) => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <h4>New designs validation</h4>
      {["error", "warning"].map((validationType) =>
        ["small", "medium", "large"].map((size) => (
          <div style={{ width: "296px" }} key={`${validationType}-${size}`}>
            <NumeralDate
              label={`${size} - ${validationType}`}
              {...{ [validationType]: "Message" }}
              size={size as NumeralDateProps["size"]}
              m={4}
              {...args}
            />
          </div>
        )),
      )}
    </CarbonProvider>
  );
};

NewDesignValidations.storyName = "new design validations";

export const Required = () => {
  return <NumeralDate label="Date of Birth" required />;
};

Required.storyName = "required";

export const TooltipPosition = () => {
  return (
    <>
      <NumeralDate
        dateFormat={["dd", "mm", "yyyy"]}
        error="Tooltip position set to top"
        label="As string"
        tooltipPosition="top"
      />
      <NumeralDate
        dateFormat={["dd", "mm", "yyyy"]}
        error="Tooltip position set to right"
        label="As string - displayed on a label"
        validationOnLabel
        tooltipPosition="right"
      />
    </>
  );
};

TooltipPosition.storyName = "tooltip position";

export const InForm = () => {
  return (
    <form>
      <NumeralDate dateFormat={["dd", "mm", "yyyy"]} label="Label" />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

InForm.storyName = "in form";
