'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _lodash = require('lodash');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _slide = require('./slide');

var _slide2 = _interopRequireDefault(_slide);

var NEXT = 'next';
var PREVIOUS = 'previous';
var TRANSITION_TIME = 750;

var Carousel = (function (_React$Component) {
  _inherits(Carousel, _React$Component);

  function Carousel() {
    var _this = this;

    _classCallCheck(this, Carousel);

    _get(Object.getPrototypeOf(Carousel.prototype), 'constructor', this).apply(this, arguments);

    this.transitionDirection = NEXT;
    this.state = {
      selectedSlideIndex: null, // Currently selected slide
      disabled: false // Next/Previous buttons disabled state
    };

    this.onPreviousClick = function () {
      var newIndex = _this.state.selectedSlideIndex - 1;
      if (newIndex < 0) {
        newIndex = _this.numOfSlides - 1;
      }
      _this.transitionDirection = PREVIOUS;
      _this.setState({ disabled: true, selectedSlideIndex: newIndex });
      _this.enableButtonsAfterTimeout();
    };

    this.onNextClick = function () {
      var newIndex = (_this.state.selectedSlideIndex + 1) % _this.numOfSlides;
      _this.transitionDirection = NEXT;
      _this.setState({ disabled: true, selectedSlideIndex: newIndex });
      _this.enableButtonsAfterTimeout();
    };

    this.onSlideSelection = function (ev) {
      var newSlideSelection = Number(ev.target.value);
      _this.transitionDirection = newSlideSelection > _this.state.selectedSlideIndex ? NEXT : PREVIOUS;
      _this.setState({ disabled: true, selectedSlideIndex: newSlideSelection });
      _this.enableButtonsAfterTimeout();
    };
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
      var selectedIndex = this.props.initialSlideIndex || 0;

      this.setState({ selectedSlideIndex: selectedIndex });
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
     * Handles clicking on the previous button
     *
     * @method onPreviousClick
     */
  }, {
    key: 'render',

    /**
     * Renders the Slide Component
     *
     * @method render
     */
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: this.mainClasses },
        _react2['default'].createElement(
          'div',
          { className: 'ui-carousel__content' },
          _react2['default'].createElement(
            'div',
            { className: this.previousClasses },
            _react2['default'].createElement(
              'button',
              this.previousButtonProps,
              _react2['default'].createElement(_icon2['default'], { className: 'ui-carousel__previous-arrow', type: 'dropdown' })
            )
          ),
          _react2['default'].createElement(
            _reactAddonsCssTransitionGroup2['default'],
            {
              transitionName: 'slide-' + this.transitionDirection,
              transitionEnterTimeout: TRANSITION_TIME,
              transitionLeaveTimeout: TRANSITION_TIME
            },
            this.visibleSlide
          ),
          _react2['default'].createElement(
            'div',
            { className: this.nextClasses },
            _react2['default'].createElement(
              'button',
              this.nextButtonProps,
              _react2['default'].createElement(_icon2['default'], { className: 'ui-carousel__next-arrow', type: 'dropdown' })
            )
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: this.slideSelectorClasses },
          this.slideSelector
        )
      );
    }
  }, {
    key: 'mainClasses',

    /**
     * Gets the main classes
     *
     * @method mainClasses
     */
    get: function get() {
      return (0, _classnames2['default'])('ui-carousel', this.props.className);
    }

    /**
     * Gets the next div classes
     *
     * @method nextClasses
     */
  }, {
    key: 'nextClasses',
    get: function get() {
      return (0, _classnames2['default'])('ui-carousel__navigation', 'ui-carousel__next');
    }

    /**
     * Gets the previous div classes
     *
     * @method previousClasses
     */
  }, {
    key: 'previousClasses',
    get: function get() {
      return (0, _classnames2['default'])('ui-carousel__navigation', 'ui-carousel__previous');
    }

    /**
     * Gets the previous button classes
     *
     * @method previousButtonClasses
     */
  }, {
    key: 'previousButtonClasses',
    get: function get() {
      return (0, _classnames2['default'])('ui-carousel__buttons', 'ui-carousel__previous-button');
    }

    /**
     * Gets the next button classes
     *
     * @method nextButtonClasses
     */
  }, {
    key: 'nextButtonClasses',
    get: function get() {
      return (0, _classnames2['default'])('ui-carousel__buttons', 'ui-carousel__next-button');
    }

    /**
     * Gets the slide selector footer classes
     *
     * @method nextButtonClasses
     */
  }, {
    key: 'slideSelectorClasses',
    get: function get() {
      return (0, _classnames2['default'])('ui-carousel__selector');
    }

    /**
     * Gets the props for the previous button
     *
     * @method previousButtonProps
     */
  }, {
    key: 'previousButtonProps',
    get: function get() {
      var props = {
        className: this.previousButtonClasses
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
    get: function get() {
      var props = {
        className: this.nextButtonClasses
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
    get: function get() {
      return Array.isArray(this.props.children) ? (0, _lodash.compact)(this.props.children).length : 1;
    }

    /**
     * Gets the currently visible slide
     *
     * @method visibleSlide
     */
  }, {
    key: 'visibleSlide',
    get: function get() {
      var index = this.state.selectedSlideIndex;
      var visibleSlide = (0, _lodash.compact)(_react2['default'].Children.toArray(this.props.children))[index];

      var additionalProps = {
        className: (0, _classnames2['default'])('ui-slide ui-slide--active', visibleSlide.props.className),
        key: 'ui-slide-' + index
      };

      return _react2['default'].cloneElement(visibleSlide, (0, _lodash.assign)({}, visibleSlide.props, additionalProps));
    }

    /**
     * Renders the slideSelector footer
     *
     * @method slideSelector
     */
  }, {
    key: 'slideSelector',
    get: function get() {
      var buttons = [];

      for (var i = 0; i < this.numOfSlides; i++) {
        buttons.push(_react2['default'].createElement(
          'span',
          { className: 'ui-carousel__selector-inputs', key: i },
          _react2['default'].createElement('input', {
            disabled: this.state.disabled,
            className: 'ui-carousel__selector-input',
            name: 'carousel-slide',
            id: 'carousel-slide-' + i,
            type: 'radio', value: i,
            onChange: this.onSlideSelection,
            checked: this.state.selectedSlideIndex === i
          }),
          _react2['default'].createElement('label', {
            className: 'ui-carousel__selector-label',
            htmlFor: 'carousel-slide-' + i
          })
        ));
      }

      return buttons;
    }
  }], [{
    key: 'propTypes',
    value: {

      /**
       * The selected tab on page load
       *
       * @property initialSelectedTabId
       * @type {String}
       * @default firstTab
       */
      initialSlideIndex: _react2['default'].PropTypes.number,

      /**
       * Individual tabs
       *
       * @property children
       * @type {Object | Array}
       */
      children: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.array, _react2['default'].PropTypes.object])
    },
    enumerable: true
  }]);

  return Carousel;
})(_react2['default'].Component);

exports['default'] = { Carousel: Carousel, Slide: _slide2['default'] };
module.exports = exports['default'];

/**
 * Direction of animation
 *
 * @property transitionDirection
 */

/**
 * Handles clicking on the next button
 *
 * @method onNextClick
 */

/**
 * Handles clicking slide selector
 *
 * @method onSlideSelection
 */