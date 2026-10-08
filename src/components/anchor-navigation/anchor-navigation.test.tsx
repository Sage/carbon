import React, { useRef } from "react";
import { render, screen, act, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Textbox from "../textbox";
import {
  AnchorNavigation,
  AnchorNavigationContent,
  AnchorNavigationItem,
  AnchorNavigationMenu,
  AnchorSectionDivider,
} from ".";

/** Returns the <li> nav item whose link has the given accessible name. */
const getNavItem = (name: string): HTMLElement => {
  const match = screen
    .getAllByRole("listitem")
    .find((item) => within(item).queryByRole("link", { name }) !== null);
  if (!match) throw new Error(`Nav item with link name "${name}" not found`);
  return match;
};

const MockComponent = () => {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);

  return (
    <AnchorNavigation
      aria-label="page sections"
      stickyNavigation={
        <>
          <AnchorNavigationItem target={ref1}>First</AnchorNavigationItem>
          <AnchorNavigationItem target={ref2}>Second</AnchorNavigationItem>
          <AnchorNavigationItem target={ref3}>
            The slightly longer than expected third navigation item
          </AnchorNavigationItem>
        </>
      }
      data-role="test-component"
    >
      <div
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        ref={ref1}
        data-role="section-1"
      >
        <Textbox label="First section" value="" onChange={() => {}} />
        <h2>First section</h2>
      </div>
      <AnchorSectionDivider />
      <div ref={ref2} data-role="section-2">
        <Textbox label="Second section" value="" onChange={() => {}} />
        <h2>Second section</h2>
      </div>
      <AnchorSectionDivider />
      <div ref={ref3} data-role="section-3">
        <h2>Third section</h2>
      </div>
    </AnchorNavigation>
  );
};

const oldScrollIntoView = Element.prototype.scrollIntoView;

beforeAll(() => {
  Element.prototype.scrollIntoView = jest
    .fn()
    .mockImplementation(function mockView(
      this: HTMLDivElement,
      options: ScrollIntoViewOptions,
    ) {
      return { element: this, options };
    });
});

afterAll(() => {
  Element.prototype.scrollIntoView = oldScrollIntoView;
});

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test("has proper data attributes applied to root element and navigation landmark", () => {
  render(<MockComponent />);
  const navigation = screen.getByRole("navigation", {
    name: "page sections",
  });
  expect(navigation).toHaveAttribute("aria-label", "page sections");
  // data-component is on the outer wrapper div, not on the <nav> landmark
  expect(screen.getByTestId("test-component")).toHaveAttribute(
    "data-component",
    "anchor-navigation",
  );
  expect(navigation).not.toContainElement(
    screen.getByRole("heading", { name: "First section" }),
  );
  expect(navigation).toContainElement(screen.getByRole("list"));
  expect(screen.getByRole("list")).toHaveAttribute(
    "data-element",
    "anchor-sticky-navigation",
  );
  // role="list" is explicit to restore VoiceOver list semantics when list-style: none is applied
  expect(screen.getByRole("list")).toHaveAttribute("role", "list");

  const anchorNavigationLinks = screen.getAllByRole("link");
  anchorNavigationLinks.forEach((anchor) => {
    expect(anchor).toHaveAttribute("data-element", "anchor-navigation-item");
  });
});

test("renders nav without aria-label when aria-label prop is not provided", () => {
  const ref = React.createRef<HTMLDivElement>();
  render(
    <AnchorNavigation
      stickyNavigation={
        <>
          <AnchorNavigationItem target={ref}>Item</AnchorNavigationItem>
        </>
      }
    />,
  );
  expect(screen.getByRole("navigation")).not.toHaveAttribute("aria-label");
});

test("applies aria-labelledby to the navigation landmark", () => {
  const ref = React.createRef<HTMLDivElement>();
  render(
    <>
      <h2 id="nav-heading">Page sections</h2>
      <AnchorNavigation
        aria-labelledby="nav-heading"
        stickyNavigation={
          <>
            <AnchorNavigationItem target={ref}>Item</AnchorNavigationItem>
          </>
        }
      />
    </>,
  );
  expect(
    screen.getByRole("navigation", { name: "Page sections" }),
  ).toHaveAttribute("aria-labelledby", "nav-heading");
});

test("marks the selected link as the current location", () => {
  render(<MockComponent />);

  expect(screen.getByRole("link", { name: "First" })).toHaveAttribute(
    "aria-current",
    "location",
  );
  expect(screen.getByRole("link", { name: "Second" })).not.toHaveAttribute(
    "aria-current",
  );
});

test("when navigation item is clicked, the item is selected and the section heading is focused", async () => {
  render(<MockComponent />);

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  await user.click(screen.getByRole("link", { name: "Second" }));

  act(() => {
    jest.advanceTimersByTime(10);
  });
  // toHaveStyle still passes even with incorrect styles when used with CSS variables
  // (see https://github.com/testing-library/jest-dom/issues/461 - the variables seem to be
  // treated by js-dom as "invalid values" as explained in the first reply) - so using toHaveStyleRule instead
  const selectedItem = getNavItem("Second");
  expect(selectedItem).toHaveStyleRule(
    "background-color",
    "var(--tab-bg-active)",
    { modifier: "& a" },
  );
  expect(selectedItem).toHaveStyleRule(
    "background-color",
    "var(--tab-border-active)",
    {
      modifier: '& a [data-element="anchor-navigation-item-indicator"]',
    },
  );
  expect(screen.getByRole("link", { name: "First" })).not.toHaveAttribute(
    "aria-current",
  );
  expect(screen.getByRole("link", { name: "Second" })).toHaveAttribute(
    "aria-current",
    "location",
  );
  const heading = screen.getByRole("heading", { name: "Second section" });
  expect(heading).toHaveFocus();
  expect(heading).toHaveAttribute("data-carbon-anchornav-ref", "true");
  expect(heading).toHaveAttribute("tabindex", "-1");
});

test("when Enter is pressed on a navigation item, the item is selected and the section heading is focused", async () => {
  render(<MockComponent />);

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  screen.getByRole("link", { name: "Second" }).focus();
  await user.keyboard("{Enter}");

  act(() => {
    jest.advanceTimersByTime(10);
  });

  const selectedItem = getNavItem("Second");
  expect(selectedItem).toHaveStyleRule(
    "background-color",
    "var(--tab-bg-active)",
    { modifier: "& a" },
  );
  expect(selectedItem).toHaveStyleRule(
    "background-color",
    "var(--tab-border-active)",
    {
      modifier: '& a [data-element="anchor-navigation-item-indicator"]',
    },
  );
  expect(screen.getByRole("link", { name: "First" })).not.toHaveAttribute(
    "aria-current",
  );
  expect(screen.getByRole("link", { name: "Second" })).toHaveAttribute(
    "aria-current",
    "location",
  );
  expect(screen.getByRole("heading", { name: "Second section" })).toHaveFocus();
});

test("does not alter the tabindex of the container when moving focus to its heading", async () => {
  render(<MockComponent />);

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  screen.getByRole("link", { name: "First" }).focus();
  await user.keyboard("{Enter}");
  act(() => {
    jest.advanceTimersByTime(10);
  });

  expect(screen.getByTestId("section-1")).toHaveAttribute("tabindex", "0");
  expect(screen.getByRole("heading", { name: "First section" })).toHaveFocus();
});

test("does nothing if a key other than tab or enter is pressed", async () => {
  render(<MockComponent />);

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  screen.getByRole("link", { name: "First" }).focus();
  await user.keyboard("{ArrowRight}");
  act(() => {
    jest.advanceTimersByTime(10);
  });

  const originallySelectedItem = getNavItem("First");
  expect(originallySelectedItem).toHaveStyleRule(
    "background-color",
    "var(--tab-bg-active)",
    { modifier: "& a" },
  );
  expect(originallySelectedItem).toHaveStyleRule(
    "background-color",
    "var(--tab-border-active)",
    {
      modifier: '& a [data-element="anchor-navigation-item-indicator"]',
    },
  );
});

test.each([
  [399, 0],
  [400, 1],
  [799, 1],
  [800, 2],
  [1199, 2],
])(
  "scroll triggers selection of proper navigation item based on the scroll position",
  (scrollPosition, selectedAnchorIndex) => {
    render(<MockComponent />);

    const topEdgeOffsets = [400, 800, 1200, 1600, 2000];
    const SECTION_VISIBILITY_OFFSET = 200;
    const sections = [1, 2, 3].map((sectionNumber) =>
      screen.getByTestId(`section-${sectionNumber}`),
    );

    sections.forEach((section, index) => {
      jest
        .spyOn(section, "getBoundingClientRect")
        .mockImplementation(
          () => ({ top: topEdgeOffsets[index] - scrollPosition }) as DOMRect,
        );
    });

    jest
      .spyOn(screen.getByRole("list"), "getBoundingClientRect")
      .mockImplementation(
        () => ({ top: SECTION_VISIBILITY_OFFSET }) as DOMRect,
      );

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    act(() => {
      jest.advanceTimersByTime(10);
    });

    const itemLabels = [
      "First",
      "Second",
      "The slightly longer than expected third navigation item",
    ];
    const selectedItem = getNavItem(itemLabels[selectedAnchorIndex]);
    expect(selectedItem).toHaveStyleRule(
      "background-color",
      "var(--tab-bg-active)",
      { modifier: "& a" },
    );
    expect(selectedItem).toHaveStyleRule(
      "background-color",
      "var(--tab-border-active)",
      {
        modifier: '& a [data-element="anchor-navigation-item-indicator"]',
      },
    );
  },
);

test("focuses the section itself when it has no heading, and does not alter tabindex when already focusable", async () => {
  const ref = React.createRef<HTMLDivElement>();
  render(
    <AnchorNavigation
      stickyNavigation={
        <>
          <AnchorNavigationItem target={ref}>Section</AnchorNavigationItem>
        </>
      }
    >
      {/* section has tabIndex, so it's already focusable; no heading child */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div ref={ref} tabIndex={0} data-role="headingless-section" />
    </AnchorNavigation>,
  );

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  await user.click(screen.getByRole("link", { name: "Section" }));
  act(() => {
    jest.advanceTimersByTime(10);
  });

  // Section itself is the focus target (no heading found → null branch of ??)
  // It already matches focusable selectors (tabIndex=0) → tabindex NOT overwritten (false branch of if)
  const section = screen.getByTestId("headingless-section");
  expect(section).toHaveFocus();
  expect(section).toHaveAttribute("tabindex", "0");
});

test("does not set data-carbon-anchornav-ref when it is already present (second click of same item)", async () => {
  render(<MockComponent />);

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  // First click — sets the attribute
  await user.click(screen.getByRole("link", { name: "Second" }));
  act(() => {
    jest.advanceTimersByTime(10);
  });

  const heading = screen.getByRole("heading", { name: "Second section" });
  expect(heading).toHaveAttribute("data-carbon-anchornav-ref", "true");

  // Second click of the same item — attribute already present (false branch of if)
  await user.click(screen.getByRole("link", { name: "Second" }));
  act(() => {
    jest.advanceTimersByTime(10);
  });

  expect(heading).toHaveAttribute("data-carbon-anchornav-ref", "true");
  expect(heading).toHaveFocus();
});

test("supports conditional items and items inside nested fragments", async () => {
  const firstRef = React.createRef<HTMLDivElement>();
  const secondRef = React.createRef<HTMLDivElement>();
  const showConditionalItem = false;

  render(
    <AnchorNavigation
      stickyNavigation={
        <>
          {showConditionalItem && (
            <AnchorNavigationItem target={firstRef}>
              Hidden
            </AnchorNavigationItem>
          )}
          <>
            <AnchorNavigationItem target={firstRef} key="first">
              First
            </AnchorNavigationItem>
            <>
              <AnchorNavigationItem target={secondRef} key="second">
                Second
              </AnchorNavigationItem>
            </>
          </>
        </>
      }
    >
      <div ref={firstRef}>
        <h2>First section</h2>
      </div>
      <div ref={secondRef}>
        <h2>Second section</h2>
      </div>
    </AnchorNavigation>,
  );

  expect(
    screen.queryByRole("link", { name: "Hidden" }),
  ).not.toBeInTheDocument();
  expect(screen.getAllByRole("link")).toHaveLength(2);

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.click(screen.getByRole("link", { name: "Second" }));
  act(() => {
    jest.advanceTimersByTime(10);
  });

  expect(screen.getByRole("heading", { name: "Second section" })).toHaveFocus();
});

test("keeps item indexes aligned with targets when conditional items change", async () => {
  const firstRef = React.createRef<HTMLDivElement>();
  const secondRef = React.createRef<HTMLDivElement>();

  const Navigation = ({ showFirst }: { showFirst: boolean }) => (
    <AnchorNavigation
      stickyNavigation={
        <>
          {showFirst && (
            <AnchorNavigationItem target={firstRef} key="first">
              First
            </AnchorNavigationItem>
          )}
          <AnchorNavigationItem target={secondRef} key="second">
            Second
          </AnchorNavigationItem>
        </>
      }
    >
      <div ref={firstRef}>
        <h2>First section</h2>
      </div>
      <div ref={secondRef}>
        <h2>Second section</h2>
      </div>
    </AnchorNavigation>
  );

  const { rerender } = render(<Navigation showFirst />);
  rerender(<Navigation showFirst={false} />);

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.click(screen.getByRole("link", { name: "Second" }));
  act(() => {
    jest.advanceTimersByTime(10);
  });

  expect(screen.getByRole("heading", { name: "Second section" })).toHaveFocus();
});

test("selects the correct item when preceding items have no targets", () => {
  const firstRef = React.createRef<HTMLDivElement>();
  const fourthRef = React.createRef<HTMLDivElement>();
  const fifthRef = React.createRef<HTMLDivElement>();

  render(
    <AnchorNavigation
      stickyNavigation={
        <>
          <AnchorNavigationItem target={firstRef}>First</AnchorNavigationItem>
          <AnchorNavigationItem>Second without target</AnchorNavigationItem>
          <AnchorNavigationItem>Third without target</AnchorNavigationItem>
          <AnchorNavigationItem target={fourthRef}>Fourth</AnchorNavigationItem>
          <AnchorNavigationItem target={fifthRef}>Fifth</AnchorNavigationItem>
        </>
      }
    >
      <div ref={firstRef}>First section</div>
      <div ref={fourthRef}>Fourth section</div>
      <div ref={fifthRef}>Fifth section</div>
    </AnchorNavigation>,
  );

  [firstRef, fourthRef, fifthRef].forEach((sectionRef, index) => {
    jest
      .spyOn(sectionRef.current as HTMLDivElement, "getBoundingClientRect")
      .mockReturnValue({ top: 100 + index * 50 } as DOMRect);
  });
  jest
    .spyOn(screen.getByRole("list"), "getBoundingClientRect")
    .mockReturnValue({ top: 200 } as DOMRect);

  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });

  expect(screen.getByRole("link", { name: "Fifth" })).toHaveAttribute(
    "aria-current",
    "location",
  );
});

test("does not change the selected item on scroll when no items have targets", () => {
  render(
    <AnchorNavigation
      stickyNavigation={
        <>
          <AnchorNavigationItem>First</AnchorNavigationItem>
          <AnchorNavigationItem>Second</AnchorNavigationItem>
        </>
      }
    />,
  );

  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });

  expect(screen.getByRole("link", { name: "First" })).toHaveAttribute(
    "aria-current",
    "location",
  );
});

test("does not select or scroll to an item without a target", async () => {
  render(
    <AnchorNavigation
      stickyNavigation={
        <>
          <AnchorNavigationItem>First</AnchorNavigationItem>
          <AnchorNavigationItem>Second</AnchorNavigationItem>
        </>
      }
    />,
  );

  (Element.prototype.scrollIntoView as jest.Mock).mockClear();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.click(screen.getByRole("link", { name: "Second" }));

  expect(screen.getByRole("link", { name: "First" })).toHaveAttribute(
    "aria-current",
    "location",
  );
  expect(screen.getByRole("link", { name: "Second" })).not.toHaveAttribute(
    "aria-current",
  );
  expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
});

test("cleans up event listeners after unmounting", () => {
  const { unmount } = render(<MockComponent />);
  const addEventListenerSpy: jest.SpyInstance = jest.spyOn(
    window,
    "removeEventListener",
  );

  unmount();

  expect(
    addEventListenerSpy.mock.calls.filter((call) => call[0] === "scroll"),
  ).toHaveLength(1);
});

test("supports the compound navigation and content slots", async () => {
  const firstRef = React.createRef<HTMLDivElement>();
  const secondRef = React.createRef<HTMLDivElement>();

  const NavigationItems = () => (
    <>
      <AnchorNavigationItem initiallySelected target={firstRef}>
        First
      </AnchorNavigationItem>
      <AnchorNavigationItem target={secondRef}>Second</AnchorNavigationItem>
    </>
  );

  render(
    <AnchorNavigation aria-label="page sections">
      <AnchorNavigationMenu>
        <NavigationItems />
      </AnchorNavigationMenu>
      <AnchorNavigationContent>
        <div ref={firstRef}>
          <h2>First section</h2>
        </div>
        <div ref={secondRef}>
          <h2>Second section</h2>
        </div>
      </AnchorNavigationContent>
    </AnchorNavigation>,
  );

  expect(
    screen.getByRole("navigation", { name: "page sections" }),
  ).toContainElement(screen.getByRole("list"));
  expect(screen.getByRole("link", { name: "First" })).toHaveAttribute(
    "aria-current",
    "location",
  );

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.click(screen.getByRole("link", { name: "Second" }));
  act(() => {
    jest.advanceTimersByTime(10);
  });

  expect(screen.getByRole("heading", { name: "Second section" })).toHaveFocus();
  expect(screen.getByRole("link", { name: "Second" })).toHaveAttribute(
    "aria-current",
    "location",
  );
});

test("does not re-invoke a callback ref when the selected item changes", async () => {
  const firstRef = React.createRef<HTMLDivElement>();
  const secondRef = React.createRef<HTMLDivElement>();
  const itemRef = jest.fn();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <AnchorNavigation>
      <AnchorNavigationMenu>
        <AnchorNavigationItem initiallySelected target={firstRef}>
          First
        </AnchorNavigationItem>
        <AnchorNavigationItem ref={itemRef} target={secondRef}>
          Second
        </AnchorNavigationItem>
      </AnchorNavigationMenu>
      <AnchorNavigationContent>
        <div ref={firstRef}>
          <h2>First section</h2>
        </div>
        <div ref={secondRef}>
          <h2>Second section</h2>
        </div>
      </AnchorNavigationContent>
    </AnchorNavigation>,
  );

  itemRef.mockClear();
  await user.click(screen.getByRole("link", { name: "Second" }));
  act(() => {
    jest.advanceTimersByTime(10);
  });

  expect(itemRef).not.toHaveBeenCalled();
});

test("selects the first compound item when none is initially selected", () => {
  render(
    <AnchorNavigation>
      <AnchorNavigationMenu>
        <AnchorNavigationItem>First</AnchorNavigationItem>
        <AnchorNavigationItem>Second</AnchorNavigationItem>
      </AnchorNavigationMenu>
      <AnchorNavigationContent />
    </AnchorNavigation>,
  );

  expect(screen.getByRole("link", { name: "First" })).toHaveAttribute(
    "aria-current",
    "location",
  );
});

test("keeps the selected item aligned with focused section content", () => {
  const firstRef = React.createRef<HTMLDivElement>();
  const secondRef = React.createRef<HTMLDivElement>();

  render(
    <AnchorNavigation>
      <AnchorNavigationMenu>
        <AnchorNavigationItem initiallySelected target={firstRef}>
          First
        </AnchorNavigationItem>
        <AnchorNavigationItem target={secondRef}>Second</AnchorNavigationItem>
      </AnchorNavigationMenu>
      <AnchorNavigationContent>
        <div ref={firstRef}>
          <input aria-label="First field" />
        </div>
        <div ref={secondRef}>
          <input aria-label="Second field" />
        </div>
        <input aria-label="Unrelated field" />
      </AnchorNavigationContent>
    </AnchorNavigation>,
  );

  act(() => {
    screen.getByRole("textbox", { name: "Unrelated field" }).focus();
  });
  expect(screen.getByRole("link", { name: "First" })).toHaveAttribute(
    "aria-current",
    "location",
  );

  act(() => {
    screen.getByRole("textbox", { name: "Second field" }).focus();
    window.dispatchEvent(new Event("scroll"));
  });
  expect(screen.getByRole("link", { name: "First" })).not.toHaveAttribute(
    "aria-current",
  );
  expect(screen.getByRole("link", { name: "Second" })).toHaveAttribute(
    "aria-current",
    "location",
  );

  act(() => {
    jest.advanceTimersByTime(150);
  });
});

test("calls item event handlers alongside navigation activation", async () => {
  const firstRef = React.createRef<HTMLDivElement>();
  const secondRef = React.createRef<HTMLDivElement>();
  const onClick = jest.fn((event: React.MouseEvent<HTMLAnchorElement>) => {
    expect(event.defaultPrevented).toBe(false);
  });
  const onKeyDown = jest.fn((event: React.KeyboardEvent<HTMLAnchorElement>) => {
    expect(event.defaultPrevented).toBe(false);
  });
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <AnchorNavigation>
      <AnchorNavigationMenu>
        <AnchorNavigationItem initiallySelected target={firstRef}>
          First
        </AnchorNavigationItem>
        <AnchorNavigationItem
          target={secondRef}
          onClick={onClick}
          onKeyDown={onKeyDown}
        >
          Second
        </AnchorNavigationItem>
      </AnchorNavigationMenu>
      <AnchorNavigationContent>
        <div ref={firstRef}>
          <h2>First section</h2>
        </div>
        <div ref={secondRef}>
          <h2>Second section</h2>
        </div>
      </AnchorNavigationContent>
    </AnchorNavigation>,
  );

  const secondItem = screen.getByRole("link", { name: "Second" });
  await user.click(secondItem);
  act(() => {
    jest.advanceTimersByTime(10);
  });

  expect(onClick).toHaveBeenCalledTimes(1);
  expect(secondItem).toHaveAttribute("aria-current", "location");

  fireEvent.keyDown(secondItem, { key: "Enter" });
  act(() => {
    jest.advanceTimersByTime(10);
  });

  expect(onKeyDown).toHaveBeenCalledTimes(1);
  expect(secondItem).toHaveAttribute("aria-current", "location");
});

test("allows item event handlers to cancel navigation activation", async () => {
  const firstRef = React.createRef<HTMLDivElement>();
  const secondRef = React.createRef<HTMLDivElement>();
  const preventActivation = (event: React.SyntheticEvent) =>
    event.preventDefault();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <AnchorNavigation>
      <AnchorNavigationMenu>
        <AnchorNavigationItem initiallySelected target={firstRef}>
          First
        </AnchorNavigationItem>
        <AnchorNavigationItem
          target={secondRef}
          onClick={preventActivation}
          onKeyDown={preventActivation}
        >
          Second
        </AnchorNavigationItem>
      </AnchorNavigationMenu>
      <AnchorNavigationContent>
        <div ref={firstRef} />
        <div ref={secondRef} />
      </AnchorNavigationContent>
    </AnchorNavigation>,
  );

  const secondItem = screen.getByRole("link", { name: "Second" });
  await user.click(secondItem);
  fireEvent.keyDown(secondItem, { key: "Enter" });
  act(() => {
    jest.advanceTimersByTime(10);
  });

  expect(screen.getByRole("link", { name: "First" })).toHaveAttribute(
    "aria-current",
    "location",
  );
  expect(secondItem).not.toHaveAttribute("aria-current");
});

test("renders a single legacy item without a fragment", () => {
  render(
    <AnchorNavigation
      stickyNavigation={<AnchorNavigationItem>Item</AnchorNavigationItem>}
    />,
  );

  expect(screen.getByRole("link", { name: "Item" })).toHaveAttribute(
    "href",
    "#",
  );
});

test("preserves an explicitly selected legacy item", () => {
  const firstRef = React.createRef<HTMLDivElement>();
  const secondRef = React.createRef<HTMLDivElement>();

  render(
    <AnchorNavigation
      stickyNavigation={
        <>
          <AnchorNavigationItem target={firstRef}>First</AnchorNavigationItem>
          <AnchorNavigationItem initiallySelected target={secondRef}>
            Second
          </AnchorNavigationItem>
        </>
      }
    />,
  );

  expect(screen.getByRole("link", { name: "First" })).not.toHaveAttribute(
    "aria-current",
  );
  expect(screen.getByRole("link", { name: "Second" })).toHaveAttribute(
    "aria-current",
    "location",
  );
});

test.each([
  ["text", "Invalid"],
  ["an element other than AnchorNavigationItem", <p>Invalid</p>],
])("rejects legacy stickyNavigation containing %s", (_description, child) => {
  const consoleError = jest
    .spyOn(global.console, "error")
    .mockImplementation(() => undefined);

  expect(() => {
    render(<AnchorNavigation stickyNavigation={child} />);
  }).toThrow(
    "`stickyNavigation` must contain only AnchorNavigationItem components.",
  );

  consoleError.mockRestore();
});

test("uses item props when rendered outside AnchorNavigation", async () => {
  const onClick = jest.fn();
  const onKeyDown = jest.fn();
  const setRef = jest.fn();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <AnchorNavigationItem
      ref={setRef}
      href="#section"
      isSelected
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      Item
    </AnchorNavigationItem>,
  );

  const item = screen.getByRole("link", { name: "Item" });
  expect(item).toHaveAttribute("aria-current", "location");
  expect(setRef).toHaveBeenCalledWith(item);

  await user.click(item);
  expect(onClick).toHaveBeenCalledTimes(1);

  item.focus();
  await user.keyboard("{Enter}");
  expect(onKeyDown).toHaveBeenCalledTimes(1);
});

test("forwards an object ref when rendered outside AnchorNavigation", () => {
  const ref = React.createRef<HTMLAnchorElement>();

  render(<AnchorNavigationItem ref={ref}>Item</AnchorNavigationItem>);

  expect(ref.current).toHaveTextContent("Item");
});

test("does not allow the deprecated and compound composition APIs together", () => {
  const ref = React.createRef<HTMLDivElement>();
  const consoleError = jest
    .spyOn(global.console, "error")
    .mockImplementation(() => undefined);

  expect(() => {
    render(
      <AnchorNavigation
        stickyNavigation={
          <AnchorNavigationItem target={ref}>Legacy</AnchorNavigationItem>
        }
      >
        <AnchorNavigationMenu>
          <AnchorNavigationItem target={ref}>Compound</AnchorNavigationItem>
        </AnchorNavigationMenu>
      </AnchorNavigation>,
    );
  }).toThrow(
    "`stickyNavigation` cannot be used with `AnchorNavigationMenu`. Use one composition API at a time.",
  );

  consoleError.mockRestore();
});

test("renders not selected navigation item with proper background when hovered", async () => {
  render(<MockComponent />);

  const unselectedItem = getNavItem("Second");
  expect(unselectedItem).toHaveStyleRule(
    "background-color",
    "var(--tab-bg-hover)",
    { modifier: "& a:hover" },
  );
  expect(unselectedItem).toHaveStyleRule(
    "border-inline-start-color",
    "var(--tab-border-hover)",
    { modifier: "& a:hover" },
  );
  expect(unselectedItem).toHaveStyleRule("color", "var(--tab-label-hover)", {
    modifier: "& a:hover",
  });
});

test("renders default navigation item with proper background and label colors", () => {
  render(<MockComponent />);

  const defaultItem = getNavItem("Second");
  expect(defaultItem).toHaveStyleRule(
    "background-color",
    "var(--tab-bg-default)",
    { modifier: "& a" },
  );
  expect(defaultItem).toHaveStyleRule("color", "var(--tab-label-default)", {
    modifier: "& a",
  });
});

test("keeps selected navigation item active styling when hovered", async () => {
  render(<MockComponent />);

  const selectedItem = getNavItem("First");
  expect(selectedItem).not.toHaveStyleRule(
    "background-color",
    "var(--tab-bg-hover)",
    { modifier: "& a:hover" },
  );
  expect(selectedItem).not.toHaveStyleRule("color", "var(--tab-label-hover)", {
    modifier: "& a:hover",
  });
  expect(selectedItem).toHaveStyleRule(
    "background-color",
    "var(--tab-bg-active)",
    { modifier: "& a" },
  );
});

test("renders navigation item with proper focus styling", () => {
  render(<MockComponent />);

  const defaultItem = getNavItem("Second");
  expect(defaultItem).toHaveStyleRule(
    "box-shadow",
    "var(--focus-shadow-default)",
    { modifier: "& a:focus" },
  );
  expect(defaultItem).toHaveStyleRule("outline", "transparent 3px solid", {
    modifier: "& a:focus",
  });
  expect(defaultItem).toHaveStyleRule("z-index", "1", {
    modifier: "& a:focus",
  });
});

test("has the expected active item indicator styling", () => {
  render(<MockComponent />);

  const selectedItem = getNavItem("First");
  expect(selectedItem).toHaveStyleRule("min-height", "var(--global-size-m)", {
    modifier: "& a",
  });
  expect(selectedItem).toHaveStyleRule(
    "border-inline-start",
    "var(--anchor-navigation-item-border-width) solid var(--tab-border-default)",
    { modifier: "& a" },
  );
  expect(selectedItem).toHaveStyleRule(
    "border-inline-start-color",
    "var(--tab-border-active-alt)",
    { modifier: "& a" },
  );
  expect(selectedItem).toHaveStyleRule(
    "background-color",
    "var(--tab-border-active)",
    {
      modifier: '& a [data-element="anchor-navigation-item-indicator"]',
    },
  );
  expect(selectedItem).toHaveStyleRule("width", "var(--global-size-5-xs)", {
    modifier: '& a [data-element="anchor-navigation-item-indicator"]',
  });

  const indicator = within(selectedItem).getByTestId(
    "anchor-navigation-item-indicator",
  );
  expect(indicator).toHaveAttribute("aria-hidden", "true");
  expect(indicator).not.toHaveAttribute("tabindex");

  expect(selectedItem).toHaveStyleRule("color", "var(--tab-label-active)", {
    modifier: "& a",
  });
});
