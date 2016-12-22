import { Menu } from './';

import { _ } from 'lodash';

let definition = {
  component: Menu,
  key: 'menu',
  text: {
    bemClass: 'carbon-menu',
    details: '',
    description: '',
    name: 'Menu',
    type: 'layout'
  },
  defaultProps: Menu.defaultProps,
  demoProps: _.assign({ children: 'test' }, Menu.defaultProps),
  props: Menu.propTypes
}
export default definition;
