import AppSwitcher from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('app-switcher', AppSwitcher, {
    description: `Creates a menu item preferrably on a toolbar. A user can click on the menu item and is presented with a drawer of application links to choose from.
    If the user clicks on one of the application links, he/she is directed to a url associated with the item`,
    relatedComponentsNotes: `
    * Navigating the hierarchy of the app? [Try Menu](/components/menu).
    `,
    designerNotes: `
    * The menu item is created on a toolbar where the user can select it with the mouse.
    * When hovered over the menu item will be a dark blue
    * When the toolbar drops down, there are application items arranged by sections. The menu item should be an active blue color.
    * When the user clicks on an item, the app switcher is closed and the user is taken to the url associated with the application item
    * If the user clicks anywhere else on the screen besides the application switcher, the application switcher is closed and the click is passed through
        to the screen.
    * The menu item title by default is a blank string, but can be overriden by a prop passed to the component
  `,
    propOptions: {
        applicationJson: OptionsHelper.isRequired,
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
