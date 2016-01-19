import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Flash from './flash';

describe('Flash', () => {
  let defaultInstance, successInstance, errorInstance, warningInstance, dismissHandler;

  beforeEach(() => {
    dismissHandler = jasmine.createSpy('dismiss');

    defaultInstance = TestUtils.renderIntoDocument(
      <Flash open={ true } onDismiss={ dismissHandler } message="Danger Will Robinson!"/>
    );

    successInstance = TestUtils.renderIntoDocument(
      <Flash open={ true } onDismiss={ dismissHandler } message="Danger Will Robinson!" className='lost-in-space' type='success'/>
    );

    errorInstance = TestUtils.renderIntoDocument(
      <Flash open={ true } onDismiss={ dismissHandler } message="Danger Will Robinson!"  type='error'/>
    );

    warningInstance = TestUtils.renderIntoDocument(
      <Flash open={ true } onDismiss={ dismissHandler } message="Danger Will Robinson!"  type='warning'/>
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
        spyOn(successInstance, 'setState');
      });

      it('updates its state to active', () => {
        defaultInstance.componentDidUpdate();
        expect(defaultInstance.setState).toHaveBeenCalledWith({ active: true });
      });

      describe('when it is a success message', () => {
        it('calls the dismissHandler after a timeout', () => {
          successInstance.componentDidUpdate();
          jasmine.clock().tick(2000);
          expect(dismissHandler).toHaveBeenCalled();
        });

        it('updates its state to inactive after a timeout', () => {
          successInstance.componentDidUpdate();
          jasmine.clock().tick(2000);
          expect(successInstance.setState).toHaveBeenCalledWith({ active: false });
        });
      });
    });

    describe('when the flash is closed', () => {
      let closedInstance;

      beforeEach(() => {
        closedInstance = TestUtils.renderIntoDocument(
          <Flash open={ false } dismissHandler={ dismissHandler } message="Danger Will Robinson!" />
        );
        spyOn(closedInstance, 'setState').and.callThrough();
      });

      it('does not update state or call the dismissHandler', () => {
        closedInstance.componentDidUpdate();
        expect(closedInstance.setState).not.toHaveBeenCalled();

        jasmine.clock().tick(2000);

        expect(closedInstance.setState).not.toHaveBeenCalled();
        expect(dismissHandler).not.toHaveBeenCalled();
      });
    });
  });

  describe('messageClasses', () => {
    it('returns the message classes', () => {
      expect(defaultInstance.messageClasses).toMatch('ui-flash__message');
    });
  });

  describe('flashClasses', () => {
    it('returns the flash classes', () => {
      expect(defaultInstance.flashClasses).toMatch('ui-flash__flash');
    });
  });

  describe('sliderClasses', () => {
    it('returns the main slider class', () => {
      expect(defaultInstance.sliderClasses).toMatch('ui-flash__slider');
    });

    describe('when no type has been specified', () => {
      it('returns the alert slider class by default', () => {
        expect(defaultInstance.sliderClasses).toMatch('ui-flash__slider--alert');
      });
    });

    describe('when a different type has been set', () => {
      it('returns the corresponding class', () => {
        expect(successInstance.sliderClasses).toMatch('ui-flash__slider--success');
      });
    });
  });

  describe('typeIcon', () => {
    it('returns the alert icon by default', () => {
      let alertFlash = TestUtils.findRenderedDOMComponentWithClass(defaultInstance, 'ui-flash');
      let iconSVG = alertFlash.getElementsByTagName('svg')[0];
      expect(iconSVG.getAttribute('class')).toMatch('ui-flash__alertIcon');
    });

    //pending svgs from UX team
    xdescribe('when a different type has been set', () => {
      it('returns a success icon if it is a success flash', () => {
        let successFlash = TestUtils.findRenderedDOMComponentWithClass(successInstance, 'ui-flash');
        let iconSVG = successFlash.getElementsByTagName('svg')[0];
        expect(iconSVG.getAttribute('class')).toMatch('ui-flash__successIcon');
      });

      it('returns an error icon if it is a error flash', () => {
        let errorFlash = TestUtils.findRenderedDOMComponentWithClass(errorInstance, 'ui-flash');
        let iconSVG = errorFlash.getElementsByTagName('svg')[0];
        expect(iconSVG.getAttribute('class')).toMatch('ui-flash__errorIcon');
      });

      it('returns a warning icon if it is a warning flash', () => {
        let warningFlash = TestUtils.findRenderedDOMComponentWithClass(warningInstance, 'ui-flash');
        let iconSVG = warningFlash.getElementsByTagName('svg')[0];
        expect(iconSVG.getAttribute('class')).toMatch('ui-flash__warningIcon');
      });
    });
  });

  describe('flashHTML', () => {
    let successFlash, alertFlash;

    beforeEach(() => {
      successFlash = TestUtils.findRenderedDOMComponentWithClass(successInstance, 'ui-flash');
      alertFlash = TestUtils.findRenderedDOMComponentWithClass(defaultInstance, 'ui-flash');
    });

    it('adds an icon', () => {
      expect(successFlash.getElementsByClassName('ui-flash__icon').length).toEqual(1);
    });

    it('adds the message', () => {
      let messageHTML = successFlash.getElementsByTagName('h3')[0];
      expect(messageHTML.className).toEqual('ui-flash__message');
    });

    describe('when it is not a success flash', () => {
      it('adds a close icon', () => {
        let iconHTML = alertFlash.getElementsByClassName('ui-flash__icon');
        expect(iconHTML.length).toEqual(1);
      });

      it('adds a click handler that closes the flash', () => {
        let closeIcon = alertFlash.getElementsByClassName('ui-flash__closeIcon')[0];
        TestUtils.Simulate.click(closeIcon);
        expect(dismissHandler).toHaveBeenCalled();
      });
    });

    it('returns a div with the flash class names', () => {
      expect(defaultInstance.flashHTML.props.className).toMatch('ui-flash__flash');
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
      it('renders a parent div with mainClasses attached', () => {
        expect(flashInstance.className).toMatch('ui-flash');
      });

      it('renders an outer slider element', () => {
        expect(outerSlider.className).toMatch('ui-flash__slider');
      });

      it('renders an inner flash element', () => {
        let innerFlash = flashInstance.firstChild.children[1].firstChild;
        expect(innerFlash.className).toMatch('ui-flash__flash');
      });
    });
  });
});
