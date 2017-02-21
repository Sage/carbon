import SettingsRow from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('settings-row', SettingsRow, {
  propTypes: {
    children: "Node",
    description: "String",
    divider: "Boolean",
    title: "String"
  },
  propValues: {
    children: "Content for settings.",
    description: "This provides more information about what this group of settings are for.",
    title: "A Group of Settings"
  },
  propDescriptions: {
    children: "This component supports children.",
    description: "A short description about the group of settings.",
    divider: "Shows a divider below the component.",
    title: "A title for this group of settings."
  }
});

export default definition;
