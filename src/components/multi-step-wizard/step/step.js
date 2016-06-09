import React from 'react';
import classNames from 'classnames';
import Button from './../../button';
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
    extraButtons: React.PropTypes.arrayOf(React.PropTypes.object)
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
    return this.wizard.completed;
  }

  /**
   * Returns the computed HTML for the step.
   *
   * @method stepHTML
   * @return {Object} JSX
   */
  get stepHTML() {
    return (<div className='multi-step-wizard-step__content'>
              { this.props.stepContent }
              { this.buttonHTML }
            </div>);
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
        submitButton = (<Button onClick={ this.handleOnSubmit } className='multi-step-wizard-step__button submit'>
                          { I18n.t('wizards.multi_step_wizard.buttons.submit', { defaultValue: 'Submit' }) }
                        </Button>);
      } else {
        nextButton = (<Button onClick={ this.handleOnNext } className='multi-step-wizard-step__button next'>
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
      return (<div dangerouslySetInnerHTML={{ __html: this.renderWhiteTick }}></div>);
    } else {
      return (<div>{ this.props.stepNumber }</div>);
    }
  }

  /**
   * Return the svg image for the white tick
   *
   * @return {Object} JSX svg
   */
  get renderWhiteTick() {
    let svg = '';

    svg += '<svg width="15px" height="13px" viewBox="0 0 15 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">';
    svg += '  <!-- Generator: Sketch 3.4 (15575) - http://www.bohemiancoding.com/sketch -->';
    svg += '  <title>tick</title>';
    svg += '  <desc>Created with Sketch.</desc>';
    svg += '  <defs></defs>';
    svg += '  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">';
    svg += '    <g id="QSW---Step-2" sketch:type="MSArtboardGroup" transform="translate(-518.000000, -174.000000)" fill="#FFFFFF">';
    svg += '      <g id="Overlay" sketch:type="MSLayerGroup">';
    svg += '        <g id="Dialog" transform="translate(433.000000, 60.000000)" sketch:type="MSShapeGroup">';
    svg += '          <g id="progress-bar" transform="translate(77.000000, 87.000000)">';
    svg += '            <g id="business-basics">';
    svg += '              <path d="M12.1349063,38.4860814 L8.81960483,35.6607151 C8.4628233,35.3566587 8.41656446,34.8166977 8.71591615,34.454366 L9.79923038,33.1431352 C10.0989393,32.7803711 10.6303501,32.7334485 10.9869674,33.037365 L13.7895069,35.4257453 L19.7381802,28.2255413 C20.0374529,27.8633052 20.5692891,27.8160953 20.9260425,28.1201277 L22.2170862,29.220381 C22.5742654,29.5247762 22.6204272,30.0645427 22.3211424,30.4267934 L15.9731521,38.1103259 C15.9424206,38.1779211 15.9024384,38.2425382 15.8530479,38.3023198 L14.7697337,39.6135505 C14.5680446,39.8576726 14.2614267,39.9587622 13.9737606,39.9061537 C13.8218425,39.8848846 13.6737922,39.8212943 13.5476358,39.7137813 L12.2565922,38.613528 C12.2109212,38.5746063 12.1703353,38.5318364 12.1349063,38.4860814 L12.1349063,38.4860814 Z" id="tick"></path>';
    svg += '            </g>';
    svg += '          </g>';
    svg += '        </g>';
    svg += '      </g>';
    svg += '    </g>';
    svg += '  </g>';
    svg += '</svg>';

    return svg;
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

    return extraButtons.map(function(button, index) {
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
