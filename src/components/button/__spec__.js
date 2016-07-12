import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import Button from './button';
import Link from './../link';

describe('Button', () => {

  let defaultButton, primary, secondary, small, disabled, multiple, anchor, to;
  let spy = jasmine.createSpy('spy')

  beforeEach(() => {

    defaultButton = TestUtils.renderIntoDocument(
      <Button>Save</Button>
    );

    primary = TestUtils.renderIntoDocument(
      <Button
        name="Primary Button"
        as="primary"
        onClick={ spy }
      >Primary</Button>
    );

    secondary = TestUtils.renderIntoDocument(
      <Button
        name="Secondary Button"
        className="customClass"
      >Secondary</Button>
    );

    small = TestUtils.renderIntoDocument(
      <Button
        name="Small Button"
        as='small'
      >Small</Button>
    );

    disabled = TestUtils.renderIntoDocument(
      <Button
        name="Disabled Button"
        disabled={ true }
      >Disabled</Button>
    );

    multiple = TestUtils.renderIntoDocument(
      <Button
        name="Multiple As"
        as={[ 'foo', 'bar' ]}
      >Multiple</Button>
    );

    anchor = TestUtils.renderIntoDocument(
      <Button href="/foo">Anchor</Button>
    );

    to = TestUtils.renderIntoDocument(
      <Button to="/foo">To</Button>
    );
  });

  describe('A basic button', () => {
    it('renders a button with defaults', () => {
      expect(defaultButton.props.as).toEqual('secondary');
      expect(defaultButton.props.children).toEqual('Save');
      expect(defaultButton.props.disabled).toEqual(false);
    });
  });

  describe('A primary button', () => {
    it('renders a primary button', () => {
      expect(primary.props.name).toEqual('Primary Button');
      expect(primary.props.as).toEqual('primary');
      expect(primary.props.children).toEqual('Primary');
      expect(primary.props.disabled).toEqual(false);
    });
  });

  describe('A secondary button', () => {
    it('renders a secondary button', () => {
      expect(secondary.props.name).toEqual('Secondary Button');
      expect(secondary.props.as).toEqual('secondary');
      expect(secondary.props.children).toEqual('Secondary');
      expect(secondary.props.disabled).toEqual(false);
    });
  });

  describe('A small button', () => {
    it('renders a small button', () => {
      expect(small.props.name).toEqual('Small Button');
      expect(small.props.as).toEqual('small');
      expect(small.props.children).toEqual('Small');
      expect(small.props.disabled).toEqual(false);
    });
  });

  describe('A disabled button', () => {
    it('renders a disabled button', () => {
      expect(disabled.props.name).toEqual('Disabled Button');
      expect(disabled.props.as).toEqual('secondary');
      expect(disabled.props.children).toEqual('Disabled');
      expect(disabled.props.disabled).toEqual(true);
    });
  });

  describe('Class names', () => {
    let defaultDOM;
    let disabledDOM;
    let primaryDOM;
    let secondaryDOM;
    let smallDOM;
    let multipleDOM;

    beforeEach(() => {
      defaultDOM = ReactDOM.findDOMNode(defaultButton);
      primaryDOM = ReactDOM.findDOMNode(primary);
      secondaryDOM = ReactDOM.findDOMNode(secondary);
      smallDOM = ReactDOM.findDOMNode(small);
      multipleDOM = ReactDOM.findDOMNode(multiple);
      disabledDOM = ReactDOM.findDOMNode(disabled);
    });

    it('adds a className of ui-button to all buttons', () => {
      expect(defaultDOM.classList[0]).toEqual('ui-button');
      expect(primaryDOM.classList[0]).toEqual('ui-button');
      expect(secondaryDOM.classList[0]).toEqual('ui-button');
      expect(disabledDOM.classList[0]).toEqual('ui-button');
      expect(smallDOM.classList[0]).toEqual('ui-button');
    });

    it('adds a secondary class depending on its type', () => {
      expect(primaryDOM.classList[1]).toEqual('ui-button--primary')
      expect(secondaryDOM.classList[1]).toEqual('ui-button--secondary')
      expect(smallDOM.classList[1]).toEqual('ui-button--small')
    });

    it('adds all variations of as', () => {
      expect(multipleDOM.className).toEqual('ui-button ui-button--foo ui-button--bar')
    });

    it('adds a disabled class if the button is disabled', () => {
      expect(disabledDOM.classList[2]).toEqual('ui-button--disabled')
      expect(defaultDOM.classList[2]).toBeFalsy();
    });
  });

  describe('Passing a custom onClick', () => {
    let primaryDOM;

    beforeEach(() => {
      primaryDOM = ReactDOM.findDOMNode(primary)
    });

    it('triggers when the button is clicked', () => {
      TestUtils.Simulate.click(primaryDOM);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('render', () => {
    describe('default', () => {
      it('renders a button', () => {
        let b = TestUtils.findRenderedDOMComponentWithClass(defaultButton, 'ui-button');
        expect(b.tagName).toEqual('BUTTON');
      });
    });

    describe('with href', () => {
      it('renders an anchor', () => {
        expect(TestUtils.findRenderedComponentWithType(anchor, Link)).toBeDefined();
      });
    });

    describe('with to', () => {
      it('renders an anchor', () => {
        expect(TestUtils.findRenderedComponentWithType(to, Link)).toBeDefined();
      });
    });
  });
});
