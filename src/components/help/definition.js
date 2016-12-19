import Help from './';

import { _ } from 'lodash';

let definition = {
  component: Help,
  key: 'help',
  text: {
    bemClass: 'carbon-help',
    details: '',
    description: '',
    name: 'Help',
    type: 'layout'
  },
  defaultProps: Help.defaultProps,
  demoProps: _.assign({ children: 'test' }, Help.defaultProps),
  props: Help.propTypes
}
export default definition;
