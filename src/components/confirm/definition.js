import Confirm from './';
import { _ } from "lodash";
import DemoHelper from '../../utils/helpers/demo-helper';

import dialogDefinition from '../dialog/definition';

let definition = {
  component: Confirm,
  key: 'confirm',
  text: {
    bemClass: 'carbon-confirm',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Confirm',
    type: 'modal'
  },
  defaultProps: _.assign(dialogDefinition.defaultProps, Confirm.defaultProps),
  props: _.assign(dialogDefinition.propTypes, Confirm.propTypes),
  propOptions: _.assign(dialogDefinition.propOptions, {

  })
};

let demoProps = dialogDefinition.demoProps;
demoProps.confirmLabel = 'Confirm Label';
demoProps.cancelLabel = 'Cancel Label';

definition.demoProps = demoProps;

export default definition;
