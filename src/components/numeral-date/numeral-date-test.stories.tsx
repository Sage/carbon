import React, { useState } from "react";
import { action } from "storybook/actions";
import NumeralDate from ".";
import Box from "../box";
import { NumeralDateProps } from "./numeral-date.component";
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
  const [dateValue, setDateValue] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });
  const handleChange: NumeralDateProps["onChange"] = (event) => {
    setDateValue(event.target.value);
    action("change")(event.target.value);
  };
  const handleBlur: NumeralDateProps["onBlur"] = (event) => {
    action("blur")(event.target.value);
  };
  return (
    <Box>
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
Default.storyName = "Default";
Default.args = {
  dateFormat: ["dd", "mm", "yyyy"],
};

export const Validations = (args: NumeralDateProps) => {
  return (
    <>
      <NumeralDate
        label="Numeral date"
        error="Error Message"
        mb={2}
        {...args}
      />
      <NumeralDate
        label="Numeral date"
        warning="Warning Message"
        mb={2}
        {...args}
      />
      <NumeralDate label="Numeral date" info="Info Message" mb={2} {...args} />
      <NumeralDate
        label="Numeral date"
        error="Error Message"
        validationOnLabel
        mb={2}
        {...args}
      />
      <NumeralDate
        label="Numeral date"
        warning="Warning Message"
        validationOnLabel
        mb={2}
        {...args}
      />
      <NumeralDate
        label="Numeral date"
        info="Info Message"
        validationOnLabel
        mb={2}
        {...args}
      />
      <NumeralDate label="Numeral date" error mb={2} {...args} />
      <NumeralDate label="Numeral date" warning mb={2} {...args} />
      <NumeralDate label="Numeral date" info mb={2} {...args} />
    </>
  );
};
Validations.storyName = "Validations";
Validations.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NewValidations = (args: NumeralDateProps) => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <NumeralDate
        label="Numeral date"
        error="Error Message"
        labelHelp="Hint text"
        {...args}
      />
      <NumeralDate label="Numeral date" warning="Warning Message" {...args} />
    </CarbonProvider>
  );
};

NewValidations.storyName = "New validations";
NewValidations.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const InForm = () => {
  return (
    <form>
      <NumeralDate dateFormat={["dd", "mm", "yyyy"]} label="Label" />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

InForm.storyName = "In form";

export const LabelAlign = ({ ...args }) => {
  return (
    <Box ml={2}>
      <CarbonProvider validationRedesignOptIn>
        <NumeralDate
          mb={2}
          label="labelAlign left"
          labelHelp="labelHelp"
          {...args}
        />
        <NumeralDate
          mb={2}
          label="labelAlign right"
          labelHelp="labelHelp"
          labelAlign="right"
          {...args}
        />
      </CarbonProvider>
      <NumeralDate
        mb={2}
        label="labelAlign right and fieldLabelsAlign right"
        labelAlign="right"
        fieldLabelsAlign="right"
        {...args}
      />
      <NumeralDate
        mb={2}
        label="inline labelAlign left"
        labelAlign="left"
        labelInline
        labelWidth={30}
        {...args}
      />
      <NumeralDate
        label="inline labelAlign right"
        labelInline
        labelWidth={30}
        {...args}
      />
    </Box>
  );
};
LabelAlign.storyName = "Label align";
LabelAlign.args = {
  dateFormat: ["dd", "mm", "yyyy"],
};
LabelAlign.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const InlineLabelsSizes = ({ ...args }) => {
  return (
    <Box ml={2}>
      <NumeralDate mb={2} label="inline small" size="small" {...args} />
      <NumeralDate mb={2} label="inline medium" size="medium" {...args} />
      <NumeralDate mb={2} label="inline large" size="large" {...args} />
    </Box>
  );
};

InlineLabelsSizes.storyName = "Inline labels sizes";
InlineLabelsSizes.args = {
  dateFormat: ["dd", "mm", "yyyy"],
  labelInline: true,
};
InlineLabelsSizes.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
