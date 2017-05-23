'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slide = exports.Carousel = undefined;

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _lodash = require('lodash');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tags = require('../../utils/helpers/tags');

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _slide = require('./slide');

var _slide2 = _interopRequireDefault(_slide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Carousel: {
    displayName: 'Carousel'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/carousel/carousel.js',
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
}

var NEXT = 'next';
var PREVIOUS = 'previous';
var TRANSITION_TIME = 750;

var Carousel = _wrapComponent('Carousel')((_temp = _class = function (_React$Component) {
  _inherits(Carousel, _React$Component);

  function Carousel() {
    var _ref;

    _classCallCheck(this, Carousel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /**
     * Direction of animation
     *
     * @property transitionDirection
     */
    var _this = _possibleConstructorReturn(this, (_ref = Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call.apply(_ref, [this].concat(args)));

    _this.state = {
      selectedSlideIndex: null, // Currently selected slide
      disabled: false // Next/Previous buttons disabled state
    };
    _this.transitionDirection = NEXT;

    _this.mainClasses = _this.mainClasses.bind(_this);
    _this.onPreviousClick = _this.onPreviousClick.bind(_this);
    _this.onNextClick = _this.onNextClick.bind(_this);
    _this.onSlideSelection = _this.onSlideSelection.bind(_this);
    _this.enableButtonsAfterTimeout = _this.enableButtonsAfterTimeout.bind(_this);
    _this.previousButtonProps = _this.previousButtonProps.bind(_this);
    _this.nextButtonProps = _this.nextButtonProps.bind(_this);
    _this.numOfSlides = _this.numOfSlides.bind(_this);
    _this.visibleSlide = _this.visibleSlide.bind(_this);
    _this.slideSelector = _this.slideSelector.bind(_this);
    _this.nextClasses = _this.nextClasses.bind(_this);
    _this.previousClasses = _this.previousClasses.bind(_this);
    _this.previousButtonClasses = _this.previousButtonClasses.bind(_this);
    _this.nextButtonClasses = _this.nextButtonClasses.bind(_this);
    _this.slideSelectorClasses = _this.slideSelectorClasses.bind(_this);
    return _this;
  }

  _createClass(Carousel, [{
    key: 'componentWillMount',


    /**
     * A lifecycle method that is called after before initial render.
     * Can set up state of component without causing a re-render
     *
     * @method componentWillMount
     */
    value: function componentWillMount() {
      var selectedIndex = Number(this.props.initialSlideIndex);
      this.setState({ selectedSlideIndex: selectedIndex });
    }

    /**
     * Renders the Slide Component
     *
     * @method render
     */

  }, {
    key: 'render',
    value: function render() {
      return _react3.default.createElement(
        'div',
        _extends({ className: this.mainClasses() }, (0, _tags.tagComponent)('carousel', this.props)),
        _react3.default.createElement(
          'div',
          { className: 'carbon-carousel__content' },
          _react3.default.createElement(
            'div',
            { className: this.previousClasses() },
            _react3.default.createElement(
              'button',
              _extends({}, this.previousButtonProps(), { 'data-element': 'previous' }),
              _react3.default.createElement(_icon2.default, { className: 'carbon-carousel__previous-arrow', type: 'dropdown' })
            )
          ),
          _react3.default.createElement(
            _reactAddonsCssTransitionGroup2.default,
            {
              transitionName: 'slide-' + this.transitionDirection,
              transitionEnterTimeout: TRANSITION_TIME,
              transitionLeaveTimeout: TRANSITION_TIME
            },
            this.visibleSlide()
          ),
          _react3.default.createElement(
            'div',
            { className: this.nextClasses() },
            _react3.default.createElement(
              'button',
              _extends({}, this.nextButtonProps(), { 'data-element': 'next' }),
              _react3.default.createElement(_icon2.default, { className: 'carbon-carousel__next-arrow', type: 'dropdown' })
            )
          )
        ),
        _react3.default.createElement(
          'div',
          { className: this.slideSelectorClasses() },
          this.slideSelector()
        )
      );
    }

    /**
     * Gets the next div classes
     *
     * @method nextClasses
     */

  }, {
    key: 'nextClasses',
    value: function nextClasses() {
      return (0, _classnames2.default)('carbon-carousel__navigation', 'carbon-carousel__next');
    }

    /**
     * Gets the previous div classes
     *
     * @method previousClasses
     */

  }, {
    key: 'previousClasses',
    value: function previousClasses() {
      return (0, _classnames2.default)('carbon-carousel__navigation', 'carbon-carousel__previous');
    }

    /**
     * Gets the previous button classes
     *
     * @method previousButtonClasses
     */

  }, {
    key: 'previousButtonClasses',
    value: function previousButtonClasses() {
      return (0, _classnames2.default)('carbon-carousel__buttons', 'carbon-carousel__previous-button');
    }

    /**
     * Gets the next button classes
     *
     * @method nextButtonClasses
     */

  }, {
    key: 'nextButtonClasses',
    value: function nextButtonClasses() {
      return (0, _classnames2.default)('carbon-carousel__buttons', 'carbon-carousel__next-button');
    }

    /**
     * Gets the slide selector footer classes
     *
     * @method nextButtonClasses
     */

  }, {
    key: 'slideSelectorClasses',
    value: function slideSelectorClasses() {
      return (0, _classnames2.default)('carbon-carousel__selector');
    }

    /**
     * Handles clicking on the previous button
     *
     * @method onPreviousClick
     */

  }, {
    key: 'onPreviousClick',
    value: function onPreviousClick() {
      var newIndex = this.state.selectedSlideIndex - 1;
      if (newIndex < 0) {
        newIndex = this.numOfSlides() - 1;
      }
      this.transitionDirection = PREVIOUS;
      this.setState({ disabled: true, selectedSlideIndex: newIndex });
      this.enableButtonsAfterTimeout();
    }

    /**
     * Handles clicking on the next button
     *
     * @method onNextClick
     */

  }, {
    key: 'onNextClick',
    value: function onNextClick() {
      var newIndex = (this.state.selectedSlideIndex + 1) % this.numOfSlides();
      this.transitionDirection = NEXT;
      this.setState({ disabled: true, selectedSlideIndex: newIndex });
      this.enableButtonsAfterTimeout();
    }

    /**
     * Handles clicking slide selector
     *
     * @method onSlideSelection
     */

  }, {
    key: 'onSlideSelection',
    value: function onSlideSelection(ev) {
      var newSlideSelection = Number(ev.target.value);
      this.transitionDirection = newSlideSelection > this.state.selectedSlideIndex ? NEXT : PREVIOUS;
      this.setState({ disabled: true, selectedSlideIndex: newSlideSelection });
      this.enableButtonsAfterTimeout();
    }

    /**
     * Re-enables the next and previous buttons after timeout
     *
     * @method enableButtonsAfterTimeout
     * @return {Void}
     */

  }, {
    key: 'enableButtonsAfterTimeout',
    value: function enableButtonsAfterTimeout() {
      var _this2 = this;

      setTimeout(function () {
        _this2.setState({ disabled: false });
      }, TRANSITION_TIME);
    }

    /**
     * Gets the main classes
     *
     * @method mainClasses
     */

  }, {
    key: 'mainClasses',
    value: function mainClasses() {
      return (0, _classnames2.default)('carbon-carousel', this.props.className);
    }

    /**
     * Gets the props for the previous button
     *
     * @method previousButtonProps
     */

  }, {
    key: 'previousButtonProps',
    value: function previousButtonProps() {
      var props = {
        className: this.previousButtonClasses()
      };

      if (!this.state.disabled) {
        props.onClick = this.onPreviousClick;
      }

      return props;
    }

    /**
     * Gets the props for the next button
     *
     * @method nextButtonProps
     */

  }, {
    key: 'nextButtonProps',
    value: function nextButtonProps() {
      var props = {
        className: this.nextButtonClasses()
      };

      if (!this.state.disabled) {
        props.onClick = this.onNextClick;
      }

      return props;
    }

    /**
     * Gets the number of slides
     *
     * @method numOfSlides
     */

  }, {
    key: 'numOfSlides',
    value: function numOfSlides() {
      return Array.isArray(this.props.children) ? (0, _lodash.compact)(this.props.children).length : 1;
    }

    /**
     * Gets the currently visible slide
     *
     * @method visibleSlide
     */

  }, {
    key: 'visibleSlide',
    value: function visibleSlide() {
      var _additionalProps;

      var index = this.state.selectedSlideIndex;
      var visibleSlide = (0, _lodash.compact)(_react3.default.Children.toArray(this.props.children))[index];

      var additionalProps = (_additionalProps = {
        className: (0, _classnames2.default)('carbon-slide carbon-slide--active', visibleSlide.props.className)
      }, _defineProperty(_additionalProps, 'data-element', 'visible-slide'), _defineProperty(_additionalProps, 'key', 'carbon-slide-' + index), _additionalProps);

      return _react3.default.cloneElement(visibleSlide, (0, _lodash.assign)({}, visibleSlide.props, additionalProps));
    }

    /**
     * Renders the slideSelector footer
     *
     * @method slideSelector
     */

  }, {
    key: 'slideSelector',
    value: function slideSelector() {
      var buttons = [];

      for (var i = 0; i < this.numOfSlides(); i++) {
        buttons.push(_react3.default.createElement(
          'span',
          { className: 'carbon-carousel__selector-inputs', key: i, 'data-element': 'selector-inputs' },
          _react3.default.createElement('input', {
            disabled: this.state.disabled,
            className: 'carbon-carousel__selector-input',
            'data-element': 'selector-input',
            name: 'carousel-slide',
            id: 'carousel-slide-' + i,
            type: 'radio', value: i,
            onChange: this.onSlideSelection,
            checked: this.state.selectedSlideIndex === i
          }),
          _react3.default.createElement('label', {
            className: 'carbon-carousel__selector-label',
            'data-element': 'selector-label',
            htmlFor: 'carousel-slide-' + i
          })
        ));
      }

      return buttons;
    }
  }]);

  return Carousel;
}(_react3.default.Component), _class.propTypes = {

  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * The selected tab on page load
   *
   * @property initialSelectedTabId
   * @type {String}
   * @default firstTab
   */
  initialSlideIndex: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * Individual tabs
   *
   * @property children
   * @type {Object | Array}
   */
  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object])
}, _class.defaultProps = {
  initialSlideIndex: 0
}, _temp));

exports.Carousel = Carousel;
exports.Slide = _slide2.default;