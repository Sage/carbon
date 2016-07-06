/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slide = exports.Carousel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

/*istanbul ignore next*/
var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var /*istanbul ignore next*/_lodash = require('lodash');

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_icon = require('./../icon');

/*istanbul ignore next*/
var _icon2 = _interopRequireDefault(_icon);

var /*istanbul ignore next*/_slide = require('./slide');

/*istanbul ignore next*/
var _slide2 = _interopRequireDefault(_slide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NEXT = 'next';
var PREVIOUS = 'previous';
var TRANSITION_TIME = 750;

/*istanbul ignore next*/
var Carousel = function (_React$Component) {
  _inherits(Carousel, _React$Component);

  function Carousel() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Carousel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Carousel)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.transitionDirection = NEXT, _this.state = {
      selectedSlideIndex: null, // Currently selected slide
      disabled: false // Next/Previous buttons disabled state
    }, _this.onPreviousClick = function () {
      var newIndex = /*istanbul ignore next*/_this.state.selectedSlideIndex - 1;
      if (newIndex < 0) {
        newIndex = /*istanbul ignore next*/_this.numOfSlides - 1;
      }
      /*istanbul ignore next*/_this.transitionDirection = PREVIOUS;
      /*istanbul ignore next*/_this.setState({ disabled: true, selectedSlideIndex: newIndex });
      /*istanbul ignore next*/_this.enableButtonsAfterTimeout();
    }, _this.onNextClick = function () {
      var newIndex = ( /*istanbul ignore next*/_this.state.selectedSlideIndex + 1) % /*istanbul ignore next*/_this.numOfSlides;
      /*istanbul ignore next*/_this.transitionDirection = NEXT;
      /*istanbul ignore next*/_this.setState({ disabled: true, selectedSlideIndex: newIndex });
      /*istanbul ignore next*/_this.enableButtonsAfterTimeout();
    }, _this.onSlideSelection = function (ev) {
      var newSlideSelection = Number(ev.target.value);
      /*istanbul ignore next*/_this.transitionDirection = newSlideSelection > /*istanbul ignore next*/_this.state.selectedSlideIndex ? NEXT : PREVIOUS;
      /*istanbul ignore next*/_this.setState({ disabled: true, selectedSlideIndex: newSlideSelection });
      /*istanbul ignore next*/_this.enableButtonsAfterTimeout();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Direction of animation
   *
   * @property transitionDirection
   */


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
      /*istanbul ignore next*/
      var _this2 = this;

      setTimeout(function () {
        /*istanbul ignore next*/_this2.setState({ disabled: false });
      }, TRANSITION_TIME);
    }

    /**
     * Handles clicking on the previous button
     *
     * @method onPreviousClick
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

  }, {
    key: 'render',


    /**
     * Renders the Slide Component
     *
     * @method render
     */
    value: function render() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.mainClasses },
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: 'ui-carousel__content' },
            /*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/'div',
              /*istanbul ignore next*/{ className: this.previousClasses },
              /*istanbul ignore next*/_react2.default.createElement(
                /*istanbul ignore next*/'button',
                this.previousButtonProps,
                /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ className: 'ui-carousel__previous-arrow', type: 'dropdown' })
              )
            ),
            /*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/_reactAddonsCssTransitionGroup2.default,
              /*istanbul ignore next*/{
                transitionName: /*istanbul ignore next*/'slide-' + this.transitionDirection,
                transitionEnterTimeout: TRANSITION_TIME,
                transitionLeaveTimeout: TRANSITION_TIME
              },
              this.visibleSlide
            ),
            /*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/'div',
              /*istanbul ignore next*/{ className: this.nextClasses },
              /*istanbul ignore next*/_react2.default.createElement(
                /*istanbul ignore next*/'button',
                this.nextButtonProps,
                /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ className: 'ui-carousel__next-arrow', type: 'dropdown' })
              )
            )
          ),
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: this.slideSelectorClasses },
            this.slideSelector
          )
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
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-carousel', this.props.className)
      );
    }

    /**
     * Gets the next div classes
     *
     * @method nextClasses
     */

  }, {
    key: 'nextClasses',
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-carousel__navigation', 'ui-carousel__next')
      );
    }

    /**
     * Gets the previous div classes
     *
     * @method previousClasses
     */

  }, {
    key: 'previousClasses',
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-carousel__navigation', 'ui-carousel__previous')
      );
    }

    /**
     * Gets the previous button classes
     *
     * @method previousButtonClasses
     */

  }, {
    key: 'previousButtonClasses',
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-carousel__buttons', 'ui-carousel__previous-button')
      );
    }

    /**
     * Gets the next button classes
     *
     * @method nextButtonClasses
     */

  }, {
    key: 'nextButtonClasses',
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-carousel__buttons', 'ui-carousel__next-button')
      );
    }

    /**
     * Gets the slide selector footer classes
     *
     * @method nextButtonClasses
     */

  }, {
    key: 'slideSelectorClasses',
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-carousel__selector')
      );
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
      return Array.isArray(this.props.children) ? /*istanbul ignore next*/(0, _lodash.compact)(this.props.children).length : 1;
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
      var visibleSlide = /*istanbul ignore next*/(0, _lodash.compact)( /*istanbul ignore next*/_react2.default.Children.toArray(this.props.children))[index];

      var additionalProps = {
        className: /*istanbul ignore next*/(0, _classnames2.default)('ui-slide ui-slide--active', visibleSlide.props.className),
        key: /*istanbul ignore next*/'ui-slide-' + index
      };

      return (/*istanbul ignore next*/_react2.default.cloneElement(visibleSlide, /*istanbul ignore next*/(0, _lodash.assign)({}, visibleSlide.props, additionalProps))
      );
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
        buttons.push( /*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'span',
          /*istanbul ignore next*/{ className: 'ui-carousel__selector-inputs', key: i },
          /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/'input', /*istanbul ignore next*/{
            disabled: this.state.disabled,
            className: 'ui-carousel__selector-input',
            name: 'carousel-slide',
            id: /*istanbul ignore next*/'carousel-slide-' + i,
            type: 'radio', value: i,
            onChange: this.onSlideSelection,
            checked: this.state.selectedSlideIndex === i
          }),
          /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/'label', /*istanbul ignore next*/{
            className: 'ui-carousel__selector-label',
            htmlFor: /*istanbul ignore next*/'carousel-slide-' + i
          })
        ));
      }

      return buttons;
    }
  }]);

  return Carousel;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/Carousel.propTypes = {

  /**
   * The selected tab on page load
   *
   * @property initialSelectedTabId
   * @type {String}
   * @default firstTab
   */
  initialSlideIndex: /*istanbul ignore next*/_react2.default.PropTypes.number,

  /**
   * Individual tabs
   *
   * @property children
   * @type {Object | Array}
   */
  children: /*istanbul ignore next*/_react2.default.PropTypes.oneOfType([/*istanbul ignore next*/_react2.default.PropTypes.array, /*istanbul ignore next*/_react2.default.PropTypes.object])
};
/*istanbul ignore next*/exports.Carousel = Carousel;
/*istanbul ignore next*/exports.Slide = _slide2.default;