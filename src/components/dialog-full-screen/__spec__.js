import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import DialogFullScreen from './dialog-full-screen';
import Button from './../button';
import Heading from './../heading';

describe('DialogFullScreen', () => {
  let instance,
      onCancel = jasmine.createSpy('cancel');

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <DialogFullScreen
        onCancel={ onCancel }
        className="foo"
        open={ true }
        title='my title'
      >
        <Button>Button</Button>
        <Button>Button</Button>
      </DialogFullScreen>
    );
  });

  describe('default props', () => {
    it('sets enableBackgroundUI to true', () => {
      expect(instance.props.enableBackgroundUI).toBeTruthy();
    });
  });

  describe('dialogClasses', () => {
    it('returns the full screen dialog class', () => {
      expect(instance.dialogClasses).toEqual('carbon-dialog-full-screen__dialog');
    });
  });

  describe('mainClasses', () => {
    it('returns the full screen dialog class and custom class', () => {
      expect(instance.mainClasses).toEqual('foo carbon-dialog-full-screen');
    });
  });

  describe('modalHTML', () => {
    it('renders a parent div with mainClasses attached', () => {
      let dialogNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(dialogNode.className).toEqual('foo carbon-dialog-full-screen');
    });

    it('renders the dialog', () => {
      expect(instance._dialog).toBeTruthy();
      expect(instance._dialog.classList[0]).toEqual('carbon-dialog-full-screen__dialog');
    });

    it('closes when the exit icon is click', () => {
      let closeIcon = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-dialog-full-screen__close');
      TestUtils.Simulate.click(closeIcon);
      expect(onCancel).toHaveBeenCalled();
    });

    it('renders the children passed to it', () => {
      let buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');
      expect(buttons.length).toEqual(2);
    });
  });

  describe('title', () => {
    describe('is a string', () => {
      it('renders the title within a h2', () => {
        let titleNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'h2')[0];
        expect(titleNode.className).toEqual('carbon-dialog-full-screen__title');
        expect(titleNode.innerText).toEqual('my title');
      });
    });

    describe('is an object', () => {
      beforeEach(() => {
        let titleHeading = <Heading title='my custom heading' />;
        instance = TestUtils.renderIntoDocument(
          <DialogFullScreen
            onCancel={ onCancel }
            className="foo"
            open={ true }
            title={ titleHeading }
          >
            <Button>Button</Button>
            <Button>Button</Button>
          </DialogFullScreen>
        );
      });

      it('renders the component directly', () => {
        let heading = TestUtils.findRenderedComponentWithType(instance, Heading);
        expect(heading.props.title).toEqual('my custom heading');
      });
    });
  });
});
