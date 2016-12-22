import { Table } from './';

import { _ } from 'lodash';

let definition = {
  component: Table,
  key: 'table',
  text: {
    bemClass: 'carbon-table',
    details: '',
    description: '',
    name: 'Table',
    type: 'layout'
  },
  defaultProps: Table.defaultProps,
  demoProps: _.assign({ children: 'test' }, Table.defaultProps),
  props: Table.propTypes
}
export default definition;
