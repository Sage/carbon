import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import Help from './help.js';
import Icon from 'components/icon';

describe('Help', () => {
  let basicInstance, positionedInstance, alignedInstance, customStyleInstance, linkInstance;

  beforeEach(() => {
    basicInstance = TestUtils.renderIntoDocument(
      <Help helpMessage="Helpful Content" />
    );

    positionedInstance = TestUtils.renderIntoDocument(
      <Help helpMessage="Helpful Content" tooltipPosition='right' />
    );

    alignedInstance = TestUtils.renderIntoDocument(
      <Help helpMessage="Helpful Content" pointerAlign='left' />
    );

    customStyleInstance = TestUtils.renderIntoDocument(
      <Help helpMessage="Helpful Content" className='fancy-pants' />
    );

    linkInstance = TestUtils.renderIntoDocument(
      <Help helpMessage="Helpful Content" href='www.foo.com' />
    );
  });

  describe('mainClasses', () => {
    describe('default classes', () => {
      it('returns the default classes', () => {
        expect(basicInstance.mainClasses).toEqual('ui-help');
      });

      describe('when an href is passed', () => {
        it('adds the relevant class', () => {
          expect(linkInstance.mainClasses).toEqual('ui-help ui-help__href');
        });
      });
    });

    describe('when custom classes are passed', () => {
      it('adds the custom classes', () => {
        expect(customStyleInstance.mainClasses).toEqual('ui-help fancy-pants');
      });
    });
  });

  describe('render', () => {
      let icon, positionedIcon, alignedIcon, hrefAnchor;

    beforeEach(() => {
      icon = TestUtils.findRenderedComponentWithType(basicInstance, Icon);
      positionedIcon = TestUtils.findRenderedComponentWithType(positionedInstance, Icon);
      alignedIcon = TestUtils.findRenderedComponentWithType(alignedInstance, Icon);
      hrefAnchor = TestUtils.findRenderedDOMComponentWithTag(linkInstance, 'a');
    });

    it('renders an icon', () => {
      expect(icon.props.type).toEqual('info');
    });

    it('passes the helpMessage as a prop', () => {
      expect(icon.props.tooltipMessage).toEqual('Helpful Content');
    });

    it('passes the tooltipPosition if provided', () => {
      expect(positionedIcon.props.tooltipPosition).toEqual('right');
    });

    it('passes the pointerAlign if provided', () => {
      expect(alignedInstance.props.pointerAlign).toEqual('left');
    });

    it('passes the href if provided', () => {
      expect(hrefAnchor.props.href).toEqual('www.foo.com');
    });
  });
});
