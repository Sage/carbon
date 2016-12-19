import Textarea from './';

import { _ } from 'lodash';

let definition = {
  component: Textarea,
  key: 'textarea',
  text: {
    bemClass: 'carbon-textarea',
    details: '',
    description: '',
    name: 'Textarea',
    type: 'layout'
  },
  defaultProps: Textarea.defaultProps,
  demoProps: _.assign({ children: 'test' }, Textarea.defaultProps),
  props: Textarea.propTypes
}
export default definition;
