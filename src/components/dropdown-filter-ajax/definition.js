import DropdownFilterAjax from './';

import { _ } from 'lodash';

let definition = {
  component: DropdownFilterAjax,
  key: 'dropdown-filter-ajax',
  text: {
    bemClass: 'carbon-dropdown-filter-ajax',
    details: '',
    description: '',
    name: 'DropdownFilterAjax',
    type: 'layout'
  },
  defaultProps: DropdownFilterAjax.defaultProps,
  demoProps: _.assign({ children: 'test' }, DropdownFilterAjax.defaultProps),
  props: DropdownFilterAjax.propTypes
}
export default definition;
