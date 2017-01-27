import Message from './';
import DemoHelper from '../../utils/helpers/demo-helper';
import OptionsHelper from '../../utils/helpers/options-helper';

let definition = {
  component: Message,
  key: 'message',
  text: {
    bemClass: 'carbon-message',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Message',
    type: 'notification'
  },
  defaultProps: Message.defaultProps,
  props: Message.propTypes,
  propOptions: {
    as: OptionsHelper.colors()
  }
};

definition.demoProps = {
  as: 'info',
  border: true,
  children: 'test',
  open: true,
  roundedCorners: true,
  transparent: false
};

export default definition;
