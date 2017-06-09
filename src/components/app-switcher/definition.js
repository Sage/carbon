import AppSwitcher from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('app-switcher', AppSwitcher, {
    description: `Allows a user to switch between products in the Sage eco-sphere. A part of the Accountants Cloud / Practice Cloud`,
    relatedComponentsNotes: `
* Navigating the hierarchy of the app? [Try Menu](/components/menu).
 `,
    designerNotes: `
  `,
    propOptions: {
        applicationJson: OptionsHelper.isRequired
    },
    propTypes: {
        applicationJson: "String",
        menuTitle: "String"
    },
    propDescriptions: {
        applicationJson: "The json blob used to render each of the component links",
        menuTitle: "The name of the menu title drop-down"
    },
});

export default definition;
