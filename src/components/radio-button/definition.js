import RadioButton from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: RadioButton,
  key: 'radio-button',
  text: {
    bemClass: 'carbon-radio-button',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'RadioButton',
    type: 'form'
  },
  defaultProps: RadioButton.defaultProps,
  props: RadioButton.propTypes
};

let demoProps = DefinitionHelper.inputDecoratorDemoProps();

demoProps.inputWidth = '';
demoProps.labelWidth = '';

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, demoProps);

export default definition;
