import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Toast from './toast';

describe('Toast', () => {
  let instance, onDismissSpy;

  describe('when toast is closed', () => {
    it('renders null', () => {
      instance = TestUtils.renderIntoDocument(
        <Toast open={ false } as="info" className="custom" onDismiss={ () => {} }>
          foobar
        </Toast>
      );

      let content = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div');
      expect(content.length).toEqual(0);
    });
  });

  describe('when toast is open with onDismiss prop', () => {
    beforeEach(() => {
      onDismissSpy = jasmine.createSpy();
      instance = TestUtils.renderIntoDocument(
        <Toast open={ true } as="info" className="custom" onDismiss={ onDismissSpy }>
          foobar
        </Toast>
      );
    });

    it('renders the component with correct classes', () => {
      let classes = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-toast').className;
      expect(classes).toEqual("ui-toast custom ui-toast--info toast-appear");
    });

    it('renders type div', () => {
      let icon = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-toast__type');
      expect(icon.className).toEqual("ui-toast__type");
    });

    it('renders type icon', () => {
      let icon = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-toast__type-icon');
      expect(icon.className).toEqual("ui-icon ui-toast__type-icon icon-info");
    });

    it('renders child content', () => {
      let content = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-toast__content').textContent;
      expect(content).toEqual("foobar");
    })

    it('renders close icon', () => {
      let icon = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-toast__close');
      expect(icon.className).toEqual('ui-icon ui-toast__close icon-close');
    });

    it('calls onDismiss method when clicking close', () => {
      let icon = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-toast__close');
      TestUtils.Simulate.click(icon);
      expect(onDismissSpy).toHaveBeenCalled();
    });
  });

  describe('when toast is open without onDismiss prop', () => {
    beforeEach(() => {
      onDismissSpy = jasmine.createSpy();
      instance = TestUtils.renderIntoDocument(
        <Toast open={ true } as="info" className="custom">
          foobar
        </Toast>
      );
    });

    it('does not renders close icon', () => {
      let icon = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'ui-toast__close');
      expect(icon.length).toEqual(0);
    });
  });
});
