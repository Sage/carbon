import DialogFullScreen from './';

import { _ } from 'lodash';

let definition = {
  component: DialogFullScreen,
  key: 'dialog-full-screen',
  text: {
    bemClass: 'carbon-dialog-full-screen',
    details: '',
    description: '',
    name: 'DialogFullScreen',
    type: 'layout'
  },
  defaultProps: DialogFullScreen.defaultProps,
  demoProps: _.assign({ children: 'test' }, DialogFullScreen.defaultProps),
  props: DialogFullScreen.propTypes
}
export default definition;
