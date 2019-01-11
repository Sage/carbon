'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Defines the string types of items that can be dragged and dropped.
 *
 * NB drag sources and drop targets only interact if they have the
 * same string type.
 */
var ItemTypes = {
  getItemType: function getItemType(props) {
    return props.identifier || 'defaultDragAndDropIdentifier';
  }
};

exports.default = ItemTypes;