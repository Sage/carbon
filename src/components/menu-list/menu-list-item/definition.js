import MenuListItem from './';
import Definition from './../../../../demo/utils/definition';

let definition = new Definition('menu-list-item', MenuListItem, {
  propTypes: {
    children: "Node"
  },
  propDescriptions: {
    children: "This component supports children."
  }
});

export default definition;
