import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import NumeralDate, { NumeralDateHandle, NumeralDateProps } from ".";
import Button from "../button/__next__/button.component";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof NumeralDate> = {
  title: "Numeral Date",
  component: NumeralDate,
  parameters: {
    chromatic: { disableSnapshot: true },
    controls: {
      exclude: [
        "adaptiveLabelBreakpoint",
        "enableInternalWarning",
        "fieldHelp",
        "label",
        "labelAlign",
        "fieldLabelsAlign",
        "labelHelp",
        "labelInline",
        "labelWidth",
        "labelSpacing",
        "onBlur",
        "validationOnLabel",
        "tooltipPosition",
        "helpAriaLabel",
        "dayRef",
        "monthRef",
        "yearRef",
        "info",
        "warning",
        "value",
        "onChange",
      ],
    },
  },
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof NumeralDate>;

const ControlledNumeralDate = (
  args: Omit<NumeralDateProps, "value" | "onChange">,
) => {
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });
  return (
    <NumeralDate
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...args}
    />
  );
};

export const Default: Story = {
  render: ControlledNumeralDate,
  args: {
    legend: "Legend",
  },
};
export const WithLegendHint: Story = {
  ...Default,
  args: {
    ...Default.args,
    legendHint: "Legend Hint",
  },
};

export const DateFormats: Story = () => {
  const dateDefault = {
    dd: "",
    mm: "",
    yyyy: "",
  };
  const [value, setValue] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value2, setValue2] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value3, setValue3] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value4, setValue4] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value5, setValue5] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value6, setValue6] = useState<NumeralDateProps["value"]>(dateDefault);

  return (
    <>
      <NumeralDate
        legend="DD/MM/YYYY - default"
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <NumeralDate
        legend="MM/DD/YYYY"
        dateFormat={["mm", "dd", "yyyy"]}
        mb={2}
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
      />
      <NumeralDate
        legend="YYYY/MM/DD"
        dateFormat={["yyyy", "mm", "dd"]}
        mb={2}
        value={value3}
        onChange={(e) => setValue3(e.target.value)}
      />
      <NumeralDate
        legend="DD/MM"
        dateFormat={["dd", "mm"]}
        mb={2}
        value={value4}
        onChange={(e) => setValue4(e.target.value)}
      />
      <NumeralDate
        legend="MM/DD"
        dateFormat={["mm", "dd"]}
        mb={2}
        value={value5}
        onChange={(e) => setValue5(e.target.value)}
      />
      <NumeralDate
        legend="MM/YYYY"
        dateFormat={["mm", "yyyy"]}
        mb={2}
        value={value6}
        onChange={(e) => setValue6(e.target.value)}
      />
    </>
  );
};
DateFormats.storyName = "Date Formats";

export const InternalValidationError: Story = {
  ...Default,
  args: {
    ...Default.args,
    enableInternalError: true,
    value: {
      dd: "01",
      mm: "13",
      yyyy: "1999",
    },
  },
};

export const Size: Story = () => {
  const dateDefault = {
    dd: "",
    mm: "",
    yyyy: "",
  };
  const [value, setValue] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value2, setValue2] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value3, setValue3] = useState<NumeralDateProps["value"]>(dateDefault);

  return (
    <>
      <NumeralDate
        legend="Small"
        size="small"
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <NumeralDate
        legend="Medium"
        size="medium"
        mb={2}
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
      />
      <NumeralDate
        legend="Large"
        size="large"
        value={value3}
        onChange={(e) => setValue3(e.target.value)}
      />
    </>
  );
};
Size.storyName = "Size";

export const Required: Story = {
  ...Default,
  args: {
    ...Default.args,
    required: true,
  },
};

export const ReadOnly: Story = {
  ...Default,
  args: {
    ...Default.args,
    readOnly: true,
  },
};

export const Disabled: Story = {
  ...WithLegendHint,
  args: {
    ...WithLegendHint.args,
    required: true,
    disabled: true,
  },
};

export const ProgrammaticFocus = () => {
  const ref = React.useRef<NumeralDateHandle>(null);
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });

  const handleClick = () => {
    ref.current?.focus();
  };
  return (
    <>
      <Button mb={2} onClick={handleClick}>
        Click me to focus NumeralDate
      </Button>
      <NumeralDate
        ref={ref}
        legend="Numeral date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};
ProgrammaticFocus.storyName = "Programmatic Focus";

export const WithCustomFieldIds: Story = {
  ...Default,
  args: {
    ...Default.args,
    inputIds: {
      day: "date-field-custom-id",
      month: "month-field-custom-id",
      year: "year-field-custom-id",
    },
  },
};
