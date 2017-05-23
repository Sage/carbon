'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button = require('./../../button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('./../../icon');

var _icon2 = _interopRequireDefault(_icon);

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Step: {
    displayName: 'Step'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/multi-step-wizard/step/step.js',
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
}

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
var Step = _wrapComponent('Step')((_temp2 = _class = function (_React$Component) {
  _inherits(Step, _React$Component);

  function Step() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Step);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Step.__proto__ || Object.getPrototypeOf(Step)).call.apply(_ref, [this].concat(args))), _this), _this.handleOnSubmit = function (ev) {
      var valid = true;
      if (_this.wizard.beforeSubmitValidation) {
        valid = _this.wizard.beforeSubmitValidation(ev, _this.currentStepNumber);
      }

      if (valid === true) {
        _this.wizard.complete();
        _this.wizard.submitHandler(ev);
      }
    }, _this.handleOnNext = function (ev) {
      if (_this.props.onNext) {
        _this.props.onNext(ev, _this.currentStepNumber);
      } else {
        _this.wizard.next();
      }
    }, _this.handleOnBack = function (ev) {
      if (_this.props.onBack) {
        _this.props.onBack(ev, _this.currentStepNumber);
      } else {
        _this.wizard.back();
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
      var content = void 0;

      if (this.wizard) {
        content = _react3.default.createElement(
          'div',
          { className: this.mainClasses },
          _react3.default.createElement(
            'div',
            { className: 'multi-step-wizard-step__indicator-bar ' + this.indicatorStatus },
            _react3.default.createElement('div', { className: 'multi-step-wizard-step__indicator-background' })
          ),
          _react3.default.createElement(
            'div',
            { className: 'multi-step-wizard-step__indicator-icon' },
            _react3.default.createElement(
              'div',
              { className: 'multi-step-wizard-step__indicator-placeholder' },
              _react3.default.createElement(
                'div',
                { className: 'multi-step-wizard-step__indicator-icon__content ' + this.indicatorStatus },
                this.indicatorHTML
              )
            )
          ),
          this.stepHTML
        );
      } else {
        content = _react3.default.createElement('div', { className: 'multi-step-wizard-step--none' });
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
      if (this.wizard.enableInactiveSteps || this.props.enabled) {
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
      return _react3.default.createElement(
        'div',
        { className: 'multi-step-wizard-step__content' },
        this.props.children,
        this.buttonHTML
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
      if (this.props.defaultButton === false) {
        return this.extraButtonHTML;
      } else {
        var nextButton = void 0,
            backButton = void 0,
            submitButton = void 0;

        if (this.isLastStep) {
          submitButton = _react3.default.createElement(
            _button2.default,
            {
              as: 'primary',
              className: 'multi-step-wizard-step__button submit',
              'data-element': 'submit',
              onClick: this.handleOnSubmit
            },
            _i18nJs2.default.t('wizards.multi_step_wizard.buttons.submit', { defaultValue: 'Submit' })
          );
        } else {
          nextButton = _react3.default.createElement(
            _button2.default,
            {
              as: 'primary',
              className: 'multi-step-wizard-step__button next',
              'data-element': 'next',
              onClick: this.handleOnNext
            },
            _i18nJs2.default.t('wizards.multi_step_wizard.buttons.next', { defaultValue: 'Next' })
          );
        }

        if (!this.isFirstStep) {
          backButton = _react3.default.createElement(
            _button2.default,
            {
              className: 'multi-step-wizard-step__button back',
              'data-element': 'back',
              onClick: this.handleOnBack
            },
            _i18nJs2.default.t('wizards.multi_step_wizard.buttons.back', { defaultValue: 'Back' })
          );
        }

        return _react3.default.createElement(
          'div',
          { className: 'multi-step-wizard-step__buttons' },
          nextButton,
          submitButton,
          backButton,
          this.extraButtonHTML
        );
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
        return _react3.default.createElement(_icon2.default, { type: 'white-tick', className: 'multi-step-wizard-step__white-tick' });
      } else {
        return _react3.default.createElement(
          'div',
          null,
          this.props.stepNumber
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
        return _react3.default.createElement(
          'span',
          { key: 'multi-step-wizard-step-custom-buttons-' + index },
          button
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
      return (0, _classnames2.default)('multi-step-wizard-step', 'multi-step-wizard-step-' + this.props.stepNumber, 'multi-step-wizard-step--' + this.indicatorStatus, { 'multi-step-wizard-step--disabled': this.stepDisabled,
        'multi-step-wizard-step--pending--disabled': this.stepDisabled && this.indicatorStatus === 'pending',
        'multi-step-wizard-step--processed--disabled': this.stepDisabled && this.indicatorStatus === 'processed',
        'multi-step-wizard-step-final': this.isLastStep }, this.props.className);
    }
  }]);

  return Step;
}(_react3.default.Component), _class.propTypes = {
  /**
   * Step number
   *
   * @property stepNumber
   * @type {Number}
   */
  stepNumber: _propTypes2.default.number.isRequired,

  /**
   * Determines if the step renders default buttons
   *
   * @property defaultButton
   * @type {Boolean}
   * @default true
   */
  defaultButton: _propTypes2.default.bool,

  /**
   * Custom function that is called when moving the step forward.
   * This function overrides the step's default behaviour of moving next.
   *
   * @property onNext
   * @type {Function}
   */
  onNext: _propTypes2.default.func,

  /**
   * Custom function that is called when moving the step backward.
   * This function overrides the step's default behaviour of moving back.
   *
   * @property onBack
   * @type {Function}
   */
  onBack: _propTypes2.default.func,

  /**
   * Additional buttons
   *
   * @property extraButtons
   * @type {Array}
   */
  extraButtons: _propTypes2.default.arrayOf(_propTypes2.default.object),

  /**
   * Determines if the step is enabled
   *
   * @property enabled
   * @type {Boolean}
   */
  enabled: _propTypes2.default.bool
}, _class.defaultProps = {
  defaultButton: true
}, _class.contextTypes = {
  wizard: _propTypes2.default.object
}, _temp2));

exports.default = Step;