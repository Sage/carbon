import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Message from './message';

describe('Message', () => {
  let warningMessage, infoMessage, errorMessage, customMessage, spy;

  beforeEach(() => {
    spy = jasmine.createSpy('dismiss');

    warningMessage = TestUtils.renderIntoDocument(
      <Message as='warning' border={ false } onDismiss={ spy } open={true} title='My Title' transparent={true}>Some warning</Message>
    )

    infoMessage = TestUtils.renderIntoDocument(
      <Message as='info' open={true}>Some information</Message>
    )

    errorMessage = TestUtils.renderIntoDocument(
      <Message as='error' roundedCorners={ false } open={true}>Some error</Message>
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
      let header = TestUtils.findRenderedDOMComponentWithClass(warningMessage, 'carbon-message__title');
      expect(header.textContent).toEqual('My Title');
    });

    it('renders type icon', () => {
      let icon = TestUtils.findRenderedDOMComponentWithClass(errorMessage, 'carbon-message__type-icon');
      expect(icon.className).toEqual("carbon-icon carbon-message__type-icon icon-error");
    });

    describe('dismiss', () => {
      describe('when onDismiss is passed', () => {
        it('adds a close icon', () => {
          expect(TestUtils.findRenderedDOMComponentWithClass(warningMessage, 'carbon-message__close')).toBeDefined();
        });
      });

      describe('when onDismiss is not passed', () => {
        it('does not add a close icon', () => {
          expect(TestUtils.scryRenderedDOMComponentsWithClass(errorMessage, 'carbon-message__close').length).toEqual(0);
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

    it("adds a className carbon-message--warning when type is warning", () =>{
      expect(warningDOM.className.indexOf('carbon-message--warning')).not.toEqual(-1);
    });

    it("adds a className carbon-message--transparent when transparent is true", () =>{
      expect(warningDOM.className.indexOf('carbon-message--transparent')).not.toEqual(-1);
    });

    it("adds a className carbon-message--dismissable when onDismiss is defined", () =>{
      expect(warningDOM.className.indexOf('carbon-message--dismissable')).not.toEqual(-1);
    });

    it('adds a className of carbon-message--info when type is info', () => {
      expect(infoDOM.className).toMatch('carbon-message--info');
    });

    it('adds a className of carbon-message--border when borders are turned on', () => {
      expect(infoDOM.className).toMatch('carbon-message--border');
    });

    it('adds a className of carbon-message--rounded when roundedCorners are turned on', () => {
      expect(infoDOM.className).toMatch('carbon-message--rounded');
    });

    it('adds any additional classes passed', () => {
      expect(customDOM.className).toEqual('carbon-message fancy carbon-message--info carbon-message--rounded carbon-message--border');
    });

    describe('type classes', () => {
      beforeEach(() => {
        infoDOM = TestUtils.findRenderedDOMComponentWithClass(infoMessage, 'carbon-message__type');
      });

      it('adds a className of carbon-message--rounded when roundedCorners are turned on', () => {
        expect(infoDOM.className).toMatch('carbon-message__type--rounded');
      });
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
