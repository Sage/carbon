import DateRate from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('date-range', DateRate, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  hiddenProps: ["value", "startDateProps", "endDateProps"],
  propTypes: {
    onChange: "Function",
    value: "Array",
    startLabel: "String",
    endLabel: "String",
    startMessage: "String",
    endMessage: "String",
    labelsInline: "Boolean",
    startDateProps: "Object",
    endDateProps: "Object"
  },
  propDescriptions: {
    onChange: "Callback for when either of the inputs value has changed. The event will be triggered with an of 2 values.",
    value: "The value should be provided as an array of 2 values.",
    startLabel: "Provide a label for the start date input.",
    endLabel: "Provide a label for the end date input.",
    startMessage: "Provide a custom error message for the start date.",
    endMessage: "Provide a custom error message for the start date.",
    labelsInline: "Display both inputs with inline labels.",
    startDateProps: "Supply an object of additional props for the start date.",
    endDateProps: "Supply an object of additional props for the end date."
  },
  propValues: {
    value: '["2016-10-01","2016-10-30"]'
  }
});

definition.stubAction('onChange', 'value');

export default definition;
