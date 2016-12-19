import SplitButton from './';

import { _ } from 'lodash';

let definition = {
  component: SplitButton,
  key: 'split-button',
  text: {
    bemClass: 'carbon-split-button',
    details: '',
    description: '',
    name: 'SplitButton',
    type: 'layout'
  },
  defaultProps: SplitButton.defaultProps,
  demoProps: _.assign({ children: 'test' }, SplitButton.defaultProps),
  props: SplitButton.propTypes
}
export default definition;
