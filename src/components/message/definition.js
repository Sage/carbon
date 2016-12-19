import Message from './';

import { _ } from 'lodash';

let definition = {
  component: Message,
  key: 'message',
  text: {
    bemClass: 'carbon-message',
    details: '',
    description: '',
    name: 'Message',
    type: 'layout'
  },
  defaultProps: Message.defaultProps,
  demoProps: _.assign({ children: 'test' }, Message.defaultProps),
  props: Message.propTypes
}
export default definition;
