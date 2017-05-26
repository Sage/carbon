import DateInput from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('date-input', DateInput, {
  description: `Captures a single date.`,
  designerNotes: `
* If the date is likely to be close to today (e.g. an invoice due date), then a datepicker may be useful. If the date is likely to be far in the past (e.g. a date of birth), then it may be better to use separate inputs for day, month, and year.
* Field focus automatically opens the datepicker, but a user can key in dates too, which many users find more convenient, especially in financial applications.
* Carbon handles a range of formats, like dd/mm/yyyy, dd/mm/yy, dd/mm, or dd. Configuration can be regional, and copes with space, slash, full stop, or colon as separators.
  `,
  relatedComponentsNotes: `
* Entering or picking a start and end date together? [Try Date Range](/components/date-range).
 `,
  type: 'form',
  hiddenProps: ['minDate', 'maxDate'],
  propTypes: {
    autoFocus: "Boolean",
    disabled: "Boolean",
    minDate: "String",
    maxDate: "String",
    onBlur: "Function",
    value: "String"
  },
  propDescriptions: {
    autoFocus: "Automatically focus on component mount.",
    disabled: "Disable all user interaction.",
    minDate: "Set a minimum value for date.",
    maxDate: "Set a maximum value for date.",
    onBlur: "Specify a callback triggered on blur.",
    value: "The selected date."
  }
});

definition.isAnInput();

export default definition;
