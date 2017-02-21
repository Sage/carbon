import Toast from './';
import OptionsHelper from './../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('toast', Toast, {
  type: 'notification',
  toggleFunctions: ["onDismiss"],
  propOptions: {
    as: OptionsHelper.colors
  },
  propValues: {
    children: 'test',
    open: true
  },
  propTypes: {
    as: "String",
    onDismiss: "Function",
    open: "Boolean"
  },
  propDescriptions: {
    as: "Sets the theme of the notification. Possible values include: " + OptionsHelper.colors.join(", "),
    onDismiss: "A callback for when the notification is dismissed. You can use this prop to close the notification.",
    open: "A boolean to control the open/closed state of the notification."
  },
  openPreview: true
});

export default definition;
