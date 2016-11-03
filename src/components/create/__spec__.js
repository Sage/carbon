import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Link from './../link';
import Create from './create';

describe('Create', () => {
  let instance, link;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Create className="custom-class">Foobar</Create>
    );
    link = TestUtils.findRenderedComponentWithType(instance, Link);
  });

  it('renders with the correct classes', () => {
    expect(link.props.className).toEqual('carbon-create custom-class');
  });

  it('renders with the props for the link', () => {
    expect(link.props.icon).toEqual('add');
    expect(link.props.iconAlign).toEqual('right');
    expect(link.props.children).toEqual('Foobar');
  });
});
