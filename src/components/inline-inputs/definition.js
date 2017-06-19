import InlineInputs from './';
import TextboxDefinition from './../textbox/definition';
import DecimalDefinition from './../decimal/definition';
import DropdownFilterAjaxDefintion from './../dropdown-filter-ajax/definition';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('inline-inputs', InlineInputs, {
  description: `Edits a set of closely related inputs that are grouped together.`,
  propTypes: {
    label: "String",
    children: "Node"
  },
  propValues: {
    label: 'Inline Inputs'
  },
  propDescriptions: {
    label: "Label applied to set of inputs",
    children: "Supports all inputs as children"
  },
});

const inputProps = {
  fieldHelp: null,
  label: null,
  labelHelp: null
}

definition.addChildByDefinition(TextboxDefinition, inputProps);
definition.addChildByDefinition(DecimalDefinition, inputProps);
definition.addChildByDefinition(DropdownFilterAjaxDefintion, inputProps);



export default definition;
