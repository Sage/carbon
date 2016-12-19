import Create from './';

import { _ } from 'lodash';

let definition = {
  component: Create,
  key: 'create',
  text: {
    bemClass: 'carbon-create',
    details: '',
    description: '',
    name: 'Create',
    type: 'action'
  },
  defaultProps: Create.defaultProps,
  demoProps: _.assign({ children: 'test' }, Create.defaultProps),
  props: Create.propTypes
}

export default definition;
