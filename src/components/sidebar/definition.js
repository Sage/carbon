import { Sidebar } from './';
import OptionsHelper from './../../utils/helpers/options-helper';
import Definition from './../../../demo2/utils/definition';
import sidebarHeaderDefinition from './sidebar-header/definition';

let definition = new Definition('sidebar', Sidebar, {
  associatedDefinitions: [sidebarHeaderDefinition],
  propOptions: {
    position: OptionsHelper.alignBinary,
    size: OptionsHelper.sizesFull
  },
  propValues: {
    children: `<SidebarHeader>
    Header Content
  </SidebarHeader>

  Main Content`
  },
  propTypes: {
    position: "String",
    size: "String"
  },
  propDescriptions: {
    position: "Sets the position of sidebar, either left or right.",
    size: "Sets the size of the sidebar when open."
  }
});

definition.isAModal();

export default definition;
