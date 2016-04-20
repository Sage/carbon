import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';
import Tooltip from './tooltip';

describe('tooltip', () => {
  let instance, alignedInstance, positionedInstance, hiddenInstance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Tooltip isVisible={ true }>
        Some Helpful Content
      </Tooltip>
    );
    alignedInstance = TestUtils.renderIntoDocument(
      <Tooltip isVisible={ true } pointerAlign='left'>
        Some Helpful Content
      </Tooltip>
    );

    positionedInstance = TestUtils.renderIntoDocument(
      <Tooltip isVisible={ true } pointerPosition='top'>
        Some Helpful Content
      </Tooltip>
    );

    hiddenInstance = TestUtils.renderIntoDocument(
      <Tooltip isVisible={ false }>
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

    describe('default render', () => {
      it('renders a content div', () => {
        expect(tooltip.classList[0]).toEqual('ui-tooltip');
      });

      it('renders a pointer span', () => {
        expect(tooltip.children[1].classList[0]).toEqual('ui-tooltip__pointer');
      });

      it('aligns the pointer to center', () => {
        expect(tooltip.children[1].classList[1]).toEqual('ui-tooltip__pointer--align-center');
      });

      it('positions the pointer on the bottom', () => {
        expect(tooltip.children[1].classList[2]).toEqual('ui-tooltip__pointer--position-bottom');
      });
    });

    describe('when a prop of align is passed', () => {
      it('adds the appropriate class', () => {
        expect(alignedTooltip.children[1].classList[1]).toEqual('ui-tooltip__pointer--align-left');
      });
    });

    describe('when a prop of position is passed', () => {
      it('adds the appropriate class', () => {
        expect(positionedTooltip.children[1].classList[2]).toEqual('ui-tooltip__pointer--position-top');
      });
    });
  });

  describe('when the tooltip is toggled off', () => {
    it('does not render any content', () => {
      let hiddenTooltip = ReactDOM.findDOMNode(hiddenInstance);
      expect(hiddenTooltip).toEqual(null);
    });
  });
});
