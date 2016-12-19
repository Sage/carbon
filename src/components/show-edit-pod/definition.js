import ShowEditPod from './';

import { _ } from 'lodash';

let definition = {
  component: ShowEditPod,
  key: 'show-edit-pod',
  text: {
    bemClass: 'carbon-show-edit-pod',
    details: '',
    description: '',
    name: 'ShowEditPod',
    type: 'layout'
  },
  defaultProps: ShowEditPod.defaultProps,
  demoProps: _.assign({ children: 'test' }, ShowEditPod.defaultProps),
  props: ShowEditPod.propTypes
}
export default definition;
