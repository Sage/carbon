import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import Message from './message';

describe('message', () => {
  let warningMessage, infoMessage, customMessage;

  beforeEach(() => {
    warningMessage = TestUtils.renderIntoDocument(
      <Message as='warning'>Some warning</Message>
    )

    infoMessage = TestUtils.renderIntoDocument(
      <Message as='info'>Some information</Message>
    )

    customMessage = TestUtils.renderIntoDocument(
      <Message className='fancy' as='info'>Some information</Message>
    )
  });

  describe('A warning message', () => {
    it('renders children passed to it', () => {
      expect(warningMessage.props.children).toEqual('Some warning');
    });
  });

  describe('class names', () => {
    let warningDOM, infoDOM, customDOM;

    beforeEach(() => {
      warningDOM = ReactDOM.findDOMNode(warningMessage);
      infoDOM = ReactDOM.findDOMNode(infoMessage);
      customDOM = ReactDOM.findDOMNode(customMessage);
    });

    it('adds a className of ui-message--warning to warningMessage', () => {
      expect(warningDOM.className).toEqual('ui-message ui-message--warning');
    });

    it('adds a className of ui-message--info to other type of message', () => {
      expect(infoDOM.className).toEqual('ui-message ui-message--info');
    });

    it('adds any additional classes passed', () => {
      expect(customDOM.className).toEqual('ui-message fancy ui-message--info');
    });
  });
});
