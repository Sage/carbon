import Dropdown from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

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

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, DefinitionHelper.inputDecoratorDemoProps());

export default definition;
