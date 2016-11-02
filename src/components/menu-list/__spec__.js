import React from 'react';
import { shallow } from 'enzyme';

import Link from './../link';
import Textbox from './../textbox';

import { MenuList, MenuListItem } from 'components/menu-list'

const items = [
   { name: 'One'   },
   { name: 'Two'   },
   { name: 'Three' },
   { name: 'Four'  }
];

describe('MenuList', () => {
  let itemHTML,
      wrapper

  itemHTML = items.map((item, index) => {
    return (
      <li
        key={ `${item.name}.${index}` }
        name={ item.name }>
        { item.name }
      </li>
    );
  });

  describe("basic object", () => {
    it("contains a single ul", () => {
      let wrapper = shallow(<MenuList>{ itemHTML }</MenuList>);
      expect(wrapper.find('ul').length).toEqual(1);
    });
  });

  describe("title", () => {
    let title,
        wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <MenuList initiallyOpen={ false } title='test' filter={ false } collapsible={ false }>
          { itemHTML }
        </MenuList>
      );
      title = wrapper.find(Link);
    });

    it("is rendered if it is provided", () => {
      expect(title.length).toEqual(1);
      expect(title.props().children).toEqual('test');
    });

    it("triggers menu toggle on click", () => {
      let instance = wrapper.instance();
      spyOn(instance, 'setState');
      title.simulate('click');
      expect(instance.setState).toHaveBeenCalledWith({ open: true });
    });
  });

  describe("menu is open conditions", () => {
    it("if no title provided menu items appear", () => {
      wrapper = shallow(
        <MenuList>
          { itemHTML }
        </MenuList>
      );
      expect(wrapper.find('li').length).toEqual(items.length);
    });
    it("if collapsible is false menu items appear", () => {
      wrapper = shallow(
        <MenuList collapsible={ false }>
          { itemHTML }
        </MenuList>
      );
      expect(wrapper.find('li').length).toEqual(items.length);
    });
    it("if state is open menu items appear", () => {
      wrapper = shallow(
        <MenuList title='testing' collapsible={ true }>
          { itemHTML }
        </MenuList>
      );
      wrapper.setState({ open: true });
      expect(wrapper.find('li').length).toEqual(items.length);
    });
  });

  describe("filter", () => {
    let filter, wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <MenuList filter={ true } collapsible={ false }>
          { itemHTML }
        </MenuList>
      );

      filter = wrapper.find(Textbox);
      filter.simulate('change', { target: { value: 'One' } });
    })
    it("exists and is autofocused", () => {
      expect(filter.length).toEqual(1);
      expect(wrapper.find('li').length).toEqual(1);
      expect(wrapper.state('filter')).toEqual('One');
    });
    it("is autofocused", () => {
      expect(filter.props().autoFocus).toEqual(true);
    });
  });
});
