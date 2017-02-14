import DateInput from './';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('date-input', DateInput, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
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
