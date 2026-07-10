import React, { useRef } from "react";
import { render, screen, act, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Textbox from "../textbox";
import {
  AnchorNavigation,
  AnchorNavigationItem,
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
    { modifier: "& a::before" },
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
    { modifier: "& a::before" },
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
    { modifier: "& a::before" },
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
      { modifier: "& a::before" },
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

describe("validates incorrect stickyNavigation prop content", () => {
  let mockGlobal: jest.SpyInstance;

  beforeEach(() => {
    mockGlobal = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => undefined);
  });

  afterEach(() => {
    mockGlobal.mockReset();
  });

  test("items that are not AnchorNavigationItems", () => {
    const error = `\`stickyNavigation\` prop in \`AnchorNavigation\` should be a React Fragment that only contains children of type \`${AnchorNavigationItem.displayName}\``;

    expect(() => {
      render(
        <AnchorNavigation
          stickyNavigation={
            <>
              <p>Invalid children</p>
            </>
          }
        />,
      );
    }).toThrow(error);
  });

  test("container that is not a React Fragment", () => {
    const error =
      "`stickyNavigation` prop in `AnchorNavigation` should be a React Fragment.";

    expect(() => {
      render(
        <AnchorNavigation
          stickyNavigation={
            <div>
              <AnchorNavigationItem>First</AnchorNavigationItem>
            </div>
          }
        />,
      );
    }).toThrow(error);
  });
});

test("renders not selected navigation item with proper background when hovered", async () => {
  render(<MockComponent />);

  const unselectedItem = getNavItem("Second");
  expect(unselectedItem).toHaveStyleRule(
    "background-color",
    "var(--tab-bg-hover)",
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

test("has the expected active item indicator and minimum height styling", () => {
  render(<MockComponent />);

  const selectedItem = getNavItem("First");
  expect(selectedItem).toHaveStyleRule("min-height", "var(--global-size-m)", {
    modifier: "& a",
  });
  expect(selectedItem).toHaveStyleRule(
    "border-left",
    "var(--global-size-6-xs) solid var(--tab-border-active-alt)",
    { modifier: "& a" },
  );
  expect(selectedItem).toHaveStyleRule("top", "var(--global-space-comp-s)", {
    modifier: "& a::before",
  });
  expect(selectedItem).toHaveStyleRule("bottom", "var(--global-space-comp-s)", {
    modifier: "& a::before",
  });
  expect(selectedItem).toHaveStyleRule("width", "var(--global-size-5-xs)", {
    modifier: "& a::before",
  });
  expect(selectedItem).toHaveStyleRule("color", "var(--tab-label-active)", {
    modifier: "& a",
  });
});
