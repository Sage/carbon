import Checkbox from './';

import { _ } from 'lodash';

let definition = {
  component: Checkbox,
  key: 'checkbox',
  text: {
    bemClass: 'carbon-checkbox',
    details: '',
    description: '',
    name: 'Checkbox',
    type: 'form'
  },
  defaultProps: Checkbox.defaultProps,
  demoProps: Checkbox.defaultProps,
  props: Checkbox.propTypes
}

export default definition;
