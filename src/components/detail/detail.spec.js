import React from "react";
import { shallow } from "enzyme";
import TestUtils from "react-dom/test-utils";

import Detail from "./detail.component";
import {
  elementsTagTest,
  rootTagTest,
} from "../../utils/helpers/tags/tags-specs";

describe("Detail", () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Detail className="foo">foo</Detail>
    );
  });

  describe("render", () => {
    it("renders the children", () => {
      const content = TestUtils.findRenderedDOMComponentWithClass(
        instance,
        "carbon-detail__content"
      );
      expect(content.textContent).toEqual("foo");
    });

    it("renders with custom classes", () => {
      const div = TestUtils.findRenderedDOMComponentWithClass(
        instance,
        "carbon-detail"
      );
      expect(div.className).toContain("carbon-detail foo");
    });
  });

  describe("with a footnote", () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Detail footnote="extra info">foo</Detail>
      );
    });

    it("renders the footnote", () => {
      const div = TestUtils.findRenderedDOMComponentWithClass(
        instance,
        "carbon-detail__footnote"
      );
      expect(div.textContent).toEqual("extra info");
    });
  });

  describe("with an icon", () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Detail icon="settings">foo</Detail>
      );
    });

    it("renders the icon and additional class", () => {
      const div = TestUtils.findRenderedDOMComponentWithClass(
        instance,
        "carbon-detail__icon"
      );
      expect(div).toBeDefined();
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      const wrapper = shallow(<Detail data-element="bar" data-role="baz" />);

      it("include correct component, element and role data tags", () => {
        rootTagTest(wrapper, "detail", "bar", "baz");
      });
    });

    describe("on internal elements", () => {
      const wrapper = shallow(<Detail icon="test" footnote="test" />);

      elementsTagTest(wrapper, ["icon", "footnote"]);
    });
  });
});
