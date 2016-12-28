import Textbox from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: Textbox,
  key: 'textbox',
  text: {
    bemClass: 'carbon-textbox',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Textbox',
    type: 'form'
  },
  defaultProps: Textbox.defaultProps,
  props: Textbox.propTypes
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, DefinitionHelper.inputDecoratorDemoProps());

export default definition;
