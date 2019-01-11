'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tableHeader = require('../table-header');

var _tableHeader2 = _interopRequireDefault(_tableHeader);

require('./table-subheader.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A TableSubheader widget.
 * An extension of the TableHeader class which caters for differences in styling.
 */
var TableSubheader = function (_TableHeader) {
  _inherits(TableSubheader, _TableHeader);

  function TableSubheader() {
    _classCallCheck(this, TableSubheader);

    return _possibleConstructorReturn(this, (TableSubheader.__proto__ || Object.getPrototypeOf(TableSubheader)).apply(this, arguments));
  }

  _createClass(TableSubheader, [{
    key: 'tableHeaderClasses',

    /**
     * Returns classes to be used on the TH element.
     *
     * @method tableHeaderClasses
     * @return {String}
     */
    value: function tableHeaderClasses() {
      return (0, _classnames2.default)('carbon-table-subheader', _get(TableSubheader.prototype.__proto__ || Object.getPrototypeOf(TableSubheader.prototype), 'tableHeaderClasses', this).call(this));
    }
  }, {
    key: 'componentTags',
    value: function componentTags(props) {
      return {
        'data-component': 'table-sub-header',
        'data-element': props['data-element'],
        'data-role': props['data-role']
      };
    }
  }]);

  return TableSubheader;
}(_tableHeader2.default);

exports.default = TableSubheader;