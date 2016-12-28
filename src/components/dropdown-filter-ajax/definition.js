import DropdownFilterAjax from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: DropdownFilterAjax,
  key: 'dropdown-filter-ajax',
  text: {
    bemClass: 'carbon-dropdown-filter-ajax',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'DropdownFilterAjax',
    type: 'form'
  },
  defaultProps: DropdownFilterAjax.defaultProps,
  props: DropdownFilterAjax.propTypes
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, DefinitionHelper.inputDecoratorDemoProps());

export default definition;
