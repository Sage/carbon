import React from 'react';
import { shallow } from 'enzyme';
import Filterable from './filterable.component';
import FilterableContext from './filterable.context';

describe('Filterable', () => {
  const shallowRender = props => (
    shallow(
      <Filterable { ...props }>
        test children
      </Filterable>
    )
  );

  it('defaults filterType to match', () => {
    const wrapper = shallowRender();
    expect(wrapper.props().value.filterType).toEqual('match');
  });

  it('provides a filterable context with filter, filterType, customFilter and children', () => {
    const wrapper = shallowRender({
      filter: 'foo',
      filterType: 'startsWith',
      customFilter: () => {}
    });
    expect(wrapper).toMatchSnapshot();
  });
});
