import Filter from './';

import { _ } from 'lodash';

let definition = {
  component: Filter,
  key: 'filter',
  text: {
    bemClass: 'carbon-filter',
    details: '',
    description: '',
    name: 'Filter',
    type: 'layout'
  },
  defaultProps: Filter.defaultProps,
  demoProps: _.assign({ children: 'test' }, Filter.defaultProps),
  props: Filter.propTypes
}
export default definition;
