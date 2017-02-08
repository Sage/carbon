import Message from './';
import Definition from './../../../demo2/utils/definition';
import OptionsHelper from './../../utils/helpers/options-helper';

let definition = new Definition('message', Message, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  type: 'notification',
  propOptions: {
    as: OptionsHelper.colors
  },
  propValues: {
    children: 'This is some information from the Message Component. This can be a string or some custom JSX',
    open: true
  },
  propTypes: {
    as: "String",
    transparent: "Boolean",
    open: "Boolean",
    onDismiss: "Function",
    roundedCorners: "Boolean",
    border: "Boolean"
  },
  propDescriptions: {
    as: "Sets the theme of the notification. Possible values include: " + OptionsHelper.colors.join(", "),
    transparent: "Determines if the message background is transparent or filled by the 'as' property color",
    open: "A boolean to control the open/closed state of the notification",
    onDismiss: "A callback for when the notification is dismissed. You can use this prop to close the notification",
    roundedCorners: "A boolean which rounds the corners of the message when true",
    border: "A boolean which determines if the borders should be shown",
  }
});

definition.stubAction('onDismiss', 'open', false);

export default definition;
