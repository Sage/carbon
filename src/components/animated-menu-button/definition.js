import AnimatedMenuButton from './';

import { _ } from 'lodash';

let definition = {
  component: AnimatedMenuButton,
  key: 'animated-menu-button',
  text: {
    bemClass: 'carbon-animated-menu-button',
    details: '',
    description: '',
    name: 'AnimatedMenuButton',
    type: 'layout'
  },
  defaultProps: AnimatedMenuButton.defaultProps,
  demoProps: _.assign({ children: 'test' }, AnimatedMenuButton.defaultProps),
  props: AnimatedMenuButton.propTypes
}
export default definition;
