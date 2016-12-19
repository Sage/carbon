import RadioButton from './';

import { _ } from 'lodash';

let definition = {
  component: RadioButton,
  key: 'radio-button',
  text: {
    bemClass: 'carbon-radio-button',
    details: '',
    description: '',
    name: 'RadioButton',
    type: 'layout'
  },
  defaultProps: RadioButton.defaultProps,
  demoProps: _.assign({ children: 'test' }, RadioButton.defaultProps),
  props: RadioButton.propTypes
}
export default definition;
