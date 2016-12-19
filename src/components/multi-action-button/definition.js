import MultiActionButton from './';

import { _ } from 'lodash';

let definition = {
  component: MultiActionButton,
  key: 'multi-action-button',
  text: {
    bemClass: 'carbon-multi-action-button',
    details: '',
    description: '',
    name: 'MultiActionButton',
    type: 'layout'
  },
  defaultProps: MultiActionButton.defaultProps,
  demoProps: _.assign({ children: 'test' }, MultiActionButton.defaultProps),
  props: MultiActionButton.propTypes
}
export default definition;
