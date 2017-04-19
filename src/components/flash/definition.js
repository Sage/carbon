import Flash from './';
import Definition from './../../../demo/utils/definition';
import OptionsHelper from './../../utils/helpers/options-helper';

let definition = new Definition('flash', Flash, {
  description: `A simple positive or negative confirmation of an action.`,
  designerNotes: `
* Presents a short confirmation message to the user in a banner which can animate quickly in, and out, at the bottom of the browser window.
* Success messages disappear after a set timeout. Error messages stay on-screen until dismissed by the user.
* Useful for general success and failure messages that the user doesn’t need time to interpret. Try to place only a very short message in a Flash of just a few characters, e.g. ‘Changes Saved’.
* Various types are available. ‘Error’ and ‘Success’ are by far the most useful - others are present for completeness by may not be used in practice very often, because a Flash isn’t suitable for longer messages.
  `,
  relatedComponentsNotes: `
* Longer message which stays on-screen? [Try Message](/components/message).
* Longer, time sensitive message that must be dismissed? [Try Toast](/components/toast).
* Error or warning message that interrupts activity? [Try Alert](/components/alert).
 `,
  type: 'notification',
  propOptions: {
    as: OptionsHelper.colors
  },
  propValues: {
    message: 'This is some information from the Flash Component.',
    open: false
  },
  propTypes: {
    as: "String",
    open: "Boolean",
    onDismiss: "Function",
    message: "String",
    timeout: "String || Number"
  },
  propDescriptions: {
    as: "Sets the theme of the notification. Possible values include: " + OptionsHelper.colors.join(", "),
    open: "A boolean to control the open/closed state of the notification",
    onDismiss: "A callback for when the notification is dismissed. You can use this prop to close the notification",
    message: "The message provided to the flash component. This can be built in multiple formats e.g. \nA string: 'Alert' Array: ['Alert One', 'Alert Two']\nAn object with description: { description: 'Alert' }\nAn object with key/value pair: { first_name: 'is required', last_name: 'is required' }\nAn object with description & nested key/value pairs: { description: { first_name: 'is required', last_name: 'is required' } }",
    timeout: "Sets the time in Milliseconds the flash remains on the screen. After the timeout it will call the onDimiss callback. This will remove the close icon when set",
  },
  openPreview: true
});

definition.stubAction('onDismiss', 'open', false);

export default definition;
