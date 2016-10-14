import React from 'react';
import { shallow } from 'enzyme';

import Link from './../link';
import Textbox from './../textbox';

import ListItem from './list-item';
import Submenu from './submenu';

const items = [
   { name: 'One'   },
   { name: 'Two'   },
   { name: 'Three' },
   { name: 'Four'  }
];

describe('Submenu', () => {
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
      let wrapper = shallow(<Submenu>{ itemHTML }</Submenu>);
      expect(wrapper.find('ul').length).toEqual(1);
    });
  });

  describe("title", () => {
    let title,
        wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <Submenu initiallyOpen={ false } title='test' filter={ false } togglable={ false }>
          { itemHTML }
        </Submenu>
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

  describe("menu is open", () => {
    it("shows the menu items", () => {
      wrapper = shallow(
        <Submenu filter={ true } togglable={ false }>
          { itemHTML }
        </Submenu>
      );

      let list = wrapper.find('.carbon-submenu');
      expect(list.length).toEqual(1);
      expect(list.find('li').length).toEqual(items.length);
    });
  });

  describe("filter", () => {
    it("exists", () => {
      wrapper = shallow(
        <Submenu filter={ true } togglable={ false }>
          { itemHTML }
        </Submenu>
      );

      let event = { target: { value: 'One' } },
          filter = wrapper.find(Textbox),
          listItemsExpected = 2; // filter is a list item too

      filter.simulate('change', event);

      expect(wrapper.find(Textbox).length).toEqual(1);
      expect(wrapper.find(ListItem).length).toEqual(listItemsExpected);
      expect(wrapper.state('filter')).toEqual('One');
    });
  });
});
