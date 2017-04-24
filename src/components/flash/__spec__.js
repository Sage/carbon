import React from 'react';
import PropTypes from 'prop-types';
import TestUtils from 'react-dom/test-utils';
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

    it('calls startTimeout', () => {
      defaultInstance.componentDidUpdate({ open: false });
      expect(defaultInstance.startTimeout).toHaveBeenCalled();
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

    describe('when a dialog is open', () => {
      it('does not update state or call the dismissHandler', () => {
        timeoutInstance = TestUtils.renderIntoDocument(
          <Flash open={ true } onDismiss={ dismissHandler } message="Danger Will Robinson!"
                 as='warning' timeout= { 2000 }/>);
        timeoutInstance.setState({ dialogs: { foo: true, bar: false }});
        timeoutInstance.startTimeout();
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
    describe("if there is an event", () => {
      it('calls preventDefault on it', () => {
        let spy = jasmine.createSpy('preventDefault');
        defaultInstance.toggleDialog(null, { preventDefault: spy });
        expect(spy).toHaveBeenCalled();
      });
    });

    it('sets the state to the opposite of what it was', () => {
      defaultInstance.setState({ dialogs: { foo: false }});
      defaultInstance.toggleDialog('foo');
      expect(defaultInstance.state.dialogs.foo).toBeTruthy();
    });

    it('calls startTimeout if the state is truthy', () => {
      spyOn(defaultInstance, 'startTimeout');
      defaultInstance.setState({ dialogs: { foo: true }});
      defaultInstance.toggleDialog('foo');
      expect(defaultInstance.startTimeout).toHaveBeenCalled();
    });

    it('calls stopTimeout if the state is falsey', () => {
      spyOn(defaultInstance, 'stopTimeout');
      defaultInstance.setState({ dialogs: { foo: false }});
      defaultInstance.toggleDialog('foo');
      expect(defaultInstance.stopTimeout).toHaveBeenCalled();
    });
  });

  describe('formatDescription', () => {
    describe('if the item is an array', () => {
      it('adds each item', () => {
        let items = defaultInstance.formatDescription(["foo", "bar"]);
        expect(items.props.children[0].props.children).toEqual("foo");
        expect(items.props.children[1].props.children).toEqual("bar");
      });
    });

    describe('if the item is an object', () => {
      it('adds each item', () => {
        let items = defaultInstance.formatDescription({foo: "bar"});
        expect(items.props.children[0].props.children.props.children[0]).toEqual("foo");
        expect(items.props.children[0].props.children.props.children[1]).toEqual(": ");
        expect(items.props.children[0].props.children.props.children[2]).toEqual("bar");
      });
    });

    describe('if the item is a string', () => {
      it('adds the string', () => {
        let items = defaultInstance.formatDescription("foobar");
        expect(items).toEqual("foobar");
      });
    });
  });

  describe('findMore', () => {
    describe('if the text is not a string', () => {
      it('returns the text', () => {
        expect(defaultInstance.findMore(["nope"])).toEqual(["nope"]);
      });
    });

    describe('if the text does not contain ::more::', () => {
      it('returns the text', () => {
        expect(defaultInstance.findMore("nope")).toEqual("nope");
      });
    });

    describe('if the text does contains ::more::', () => {
      it('returns the text and creates an alert', () => {
        spyOn(defaultInstance, 'toggleDialog');
        let markup = defaultInstance.findMore("yep ::more:: with dialog");
        expect(markup.props.children[0]).toEqual("yep");
        expect(markup.props.children[2].props.className).toEqual("carbon-flash__link");
        markup.props.children[2].props.onClick();
        expect(defaultInstance.toggleDialog).toHaveBeenCalled();
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

    it('returns an warning icon if it is an warning flash', () => {
      expect(warningInstance.iconType).toEqual('warning');
    });

    it('returns an error icon if it is an error flash', () => {
      expect(errorInstance.iconType).toEqual('error');
    });
  });

  describe('description', () => {
    describe('when not an object', () => {
      it('returns itself', () => {
        let instance = TestUtils.renderIntoDocument(
          <Flash open={ true } onDismiss={ dismissHandler } message="Danger Will Robinson!" />
        );
        expect(instance.description).toEqual("Danger Will Robinson!");
      });
    });

    describe('when an object', () => {
      describe('with no description', () => {
        it('returns itself', () => {
          let instance = TestUtils.renderIntoDocument(
            <Flash open={ true } onDismiss={ dismissHandler } message={{ other: "Danger Will Robinson!" }} />
          );
          expect(instance.description).toEqual({ other: "Danger Will Robinson!" });
        });
      });

      describe('with a description', () => {
        it('returns the description', () => {
          let instance = TestUtils.renderIntoDocument(
            <Flash open={ true } onDismiss={ dismissHandler } message={{ description: "Danger Will Robinson!" }} />
          );
          expect(instance.description).toEqual("Danger Will Robinson!");
        });
      });
    });
  });

  describe('flashHTML', () => {
    let successFlash, alertFlash, timeoutFlash;

    beforeEach(() => {
      successFlash = TestUtils.findRenderedDOMComponentWithClass(successInstance, 'carbon-flash');
      alertFlash = TestUtils.findRenderedDOMComponentWithClass(defaultInstance, 'carbon-flash');
      timeoutFlash = TestUtils.findRenderedDOMComponentWithClass(timeoutInstance, 'carbon-flash');
    });

    it('adds an icon', () => {
      expect(successFlash.getElementsByClassName('carbon-flash__icon').length).toEqual(1);
    });

    it('adds the message', () => {
      let messageHTML =  alertFlash.getElementsByClassName('carbon-flash__message');
      expect(messageHTML.length).toEqual(1);
    });

    describe('when no timeout is passed', () => {
      it('adds a close icon', () => {
        let iconHTML = alertFlash.getElementsByClassName('carbon-flash__icon');
        expect(iconHTML.length).toEqual(1);
      });

      it('adds a click handler that closes the flash', () => {
        let closeIcon = alertFlash.getElementsByClassName('carbon-flash__close')[0];
        TestUtils.Simulate.click(closeIcon);
        expect(dismissHandler).toHaveBeenCalled();
      });
    });

    describe('when a timeout is passed', () => {
      it('does not add a close icon', () => {
        let iconHTML = timeoutFlash.getElementsByClassName('carbon-flash__icon');
        expect(iconHTML.length).toEqual(0);
      });
    });

    it('returns a div with the flash class names', () => {
      let contentHTML = alertFlash.getElementsByClassName('carbon-flash__content');
      expect(contentHTML.length).toEqual(1);
    });
  });

  describe('sliderHTML', () => {
    it('returns a div with the slider class names', () => {
      it('returns a div with the slider class names', () => {
        expect(defaultInstance.props.className).toMatch('carbon-flash__slider');
      });
    });
  });

  describe('render', () => {
    let flashInstance, outerSlider;

    beforeEach(() => {
      flashInstance = TestUtils.findRenderedDOMComponentWithClass(defaultInstance, 'carbon-flash');
      outerSlider = flashInstance.firstChild.children[0];
    });

    describe('when the flash is open', () => {
      it('renders a parent div with default mainClasses attached', () => {
        expect(flashInstance.className).toMatch('carbon-flash carbon-flash--success');
      });

      it('renders an outer slider element', () => {
        expect(outerSlider.className).toMatch('carbon-flash__slider');
      });

      it('renders an inner flash element', () => {
        let innerFlash = flashInstance.firstChild.children[1].firstChild;
        expect(innerFlash.className).toMatch('carbon-flash__content');
      });
    });
  });
});
