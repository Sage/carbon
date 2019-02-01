import React from 'react';
import { mount } from 'enzyme';
import Filterable from './filterable.component';
import FilterableItem from './filterable-item.component';

describe('FilterableItem', () => {
  const shallowRender = (props, itemProps) => (
    mount(
      <Filterable { ...props }>
        <FilterableItem { ...itemProps } />
      </Filterable>
    ).find(FilterableItem)
  );

  describe('when the given filter is undefined', () => {
    it('renders the child', () => {
      const wrapper = shallowRender({ filter: undefined }, { text: 'foo' });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when the given filter is foo', () => {
    const filter = 'foo';

    it('does not render the child if filter does not match the text', () => {
      const wrapper = shallowRender({ filter }, { text: 'bar' });
      expect(wrapper).toMatchSnapshot();
    });

    it('does render the child if filter does matches the text', () => {
      const wrapper = shallowRender({ filter }, { text: 'foo' });
      expect(wrapper).toMatchSnapshot();
    });

    it('renders children instead of text if provided', () => {
      const wrapper = shallowRender({ filter }, { text: 'foo', children: <div>custom children</div> });
      expect(wrapper).toMatchSnapshot();
    });

    describe('for a filterType such as startsWith', () => {
      const filterType = 'startsWith';

      it('renders the child if the text starts with foo', () => {
        const wrapper = shallowRender({ filter, filterType }, { text: 'foobar' });
        expect(wrapper).toMatchSnapshot();
      });

      it('does not render the child if the text does not start with foo', () => {
        const wrapper = shallowRender({ filter, filterType }, { text: 'barfoo' });
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('for a customFilter which expects exactly foo', () => {
      const customFilter = (v, f) => v === f;

      it('renders the child when the text is exactly foo', () => {
        const wrapper = shallowRender({ filter, customFilter }, { text: 'foo' });
        expect(wrapper).toMatchSnapshot();
      });

      it('does not render the child when the text is not exactly foo', () => {
        const wrapper = shallowRender({ filter, customFilter }, { text: 'food' });
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
