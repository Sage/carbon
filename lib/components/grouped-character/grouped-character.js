'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _input = require('./../../utils/decorators/input');

var _input2 = _interopRequireDefault(_input);

var _inputLabel = require('./../../utils/decorators/input-label');

var _inputLabel2 = _interopRequireDefault(_inputLabel);

var _inputValidation = require('./../../utils/decorators/input-validation');

var _inputValidation2 = _interopRequireDefault(_inputValidation);

var _events = require('./../../utils/helpers/events');

var _events2 = _interopRequireDefault(_events);

var _ether = require('./../../utils/ether');

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GroupedCharacter = (0, _input2.default)((0, _inputLabel2.default)((0, _inputValidation2.default)((_temp = _class = function (_React$Component) {
  _inherits(GroupedCharacter, _React$Component);

  function GroupedCharacter() {
    var _ref;

    _classCallCheck(this, GroupedCharacter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = GroupedCharacter.__proto__ || Object.getPrototypeOf(GroupedCharacter)).call.apply(_ref, [this].concat(args)));

    _this.adjustForSeparator = function (leftPosition) {
      return _this.isBackspaceKey() ? leftPosition : _this.lastPosition + 1;
    };

    _this.calculateMaxLength = function () {
      return (0, _lodash.sum)(_this.props.groups) + (_this.props.groups.length - 1);
    };

    _this.deleteAfterSeparator = function (value) {
      var upToSeparator = _this.sliceUpToSeparator();
      return value.slice(0, upToSeparator) + value.slice(upToSeparator + 1);
    };

    _this.deletingBeforeSeparator = function () {
      return _this.isDeleteKey() && (0, _lodash.includes)(_this.insertionIndices, _this.lastPosition);
    };

    _this.enforceMaxLength = function (value) {
      return value.slice(0, _this.maxLength);
    };

    _this.insertionIndices = function () {
      var indices = [_this.props.groups[0]];

      for (var i = 1; i < _this.props.groups.length; i++) {
        indices.push(indices[i - 1] + _this.props.groups[i] + 1);
      }
      return indices;
    };

    _this.isValidKeypress = function (ev) {
      return !_events2.default.isNumberKey(ev) && !_events2.default.isAlphabetKey(ev) && !_events2.default.isTabKey(ev) && !_events2.default.isDeleteKey(ev) && !_events2.default.isBackspaceKey(ev) && !_events2.default.isNavigationKey(ev);
    };

    _this.removeSeparators = function (value) {
      return value.replace(/\W/g, '');
    };

    _this.separatorsNotNeeded = function (plainValue) {
      return plainValue.length < _this.insertionIndices[0];
    };

    _this.setVisibleValue = function (plainValue) {
      // return early if no separators needed yet
      if (_this.separatorsNotNeeded(plainValue)) {
        return plainValue;
      }

      var valueWithSeparators = (0, _ether.insertAt)(plainValue, { insertionIndices: _this.insertionIndices, separator: _this.props.separator });
      // ensure extra characters removed e.g. if long value pasted in field
      return _this.enforceMaxLength(valueWithSeparators);
    };

    _this.state = {};
    _this.state.value = _this.props.value;
    _this.maxLength = _this.calculateMaxLength();
    _this.insertionIndices = _this.insertionIndices();
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.getCursorPosition = _this.getCursorPosition.bind(_this);
    _this.getNewPosition = _this.getNewPosition.bind(_this);
    _this.sliceUpToSeparator = _this.sliceUpToSeparator.bind(_this);
    _this.getPlainValue = _this.getPlainValue.bind(_this); // value without separators
    _this.lastPosition = 0; // last position of cursor 1-indexed
    _this.keyPressed = { which: null }; // track key pressed outside of React synthetic event
    return _this;
  }

  _createClass(GroupedCharacter, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var newPosition = this.getCursorPosition();
      this._input.setSelectionRange(newPosition, newPosition);
    }

    // delete value after separator

  }, {
    key: 'getCursorPosition',


    // Handle placement of cursor after updating value
    value: function getCursorPosition() {
      // Leave cursor in place if deleting
      if (this.isDeleteKey()) {
        return this.lastPosition;
      }
      return this.getNewPosition();
    }
  }, {
    key: 'getNewPosition',
    value: function getNewPosition() {
      var leftPosition = this.lastPosition - 1;
      // adjust position for presence of separator
      if ((0, _lodash.includes)(this.insertionIndices, leftPosition)) {
        // move cursor 1 space left if backspacing character
        return this.adjustForSeparator(leftPosition);
      }
      return this.lastPosition;
    }
  }, {
    key: 'getPlainValue',
    value: function getPlainValue(ev) {
      var plainValue = this.removeSeparators(ev.target.value);

      // Handle deleting to the left of a separator
      if (this.deletingBeforeSeparator()) {
        plainValue = this.deleteAfterSeparator(plainValue);
      }
      return plainValue;
    }

    // Get indices at which to insert separator

  }, {
    key: 'isBackspaceKey',
    value: function isBackspaceKey() {
      return _events2.default.isBackspaceKey(this.keyPressed);
    }
  }, {
    key: 'isDeleteKey',
    value: function isDeleteKey() {
      return _events2.default.isDeleteKey(this.keyPressed);
    }

    // update value with separators and truncate value if beyond max length

  }, {
    key: 'sliceUpToSeparator',


    // gets value up to separator for current group
    value: function sliceUpToSeparator() {
      var upToSeparator = 1;

      for (var i = 0; i < this.insertionIndices.length; i++) {
        if (this.lastPosition < this.insertionIndices[i + 1]) {
          upToSeparator = this.lastPosition - i;
          break;
        }
      }
      return upToSeparator;
    }
  }, {
    key: 'onChange',
    value: function onChange(ev) {
      this.lastPosition = ev.target.selectionEnd;

      var plainValue = this.getPlainValue(ev),
          visibleValue = this.setVisibleValue(plainValue);

      this.setState({ value: visibleValue });
      this._hidden.value = plainValue;
      this._handleOnChange({ target: this._hidden });
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(ev) {
      // React performs event pooling so can't store event for later reuse easily.
      this.keyPressed = { which: ev.which };
      if (this.isValidKeypress(ev)) {
        ev.preventDefault();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        _extends({ className: this.mainClasses }, (0, _tags2.default)('grouped-character', this.props)),
        this.labelHTML,
        this.inputHTML,
        _react2.default.createElement('input', this.hiddenInputProps),
        this.validationHTML,
        this.fieldHelpHTML
      );
    }
  }, {
    key: 'inputProps',
    get: function get() {
      var _validProps = (0, _ether.validProps)(this),
          props = _objectWithoutProperties(_validProps, []);

      props.className = this.inputClasses;
      props.onChange = this.onChange;
      props.maxLength = this.maxLength;
      props.onKeyDown = this.onKeyDown;
      props.style = { width: this.props.inputWidth + 'px' };
      props.value = this.state.value;
      return props;
    }
  }, {
    key: 'hiddenInputProps',
    get: function get() {
      var _this2 = this;

      return {
        value: this.props.value,
        ref: function ref(c) {
          _this2._hidden = c;
        },
        type: 'hidden',
        readOnly: true,
        'data-element': 'hidden-input'
      };
    }
  }, {
    key: 'mainClasses',
    get: function get() {
      return (0, _classnames2.default)(this.props.className, 'carbon-grouped-character');
    }
  }, {
    key: 'inputClasses',
    get: function get() {
      return 'carbon-grouped-character__input';
    }
  }]);

  return GroupedCharacter;
}(_react2.default.Component), _class.propTypes = {
  /**
   * A custom class name for the component.
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  groups: _propTypes2.default.array.isRequired, // an array of  group sizes
  inputWidth: _propTypes2.default.string, // pixel value that sets inputWidth
  separator: function separator(props, propName, componentName) {
    // a separator character to insert between number groups
    if (props[propName].length > 1 || typeof props[propName] !== 'string') {
      return new Error('Invalid prop ' + propName + ' supplied to ' + componentName + '. Must be string of length 1.');
    }
    return null;
  },

  /**
   * The value of the Input
   *
   * @property value
   * @type {String}
   */
  value: _propTypes2.default.string
}, _class.defaultProps = {
  separator: '-',
  value: ''
}, _temp))));

exports.default = GroupedCharacter;