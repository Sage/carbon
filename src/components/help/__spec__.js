import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import Help from './help.js';
import Icon from 'components/icon';

describe('Help', () => {
  let basicInstance, positionedInstance, alignedInstance, customStyleInstance;

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
  });

  describe('mainClasses', () => {
    describe('default classes', () => {
      it('returns the default classes', () => {
        expect(basicInstance.mainClasses).toEqual('ui-help');
      });
    });

    describe('when custom classes are passed', () => {
      it('adds the custom classes', () => {
        expect(customStyleInstance.mainClasses).toEqual('ui-help fancy-pants');
      });
    });
  });

  describe('render', () => {
      let icon, positionedIcon, alignedIcon;

    beforeEach(() => {
      icon = TestUtils.findRenderedComponentWithType(basicInstance, Icon);
      positionedIcon = TestUtils.findRenderedComponentWithType(positionedInstance, Icon);
      alignedIcon = TestUtils.findRenderedComponentWithType(alignedInstance, Icon);
    });

    it('renders an icon', () => {
      expect(icon.props.type).toEqual('info');
    });

    it('passes the helpMessage as a prop', () => {
      expect(icon.props.tooltipMessage).toEqual('Helpful Content');
    });

    it('passes the tooltipPosition if provided', () => {
      expect(icon.props.tooltipPosition).not.toBeDefined();
      expect(positionedIcon.props.tooltipPosition).toEqual('right');
    });

    it('passes the pointerAlign if provided', () => {
      expect(icon.props.tooltipPosition).not.toBeDefined();
      expect(alignedInstance.props.pointerAlign).toEqual('left');
    });
  });
});
