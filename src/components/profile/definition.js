import Profile from './';

import { _ } from 'lodash';

let definition = {
  component: Profile,
  key: 'profile',
  text: {
    bemClass: 'carbon-profile',
    details: '',
    description: '',
    name: 'Profile',
    type: 'layout'
  },
  defaultProps: Profile.defaultProps,
  demoProps: _.assign({ children: 'test' }, Profile.defaultProps),
  props: Profile.propTypes
}
export default definition;
