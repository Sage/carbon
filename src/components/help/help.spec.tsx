import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import Icon from "../icon";
import Help, { HelpProps } from "./help.component";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import StyledHelp, { VisuallyHidden } from "./help.style";
import Tooltip from "../tooltip";
import { testStyledSystemMargin } from "../../__spec_helper__/test-utils";
import Logger from "../../__internal__/utils/logger";

function renderHelp(props: HelpProps = {}) {
  const { children } = props;
  return <Help {...props}>{children || "Helpful Content"}</Help>;
}

describe("Help", () => {
  let wrapper: ShallowWrapper | ReactWrapper;
  let loggerSpy: jest.SpyInstance<void, [message: string]>;

  beforeEach(() => {
    loggerSpy = jest.spyOn(Logger, "deprecate").mockImplementation(() => {});
  });

  afterEach(() => {
    loggerSpy.mockRestore();
  });

  testStyledSystemMargin((props) => <Help {...props} />);

  describe("deprecation warnings", () => {
    it("should display deprecation warning for tooltipId once", () => {
      wrapper = shallow(renderHelp({ tooltipId: "foo" }));

      const deprecationMessage =
        "The `tooltipId` prop of `Help` is now deprecated and will be removed in a future release. " +
        "It still provides the HTML ID of the tooltip element but is no longer needed for accessibility";

      expect(loggerSpy).toHaveBeenCalledWith(deprecationMessage);

      wrapper.setProps({ tooltipId: "bar" });

      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });

    it("should display deprecation warning for aria-label once", () => {
      wrapper = shallow(renderHelp({ ariaLabel: "foo" }));

      const deprecationMessage =
        "The `ariaLabel` prop of `Help` is now deprecated and will be removed in a future release. Please use the `accessibilityLabel` prop instead.";

      expect(loggerSpy).toHaveBeenCalledWith(deprecationMessage);

      wrapper.setProps({ ariaLabel: "bar" });

      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("when custom classes are passed", () => {
    it("adds the custom classes", () => {
      wrapper = shallow(renderHelp({ className: "fancy-pants" }));
      expect(wrapper.hasClass("fancy-pants")).toBe(true);
    });
  });

  describe("render", () => {
    let icon;
    let tooltip;

    it('renders an icon with "help" type', () => {
      wrapper = shallow(renderHelp());
      icon = wrapper.find(Icon);
      expect(icon.props().type).toBe("help");
    });

    it("passes the children as a prop", () => {
      const mockMessage = <span>Help Message</span>;
      wrapper = mount(renderHelp({ children: mockMessage }));
      tooltip = wrapper.find(Tooltip);
      expect(tooltip.props().message).toBe(mockMessage);
    });

    it("passes the tooltipPosition if provided", () => {
      const mockPosition = "right";
      const mockMessage = "Help Message";

      wrapper = mount(
        renderHelp({ tooltipPosition: mockPosition, children: mockMessage })
      );

      tooltip = wrapper.find(Tooltip);
      expect(tooltip.props().position).toBe(mockPosition);
    });

    it("passes the type if provided", () => {
      const mockType = "info";
      wrapper = shallow(renderHelp({ type: mockType }));
      icon = wrapper.find(Icon);
      expect(icon.props().type).toBe(mockType);
    });

    it("passes the tooltipId if provided", () => {
      const tooltipId = "tooltip-id";
      wrapper = shallow(renderHelp({ tooltipId }));
      icon = wrapper.find(Icon);
      expect(icon.props().tooltipId).toBe(tooltipId);
    });

    it("checks the default type if not provided", () => {
      const mockType = "help";
      wrapper = shallow(renderHelp());
      icon = wrapper.find(Icon);
      expect(icon.props().type).toBe(mockType);
    });

    it("renders a link when the href if provided", () => {
      const mockHref = "href";
      wrapper = mount(renderHelp({ href: mockHref }));
      expect(wrapper.find("a").exists()).toBe(true);
      wrapper.unmount();
    });

    it("sets href attribute when href set", () => {
      const mockHref = "href";
      wrapper = mount(renderHelp({ href: mockHref }));

      expect(wrapper.find(StyledHelp).prop("target")).toEqual("_blank");
      expect(wrapper.find(StyledHelp).prop("rel")).toEqual(
        "noopener noreferrer"
      );
      expect(wrapper.find(StyledHelp).prop("role")).toEqual(undefined);
      wrapper.unmount();
    });

    it("does not render a tooltip if no children are passed", () => {
      wrapper = shallow(<Help />);
      icon = wrapper.find(Icon);
      tooltip = wrapper.find(Tooltip);
      expect(icon.props().type).toBe("help");
      expect(tooltip.exists()).toBeFalsy();
    });

    it("renders the accessibility label and tooltiptext in visually hidden text", () => {
      wrapper = mount(
        renderHelp({ accessibilityLabel: "foo", children: "tooltip text" })
      );
      const hiddenText = wrapper.find(VisuallyHidden).text();
      expect(hiddenText).toContain("foo");
      expect(hiddenText).toContain("tooltip text");
    });
  });

  describe("tags on component", () => {
    const tagsWrapper = shallow(
      renderHelp({
        "data-element": "bar",
        "data-role": "baz",
      })
    );

    it("include correct component, element and role data tags", () => {
      rootTagTest(tagsWrapper, "help", "bar", "baz");
    });
  });

  it("does not prevent clicking interacting with the input", () => {
    wrapper = mount(renderHelp({}));
    const preventDefault = jest.fn();
    wrapper.simulate("click", { preventDefault });
    expect(preventDefault).not.toHaveBeenCalled();
  });

  describe("when the Help component is focused", () => {
    beforeEach(() => {
      wrapper = mount(renderHelp({}));
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
      wrapper = mount(renderHelp({}));
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
      key: "Escape",
      bubbles: true,
    });
    const enterKeyDownEvent = new KeyboardEvent("keydown", {
      key: "Enter",
      bubbles: true,
    });
    let domNode: Element;

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
});
