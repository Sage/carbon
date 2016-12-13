import React from 'react';
import classNames from 'classnames';
import Button from './../../button';
import Icon from './../../icon';
import I18n from "i18n-js";

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
    stepNumber: React.PropTypes.number.isRequired,

    /**
     * Determines if the step renders default buttons
     *
     * @property defaultButton
     * @type {Boolean}
     * @default true
     */
    defaultButton: React.PropTypes.bool,

    /**
     * Additional buttons
     *
     * @property extraButtons
     * @type {Array}
     */
    extraButtons: React.PropTypes.arrayOf(React.PropTypes.object),

    /**
     * Determines if the step is enabled
     *
     * @property enabled
     * @type {Boolean}
     */
    enabled: React.PropTypes.bool
  }

  static defaultProps = {
    defaultButton: true
  }


  static contextTypes = {
    wizard: React.PropTypes.object
  }

  /**
   * Completes the step's wizard and triggers the custom submit event handler of the step's wizard
   *
   * @method handleOnSubmit
   * @return {void}
   */
  handleOnSubmit = () => {
    this.wizard.complete();
    this.wizard.submitHandler();
  };

  /**
   * Triggers the custom next event handler of the step's wizard
   *
   * @method handleOnNext
   * @return {void}
   */
  handleOnNext = () => {
    if (this.props.defaultButton) {
      this.wizard.next();
    }
  };

  /**
   * Triggers the custom back event handler of the step's wizard
   *
   * @method handleOnBack
   * @return {void}
   */
  handleOnBack = () => {
    if (this.props.defaultButton) {
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
  get stepsCompleted() {
    return (this.wizard.completed === true);
  }

  /**
   * Returns the computed HTML for the step.
   *
   * @method stepHTML
   * @return {Object} JSX
   */
  get stepHTML() {
    return (
      <div className='multi-step-wizard-step__content'>
        { this.props.children }
        { this.buttonHTML }
      </div>
    );
  }

  /**
   * Returns the computed HTML for the buttons.
   *
   * @method buttonHTML
   * @return {Object} JSX
   */
  get buttonHTML() {
    if (this.props.defaultButton) {
      let nextButton, backButton, submitButton;

      if (this.isLastStep) {
        submitButton = (<Button as='primary' onClick={ this.handleOnSubmit } className='multi-step-wizard-step__button submit'>
                          { I18n.t('wizards.multi_step_wizard.buttons.submit', { defaultValue: 'Submit' }) }
                        </Button>);
      } else {
        nextButton = (<Button as='primary' onClick={ this.handleOnNext } className='multi-step-wizard-step__button next'>
                        { I18n.t('wizards.multi_step_wizard.buttons.next', { defaultValue: 'Next' }) }
                      </Button>);
      }

      if (!this.isFirstStep) {
        backButton = (<Button onClick={ this.handleOnBack } className='multi-step-wizard-step__button back'>
                        { I18n.t('wizards.multi_step_wizard.buttons.back', { defaultValue: 'Back' }) }
                      </Button>);
      }

      return (
        <div className="multi-step-wizard-step__buttons">
          { nextButton }
          { submitButton }
          { backButton }
          { this.extraButtonHTML }
        </div>
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
  get indicatorHTML() {
    if (this.stepProcessed) {
      return (<Icon type={ 'white-tick' } className='multi-step-wizard-step__white-tick'/>);
    } else {
      return (<div>{ this.props.stepNumber }</div>);
    }
  }

  /**
   * Returns the step indicator status.
   *
   * @method indicatorStatus
   * @return {Boolean}
   */
  get indicatorStatus() {
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
  get extraButtonHTML() {
    let extraButtons = (this.props.extraButtons || []);

    return extraButtons.map((button, index) => {
      return (<span key={ index }>
                { button }
              </span>
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
      'multi-step-wizard-step',
      'multi-step-wizard-step-' + this.props.stepNumber,
      'multi-step-wizard-step--' + this.indicatorStatus,
      { 'multi-step-wizard-step--disabled': this.stepDisabled,
        'multi-step-wizard-step--pending--disabled': this.stepDisabled && this.indicatorStatus === 'pending',
        'multi-step-wizard-step--processed--disabled': this.stepDisabled && this.indicatorStatus === 'processed',
        'multi-step-wizard-step-final': this.isLastStep },
      this.props.className
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let content;

    if (this.wizard) {
      content = (<div className={ this.mainClasses }>
                   <div className={ 'multi-step-wizard-step__indicator-bar ' + this.indicatorStatus }>
                     <div className='multi-step-wizard-step__indicator-background' />
                   </div>
                   <div className='multi-step-wizard-step__indicator-icon'>
                     <div className='multi-step-wizard-step__indicator-placeholder'>
                       <div className={ 'multi-step-wizard-step__indicator-icon__content ' + this.indicatorStatus }>
                         { this.indicatorHTML }
                       </div>
                     </div>
                   </div>
                   { this.stepHTML }
                 </div>);
    } else {
      content = (<div className='multi-step-wizard-step--none'></div>);
    }

    return content;
  }
}

export default Step;
