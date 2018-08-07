import React from 'react';
import { shallow } from 'enzyme';
import EmptyTable from './empty-table';

const emptyTable = shallow(<EmptyTable />);

describe('<EmptyTable /> with no content provided', () => {
  it('renders with default text', () => {
    expect(emptyTable).toMatchSnapshot();
  });
});

describe('<EmptyTable /> with content provided', () => {
  it('renders with that content', () => {
    emptyTable.setProps({ 'content': 'foo' });
    expect(emptyTable).toMatchSnapshot();
  });
});
