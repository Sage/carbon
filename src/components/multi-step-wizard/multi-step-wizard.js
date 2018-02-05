import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Step from './step';

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
 * Individual Steps can be optionally disabled by a passing a prop of `enabled={ false }`.
 * e.g. <MultiStepWizard steps={ [<Step1 defaultButton={ false } />, <Step2 />] } />
 *      <MultiStepWizard steps={ [<Step1 />, <Step2 extraButtons={ [<Button>Cancel</Button>] }) />] } />
 *      <MultiStepWizard steps={ [<Step1 />, <Step2 enabled={ false } />] } />
 *
 * The wizard provides the ability to hook into the handle next/back/submit methods.
 * (1) By passing a 'beforeSubmitValidation' prop in the wizard, you can add custom logic before a submit event, and
 *     the submit event can be completed only when the 'beforeSubmitValidation' prop returns 'true'.
 * (2) By passing 'onNext' prop in the corresponding step component,
 *     you can add custom logic when moving a step forward, and
 *     the 'onNext' prop overrides the step's default behaviour of moving next.
 * (3) By passing 'onBack' prop in the corresponding step component,
 *     you can add custom logic when moving a step backward, and
 *     the 'onBack' prop overrides the step's default behaviour of moving back.
 * e.g. <MultiStepWizard steps={ [
 *        <Step1 onNext={ this.customMethodOnNext }/>,
 *        <Step2 onBack={ this.customMethodOnBack }) />
 *      ] } />
 *      <MultiStepWizard beforeSubmitValidation={ this.customValidation } onSubmit={ this.customMethodOnSubmit } />
 *
 * If you want to complete the wizard without going through steps, you can pass a 'completed' prop and set it to true.
 *
 * @class MultiStepWizard
 * @constructor
 */
class MultiStepWizard extends React.Component {
  static propTypes = {
    /**
     * Individual steps
     *
     * @property steps
     * @type {Array}
     */
    steps: PropTypes.arrayOf(PropTypes.object).isRequired,

    /**
     * Custom function that is called immediately before a submit event
     *
     * @property beforeSubmitValidation
     * @type {Function}
     */
    beforeSubmitValidation: PropTypes.func,

    /**
     * Custom className
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * A custom submit event handler
     *
     * @property onSubmit
     * @type {Function}
     */
    onSubmit: PropTypes.func.isRequired,

    /**
     * Current step
     *
     * @property currentStep
     * @type {Number}
     * @default 1
     */
    currentStep: PropTypes.number, // eslint-disable-line react/no-unused-prop-types

    /**
     * Determines if the wizard disables inactive steps
     *
     * @property enableInactiveSteps
     * @type {Boolean}
     * @default false
     */
    enableInactiveSteps: PropTypes.bool,

    /**
     * Add custom logic to next button
     *
     * @property onNext
     */
    onNext: PropTypes.func,

    /**
     * Add custom logic to previous button
     *
     * @property onPrevious
     */
    onBack: PropTypes.func,

    /**
     * The completion state of the wizard
     *
     * @property enableInactiveSteps
     * @type {Boolean}
     * @default false
     */
    completed: PropTypes.bool // eslint-disable-line react/no-unused-prop-types
  }

  static defaultProps = {
    beforeSubmitValidation: null,
    className: '',
    completed: false,
    currentStep: 1,
    enableInactiveSteps: false,
    onNext: null,
    onBack: null
  }

  static childContextTypes = {
    /**
     * Defines a context object for child components of this wizard.
     *
     * @property wizard
     * @type {Object}
     */
    wizard: PropTypes.object
  }


  /**
   * Returns wizard object to child components.
   *
   * @method getChildContext
   * @return {void}
   */
  getChildContext() {
    return {
      wizard: {
        nextHandler: this.props.onNext,
        backHandler: this.props.onBack,
        beforeSubmitValidation: this.props.beforeSubmitValidation,
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
   * A lifecycle method that is called before initial render.
   * Can set up state of component without causing a re-render.
   *
   * @method componentWillMount
   */
  componentWillMount() {
    const validProps = this.validateStepProps(this.props);
    this.setState({ currentStep: validProps.currentStep, completed: validProps.completed });
  }

  /**
   * A lifecycle method to update the currentStep state when a new valid value has been specified.
   *
   * @method componentWillReceiveProps
   * @param {Object} props The new props passed down to the component
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    const validProps = this.validateStepProps(nextProps);
    this.setState({ currentStep: validProps.currentStep, completed: validProps.completed });
  }

  /**
   * Validate step props
   *
   * @method validateStepProps
   * @return {Object}
   */
  validateStepProps = (stepProps) => {
    const step = stepProps.currentStep;
    const { completed } = stepProps.completed;
    const totalSteps = stepProps.steps.length;

    if (completed === true) {
      return { currentStep: totalSteps, completed: true };
    } else if (parseInt(step, 10) !== step || step < 1 || step > totalSteps) {
      return { currentStep: 1, completed: false };
    }

    return { currentStep: step, completed: false };
  }

  /**
   * Get total number of steps
   *
   * @method totalSteps
   * @return {Number}
   */
  get totalSteps() {
    return this.props.steps.length;
  }

  /**
   * Moves to the next step.
   *
   * @method next
   * @return {void}
   */
  next = () => {
    if (this.state.currentStep < this.totalSteps) {
      this.setState({ currentStep: this.state.currentStep + 1 });
    }
  }

  /**
   * Back to the previous step.
   *
   * @method back
   * @return {void}
   */
  back = () => {
    if (this.state.currentStep > 1) {
      this.setState({ completed: false, currentStep: this.state.currentStep - 1 });
    }
  }

  /**
   * Completes the wizard.
   *
   * @method complete
   * @return {void}
   */
  complete = () => {
    if (this.state.currentStep === this.totalSteps) {
      this.setState({ completed: true });
    }
  }

  /**
   * Returns the computed HTML for the wizard's steps.
   *
   * @method wizardStepsHTML
   * @return {Object} JSX
   */
  get wizardStepsHTML() {
    return this.props.steps.map((step, index) => {
      return (
        // Step is never going to be re-ordered or changed so index is safe to use
        /* eslint-disable react/no-array-index-key */
        <Step
          stepNumber={ index + 1 } key={ `multi-step-wizard-step-${index}` }
          { ...step.props }
        >
          { step }
        </Step>
        /* eslint-enable react/no-array-index-key */
      );
    });
  }

  /**
   * Returns classes for the wizard.
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      'multi-step-wizard',
      this.props.className
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className={ this.mainClasses }>
        <div className='multi-step-wizard__content'>
          { this.wizardStepsHTML }
        </div>
      </div>
    );
  }
}

export default MultiStepWizard;
