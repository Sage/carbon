import MenuListItem from './';
import Definition from './../../../../demo2/utils/definition';

let definition = new Definition('menu-list-item', MenuListItem, {
  propTypes: {
    children: "Node"
  },
  propDescriptions: {
    children: "This component supports children."
  }
});

export default definition;
