import NavigationBar from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('navigation-bar', NavigationBar, {
  description: `Provides a container for your app's primary and secondary navigation.`,
  designerNotes: `
* Provides a container for [Menu](/components/menu) - together providing your app's primary and secondary navigation.
* Everything can be contained within an [App Wrapper](/components/app-wrapper).
  `,
  relatedComponentsNotes: `
* Need an overall container? [Try App Wrapper](/components/app-wrapper).
* Navigating the hierarchy of the app? [Try Menu](/components/menu).
* Laying out a page in columns? [Try Row](/components/row).
 `,
  propOptions: {
    as: OptionsHelper.themesBinary,
  },
  propTypes: {
    as: "String",
    children: "Node",
    className: "String"
  },
  propDescriptions: {
    as: "Primary or Secondary theme.",
    children: "This component supports children.",
    className: "Classes to apply to the component."
  }
});

export default definition;
