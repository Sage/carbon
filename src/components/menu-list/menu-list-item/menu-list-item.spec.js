import React from "react";
import { shallow } from "enzyme";
import TestUtils from "react-dom/test-utils";
import MenuListItem from "./menu-list-item.component";
import { rootTagTest } from "../../../utils/helpers/tags/tags-specs";

describe("MenuListItem", () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <MenuListItem>
        <div>Im a Child</div>
      </MenuListItem>
    );
  });

  it("renders a list item", () => {
    const item = TestUtils.findRenderedDOMComponentWithTag(instance, "li");
    expect(item).toBeDefined();
  });

  it("renders children", () => {
    expect(instance.props.children.props.children).toEqual("Im a Child");
  });

  it("adds custom classes to the li if provided", () => {
    const customInstance = TestUtils.renderIntoDocument(
      <MenuListItem className="custom-class">Im a Child</MenuListItem>
    );

    const list = TestUtils.findRenderedDOMComponentWithTag(
      customInstance,
      "li"
    );
    expect(list.classList).toContain("custom-class");
  });

  describe("tags on component", () => {
    const wrapper = shallow(
      <MenuListItem data-element="bar" data-role="baz">
        Test
      </MenuListItem>
    );

    it("include correct component, element and role data tags", () => {
      rootTagTest(wrapper, "menu-list-item", "bar", "baz");
    });
  });
});
