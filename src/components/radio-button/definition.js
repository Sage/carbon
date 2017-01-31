import RadioButton from './';

import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: RadioButton,
  key: 'radio-button',
  text: {
    bemClass: 'carbon-radio-button',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'RadioButton',
    type: 'form'
  },
  defaultProps: RadioButton.defaultProps,
  props: RadioButton.propTypes,
  propOptions: {
    labelAlign: OptionsHelper.alignBinary()
  }
};

let demoProps = OptionsHelper.inputDecoratorDemoProps();

demoProps.inputWidth = '';
demoProps.labelWidth = '';

definition.demoProps = demoProps;

export default definition;
