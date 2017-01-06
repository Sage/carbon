import Checkbox from './';

import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Checkbox,
  key: 'checkbox',
  text: {
    bemClass: 'carbon-checkbox',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Checkbox',
    type: 'form'
  },
  defaultProps: Checkbox.defaultProps,
  props: Checkbox.propTypes
};

let demoProps = OptionsHelper.inputDecoratorDemoProps();

demoProps.inputWidth = '';
demoProps.labelWidth = '';
demoProps.defaultChecked = false;
demoProps.reverse = false;

definition.demoProps = demoProps;

export default definition;
