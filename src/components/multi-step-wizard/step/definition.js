import Step from './';

import { _ } from 'lodash';

let definition = {
  component: Step,
  key: 'step',
  text: {
    bemClass: 'carbon-step',
    details: '',
    description: '',
    name: 'Step',
    type: 'layout'
  },
  defaultProps: Step.defaultProps,
  demoProps: _.assign({ children: 'test' }, Step.defaultProps),
  props: Step.propTypes
}
export default definition;
