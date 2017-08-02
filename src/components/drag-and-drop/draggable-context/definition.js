// definition.js
import DraggableContext from './';
import ComponentActions from './../../../../demo/actions/component';
import Definition from './../../../../demo/utils/definition';
import WithDragDefinition from './../with-drag/definition';
import WithDropDefinition from './../with-drop/definition';
import WithDragDropDefinition from './../with-drag-drop/definition';

let definition = new Definition('draggable-context', DraggableContext, {
  associatedDefinitions: [WithDropDefinition, WithDragDefinition, WithDragDropDefinition],

  hiddenProps: ['children', 'onDrag'],

  topLevelComponent: 'Table',

  props: ['onDrag'],

  propTypes: {
    onDrag: 'Function'
  },

  requiredProps: ['onDrag'],

  dataVariable: 'dndData',

  propValues: {
    tbody: false,
    children: `
  <DraggableContext onDrag={ updateDndData }>
    <tbody>
      { buildRows() }
    </tbody>
  </DraggableContext>`
  },

  js: `function buildRows() {
  let rows = [];

  dndData.forEach((row, index) => {
    rows.push(
      <WithDragDrop index={ index }>
        <TableRow key={ row.get('id') } uniqueID={ row.get('id') } index={ index }>
          <TableCell>{ row.get('name') }</TableCell>
        </TableRow>
      </WithDragDrop>
    );
  });

  return rows;
}`,

  propDescriptions: {
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
