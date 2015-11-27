import Immutable from 'immutable';

/**
* A private method used to insert row ids into arrays. The row ids are injected into
* objects that are part of an array - they are used to identify the object within the
* array and to allow for easier lookup of particular objects.
*
* For example, an action from an InputGrid component may dispatch that a line item
* with a row id of 15 has been updated. We can then use the ImmutableHelper methods
* to find the correct object in the array using this row id.
*
* We add the row ids through the `ImmutableHelper.parseJSON` function.
*
* @object insertRowIDs
* @param {object} js
* @private
*/
function insertRowIDs(js) {
  // maps the array with the following transformer
  js = js.map((obj) => {
    if (typeof obj === 'object') {
      if (obj.id) {
        // if the object has an ID - use that
        obj['_row_id'] = obj.id;
      } else {
        // if the object does not have an ID - generate a random guid
        obj['_row_id'] = ImmutableHelper.guid();
      }
    }

    return obj;
  });

  return js;
}

/**
* Immutable Helper
*
* Provides helper methods for working with immutable data.
*
* @object ImmutableHelper
* @param {String} name
* @param {Object} form
*/
var ImmutableHelper = {

  /**
  * Parses a regular JSON object into an Immutable data object, mapping the data
  * correctly and applying custom transforms to make the data easier to work with.
  *
  * @method parseJSON
  * @param {Object} js
  */
  parseJSON: (js) => {
    if (typeof js !== 'object' || js === null) {
      // if the js is not an object, or is null then just return it
      return js;
    } else {
      if (Array.isArray(js)) {
        // if the js is an array, check if we should add row ids to its children
        js = insertRowIDs(js);
        // create the immutable object
        return Immutable.Seq(js).map(ImmutableHelper.parseJSON).toList();
      } else {
        // create the immutable object
        return Immutable.Seq(js).map(ImmutableHelper.parseJSON).toOrderedMap();
      }
    }
  },

  /**
  * This works pretty much the same as the regular `setIn` method provided by
  * Immutable.js - however it will take a row id as a key instead of the index in
  * the array.
  *
  * The keys should match:
  *   * the data
  *   * the key for the line items within that data
  *   * the id for the row within that data
  *   * the input name you want to update
  *
  * eg. `ImmutableHelper.updateLineItem([this.data, 'line_items', 5, 'attr'], 'foo');
  *
  * @method updateLineItem
  * @param {Array} keys
  * @param {String} value
  */
  updateLineItem: (keys, value) => {
    var data = keys[0],
        line_item_key = keys[1],
        _row_id = keys[2],
        // as we modify the input name to use brackets (eg `user[foo][bar]`),
        // this will find the attribute name from that string (eg `bar`)
        attribute = ImmutableHelper.parseLineItemAttribute(keys[3], 2),
        line_items = data.get(line_item_key);

    var index = ImmutableHelper.getLineItemIndex(line_items, _row_id);

    if (index < 0) {
      // this will initialize the placeholder as a real row, by giving it an
      // actual `_row_id`
      index = line_items.size;
      data = data.setIn([line_item_key, index, "_row_id"], _row_id);
    }

    return data.setIn([line_item_key, index, attribute], value);
  },

  /**
  * This works pretty much the same as the regular `deleteIn` method provided by
  * Immutable.js - however it will take a row id as a key instead of the index in
  * the array.
  *
  * The keys should match:
  *   * the data
  *   * the key for the line items within that data
  *   * the id for the row within that data
  *
  * eg. `ImmutableHelper.deleteLineItem([this.data, 'line_items', 5]);
  *
  * @method deleteLineItem
  * @param {Array} keys
  */
  deleteLineItem: (keys) => {
    var data = keys[0],
        line_item_key = keys[1],
        _row_id = keys[2],
        line_items = data.get(line_item_key);

    var index = ImmutableHelper.getLineItemIndex(line_items, _row_id);

    return index > -1 ? data.deleteIn([line_item_key, index]) : data;
  },

  /**
  * Generates a random guid, useful for creating unique IDs.
  *
  * @method guid
  */
  guid: () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  },

  /**
  * Uses the row id to find the index of the object within the array.
  *
  * @method getLineItemIndex
  * @param {Array} line_items
  * @param {Number} _row_id
  */
  getLineItemIndex: (line_items, _row_id) => {
    return line_items.findIndex((item) => {
      return item.get("_row_id") === _row_id;
    });
  },

  /**
  * Given a string such as foo[bar][qux] we want to get the attribute name in the
  * 2nd set of brackets, we would call this function with an index of 1.
  *
  * @method parseLineItemAttribute
  * @param {String} name
  * @param {Number} index
  */
  parseLineItemAttribute: (name, index) => {
    return name.match(/[^[\]]+(?=])/g)[index];
  }

};

export default ImmutableHelper;
