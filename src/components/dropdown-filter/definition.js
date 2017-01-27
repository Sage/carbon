import DropdownFilter from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import Immutable from 'immutable';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: DropdownFilter,
  key: 'dropdown-filter',
  text: {
    bemClass: 'carbon-dropdown-filter',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'DropdownFilter',
    type: 'form'
  },
  defaultProps: DropdownFilter.defaultProps,
  props: DropdownFilter.propTypes
};

let demoProps = OptionsHelper.inputDecoratorDemoProps();
demoProps.cacheVisibleValue = false;
demoProps.options = Immutable.fromJS([
  { 1: 'one' },
  { 2: 'two' }
]);
demoProps.suggest = true;

definition.demoProps = demoProps;

export default definition;
