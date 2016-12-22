import NumberComponent from './';

import { _ } from 'lodash';

let definition = {
  component: NumberComponent,
  key: 'number',
  text: {
    bemClass: 'carbon-number',
    details: '',
    description: '',
    name: 'NumberComponent',
    type: 'layout'
  },
  defaultProps: NumberComponent.defaultProps,
  demoProps: NumberComponent.defaultProps,
  props: NumberComponent.propTypes
}
export default definition;
