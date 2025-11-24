import React, { useRef } from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Textbox from "../textbox";
import {
  AnchorNavigation,
  AnchorNavigationItem,
  AnchorSectionDivider,
} from ".";

const MockComponent = () => {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);

  return (
    <AnchorNavigation
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

test("has proper data attributes applied to elements", () => {
  render(<MockComponent />);
  expect(screen.getByTestId("test-component")).toHaveAttribute(
    "data-component",
    "anchor-navigation",
  );
  expect(screen.getByRole("list")).toHaveAttribute(
    "data-element",
    "anchor-sticky-navigation",
  );

  const anchorNavigationLinks = screen.getAllByRole("link");
  anchorNavigationLinks.forEach((anchor) => {
    expect(anchor).toHaveAttribute("data-element", "anchor-navigation-item");
  });
});

test("when navigation item is clicked, the item is selected and the section container is focused", async () => {
  render(<MockComponent />);

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  await user.click(screen.getByRole("link", { name: "Second" }));

  act(() => {
    jest.advanceTimersByTime(10);
  });
  // toHaveStyle still passes even with incorrect styles when used with CSS variables
  // (see https://github.com/testing-library/jest-dom/issues/461 - the variables seem to be
  // treated by js-dom as "invalid values" as explained in the first reply) - so using toHaveStyleRule instead
  const selectedItem = screen.getAllByRole("listitem")[1];
  expect(selectedItem).toHaveStyleRule(
    "background-color",
    "var(--colorsActionMajorYang100)",
    { modifier: "& a" },
  );
  expect(selectedItem).toHaveStyleRule(
    "border-left-color",
    "var(--colorsActionMajor500)",
    { modifier: "& a" },
  );
  expect(screen.getByTestId("section-2")).toHaveFocus();
});

test("when Enter is pressed on a navigation item, the item is selected and the section container is focused", async () => {
  render(<MockComponent />);

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  screen.getByRole("link", { name: "Second" }).focus();
  await user.keyboard("{Enter}");

  act(() => {
    jest.advanceTimersByTime(10);
  });

  const selectedItem = screen.getAllByRole("listitem")[1];
  expect(selectedItem).toHaveStyleRule(
    "background-color",
    "var(--colorsActionMajorYang100)",
    { modifier: "& a" },
  );
  expect(selectedItem).toHaveStyleRule(
    "border-left-color",
    "var(--colorsActionMajor500)",
    { modifier: "& a" },
  );
  expect(screen.getByTestId("section-2")).toHaveFocus();
});

test("does not alter the tabindex of the container if it was already focusable", async () => {
  render(<MockComponent />);

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  screen.getByRole("link", { name: "First" }).focus();
  await user.keyboard("{Enter}");
  act(() => {
    jest.advanceTimersByTime(10);
  });

  expect(screen.getByTestId("section-1")).toHaveAttribute("tabindex", "0");
});

test("does nothing if a key other than tab or enter is pressed", async () => {
  render(<MockComponent />);

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  screen.getByRole("link", { name: "First" }).focus();
  await user.keyboard("{ArrowRight}");
  act(() => {
    jest.advanceTimersByTime(10);
  });

  const originallySelectedItem = screen.getAllByRole("listitem")[0];
  expect(originallySelectedItem).toHaveStyleRule(
    "background-color",
    "var(--colorsActionMajorYang100)",
    { modifier: "& a" },
  );
  expect(originallySelectedItem).toHaveStyleRule(
    "border-left-color",
    "var(--colorsActionMajor500)",
    { modifier: "& a" },
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

    const selectedItem = screen.getAllByRole("listitem")[selectedAnchorIndex];
    expect(selectedItem).toHaveStyleRule(
      "background-color",
      "var(--colorsActionMajorYang100)",
      { modifier: "& a" },
    );
    expect(selectedItem).toHaveStyleRule(
      "border-left-color",
      "var(--colorsActionMajor500)",
      { modifier: "& a" },
    );
  },
);

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

  expect(screen.getAllByRole("listitem")[1]).toHaveStyleRule(
    "background-color",
    "var(--colorsActionMinor100)",
    { modifier: "& a:hover" },
  );
});

test("renders selected navigation item with proper background when hovered", async () => {
  render(<MockComponent />);

  expect(screen.getAllByRole("listitem")[0]).not.toHaveStyleRule(
    "background-color",
    undefined,
    {
      modifier: "& a:hover",
    },
  );
});

test("has the expected border radius styling on the navigation items", () => {
  render(<MockComponent />);

  const anchorNavigationItems = screen.getAllByRole("listitem");
  anchorNavigationItems.forEach((item) => {
    expect(item).toHaveStyleRule(
      "border-top-right-radius",
      "var(--borderRadius100)",
      { modifier: "& a" },
    );
    expect(item).toHaveStyleRule(
      "border-bottom-right-radius",
      "var(--borderRadius100)",
      { modifier: "& a" },
    );
  });
});
