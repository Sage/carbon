import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import Banner from './banner';

describe('Banner', () => {
  let warningInstance, infoInstance, errorInstance, customInstance;

  beforeEach(() => {
    warningInstance = TestUtils.renderIntoDocument(
      <Banner as='warning' open={true} title='My Title'>Some warning</Banner>
    )

    infoInstance = TestUtils.renderIntoDocument(
      <Banner as='info' open={true}>Some information</Banner>
    )

    errorInstance = TestUtils.renderIntoDocument(
      <Banner as='error' open={true}>Some error</Banner>
    )

    customInstance = TestUtils.renderIntoDocument(
      <Banner className='fancy' as='info' open={true}>Some information</Banner>
    )
  });

  describe('A Banner instance', () => {
    it('renders children passed to it', () => {
      expect(warningInstance.props.children).toEqual('Some warning');
    });

    it('sets a dialog header', () => {
      let header = TestUtils.findRenderedDOMComponentWithClass(warningInstance, 'ui-banner__title');
      expect(header.textContent).toEqual('My Title');
    });

    it('renders type icon', () => {
      let icon = TestUtils.findRenderedDOMComponentWithClass(errorInstance, 'ui-banner__type-icon');
      expect(icon.className).toEqual("ui-banner__type-icon icon-error");
    });
  });

  describe('class names', () => {
    let warningDOM, infoDOM, customDOM;

    beforeEach(() => {
      warningDOM = ReactDOM.findDOMNode(warningInstance);
      infoDOM = ReactDOM.findDOMNode(infoInstance);
      customDOM = ReactDOM.findDOMNode(customInstance);
    });

    it('adds a className of ui-banner--warning when type is warning', () => {
      expect(warningDOM.className).toEqual('ui-banner ui-banner--warning');
    });

    it('adds a className of ui-banner--info when type is info', () => {
      expect(infoDOM.className).toEqual('ui-banner ui-banner--info');
    });

    it('adds any additional classes passed', () => {
      expect(customDOM.className).toEqual('ui-banner fancy ui-banner--info');
    });
  });
});
