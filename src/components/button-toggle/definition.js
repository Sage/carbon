import ButtonToggle from './';

import { _ } from 'lodash';

let definition = {
  component: ButtonToggle,
  key: 'button-toggle',
  text: {
    bemClass: 'carbon-button-toggle',
    details: 'Try not to create any duplication between the primary navigation, and this component.\n' +
             'Try not to mix links which navigate the user to a location, versus links which create new entities.',
    description: 'Padded and coloured basic button-toggle.',
    name: 'ButtonToggle',
    type: 'buttons'
  },
  defaultProps: ButtonToggle.defaultProps,
  demoProps: _.assign({ children: 'test' }, ButtonToggle.defaultProps),
  props: ButtonToggle.propTypes
}

export default definition;
