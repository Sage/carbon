import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import Icon from "components/icon";
import Help from "./help.component";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import StyledHelp from "./help.style";
import Tooltip from "../tooltip";
import { testStyledSystemMargin } from "../../__spec_helper__/test-utils";

jest.mock("@tippyjs/react/headless");

describe("Help", () => {
  let wrapper;

  testStyledSystemMargin((props) => <Help {...props} />);

  describe("when custom classes are passed", () => {
    it("adds the custom classes", () => {
      wrapper = renderHelp({ className: "fancy-pants" });
      expect(wrapper.hasClass("fancy-pants")).toBe(true);
    });
  });

  describe("render", () => {
    let icon;
    let tooltip;

    it('renders an icon with "help" type', () => {
      wrapper = renderHelp();
      icon = wrapper.find(Icon);
      expect(icon.props().type).toBe("help");
    });

    it("passes the children as a prop", () => {
      const mockMessage = <span>Help Message</span>;
      wrapper = mount(<Help>{mockMessage}</Help>);
      tooltip = wrapper.find(Tooltip);
      expect(tooltip.props().message).toBe(mockMessage);
    });

    it("passes the tooltipPosition if provided", () => {
      const mockPosition = "right";
      const mockMessage = "Help Message";

      wrapper = mount(
        <Help tooltipPosition={mockPosition}>{mockMessage}</Help>
      );

      tooltip = wrapper.find(Tooltip);
      expect(tooltip.props().position).toBe(mockPosition);
    });

    it("passes the type if provided", () => {
      const mockType = "info";
      wrapper = renderHelp({ type: mockType });
      icon = wrapper.find(Icon);
      expect(icon.props().type).toBe(mockType);
    });

    it("checks the default type if not provided", () => {
      const mockType = "help";
      wrapper = renderHelp();
      icon = wrapper.find(Icon);
      expect(icon.props().type).toBe(mockType);
    });

    it("renders a link when the href if provided", () => {
      const mockHref = "href";
      wrapper = renderHelp({ href: mockHref }, mount);
      expect(wrapper.find("a").exists()).toBe(true);
      wrapper.unmount();
    });

    it("sets the appropriate props when href set", () => {
      const mockHref = "href";
      wrapper = renderHelp({ href: mockHref, ariaLabel: "foo" }, mount);

      expect(wrapper.find(StyledHelp).prop("target")).toEqual("_blank");
      expect(wrapper.find(StyledHelp).prop("rel")).toEqual(
        "noopener noreferrer"
      );
      expect(wrapper.find(StyledHelp).prop("role")).toEqual(undefined);
      expect(wrapper.find(StyledHelp).prop("aria-label")).toEqual(undefined);
      expect(wrapper.find(Icon).prop("role")).toEqual("tooltip");
      expect(wrapper.find(Icon).prop("ariaLabel")).toEqual("foo");
      wrapper.unmount();
    });

    it("does not render a tooltip if no children are passed", () => {
      wrapper = shallow(<Help />);
      icon = wrapper.find(Icon);
      tooltip = wrapper.find(Tooltip);
      expect(icon.props().type).toBe("help");
      expect(tooltip.exists()).toBeFalsy();
    });
  });

  describe("tags on component", () => {
    const tagsWrapper = renderHelp({
      "data-element": "bar",
      "data-role": "baz",
    });

    it("include correct component, element and role data tags", () => {
      rootTagTest(tagsWrapper, "help", "bar", "baz");
    });
  });

  it("it does not prevent clicking interacting with the input", () => {
    wrapper = renderHelp({}, mount);
    const preventDefault = jest.fn();
    wrapper.simulate("click", { preventDefault });
    expect(preventDefault).not.toHaveBeenCalled();
  });

  describe("when the Help component is focused", () => {
    beforeEach(() => {
      wrapper = renderHelp({}, mount);
      wrapper.find(StyledHelp).simulate("focus");
    });

    it("the tooltip should be visible", () => {
      expect(wrapper.update().find(Tooltip).props().isVisible).toEqual(true);
    });

    describe("and then the Help component is blurred", () => {
      it("the tooltip should not be rendered", () => {
        expect(wrapper.update().find(Tooltip).props().isVisible).toEqual(true);
        wrapper.find(StyledHelp).simulate("blur");
        expect(wrapper.update().find(Tooltip).props().isVisible).toEqual(false);
      });
    });

    it("does not call preventDefault on blur or focus event", () => {
      const preventDefault = jest.fn();
      wrapper.find(StyledHelp).simulate("blur", { preventDefault });
      wrapper.find(StyledHelp).simulate("focus", { preventDefault });
      expect(preventDefault).not.toBeCalled();
    });

    afterEach(() => {
      wrapper.unmount();
    });
  });

  describe("when the Help receives a mouse over event", () => {
    beforeEach(() => {
      wrapper = renderHelp({}, mount);
      wrapper.find(StyledHelp).simulate("mouseover");
    });

    it("sets the tooltip to visible", () => {
      expect(wrapper.update().find(Tooltip).props().isVisible).toEqual(true);
    });

    describe("and then the Help component receives a mouse leave event", () => {
      it("the tooltip should not be rendered", () => {
        expect(wrapper.update().find(Tooltip).props().isVisible).toEqual(true);
        wrapper.find(StyledHelp).simulate("mouseleave");
        expect(wrapper.update().find(Tooltip).props().isVisible).toEqual(false);
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });
  });

  describe("when a key is pressed when the tooltip is open", () => {
    const escapeKeyDownEvent = new KeyboardEvent("keydown", {
      which: 27,
      bubbles: true,
    });
    const enterKeyDownEvent = new KeyboardEvent("keydown", {
      which: 13,
      bubbles: true,
    });
    let domNode;

    beforeEach(() => {
      act(() => {
        wrapper = mount(
          <div>
            <Help>mock message</Help>
          </div>
        );
      });
      domNode = wrapper.getDOMNode();
      document.body.appendChild(domNode);
      wrapper.find(StyledHelp).simulate("focus");
    });

    describe("and it's the Esc key", () => {
      it("the tooltip should not be rendered", () => {
        expect(wrapper.update().find(Tooltip).props().isVisible).toEqual(true);
        act(() => {
          domNode.dispatchEvent(escapeKeyDownEvent);
        });
        expect(wrapper.update().find(Tooltip).props().isVisible).toEqual(false);
      });
    });

    describe("and it's a key other than the Esc", () => {
      it("the tooltip should be rendered", () => {
        expect(wrapper.update().find(Tooltip).props().isVisible).toEqual(true);
        act(() => {
          domNode.dispatchEvent(enterKeyDownEvent);
        });
        expect(wrapper.update().find(Tooltip).props().isVisible).toEqual(true);
      });
    });

    afterEach(() => {
      document.body.removeChild(domNode);
    });
  });

  describe("tooltipFlipOverrides", () => {
    it("does not throw an error if a valid array is passed", () => {
      jest.spyOn(global.console, "error").mockImplementation(() => {});

      renderHelp(
        { type: "home", tooltipFlipOverrides: ["top", "bottom"] },
        mount
      );

      // eslint-disable-next-line no-console
      expect(console.error).not.toHaveBeenCalled();
      global.console.error.mockReset();
    });

    it("throws an error if a invalid array is passed", () => {
      jest.spyOn(global.console, "error").mockImplementation(() => {});

      renderHelp({ type: "home", tooltipFlipOverrides: ["foo", "bar"] }, mount);

      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalled();
      global.console.error.mockReset();
    });
  });
});

function renderHelp(props, renderer = shallow) {
  return renderer(<Help {...props}>Helpful Content</Help>);
}
