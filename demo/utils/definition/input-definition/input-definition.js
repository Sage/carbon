import ComponentActions from './../../../actions/component';
import OptionsHelper from 'utils/helpers/options-helper';
import { assign } from 'lodash';

export default (definition) => {
  definition.propValues.fieldHelp = 'This text provides help for the input.';
  definition.propValues.label = 'Example ' + definition.name;
  definition.propValues.labelHelp = 'This text provides more information for the label.';

  definition.propOptions.labelAlign = OptionsHelper.alignBinary;

  definition.hiddenProps = definition.hiddenProps.concat(
    ['warnings', 'validations', 'autoFocus', 'name']
  );

  definition.propRequires.labelInline = 'label';
  definition.propRequires.labelWidth = 'labelInline';
  definition.propRequires.labelAlign = 'labelInline';

  definition.stubAction('onChange', 'value');

  definition.propTypes = assign({}, definition.propTypes, {
    autoFocus: "Boolean",
    disabled: "Boolean",
    fieldHelp: "String",
    fieldHelpInline: "Boolean",
    inputWidth: "Number",
    label: "String",
    labelAlign: "String",
    labelHelp: "String",
    labelInline: "Boolean",
    labelWidth: "Number",
    name: "String",
    validations: "Array",
    warnings: "Array"
  });

  definition.propDescriptions = assign({}, definition.propDescriptions, {
    autoFocus: "Automatically focus the input.",
    disabled: "Disable all user interaction.",
    fieldHelp: "Displays additional text below the input to provide help to the user.",
    fieldHelpInline: "Displays fieldHelp inline with the checkbox/radio button.",
    inputWidth: "A number representing the percentage/ratio of width with the label. Works best with inline labels.",
    label: "Outputs a label for the input.",
    labelAlign: "Align the label either 'left' or 'right'. Only works with inline labels.",
    labelHelp: "Output an info icon next to the label to display additional help to the user.",
    labelInline: "Displays the label inline with the input.",
    labelWidth: "A number representing the percentage/ratio of width with the input. Works best with inline labels.",
    name: "Set the name of the corresponding hidden input.",
    validations: "An array of validations to apply to the input.",
    warnings: "An array of warnings to apply to the input."
  });
}
