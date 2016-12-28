import Message from './';
import DefinitionHelper from '../../utils/helpers/definition-helper';

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
    as: DefinitionHelper.iconColorSet()
  }
};

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, {
  border: true,
  children: 'test',
  open: true,
  roundedCorners: true
});

export default definition;
