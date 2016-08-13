import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import Message from './message';

describe('Message', () => {
  let warningMessage, infoMessage, errorMessage, customMessage, spy;

  beforeEach(() => {
    spy = jasmine.createSpy('dismiss');

    warningMessage = TestUtils.renderIntoDocument(
      <Message as='warning' onDismiss={ spy } open={true} title='My Title' transparent={true}>Some warning</Message>
    )

    infoMessage = TestUtils.renderIntoDocument(
      <Message as='info' open={true}>Some information</Message>
    )

    errorMessage = TestUtils.renderIntoDocument(
      <Message as='error' open={true}>Some error</Message>
    )

    customMessage = TestUtils.renderIntoDocument(
      <Message className='fancy' as='info' open={true}>Some information</Message>
    )
  });

  describe('A Message Instance', () => {
    it('renders children passed to it', () => {
      expect(warningMessage.props.children).toEqual('Some warning');
    });

    it('sets a dialog header', () => {
      let header = TestUtils.findRenderedDOMComponentWithClass(warningMessage, 'ui-message__title');
      expect(header.textContent).toEqual('My Title');
    });

    it('renders type icon', () => {
      let icon = TestUtils.findRenderedDOMComponentWithClass(errorMessage, 'ui-message__type-icon');
      expect(icon.className).toEqual("ui-icon ui-message__type-icon icon-error");
    });

    describe('dismiss', () => {
      describe('when onDismiss is passed', () => {
        it('adds a close icon', () => {
          expect(TestUtils.findRenderedDOMComponentWithClass(warningMessage, 'ui-message__close')).toBeDefined();
        });
      });

      describe('when onDismiss is not passed', () => {
        it('does not add a close icon', () => {
          expect(TestUtils.scryRenderedDOMComponentsWithClass(errorMessage, 'ui-message__close').length).toEqual(0);
        });
      });
    });
  });

  describe('class names', () => {
    let warningDOM, infoDOM, customDOM;

    beforeEach(() => {
      warningDOM = ReactDOM.findDOMNode(warningMessage);
      infoDOM = ReactDOM.findDOMNode(infoMessage);
      customDOM = ReactDOM.findDOMNode(customMessage);
    });

    it("adds a className ui-message--warning when type is warning", () =>{
      expect(warningDOM.className.indexOf('ui-message--warning')).not.toEqual(-1);
    });

    it("adds a className ui-message--transparent when transparent is true", () =>{
      expect(warningDOM.className.indexOf('ui-message--transparent')).not.toEqual(-1);
    });

    it("adds a className ui-message--dismissable when onDismiss is defined", () =>{
      expect(warningDOM.className.indexOf('ui-message--dismissable')).not.toEqual(-1);
    });

    it('adds a className of ui-message--info when type is info', () => {
      expect(infoDOM.className).toEqual('ui-message ui-message--info');
    });

    it('adds any additional classes passed', () => {
      expect(customDOM.className).toEqual('ui-message fancy ui-message--info');
    });
  });

  describe('when message is closed', () => {
    it('renders null', () => {
      let instance = TestUtils.renderIntoDocument(
        <Message open={ false } as="info">
          foobar
        </Message>
      );

      let content = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div');
      expect(content.length).toEqual(0);
    });
  });
});
