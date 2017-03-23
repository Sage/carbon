import DateInput from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('date-input', DateInput, {
  description: `Allows the user to enter or pick a single calendar date.`,
  designerNotes: `
* If the date is likely to be close to today (e.g. an invoice due date), then a datepicker may be useful. If the date is likely to be far in the past (e.g. a date of birth), then it may be better to use separate inputs for day, month, and year.
* Field focus automatically opens the datepicker, but a user can key in dates too, which many users find more convenient, especially in financial applications.
* Carbon can handle entry of a wide range of date formats and some shorthand formats such as dd/mm/yyyy, dd/mm/yy, dd/mm, or dd - even input of months using words. Configuration can also be regional, and is flexible to cope with separators like space, slash, full stop, or colon. Be sure to show your users date formats and separators that they’re familiar with in their region. For example, the UK uses slash separators, but full stops are standard in Germany.

* __Entering or picking a start and end date together?__ Try Date Range.
 `,
  type: 'form',
  propTypes: {
    minDate: "String",
    maxDate: "String"
  },
  propDescriptions: {
    minDate: "Set a minimum value for date.",
    maxDate: "Set a maximum value for date."
  }
});

definition.isAnInput();

export default definition;
