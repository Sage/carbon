import Immutable from 'immutable';

function insertRowIDs(js) {
  js = js.map((obj) => {
    if (obj.id) {
      obj['_row_id'] = obj.id;
    } else {
      obj['_row_id'] = ImmutableHelper.guid();
    }

    return obj;
  });

  return js;
};

var ImmutableHelper = {
  guid: () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  },

  parseJSON: (js) => {
    if (typeof js !== 'object' || js === null) {
      return js;
    } else {
      if (Array.isArray(js)) { 
        js = insertRowIDs(js);
        return Immutable.Seq(js).map(ImmutableHelper.parseJSON).toList();
      } else {
        return Immutable.Seq(js).map(ImmutableHelper.parseJSON).toOrderedMap();
      }
    }
  },

  getLineItemIndex: (line_items, _row_id) => {
    return line_items.findIndex((item) => { 
      return item.get("_row_id") === _row_id; 
    });
  },

  parseLineItemAttributeName: (name) => {
    return name.match(/[^[\]]+(?=])/g)[2];
  },

  updateLineItem: (keys, value) => {
    var data = keys[0],
        line_item_key = keys[1],
        _row_id = keys[2],
        attribute = ImmutableHelper.parseLineItemAttributeName(keys[3]),
        line_items = data.get(line_item_key);

    var index = ImmutableHelper.getLineItemIndex(line_items, _row_id);

    if (index < 0) {
      // handle creating placeholder
      index = line_items.size;
      data = data.setIn([line_item_key, index, "_row_id"], _row_id)
    }

    return data.setIn([line_item_key, index, attribute], value);
  },

  deleteLineItem: (keys) => {
    var data = keys[0],
        line_item_key = keys[1],
        _row_id = keys[2],
        line_items = data.get(line_item_key);

    var index = ImmutableHelper.getLineItemIndex(line_items, _row_id);

    return data.deleteIn([line_item_key, index]);
  }

};

export default ImmutableHelper;
