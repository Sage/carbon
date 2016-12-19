import Icon from './';

import { _ } from 'lodash';

let definition = {
  component: Icon,
  key: 'icon',
  text: {
    bemClass: 'carbon-icon',
    details: '',
    description: '',
    name: 'Icon',
    type: 'layout'
  },
  defaultProps: Icon.defaultProps,
  demoProps: _.assign({ children: 'test' }, Icon.defaultProps),
  props: Icon.propTypes
}
export default definition;
