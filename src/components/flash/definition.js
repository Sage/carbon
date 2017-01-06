import Flash from './';

import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Flash,
  key: 'flash',
  text: {
    bemClass: 'carbon-flash',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Flash',
    type: 'notification'
  },
  defaultProps: Flash.defaultProps,
  props: Flash.propTypes,
  propOptions: {
    as: OptionsHelper.colors()
  }
};

definition.demoProps = {
  as: 'help',
  message: 'Test flash message',
  onDismiss: () => {

  },
  open: true
};

export default definition;
