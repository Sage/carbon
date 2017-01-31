import Step from './';

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

definition.demoProps = {
  children: 'test',
  enabled: true,
  extraButtons: [],
  stepNumber: 0
};

export default definition;
