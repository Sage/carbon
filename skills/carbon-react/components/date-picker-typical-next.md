---
name: carbon-component-date-picker-typical-next
description: Carbon DatePickerTypicalNext component props and usage examples.
---

# DatePickerTypicalNext

## Import
`import { DatePickerTypical } from "carbon-react/lib/components/date/__next__";`

## Source
- Export: `./components/date/__next__`
- Props interface: `DatePickerTypicalProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| inputElement | React.RefObject<HTMLElement> | Yes |  |  |  | Element that the DatePicker will be displayed under |  |
| setOpen | (isOpen: boolean) => void | Yes |  |  |  | Sets the picker open state |  |
| ariaLabel | string \| undefined | No |  |  |  | Prop to specify the aria-label attribute of the date picker |  |
| ariaLabelledBy | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby attribute of the date picker |  |
| maxDate | string \| undefined | No |  |  |  | Maximum possible date YYYY-MM-DD |  |
| minDate | string \| undefined | No |  |  |  | Minimum possible date YYYY-MM-DD |  |
| onDayClick | ((date: Date, ev: React.MouseEvent<HTMLDivElement>) => void) \| undefined | No |  |  |  | Callback triggered when a Day is clicked |  |
| onMonthYearChange | ((date: Date, ev: React.ChangeEvent<HTMLSelectElement>) => void) \| undefined | No |  |  |  | Callback triggered when month or year selectors update the selected date |  |
| onPickerClose | (() => void) \| undefined | No |  |  |  | Callback triggered when the picker is closed |  |
| open | boolean \| undefined | No |  |  |  | Sets whether the picker should be displayed |  |
| pickerId | string \| undefined | No |  |  |  | Id for the date picker container element |  |
| pickerMouseDown | (() => void) \| undefined | No |  |  |  | Callback to handle mousedown event on picker container |  |
| pickerProps | PickerProps \| undefined | No |  |  |  | Pass any props that match the DayPickerProps interface to override default behaviors See [DayPickerProps](https://daypicker.dev/api/type-aliases/DayPickerProps) for a full list of available props |  |
| pickerTabGuardId | string \| undefined | No |  |  |  | Id passed to tab guard element |  |
| selectedDays | Date \| undefined | No |  |  |  | Currently selected date |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  |  |  | Size of associated date input | "medium" |
| disablePortal | boolean \| undefined | No |  | Yes | [Legacy] Boolean to toggle where DatePicker is rendered in relation to the Date Input | [Legacy] Boolean to toggle where DatePicker is rendered in relation to the Date Input | true |

## Examples
No Storybook examples found.