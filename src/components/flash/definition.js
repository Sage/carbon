import Flash from './';
import DemoHelper from '../../utils/helpers/demo-helper';
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
  open: true
};

export default definition;
