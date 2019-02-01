import React from 'react';
import { shallow } from 'enzyme';
import WithFilterableItem from './with-filterable-item.hoc';
import { Iterable } from 'immutable';
import { utc } from 'moment';


describe('WithFilterableItem', () => {
  it('returns a new component with the FilterableItem as a parent and props fed down', () => {
    const DummyComponent = () => <div>dummy</div>;
    const DummyWithFilterable = WithFilterableItem(DummyComponent);
    const wrapper = shallow(<DummyWithFilterable sampleProp />);
    expect(wrapper).toMatchSnapshot();
  });

});
