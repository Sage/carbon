import Heading from './';

import { _ } from 'lodash';

let definition = {
  component: Heading,
  key: 'heading',
  text: {
    bemClass: 'carbon-heading',
    details: '',
    description: '',
    name: 'Heading',
    type: 'layout'
  },
  defaultProps: Heading.defaultProps,
  demoProps: _.assign({ children: 'test' }, Heading.defaultProps),
  props: Heading.propTypes
}
export default definition;
