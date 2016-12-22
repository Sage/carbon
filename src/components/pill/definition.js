import Pill from './';

import { _ } from 'lodash';

let definition = {
  component: Pill,
  key: 'pill',
  text: {
    bemClass: 'carbon-pill',
    details: '',
    description: '',
    name: 'Pill',
    type: 'layout'
  },
  defaultProps: Pill.defaultProps,
  demoProps: _.assign({ children: 'test' }, Pill.defaultProps),
  props: Pill.propTypes
}
export default definition;
