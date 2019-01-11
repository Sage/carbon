'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _definition = require('./../../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

var _definition__ = require('./../with-drag/__definition__');

var _definition__2 = _interopRequireDefault(_definition__);

var _definition__3 = require('./../with-drop/__definition__');

var _definition__4 = _interopRequireDefault(_definition__3);

var _definition__5 = require('./../custom-drag-layer/__definition__');

var _definition__6 = _interopRequireDefault(_definition__5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = new _definition2.default('draggable-context', _2.default, {
  associatedDefinitions: [_definition__4.default, _definition__2.default, _definition__6.default],

  hiddenProps: ['children', 'customDragLayer', 'onDrag'],

  props: ['customDragLayer', 'onDrag', 'autoScroll'],

  propTypes: {
    customDragLayer: 'Object',
    onDrag: 'Function',
    autoScroll: 'Boolean'
  },

  requiredProps: ['onDrag'],

  dataVariable: 'dndData',

  propValues: {
    onDrag: 'updateDndData',
    autoScroll: 'true',
    children: '<div>\n    <Table tbody={false}>\n      <thead>\n        <TableRow as="header">\n          <TableHeader />\n          <TableHeader>Country</TableHeader>\n        </TableRow>\n      </thead>\n      <tbody>\n        { buildRows() }\n      </tbody>\n    </Table>\n  </div>'
  },

  js: 'function buildRows() {\n  let rows = [];\n\n  dndData.forEach((row, index) => {\n    rows.push(\n      <TableRow key={ row.get(\'id\') } uniqueID={ row.get(\'id\') } index={ index }>\n        <TableCell>{ row.get(\'name\') }</TableCell>\n      </TableRow>\n    );\n  });\n\n  return rows;\n}',

  propDescriptions: {
    customDragLayer: 'Optionally provide the CustomDragLayer for the drag & drop ghost layer',
    onDrag: 'Callback function for when a draggable item is moved',
    autoScroll: 'Optionally provide the auto scroll functionality when dragging'
  },

  relatedComponentsNotes: '\nAlthough the `Table` component has drag and drop enabled already, any combination of components can be made draggable through the use of the `WithDrag` and `WithDrop` components:\n\n```\n<DraggableContext onDrag={ onItemMoved }>\n  <ol>\n    {\n      items.map((item, index) => {\n        return (\n          <WithDrop index={ index }>\n            <li>\n              <WithDrag><span>{ item.content }</span></WithDrag>\n            </li>\n          </WithDrop>\n        );\n      })\n    }\n  </ol>\n</DraggableContext>\n```\n'

}); // definition.js
exports.default = definition;