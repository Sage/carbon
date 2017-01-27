import Dropdown from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import Immutable from 'immutable';
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

let demoProps = OptionsHelper.inputDecoratorDemoProps();
demoProps.cacheVisibleValue = false;
demoProps.options = Immutable.fromJS([
  { 1: 'one' },
  { 2: 'two' }
]);

definition.demoProps = demoProps;

export default definition;
