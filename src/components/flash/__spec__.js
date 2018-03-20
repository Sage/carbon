import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Flash from './flash';
import { shallow, mount } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import Portal from './../portal';
import guid from '../../utils/helpers/guid';
jest.mock('../../utils/helpers/guid');

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
      jest.useFakeTimers();
    });

    describe('if open prop has changed', () => {
      it('calls setState', () => {
        defaultInstance.componentWillReceiveProps({ open: false });
        jest.runTimersToTime(2000);
        expect(defaultInstance.setState).toHaveBeenCalledWith({ "open": false} );
      });
    });

    describe('if open prop has not changed', () => {
      it('will not call setState', () => {
        defaultInstance.componentWillReceiveProps({ open: true });
        jest.runTimersToTime(0);
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
      jest.useFakeTimers();
    });

    describe('when the flash is open and a timeout was passed', () => {
      it('calls the dismissHandler after a timeout', () => {
        timeoutInstance = TestUtils.renderIntoDocument(
          <Flash open={ true } onDismiss={ dismissHandler } message="Danger Will Robinson!"
                 as='warning' timeout= { 2000 }/>);
        timeoutInstance.startTimeout();
        jest.runTimersToTime(2000);
        expect(dismissHandler).toHaveBeenCalled();
      });
    });

    describe('when no timeout value is passed', () => {
      it('does not update state or call the dismissHandler', () => {
        defaultInstance.startTimeout();
        jest.runTimersToTime(2000);
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
        jest.runTimersToTime(2000);
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
        jest.runTimersToTime(2000);
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
        defaultInstance.toggleDialog(null)({ preventDefault: spy });
        expect(spy).toHaveBeenCalled();
      });
    });

    it('sets the state to the opposite of what it was', () => {
      defaultInstance.setState({ dialogs: { foo: false }});
      defaultInstance.toggleDialog('foo')();
      expect(defaultInstance.state.dialogs.foo).toBeTruthy();
    });

    it('calls startTimeout if the state is truthy', () => {
      spyOn(defaultInstance, 'startTimeout');
      defaultInstance.setState({ dialogs: { foo: true }});
      defaultInstance.toggleDialog('foo')();
      expect(defaultInstance.startTimeout).toHaveBeenCalled();
    });

    it('calls stopTimeout if the state is falsey', () => {
      spyOn(defaultInstance, 'stopTimeout');
      defaultInstance.setState({ dialogs: { foo: false }});
      defaultInstance.toggleDialog('foo')();
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
        const toggleDialogSpy = jasmine.createSpy();
        spyOn(defaultInstance, 'toggleDialog').and.returnValue(toggleDialogSpy);
        let markup = defaultInstance.findMore("yep ::more:: with dialog");
        expect(markup.props.children[0]).toEqual("yep");
        expect(markup.props.children[2].props.className).toEqual("carbon-flash__link");
        markup.props.children[2].props.onClick();
        expect(defaultInstance.toggleDialog).toHaveBeenCalledWith('yep');
        expect(toggleDialogSpy).toHaveBeenCalled();
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
    let flashInfo;
    beforeEach(() => {
      jest.useFakeTimers();
      flashInfo = mount(
        <Flash
          message='This is some flash info'
          onDismiss={ () => {
            flashInfo.setProps({ open: false });
          } }
          open={ false }
          timeout={ null }
        />
      );

    });

    it('should have not have Portal when close', () => {
      jest.runTimersToTime(0);
      expect(flashInfo.find(Portal).length).toBe(0);
      expect(flashInfo.html()).toEqual(null);
    });

    it('should have have Portal when open', () => {
      flashInfo.setProps({ open: true });
      jest.runTimersToTime(0);
      expect(flashInfo.find(Portal).length).toBe(1);
      expect(flashInfo.html()).not.toEqual(null);
    });

    it('should have clearTimeout when opened and closed', () => {
      flashInfo.setProps({ open: true });
      flashInfo.setProps({ open: false });
      expect(flashInfo.instance().removePortalTimeout).not.toBe(null);
    });

    it('should clearTimeout when closed and reopened', () => {
      flashInfo.setProps({ open: true });
      flashInfo.setProps({ open: false });
      flashInfo.setProps({ open: true });
      expect(flashInfo.instance().removePortalTimeout).toBe(null);
    });

    it('should be success by default', () => {
      flashInfo.setProps({ open: true });
      jest.runTimersToTime(0);
      expect(flashInfo.find(Portal).find('.carbon-flash--success').length).toEqual(1);
      expect(flashInfo.find(Portal).find('.carbon-flash__icon.icon-tick').length).toEqual(1);
    });

    it('should be maintenance', () => {
      flashInfo.setProps({ open: true, as:'maintenance' });
      jest.runTimersToTime(0);
      expect(flashInfo.find(Portal).find('.carbon-flash--maintenance').length).toEqual(1);
      expect(flashInfo.find(Portal).find('.carbon-flash__icon.icon-settings').length).toEqual(1);
    });

    it('should be help', () => {
      flashInfo.setProps({ open: true, as:'help' });
      jest.runTimersToTime(0);
      expect(flashInfo.find(Portal).find('.carbon-flash--help').length).toEqual(1);
      expect(flashInfo.find(Portal).find('.carbon-flash__icon.icon-question').length).toEqual(1);
    });

    it('should be error', () => {
      flashInfo.setProps({ open: true, as:'error' });
      jest.runTimersToTime(0);
      expect(flashInfo.find(Portal).find('.carbon-flash--error').length).toEqual(1);
      expect(flashInfo.find(Portal).find('.carbon-flash__icon.icon-error').length).toEqual(1);
    });

    it('should be new', () => {
      flashInfo.setProps({ open: true, as:'new' });
      jest.runTimersToTime(0);
      expect(flashInfo.find(Portal).find('.carbon-flash--new').length).toEqual(1);
      expect(flashInfo.find(Portal).find('.carbon-flash__icon.icon-gift').length).toEqual(1);
    });

    it('should be warning', () => {
      flashInfo.setProps({ open: true, as:'warning' });
      jest.runTimersToTime(0);
      expect(flashInfo.find(Portal).find('.carbon-flash--warning').length).toEqual(1);
      expect(flashInfo.find(Portal).find('.carbon-flash__icon.icon-warning').length).toEqual(1);
    });

    it('adds the message', () => {
      flashInfo.setProps({ open: true, as:'warning' });
      jest.runTimersToTime(0);
      expect(flashInfo.find(Portal).find('.carbon-flash--warning').length).toEqual(1);
    });

    describe('when no timeout is passed', () => {
      it('adds a close icon', () => {
        flashInfo.setProps({ open: true, as:'warning' });
        expect(flashInfo.find(Portal).find('.carbon-flash__close.icon-close').length).toEqual(1);
      });

      it('adds a click handler that closes the flash', () => {
        flashInfo.setProps({ open: true });
        flashInfo.find(Portal).find('.carbon-flash__close.icon-close').simulate('click');
        jest.runTimersToTime(2000);
        expect(flashInfo.html()).toEqual(null);
      });
    });

    describe('when a timeout is passed', () => {
      it('does not add a close icon', () => {
        flashInfo.setProps({ open: true, as:'warning', timeout:1000 });
        expect(flashInfo.find(Portal).find('.carbon-flash__close.icon-close').length).toEqual(0);
      });
    });

    it('returns a div with the flash class names', () => {
      flashInfo.setProps({ open: true });
      let contentHTML = flashInfo.find('.carbon-flash__content');
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
    let flashInfo;
    let flashInstance;

    beforeEach(() => {
      jest.useFakeTimers();
      flashInfo = mount(
        <Flash
          message='This is some flash info'
          onDismiss={ () => {
            flashInfo.setProps({ open: false });
          } }
          open={ false }
          timeout={ null }
        />
      );
      flashInfo.setProps({ open: true });
      jest.runTimersToTime(0);
      flashInstance = flashInfo.find(Portal).find('.carbon-flash').instance();
    });

    describe('when the flash is open', () => {
      it('renders a parent div with default mainClasses attached', () => {
        expect(flashInstance.className).toMatch('carbon-flash carbon-flash--success');
      });

      it('renders an outer slider element', () => {
        let outerSlider = flashInstance.firstChild.children[0];
        expect(outerSlider.className).toMatch('carbon-flash__slider');
      });

      it('renders an inner flash element', () => {
        let innerFlash = flashInstance.firstChild.children[1].firstChild;
        expect(innerFlash.className).toMatch('carbon-flash__content');
      });
    });
  });

  describe("snapshot", () => {
    guid.mockImplementation(() => 'guid-12345');
    
    jest.useFakeTimers();
    let flashInfo = shallow(
      <Flash
        data-element='bar'
        message='bun::more::dy'
        onDismiss={ () => {} }
        open={ false }
        data-role='baz'
        timeout={ null }
      />
    );
    flashInfo.setProps({ open: true });
    jest.runTimersToTime(0);
    expect(flashInfo).toMatchSnapshot();
  });
});
