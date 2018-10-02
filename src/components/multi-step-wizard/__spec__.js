import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import MultiStepWizard from './multi-step-wizard';
import MultiActionButton from './../multi-action-button';
import Button from './../button';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('MultiStepWizard', () => {
  let instance,
      spySubmitHandler = jasmine.createSpy('submitHandler');

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <MultiStepWizard steps={ [<div>Step 1</div>, <div>Step 2</div>] }
                       onSubmit={ spySubmitHandler } />);
  });

  describe('lifecycle', () => {
    describe('componentWillMount', () => {
      it('sets the states', () => {
        spyOn(instance, 'validateStepProps').and.returnValue({ currentStep: 1, completed: false });
        expect(instance.state.currentStep).toEqual(1);
        expect(instance.state.completed).toEqual(false);
      });
    });

    describe('componentWillReceiveProps', () => {
      it('sets the states', () => {
        spyOn(instance, 'validateStepProps').and.returnValue({ currentStep: 3, completed: true });
        instance.componentWillReceiveProps({ });
        expect(instance.state.currentStep).toEqual(3);
        expect(instance.state.completed).toEqual(true);
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

  describe('totalSteps', () => {
    it('returns the total number of steps', () => {
      expect(instance.totalSteps).toEqual(2);
    });
  });

  describe('validateStepProps', () => {
    describe('when the completed prop equals to true', () => {
      it('returns the valid props', () => {
        let props = instance.validateStepProps({ completed: true, steps: [1, 2, 3] });
        expect(props.currentStep).toEqual(3);
        expect(props.completed).toEqual(true);
      });
    });

    describe('when the currentStep prop is not number', () => {
      it('returns the valid props', () => {
        let props = instance.validateStepProps({ currentStep: 'test', steps: [1, 2, 3] });
        expect(props.currentStep).toEqual(1);
        expect(props.completed).toEqual(false);
      });
    });

    describe('when the currentStep prop is less than 1', () => {
      it('returns the valid props', () => {
        let props = instance.validateStepProps({ currentStep: 0, steps: [1, 2, 3] });
        expect(props.currentStep).toEqual(1);
        expect(props.completed).toEqual(false);
      });
    });

    describe('when the currentStep prop is larger than the total of steps', () => {
      it('returns the valid props', () => {
        let props = instance.validateStepProps({ currentStep: 4, steps: [1, 2, 3] });
        expect(props.currentStep).toEqual(1);
        expect(props.completed).toEqual(false);
      });
    });

    describe('when the currentStep prop is valid', () => {
      it('returns the valid props', () => {
        let props = instance.validateStepProps({ currentStep: 2, steps: [1, 2, 3] });
        expect(props.currentStep).toEqual(2);
        expect(props.completed).toEqual(false);
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
        expect(instance.state.completed).toEqual(false);
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
        expect(step1.props.children.props.children).toEqual('Step 1');
        expect(step1.props.stepNumber).toEqual(1);
        expect(step1.props.defaultButton).toEqual(true);
        expect(step2.props.children.props.children).toEqual('Step 2');
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
