import Spinner from './';

import { _ } from 'lodash';

let definition = {
  component: Spinner,
  key: 'spinner',
  text: {
    bemClass: 'carbon-spinner',
    details: '',
    description: '',
    name: 'Spinner',
    type: 'layout'
  },
  defaultProps: Spinner.defaultProps,
  demoProps: _.assign({ children: 'test' }, Spinner.defaultProps),
  props: Spinner.propTypes
}
export default definition;
