import React from 'react';
import { shallow } from 'enzyme';
import Modal from './modal';
import Events from './../../utils/helpers/events';
import Browser from './../../utils/helpers/browser';

describe('Modal', () => {
  let wrapper, onCancel, mockWindow;

  describe('componentDidMount', () => {
    beforeEach(() => {
      mockWindow = {
        addEventListener: jest.fn()
      };
      spyOn(Browser, 'getWindow').and.returnValue(mockWindow);
    });

    it('binds the key event listener to the window', () => {
      wrapper = shallow(<Modal open onCancel={ onCancel } />);
      expect(mockWindow.addEventListener.mock.calls.length).toEqual(1);
      expect(mockWindow.addEventListener).toHaveBeenCalled();
    });

    it('does not bind if component is not open on mount', () => {
      wrapper = shallow(<Modal open={ false } onCancel={ onCancel } />);
      expect(mockWindow.addEventListener).not.toHaveBeenCalled();
    })
  });
  
  describe('componentWillUnmount', () => {
    beforeEach(() => {
      mockWindow = {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      };
      spyOn(Browser, 'getWindow').and.returnValue(mockWindow);
    });

    it('removes the event listener if modal was open', () => {
      wrapper = shallow(<Modal open onCancel={ onCancel } />);
      wrapper.unmount();
      expect(mockWindow.removeEventListener.mock.calls.length).toEqual(1);
      expect(mockWindow.removeEventListener).toHaveBeenCalled();
    });

    it('does not remove the event listener if it was not in use', () => {
      wrapper = shallow(<Modal onCancel={ onCancel } />);
      wrapper.unmount();
      expect(mockWindow.removeEventListener).not.toHaveBeenCalled();
    });
  });

  describe('componentDidUpdate', () => {
    beforeEach(() => {
      mockWindow = {
        addEventListener() {},
        removeEventListener() {}
      };

      spyOn(Browser, 'getWindow').and.returnValue(mockWindow);
    });

    describe('when the modal is open', () => {
      beforeEach(() => {
        jest.useFakeTimers();
        onCancel = jasmine.createSpy('cancel');
        wrapper = shallow(
          <Modal onCancel={ onCancel } />
        );
      });

      afterEach(() => {
        jest.useRealTimers();
      });

      it('sets up event listeners to resize and close the modal', () => {
        spyOn(mockWindow, 'addEventListener');
        wrapper.setProps({ open: true });
        jest.runAllTimers();
        expect(mockWindow.addEventListener.calls.count()).toEqual(1);
        expect(mockWindow.addEventListener).toHaveBeenCalledWith('keyup', wrapper.instance().closeModal);
      });

      it('clears the opentimeout and sets data state to open', () => {
        spyOn(mockWindow, 'removeEventListener');
        spyOn(window, 'setTimeout');
        jest.useFakeTimers();
        wrapper.setProps({ open: true });
        jest.runTimersToTime(500);
        expect(clearTimeout).toHaveBeenCalled();
        expect(wrapper.state()).toEqual({ state: 'open' });
      });

      describe('when the modal is already listening', () => {
        it('does not set up event listeners', () => {
          spyOn(mockWindow, 'addEventListener');
          wrapper.instance().listening = true;
          wrapper.instance().componentDidUpdate();
          expect(mockWindow.addEventListener.calls.count()).toEqual(0);
          expect(mockWindow.addEventListener).not.toHaveBeenCalled();
        });
      });
    });

    describe('when the modal is closed', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Modal onCancel={ onCancel } />
        );
      });

      it('removes event listeners for resize and closing', () => {
        spyOn(mockWindow, 'removeEventListener');
        wrapper.instance().listening = true;
        wrapper.instance().componentDidUpdate();
        expect(mockWindow.removeEventListener.calls.count()).toEqual(1);
        expect(mockWindow.removeEventListener).toHaveBeenCalledWith('keyup', wrapper.instance().closeModal);
      });

      it('clears the opentimeout and sets data state to closed', () => {
        spyOn(mockWindow, 'removeEventListener');
        spyOn(window, 'setTimeout');
        jest.useFakeTimers();
        wrapper.instance().listening = true;
        wrapper.instance().componentDidUpdate();
        jest.runTimersToTime(500);
        expect(clearTimeout).toHaveBeenCalled();
        expect(wrapper.state()).toEqual({ state: 'closed' });
      });
    });
  });

  describe('closeModal', () => {
    describe('when disableEscKey is false', () => {
      beforeEach(() => {
        onCancel = jasmine.createSpy('cancel');
        wrapper = shallow(
          <Modal open onCancel={ onCancel } />
        );
      });

      describe('when the esc key is released', () => {
        it('calls the cancel modal handler', () => {
          spyOn(Events, 'isEscKey').and.returnValue(true);
          wrapper.instance().closeModal({});
          expect(onCancel).toHaveBeenCalled();
        });
      });

      describe('when any other key is released', () => {
        it('calls the cancel modal handler', () => {
          spyOn(Events, 'isEscKey').and.returnValue(false);
          wrapper.instance().closeModal({});
          expect(onCancel).not.toHaveBeenCalled();
        });
      });
    });

    describe('when disableEscKey is true', () => {
      onCancel = jasmine.createSpy('cancel');
      wrapper = shallow(
        <Modal disableEscKey open onCancel={ onCancel } />
      );

      it('does not call onCancel', () => {
        wrapper.instance().closeModal({ which: 12 });
        expect(onCancel).not.toHaveBeenCalled();
      });
    });
  });

  describe('backgroundHTML', () => {
    describe('when enableBackgroundUI is false', () => {
      it('renders children', () => {
        wrapper = shallow(
          <Modal
            onCancel={ () => {} }
            onConfirm={ () => {} }
            open
            enableBackgroundUI={ false }
          />
        );
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('when enableBackgroundUI is true', () => {
      it('renders children', () => {
        wrapper = shallow(
          <Modal
            onCancel={ () => {} }
            onConfirm={ () => {} }
            open
            enableBackgroundUI
          />
        );
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
