/**
 * Defines the string types of items that can be dragged and dropped.
 *
 * NB drag sources and drop targets only interact if they have the
 * same string type.
 */
const ItemTypes = {
  getItemType: (props) => {
    return props.identifier || 'defaultDragAndDropIdentifier'
  }
};

export default ItemTypes;
