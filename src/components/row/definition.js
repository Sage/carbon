import Row from './';

import { _ } from 'lodash';

let definition = {
  component: Row,
  key: 'row',
  text: {
    bemClass: 'carbon-row',
    details: '',
    description: '',
    name: 'Row',
    type: 'layout'
  },
  defaultProps: Row.defaultProps,
  demoProps: _.assign({ children: 'test' }, Row.defaultProps),
  props: Row.propTypes
}
export default definition;
