import Profile from './';
import Definition from './../../../demo/utils/definition';
import OptionsHelper from 'utils/helpers/options-helper';

let definition = new Definition('profile', Profile, {
  description: `I can see a person represented in the system with their initials, and then an avatar on hover.`,
  designerNotes: `
* Useful to represent a person, user, or organisation, similar to an avatar.
* The user is initially represented with their initials, but hovering on the initials can reveal an image. This helps to avoid distracting the user.

* __Either initials or an avatar?__ Try Portrait.
 `,
  propValues: {
    name: "Andrew Tait",
    email: "andrew.tait@sage.com"
  },
  propTypes: {
    name: "String",
    email: "String",
    initials: "String",
    large: "Boolean"
  },
  propDescriptions: {
    name: "Define the name to display.",
    email: "Define the email to use (will check Gravatar for image).",
    initials: "Define initials to display if there is no Gravatar image.",
    large: "Enable a larger theme for the name."
  }
});

export default definition;
