import React from 'react';
import TestUtils from 'react-dom/test-utils';
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
      <Tooltip isVisible={ true } align='left'>
        Some Helpful Content
      </Tooltip>
    );

    positionedInstance = TestUtils.renderIntoDocument(
      <Tooltip isVisible={ true } position='top'>
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
        expect(tooltip.classList[0]).toEqual('carbon-tooltip');
      });

      it('renders a pointer span', () => {
        let span = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-tooltip__pointer');
        expect(span.tagName).toEqual('SPAN');
      });

      it('aligns the pointer to center', () => {
        expect(tooltip.classList[2]).toEqual('carbon-tooltip--pointer-align-center');
      });

      it('positions the pointer on the top', () => {
        expect(tooltip.classList[1]).toEqual('carbon-tooltip--position-top');
      });
    });

    describe('when a prop of align is passed', () => {
      it('adds the appropriate class', () => {
        expect(alignedTooltip.classList[2]).toEqual('carbon-tooltip--pointer-align-left');
      });
    });

    describe('when a prop of position is passed', () => {
      it('adds the appropriate class', () => {
        expect(positionedTooltip.classList[1]).toEqual('carbon-tooltip--position-top');
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
