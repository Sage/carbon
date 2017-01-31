import Dropdown from './';
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
  props: Dropdown.propTypes,
  propOptions: {
    labelAlign: OptionsHelper.alignBinary()
  }
};

let demoProps = OptionsHelper.inputDecoratorDemoProps();
demoProps.cacheVisibleValue = false;
demoProps.options = {
  immutable: true,
  value: [
    { id: 1, name: 'one' },
    { id: 2, name: 'two' }
  ]
};

definition.demoProps = demoProps;

export default definition;
