import DateComponent from './';

import { _ } from 'lodash';

let definition = {
  component: DateComponent,
  key: 'date',
  text: {
    bemClass: 'carbon-date',
    details: '',
    description: '',
    name: 'DateComponent',
    type: 'layout'
  },
  defaultProps: DateComponent.defaultProps,
  demoProps: DateComponent.defaultProps,
  props: DateComponent.propTypes
}
export default definition;
