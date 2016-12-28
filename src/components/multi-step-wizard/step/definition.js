import Step from './';
import DefinitionHelper from '../../../utils/helpers/definition-helper';

let definition = {
  component: Step,
  key: 'step',
  text: {
    bemClass: 'carbon-step',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Step',
    type: 'layout'
  },
  defaultProps: Step.defaultProps,
  props: Step.propTypes
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
