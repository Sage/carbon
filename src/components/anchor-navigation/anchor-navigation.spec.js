import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import { simulate, assertStyleMatch } from "../../__spec_helper__/test-utils";

import Textbox from "../textbox";
import {
  AnchorNavigation,
  AnchorNavigationItem,
  AnchorSectionDivider,
} from ".";
import {
  StyledAnchorNavigation,
  StyledNavigation,
} from "./anchor-navigation.style";
import StyledNavigationItem from "./anchor-navigation-item/anchor-navigation-item.style";

const expectNavigationItemToBeSelected = (index, wrapper) =>
  assertStyleMatch(
    {
      backgroundColor: "var(--colorsActionMinorYang100)",
      borderLeftColor: "var(--colorsActionMajor500)",
    },
    wrapper.find(StyledNavigationItem).at(index),
    { modifier: "a" }
  );

// eslint-disable-next-line react/prop-types
const Content = React.forwardRef(({ title, noTextbox }, ref) => (
  <>
    <div ref={ref} className="focusableContent">
      {!noTextbox && <Textbox label={title} />}
      <h2>{title}</h2>
    </div>
  </>
));

describe("AnchorNavigation", () => {
  let wrapper;
  let scrollIntoViewMock;
  let container;

  let ref1;
  let ref2;
  let ref3;
  let ref4;
  let ref5;

  const renderAttached = (props) => {
    ref1 = React.createRef();
    ref2 = React.createRef();
    ref3 = React.createRef();
    ref4 = React.createRef();
    ref5 = React.createRef();

    function mockFunction(options) {
      return { options, element: this };
    }
    scrollIntoViewMock = jest.fn().mockImplementation(mockFunction);

    Element.prototype.scrollIntoView = scrollIntoViewMock;

    wrapper = mount(
      <AnchorNavigation
        stickyNavigation={
          <>
            <AnchorNavigationItem target={ref1}>First</AnchorNavigationItem>
            <AnchorNavigationItem target={ref2}>Second</AnchorNavigationItem>
            <AnchorNavigationItem target={ref3}>Third</AnchorNavigationItem>
            <AnchorNavigationItem target={ref4}>
              The slighly longer than expected fourth navigation item
            </AnchorNavigationItem>
            <AnchorNavigationItem target={ref5}>Fifth</AnchorNavigationItem>
          </>
        }
        {...props}
      >
        <Content ref={ref1} title="First section" />
        <AnchorSectionDivider />
        <Content ref={ref2} title="Second section" />
        <AnchorSectionDivider />
        <Content ref={ref3} title="Third section" noTextbox />
        <AnchorSectionDivider />
        <Content ref={ref4} title="Fourth section" />
        <AnchorSectionDivider />
        <Content ref={ref5} title="Fifth section" />
      </AnchorNavigation>,
      { attachTo: document.getElementById("enzymeContainer") }
    );
  };

  beforeEach(() => {
    jest.useFakeTimers();
    container = document.createElement("div");
    container.id = "enzymeContainer";
    document.body.appendChild(container);
    renderAttached();
  });

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }

    container = null;
  });

  it("has proper data attributes applied to elements", () => {
    expect(
      wrapper
        .find(StyledAnchorNavigation)
        .getDOMNode()
        .getAttribute("data-component")
    ).toBe("anchor-navigation");
    expect(
      wrapper.find(StyledNavigation).getDOMNode().getAttribute("data-element")
    ).toBe("anchor-sticky-navigation");
    wrapper.find(`${StyledNavigationItem} a`).forEach((navItem) => {
      expect(navItem.getDOMNode().getAttribute("data-element")).toBe(
        "anchor-navigation-item"
      );
    });
  });

  it.each([
    [0, true],
    [1, true],
    [2, false],
    [3, true],
    [4, true],
  ])(
    "clicking on navigation item selects this item, scrolls to wanted section and focuses its first focusable element",
    (index, hasFocusableElement) => {
      const preventDefault = jest.fn();
      wrapper
        .find(`${StyledNavigationItem} a`)
        .at(index)
        .simulate("click", { preventDefault });

      act(() => {
        window.dispatchEvent(new Event("scroll"));
        jest.advanceTimersByTime(150);
      });
      wrapper.update();
      expectNavigationItemToBeSelected(index, wrapper);

      if (hasFocusableElement) {
        expect(wrapper.find(Content).at(index).find("input")).toBeFocused();
      }
    }
  );

  describe.each([
    ["enter", 13],
    ["space", 32],
  ])("%s", (key, keyCode) => {
    it.each([
      [0, true],
      [1, true],
      [2, false],
      [3, true],
      [4, true],
    ])(
      "pressed on navigation item scrolls to wanted section and focuses its first focusable element",
      (index, hasFocusableElement) => {
        const preventDefault = jest.fn();
        wrapper
          .find(`${StyledNavigationItem} a`)
          .at(index)
          .simulate("keydown", { preventDefault, which: keyCode });
        act(() => {
          jest.advanceTimersByTime(15);
        });

        if (hasFocusableElement) {
          expect(wrapper.find(Content).at(index).find("input")).toBeFocused();
        }
        expect(scrollIntoViewMock).toHaveReturnedWith({
          element: wrapper.find(".focusableContent").at(index).getDOMNode(),
          options: { block: "start", inline: "nearest", behavior: "smooth" },
        });
      }
    );
  });

  it.each([
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 0],
    [0, 1],
  ])(
    "focuses on the next navigation item in a loop when down arrow is pressed",
    (focused, shouldBeFocused) => {
      simulate.keydown.pressDownArrow(
        wrapper.find(`${StyledNavigationItem} a`).at(focused)
      );
      expect(
        wrapper.find(`${StyledNavigationItem} a`).at(shouldBeFocused)
      ).toBeFocused();
    }
  );

  it.each([
    [0, 4],
    [4, 3],
    [3, 2],
    [2, 1],
    [1, 0],
    [0, 4],
  ])(
    "focuses on the previous navigation item in a loop when up arrow is pressed",
    (focused, shouldBeFocused) => {
      simulate.keydown.pressUpArrow(
        wrapper.find(`${StyledNavigationItem} a`).at(focused)
      );
      expect(
        wrapper.find(`${StyledNavigationItem} a`).at(shouldBeFocused)
      ).toBeFocused();
    }
  );

  // coverage filler
  it("does nothing if key other than up, down, tab or space key is pressed", () => {
    simulate.keydown.pressRightArrow(
      wrapper.find(`${StyledNavigationItem} a`).at(0)
    );
  });

  it.each([
    [399, 0],
    [400, 1],
    [799, 1],
    [800, 2],
    [1199, 2],
    [1200, 3],
    [1599, 3],
    [1600, 4],
    [1999, 4],
    [2000, 4],
  ])(
    "scroll triggers selection of proper navigation item based on the navigation and sections top position",
    (scrollPosition, selectedAnchorIndex) => {
      const topEdgeOffsets = [400, 800, 1200, 1600, 2000];
      const refs = [ref1, ref2, ref3, ref4, ref5];

      refs.forEach((ref, index) => {
        jest
          .spyOn(ref.current, "getBoundingClientRect")
          .mockImplementation(() => ({
            top: topEdgeOffsets[index] - scrollPosition,
          }));
      });

      jest
        .spyOn(
          wrapper.find(StyledNavigation).getDOMNode(),
          "getBoundingClientRect"
        )
        .mockImplementation(() => ({ top: 200 }));

      act(() => {
        window.dispatchEvent(new Event("scroll"));
      });
      wrapper.update();
      expectNavigationItemToBeSelected(selectedAnchorIndex, wrapper);
    }
  );

  it("cleans up event listeners after unmounting", () => {
    const addEventListenerSpy = jest.spyOn(window, "removeEventListener");
    wrapper.unmount();
    expect(
      addEventListenerSpy.mock.calls.filter((call) => call[0] === "scroll")
    ).toHaveLength(1);
  });

  describe("validates the incorrect stickyNavigation prop content", () => {
    it("has wrong item", () => {
      jest.spyOn(global.console, "error").mockImplementation(() => {});

      mount(
        <AnchorNavigation
          stickyNavigation={
            <>
              <p>Invalid children</p>
            </>
          }
        />
      );

      const expected =
        "Warning: Failed prop type: Prop stickyNavigation container supplied to AnchorNavigation only accepts children of" +
        " type AnchorNavigationItem.\n    in AnchorNavigation";

      expect(console.error).toHaveBeenCalledWith(expected); // eslint-disable-line no-console
    });

    it("has wrong container", () => {
      jest.spyOn(global.console, "error").mockImplementation(() => {});

      mount(
        <AnchorNavigation
          stickyNavigation={
            <div>
              <AnchorNavigationItem>First</AnchorNavigationItem>
            </div>
          }
        />
      );

      const expected =
        "Warning: Failed prop type: Prop stickyNavigation container supplied to AnchorNavigation should be a React.Fragment." +
        "\n    in AnchorNavigation";

      expect(console.error).toHaveBeenCalledWith(expected); // eslint-disable-line no-console
    });

    it("has wrong container and items", () => {
      jest.spyOn(global.console, "error").mockImplementation(() => {});

      mount(
        <AnchorNavigation
          stickyNavigation={
            <div>
              <AnchorNavigationItem>First</AnchorNavigationItem>
              <p>Invalid item</p>
            </div>
          }
        />
      );

      const expected =
        "Warning: Failed prop type: Prop stickyNavigation container supplied to AnchorNavigation should be a React.Fragment." +
        " Prop stickyNavigation container supplied to AnchorNavigation only accepts children of type AnchorNavigationItem." +
        "\n    in AnchorNavigation";

      expect(console.error).toHaveBeenCalledWith(expected); // eslint-disable-line no-console
    });
  });

  it("renders not selected navigation item with proper background when hovered", () => {
    assertStyleMatch(
      {
        backgroundColor: "var(--colorsActionMinor100)",
      },
      wrapper.find(StyledNavigationItem).at(1),
      { modifier: "a:hover" }
    );
  });

  it("renders selected navigation item with proper background when hovered", () => {
    expect(
      wrapper.find(StyledNavigationItem).at(0)
    ).not.toHaveStyleRule("background-color", { modifier: "a:hover" });
  });
});
