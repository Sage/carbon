import DropdownFilter from './';
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
  props: DropdownFilter.propTypes,
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
demoProps.suggest = true;

definition.demoProps = demoProps;

export default definition;
