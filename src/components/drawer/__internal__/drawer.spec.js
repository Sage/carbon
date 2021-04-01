/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { act } from "react-dom/test-utils";
import { mount as enzymeMount, shallow } from "enzyme";
import Drawer from "./drawer.component";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import guid from "../../../utils/helpers/guid/guid";
import {
  StyledDrawerSidebar,
  StyledDrawerContent,
  StyledDrawerChildren,
  StyledSidebarTitle,
  StyledButton,
} from "./drawer.style";
import { noThemeSnapshot } from "../../../__spec_helper__/enzyme-snapshot-helper";

jest.mock("../../../utils/helpers/guid");
guid.mockImplementation(() => "guid-123");

let container = null;

const defaultProps = {
  expandedWidth: "20%",
  animationDuration: "0.5s",
  sidebar: (
    <ul>
      <li>link a</li>
      <li>link b</li>
      <li>link c</li>
    </ul>
  ),
};

const mount = (jsx) => {
  return enzymeMount(jsx, { attachTo: container });
};

const render = (props, renderer = mount) => {
  return renderer(
    <Drawer {...props}>
      content body content body content body content body content body content
      body content body
    </Drawer>
  );
};

const getElements = (wrapper) => {
  const cw = wrapper;

  if (!cw) {
    return {};
  }

  return {
    drawer: cw.find(Drawer),
    sidebar: cw.find(StyledDrawerSidebar),
    content: cw.find(StyledDrawerContent),
    children: cw.find(StyledDrawerChildren),
    button: cw.find(StyledButton),
    title: cw.find(StyledSidebarTitle),
  };
};

describe("Drawer", () => {
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  describe("uncontrolled", () => {
    it("matches snapshot", () => {
      const wrapper = render(defaultProps, shallow);
      expect(noThemeSnapshot(wrapper)).toMatchSnapshot();
    });

    it("cleans ups timers on unmount", () => {
      const wrapper = render();
      wrapper.unmount();
      expect(clearTimeout).toHaveBeenCalled();
    });

    it("is expanded by default", () => {
      const wrapper = render();
      const { content } = getElements(wrapper);
      expect(content.prop("aria-expanded")).toBe("true");
    });

    it("cleans ups timers on unmount", () => {
      const wrapper = render();
      wrapper.unmount();
      expect(clearTimeout).toHaveBeenCalled();
    });

    it("correctly sets aria attribute", () => {
      const ariaLabel = "test";
      const wrapper = render({ "aria-label": ariaLabel });
      const { drawer } = getElements(wrapper);
      expect(drawer.prop("aria-label")).toBe(ariaLabel);
    });

    it("renders drawer component correctly", () => {
      const dataAttr = "drawer";
      const wrapper = render({ "data-component": dataAttr });
      const { drawer } = getElements(wrapper);
      expect(drawer.prop("data-component")).toBe(dataAttr);
    });

    it("Drawer Sidebar should render as expected", () => {
      const wrapper = render();
      const { sidebar } = getElements(wrapper);
      assertStyleMatch(
        {
          overflow: "auto",
        },
        sidebar
      );
    });

    it("Drawer Content should render as expected", () => {
      const wrapper = render();
      const { children } = getElements(wrapper);
      assertStyleMatch(
        {
          flex: "1",
          overflow: "auto",
        },
        children
      );
    });

    it("opens sidebar to specific width matching expandedWidth prop", () => {
      const expandedWidth = "50%";
      const wrapper = render({ expandedWidth, showControls: true });
      const { button, content } = getElements(wrapper);
      button.simulate("click");
      assertStyleMatch(
        {
          width: expandedWidth,
        },
        content.childAt(0),
        { modifier: "&.open" }
      );
    });

    describe("when height prop is provided", () => {
      it("should render height 100% by default", () => {
        const wrapper = render({ showControls: true });
        const { button } = getElements(wrapper);
        button.simulate("click");
        assertStyleMatch(
          {
            height: "100%",
          },
          wrapper
        );
      });

      it("should render custom height if provided", () => {
        const height = "50%";
        const wrapper = render({ height, showControls: true });
        const { button } = getElements(wrapper);
        button.simulate("click");
        assertStyleMatch(
          {
            height: "50%",
          },
          wrapper
        );
      });
    });

    it("one click on button closes drawer sidebar", () => {
      const wrapper = render({ showControls: true });
      const { button } = getElements(wrapper);
      button.simulate("click");
      const { content } = getElements(wrapper);
      expect(content.childAt(0).hasClass("closed")).toBeTruthy();
    });

    it("two clicks on button closes and then opens drawer sidebar", () => {
      const wrapper = render({ showControls: true });
      let { button } = getElements(wrapper);
      button.simulate("click");
      let { content } = getElements(wrapper);
      expect(content.childAt(0).hasClass("closed")).toBeTruthy();
      button = getElements(wrapper).button;
      button.simulate("click");
      content = getElements(wrapper).content;
      expect(content.childAt(0).hasClass("open")).toBeTruthy();
    });

    it("sets class `open` on drawer that opened", () => {
      const wrapper = render({ defaultExpanded: false, showControls: true });
      const { button } = getElements(wrapper);
      act(() => {
        button.simulate("click");
        jest.runAllTimers();
      });
      wrapper.update();
      const { content } = getElements(wrapper);
      expect(content.childAt(0).hasClass("open")).toBeTruthy();
    });

    it("two clicks on button opens and then closes drawer sidebar", () => {
      const wrapper = render({ showControls: true });
      const { button } = getElements(wrapper);
      button.simulate("click");
      const { content } = getElements(wrapper);
      expect(content.childAt(0).hasClass("closed")).toBeTruthy();
    });

    it("sets class `open` on drawer that opened", () => {
      const wrapper = render({ showControls: true });
      const { content } = getElements(wrapper);
      expect(content.childAt(0).hasClass("open")).toBeTruthy();
    });

    it("sets class `closed` on drawer that closed", () => {
      const wrapper = render({ showControls: true });
      const { button } = getElements(wrapper);
      act(() => {
        button.simulate("click");
        jest.runAllTimers();
      });
      wrapper.update();
      const { content } = getElements(wrapper);
      expect(content.childAt(0).hasClass("closed")).toBeTruthy();
    });

    describe("invariant", () => {
      beforeEach(() => {
        jest.spyOn(global.console, "error").mockImplementation(() => {});
      });

      afterEach(() => {
        global.console.error.mockReset();
      });

      it("throws if Drawer is changed from uncontrolled to controlled", () => {
        expect(() => {
          const wrapper = render({ expanded: undefined });
          wrapper.setProps({ expanded: true });
          wrapper.update();
        }).toThrow(
          "Drawer should not switch from uncontrolled to controlled (or vice versa). Decide between" +
            " using a controlled or uncontrolled Drawer element for the lifetime of the component"
        );
      });
    });
  });

  describe("controlled", () => {
    it("sidebar is open when expanded prop is provided", () => {
      const wrapper = render({ expanded: true });
      const { content } = getElements(wrapper);
      assertStyleMatch(
        {
          width: "40%",
        },
        content.childAt(0),
        { modifier: "&.open" }
      );
    });

    it("is collapsed when defaultExpanded prop is provided and is false", () => {
      const wrapper = render({ defaultExpanded: false });
      const { content } = getElements(wrapper);
      expect(content.prop("aria-expanded")).toBe("false");
    });

    it("drawer changes to closed when button is clicked", () => {
      const wrapper = render({ expanded: true, showControls: true });
      const { button } = getElements(wrapper);
      button.simulate("click");
      const { content } = getElements(wrapper);

      assertStyleMatch(
        {
          width: undefined,
        },
        content.childAt(0),
        { modifier: "&.closed" }
      );
    });

    it("drawer changes to open when button is clicked", () => {
      const onChange = jest.fn();
      const wrapper = render({
        expanded: false,
        showControls: true,
        onChange,
      });
      const { button } = getElements(wrapper);
      button.simulate("click");
      const { content } = getElements(wrapper);

      assertStyleMatch(
        {
          width: "40%",
        },
        content.childAt(0),
        { modifier: "&.open" }
      );
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("drawer opening sets timeout class", () => {
      const wrapper = render({
        expanded: false,
        showControls: true,
        animationDuration: "500ms",
      });
      const { button } = getElements(wrapper);
      button.simulate("click");
      const { content } = getElements(wrapper);
      expect(content.childAt(0).hasClass("opening")).toBeTruthy();
    });

    it("sets `closing` class on drawer when close icon was clicked", () => {
      const wrapper = render({
        expanded: true,
        showControls: true,
        animationDuration: "0.5s",
      });
      const { button } = getElements(wrapper);
      button.simulate("click");
      const { content } = getElements(wrapper);
      expect(content.childAt(0).hasClass("closing")).toBeTruthy();
    });

    it("sets animation speed to two seconds when string `numeric` value is given as a string", () => {
      const animationDuration = "2000";
      const wrapper = render({
        expanded: true,
        showControls: true,
        animationDuration,
      });
      const { button } = getElements(wrapper);
      button.simulate("click");
      const { content } = getElements(wrapper);
      expect(content.childAt(0).prop("animationDuration")).toBe(
        animationDuration
      );
    });

    it("sets animation speed to two seconds when string `ms` value is given as a string", () => {
      const animationDuration = "2000ms";
      const wrapper = render({
        expanded: true,
        showControls: true,
        animationDuration,
      });
      const { button } = getElements(wrapper);
      button.simulate("click");
      const { content } = getElements(wrapper);
      expect(content.childAt(0).prop("animationDuration")).toBe(
        animationDuration
      );
    });

    it("sets animation speed to two seconds when string `decimal` value is given as a string", () => {
      const animationDuration = "0.5s";
      const wrapper = render({
        expanded: true,
        showControls: true,
        animationDuration,
      });
      const { button } = getElements(wrapper);
      button.simulate("click");
      const { content } = getElements(wrapper);
      expect(content.childAt(0).prop("animationDuration")).toBe(
        animationDuration
      );
    });

    it("sets animation speed to two seconds when string `seconds` value is given as a string", () => {
      const animationDuration = "2s";
      const wrapper = render({
        expanded: true,
        showControls: true,
        animationDuration,
      });
      const { button } = getElements(wrapper);
      button.simulate("click");
      const { content } = getElements(wrapper);
      expect(content.childAt(0).prop("animationDuration")).toBe(
        animationDuration
      );
    });

    it("sets background color as red when backgroundColor prop is provided", () => {
      const color = "#FF0000";
      const wrapper = render({ backgroundColor: color });
      const { content } = getElements(wrapper);
      assertStyleMatch(
        {
          backgroundColor: color,
        },
        content.childAt(0)
      );
    });

    it("sets background color as white when backgroundColor prop is provided", () => {
      const color = "#FFFFFF";
      const wrapper = render({ backgroundColor: color });
      const { content } = getElements(wrapper);
      assertStyleMatch(
        {
          backgroundColor: color,
        },
        content.childAt(0)
      );
    });

    it("sets background as transparent when backgroundColor prop is provided", () => {
      const color = "transparent";
      const wrapper = render({ backgroundColor: color });
      const { content } = getElements(wrapper);
      assertStyleMatch({}, content.childAt(0));
    });

    it("sets drawer sidebar heading when title prop is provided", () => {
      const heading = "My custom title";
      const wrapper = render({ title: heading });
      const { title } = getElements(wrapper);
      expect(title.text()).toBe(heading);
    });

    describe("invariant", () => {
      beforeEach(() => {
        jest.spyOn(global.console, "error").mockImplementation(() => {});
      });

      afterEach(() => {
        global.console.error.mockReset();
      });

      it("throws if Drawer is changed from controlled to uncontrolled", () => {
        expect(() => {
          const wrapper = render({ expanded: true });
          wrapper.setProps({ expanded: undefined });
          wrapper.update();
        }).toThrow(
          "Drawer should not switch from uncontrolled to controlled (or vice versa). Decide between" +
            " using a controlled or uncontrolled Drawer element for the lifetime of the component"
        );
      });
    });
  });
});
