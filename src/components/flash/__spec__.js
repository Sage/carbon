import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Flash from './flash';

fdescribe('Flash', () => {
  let defaultInstance, customInstance;
  let cancelHandler = jasmine.createSpy('cancel');

  beforeEach(() => {
    defaultInstance = TestUtils.renderIntoDocument(
      <Flash open={ true } cancelHandler={ cancelHandler } message="Danger Will Robinson!"/>
    );

    customInstance = TestUtils.renderIntoDocument(
      <Flash open={ true } cancelHandler={ cancelHandler } message="Danger Will Robinson!" className='lost-in-space' mode='success'/>
    );
  });

  describe('componentDidUpdate', () => {
    beforeEach(() => {
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    describe('when the flash is open', () => {
      beforeEach(() => {
        spyOn(defaultInstance, 'setState');
      });

      it('updates its state to active', () => {
        defaultInstance.componentDidUpdate();
        expect(defaultInstance.setState).toHaveBeenCalledWith({ active: true });
      });

      it('calls the cancelHandler after a timeout', () => {
        defaultInstance.componentDidUpdate();
        jasmine.clock().tick(2000);
        expect(cancelHandler).toHaveBeenCalled();
      });

      it('updates its state to inactive after a timeout', () => {
        defaultInstance.componentDidUpdate();
        jasmine.clock().tick(2000);
        expect(defaultInstance.setState).toHaveBeenCalledWith({ active: false });
      });
    });

    describe('when the flash is closed', () => {
      let closedInstance;

      beforeEach(() => {
        closedInstance = TestUtils.renderIntoDocument(
          <Flash open={ false } cancelHandler={ cancelHandler } message="Danger Will Robinson!"/>
        );
        spyOn(closedInstance, 'setState').and.callThrough();
      });

      xdit('does not update state or call the cancelHandler', () => {
        closedInstance.componentDidUpdate();
        expect(closedInstance.setState).not.toHaveBeenCalled();

        jasmine.clock().tick(2000);

        expect(closedInstance.setState).not.toHaveBeenCalled();
        expect(cancelHandler).not.toHaveBeenCalled();
      });
    });
  });

  fdescribe('mainClasses', () => {
    it('returns the main class', () => {
      expect(defaultInstance.mainClasses).toMatch('ui-flash');
    });

    describe('when custom classes have been passed', () => {
      it('adds the custom classes', () => {

      });
    });
  });

  describe('messageClasses', () => {
    it('returns the message classes', () => {

    });
  });

  describe('flashClasses', () => {
    it('returns the flash classes', () => {

    });
  });

  describe('sliderClasses', () => {
    it('returns the main slider class', () => {

    });

    it('returns the alert slider class by default', () => {

    });

    describe('when a different mode has been set', () => {
      it('returns the corresponding class', () => {

      });
    });
  });

  describe('typeIcon', () => {
    it('returns the alert icon', () => {

    });

    describe('when a different mode has been set', () => {
      it('returns the corresponding icon', () => {

      });
    });
  });

  describe('flashHTML', () => {
    it('adds an icon', () => {

    });

    it('adds the message', () => {

    });

    describe('when it is not a success flash', () => {
      it('adds a close icon', () => {

      });

      it('adds a click handler that closes the flash', () => {

      });
    });

    it('returns a div with the flash class names', () => {

    });
  });

  describe('sliderHTML', () => {
    it('returns a div with the slider class names', () => {

    });
  });

  describe('render', () => {
    describe('when the flash is open', () => {
      it('renders a parent div with mainClasses attached', () => {
      });

      it('renders an outer slider element', () => {

      });

      it('renders an inner flash element', () => {

      });
    });
  });
});
