/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_button = require('./../../button');

/*istanbul ignore next*/
var _button2 = _interopRequireDefault(_button);

var /*istanbul ignore next*/_icon = require('./../../icon');

/*istanbul ignore next*/
var _icon2 = _interopRequireDefault(_icon);

var /*istanbul ignore next*/_i18nJs = require('i18n-js');

/*istanbul ignore next*/
var _i18nJs2 = _interopRequireDefault(_i18nJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Step widget.
 * This widget is part of MultiStepWizard and it is a wrapper for a step element that is passed to MultiStepWizard.
 *
 * == How to use a Step Widget in a component:
 *  See MultiStepWizard widget
 *
 * @class Step
 * @constructor
 */

var Step = function (_React$Component) {
  _inherits(Step, _React$Component);

  function Step() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Step);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Step)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleOnSubmit = function () {
      /*istanbul ignore next*/_this.wizard.complete();
      /*istanbul ignore next*/_this.wizard.submitHandler();
    }, _this.handleOnNext = function () {
      if ( /*istanbul ignore next*/_this.props.defaultButton) {
        /*istanbul ignore next*/_this.wizard.next();
      }
    }, _this.handleOnBack = function () {
      if ( /*istanbul ignore next*/_this.props.defaultButton) {
        /*istanbul ignore next*/_this.wizard.back();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Completes the step's wizard and triggers the custom submit event handler of the step's wizard
   *
   * @method handleOnSubmit
   * @return {void}
   */


  /**
   * Triggers the custom next event handler of the step's wizard
   *
   * @method handleOnNext
   * @return {void}
   */


  /**
   * Triggers the custom back event handler of the step's wizard
   *
   * @method handleOnBack
   * @return {void}
   */


  _createClass(Step, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      var content = /*istanbul ignore next*/void 0;

      if (this.wizard) {
        content = /*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.mainClasses },
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: 'multi-step-wizard-step__indicator-bar ' + this.indicatorStatus },
            /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/'div', /*istanbul ignore next*/{ className: 'multi-step-wizard-step__indicator-background' })
          ),
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: 'multi-step-wizard-step__indicator-icon' },
            /*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/'div',
              /*istanbul ignore next*/{ className: 'multi-step-wizard-step__indicator-placeholder' },
              /*istanbul ignore next*/_react2.default.createElement(
                /*istanbul ignore next*/'div',
                /*istanbul ignore next*/{ className: 'multi-step-wizard-step__indicator-icon__content ' + this.indicatorStatus },
                this.indicatorHTML
              )
            )
          ),
          this.stepHTML
        );
      } else {
        content = /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/'div', /*istanbul ignore next*/{ className: 'multi-step-wizard-step--none' });
      }

      return content;
    }
  }, {
    key: 'wizard',


    /**
     * Gets the step's wizard
     *
     * @method wizard
     * @return {Object}
     */
    get: function get() {
      return this.context.wizard;
    }

    /**
     * Gets the current step number
     *
     * @method currentStepNumber
     * @return {Number}
     */

  }, {
    key: 'currentStepNumber',
    get: function get() {
      return this.wizard.currentStep;
    }

    /**
     * Checks if the step is the first step
     *
     * @method isFirstStep
     * @return {Boolean}
     */

  }, {
    key: 'isFirstStep',
    get: function get() {
      return this.props.stepNumber === 1;
    }

    /**
     * Checks if the step is the last step
     *
     * @method isLastStep
     * @return {Boolean}
     */

  }, {
    key: 'isLastStep',
    get: function get() {
      return this.props.stepNumber === this.wizard.totalSteps;
    }

    /**
     * Checks if step component should be disabled.
     *
     * @method stepDisabled
     * @return {Boolean}
     */

  }, {
    key: 'stepDisabled',
    get: function get() {
      if (this.wizard.enableInactiveSteps) {
        return false;
      }
      return this.props.stepNumber !== this.currentStepNumber;
    }

    /**
     * Checks if step has been processed.
     *
     * @method stepProcessed
     * @return {Boolean}
     */

  }, {
    key: 'stepProcessed',
    get: function get() {
      if (this.isLastStep) {
        return this.stepsCompleted;
      } else {
        return this.props.stepNumber < this.currentStepNumber;
      }
    }

    /**
     * Checks if all steps are completed
     *
     * @method stepsCompleted
     * @return {Boolean}
     */

  }, {
    key: 'stepsCompleted',
    get: function get() {
      return this.wizard.completed === true;
    }

    /**
     * Returns the computed HTML for the step.
     *
     * @method stepHTML
     * @return {Object} JSX
     */

  }, {
    key: 'stepHTML',
    get: function get() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: 'multi-step-wizard-step__content' },
          this.props.children,
          this.buttonHTML
        )
      );
    }

    /**
     * Returns the computed HTML for the buttons.
     *
     * @method buttonHTML
     * @return {Object} JSX
     */

  }, {
    key: 'buttonHTML',
    get: function get() {
      if (this.props.defaultButton) {
        var nextButton = /*istanbul ignore next*/void 0,
            backButton = /*istanbul ignore next*/void 0,
            submitButton = /*istanbul ignore next*/void 0;

        if (this.isLastStep) {
          submitButton = /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/_button2.default,
            /*istanbul ignore next*/{ onClick: this.handleOnSubmit, className: 'multi-step-wizard-step__button submit' },
            /*istanbul ignore next*/_i18nJs2.default.t('wizards.multi_step_wizard.buttons.submit', { defaultValue: 'Submit' })
          );
        } else {
          nextButton = /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/_button2.default,
            /*istanbul ignore next*/{ onClick: this.handleOnNext, className: 'multi-step-wizard-step__button next' },
            /*istanbul ignore next*/_i18nJs2.default.t('wizards.multi_step_wizard.buttons.next', { defaultValue: 'Next' })
          );
        }

        if (!this.isFirstStep) {
          backButton = /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/_button2.default,
            /*istanbul ignore next*/{ onClick: this.handleOnBack, className: 'multi-step-wizard-step__button back' },
            /*istanbul ignore next*/_i18nJs2.default.t('wizards.multi_step_wizard.buttons.back', { defaultValue: 'Back' })
          );
        }

        return (/*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: 'multi-step-wizard-step__buttons' },
            nextButton,
            submitButton,
            backButton,
            this.extraButtonHTML
          )
        );
      } else {
        return this.extraButtonHTML;
      }
    }

    /**
     * Returns the computed HTML for the step indicator.
     *
     * @method indicatorHTML
     * @return {Object} JSX
     */

  }, {
    key: 'indicatorHTML',
    get: function get() {
      if (this.stepProcessed) {
        return (/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ type: 'white-tick', className: 'multi-step-wizard-step__white-tick' })
        );
      } else {
        return (/*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/null,
            this.props.stepNumber
          )
        );
      }
    }

    /**
     * Returns the step indicator status.
     *
     * @method indicatorStatus
     * @return {Boolean}
     */

  }, {
    key: 'indicatorStatus',
    get: function get() {
      if (this.stepProcessed) {
        return 'processed';
      } else {
        return 'pending';
      }
    }

    /**
     * Returns the computed HTML for the extra buttons.
     *
     * @method extraButtonHTML
     * @return {Object} JSX
     */

  }, {
    key: 'extraButtonHTML',
    get: function get() {
      var extraButtons = this.props.extraButtons || [];

      return extraButtons.map(function (button, index) {
        return (/*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'span',
            /*istanbul ignore next*/{ key: index },
            button
          )
        );
      });
    }

    /**
     * Main class getter
     *
     * @method mainClasses
     * @return {String}
     */

  }, {
    key: 'mainClasses',
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('multi-step-wizard-step', 'multi-step-wizard-step-' + this.props.stepNumber, 'multi-step-wizard-step--' + this.indicatorStatus, { 'multi-step-wizard-step--disabled': this.stepDisabled,
          'multi-step-wizard-step--pending--disabled': this.stepDisabled && this.indicatorStatus === 'pending',
          'multi-step-wizard-step--processed--disabled': this.stepDisabled && this.indicatorStatus === 'processed',
          'multi-step-wizard-step-final': this.isLastStep }, this.props.className)
      );
    }
  }]);

  return Step;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/Step.propTypes = {
  /**
   * Step number
   *
   * @property stepNumber
   * @type {Number}
   */
  stepNumber: /*istanbul ignore next*/_react2.default.PropTypes.number.isRequired,

  /**
   * Determines if the step renders default buttons
   *
   * @property defaultButton
   * @type {Boolean}
   * @default true
   */
  defaultButton: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * Additional buttons
   *
   * @property extraButtons
   * @type {Array}
   */
  extraButtons: /*istanbul ignore next*/_react2.default.PropTypes.arrayOf( /*istanbul ignore next*/_react2.default.PropTypes.object)
};
/*istanbul ignore next*/Step.defaultProps = {
  defaultButton: true
};
/*istanbul ignore next*/Step.contextTypes = {
  wizard: /*istanbul ignore next*/_react2.default.PropTypes.object
};
/*istanbul ignore next*/exports.default = Step;