/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { act } from "react-dom/test-utils";
import { mount, ReactWrapper, shallow } from "enzyme";
import TestRenderer from "react-test-renderer";

import Drawer, { DrawerProps } from "./drawer.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import guid from "../../__internal__/utils/helpers/guid";
import {
  StyledDrawerSidebar,
  StyledDrawerContent,
  StyledDrawerChildren,
  StyledSidebarTitle,
  StyledSidebarToggleButton,
  StyledSidebarHeader,
} from "./drawer.style";
import { noThemeSnapshot } from "../../__spec_helper__/enzyme-snapshot-helper";
import StickyFooter from "../../__internal__/sticky-footer";
import Button from "../button";
import Logger from "../../__internal__/utils/logger";

// mock Logger.deprecate so that no console warnings occur while running the tests
const loggerSpy = jest.spyOn(Logger, "deprecate");

jest.mock("../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => "guid-123");

let container: HTMLDivElement | null;

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

function renderDrawerInContainer(jsx: JSX.Element) {
  return mount(jsx, { attachTo: container });
}

function getDrawer(props: Partial<DrawerProps> = {}) {
  return (
    <Drawer {...props}>
      content body content body content body content body content body content
      body content body
    </Drawer>
  );
}

function renderDrawer(props: Partial<DrawerProps> = {}) {
  return mount(getDrawer(props));
}

describe("Drawer", () => {
  beforeAll(() => {
    loggerSpy.mockImplementation(() => {});
  });

  afterAll(() => {
    loggerSpy.mockRestore();
  });

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    jest.useFakeTimers();
  });

  afterEach(() => {
    if (container) {
      document.body.removeChild(container);
    }
    container = null;
  });

  describe("uncontrolled", () => {
    it("matches snapshot", () => {
      const drawerComponent = getDrawer(defaultProps);
      const wrapper = shallow(drawerComponent);

      expect(noThemeSnapshot(wrapper)).toMatchSnapshot();
    });

    it("cleans ups timers on unmount", () => {
      const wrapper = renderDrawer({ expanded: true });
      const clearTimeoutSpy = jest.spyOn(window, "clearTimeout");
      wrapper.setProps({ expanded: false });
      wrapper.unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();
    });

    it("is expanded by default", () => {
      const wrapper = renderDrawer();
      const content = wrapper.find(StyledDrawerContent);

      expect(content?.prop("className").includes("open")).toEqual(true);
    });

    it("correctly sets aria attribute", () => {
      const ariaLabel = "test";
      const wrapper = renderDrawer({ "aria-label": ariaLabel });
      const drawer = wrapper.find(Drawer);

      expect(drawer?.prop("aria-label")).toBe(ariaLabel);
    });

    it("has data-component attribute value set to 'drawer'", () => {
      const dataAttr = "drawer";
      const wrapper = renderDrawer();
      const drawer = wrapper.find(Drawer);

      expect(drawer?.getDOMNode().getAttribute("data-component")).toBe(
        dataAttr
      );
    });

    it("Drawer Sidebar should render as expected when not expanded", () => {
      const wrapper = renderDrawer({ expanded: false });

      assertStyleMatch(
        {
          display: "none",
          opacity: "0",
          overflowY: undefined,
        },
        wrapper.find(StyledDrawerSidebar)
      );
    });

    it("Drawer Sidebar should render as expected when expanded", () => {
      const wrapper = renderDrawer({ expanded: true });

      assertStyleMatch(
        {
          display: "flex",
          flexDirection: "column",
          flex: "1 1 0%",
          overflowY: "auto",
        },
        wrapper.find(StyledDrawerSidebar)
      );
    });

    describe("Drawer Content", () => {
      it("should render with correct styles", () => {
        const wrapper = renderDrawer();
        assertStyleMatch(
          {
            minWidth: "var(--sizing500)",
            width: "var(--sizing500)",
          },
          wrapper.find(StyledDrawerContent)
        );
      });

      describe("when background color is not provided as a prop", () => {
        it("renders with default background color and border", () => {
          const wrapper = renderDrawer();
          assertStyleMatch(
            {
              backgroundColor: "var(--colorsUtilityMajor040)",
              borderRight: "1px solid var(--colorsUtilityMajor075)",
            },
            wrapper.find(StyledDrawerContent)
          );
        });
      });

      it("children are rendered as expected", () => {
        const wrapper = renderDrawer();
        const children = wrapper.find(StyledDrawerChildren);
        assertStyleMatch(
          {
            flex: "1",
            overflow: "auto",
          },
          children
        );
      });
    });

    describe("Control Button", () => {
      it("renders with correct styles", () => {
        const snapshot = TestRenderer.create(
          <StyledSidebarToggleButton />
        ).toJSON();
        expect(snapshot).toMatchSnapshot();
      });
    });

    it("opens sidebar to specific width matching expandedWidth prop", () => {
      const expandedWidth = "50%";
      const wrapper = renderDrawer({ expandedWidth, showControls: true });
      const content = wrapper.find(StyledDrawerContent);
      const button = wrapper.find(StyledSidebarToggleButton);
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
        const wrapper = renderDrawer({ showControls: true });
        const button = wrapper.find(StyledSidebarToggleButton);
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
        const wrapper = renderDrawer({ height, showControls: true });
        const button = wrapper.find(StyledSidebarToggleButton);
        button.simulate("click");

        assertStyleMatch(
          {
            height: "50%",
          },
          wrapper
        );
      });
    });

    describe("when title prop is provided", () => {
      it("Sidebar sets it as heading", () => {
        const heading = "My custom title";
        const wrapper = renderDrawer({ title: heading });
        const title = wrapper.find(StyledSidebarTitle);

        expect(title.text()).toBe(heading);
      });

      it("Sidebar renders heading with correct styles", () => {
        const heading = "My custom title";
        const wrapper = renderDrawer({ title: heading });
        const title = wrapper.find(StyledSidebarTitle);

        assertStyleMatch(
          {
            padding: "var(--spacing300) var(--spacing500)",
          },
          title
        );
      });
    });

    it("one click on button closes drawer sidebar", () => {
      const wrapper = renderDrawer({ showControls: true });
      const button = wrapper.find(StyledSidebarToggleButton);
      button.simulate("click");
      const content = wrapper.find(StyledDrawerContent);
      expect(content.childAt(0).hasClass("closed")).toBeTruthy();
    });

    it("two clicks on button closes and then opens drawer sidebar", () => {
      const wrapper = renderDrawer({ showControls: true });
      let button = wrapper.find(StyledSidebarToggleButton);
      button.simulate("click");
      let content = wrapper.find(StyledDrawerContent);

      expect(content.childAt(0).hasClass("closed")).toBeTruthy();
      button = wrapper.find(StyledSidebarToggleButton);
      button.simulate("click");
      content = wrapper.find(StyledDrawerContent);

      expect(content.childAt(0).hasClass("open")).toBeTruthy();
    });

    it("sets class `open` on drawer by default", () => {
      const wrapper = renderDrawer({ showControls: true });
      const content = wrapper.find(StyledDrawerContent);

      expect(content.childAt(0).hasClass("open")).toBeTruthy();
    });

    describe("when the defaultExpanded prop is set to false", () => {
      let wrapper: ReactWrapper;
      let button: ReactWrapper;

      beforeEach(() => {
        wrapper = renderDrawer({
          defaultExpanded: false,
          showControls: true,
        });
        button = wrapper.find(StyledSidebarToggleButton);
      });

      it("sets class `open` on drawer that opened", () => {
        act(() => {
          button.simulate("click");
          jest.runAllTimers();
        });
        wrapper.update();
        const content = wrapper.find(StyledDrawerContent);

        expect(content.childAt(0).hasClass("open")).toBeTruthy();
      });
    });

    it("two clicks on button opens and then closes drawer sidebar", () => {
      const wrapper = renderDrawer({ showControls: true });
      const button = wrapper.find(StyledSidebarToggleButton);
      button.simulate("click");
      const content = wrapper.find(StyledDrawerContent);

      expect(content.childAt(0).hasClass("closed")).toBeTruthy();
    });

    it("sets class `closed` on drawer that closed", () => {
      const wrapper = renderDrawer({ showControls: true });
      const button = wrapper.find(StyledSidebarToggleButton);
      act(() => {
        button.simulate("click");
        jest.runAllTimers();
      });
      wrapper.update();
      const content = wrapper.find(StyledDrawerContent);

      expect(content.childAt(0).hasClass("closed")).toBeTruthy();
    });

    describe("with the stickyHeader prop set", () => {
      describe("when expanded", () => {
        it("should add the correct styles", () => {
          const wrapper = renderDrawer({
            stickyHeader: true,
            showControls: true,
            title: "Test title",
          });

          assertStyleMatch(
            {
              position: "sticky",
              top: "0",
              borderBottom: "var(--sizing010) solid #ccd6db",
            },
            wrapper.find(StyledSidebarHeader)
          );
        });
      });

      describe("when closed", () => {
        it("should add the correct styles", () => {
          const wrapper = renderDrawer({
            stickyHeader: true,
            showControls: true,
            title: "Test title",
            expanded: false,
          });

          assertStyleMatch(
            {
              position: "sticky",
              top: "0",
              borderBottom: undefined,
            },
            wrapper.find(StyledSidebarHeader)
          );
        });
      });
    });

    describe("with the footer prop set", () => {
      describe("when stickyFooter prop is false", () => {
        it("should not be sticky", () => {
          const wrapper = renderDrawer({
            footer: <div>Some footer content</div>,
          });

          expect(wrapper.find(StickyFooter).props().disableSticky).toEqual(
            true
          );
        });
      });

      describe("when stickyFooter prop is true", () => {
        it("should be sticky", () => {
          const wrapper = renderDrawer({
            footer: <div>Some footer content</div>,
            stickyFooter: true,
          });

          expect(wrapper.find(StickyFooter).props().disableSticky).toEqual(
            false
          );
        });
      });
    });

    describe("invariant", () => {
      let consoleSpy: jest.SpyInstance;

      beforeEach(() => {
        consoleSpy = jest
          .spyOn(global.console, "error")
          .mockImplementation(() => {});
      });

      afterEach(() => {
        consoleSpy.mockReset();
      });

      it("throws if Drawer is changed from uncontrolled to controlled", () => {
        expect(() => {
          const wrapper = renderDrawer({ expanded: undefined });
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
      const wrapper = renderDrawer({ expanded: true });
      const content = wrapper.find(StyledDrawerContent);

      assertStyleMatch(
        {
          width: "40%",
        },
        content.childAt(0),
        { modifier: "&.open" }
      );
    });

    it("is collapsed when expanded prop is provided and is false", () => {
      const wrapper = renderDrawer({ expanded: false });
      const content = wrapper.find(StyledDrawerContent);

      expect(content.prop("className").includes("closed")).toEqual(true);
    });

    it("drawer changes to closed when button is clicked", () => {
      const wrapper = renderDrawer({ expanded: true, showControls: true });
      const button = wrapper.find(StyledSidebarToggleButton);
      button.simulate("click");
      const content = wrapper.find(StyledDrawerContent);

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
      const wrapper = renderDrawer({
        expanded: false,
        showControls: true,
        onChange,
      });
      const button = wrapper.find(StyledSidebarToggleButton);
      button.simulate("click");
      const content = wrapper.find(StyledDrawerContent);

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
      const wrapper = renderDrawer({
        expanded: false,
        showControls: true,
        animationDuration: "500ms",
      });
      const button = wrapper.find(StyledSidebarToggleButton);
      button.simulate("click");
      const content = wrapper.find(StyledDrawerContent);

      expect(content.childAt(0).hasClass("opening")).toBeTruthy();
    });

    it("sets `closing` class on drawer when close icon was clicked", () => {
      const wrapper = renderDrawer({
        expanded: true,
        showControls: true,
        animationDuration: "0.5s",
      });
      const button = wrapper.find(StyledSidebarToggleButton);
      button.simulate("click");
      const content = wrapper.find(StyledDrawerContent);

      expect(content.childAt(0).hasClass("closing")).toBeTruthy();
    });

    it("sets animation speed to two seconds when string `numeric` value is given as a string", () => {
      const animationDuration = "2000";
      const wrapper = renderDrawer({
        expanded: true,
        showControls: true,
        animationDuration,
      });
      const button = wrapper.find(StyledSidebarToggleButton);
      button.simulate("click");
      const content = wrapper.find(StyledDrawerContent);

      expect(content.childAt(0).prop("animationDuration")).toBe(
        animationDuration
      );
    });

    it("sets animation speed to two seconds when string `ms` value is given as a string", () => {
      const animationDuration = "2000ms";
      const wrapper = renderDrawer({
        expanded: true,
        showControls: true,
        animationDuration,
      });
      const button = wrapper.find(StyledSidebarToggleButton);
      button.simulate("click");
      const content = wrapper.find(StyledDrawerContent);

      expect(content.childAt(0).prop("animationDuration")).toBe(
        animationDuration
      );
    });

    it("sets animation speed to two seconds when string `decimal` value is given as a string", () => {
      const animationDuration = "0.5s";
      const wrapper = renderDrawer({
        expanded: true,
        showControls: true,
        animationDuration,
      });
      const button = wrapper.find(StyledSidebarToggleButton);
      button.simulate("click");
      const content = wrapper.find(StyledDrawerContent);

      expect(content.childAt(0).prop("animationDuration")).toBe(
        animationDuration
      );
    });

    it("sets animation speed to two seconds when string `seconds` value is given as a string", () => {
      const animationDuration = "2s";
      const wrapper = renderDrawer({
        expanded: true,
        showControls: true,
        animationDuration,
      });
      const button = wrapper.find(StyledSidebarToggleButton);
      button.simulate("click");
      const content = wrapper.find(StyledDrawerContent);

      expect(content.childAt(0).prop("animationDuration")).toBe(
        animationDuration
      );
    });

    it("sets background color as red when backgroundColor prop is provided", () => {
      const color = "#FF0000";
      const wrapper = renderDrawer({ backgroundColor: color });
      const content = wrapper.find(StyledDrawerContent);

      assertStyleMatch(
        {
          backgroundColor: color,
        },
        content.childAt(0)
      );
    });

    it("sets background color as white when backgroundColor prop is provided", () => {
      const color = "#FFFFFF";
      const wrapper = renderDrawer({ backgroundColor: color });
      const content = wrapper.find(StyledDrawerContent);

      assertStyleMatch(
        {
          backgroundColor: color,
        },
        content.childAt(0)
      );
    });

    it("sets background as transparent when backgroundColor prop is provided", () => {
      const color = "transparent";
      const wrapper = renderDrawer({ backgroundColor: color });
      const content = wrapper.find(StyledDrawerContent);

      assertStyleMatch({}, content.childAt(0));
    });

    describe("by an external control", () => {
      // eslint-disable-next-line react/prop-types
      const MockComponent = ({ expanded = false }) => {
        const [isExpanded, setIsExpanded] = React.useState(expanded);
        return (
          <>
            <Button href="elo" onClick={() => setIsExpanded((p) => !p)}>
              Expand
            </Button>
            <Drawer sidebar="foo" expanded={isExpanded}>
              content body content body content body content body content body
              content body content body
            </Drawer>
          </>
        );
      };

      it("expands the sidebar", () => {
        const wrapper = renderDrawerInContainer(<MockComponent />);

        act(() => {
          wrapper
            .find(Button)
            .props()
            .onClick?.({} as React.MouseEvent<HTMLButtonElement>);
          jest.runAllTimers();
        });
        expect(
          wrapper.update().find(StyledDrawerSidebar).prop("isExpanded")
        ).toEqual(true);
      });

      it("toggles the opening animation and sets the expected class name", () => {
        const wrapper = renderDrawerInContainer(<MockComponent />);
        const button = wrapper.find(Button);
        button.simulate("click");
        const content = wrapper.find(StyledDrawerContent);

        expect(content.childAt(0).hasClass("opening")).toBeTruthy();
      });

      it("contracts the sidebar and toggles the closing animation", () => {
        const wrapper = renderDrawerInContainer(<MockComponent expanded />);

        act(() => {
          wrapper
            .find(Button)
            .props()
            .onClick?.({} as React.MouseEvent<HTMLAnchorElement>);
          jest.runAllTimers();
        });

        expect(
          wrapper.update().find(StyledDrawerSidebar).prop("isExpanded")
        ).toEqual(false);
      });

      it("toggles the closing animation and sets the expected class name", () => {
        const wrapper = renderDrawerInContainer(<MockComponent expanded />);
        const button = wrapper.find(Button);
        button.simulate("click");
        const content = wrapper.find(StyledDrawerContent);

        expect(content.childAt(0).hasClass("closing")).toBeTruthy();
      });
    });

    describe("invariant", () => {
      let consoleSpy: jest.SpyInstance;

      beforeEach(() => {
        consoleSpy = jest
          .spyOn(global.console, "error")
          .mockImplementation(() => {});
      });

      afterEach(() => {
        consoleSpy.mockReset();
      });

      it("throws if Drawer is changed from controlled to uncontrolled", () => {
        expect(() => {
          const wrapper = renderDrawer({ expanded: true });
          wrapper.setProps({ expanded: undefined });
          wrapper.update();
        }).toThrow(
          "Drawer should not switch from uncontrolled to controlled (or vice versa). Decide between" +
            " using a controlled or uncontrolled Drawer element for the lifetime of the component"
        );
      });
    });
  });

  it("has the expected border radius on the sidebar toggle control", () => {
    assertStyleMatch(
      {
        borderRadius: "var(--borderRadius050)",
      },
      renderDrawer({ showControls: true }).find(StyledSidebarToggleButton)
    );
  });
});
