import AppWrapper from './';

import { _ } from 'lodash';

let definition = {
  component: AppWrapper,
  key: 'app-wrapper',
  text: {
    bemClass: 'carbon-app-wrapper',
    details: '',
    description: '',
    name: 'AppWrapper',
    type: 'layout'
  },
  defaultProps: AppWrapper.defaultProps,
  demoProps: _.assign({ children: 'test' }, AppWrapper.defaultProps),
  props: AppWrapper.propTypes
}
export default definition;
