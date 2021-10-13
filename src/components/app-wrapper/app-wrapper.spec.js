import React from "react";
import TestUtils from "react-dom/test-utils";
import { shallow } from "enzyme";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import AppWrapper from "./app-wrapper.component";

describe("app wrapper", () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <AppWrapper className="foobar">foo</AppWrapper>
    );
  });

  it("renders the children", () => {
    const div = TestUtils.findRenderedDOMComponentWithTag(instance, "div");
    expect(div.textContent).toEqual("foo");
  });

  it("renders with correct classes", () => {
    const div = TestUtils.findRenderedDOMComponentWithTag(instance, "div");
    expect(div.className).toContain("carbon-app-wrapper foobar");
  });

  it("renders with additional html attributes", () => {
    instance = TestUtils.renderIntoDocument(
      <AppWrapper style={{ color: "red" }}>foo</AppWrapper>
    );
    const div = TestUtils.findRenderedDOMComponentWithTag(instance, "div");
    expect(div.style.color).toEqual("red");
  });

  describe("tags", () => {
    describe("on component", () => {
      const wrapper = shallow(
        <AppWrapper data-element="bar" data-role="baz" />
      );

      it("include correct component, element and role data tags", () => {
        rootTagTest(wrapper, "app-wrapper", "bar", "baz");
      });
    });
  });
});
