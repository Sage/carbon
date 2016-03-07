import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Flash from './flash';

describe('Flash', () => {
  let defaultInstance, successInstance, errorInstance, warningInstance, timeoutInstance,
      customIconInstance, dismissHandler;

  beforeEach(() => {
    dismissHandler = jasmine.createSpy('dismiss');

    defaultInstance = TestUtils.renderIntoDocument(
      <Flash open={ true } onDismiss={ dismissHandler } message="Danger Will Robinson!"/>
    );

    successInstance = TestUtils.renderIntoDocument(
      <Flash open={ true } onDismiss={ dismissHandler } message="Danger Will Robinson!"
             className='lost-in-space' as='success'/>
    );

    errorInstance = TestUtils.renderIntoDocument(
      <Flash open={ true } onDismiss={ dismissHandler } message="Danger Will Robinson!"
             as='error'/>
    );

    warningInstance = TestUtils.renderIntoDocument(
      <Flash open={ true } onDismiss={ dismissHandler } message="Danger Will Robinson!"
             as='warning'/>
    );

    timeoutInstance = TestUtils.renderIntoDocument(
      <Flash open={ false } onDismiss={ dismissHandler } message="Danger Will Robinson!"
             as='warning' timeout= { 2000 }/>
    );

    customIconInstance = TestUtils.renderIntoDocument(
      <Flash open={ true } onDismiss={ dismissHandler } message="Danger Will Robinson!"
             as='special'/>
    );
  });

  describe('componentDidUpdate', () => {
    beforeEach(() => {
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    describe('when the flash is open and a timeout was passed', () => {
      describe('when its open state has changed', () => {

        it('calls the dismissHandler after a timeout', () => {
          let prevProps = { open: false };

          timeoutInstance = TestUtils.renderIntoDocument(
            <Flash open={ true } onDismiss={ dismissHandler } message="Danger Will Robinson!"
                   as='warning' timeout= { 2000 }/>);
          timeoutInstance.componentDidUpdate(prevProps);
          jasmine.clock().tick(2000);
          expect(dismissHandler).toHaveBeenCalled();
        });
      });

      describe('when its open state has not changed', () => {
        it('call the dismissHandler', () => {
          let prevProps = { open: true };

          timeoutInstance = TestUtils.renderIntoDocument(
            <Flash open={ true } onDismiss={ dismissHandler } message="Danger Will Robinson!"
                   as='warning' timeout= { 2000 }/>);

          timeoutInstance.componentDidUpdate(prevProps);
          jasmine.clock().tick(2000);
          expect(dismissHandler).not.toHaveBeenCalled();
        });
      });
    });

    describe('when no timeout value is passed', () => {
      beforeEach(() => {
        spyOn(defaultInstance, 'calculateTimeout');
      });

      it('calculates the timeout based on message length', () => {
        let prevProps = { open: true };
        defaultInstance.componentDidUpdate(prevProps);
        jasmine.clock().tick(2000);
        expect(defaultInstance.calculateTimeout).toHaveBeenCalled();
      });
    });

    describe('when the flash is closed', () => {
      let closedInstance;

      beforeEach(() => {
        closedInstance = TestUtils.renderIntoDocument(
          <Flash open={ false } onDismiss={ dismissHandler } message="Danger Will Robinson!" />
        );
      });

      it('does not update state or call the dismissHandler', () => {
        let prevProps = { open: false };
        closedInstance.componentDidUpdate(prevProps);
        jasmine.clock().tick(2000);
        expect(dismissHandler).not.toHaveBeenCalled();
      });
    });
  });

  describe('iconType', () => {
    it('returns the icon corresponding to the flash as by default', () => {
      expect(customIconInstance.iconType).toEqual('special');
    });

    it('returns a tick icon if it is a success flash', () => {
      expect(successInstance.iconType).toEqual('tick');
    });

    it('returns an warning icon if it is an error or alert flash', () => {
      expect(warningInstance.iconType).toEqual('warning');
      expect(errorInstance.iconType).toEqual('warning');
    });
  });

  describe('flashHTML', () => {
    let successFlash, alertFlash, timeoutFlash;

    beforeEach(() => {
      successFlash = TestUtils.findRenderedDOMComponentWithClass(successInstance, 'ui-flash');
      alertFlash = TestUtils.findRenderedDOMComponentWithClass(defaultInstance, 'ui-flash');
      timeoutFlash = TestUtils.findRenderedDOMComponentWithClass(timeoutInstance, 'ui-flash');
    });

    it('adds an icon', () => {
      expect(successFlash.getElementsByClassName('ui-flash__icon').length).toEqual(1);
    });

    it('adds the message', () => {
      let messageHTML =  alertFlash.getElementsByClassName('ui-flash__message');
      expect(messageHTML.length).toEqual(1);
    });

    describe('when no timeout is passed', () => {
      it('adds a close icon', () => {
        let iconHTML = alertFlash.getElementsByClassName('ui-flash__icon');
        expect(iconHTML.length).toEqual(1);
      });

      it('adds a click handler that closes the flash', () => {
        let closeIcon = alertFlash.getElementsByClassName('ui-flash__close-icon')[0];
        TestUtils.Simulate.click(closeIcon);
        expect(dismissHandler).toHaveBeenCalled();
      });
    });

    describe('when a timeout is passed', () => {
      it('does not add a close icon', () => {
        let iconHTML = timeoutFlash.getElementsByClassName('ui-flash__icon');
        expect(iconHTML.length).toEqual(0);
      });
    });

    it('returns a div with the flash class names', () => {
      let contentHTML = alertFlash.getElementsByClassName('ui-flash__content');
      expect(contentHTML.length).toEqual(1);
    });
  });

  describe('sliderHTML', () => {
    it('returns a div with the slider class names', () => {
      it('returns a div with the slider class names', () => {
        expect(defaultInstance.props.className).toMatch('ui-flash__slider');
      });
    });
  });

  describe('render', () => {
    let flashInstance, outerSlider;

    beforeEach(() => {
      flashInstance = TestUtils.findRenderedDOMComponentWithClass(defaultInstance, 'ui-flash');
      outerSlider = flashInstance.firstChild.children[0];
    });

    describe('when the flash is open', () => {
      it('renders a parent div with default mainClasses attached', () => {
        expect(flashInstance.className).toMatch('ui-flash ui-flash--success');
      });

      it('renders an outer slider element', () => {
        expect(outerSlider.className).toMatch('ui-flash__slider');
      });

      it('renders an inner flash element', () => {
        let innerFlash = flashInstance.firstChild.children[1].firstChild;
        expect(innerFlash.className).toMatch('ui-flash__content');
      });
    });
  });
});
