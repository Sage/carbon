import React from "react";
import { shallow, mount } from "enzyme";
import TestUtils from "react-dom/test-utils";

import Detail from "./detail.component";
import {
  elementsTagTest,
  rootTagTest,
} from "../../utils/helpers/tags/tags-specs";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import {
  StyledDetailContent,
  StyledDetailIcon,
  StyledDetailFootnote,
} from "./detail.style";

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
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Detail footnote="extra info">foo</Detail>);
    });

    it("renders the footnote", () => {
      const footnote = wrapper.find(StyledDetailFootnote);
      expect(footnote.text()).toEqual("extra info");
    });
  });

  describe("with an icon", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<Detail icon="settings">foo</Detail>);
    });

    it("renders the icon", () => {
      const icon = wrapper.find(StyledDetailIcon);
      expect(icon).toBeDefined();
    });

    it("should give the content a margin left", () => {
      assertStyleMatch(
        { marginLeft: "26px" },
        wrapper.find(StyledDetailContent)
      );
    });

    describe("with a footnote", () => {
      beforeEach(() => {
        wrapper = mount(
          <Detail icon="settings" footnote="extra info">
            foo
          </Detail>
        );
      });

      it("should give the footnote a margin left", () => {
        assertStyleMatch(
          { marginLeft: "26px" },
          wrapper.find(StyledDetailFootnote)
        );
      });
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
