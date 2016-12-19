import Button from './';

import { _ } from 'lodash';

let definition = {
  component: Button,
  key: 'button',
  text: {
    bemClass: 'carbon-button',
    details: 'Try not to create any duplication between the primary navigation, and this component.\n' +
             'Try not to mix links which navigate the user to a location, versus links which create new entities.',
    description: 'Padded and coloured basic button.',
    name: 'Button',
    type: 'buttons'
  },
  defaultProps: Button.defaultProps,
  demoProps: _.assign({ children: 'test' }, Button.defaultProps),
  props: Button.propTypes
}

export default definition;
