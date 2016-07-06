/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_step = require('./step');

/*istanbul ignore next*/
var _step2 = _interopRequireDefault(_step);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A MultiStepWizard widget.
 *
 * == How to use a MultiStepWizard in a component:
 *
 * In your file:
 *
 *   import MultiStepWizard from 'components/multi-step-wizard';
 *
 * To render the Wizard:
 *
 *  <MultiStepWizard steps={ [<Step1 />, <Step2 />, ...] } />
 *
 * The component rendering the wizard must pass down a prop of 'steps' where you need to provide an array of custom
 * step components. Note that Step components must be objects and you can pass props to Step components, e.g.
 * <MultiStepWizard steps={ [<Textbox onChange={ this.updateTextboxValue } />, <div className='some-style' />] } />
 *
 * You also need to provide a 'onSubmit' handler to handle a submit event.
 *
 * The wizard also takes a 'currentStep' prop with an integer to specify a step you want to start with.
 * e.g. currentStep={ 2 }. The wizard starts with the first step by default.
 *
 * The wizard disables inactive steps by default. If you wish to enable inactive steps, pass a 'enableInactiveSteps'
 * prop and set it to true.
 *
 * The wizard generates Next and Back buttons by default. If you wish to use custom buttons to replace the default ones
 * in a step component, you can pass a 'defaultButton' prop in the corresponding step component and set it to false.
 * Also, if you want to add additional buttons beside the default Next and Back buttons, you can pass a 'extraButtons'
 * prop in the corresponding step component with your extra buttons.
 * e.g. <MultiStepWizard steps={ [<Step1 defaultButton={ false } />, <Step2 />] } />
 *      <MultiStepWizard steps={ [<Step1 />, <Step2 extraButtons={ [<Button>Cancel</Button>] }) />] } />
 *
 * If you want to complete the wizard without going through steps, you can pass a 'completed' prop and set it to true.
 *
 * @class MultiStepWizard
 * @constructor
 */

var MultiStepWizard = function (_React$Component) {
  _inherits(MultiStepWizard, _React$Component);

  function MultiStepWizard() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, MultiStepWizard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MultiStepWizard)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.validateStepProps = function (stepProps) {
      var step = stepProps.currentStep,
          completed = stepProps.completed,
          totalSteps = stepProps.steps.length;

      if (completed === true) {
        return { currentStep: totalSteps, completed: true };
      } else if (parseInt(step) !== step || step < 1 || step > totalSteps) {
        return { currentStep: 1, completed: false };
      } else {
        return { currentStep: step, completed: false };
      }
    }, _this.next = function () {
      if ( /*istanbul ignore next*/_this.state.currentStep < /*istanbul ignore next*/_this.totalSteps) {
        /*istanbul ignore next*/_this.setState({ currentStep: /*istanbul ignore next*/_this.state.currentStep + 1 });
      }
    }, _this.back = function () {
      if ( /*istanbul ignore next*/_this.state.currentStep > 1) {
        /*istanbul ignore next*/_this.setState({ completed: false, currentStep: /*istanbul ignore next*/_this.state.currentStep - 1 });
      }
    }, _this.complete = function () {
      if ( /*istanbul ignore next*/_this.state.currentStep === /*istanbul ignore next*/_this.totalSteps) {
        /*istanbul ignore next*/_this.setState({ completed: true });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MultiStepWizard, [{
    key: 'componentWillMount',


    /**
     * A lifecycle method that is called before initial render.
     * Can set up state of component without causing a re-render.
     *
     * @method componentWillMount
     */
    value: function componentWillMount() {
      var validProps = this.validateStepProps(this.props);
      this.setState({ currentStep: validProps.currentStep, completed: validProps.completed });
    }

    /**
     * A lifecycle method to update the currentStep state when a new valid value has been specified.
     *
     * @method componentWillReceiveProps
     * @param {Object} props The new props passed down to the component
     * @return {void}
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var validProps = this.validateStepProps(nextProps);
      this.setState({ currentStep: validProps.currentStep, completed: validProps.completed });
    }
  }, {
    key: 'getChildContext',


    /**
     * Returns wizard object to child components.
     *
     * @method getChildContext
     * @return {void}
     */
    value: function getChildContext() {
      return {
        wizard: {
          nextHandler: this.props.onNext,
          backHandler: this.props.onBack,
          submitHandler: this.props.onSubmit,
          enableInactiveSteps: this.props.enableInactiveSteps,
          currentStep: this.state.currentStep,
          completed: this.state.completed,
          next: this.next,
          back: this.back,
          complete: this.complete,
          totalSteps: this.totalSteps
        }
      };
    }

    /**
     * Validate step props
     *
     * @method validateStepProps
     * @return {Object}
     */

  }, {
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.mainClasses },
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: 'multi-step-wizard__content' },
            this.wizardStepsHTML
          )
        )
      );
    }
  }, {
    key: 'totalSteps',


    /**
     * Get total number of steps
     *
     * @method totalSteps
     * @return {Number}
     */
    get: function get() {
      return this.props.steps.length;
    }

    /**
     * Moves to the next step.
     *
     * @method next
     * @return {void}
     */


    /**
     * Back to the previous step.
     *
     * @method back
     * @return {void}
     */


    /**
     * Completes the wizard.
     *
     * @method complete
     * @return {void}
     */

  }, {
    key: 'wizardStepsHTML',


    /**
     * Returns the computed HTML for the wizard's steps.
     *
     * @method wizardStepsHTML
     * @return {Object} JSX
     */
    get: function get() {
      return this.props.steps.map(function (step, index) {
        return (/*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/_step2.default,
            /*istanbul ignore next*/_extends({ stepNumber: index + 1, key: index }, step.props),
            step
          )
        );
      });
    }

    /**
     * Returns classes for the wizard.
     *
     * @method mainClasses
     * @return {String} Main className
     */

  }, {
    key: 'mainClasses',
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('multi-step-wizard', this.props.className)
      );
    }
  }]);

  return MultiStepWizard;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/MultiStepWizard.propTypes = {
  /**
   * Individual steps
   *
   * @property steps
   * @type {Array}
   */
  steps: /*istanbul ignore next*/_react2.default.PropTypes.arrayOf( /*istanbul ignore next*/_react2.default.PropTypes.object).isRequired,

  /**
   * A custom submit event handler
   *
   * @property onSubmit
   * @type {Function}
   */
  onSubmit: /*istanbul ignore next*/_react2.default.PropTypes.func.isRequired,

  /**
   * Current step
   *
   * @property currentStep
   * @type {Number}
   * @default 1
   */
  currentStep: /*istanbul ignore next*/_react2.default.PropTypes.number,

  /**
   * Determines if the wizard disables inactive steps
   *
   * @property enableInactiveSteps
   * @type {Boolean}
   * @default false
   */
  enableInactiveSteps: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * The completion state of the wizard
   *
   * @property enableInactiveSteps
   * @type {Boolean}
   * @default false
   */
  completed: /*istanbul ignore next*/_react2.default.PropTypes.bool
};
/*istanbul ignore next*/MultiStepWizard.defaultProps = {
  currentStep: 1,
  enableInactiveSteps: false,
  completed: false
};
/*istanbul ignore next*/MultiStepWizard.childContextTypes = {
  /**
   * Defines a context object for child components of this wizard.
   *
   * @property wizard
   * @type {Object}
   */
  wizard: /*istanbul ignore next*/_react2.default.PropTypes.object
};
/*istanbul ignore next*/exports.default = MultiStepWizard;