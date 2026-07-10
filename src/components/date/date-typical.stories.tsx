import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import DateInput, { DateChangeEvent, DateInputProps } from "./date.component";
import Box from "../box";
import Typography, { List, ListItem } from "../typography";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof DateInput> = {
  title: "Date Input/Typical",
  component: DateInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Browser compatibility

The Typical date picker's month and year controls use native HTML \`<select>\`
elements. This preserves built-in keyboard navigation, accessibility semantics,
and operating-system fallback behaviour without recreating a select with
JavaScript and ARIA.

Carbon applies the customizable-select experience where the browser supports
\`appearance: base-select\`. Other browsers display a functional native select,
but its opened menu follows the browser and operating-system appearance rather
than full Carbon styling.

| Carbon-supported browser | Picker experience |
| --- | --- |
| Chrome 135+ | Full customizable-select styling |
| Edge 135+ | Full customizable-select styling |
| Safari | Native fallback; customizable select is experimental in Safari 27 beta |
| Firefox | Native fallback; customizable select is not currently supported |

> Browser support reviewed July 2026. Customizable select remains an
> experimental, limited-availability web platform feature. See
> [MDN browser compatibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select).
`,
      },
    },
  },
  argTypes: {
    ...styledSystemProps,
  },
  args: {
    onBlur: action("onBlur"),
    onChange: action("onChange"),
    variant: "typical",
  },
  decorators: (StoryToRender) => (
    <Box minHeight="460px" p={4}>
      <StoryToRender />
    </Box>
  ),
};

export default meta;
type Story = StoryObj<typeof DateInput>;

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const formatStoryDate = (date: Date) =>
  [date.getDate(), date.getMonth() + 1, date.getFullYear()]
    .map((value, index) => (index < 2 ? String(value).padStart(2, "0") : value))
    .join("/");

const todayRangeStartDate = new Date();
todayRangeStartDate.setHours(0, 0, 0, 0);

const todayRangeEndDate = addDays(todayRangeStartDate, 7);
const todayAsEndRangeStartDate = addDays(todayRangeStartDate, -7);
const todayInRangeStartDate = addDays(todayRangeStartDate, -5);
const todayInRangeEndDate = addDays(todayRangeStartDate, 5);

const getVisualRangeModifiers = (startDate: Date, endDate: Date) => ({
  range_start: startDate,
  range_middle: { after: startDate, before: endDate },
  range_end: endDate,
});

interface RangePreviewItemProps {
  label: string;
  value: Date;
  rangeStart: Date;
  rangeEnd: Date;
}

const RangePreviewItem = ({
  label,
  value,
  rangeStart,
  rangeEnd,
}: RangePreviewItemProps) => (
  <Box mb={3}>
    <DateInput
      variant="typical"
      label={label}
      name={label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
      value={formatStoryDate(value)}
      onChange={() => {}}
      pickerProps={{
        modifiers: getVisualRangeModifiers(rangeStart, rangeEnd),
      }}
    />
  </Box>
);

const DateInputTypicalState = (props: Partial<DateInputProps>) => {
  const [state, setState] = useState(props.value || "15/07/2025");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };

  return (
    <DateInput
      {...props}
      variant="typical"
      label="Date"
      name="date-input-typical"
      value={state}
      onChange={setValue}
    />
  );
};

export const Default: Story = () => (
  <DateInputTypicalState required inputHint="E.g. 25/09/2024" />
);
Default.storyName = "Default";
Default.parameters = { chromatic: { disableSnapshot: true } };

export const Sizes: Story = () => {
  const [state, setState] = useState("15/07/2025");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };

  return (
    <>
      {(["small", "medium", "large"] as const).map((size) => (
        <DateInput
          key={`Date - ${size}`}
          variant="typical"
          label={`Date - ${size}`}
          name={`date-input-typical-${size}`}
          value={state}
          onChange={setValue}
          size={size}
          inputHint="E.g. 25/09/2024"
          mb={2}
        />
      ))}
    </>
  );
};
Sizes.storyName = "Sizes";

export const CustomWidth: Story = () => (
  <DateInputTypicalState maxWidth="300px" inputHint="E.g. 25/09/2024" />
);
CustomWidth.storyName = "Custom Width";

export const LabelsetWrapping: Story = () => (
  <Box display="flex" flexDirection="column" alignItems="flex-start">
    <Box mb={4}>
      <DateInputTypicalState
        required
        label="Date of the service agreement completion"
        inputHint="Use the format DD/MM/YYYY and include the exact completion date from the signed service agreement document."
      />
    </Box>
    <Box width="144px">
      <DateInputTypicalState
        required
        label="Date of the service agreement completion"
        inputHint="Use the format DD/MM/YYYY and include the exact completion date from the signed service agreement document."
      />
    </Box>
    <Box mt={4} mb={4}>
      <DateInputTypicalState
        required
        labelInline
        label="Date of the service agreement completion"
        inputHint="Use the format DD/MM/YYYY and include the exact completion date from the signed service agreement document."
      />
    </Box>
    <Box width="144px">
      <DateInputTypicalState
        required
        labelInline
        label="Date"
        inputHint="Use the format DD/MM/YYYY and include the exact completion date from the signed service agreement document."
      />
    </Box>
  </Box>
);
LabelsetWrapping.storyName = "Labelset Wrapping";

export const LabelInlineStates: Story = () => (
  <>
    <DateInputTypicalState
      labelInline
      size="small"
      required
      warning="Caution message (fix is optional)"
      inputHint="Required caution state hint"
      value="15/07/2025"
      mb={3}
    />
    <DateInputTypicalState
      labelInline
      size="medium"
      error="Enter a valid date"
      value="15/07/2025"
      mb={3}
    />
    <DateInputTypicalState
      labelInline
      size="large"
      readOnly
      value="15/07/2025"
      mb={3}
    />
    <DateInputTypicalState
      labelInline
      size="medium"
      disabled
      value="15/07/2025"
    />
  </>
);
LabelInlineStates.storyName = "Date Input state (with inline label)";

export const StateMatrix: Story = () => (
  <>
    <DateInputTypicalState
      warning="Caution message (fix is optional)"
      inputHint="Caution state hint"
      value="15/07/2025"
      mb={4}
    />
    <DateInputTypicalState
      error="Enter a valid date"
      inputHint="Error state hint"
      value="15/07/2025"
      mb={4}
    />
    <DateInputTypicalState
      readOnly
      inputHint="Read only state hint"
      value="15/07/2025"
      mb={4}
    />
    <DateInputTypicalState
      disabled
      inputHint="Disabled state hint"
      value="15/07/2025"
    />
  </>
);
StateMatrix.storyName = "Date Input state (with default label)";

export const Range: Story = () => (
  <>
    <Typography variant="p" mb={1}>
      This story previews range styling only.
    </Typography>
    <List mb={2}>
      <ListItem>
        Changing an input value updates the Date input only; the highlighted
        range is controlled by DateRange, not Date.
      </ListItem>
      <ListItem>
        These examples use fixed visual range modifiers to preview picker
        states.
      </ListItem>
    </List>
    <RangePreviewItem
      label="Today as selected range start"
      value={todayRangeStartDate}
      rangeStart={todayRangeStartDate}
      rangeEnd={todayRangeEndDate}
    />
    <RangePreviewItem
      label="Today as selected range end"
      value={todayRangeStartDate}
      rangeStart={todayAsEndRangeStartDate}
      rangeEnd={todayRangeStartDate}
    />
    <RangePreviewItem
      label="Today as selected range middle"
      value={todayRangeStartDate}
      rangeStart={todayInRangeStartDate}
      rangeEnd={todayInRangeEndDate}
    />
  </>
);
Range.storyName = "Range States";
