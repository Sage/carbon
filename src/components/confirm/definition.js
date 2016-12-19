import Confirm from './';

import { _ } from 'lodash';

let definition = {
  component: Confirm,
  key: 'confirm',
  text: {
    bemClass: 'carbon-confirm',
    details: '',
    description: '',
    name: 'Confirm',
    type: 'modal'
  },
  defaultProps: Confirm.defaultProps,
  demoProps: _.assign({ children: 'test' }, Confirm.defaultProps),
  props: Confirm.propTypes
}

export default definition;
