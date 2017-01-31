import TableCell from './';

let definition = {
  component: TableCell,
  key: 'table-cell',
  text: {
    bemClass: 'carbon-table-cell',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'TableCell',
    type: 'grid'
  },
  defaultProps: TableCell.defaultProps,
  props: TableCell.propTypes
};

definition.demoProps = {
  action: false,
  align: 'left',
  children: 'testCell'
};

export default definition;
