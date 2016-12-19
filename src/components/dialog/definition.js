import Dialog from './';

import { _ } from 'lodash';

let definition = {
  component: Dialog,
  key: 'dialog',
  text: {
    bemClass: 'carbon-dialog',
    details: '',
    description: '',
    name: 'Dialog',
    type: 'layout'
  },
  defaultProps: Dialog.defaultProps,
  demoProps: _.assign({ children: 'test' }, Dialog.defaultProps),
  props: Dialog.propTypes
}
export default definition;
