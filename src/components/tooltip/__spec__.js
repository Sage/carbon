import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';
import Tooltip from './tooltip';

describe('tooltip', () => {
  let instance, alignedInstance, positionedInstance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Tooltip>
        Some Helpful Content
      </Tooltip>
    );
    alignedInstance = TestUtils.renderIntoDocument(
      <Tooltip align='left'>
        Some Helpful Content
      </Tooltip>
    );

    positionedInstance = TestUtils.renderIntoDocument(
      <Tooltip position='bottom'>
        Some Helpful Content
      </Tooltip>
    );
  });

  describe('render', () => {
    let tooltip, alignedTooltip, positionedTooltip;

    beforeEach(() => {
      tooltip = ReactDOM.findDOMNode(instance);
      alignedTooltip = ReactDOM.findDOMNode(alignedInstance);
      positionedTooltip = ReactDOM.findDOMNode(positionedInstance);
    });

    it('renders a content div', () => {
      expect(tooltip.classList[0]).toEqual('ui-tooltip');
    });

    it('renders a pointer span', () => {
      expect(tooltip.children[1].classList[0]).toEqual('ui-tooltip__pointer');
    });

    it('aligns the pointer to center', () => {
      expect(tooltip.children[1].classList[1]).toEqual('ui-tooltip__pointer--align-center');
    });

    describe('when a prop of align is passed', () => {
      it('adds the appropriate class', () => {
        expect(alignedTooltip.children[1].classList[1]).toEqual('ui-tooltip__pointer--align-left');
      });
    });

    describe('when a prop of position is passed', () => {
      it('adds the appropriate class', () => {
        expect(positionedTooltip.children[1].classList[2]).toEqual('ui-tooltip__pointer--position-bottom');
      });
    });
  });
});
