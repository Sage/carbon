import NavigationBar from './';

import { _ } from 'lodash';

let definition = {
  component: NavigationBar,
  key: 'navigation-bar',
  text: {
    bemClass: 'carbon-navigation-bar',
    details: '',
    description: '',
    name: 'NavigationBar',
    type: 'layout'
  },
  defaultProps: NavigationBar.defaultProps,
  demoProps: _.assign({ children: 'test' }, NavigationBar.defaultProps),
  props: NavigationBar.propTypes
}
export default definition;
