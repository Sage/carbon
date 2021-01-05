import React from "react";
import { shallow } from "enzyme";

import Link from "../link";
import Textbox from "../../__experimental__/components/textbox";

import MenuList from "./menu-list.component";

const items = [
  { name: "One" },
  { name: "Two" },
  { name: "Three" },
  { name: "Four" },
];

describe("MenuList", () => {
  let wrapper;

  const itemHTML = items.map((item, index) => {
    return (
      <li key={`${item.name}.${index}`} name={item.name}>
        {item.name}
      </li>
    );
  });

  describe("basic object", () => {
    it("contains a single ul", () => {
      wrapper = shallow(<MenuList>{itemHTML}</MenuList>);
      expect(wrapper.find("ul").length).toEqual(1);
    });
  });

  describe("title", () => {
    let title;

    beforeEach(() => {
      wrapper = shallow(
        <MenuList
          initiallyOpen={false}
          title="test"
          filter={false}
          collapsible={false}
        >
          {itemHTML}
        </MenuList>
      );
      title = wrapper.find(Link);
    });

    it("is rendered if it is provided", () => {
      expect(title.length).toEqual(1);
      expect(title.props().children).toEqual("test");
    });

    it("triggers menu toggle on click", () => {
      const instance = wrapper.instance();
      title.simulate("click");
      expect(instance.state.open).toEqual(true);
    });
  });

  describe("menu is open conditions", () => {
    it("if no title provided menu items appear", () => {
      wrapper = shallow(<MenuList>{itemHTML}</MenuList>);
      expect(wrapper.find("li").length).toEqual(items.length);
    });
    it("if collapsible is false menu items appear", () => {
      wrapper = shallow(<MenuList collapsible={false}>{itemHTML}</MenuList>);
      expect(wrapper.find("li").length).toEqual(items.length);
    });
    it("if state is open menu items appear", () => {
      wrapper = shallow(
        <MenuList title="testing" collapsible>
          {itemHTML}
        </MenuList>
      );
      wrapper.setState({ open: true });
      expect(wrapper.find("li").length).toEqual(items.length);
    });
  });

  describe("filter", () => {
    let filter;

    beforeAll(() => {
      wrapper = shallow(
        <MenuList filter collapsible={false}>
          {itemHTML}
        </MenuList>
      );

      filter = wrapper.find(Textbox);
      filter.simulate("change", { target: { value: "One" } });
    });
    it("exists and is autofocused", () => {
      expect(filter.length).toEqual(1);
      expect(wrapper.find("li").length).toEqual(1);
      expect(wrapper.state("filter")).toEqual("One");
    });
    it("is autofocused", () => {
      expect(filter.props().autoFocus).toEqual(true);
    });
  });
});
