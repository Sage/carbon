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
  props: Button.propTypes,
  defaultProps: Button.defaultProps
}

let demoProps = _.assign(
  { children: 'test' },
  Button.defaultProps
);

for (var prop in definition.props) {
  if (!demoProps[prop]) {
    demoProps[prop] = '';
  }
}

let propOptions = {
  as: ['primary', 'secondary'],
  size: ['small', 'medium', 'large'],
  theme: ['blue', 'green', 'red', 'magenta', 'grey', 'white']
};

definition.demoProps = demoProps;
definition.propOptions = propOptions;

export default definition;
