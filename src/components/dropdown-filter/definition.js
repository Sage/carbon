import DropdownFilter from './';
import DemoHelper from '../../utils/helpers/demo-helper';
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

definition.demoProps = DemoHelper.prepareDemoProps(definition, OptionsHelper.inputDecoratorDemoProps());

export default definition;
