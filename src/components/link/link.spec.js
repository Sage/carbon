import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import Link from "./link.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import LinkStyle from "./link.style";
import Icon from "../icon";
import StyledIcon from "../icon/icon.style";
import Tooltip from "../tooltip";
import { baseTheme } from "../../style/themes";

function renderLink(props = {}, renderer = mount) {
  return renderer(<Link {...props}>Link Component</Link>);
}

describe("Link", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderLink();
  });

  it("renders as expected", () => {
    expect(
      TestRenderer.create(<Link href="www.foo.com">test</Link>)
    ).toMatchSnapshot();
  });

  describe("If `isSkipLink` provided", () => {
    const skipLinkWrapper = mount(
      <Link href="#test" isSkipLink>
        Test Content
      </Link>
    );

    it("should render `Skip to main content` text inside of Link", () => {
      expect(skipLinkWrapper.text()).toBe("Skip to main content");
    });

    it("should render correct designs", () => {
      assertStyleMatch(
        {
          position: "absolute",
          paddingLeft: "24px",
          paddingRight: "24px",
          lineHeight: "36px",
          fontSize: "16px",
          left: "-999em",
          textColor: baseTheme.colors.text,
          zIndex: `${baseTheme.zIndex.aboveAll}`,
          boxShadow: `inset 0 0 0 2px ${baseTheme.colors.primary}`,
          border: `2px solid ${baseTheme.colors.white}`,
        },
        skipLinkWrapper,
        { modifier: "a" }
      );

      assertStyleMatch(
        {
          top: "8px",
          left: "8px",
          textColors: baseTheme.colors.text,
        },
        skipLinkWrapper,
        { modifier: "a:focus" }
      );
    });
  });

  describe("The `disabled` prop", () => {
    it("should matches the expected style when true", () => {
      assertStyleMatch(
        {
          cursor: "not-allowed",
        },
        renderLink({ disabled: true }),
        { modifier: "a:hover" }
      );
    });

    it("should call the events preventDefault function when true and clicked", () => {
      const spy = jest.fn();
      const event = { preventDefault: spy };
      wrapper = renderLink({ disabled: true }, mount);
      wrapper.find("InternalLink").instance().handleClick(event);
      expect(spy).toHaveBeenCalled();
    });

    it("should not call the events preventDefault function when false and clicked", () => {
      const spy = jest.fn();
      const event = { preventDefault: spy };
      wrapper = renderLink({ disabled: false }, mount);
      wrapper.find("InternalLink").instance().handleClick(event);
      expect(spy).not.toHaveBeenCalled();
    });

    it("should not call passed onClick function when disabled is false and link is clicked", () => {
      const spy = jest.fn();
      wrapper = renderLink({ disabled: false, onClick: spy }, mount);
      wrapper.find("InternalLink").instance().handleClick();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("when component received a `target` prop", () => {
    it("should render an `<a>` element with target attribute", () => {
      const target = "_blank";
      wrapper.setProps({ target });

      expect(wrapper.find("a").prop("target")).toBe(target);
    });
  });

  describe("when component received a `rel` prop", () => {
    it("should render an `<a>` element with rel attribute", () => {
      const rel = "alternate";
      wrapper.setProps({ rel });

      expect(wrapper.find("a").prop("rel")).toBe(rel);
    });
  });

  describe("when component received a `href` prop", () => {
    it("should render an `<a>` element", () => {
      wrapper.setProps({ href: "#" });

      expect(wrapper.find("a")).toHaveLength(1);
    });
  });

  describe("when component received an `icon` prop", () => {
    beforeEach(() => {
      wrapper.setProps({ icon: "basket" });
    });

    it("should render an `Icon` correctly with the `basket` value", () => {
      expect(wrapper.find(Icon).props().type).toEqual("basket");
    });

    it("should render an `Icon` on the left side of the component by default", () => {
      assertStyleMatch(
        {
          marginRight: "5px",
          position: "relative",
        },
        wrapper.find(LinkStyle),
        { modifier: `a ${StyledIcon}` }
      );
    });

    it("should render an `Icon` on the right", () => {
      wrapper.setProps({ iconAlign: "right" });
      assertStyleMatch(
        {
          marginRight: "0",
          marginLeft: "5px",
          position: "relative",
        },
        wrapper.find(LinkStyle),
        { modifier: `a ${StyledIcon}` }
      );
    });

    it("should render an `Icon` on the right with no margin when no children", () => {
      wrapper = mount(
        <Link iconAlign="right" icon="home" href="www.sage.com" />
      );
      assertStyleMatch(
        {
          marginRight: "0",
          marginLeft: "0",
          position: "relative",
        },
        wrapper.find(LinkStyle),
        { modifier: `a ${StyledIcon}` }
      );
    });

    it("should render a `Tooltip` if tooltipMessage is passed", () => {
      wrapper = mount(
        <Link
          iconAlign="right"
          icon="home"
          href="www.sage.com"
          tooltipMessage="foo"
        />
      );

      expect(wrapper.find(Tooltip).exists()).toBeTruthy();
    });
  });

  describe("when the `onKeyDown` event is triggered", () => {
    let onClickFn;
    let onKeyDownFn;

    beforeEach(() => {
      onClickFn = jest.fn();
      onKeyDownFn = jest.fn();
    });

    it("should trigger an `onKeyDown` prop", () => {
      wrapper.setProps({
        onKeyDown: onKeyDownFn,
      });
      wrapper.find("a").simulate("keydown", { keyCode: 13 });

      expect(onKeyDownFn).toHaveBeenCalled();
    });

    describe("and a `href` prop has been received", () => {
      it("should not trigger `onClick` prop", () => {
        wrapper.setProps({
          href: "#",
          onKeyDown: onKeyDownFn,
          onClick: onClickFn,
        });
        wrapper.find("button").simulate("keydown", { which: 13 });

        expect(onClickFn).not.toHaveBeenCalled();
      });
    });

    describe("and a `onClick` prop has been received", () => {
      it("should trigger `onClick` prop", () => {
        wrapper.setProps({
          onClick: onClickFn,
        });
        wrapper.find("button").simulate("keydown", { which: 13 });

        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe("when a key is pressed but no onClick prop received", () => {
      beforeEach(() => {
        wrapper.setProps({
          onKeyDown: onKeyDownFn,
        });
        wrapper.find("a").simulate("keydown", { which: 13 });
      });

      it("should trigger `onKeyDown` prop", () => {
        expect(onKeyDownFn).toHaveBeenCalled();
      });

      it("should not trigger an `onClick` prop", () => {
        expect(onClickFn).not.toHaveBeenCalled();
      });
    });
  });
});
