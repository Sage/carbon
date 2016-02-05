import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import Message from './message';

describe('message', () => {
  let spy;
  let warningMessage, infoMessage, customMessage;

  beforeEach(() => {
    warningMessage = TestUtils.renderIntoDocument(
      <Message style = 'warning'>Some warning</Message>
    )

    infoMessage = TestUtils.renderIntoDocument(
      <Message style = 'info'>Some information</Message>
    )

    customMessage = TestUtils.renderIntoDocument(
      <Message className='fancy' style = 'info'>Some information</Message>
    )

    spy = jasmine.createSpy('click');
  });

  describe('A warning message', () => {
    it('renders children passed to it', () => {
      expect(warningMessage.props.children).toEqual('Some warning');
    });
  });

  describe('class names', () => {
    let warningDOM, infoDOM, customDOM;

    beforeEach(() => {
      warningDOM    = ReactDOM.findDOMNode(warningMessage);
      infoDOM       = ReactDOM.findDOMNode(infoMessage);
      customDOM   = ReactDOM.findDOMNode(customMessage);
    });

    it('adds a className of ui-message--warning to warningMessage', () => {
      expect(warningDOM.classList[0]).toEqual('ui-message--warning');
    });

    it('adds a className of ui-message--info to other type of message', () => {
      expect(infoDOM.classList[0]).toEqual('ui-message--info');
    });

    it('adds any additional classes passed', () => {
      expect(customDOM.classList[1]).toEqual('fancy');
    });
  });
});
