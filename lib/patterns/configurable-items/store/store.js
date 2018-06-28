'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _flux = require('./../../../utils/flux');

var _store = require('./../../../utils/flux/store');

var _store2 = _interopRequireDefault(_store);

var _immutable = require('./../../../utils/helpers/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _constants = require('./../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = _immutable2.default.parseJSON({
  open: false,
  items_data: []
});

var ConfigurableItemsStore = function (_Store) {
  _inherits(ConfigurableItemsStore, _Store);

  function ConfigurableItemsStore() {
    _classCallCheck(this, ConfigurableItemsStore);

    return _possibleConstructorReturn(this, (ConfigurableItemsStore.__proto__ || Object.getPrototypeOf(ConfigurableItemsStore)).apply(this, arguments));
  }

  _createClass(ConfigurableItemsStore, [{
    key: _constants2.default.TOGGLE_CONFIGURABLE_ITEMS_DIALOG,
    value: function value() {
      this.data = this.data.set('open', !this.data.get('open'));
    }
  }, {
    key: _constants2.default.REORDER_CONFIGURABLE_ITEMS,
    value: function value(action) {
      var itemsData = this.data.get('items_data').toArray();
      var dragIndex = action.dragIndex,
          hoverIndex = action.hoverIndex;

      var dragItem = itemsData.splice(dragIndex, 1)[0];
      itemsData.splice(hoverIndex, 0, dragItem);
      this.data = this.data.set('items_data', _immutable2.default.parseJSON(itemsData));
    }
  }, {
    key: _constants2.default.UPDATE_CONFIGURABLE_ITEM,
    value: function value(action) {
      var itemsData = this.data.get('items_data');
      var updatedData = itemsData.update(action.rowIndex, function (item) {
        return item.set('enabled', !item.get('enabled'));
      });
      this.data = this.data.set('items_data', updatedData);
    }
  }, {
    key: _constants2.default.UPDATE_CONFIGURABLE_ITEMS_DATA,
    value: function value(action) {
      this.data = this.data.set('items_data', action.data);
    }
  }]);

  return ConfigurableItemsStore;
}(_store2.default);

exports.default = new ConfigurableItemsStore('configurableItemsStore', data, _flux.Dispatcher);