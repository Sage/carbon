import Dropdown from './';

import { _ } from 'lodash';

let definition = {
  component: Dropdown,
  key: 'dropdown',
  text: {
    bemClass: 'carbon-dropdown',
    details: '',
    description: '',
    name: 'Dropdown',
    type: 'layout'
  },
  defaultProps: Dropdown.defaultProps,
  demoProps: _.assign({ children: 'test' }, Dropdown.defaultProps),
  props: Dropdown.propTypes
}
export default definition;
