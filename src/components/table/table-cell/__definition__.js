import TableCell from './';
import Definition from './../../../../demo/utils/definition';

let definition = new Definition('table-cell', TableCell, {
  propTypes: {
    align: "String",
    action: "Boolean",
    children: "Node",
    className: "String"
  },
  propDescriptions: {
    align: "Aligns the text in the cell. Can be set to left, center or right.",
    action: "Defines if this cell is used for actions, such as the delete or select action (it makes the column more narrow).",
    children: "This component supports children.",
    className: "Classes to apply to the component."
  }
});

export default definition;
