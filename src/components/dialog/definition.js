import Dialog from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Dialog,
  key: 'dialog',
  text: {
    bemClass: 'carbon-dialog',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Dialog',
    type: 'modal'
  },
  defaultProps: Dialog.defaultProps,
  props: Dialog.propTypes,
  propOptions: {
    size: OptionsHelper.sizesFull()
  }
};

definition.demoProps = {
  enableBackgroundUI: true,
  onCancel: DemoHelper.stubbedFunction,
  open: false,
  showCloseIcon: true,
  size: OptionsHelper.sizesFull()[2],
  title: 'Test'
};

export default definition;
