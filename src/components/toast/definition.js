import Toast from './';

import { _ } from 'lodash';

let definition = {
  component: Toast,
  key: 'toast',
  text: {
    bemClass: 'carbon-toast',
    details: '',
    description: '',
    name: 'Toast',
    type: 'layout'
  },
  defaultProps: Toast.defaultProps,
  demoProps: _.assign({ children: 'test' }, Toast.defaultProps),
  props: Toast.propTypes
}
export default definition;
