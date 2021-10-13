import React from "react";
import { shallow, mount } from "enzyme";

import Detail from "./detail.component";
import {
  elementsTagTest,
  rootTagTest,
} from "../../__internal__/utils/helpers/tags/tags-specs";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import {
  StyledDetail,
  StyledDetailContent,
  StyledDetailIcon,
  StyledDetailFootnote,
} from "./detail.style";

describe("Detail", () => {
  let wrapper;

  testStyledSystemMargin((props) => <Detail {...props}>foo</Detail>);

  describe("render", () => {
    beforeEach(() => {
      wrapper = shallow(<Detail className="foo">foo</Detail>);
    });

    it("renders the children", () => {
      expect(wrapper.find(StyledDetailContent).text()).toEqual("foo");
    });

    it("renders with custom classes", () => {
      expect(wrapper.find(StyledDetail).props().className).toContain(
        "carbon-detail foo"
      );
    });
  });

  describe("with a footnote", () => {
    beforeEach(() => {
      wrapper = shallow(<Detail footnote="extra info">foo</Detail>);
    });

    it("renders the footnote", () => {
      const footnote = wrapper.find(StyledDetailFootnote);
      expect(footnote.text()).toEqual("extra info");
    });
  });

  describe("with an icon", () => {
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
      const instance = shallow(<Detail data-element="bar" data-role="baz" />);

      it("include correct component, element and role data tags", () => {
        rootTagTest(instance.find(StyledDetail), "detail", "bar", "baz");
      });
    });

    describe("on internal elements", () => {
      wrapper = shallow(<Detail icon="test" footnote="test" />);

      elementsTagTest(wrapper, ["icon", "footnote"]);
    });
  });
});
