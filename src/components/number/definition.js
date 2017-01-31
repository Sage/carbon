import NumberComponent from './';

import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: NumberComponent,
  key: 'number',
  text: {
    bemClass: 'carbon-number',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'NumberComponent',
    type: 'form'
  },
  defaultProps: NumberComponent.defaultProps,
  props: NumberComponent.propTypes,
  propOptions: {
    labelAlign: OptionsHelper.alignBinary()
  }
};

definition.demoProps = OptionsHelper.inputDecoratorDemoProps();

export default definition;
