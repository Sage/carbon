import Link from './';

import { _ } from 'lodash';

let definition = {
  component: Link,
  key: 'link',
  text: {
    bemClass: 'carbon-link',
    details: '',
    description: '',
    name: 'Link',
    type: 'layout'
  },
  defaultProps: Link.defaultProps,
  demoProps: _.assign({ children: 'test' }, Link.defaultProps),
  props: Link.propTypes
}
export default definition;
