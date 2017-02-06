import Toast from './';
import OptionsHelper from './../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';

let definition = new Definition('toast', Toast, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  type: 'notification',
  propOptions: {
    as: OptionsHelper.colors
  },
  propValues: {
    children: 'test',
    open: true
  },
  hiddenProps: ['onDismiss'],
  propTypes: {
    as: "String",
    onDismiss: "Function",
    open: "Boolean"
  },
  propDescriptions: {
    as: "Sets the theme of the notification. Possible values include: " + OptionsHelper.colors.join(", "),
    onDismiss: "A callback for when the notification is dismissed. You can use this prop to close the notification.",
    open: "A boolean to control the open/closed state of the notification."
  }
});

definition.stubAction('onDismiss', 'open', false);

export default definition;
