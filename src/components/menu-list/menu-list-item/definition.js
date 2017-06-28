import MenuListItem from './';
import Definition from './../../../../demo/utils/definition';

let definition = new Definition('menu-list-item', MenuListItem, {
  propTypes: {
    children: "Node",
    className: "String"
  },
  propDescriptions: {
    children: "This component supports children.",
    className: "Classes for the component."
  }
});

export default definition;
