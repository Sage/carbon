import Tab from './';

import { _ } from 'lodash';

let definition = {
  component: Tab,
  key: 'tab',
  text: {
    bemClass: 'carbon-tab',
    details: '',
    description: '',
    name: 'Tab',
    type: 'layout'
  },
  defaultProps: Tab.defaultProps,
  demoProps: _.assign({ children: 'test' }, Tab.defaultProps),
  props: Tab.propTypes
}
export default definition;
