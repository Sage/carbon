import Tabs from './';

import { _ } from 'lodash';

let definition = {
  component: Tabs,
  key: 'tabs',
  text: {
    bemClass: 'carbon-tabs',
    details: '',
    description: '',
    name: 'Tabs',
    type: 'layout'
  },
  defaultProps: Tabs.defaultProps,
  demoProps: _.assign({ children: 'test' }, Tabs.defaultProps),
  props: Tabs.propTypes
}
export default definition;
