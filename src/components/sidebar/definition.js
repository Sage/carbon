import { Sidebar } from './';

import { _ } from 'lodash';

let definition = {
  component: Sidebar,
  key: 'sidebar',
  text: {
    bemClass: 'carbon-sidebar',
    details: '',
    description: '',
    name: 'Sidebar',
    type: 'layout'
  },
  defaultProps: Sidebar.defaultProps,
  demoProps: _.assign({ children: 'test' }, Sidebar.defaultProps),
  props: Sidebar.propTypes
}
export default definition;
