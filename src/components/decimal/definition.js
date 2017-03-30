import Decimal from './';
import Definition from './../../../demo/utils/definition';
import OptionsHelper from './../../utils/helpers/options-helper';

let definition = new Definition('decimal', Decimal, {
  hiddenProps: [
    'precision'
  ],
  type: 'form',
  propTypes: {
    align: "String",
    precision: "String || Number"
  },
  propDescriptions: {
    align: "Sets the alignment of the text within the decimal component",
    precision: "Sets the precision of the decimal - only available on page load"
  },
  propOptions: {
    align: OptionsHelper.alignBinary
  }
});

definition.isAnInput();

export default definition;
