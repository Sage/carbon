import Textarea from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Textarea,
  key: 'textarea',
  text: {
    bemClass: 'carbon-textarea',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Textarea',
    type: 'form'
  },
  defaultProps: Textarea.defaultProps,
  props: Textarea.propTypes
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, DefinitionHelper.inputDecoratorDemoProps());

export default definition;
