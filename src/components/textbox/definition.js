import Textbox from './';

import { _ } from 'lodash';

let definition = {
  component: Textbox,
  key: 'textbox',
  text: {
    bemClass: 'carbon-textbox',
    details: '',
    description: '',
    name: 'Textbox',
    type: 'layout'
  },
  defaultProps: Textbox.defaultProps,
  demoProps: _.assign({ children: 'test' }, Textbox.defaultProps),
  props: Textbox.propTypes
}
export default definition;
