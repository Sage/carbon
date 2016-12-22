import { TableAjax } from './';

import { _ } from 'lodash';

let definition = {
  component: TableAjax,
  key: 'table-ajax',
  text: {
    bemClass: 'carbon-table-ajax',
    details: '',
    description: '',
    name: 'TableAjax',
    type: 'layout'
  },
  defaultProps: TableAjax.defaultProps,
  demoProps: _.assign({ children: 'test' }, TableAjax.defaultProps),
  props: TableAjax.propTypes
}
export default definition;
