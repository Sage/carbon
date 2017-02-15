import { Menu } from './';
import Definition from './../../../demo2/utils/definition';
import OptionsHelper from 'utils/helpers/options-helper';
import menuItemDefinition from './menu-item/definition';
import submenuBlockDefinition from './submenu-block/definition';

let definition = new Definition('menu', Menu, {
  associatedDefinitions: [menuItemDefinition, submenuBlockDefinition],
  propOptions: {
    as: OptionsHelper.themesBinary
  },
  propTypes: {
    as: "String"
  },
  propDescriptions: {
    as: "Primary or secondary theme for the menu."
  }
});

definition.addChildByDefinition(menuItemDefinition, {
  children: "Item One",
  href: "#"
});

definition.addChildByDefinition(menuItemDefinition, {
  children: `<MenuItem href="#">Sub Menu Item One</MenuItem>
  <MenuItem href="#">Sub Menu Item Two</MenuItem>`,
  href: "#",
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
  children: `<MenuItem href="#">Sub Menu Item One</MenuItem>
  <SubmenuBlock>
    <MenuItem href="#">Sub Menu Item Two</MenuItem>
    <MenuItem href="#">Sub Menu Item Three</MenuItem>
  </SubmenuBlock>
  <MenuItem href="#">Sub Menu Item Four</MenuItem>
  <MenuItem href="#">Sub Menu Item Five</MenuItem>
  <MenuItem href="#" alternate={ true }>Sub Menu Item Six</MenuItem>
  <MenuItem href="#">Sub Menu Item Seven</MenuItem>
  <MenuItem href="#" divide={ true }>Sub Menu Item Eight</MenuItem>`,
  href: "#",
  submenu: "Item Five",
  submenuDirection: "left"
});

export default definition;
