import React from 'react';
import PropTypes from 'prop-types';
import TestUtils from 'react-dom/test-utils';
import DialogFullScreen from './dialog-full-screen';
import I18n from 'i18n-js';
import Bowser from 'bowser';
import Button from './../button';

describe('DialogFullScreen', () => {
  let instance,
      onCancel = jasmine.createSpy('cancel');

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <DialogFullScreen
        onCancel={ onCancel }
        className="foo"
        open={ true }
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
});
