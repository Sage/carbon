import Decimal from './';

import { _ } from 'lodash';

let definition = {
  component: Decimal,
  key: 'decimal',
  text: {
    bemClass: 'carbon-decimal',
    details: '',
    description: '',
    name: 'Decimal',
    type: 'layout'
  },
  defaultProps: Decimal.defaultProps,
  demoProps: _.assign({ children: 'test' }, Decimal.defaultProps),
  props: Decimal.propTypes
}
export default definition;
