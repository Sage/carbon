import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import MultiStepWizard from './multi-step-wizard';

describe('MultiStepWizard', () => {
  let instance,
      spySubmitHandler = jasmine.createSpy('submitHandler');

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <MultiStepWizard steps={ [<div>Step 1</div>, <div>Step 2</div>] }
                       onSubmit={ spySubmitHandler } />);
  });

  describe('lifecycle', () => {
    describe('componentWillReceiveProps', () => {
      beforeEach(() => {
        spyOn(instance, 'setState');
      });

      describe('when the currentStep prop does not changes', () => {
        it('does not change the state', () => {
          instance.componentWillReceiveProps({});
          expect(instance.setState).not.toHaveBeenCalled();
        });
      });

      describe('when the completed prop changes', () => {
        it('change currentStep state', () => {
          instance.componentWillReceiveProps({ completed: true });
          expect(instance.setState).toHaveBeenCalledWith({ currentStep: 2 });
        });
      });

      describe('when the currentStep prop changes', () => {
        it('change currentStep state', () => {
          instance.componentWillReceiveProps({ currentStep: 2 });
          expect(instance.setState).toHaveBeenCalledWith({ currentStep: 2 });
        });
      });
    });

    describe('componentWillMount', () => {
      it('sets the currentStep state', () => {
        spyOn(instance, 'currentStep').and.returnValue(2);
        expect(instance.state.currentStep).toEqual(2);
      });

      describe('when completed is passed as a prop', () => {
        it('sets the completed state to the passed value', () => {
          instance = TestUtils.renderIntoDocument(
            <MultiStepWizard steps={ [<div>Step 1</div>, <div>Step 2</div>] }
                             onSubmit={ spySubmitHandler }
                             completed={ true } />);
          expect(instance.state.completed).toBeTruthy();
        });
      });

      describe('when completed is not passed as a prop', () => {
        it('sets the completed state to the default value', () => {
          expect(instance.state.completed).toBeFalsy();
        });
      });
    });
  });

  describe('initialize', () => {
    it('sets current step', () => {
      expect(instance.state.currentStep).toBeTruthy();
    });

    it('sets completed to false', () => {
      expect(instance.state.completed).toBeFalsy();
    });
  });

  describe('currentStep', () => {
    describe('when the currentStep prop is not passed', () => {
      it('returns 1', () => {
        expect(instance.currentStep).toEqual(1);
      });
    });

    describe('when completed is passed as a prop', () => {
      it('returns the number of total steps', () => {
        instance = TestUtils.renderIntoDocument(
          <MultiStepWizard steps={ [<div>Step 1</div>, <div>Step 2</div>] }
                           completed={ true }
                           onSubmit={ spySubmitHandler } />);
        expect(instance.currentStep).toEqual(2);
      });
    });

    describe('when a valid currentStep prop is passed', () => {
      it('returns the currentStep prop', () => {
        instance = TestUtils.renderIntoDocument(
            <MultiStepWizard steps={ [<div>Step 1</div>, <div>Step 2</div>] }
                             currentStep={ 2 }
                             onSubmit={ spySubmitHandler } />);
        expect(instance.currentStep).toEqual(2);
      });
    });

    describe('when an invalid currentStep prop is passed', () => {
      describe('when the currentStep prop is less than 1', () => {
        it('returns 1', () => {
          instance = TestUtils.renderIntoDocument(
              <MultiStepWizard steps={ [<div>Step 1</div>, <div>Step 2</div>] }
                               currentStep={ 0 }
                               onSubmit={ spySubmitHandler } />);
          expect(instance.currentStep).toEqual(1);
        });
      });

      describe('when the currentStep prop is larger than total number of steps', () => {
        it('returns 1', () => {
          instance = TestUtils.renderIntoDocument(
              <MultiStepWizard steps={ [<div>Step 1</div>, <div>Step 2</div>] }
                               currentStep={ 3 }
                               onSubmit={ spySubmitHandler } />);
          expect(instance.currentStep).toEqual(1);
        });
      });
    });
  });

  describe('totalSteps', () => {
    it('returns the total number of steps', () => {
      expect(instance.totalSteps).toEqual(2);
    });
  });

  describe('validateCurrentStep', () => {
    describe('when the step is not present', () => {
      it('returns 1', () => {
        let total = instance.validateCurrentStep();
        expect(total).toEqual(1);
      });
    });

    describe('when the step number is present', () => {
      describe('when the step number is valid', () => {
        it('returns the step number', () => {
          let total = instance.validateCurrentStep(2);
          expect(total).toEqual(2);
        });
      });

      describe('when the step is less than 1', () => {
        it('returns 1', () => {
          let total = instance.validateCurrentStep(0);
          expect(total).toEqual(1);
        });
      });

      describe('when the step number is larger than the total of steps', () => {
        it('returns 1', () => {
          let total = instance.validateCurrentStep(3);
          expect(total).toEqual(1);
        });
      });
    });
  });

  describe('next', () => {
    beforeEach(() => {
      spyOn(instance, 'setState').and.callThrough();
    });

    describe('when current step is less than the total of steps', () => {
      it('moves the step forward', () => {
        instance.next();
        expect(instance.setState).toHaveBeenCalledWith({ currentStep: 2 });
        expect(instance.state.currentStep).toEqual(2);
      });
    });

    describe('when current step is not less than the total of steps', () => {
      it('does nothing', () => {
        instance.state.currentStep = 3;
        instance.next();
        expect(instance.setState).not.toHaveBeenCalled();
        expect(instance.state.currentStep).toEqual(3);
      });
    });
  });

  describe('back', () => {
    beforeEach(() => {
      spyOn(instance, 'setState').and.callThrough();
    });

    describe('when current step is larger than 1', () => {
      it('moves the step backward', () => {
        instance.state.currentStep = 2;
        instance.back();
        expect(instance.setState).toHaveBeenCalledWith({ completed: false, currentStep: 1 });
        expect(instance.state.currentStep).toEqual(1);
      });
    });

    describe('when current step is not larger than 1', () => {
      it('does nothing', () => {
        instance.back();
        expect(instance.setState).not.toHaveBeenCalled();
        expect(instance.state.currentStep).toEqual(1);
      });
    });
  });

  describe('complete', () => {
    beforeEach(() => {
      spyOn(instance, 'setState').and.callThrough();
    });

    describe('when current step is the last step', () => {
      it('completes the wizard', () => {
        instance.state.currentStep = 2;
        instance.complete();
        expect(instance.setState).toHaveBeenCalledWith({ completed: true });
        expect(instance.state.completed).toBeTruthy();
      });
    });

    describe('when current step is not the last step', () => {
      it('does nothing', () => {
        instance.complete();
        expect(instance.setState).not.toHaveBeenCalled();
        expect(instance.state.completed).toBeFalsy();
      });
    });
  });

  describe('wizardStepsHTML', () => {
    describe('when passing the steps prop', () => {
      it('returns step components', () => {
        let steps = instance.wizardStepsHTML,
            step1 = steps[0],
            step2 = steps[1];

        expect(steps.length).toEqual(2);
        expect(step1.props.stepContent.props.children).toEqual('Step 1');
        expect(step1.props.stepNumber).toEqual(1);
        expect(step1.props.defaultButton).toEqual(true);
        expect(step2.props.stepContent.props.children).toEqual('Step 2');
        expect(step2.props.stepNumber).toEqual(2);
        expect(step2.props.defaultButton).toEqual(true);
      });
    });

    describe('when not passing the steps prop', () => {
      it('does not returns step components', () => {
        instance = TestUtils.renderIntoDocument(
            <MultiStepWizard steps={ [] }
                             onSubmit={ spySubmitHandler } />);
        expect(instance.wizardStepsHTML).toEqual([]);
      });
    });
  });

  describe('mainClasses', () => {
    it('returns the main class', () => {
      expect(instance.mainClasses).toContain('multi-step-wizard');
    });

    describe('when passing custom classNames', () => {
      it('adds it to the main class', () => {
        instance = TestUtils.renderIntoDocument(
            <MultiStepWizard steps={ [<div>Step 1</div>, <div>Step 2</div>] }
                             onSubmit={ spySubmitHandler } className='taxReturn' />);
        expect(instance.mainClasses).toContain('taxReturn');
      });
    });
  });

  describe('render', () => {
    it('creates a div for the component', () => {
      let div1 = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0],
          div2 = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[1];
      expect(div1.className).toContain('multi-step-wizard');
      expect(div2.className).toEqual('multi-step-wizard__content');
    });
  });
});
