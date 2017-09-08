import Spinner from './';
import OptionsHelper from './../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('spinner', Spinner, {
  description: `Represents an activity in progress.`,
  designerNotes: `
* Various colours and sizes are available - the colours match the states for Messages, Toasts, and other components.
* Created with HTML and CSS rather than an animated graphic, which allows for easier customisation.
* If the spinner is likely to appear for a long time, consider placing some dynamic messaging on-screen to reassure the user that something is in progress, and they shouldn’t re-load the page manually.
* Carbon doesn’t feature a progress bar, as it’s often difficult to accurately calculate when many processes will complete, and many are relatively fast.
 `,
  type: 'misc',
  propOptions: {
    as: OptionsHelper.colors,
    size: OptionsHelper.sizesFull
  },
  propTypes: {
    as: "String",
    size: "String",
  },
  propDescriptions: {
    as: "Sets the theme of the notification. Possible values include: " + OptionsHelper.colors.join(", "),
    size: "Name of size to pass to the spinner. Possible values include: " + OptionsHelper.sizesFull.join(", ")
  },
});

export default definition;
