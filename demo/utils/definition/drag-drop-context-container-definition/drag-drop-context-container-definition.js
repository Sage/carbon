import ComponentActions from './../../../actions/component';

export default (definition, component) => {
  let originalComponent = component.DecoratedComponent;
  definition.props = Object.keys(originalComponent.propTypes);

  definition.js = `
function buildRows() {
  let rows = [];

  ${definition.dataVariable}.forEach((row, index) => {
    rows.push(
      <TableRow key={ row.get('id') } uniqueID={ row.get('id') } index={ index }>
        <TableCell><Link icon="list_view" /></TableCell>
        <TableCell>{ row.get('name') }</TableCell>
        <TableCell>{ row.get('value') }</TableCell>
      </TableRow>
    );
  });

  return rows;
}`;
}
