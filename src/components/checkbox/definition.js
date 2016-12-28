import Checkbox from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

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

let demoProps = DefinitionHelper.inputDecoratorDemoProps();

demoProps.inputWidth = '';
demoProps.labelWidth = '';

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, demoProps);

export default definition;
