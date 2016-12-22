import Fieldset from './';

import { _ } from 'lodash';

let definition = {
  component: Fieldset,
  key: 'fieldset',
  text: {
    bemClass: 'carbon-fieldset',
    details: '',
    description: '',
    name: 'Fieldset',
    type: 'layout'
  },
  defaultProps: Fieldset.defaultProps,
  demoProps: _.assign({ children: 'test' }, Fieldset.defaultProps),
  props: Fieldset.propTypes
}
export default definition;
