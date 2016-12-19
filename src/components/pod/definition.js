import Pod from './';

import { _ } from 'lodash';

let definition = {
  component: Pod,
  key: 'pod',
  text: {
    bemClass: 'carbon-pod',
    details: '',
    description: '',
    name: 'Pod',
    type: 'layout'
  },
  defaultProps: Pod.defaultProps,
  demoProps: _.assign({ children: 'test' }, Pod.defaultProps),
  props: Pod.propTypes
}
export default definition;
