import DateInput from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('date-input', DateInput, {
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
