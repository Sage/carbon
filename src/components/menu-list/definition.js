import { MenuList } from './';
import Definition from './../../../demo2/utils/definition';
import menuListItemDefinition from './menu-list-item/definition';

let definition = new Definition('menu-list', MenuList, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  associatedDefinitions: [menuListItemDefinition],
  hiddenProps: ["filter"],
  propRequires: {
    collapsible: "title"
  },
  propTypes: {
    filter: "Boolean",
    title: "String",
    collapsible: "Boolean",
    className: "String",
    children: "Node"
  },
  propTypes: {
    filter: "Enable a filter for the menu. When this is enabled each menu item requires a name prop.",
    title: "Define a title for the menu, if this is defined then the menu can be collapsible.",
    collapsible: "Turns collapsible on/off.",
    className: "Classes for the component.",
    children: "This component supports children."
  }
});

definition.addChildByDefinition(menuListItemDefinition, {
  children: "Menu Item One"
});

definition.addChildByDefinition(menuListItemDefinition, {
  children: `<MenuList title="Menu Item Two" filter={ true }>
    <MenuListItem name="First Sub Item">
      First Sub Item
    </MenuListItem>
    <MenuListItem name="Second Sub Item">
      Second Sub Item
    </MenuListItem>
    <MenuListItem name="Third Sub Item">
      Third Sub Item
    </MenuListItem>
  </MenuList>`
});

definition.addChildByDefinition(menuListItemDefinition, {
  children: "Menu Item Three"
});

definition.addChildByDefinition(menuListItemDefinition, {
  children: "Menu Item Four"
});

export default definition;
