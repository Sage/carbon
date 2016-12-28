import DateComponent from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

let definition = {
  component: DateComponent,
  key: 'date',
  text: {
    bemClass: 'carbon-date',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'DateComponent',
    type: 'form'
  },
  defaultProps: DateComponent.defaultProps,
  props: DateComponent.propTypes
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, DefinitionHelper.inputDecoratorDemoProps());

export default definition;
