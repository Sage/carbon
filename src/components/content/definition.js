import Content from './';

import { _ } from 'lodash';

let definition = {
  component: Content,
  key: 'content',
  text: {
    bemClass: 'carbon-content',
    details: '',
    description: '',
    name: 'Content',
    type: 'layout'
  },
  defaultProps: Content.defaultProps,
  demoProps: _.assign({ children: 'test' }, Content.defaultProps),
  props: Content.propTypes
}

export default definition;
