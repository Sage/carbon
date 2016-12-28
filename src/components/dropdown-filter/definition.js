import DropdownFilter from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

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

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, DefinitionHelper.inputDecoratorDemoProps());

export default definition;
