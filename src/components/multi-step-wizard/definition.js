import React from 'react';

import MultiStepWizard from './';
import stepDefinition from './step/definition';

import { _ } from 'lodash';

let i,
    steps = [];

for (let i = 1; i < 2; i ++) {
  let stepProps = _.assign({ stepNumber: i }, stepDefinition.demoProps);
  steps[i] = React.createElement(stepDefinition.component, stepProps);
}

let definition = {
  component: MultiStepWizard,
  key: 'multi-step-wizard',
  text: {
    bemClass: 'carbon-multi-step-wizard',
    details: '',
    description: '',
    name: 'MultiStepWizard',
    type: 'layout'
  },
  defaultProps: MultiStepWizard.defaultProps,
  demoProps: _.assign({ steps: steps }, MultiStepWizard.defaultProps),
  props: MultiStepWizard.propTypes
}
export default definition;
