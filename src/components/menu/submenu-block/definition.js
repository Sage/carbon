import SubmenuBlock from './';
import Definition from './../../../../demo/utils/definition';

let definition = new Definition('submenu-block', SubmenuBlock, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  props: [ 'children' ],
  propTypes: {
    children: 'Node'
  },
  propDescriptions: {
    children: 'This component supports children.'
  }
});

export default definition;
