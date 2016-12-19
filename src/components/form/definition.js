import Form from './';

import { _ } from 'lodash';

let definition = {
  component: Form,
  key: 'form',
  text: {
    bemClass: 'carbon-form',
    details: '',
    description: '',
    name: 'Form',
    type: 'layout'
  },
  defaultProps: Form.defaultProps,
  demoProps: _.assign({ children: 'test' }, Form.defaultProps),
  props: Form.propTypes
}
export default definition;
