import Filter from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';
import textboxDefinition from './../textbox/definition';

let definition = new Definition('filter', Filter, {
  propOptions: {
    align: OptionsHelper.alignBinary
  },
  propTypes: {
    align: "String"
  },
  propDescriptions: {
    align: "Align the inputs within the filter."
  }
});

definition.addChildByDefinition(textboxDefinition, {
  fieldHelp: null,
  labelHelp: null
});

definition.addChildByDefinition(textboxDefinition, {
  fieldHelp: null,
  labelHelp: null
});

definition.addChildByDefinition(textboxDefinition, {
  fieldHelp: null,
  labelHelp: null
});

export default definition;
