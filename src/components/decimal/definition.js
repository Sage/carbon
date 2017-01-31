import Decimal from './';

import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Decimal,
  key: 'decimal',
  text: {
    bemClass: 'carbon-decimal',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Decimal',
    type: 'form'
  },
  props: Decimal.propTypes,
  defaultProps: Decimal.defaultProps,
  propOptions: {
    align: OptionsHelper.alignBinary(),
    labelAlign: OptionsHelper.alignBinary()
  }
};

let demoProps = OptionsHelper.inputDecoratorDemoProps();
demoProps.align = 'right';
demoProps.precision = 2;

definition.demoProps = demoProps;

export default definition;
