import Step from './';
import DemoHelper from '../../../utils/helpers/demo-helper';

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

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: 'test',
  enabled: true,
  extraButtons: [],
  stepNumber: 0
});

export default definition;
