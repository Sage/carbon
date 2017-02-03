import ComponentActions from './../../../actions/component';
import OptionsHelper from 'utils/helpers/options-helper';

export default (definition) => {
  definition.propValues.fieldHelp = 'This text provides help for the input.';
  definition.propValues.label = 'Example ' + definition.name;
  definition.propValues.labelHelp = 'This text provides more information for the label.';

  definition.propOptions.labelAlign = OptionsHelper.alignBinary();

  definition.hiddenProps = definition.hiddenProps.concat(['warnings', 'validations']);

  definition.propRequires.labelInline = 'label';
  definition.propRequires.labelWidth = 'labelInline';
  definition.propRequires.labelAlign = 'labelInline';

  definition.stubAction('onChange', 'value');
}
