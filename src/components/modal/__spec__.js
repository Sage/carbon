import React from 'react';
import { shallow } from 'enzyme';
import Modal from './modal';
import Events from './../../utils/helpers/events';
import Browser from './../../utils/helpers/browser';

describe('Modal', () => {
  let wrapper, onCancel;

  describe('componentDidUpdate', () => {
    let mockWindow;

    beforeEach(() => {
      mockWindow = {
        addEventListener() {},
        removeEventListener() {}
      };

      spyOn(Browser, 'getWindow').and.returnValue(mockWindow);
    });

    describe('when the modal is open', () => {
      beforeEach(() => {
        onCancel = jasmine.createSpy('cancel');
        wrapper = shallow(
          <Modal open={ true } onCancel={ onCancel } />
        );
      });

      it('sets up event listeners to resize and close the modal', () => {
        spyOn(mockWindow, 'addEventListener');

        wrapper.instance().componentDidUpdate();
        expect(mockWindow.addEventListener.calls.count()).toEqual(1);
        expect(mockWindow.addEventListener).toHaveBeenCalledWith('keyup', wrapper.instance().closeModal);
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
    });
  });

  describe('closeModal', () => {
    describe('when disableEscKey is false', () => {
      beforeEach(() => {
        onCancel = jasmine.createSpy('cancel');
        wrapper = shallow(
          <Modal open={ true } onCancel={ onCancel } />
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
        <Modal disableEscKey={ true } open={ true } onCancel={ onCancel } />
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
        let wrapper = shallow(
          <Modal
            onCancel={ () => {} }
            onConfirm={ () => {} }
            open={ true }
            enableBackgroundUI={ false }
          />
        );
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('when enableBackgroundUI is true', () => {
      it('renders children', () => {
        let wrapper = shallow(
          <Modal
            onCancel={ () => {} }
            onConfirm={ () => {} }
            open={ true }
            enableBackgroundUI={ true }
          />
        );
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
