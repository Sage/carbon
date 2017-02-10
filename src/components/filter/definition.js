import Filter from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';
import textboxDefinition from './../textbox/definition';

let definition = new Definition('filter', Filter, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
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
