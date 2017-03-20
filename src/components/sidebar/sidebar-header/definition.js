import SidebarHeader from './';
import Definition from './../../../../demo/utils/definition';

let definition = new Definition('sidebar-header', SidebarHeader, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  propTypes: {
    children: "Node"
  },
  propDescriptions: {
    children: "This component supports children."
  }
});

export default definition;
