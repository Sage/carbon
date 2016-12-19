import Rainbow from './';

import { _ } from 'lodash';

let definition = {
  component: Rainbow,
  key: 'rainbow',
  text: {
    bemClass: 'carbon-rainbow',
    details: '',
    description: '',
    name: 'Rainbow',
    type: 'layout'
  },
  defaultProps: Rainbow.defaultProps,
  demoProps: _.assign({ children: 'test' }, Rainbow.defaultProps),
  props: Rainbow.propTypes
}
export default definition;
