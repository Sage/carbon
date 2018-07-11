// definition.js
import DraggableContext from './';
import Definition from './../../../../demo/utils/definition';
import WithDragDefinition from './../with-drag/__definition__';
import WithDropDefinition from './../with-drop/__definition__';
import CustomDragLayerDefinition from './../custom-drag-layer/__definition__';

const definition = new Definition('draggable-context', DraggableContext, {
  associatedDefinitions: [WithDropDefinition, WithDragDefinition, CustomDragLayerDefinition],

  hiddenProps: ['children', 'customDragLayer', 'onDrag'],

  props: ['customDragLayer', 'onDrag'],

  propTypes: {
    customDragLayer: 'Object',
    onDrag: 'Function'
  },

  requiredProps: ['onDrag'],

  dataVariable: 'dndData',

  propValues: {
    onDrag: 'updateDndData',
    children: `<div>
    <Table tbody={false}>
      <thead>
        <TableRow as="header">
          <TableHeader />
          <TableHeader>Country</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        { buildRows() }
      </tbody>
    </Table>
  </div>`
  },

  js: `function buildRows() {
  let rows = [];

  dndData.forEach((row, index) => {
    rows.push(
      <TableRow key={ row.get('id') } uniqueID={ row.get('id') } index={ index }>
        <TableCell>{ row.get('name') }</TableCell>
      </TableRow>
    );
  });

  return rows;
}`,

  propDescriptions: {
    customDragLayer: 'Optionally provide the CustomDragLayer for the drag & drop ghost layer',
    onDrag: 'Callback function for when a draggable item is moved'
  },

  relatedComponentsNotes: `
Although the \`Table\` component has drag and drop enabled already, any combination of components can be made draggable through the use of the \`WithDrag\` and \`WithDrop\` components:

\`\`\`
<DraggableContext onDrag={ onItemMoved }>
  <ol>
    {
      items.map((item, index) => {
        return (
          <WithDrop index={ index }>
            <li>
              <WithDrag><span>{ item.content }</span></WithDrag>
            </li>
          </WithDrop>
        );
      })
    }
  </ol>
</DraggableContext>
\`\`\`
`

});

export default definition;
