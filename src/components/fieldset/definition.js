import Fieldset from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';
import textboxDefinition from './../textbox/definition';

let definition = new Definition('fieldset', Fieldset, {
  propTypes: {
    legend: "String"
  },
  propDescriptions: {
    legend: "Adds a legend to the fieldset."
  }
});

definition.addChildByDefinition(textboxDefinition, {
  fieldHelp: null,
  labelHelp: null,
  labelInline: true,
  label: "First Name",
  labelAlign: "right",
});
definition.addChildByDefinition(textboxDefinition, {
  fieldHelp: null,
  labelHelp: null,
  labelInline: true,
  label: "Last Name",
  labelAlign: "right",
});
definition.addChildByDefinition(textboxDefinition, {
  fieldHelp: null,
  labelHelp: null,
  labelInline: true,
  label: "Address",
  labelAlign: "right",
});
definition.addChildByDefinition(textboxDefinition, {
  fieldHelp: null,
  labelHelp: null,
  labelInline: true,
  label: "City",
  labelAlign: "right",
});
definition.addChildByDefinition(textboxDefinition, {
  fieldHelp: null,
  labelHelp: null,
  labelInline: true,
  label: "Country",
  labelAlign: "right",
});
definition.addChildByDefinition(textboxDefinition, {
  fieldHelp: null,
  labelHelp: null,
  labelInline: true,
  label: "Telephone",
  labelAlign: "right",
});

export default definition;
