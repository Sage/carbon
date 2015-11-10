import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Button from './index';

describe('Button', () => {
  it('failing test demo', () => {

    let instance = TestUtils.renderIntoDocument(
        <Button />
      );
    debugger
    expect(1).toEqual(2);
  });
});
