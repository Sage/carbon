import { _ } from 'lodash';

import Alert from './';

import dialogDefinition from '../dialog/definition';

let definition = {
  component: Alert,
  key: 'alert',
  text: {
    bemClass: 'carbon-alert',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Alert',
    type: 'modal'
  },
  defaultProps: dialogDefinition.defaultProps,
  props: dialogDefinition.propTypes,
  propOptions: dialogDefinition.propOptions
};


definition.demoProps = _.assign({}, dialogDefinition.demoProps);

export default definition;
