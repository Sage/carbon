import Message from './';
import Definition from './../../../demo/utils/definition';
import OptionsHelper from './../../utils/helpers/options-helper';

const definition = new Definition('message', Message, {
  description: 'A longer message which stays on screen to read and interpret.',
  designerNotes: `
* Presents a static message which stays on screen.
* Useful for messages which are longer or more important, where the user needs time to interpret them, or might need to refer back to them during an activity.
* Various types are available. ‘Error’ and ‘Success’ are by far the most useful - others are present for completeness by may not be practically used very often:
* __Error__ - tells the user about a negative outcome that has already happened. Try to focus the message text on the action the user needs to take to be successful, rather than what went wrong.
* __Help__ - not frequently used.
* __Info__ - gives context or advice to the user where there’s no risk of a negative outcome.
* __Maintenance__ - warns the user if a particular service or feature may go offline shortly.
* __New__ - highlights a new feature to the user.
* __Success__ - indicates that an activity was successful. A good example could also present the user with onward options, such as ‘View a list of items’ or ‘Create another’.
* __Warning__ - warns the user about a potential negative outcome that hasn’t happened yet.
* The Transparent configuration is useful if you’d like the message to be more visually subtle, perhaps in a Dialog.
  `,
  relatedComponentsNotes: `
* Simple positive or negative confirmation? [Try Flash](/components/flash).
* Longer, time sensitive message that must be dismissed? [Try Toast](/components/toast).
* Error or warning message that interrupts activity? [Try Alert](/components/alert).
 `,
  type: 'notification',
  toggleFunctions: ['onDismiss'],
  propOptions: {
    as: OptionsHelper.colors
  },
  propValues: {
    children: 'This is some information from the Message Component. This can be a string or some custom JSX',
    open: true
  },
  propTypes: {
    as: 'String',
    children: 'Node',
    className: 'String',
    border: 'Boolean',
    onDismiss: 'Function',
    open: 'Boolean',
    roundedCorners: 'Boolean',
    title: 'String',
    transparent: 'Boolean'
  },
  propDescriptions: {
    as: `Sets the theme of the notification. Possible values include: ${OptionsHelper.colors.join(', ')}`,
    border: 'A boolean which determines if the borders should be shown',
    children: 'The message content',
    className: 'Set custom classes on the component',
    onDismiss: 'A callback for when the notification is dismissed. You can use this prop to close the notification',
    open: 'A boolean to control the open/closed state of the notification',
    roundedCorners: 'A boolean which rounds the corners of the message when true',
    title: 'Set the message title',
    transparent: 'Determines if the message background is transparent or filled by the `as` property color'
  }
});

export default definition;
