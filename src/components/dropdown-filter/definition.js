import DropdownFilter from './';

import { _ } from 'lodash';

let definition = {
  component: DropdownFilter,
  key: 'dropdown-filter',
  text: {
    bemClass: 'carbon-dropdown-filter',
    details: '',
    description: '',
    name: 'DropdownFilter',
    type: 'layout'
  },
  defaultProps: DropdownFilter.defaultProps,
  demoProps: _.assign({ children: 'test' }, DropdownFilter.defaultProps),
  props: DropdownFilter.propTypes
}
export default definition;
