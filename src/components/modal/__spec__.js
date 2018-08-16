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
        addEventListener() {},
        removeEventListener() {}
      };
      jest.useFakeTimers();
      wrapper = shallow(
        <Modal open onCancel={ onCancel } />
      );
      spyOn(Browser, 'getWindow').and.returnValue(mockWindow);
      spyOn(mockWindow, 'addEventListener');
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('binds the key event listener to the window', () => {
      wrapper.instance().componentDidMount();
          expect(mockWindow.addEventListener.calls.count()).toEqual(1);
          expect(mockWindow.addEventListener).toHaveBeenCalled();
    });

  });
  
  describe('componentWillUnmount', () => {
    beforeEach(() => {
      mockWindow = {
        addEventListener() {},
        removeEventListener() {}
      };
      jest.useFakeTimers();
      wrapper = shallow(
        <Modal open onCancel={ onCancel } />
      );
      spyOn(Browser, 'getWindow').and.returnValue(mockWindow);
      spyOn(mockWindow, 'removeEventListener');
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('binds the key event listener to the window', () => {
      wrapper.instance().componentWillUnmount();
          expect(mockWindow.removeEventListener.calls.count()).toEqual(1);
          expect(mockWindow.removeEventListener).toHaveBeenCalled();
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
          <Modal open onCancel={ onCancel } />
        );
      });

      afterEach(() => {
        jest.useRealTimers();
      });

      it('clears the opentimeout and sets data state to open', () => {
        spyOn(mockWindow, 'removeEventListener');
        spyOn(window, 'setTimeout');
        jest.useFakeTimers();
        wrapper.instance().componentDidUpdate();
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
