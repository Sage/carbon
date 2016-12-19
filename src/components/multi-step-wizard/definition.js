import MultiStepWizard from './';

import { _ } from 'lodash';

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
  demoProps: _.assign({ children: 'test' }, MultiStepWizard.defaultProps),
  props: MultiStepWizard.propTypes
}
export default definition;
