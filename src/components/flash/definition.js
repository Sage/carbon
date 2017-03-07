import Flash from './';
import Definition from './../../../demo/utils/definition';
import OptionsHelper from './../../utils/helpers/options-helper';

let definition = new Definition('flash', Flash, {
  description: `I can see a simple positive or negative confirmation of an action which disappears quickly.`,
  designerNotes: `
* Presents a short positive or negative confirmation message to the user in a banner which animates quickly in, and out, at the bottom of the browser window.
* Useful for general success and failure messages that the user doesn’t need time to interpret. Try to place only a very short message in a Flash of just a few characters, e.g. ‘Changes Saved’.
* If you do need a flash message to stay on-screen for longer, you can set the timeout interval.
* Various types are available. ‘Error’ and ‘Success’ are by far the most useful - others are present for completeness by may not be used in practice very often, because a Flash isn’t suitable for longer messages.

* __Longer message which stays on-screen?__ Try Message.
* __Longer, time sensitive message that must be dismissed?__ Try Toast.
* __Error or warning message that interrupts activity?__ Try Alert.
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
