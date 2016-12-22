import Portrait from './';

import { _ } from 'lodash';

let definition = {
  component: Portrait,
  key: 'portrait',
  text: {
    bemClass: 'carbon-portrait',
    details: '',
    description: '',
    name: 'Portrait',
    type: 'layout'
  },
  defaultProps: Portrait.defaultProps,
  demoProps: _.assign({ children: 'test' }, Portrait.defaultProps),
  props: Portrait.propTypes
}
export default definition;
