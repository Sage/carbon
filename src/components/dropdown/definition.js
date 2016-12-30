import Dropdown from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Dropdown,
  key: 'dropdown',
  text: {
    bemClass: 'carbon-dropdown',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Dropdown',
    type: 'form'
  },
  defaultProps: Dropdown.defaultProps,
  props: Dropdown.propTypes
};

definition.demoProps = DemoHelper.prepareDemoProps(definition, OptionsHelper.inputDecoratorDemoProps());

export default definition;
