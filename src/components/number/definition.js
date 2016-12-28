import NumberComponent from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: NumberComponent,
  key: 'number',
  text: {
    bemClass: 'carbon-number',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'NumberComponent',
    type: 'form'
  },
  defaultProps: NumberComponent.defaultProps,
  props: NumberComponent.propTypes
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, DefinitionHelper.inputDecoratorDemoProps());

export default definition;
