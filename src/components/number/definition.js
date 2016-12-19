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
  demoProps: _.assign({ children: 'test' }, NumberComponent.defaultProps),
  props: NumberComponent.propTypes
}
export default definition;
