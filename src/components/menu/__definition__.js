import { Menu } from './';
import Definition from './../../../demo/utils/definition';
import OptionsHelper from 'utils/helpers/options-helper';
import menuItemDefinition from './menu-item/__definition__';
import submenuBlockDefinition from './submenu-block/__definition__';

let definition = new Definition('menu', Menu, {
  description: `Navigates the user in the overall hierarchy of your app.`,
  designerNotes: `
* Presents a 2-level navigation hierarchy to the user.
* The user’s current location is indicated in green. Their hover location is indicated in blue.
* Place separator rows into any menu to group items of similar meaning.
* Carbon has Primary and Secondary styles for the menus - these are used to present primary and secondary navigation. A good example is the Sage One Accounting application.
* More complex navigation patterns such as hamburger menus or mega menus are usually associated with poorer usability test performance, but might still be useful in some situations. Before trying more complex patterns, consider some user research techniques like Card Sorting to reduce the complexity in your information architecture.
  `,
  relatedComponentsNotes: `
* Choosing between variants of the same page, or filtering content? [Try Tabs](/components/tabs).
* Need a container for your primary navigation? [Try Navigation Bar](/components/navigation-bar).
* Quickly accessing useful hyperlinks? [Try Animated Menu Button](/components/animated-menu-button).
 `,
  associatedDefinitions: [menuItemDefinition, submenuBlockDefinition],
  propOptions: {
    as: OptionsHelper.themesBinary
  },
  propTypes: {
    as: "String",
    className: "String"
  },
  propDescriptions: {
    as: "Primary or secondary theme for the menu.",
    className: "Classes to apply to the component."
  }
});

definition.addChildByDefinition(menuItemDefinition, {
  children: "Item One",
});

definition.addChildByDefinition(menuItemDefinition, {
  children: `<MenuItem href="#">Sub Menu Item One</MenuItem>
  <MenuItem href="#">Sub Menu Item Two</MenuItem>`,
  submenu: "Item Two",
});

definition.addChildByDefinition(menuItemDefinition, {
  children: "Item Third",
  href: "#"
});

definition.addChildByDefinition(menuItemDefinition, {
  children: "Item Four",
  href: "#"
});

definition.addChildByDefinition(menuItemDefinition, {
  children: `<MenuItem href="#" icon='settings'>Sub Menu Item One</MenuItem>
  <SubmenuBlock>
    <MenuItem href="#">Sub Menu Item Two</MenuItem>
    <MenuItem href="#">Sub Menu Item Three</MenuItem>
  </SubmenuBlock>
  <MenuItem href="#">Sub Menu Item Four</MenuItem>
  <MenuItem href="#">Sub Menu Item Five</MenuItem>
  <MenuItem href="#">Sub Menu Item Six</MenuItem>
  <MenuItem href="#">Sub Menu Item Seven</MenuItem>
  <MenuItem href="#" divide={ true }>Sub Menu Item Eight</MenuItem>`,
  href: "#",
  submenu: "Item Five",
  submenuDirection: "left"
});

export default definition;
