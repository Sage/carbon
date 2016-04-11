import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';
import Tooltip from './tooltip';

describe('tooltip', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Tooltip>
        Some Helpful Content
      </Tooltip>
    );
  });

  describe('render', () => {
    let tooltip;

    beforeEach(() => {
      tooltip = ReactDOM.findDOMNode(instance);
    });

    it('renders a content div', () => {
      expect(tooltip.classList[0]).toEqual('ui-tooltip')
    });

    it('renders a pointer span', () => {
      expect(tooltip.children[1].classList[0]).toEqual('ui-tooltip__pointer')
    });
  });
});
