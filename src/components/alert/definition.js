import Alert from './';

import { _ } from 'lodash';

let definition = {
  component: Alert,
  key: 'alert',
  text: {
    bemClass: 'carbon-alert',
    details: '',
    description: '',
    name: 'Alert',
    type: 'layout'
  },
  defaultProps: Alert.defaultProps,
  demoProps: _.assign({ children: 'test' }, Alert.defaultProps),
  props: Alert.propTypes
}
export default definition;
