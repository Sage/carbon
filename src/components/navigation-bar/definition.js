import NavigationBar from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('navigation-bar', NavigationBar, {
  description: `Provides a container for your app's primary and secondary navigation.`,
  designerNotes: `
* Provides a container for [Menu](/components/menu) - together providing your app's primary and secondary navigation.
* Everything can be contained within an [App Wrapper](/components/app-wrapper).

### Related Components
* __Need an overall container?__ [Try App Wrapper](/components/app-wrapper).
* __Navigating the hierarchy of the app?__ [Try Menu](/components/menu).
* __Laying out a page in columns?__ [Try Row](/components/row).
 `,
  propOptions: {
    as: OptionsHelper.themesBinary,
  },
  propTypes: {
    as: "String"
  },
  propDescriptions: {
    as: "Primary or Secondary theme."
  }
});

export default definition;
