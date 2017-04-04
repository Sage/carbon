import AppWrapper from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('app-wrapper', AppWrapper, {
  description: `Wraps all components inside an overall container.`,
  relatedComponentsNotes: `
* Need a container for your primary navigation? [Try Navigation Bar](/components/navigation-bar).
* Navigating the hierarchy of the app? [Try Menu](/components/menu).
* Laying out a page in columns? [Try Row](/components/row).
 `,
  propValues: {
    children: "This component will wrap its children within the width constraints of your application."
  },
  propTypes: {
    children: 'Node',
    className: 'String',
  },
  propDescriptions: {
    children: 'This component supports children.',
    className: 'Classes to apply to the component.',
  }
});

export default definition;
