import Profile from './';
import Definition from './../../../demo2/utils/definition';
import OptionsHelper from 'utils/helpers/options-helper';

let definition = new Definition('profile', Profile, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
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
