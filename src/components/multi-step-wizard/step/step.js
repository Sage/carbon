import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import LocaleContext from "../../../__internal__/i18n-context";
import {
  StyledStep,
  StyledStepContent,
  StyledStepButton,
  StyledStepIndicatorBar,
  StyledStepIndicatorBackground,
  StyledStepIndicatorIconContainer,
  StepIndicatorIconPlaceholder,
  StepIndicatorIconContent,
  StyledStepIndicatorIcon,
} from "./step.style";

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
class Step extends React.Component {
  static propTypes = {
    /**
     * Step number
     *
     * @property stepNumber
     * @type {Number}
     */
    stepNumber: PropTypes.number.isRequired,

    /**
     * Determines if the step renders default buttons
     *
     * @property defaultButton
     * @type {Boolean}
     * @default true
     */
    defaultButton: PropTypes.bool,

    /**
     * Custom function that is called when moving the step forward.
     * This function overrides the step's default behaviour of moving next.
     *
     * @property onNext
     * @type {Function}
     */
    onNext: PropTypes.func,

    /**
     * Custom function that is called when moving the step backward.
     * This function overrides the step's default behaviour of moving back.
     *
     * @property onBack
     * @type {Function}
     */
    onBack: PropTypes.func,

    /**
     * Additional buttons
     *
     * @property extraButtons
     * @type {Array}
     */
    extraButtons: PropTypes.arrayOf(PropTypes.object),

    /**
     * Determines if the step is enabled
     *
     * @property enabled
     * @type {Boolean}
     */
    enabled: PropTypes.bool,

    /**
     * Custom className
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * Children elements
     *
     * @property children
     * @type {Node}
     */
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
    className: "",
    defaultButton: true,
    enabled: false,
    extraButtons: [],
    onBack: null,
    onNext: null,
  };

  static contextTypes = {
    wizard: PropTypes.object,
  };

  /**
   * Completes the step's wizard and triggers the custom submit event handler of the step's wizard
   *
   * @method handleOnSubmit
   * @return {void}
   */
  handleOnSubmit = (ev) => {
    let valid = true;
    if (this.wizard.beforeSubmitValidation) {
      valid = this.wizard.beforeSubmitValidation(ev, this.currentStepNumber);
    }

    if (valid === true) {
      this.wizard.complete();
      this.wizard.submitHandler(ev);
    }
  };

  /**
   * Triggers the custom next event handler of the step's wizard
   *
   * @method handleOnNext
   * @return {void}
   */
  handleOnNext = (ev) => {
    if (this.props.onNext) {
      this.props.onNext(ev, this.currentStepNumber);
    } else {
      this.wizard.next();
    }
  };

  /**
   * Triggers the custom back event handler of the step's wizard
   *
   * @method handleOnBack
   * @return {void}
   */
  handleOnBack = (ev) => {
    if (this.props.onBack) {
      this.props.onBack(ev, this.currentStepNumber);
    } else {
      this.wizard.back();
    }
  };

  /**
   * Gets the step's wizard
   *
   * @method wizard
   * @return {Object}
   */
  get wizard() {
    return this.context.wizard;
  }

  /**
   * Gets the current step number
   *
   * @method currentStepNumber
   * @return {Number}
   */
  get currentStepNumber() {
    return this.wizard.currentStep;
  }

  /**
   * Checks if the step is the first step
   *
   * @method isFirstStep
   * @return {Boolean}
   */
  get isFirstStep() {
    return this.props.stepNumber === 1;
  }

  /**
   * Checks if the step is the last step
   *
   * @method isLastStep
   * @return {Boolean}
   */
  get isLastStep() {
    return this.props.stepNumber === this.wizard.totalSteps;
  }

  /**
   * Checks if step component should be disabled.
   *
   * @method stepDisabled
   * @return {Boolean}
   */
  get stepDisabled() {
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
  get stepProcessed() {
    if (this.isLastStep) {
      return this.stepsCompleted;
    }

    return this.props.stepNumber < this.currentStepNumber;
  }

  /**
   * Checks if all steps are completed
   *
   * @method stepsCompleted
   * @return {Boolean}
   */
  get stepsCompleted() {
    return this.wizard.completed === true;
  }

  /**
   * Returns the computed HTML for the step.
   *
   * @method stepHTML
   * @return {Object} JSX
   */
  get stepHTML() {
    return (
      <StyledStepContent>
        {this.props.children}
        {this.buttonHTML}
      </StyledStepContent>
    );
  }

  /**
   * Returns the computed HTML for the buttons.
   *
   * @method buttonHTML
   * @return {Object} JSX
   */
  get buttonHTML() {
    if (this.props.defaultButton === false) {
      return this.extraButtonHTML;
    }

    let nextButton, backButton, submitButton;

    if (this.isLastStep) {
      submitButton = (
        <LocaleContext.Consumer>
          {(l) => (
            <StyledStepButton
              buttonType="primary"
              data-element="submit"
              onClick={this.handleOnSubmit}
            >
              {l.wizards.multiStep.buttons.submit}
            </StyledStepButton>
          )}
        </LocaleContext.Consumer>
      );
    } else {
      nextButton = (
        <LocaleContext.Consumer>
          {(l) => (
            <StyledStepButton
              buttonType="primary"
              data-element="next"
              onClick={this.handleOnNext}
            >
              {l.wizards.multiStep.buttons.next}
            </StyledStepButton>
          )}
        </LocaleContext.Consumer>
      );
    }

    if (!this.isFirstStep) {
      backButton = (
        <LocaleContext.Consumer>
          {(l) => (
            <StyledStepButton data-element="back" onClick={this.handleOnBack}>
              {l.wizards.multiStep.buttons.back}
            </StyledStepButton>
          )}
        </LocaleContext.Consumer>
      );
    }

    return (
      <div>
        {nextButton}
        {submitButton}
        {backButton}
        {this.extraButtonHTML}
      </div>
    );
  }

  /**
   * Returns the computed HTML for the step indicator.
   *
   * @method indicatorHTML
   * @return {Object} JSX
   */
  get indicatorHTML() {
    if (this.stepProcessed) {
      return <StyledStepIndicatorIcon type="white-tick" />;
    }
    return <div>{this.props.stepNumber}</div>;
  }

  /**
   * Returns the step indicator status.
   *
   * @method indicatorStatus
   * @return {Boolean}
   */
  get indicatorStatus() {
    return this.stepProcessed ? "processed" : "pending";
  }

  /**
   * Returns the computed HTML for the extra buttons.
   *
   * @method extraButtonHTML
   * @return {Object} JSX
   */
  get extraButtonHTML() {
    return this.props.extraButtons.map((button, index) => {
      return (
        // Would change behaviour to supply a uuid on each button
        /* eslint-disable react/no-array-index-key */
        <span key={`multi-step-wizard-step-custom-buttons-${index}`}>
          {button}
        </span>
        /* eslint-enable react/no-array-index-key */
      );
    });
  }

  /**
   * Main class getter
   *
   * @method mainClasses
   * @return {String}
   */
  get mainClasses() {
    return classNames(
      `multi-step-wizard-step-${this.props.stepNumber}`,
      { "multi-step-wizard-step-final": this.isLastStep },

      this.props.className
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    if (this.wizard) {
      return (
        <StyledStep
          disabled={this.stepDisabled}
          isLastStep={this.isLastStep}
          isStepProcessed={this.stepProcessed}
        >
          <StyledStepIndicatorBar
            className={this.indicatorStatus}
            isStepProcessed={this.stepProcessed}
          >
            <StyledStepIndicatorBackground />
          </StyledStepIndicatorBar>
          <StyledStepIndicatorIconContainer>
            <StepIndicatorIconPlaceholder>
              <StepIndicatorIconContent
                className={this.indicatorStatus}
                isStepProcessed={this.stepProcessed}
              >
                {this.indicatorHTML}
              </StepIndicatorIconContent>
            </StepIndicatorIconPlaceholder>
          </StyledStepIndicatorIconContainer>
          {this.stepHTML}
        </StyledStep>
      );
    }

    return <div className="multi-step-wizard-step--none" />;
  }
}

export default Step;
