import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Flash from './flash';

fdescribe('Flash', () => {
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

  describe('componentWillReceiveProps', () => {
    beforeEach(() => {
      spyOn(defaultInstance, 'setState');
    });

    describe('if open prop has changed', () => {
      it('calls setState', () => {
        defaultInstance.componentWillReceiveProps({ open: false });
        expect(defaultInstance.setState).toHaveBeenCalledWith({ dialogs: {} });
      });
    });

    describe('if open prop has not changed', () => {
      it('does not call setState', () => {
        defaultInstance.componentWillReceiveProps({ open: true });
        expect(defaultInstance.setState).not.toHaveBeenCalled();
      });
    });
  });

  describe('componentDidUpdate', () => {
    beforeEach(() => {
      spyOn(defaultInstance, 'startTimeout');
    });

    it('resets the dialogs array', () => {
      defaultInstance.dialogs = [1,2,3];
      defaultInstance.componentDidUpdate({});
      expect(defaultInstance.dialogs).toEqual([]);
    });

    describe('if open prop has changed', () => {
      it('calls startTimeout', () => {
        defaultInstance.componentDidUpdate({ open: false });
        expect(defaultInstance.startTimeout).toHaveBeenCalled();
      });
    });

    describe('if open prop has not changed', () => {
      it('does not call startTimeout', () => {
        defaultInstance.componentDidUpdate({ open: true });
        expect(defaultInstance.startTimeout).not.toHaveBeenCalled();
      });
    });
  });

  describe('startTimeout', () => {
    beforeEach(() => {
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    describe('when the flash is open and a timeout was passed', () => {
      it('calls the dismissHandler after a timeout', () => {
        timeoutInstance = TestUtils.renderIntoDocument(
          <Flash open={ true } onDismiss={ dismissHandler } message="Danger Will Robinson!"
                 as='warning' timeout= { 2000 }/>);
        timeoutInstance.startTimeout();
        jasmine.clock().tick(2000);
        expect(dismissHandler).toHaveBeenCalled();
      });
    });

    describe('when no timeout value is passed', () => {
      it('does not update state or call the dismissHandler', () => {
        defaultInstance.startTimeout();
        jasmine.clock().tick(2000);
        expect(dismissHandler).not.toHaveBeenCalled();
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
        closedInstance.startTimeout();
        jasmine.clock().tick(2000);
        expect(dismissHandler).not.toHaveBeenCalled();
      });
    });
  });

  describe('stopTimeout', () => {
    it('clears the timeout', () => {
      defaultInstance.timeout = "foo";
      spyOn(window, 'clearTimeout');
      defaultInstance.stopTimeout();
      expect(window.clearTimeout).toHaveBeenCalledWith("foo");
    });
  });

  describe('toggleDialog', () => {
  });

  describe('formatDescription', () => {
  });

  describe('findMore', () => {
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

  describe('title', () => {
  });

  describe('description', () => {
    describe('when not an object', () => {
      it('returns itself', () => {
      });
    });

    describe('when an object', () => {
      describe('with no description', () => {
        it('returns itself', () => {
        });
      });

      describe('with a description', () => {
        it('returns the description', () => {
        });
      });
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
