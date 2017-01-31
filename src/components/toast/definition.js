import Toast from './';

import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Toast,
  key: 'toast',
  text: {
    bemClass: 'carbon-toast',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Toast',
    type: 'notification'
  },
  defaultProps: Toast.defaultProps,
  props: Toast.propTypes,
  propOptions: {
    as: OptionsHelper.colors()
  }
};

definition.demoProps = {
  as: 'warning',
  children: 'test',
  open: true
};

export default definition;
