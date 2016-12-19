import Flash from './';

import { _ } from 'lodash';

let definition = {
  component: Flash,
  key: 'flash',
  text: {
    bemClass: 'carbon-flash',
    details: '',
    description: '',
    name: 'Flash',
    type: 'layout'
  },
  defaultProps: Flash.defaultProps,
  demoProps: _.assign({ children: 'test' }, Flash.defaultProps),
  props: Flash.propTypes
}
export default definition;
