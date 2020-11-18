import React from "react";
import { CSSTransition } from "react-transition-group";
import { shallow, mount } from "enzyme";
import BasePages, { Page } from "./pages.component";
import { rootTagTest } from "../../utils/helpers/tags/tags-specs/tags-specs";
import mintTheme from "../../style/themes/mint";

describe("BasePages", () => {
  let wrapper, page;

  beforeEach(() => {
    wrapper = shallow(
      <BasePages theme={mintTheme} className="foobar" initialPageIndex={0}>
        <Page title="Page One" />
        <Page title="Page Two" />
        <Page title="Page Three" />
      </BasePages>
    );

    page = wrapper.instance().visiblePage();
  });

  describe("componentDidUpdate", () => {
    it("navigates between slides correctly when the pageIndex prop changes", () => {
      // Initial state
      expect(wrapper.state().pageIndex).toEqual(0);
      expect(wrapper.instance().numOfPages()).toEqual(3);

      // Move to page 2
      wrapper.setProps({ pageIndex: 2 });

      expect(wrapper.state().pageIndex).toEqual(2);
      expect(wrapper.instance().transitionDirection).toEqual("next");

      // Move to page 1
      wrapper.setProps({ pageIndex: 1 });

      expect(wrapper.state().pageIndex).toEqual(1);
      expect(wrapper.instance().transitionDirection).toEqual("previous");

      // Move to page 3
      wrapper.setProps({ pageIndex: 3 });

      expect(wrapper.state().pageIndex).toEqual(0);
      expect(wrapper.instance().transitionDirection).toEqual("previous");

      // Move to page -1
      wrapper.setProps({ pageIndex: -1 });

      expect(wrapper.state().pageIndex).toEqual(2);
      expect(wrapper.instance().transitionDirection).toEqual("next");

      // Move to page 2
      wrapper.setProps({ pageIndex: 2 });

      expect(wrapper.state().pageIndex).toEqual(2);

      // Undefined pageIndex
      wrapper.setProps({ pageIndex: undefined });

      // Final state
      expect(wrapper.state().pageIndex).toEqual(2);
      expect(wrapper.instance().numOfPages()).toEqual(3);
    });
  });

  describe("numOfPages", () => {
    describe("when one child", () => {
      it("returns 1", () => {
        wrapper = shallow(
          <BasePages theme={mintTheme} className="foobar" initialPageIndex={0}>
            <Page />
          </BasePages>
        );

        expect(wrapper.instance().numOfPages()).toEqual(1);
      });
    });

    describe("when an array of children", () => {
      it("returns the number of children", () => {
        expect(wrapper.instance().numOfPages()).toEqual(3);
      });
    });
  });

  describe("visiblePage", () => {
    const instance = shallow(
      <BasePages theme={mintTheme} className="foobar" initialPageIndex={0}>
        <Page title="Example Title A" />
      </BasePages>
    );

    const instancePage = instance.instance().visiblePage();

    it("returns a page instance", () => {
      expect(page.type).toEqual(instancePage.type);
    });

    it("has correct class name", () => {
      wrapper = mount(
        <BasePages theme={mintTheme} className="foobar" initialPageIndex={0}>
          <Page title="Example Title A" />
        </BasePages>
      );
      expect(wrapper.find(Page).at(0).props()["data-element"]).toEqual(
        "visible-page"
      );
    });

    it("has correct title", () => {
      expect(instance.find(Page).props().title).toEqual("Example Title A");
    });
  });

  describe("on back link click", () => {
    it("decrements the pageIndex", () => {
      wrapper.setProps({ pageIndex: 1 });
      expect(wrapper.state().pageIndex).toEqual(1);
    });

    it("sets the transistion direction to previous", () => {
      wrapper.setProps({ pageIndex: 1 });
      wrapper.setProps({ pageIndex: 0 });
      expect(wrapper.instance().transitionDirection).toEqual("previous");
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      const tag = shallow(
        <BasePages
          theme={mintTheme}
          data-element="bar"
          data-role="baz"
          initialPageIndex={0}
        >
          <Page />
        </BasePages>
      );

      it("include correct component, element and role data tags", () => {
        rootTagTest(tag, "carousel", "bar", "baz");
      });
    });

    describe("on internal elements", () => {
      wrapper = mount(
        <BasePages theme={mintTheme} initialPageIndex={0}>
          <Page data-element="page" />
        </BasePages>
      );

      it("should has expected data elements", () => {
        wrapper.find('[data-element="page"]').exists();
        wrapper.find('[data-element="visible-page"]').exists();
      });
    });
  });

  describe("transitionName", () => {
    it("uses a custom name if supplied", () => {
      wrapper = mount(
        <BasePages theme={mintTheme} transition="foo">
          <Page />
        </BasePages>
      );

      const transitionGroup = wrapper.find(CSSTransition);
      expect(transitionGroup.props().classNames).toEqual(
        "carousel-transition-foo"
      );
    });
  });
});
