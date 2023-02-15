import React from "react";
import { act } from "react-dom/test-utils";
import { mount, ReactWrapper } from "enzyme";

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
import { AnchorNavigationProps } from "./anchor-navigation.component";

const SECTION_VISIBILITY_OFFSET = 200;

const expectNavigationItemToBeSelected = (
  index: number,
  wrapper: ReactWrapper
) =>
  assertStyleMatch(
    {
      backgroundColor: "var(--colorsActionMajorYang100)",
      borderLeftColor: "var(--colorsActionMajor500)",
    },
    wrapper.find(StyledNavigationItem).at(index),
    { modifier: "a" }
  );

interface ContentProps {
  title?: string;
  noTextbox?: boolean;
  tabIndex?: number;
}
const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  ({ title, noTextbox, tabIndex }: ContentProps, ref) => (
    <>
      <div ref={ref} className="focusableContent" tabIndex={tabIndex}>
        {!noTextbox && <Textbox label={title} />}
        <h2>{title}</h2>
      </div>
    </>
  )
);
Content.displayName = "Content";

describe("AnchorNavigation", () => {
  let wrapper: ReactWrapper;
  let scrollIntoViewMock: jest.Mock;
  let container: HTMLDivElement | null;

  let ref1: React.RefObject<HTMLDivElement>;
  let ref2: React.RefObject<HTMLDivElement>;
  let ref3: React.RefObject<HTMLDivElement>;
  let ref4: React.RefObject<HTMLDivElement>;
  let ref5: React.RefObject<HTMLDivElement>;

  const renderAttached = (props?: AnchorNavigationProps) => {
    ref1 = React.createRef();
    ref2 = React.createRef();
    ref3 = React.createRef();
    ref4 = React.createRef();
    ref5 = React.createRef();

    function mockView(this: HTMLDivElement, options: ScrollIntoViewOptions) {
      return { element: this, options };
    }
    scrollIntoViewMock = jest.fn().mockImplementation(mockView);
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    wrapper = mount(
      <AnchorNavigation
        stickyNavigation={
          <>
            <AnchorNavigationItem target={ref1}>First</AnchorNavigationItem>
            <AnchorNavigationItem target={ref2}>Second</AnchorNavigationItem>
            <AnchorNavigationItem target={ref3}>Third</AnchorNavigationItem>
            <AnchorNavigationItem target={ref4}>
              The slightly longer than expected fourth navigation item
            </AnchorNavigationItem>
            <AnchorNavigationItem target={ref5}>Fifth</AnchorNavigationItem>
          </>
        }
        {...props}
      >
        <Content tabIndex={0} ref={ref1} title="First section" />
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

  it.each([0, 1, 2, 3, 4])(
    "when navigation item is clicked, item is selected and viewport scrolls to wanted section",
    (index) => {
      const preventDefault = jest.fn();
      wrapper
        .find(`${StyledNavigationItem} a`)
        .at(index)
        .simulate("click", { preventDefault });

      act(() => {
        window.dispatchEvent(new Event("scroll"));
        jest.advanceTimersByTime(40);
      });
      wrapper.update();
      expectNavigationItemToBeSelected(index, wrapper);
    }
  );

  it("when navigation item is clicked, focus on the target section container", () => {
    const sectionIndex = 0;
    const preventDefault = jest.fn();

    wrapper
      .find(`${StyledNavigationItem} a`)
      .at(sectionIndex)
      .simulate("click", { preventDefault });
    wrapper.update();

    expect(wrapper.find(Content).at(sectionIndex)).toBeFocused();
  });

  describe("when Enter is pressed on a navigation item", () => {
    it.each([0, 1, 2, 3, 4])(
      "it scrolls to wanted section and focuses the section container",
      (index) => {
        const preventDefault = jest.fn();
        wrapper
          .find(`${StyledNavigationItem} a`)
          .at(index)
          .simulate("keydown", { preventDefault, key: "Enter" });
        act(() => {
          jest.advanceTimersByTime(15);
        });

        expect(scrollIntoViewMock).toHaveReturnedWith({
          element: wrapper.find(".focusableContent").at(index).getDOMNode(),
          options: { block: "start", inline: "nearest", behavior: "smooth" },
        });

        expect(wrapper.find(Content).at(index)).toBeFocused();
      }
    );

    it("does not alter the tabindex of the container if it was already focusable", () => {
      const preventDefault = jest.fn();

      wrapper
        .find(`${StyledNavigationItem} a`)
        .at(0)
        .simulate("keydown", { preventDefault, key: "Enter" });

      expect(
        wrapper.find(Content).at(0).getDOMNode().getAttribute("tabindex")
      ).toBe("0");
    });
  });

  // coverage filler
  it("does nothing if key other than tab or enter is pressed", () => {
    simulate.keydown.pressArrowRight(
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
        if (ref.current) {
          jest
            .spyOn(ref.current, "getBoundingClientRect")
            .mockImplementation(
              () => ({ top: topEdgeOffsets[index] - scrollPosition } as DOMRect)
            );
        }
      });

      jest
        .spyOn(
          wrapper.find(StyledNavigation).getDOMNode(),
          "getBoundingClientRect"
        )
        .mockImplementation(
          () => ({ top: SECTION_VISIBILITY_OFFSET } as DOMRect)
        );

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
    let mockGlobal: jest.SpyInstance;

    beforeEach(() => {
      mockGlobal = jest
        .spyOn(global.console, "error")
        .mockImplementation(() => undefined);
    });

    afterEach(() => {
      mockGlobal.mockReset();
    });

    it("items are not AnchorNavigationItems", () => {
      const error = `\`stickyNavigation\` prop in \`AnchorNavigation\` should be a React Fragment that only contains children of type \`${AnchorNavigationItem.displayName}\``;

      expect(() => {
        mount(
          <AnchorNavigation
            stickyNavigation={
              <>
                <p>Invalid children</p>
              </>
            }
          />
        );
      }).toThrow(error);
    });

    it("container is not a React Fragment", () => {
      const error =
        "`stickyNavigation` prop in `AnchorNavigation` should be a React Fragment.";

      expect(() => {
        mount(
          <AnchorNavigation
            stickyNavigation={
              <div>
                <AnchorNavigationItem>First</AnchorNavigationItem>
              </div>
            }
          />
        );
      }).toThrow(error);
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
    expect(wrapper.find(StyledNavigationItem).at(0)).not.toHaveStyleRule(
      "background-color",
      undefined,
      {
        modifier: "a:hover",
      }
    );
  });
});
