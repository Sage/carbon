import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import Link from "./link.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import LinkStyle from "./link.style";
import StyledIcon from "../icon/icon.style";

const RouterLink = (props) => {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a {...props} />;
};
function renderLink(props, renderer = mount) {
  return renderer(<Link {...props}>Link Component</Link>);
}

const render = (props) => {
  return TestRenderer.create(<Link {...props}>test</Link>);
};

describe("Link", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderLink({});
  });

  it("renders as expected", () => {
    expect(render()).toMatchSnapshot();
  });

  describe("The `disabled` prop", () => {
    it("should matches the expected style when true", () => {
      assertStyleMatch(
        {
          cursor: "not-allowed",
        },
        render({ disabled: true }).toJSON(),
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
    it("should render an `<a>`  element with target attribute", () => {
      const target = "_blank";
      wrapper.setProps({ target });

      expect(wrapper.find("a").prop("target")).toBe(target);
    });
  });

  describe("when component received a `href` prop", () => {
    it("should render an `<a>` element", () => {
      wrapper.setProps({ href: "#" });

      expect(wrapper.find("a")).toHaveLength(1);
    });
  });

  describe("when component received a `to` prop", () => {
    it("should render a `<RouterLink />` element", () => {
      wrapper.setProps({ to: "route", routerLink: RouterLink });

      expect(wrapper.find(RouterLink)).toHaveLength(1);
    });
  });

  describe("when component received an `icon` prop", () => {
    beforeEach(() => {
      wrapper.setProps({ icon: "basket" });
    });

    it("should render an `Icon` correctly with the `basket` value", () => {
      expect(wrapper.find("Icon").props().type).toEqual("basket");
    });

    it("should render an `Icon` on the left side of the component by default", () => {
      assertStyleMatch(
        {
          marginRight: "5px",
          position: "relative",
        },
        TestRenderer.create(wrapper.find(LinkStyle)).toJSON(),
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
        TestRenderer.create(wrapper.find(LinkStyle)).toJSON(),
        { modifier: `a ${StyledIcon}` }
      );
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
        to: "testRoute",
        onKeyDown: onKeyDownFn,
        routerLink: RouterLink,
      });
      wrapper.find(RouterLink).simulate("keydown", { keyCode: 13 });

      expect(onKeyDownFn).toHaveBeenCalled();
    });

    describe("and a `href` prop has been received", () => {
      it("should not trigger `onClick` prop", () => {
        wrapper.setProps({
          href: "#",
          onKeyDown: onKeyDownFn,
          onClick: onClickFn,
          to: "foo",
          routerLink: RouterLink,
        });
        wrapper.find("a").simulate("keydown", { which: 13 });

        expect(onClickFn).not.toHaveBeenCalled();
      });
    });

    describe("and a `to` props has been received", () => {
      it("should trigger `onClick` prop", () => {
        wrapper.setProps({
          to: "testRoute",
          onClick: onClickFn,
          routerLink: RouterLink,
        });
        wrapper.find(RouterLink).simulate("keydown", { which: 13 });

        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe("and component received a `to` prop but a `onClick` props is not available", () => {
      beforeEach(() => {
        wrapper.setProps({
          to: "testRoute",
          onKeyDown: onKeyDownFn,
          routerLink: RouterLink,
        });
        wrapper.find(RouterLink).simulate("keydown", { which: 13 });
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
