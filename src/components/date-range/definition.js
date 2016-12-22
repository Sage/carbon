import DateRange from './';

import { _ } from 'lodash';

let definition = {
  component: DateRange,
  key: 'date-range',
  text: {
    bemClass: 'carbon-date-range',
    details: '',
    description: '',
    name: 'DateRange',
    type: 'layout'
  },
  defaultProps: DateRange.defaultProps,
  demoProps: { value: ['2015-01-12', '2015-01-13'] },
  props: DateRange.propTypes
}
export default definition;
