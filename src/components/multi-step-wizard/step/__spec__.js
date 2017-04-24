import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Step from './step';
import Button from './../../button';
import { shallow } from 'enzyme';

describe('Step', () => {
  let instance, stepContext, stepNumber = 1,
      spyNextHandler = jasmine.createSpy('nextHandler'),
      spyBackHandler = jasmine.createSpy('backHandler'),
      spyBeforeSubmitValidation = null,
      spySubmitHandler = jasmine.createSpy('submitHandler'),
      spyOnNext = jasmine.createSpy('onNext'),
      spyOnBack = jasmine.createSpy('onBack'),
      spyNext = jasmine.createSpy('next'),
      spyBack = jasmine.createSpy('back'),
      spyComplete = jasmine.createSpy('complete'),
      enableInactiveSteps = false,
      currentStep = 1,
      completed = false,
      totalSteps = 3;

  beforeEach(() => {
    stepContext = {
      wizard: {
        nextHandler: spyNextHandler,
        backHandler: spyBackHandler,
        beforeSubmitValidation: spyBeforeSubmitValidation,
        submitHandler: spySubmitHandler,
        enableInactiveSteps: enableInactiveSteps,
        currentStep: currentStep,
        completed: completed,
        next: spyNext,
        back: spyBack,
        complete: spyComplete,
        totalSteps: totalSteps
      }
    };

    instance = TestUtils.renderIntoDocument(
      <Step stepNumber={ stepNumber }>Demo Step</Step>
    );

    instance.context = stepContext;
  });

  describe('handleOnSubmit', () => {
    describe('when beforeSubmitValidation props is not null', () => {
      beforeEach(() => {
        spyBeforeSubmitValidation = jasmine.createSpy('beforeSubmitValidation');
        instance.context.wizard.beforeSubmitValidation = spyBeforeSubmitValidation;
      });

      describe('when beforeSubmitValidation props does not returns true', () => {
        beforeEach(() => {
          spyBeforeSubmitValidation.and.returnValue(false);
        });

        it('does not call the parent wizard to complete and submit', () => {
          instance.handleOnSubmit();
          expect(spyComplete).not.toHaveBeenCalled();
        });

        it('does not call submitHandler of parent wizard', () => {
          instance.handleOnSubmit();
          expect(spySubmitHandler).not.toHaveBeenCalled();
        });
      });

      describe('when beforeSubmitValidation props returns true', () => {
        beforeEach(() => {
          spyBeforeSubmitValidation.and.returnValue(true);
        });

        it('calls the parent wizard to complete', () => {
          instance.handleOnSubmit();
          expect(spyComplete).toHaveBeenCalled();
        });

        it('calls submitHandler of parent wizard', () => {
          instance.handleOnSubmit();
          expect(spySubmitHandler).toHaveBeenCalled();
        });
      });
    });

    describe('when beforeSubmitValidation props is null', () => {
      beforeEach(() => {
        spyBeforeSubmitValidation = null;
        instance.context.wizard.beforeSubmitValidation = spyBeforeSubmitValidation;
      });

      it('calls the parent wizard to complete', () => {
        instance.handleOnSubmit();
        expect(spyComplete).toHaveBeenCalled();
      });

      it('calls submitHandler of parent wizard', () => {
        instance.handleOnSubmit();
        expect(spySubmitHandler).toHaveBeenCalled();
      });
    });

  });

  describe('handleOnNext', () => {
    describe('when onNext props is not null', () => {
      it('calls the onNext props', () => {
        instance = TestUtils.renderIntoDocument(
          <Step stepNumber={ 1 } onNext={ spyOnNext }>
            Demo Step
          </Step>
        );
        instance.context = stepContext;
        instance.handleOnNext();
        expect(spyOnNext).toHaveBeenCalled();
        expect(spyNext).not.toHaveBeenCalled();
      });
    });

    describe('when onNext props is null', () => {
      it('calls the parent wizard to step forward', () => {
        instance.handleOnNext();
        expect(spyNext).toHaveBeenCalled();
      });
    });
  });

  describe('handleOnBack', () => {
    describe('when onBack props is not null', () => {
      it('calls the onBack props', () => {
        instance = TestUtils.renderIntoDocument(
          <Step stepNumber={ 1 } onBack={ spyOnBack }>
            Demo Step
          </Step>
        );
        instance.context = stepContext;
        instance.handleOnBack();
        expect(spyOnBack).toHaveBeenCalled();
        expect(spyBack).not.toHaveBeenCalled();
      });
    });

    describe('when onBack props is null', () => {
      it('calls the parent wizard to step backward', () => {
        instance.handleOnBack();
        expect(spyBack).toHaveBeenCalled();
      });
    });
  });

  describe('wizard', () => {
    it('returns the parent wizard', () => {
      expect(instance.wizard).toEqual(stepContext.wizard);
    });
  });

  describe('currentStepNumber', () => {
    it('returns the current step number', () => {
      expect(instance.currentStepNumber).toEqual(stepNumber);
    });
  });

  describe('isFirstStep', () => {
    describe('when at the first step', () => {
      it('returns true', () => {
        expect(instance.isFirstStep).toBeTruthy();
      });
    });

    describe('when not at the first step', () => {
      it('returns false', () => {
        instance = TestUtils.renderIntoDocument(
          <Step stepNumber={ 2 }>Demo Step</Step>
        );
        instance.context = stepContext;
        expect(instance.isFirstStep).toBeFalsy();
      });
    });
  });

  describe('isLastStep', () => {
    describe('when at the last step', () => {
      it('returns true', () => {
        instance = TestUtils.renderIntoDocument(
          <Step stepNumber={ 3 }>Demo Step</Step>
        );
        instance.context = stepContext;
        expect(instance.isLastStep).toBeTruthy();
      });

    });

    describe('when not at the first step', () => {
      it('returns false', () => {
        expect(instance.isLastStep).toBeFalsy();
      });
    });
  });

  describe('stepDisabled', () => {
    describe('when inactive step is enabled', () => {
      it('returns false', () => {
        stepContext.wizard.enableInactiveSteps = true;
        expect(instance.stepDisabled).toBeFalsy();
      });
    });

    describe('when step number is equal to current step', () => {
      it('returns false', () => {
        expect(instance.stepDisabled).toBeFalsy();
      });
    });

    describe('when step number is not equal to current step', () => {
      it('returns true', () => {
        instance = TestUtils.renderIntoDocument(
          <Step stepNumber={ 2 }>Demo Step</Step>
        );
        instance.context = stepContext;
        expect(instance.stepDisabled).toBeTruthy();
      });
    });

    describe('when step is enabled', () => {
      it('returns false', () => {
        instance = TestUtils.renderIntoDocument(
          <Step stepNumber={ 1 } enabled={ true }>Demo Step</Step>
        );
        instance.context = stepContext;
        expect(instance.stepDisabled).toBeFalsy();
      });
    });
  });

  describe('stepProcessed', () => {
    describe('when at the last step', () => {
      it('returns parent wizard completion status', () => {
        instance = TestUtils.renderIntoDocument(
          <Step stepNumber={ 3 }>Demo Step</Step>
        );
        instance.context = stepContext;
        expect(instance.stepProcessed).toEqual(completed);
      });
    });

    describe('when not at the last step', () => {
      describe('when step number is less than to current step', () => {
        it('returns true', () => {
          stepContext.wizard.currentStep = 2;
          expect(instance.stepProcessed).toBeTruthy();
        });
      });

      describe('when step number is not less than to current step', () => {
        it('returns false', () => {
          expect(instance.stepProcessed).toBeFalsy();
        });
      });
    });
  });

  describe('stepsCompleted', () => {
    it('returns parent wizard completion status', () => {
      expect(instance.stepsCompleted).toEqual(completed);
    });
  });

  describe('buttonHTML', () => {
    describe('when defaultButton props is true', () => {
      describe('when at the last step', () => {
        it('returns the Submit and Back buttons', () => {
          instance = TestUtils.renderIntoDocument(
            <Step stepNumber={ 3 }>Demo Step</Step>
          );
          instance.context = stepContext;
          let buttons = instance.buttonHTML.props.children,
              nextButton = buttons[0],
              submitButton = buttons[1],
              backButton = buttons[2],
              extraButtons = buttons[3];

          expect(nextButton).toBeUndefined();
          expect(submitButton).toBeDefined();
          expect(backButton).toBeDefined();
          expect(extraButtons).toEqual([]);

          expect(submitButton.props.className).toContain('submit');
          expect(backButton.props.className).toContain('back');
        });
      });

      describe('when not at the last step and not at the first step', () => {
        it('returns the Next and Back buttons', () => {
          instance = TestUtils.renderIntoDocument(
            <Step stepNumber={ 2 }>Demo Step</Step>
          );
          instance.context = stepContext;
          let buttons = instance.buttonHTML.props.children,
              nextButton = buttons[0],
              submitButton = buttons[1],
              backButton = buttons[2],
              extraButtons = buttons[3];

          expect(nextButton).toBeDefined();
          expect(submitButton).toBeUndefined();
          expect(backButton).toBeDefined();
          expect(extraButtons).toEqual([]);

          expect(nextButton.props.className).toContain('next');
          expect(backButton.props.className).toContain('back');
        });
      });

      describe('when at the first step', () => {
        it('returns the Next button', () => {
          let buttons = instance.buttonHTML.props.children,
              nextButton = buttons[0],
              submitButton = buttons[1],
              backButton = buttons[2],
              extraButtons = buttons[3];

          expect(nextButton).toBeDefined();
          expect(submitButton).toBeUndefined();
          expect(backButton).toBeUndefined();
          expect(extraButtons).toEqual([]);

          expect(nextButton.props.className).toContain('next');
        });
      });
    });

    describe('when defaultButton props is false', () => {
      it('returns the Extra buttons', () => {
        instance = TestUtils.renderIntoDocument(
          <Step stepNumber={ 2 }
                defaultButton={ false }
                extraButtons={ [<Button>Extra Buttons</Button>] }>
            Demo Step
          </Step>
        );
        instance.context = stepContext;
        let extraButton = instance.buttonHTML[0],
            extraButtonText = extraButton.props.children.props.children;
        expect(extraButtonText).toEqual('Extra Buttons');
      });
    });
  });

  describe('indicatorHTML', () => {
    describe('when the step is not processed', () => {
      it('returns the step number', () => {
        let indicator = instance.indicatorHTML;
        expect(indicator.props.children).toEqual(stepNumber);
      });
    });

    describe('when the step is processed', () => {
      it('returns the step number', () => {
        stepContext.wizard.currentStep = 2;
        let indicator = instance.indicatorHTML;
        expect(indicator.props.type).toEqual('white-tick');
      });
    });
  });

  describe('indicatorStatus', () => {
    describe('when the step is not processed', () => {
      it('returns pending status', () => {
        let status = instance.indicatorStatus;
        expect(status).toEqual('pending');
      });
    });

    describe('when the step is processed', () => {
      it('returns processed status', () => {
        stepContext.wizard.currentStep = 2;
        let status = instance.indicatorStatus;
        expect(status).toEqual('processed');
      });
    });
  });

  describe('mainClasses', () => {
    it('adds a className based on the step number', () => {
      expect(instance.mainClasses).toContain('multi-step-wizard-step-1');
    });

    it('adds a className based on the step progress', () => {
      expect(instance.mainClasses).toContain('multi-step-wizard-step-1');
    });

    it('adds a className if the step is pending', () => {
      instance = TestUtils.renderIntoDocument(
        <Step stepNumber={ 2 }>Demo Step</Step>
      );
      instance.context = stepContext;
      expect(instance.mainClasses).toContain('multi-step-wizard-step--pending');
    });

    it('adds a className if the step is disabled', () => {
      instance = TestUtils.renderIntoDocument(
        <Step stepNumber={ 2 }>Demo Step</Step>
      );
      instance.context = stepContext;
      expect(instance.mainClasses).toContain('multi-step-wizard-step--disabled');
    });

    it('adds a className if the step is the last step', () => {
      instance = TestUtils.renderIntoDocument(
        <Step stepNumber={ 3 }>Demo Step</Step>
      );
      instance.context = stepContext;
      expect(instance.mainClasses).toContain('multi-step-wizard-step-final');
    });
  });

  describe('render', () => {
    it('renders a div if parent wizard is not available', () => {
      let div = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(div.className).toEqual('multi-step-wizard-step--none');
    });
  });

  describe('component tags', () => {
    describe('button tags', () => {
      describe('next button', () => {
        let wrapper = shallow(<Step stepNumber={ 1 }>Demo Step</Step>, { context: { wizard: { totalSteps: 3 } } });
        let next = wrapper.find('.next');

        it('includes correct tags for the button', () => {
          expect(next.prop('data-element')).toEqual('next');
        });
      });

      describe('back button', () => {
        let wrapper = shallow(<Step stepNumber={ 2 }>Demo Step</Step>, { context: { wizard: { totalSteps: 3 } } });
        let back = wrapper.find('.back');

        it('includes correct tags for the button', () => {
          expect(back.prop('data-element')).toEqual('back');
        });
      });

      describe('submit button', () => {
        let wrapper = shallow(<Step stepNumber={ 3 }>Demo Step</Step>, { context: { wizard: { totalSteps: 3 } } });
        let submit = wrapper.find('.submit');

        it('includes correct tags for the button', () => {
          expect(submit.prop('data-element')).toEqual('submit');
        });
      });
    });
  });
});
