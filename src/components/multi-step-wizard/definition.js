import React from 'react';
import { _ } from 'lodash';
import MultiStepWizard from './';
import stepDefinition from './step/definition';

let i,
    steps = [];

for (i = 1; i < 2; i ++) {
  let stepProps = _.assign({ stepNumber: i }, stepDefinition.demoProps);
  steps[i] = React.createElement(stepDefinition.component, stepProps);
}
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: MultiStepWizard,
  key: 'multi-step-wizard',
  text: {
    bemClass: 'carbon-multi-step-wizard',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'MultiStepWizard',
    type: 'layout'
  },
  defaultProps: MultiStepWizard.defaultProps,
  props: MultiStepWizard.propTypes
};

definition.demoProps = DemoHelper.prepareDemoProps(definition, {
  children: 'test'
});

export default definition;
