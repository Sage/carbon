import SettingsRow from './';
import Definition from './../../../demo/utils/definition';

const definition = new Definition('settings-row', SettingsRow, {
  description: 'Sets up a column-based UI layout with explanatory text and UI controls.',
  designerNotes: `
* Useful to create a series of rows with a heading, explanatory text, and UI controls in each row.
* A good example is a settings page, or step-by-step wizard.
  `,
  relatedComponentsNotes: `
* Need an overall container? [Try App Wrapper](/components/app-wrapper).
* Need a container for your primary navigation? [Try Navigation Bar](/components/navigation-bar).
* Laying out a page in columns? [Try Row](/components/row).
 `,
  propTypes: {
    children: 'Node',
    className: 'String',
    description: 'Node',
    divider: 'Boolean',
    title: 'String'
  },
  propValues: {
    children: 'Content for settings.',
    description: '<span>This provides more information about what this group of settings are for.</span>',
    title: 'A Group of Settings'
  },
  propDescriptions: {
    children: 'This component supports children.',
    className: 'The CSS classes to apply to the component',
    description: 'A string or JSX object that provides a short description about the group of settings.',
    divider: 'Shows a divider below the component.',
    title: 'A title for this group of settings.'
  }
});

export default definition;
