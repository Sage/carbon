import { Sidebar } from './';
import OptionsHelper from './../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';
import sidebarHeaderDefinition from './sidebar-header/__definition__';

let definition = new Definition('sidebar', Sidebar, {
  description: `A sidebar overlaid at the right or left of a page.`,
  designerNotes: `
* Useful to perform an action in context without navigating the user to a separate page.
* Useful if the user might need to refer back to the page behind the sidebar. For example, the user could select from a list of clients on the page, with detailed information on the client loading in the sidebar.
* Several pre-set widths are available, and the height is always 100%. It’s best to avoid sidebars that are taller than the user’s viewport height, as a scroll would hide some information. Typical user viewport heights can be as little as 650 pixels.
* Choose whether a dark tint is applied behind the dialog which helps to focus the user on the sidebar, but don’t select this option if the user needs to refer back to the underlying page.
  `,
  relatedComponentsNotes: `
* Simple task in context? [Try Dialog](/components/dialog).
* Complex task that needs more space? [Try Dialog Full Screen](/components/dialog-full-screen).
 `,
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
