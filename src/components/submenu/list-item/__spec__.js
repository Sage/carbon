import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import ListItem from './list-item';

describe('ListItem', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <ListItem>
        <div>Im a Child</div>
      </ListItem>
    );
  });

  it('renders a list item', () => {
    let item = TestUtils.findRenderedDOMComponentWithTag(instance, 'li');
    expect(item).toBeDefined();
  });

  it('renders children', () => {
    expect(instance.props.children.props.children).toEqual("Im a Child");
  });

  it('adds custom classes to the li if provided', () => {
    let customInstance = TestUtils.renderIntoDocument(
      <ListItem className='custom-class'>
        Im a Child
      </ListItem>
    );

    let list = TestUtils.findRenderedDOMComponentWithTag(customInstance, 'li');
    expect(list.classList).toMatch('custom-class');
  });
});
