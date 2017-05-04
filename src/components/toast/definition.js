import Toast from './';
import OptionsHelper from './../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('toast', Toast, {
  description: `A longer, timely message that the user must dismiss, but doesn’t interrupt their activity.`,
  designerNotes: `
* Presents a message in a dialog at the top-right of the screen that animates in. The user can manually dismiss it, and it animates out.
* Useful for instant notifications, or information which is time sensitive (e.g. a ‘push notification’ style). If the message isn’t time sensitive, consider the Message component.
* The message stays on-screen until dismissed, giving the user time to interpret the message.
* Various types are available. ‘Error’ and ‘Success’ are by far the most useful - others are present for completeness by may not be practically used very often:
* __Error__ - tells the user about a negative outcome that has already happened. Try to focus the message text on the action the user needs to take to be successful, rather than what went wrong (e.g. ‘Payment failed, please try again’).
* __Help__ - not frequently used.
* __Info__ - gives context or advice to the user where there’s no risk of a negative outcome (e.g. ‘Your monthly statements are ready to review’).
* __Maintenance__ - warns the user if a particular service or feature may go offline shortly.
* __New__ - highlights a new feature to the user (e.g. ‘You can now send batch statements in Sage One’).
* __Success__ - indicates that an activity was successful (e.g. ‘Your subscription upgrade was successful’).
* __Warning__ - warns the user about a potential negative outcome that hasn’t happened yet.
  `,
  relatedComponentsNotes: `
* Simple positive or negative confirmation? [Try Flash](/components/flash).
* Longer message which stays on-screen? [Try Message](/components/message).
* Error or warning message that interrupts activity? [Try Alert](/components/alert).
`,
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
