import Profile from './';
import Definition from './../../../demo/utils/definition';
import OptionsHelper from 'utils/helpers/options-helper';

let definition = new Definition('profile', Profile, {
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
