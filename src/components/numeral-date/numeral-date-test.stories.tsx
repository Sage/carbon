import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import NumeralDate, { NumeralDateProps } from ".";
import Box from "../box";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof NumeralDate> = {
  title: "Numeral Date/Test",
  component: NumeralDate,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
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
    dd: "12",
    mm: "12",
    yyyy: "2000",
  });
  return (
    <NumeralDate
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...args}
    />
  );
};

export const Chromatic: Story = {
  render: (args) => (
    <Box display="flex" flexDirection="column" gap={4}>
      <ControlledNumeralDate legend="Legend" {...args} />
      <ControlledNumeralDate
        legend="Legend"
        legendHint="Legend Hint"
        {...args}
      />
      <ControlledNumeralDate legend="Required" required {...args} />
      <ControlledNumeralDate legend="Readonly" readOnly {...args} />
      <ControlledNumeralDate
        legend="Disabled"
        legendHint="Legend Hint"
        required
        disabled
        {...args}
      />
      <ControlledNumeralDate
        legend="Small"
        legendHint="Legend Hint"
        required
        size="small"
        {...args}
      />
      <ControlledNumeralDate
        legend="Medium"
        legendHint="Legend Hint"
        required
        size="medium"
        {...args}
      />
      <ControlledNumeralDate
        legend="Large"
        legendHint="Legend Hint"
        required
        size="large"
        {...args}
      />
      <ControlledNumeralDate
        legend="MM/DD/YYYY"
        dateFormat={["mm", "dd", "yyyy"]}
        {...args}
      />
      <ControlledNumeralDate
        legend="YYYY/MM/DD"
        dateFormat={["yyyy", "mm", "dd"]}
        {...args}
      />
      <ControlledNumeralDate
        legend="DD/MM"
        dateFormat={["dd", "mm"]}
        {...args}
      />
      <ControlledNumeralDate
        legend="MM/DD"
        dateFormat={["mm", "dd"]}
        {...args}
      />
      <ControlledNumeralDate
        legend="MM/YYYY"
        dateFormat={["mm", "yyyy"]}
        {...args}
      />

      <ControlledNumeralDate
        legend="Legend"
        legendHint="Legend Hint"
        error="Error message"
        {...args}
      />
      <ControlledNumeralDate
        legend="Legend"
        legendHint="Legend Hint"
        error="Error message"
        validationMessagePositionTop={false}
        {...args}
      />

      <ControlledNumeralDate
        legend="Legend"
        legendHint="Legend Hint"
        warning="Warning message"
        {...args}
      />
      <ControlledNumeralDate
        legend="Legend"
        legendHint="Legend Hint"
        warning="Warning message"
        validationMessagePositionTop={false}
        {...args}
      />
    </Box>
  ),
};
