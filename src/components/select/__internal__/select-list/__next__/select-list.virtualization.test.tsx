import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Virtualizer } from "@tanstack/react-virtual";
import SelectList, { NextSelectListProps } from "./select-list.component";
import Option from "../../../option";
import OptionGroupHeader from "../../../option-group-header";

let mockVirtualizerOptions: {
  count?: number;
  getScrollElement?: () => Element | null;
  estimateSize?: () => number;
  getItemKey?: (index: number) => React.Key;
  measureElement?: (
    element: HTMLElement,
    entry: ResizeObserverEntry | undefined,
    instance: Virtualizer<HTMLElement, HTMLElement>,
  ) => number;
  rangeExtractor?: (range: {
    startIndex: number;
    endIndex: number;
    overscan: number;
    count: number;
  }) => number[];
} = {};
const mockMeasureElement = jest.fn();
const mockMeasureVirtualItems = jest.fn();
const mockGetOffsetForIndex = jest.fn((index: number) => [index * 40, "start"]);
const mockScrollToOffset = jest.fn();
let mockVirtualIndexes: number[] | undefined;

jest.mock("@tanstack/react-virtual", () => {
  const actual = jest.requireActual("@tanstack/react-virtual");

  return {
    ...actual,
    useVirtualizer: (options: typeof mockVirtualizerOptions) => {
      mockVirtualizerOptions = options;
      return {
        getVirtualItems: () => {
          const count = options.count ?? 0;
          const indexes = count
            ? (options.rangeExtractor?.({
                startIndex: 0,
                endIndex: 0,
                overscan: 0,
                count,
              }) ?? [0])
            : [];

          return (mockVirtualIndexes ?? indexes).map((index) => ({
            index,
            key: options.getItemKey?.(index) ?? index,
            start: index * 40,
          }));
        },
        getTotalSize: () => 480,
        measureElement: mockMeasureElement,
        measure: mockMeasureVirtualItems,
        getOffsetForIndex: mockGetOffsetForIndex,
        scrollToOffset: mockScrollToOffset,
      };
    },
  };
});

const options = (count = 15, disabled: number[] = []) =>
  Array.from({ length: count }, (_, index) => (
    <Option
      key={index}
      id={`item-${index}`}
      text={`Item ${index}`}
      value={String(index)}
      disabled={disabled.includes(index)}
    />
  ));
const list = (props: Partial<NextSelectListProps> = {}) => (
  <SelectList
    open
    enableVirtualScroll
    onSelect={() => {}}
    onClose={() => {}}
    popoverControl={(ref, controlProps) => (
      <input aria-label="Select" ref={ref} {...controlProps} />
    )}
    {...props}
  >
    {props.children ?? options()}
  </SelectList>
);

beforeEach(() => {
  jest.clearAllMocks();
  mockGetOffsetForIndex.mockImplementation((index: number) => [
    index * 40,
    "start",
  ]);
  mockVirtualIndexes = undefined;
});

test("renders a window of options with complete-set positions and scroll layout", () => {
  render(list({ selectedValue: "7", virtualScrollOverscan: 2 }));
  expect(screen.getAllByRole("option")).toHaveLength(2);
  expect(screen.getByRole("option", { name: "Item 7" })).toHaveAttribute(
    "aria-setsize",
    "15",
  );
  expect(screen.getByRole("option", { name: "Item 7" })).toHaveAttribute(
    "aria-posinset",
    "8",
  );
  expect(screen.getByRole("combobox")).toHaveAttribute(
    "aria-activedescendant",
    "item-7",
  );
  expect(screen.getByRole("listbox")).toHaveStyle({
    position: "relative",
    height: "480px",
  });
  expect(screen.getByTestId("virtual-scroll-spacer")).toHaveStyle({
    height: "480px",
  });
  expect(mockGetOffsetForIndex).toHaveBeenCalledWith(7, "center");
  expect(mockScrollToOffset).toHaveBeenCalledWith(280);
  expect(mockVirtualizerOptions.getScrollElement?.()).toBe(
    screen.getByRole("listbox"),
  );
});

test.each([
  ["{ArrowDown}", "item-0"],
  ["{ArrowUp}", "item-14"],
  ["{End}", "item-14"],
  ["{Home}", "item-0"],
  ["{PageDown}", "item-10"],
  ["{PageUp}", "item-4"],
  ["{Home}{ArrowUp}", "item-14"],
  ["{End}{ArrowDown}", "item-0"],
  ["{End}{PageDown}", "item-14"],
  ["{Home}{PageUp}", "item-0"],
  ["{ArrowDown}{ArrowDown}{ArrowUp}", "item-0"],
])("navigates the full option data with %s", async (keys, expected) => {
  const user = userEvent.setup();
  render(list());
  const input = screen.getByRole("combobox");
  input.focus();
  await user.keyboard(keys);
  expect(input).toHaveAttribute("aria-activedescendant", expected);
  expect(
    screen.getByRole("option", { name: `Item ${expected.slice(5)}` }),
  ).toHaveAttribute("data-has-focus", "true");
});

test.each(["{Enter}", " ", "{Tab}"])(
  "confirms an option outside the initial window using %s",
  async (key) => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    const onClose = jest.fn();
    render(list({ onSelect, onClose, selectOnSpaceAndTab: true }));
    screen.getByRole("combobox").focus();
    await user.keyboard("{End}");
    await user.keyboard(key);
    expect(onSelect).toHaveBeenCalledWith({
      id: "item-14",
      text: "Item 14",
      value: "14",
    });
    expect(onClose).toHaveBeenCalled();
  },
);

test("skips disabled options for arrows and page navigation", async () => {
  const user = userEvent.setup();
  render(list({ children: options(15, [0, 2]) }));
  const input = screen.getByRole("combobox");
  input.focus();
  await user.keyboard("{ArrowDown}");
  expect(input).toHaveAttribute("aria-activedescendant", "item-1");
  await user.keyboard("{ArrowDown}");
  expect(input).toHaveAttribute("aria-activedescendant", "item-3");
  await user.keyboard("{PageDown}");
  expect(input).toHaveAttribute("aria-activedescendant", "item-13");
});

test("does not activate a disabled selected option", () => {
  render(list({ children: options(3, [1]), selectedValue: "1" }));
  expect(screen.getByRole("combobox")).not.toHaveAttribute(
    "aria-activedescendant",
  );
});

test.each([true, false])(
  "Tab closes without selection when no option is active (confirm=%s)",
  async (selectOnSpaceAndTab) => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    const onClose = jest.fn();
    render(list({ selectOnSpaceAndTab, onSelect, onClose }));
    screen.getByRole("combobox").focus();
    await user.keyboard("{Tab}");
    expect(onSelect).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  },
);

test("Tab closes an entirely disabled list", () => {
  const onClose = jest.fn();
  render(list({ onClose, children: options(2, [0, 1]) }));
  screen.getByRole("combobox").focus();
  fireEvent.keyDown(screen.getByRole("combobox"), { key: "Tab" });
  expect(onClose).toHaveBeenCalled();
});

test.each([true, false])(
  "updates selection and preserves focus when loading or appending (virtual=%s)",
  async (enableVirtualScroll) => {
    const user = userEvent.setup();
    const { rerender } = render(
      list({ enableVirtualScroll, selectedValue: "1" }),
    );
    const input = screen.getByRole("combobox");
    input.focus();
    await user.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-activedescendant", "item-2");
    rerender(
      list({ enableVirtualScroll, selectedValue: "1", isLoading: true }),
    );
    expect(input).toHaveAttribute("aria-activedescendant", "item-2");
    rerender(
      list({ enableVirtualScroll, selectedValue: "1", children: options(20) }),
    );
    expect(input).toHaveAttribute("aria-activedescendant", "item-2");
    rerender(list({ enableVirtualScroll, selectedValue: "12" }));
    expect(input).toHaveAttribute("aria-activedescendant", "item-12");
  },
);

test.each(["disabled", "removed"])(
  "clears focus when the active option is %s",
  async (update) => {
    const user = userEvent.setup();
    const { rerender } = render(list());
    const input = screen.getByRole("combobox");
    input.focus();
    await user.keyboard("{End}");
    rerender(
      list({
        children: update === "disabled" ? options(15, [14]) : options(14),
      }),
    );
    expect(input).not.toHaveAttribute("aria-activedescendant");
  },
);

test("preserves active keys and generated IDs across reorder", async () => {
  const user = userEvent.setup();
  const children = [
    <Option key="alpha" text="Alpha" value="a" />,
    <Option key="beta" text="Beta" value="b" />,
  ];
  const { rerender } = render(list({ children }));
  const alpha = screen.getByRole("option", { name: "Alpha" });
  const key = mockVirtualizerOptions.getItemKey?.(0);
  screen.getByRole("combobox").focus();
  await user.keyboard("{ArrowDown}");
  rerender(list({ children: [...children].reverse() }));
  expect(mockVirtualizerOptions.getItemKey?.(1)).toBe(key);
  expect(screen.getByRole("option", { name: "Alpha" })).toBe(alpha);
  expect(screen.getByRole("combobox")).toHaveAttribute(
    "aria-activedescendant",
    alpha.id,
  );
});

test("normalizes nested arrays and fragments into distinct rows", () => {
  render(
    list({
      selectedValue: "b",
      children: [
        [<Option key="colour" text="Alpha" value="a" />],
        <React.Fragment key="fragment">
          <Option key="colour" text="Beta" value="b" />
        </React.Fragment>,
      ],
    }),
  );
  const ids = screen.getAllByRole("option").map((option) => option.id);
  expect(new Set(ids).size).toBe(2);
  expect(screen.getByRole("combobox")).toHaveAttribute(
    "aria-activedescendant",
    screen.getByRole("option", { name: "Beta" }).id,
  );
});

test("renders and measures groups and dividers with one option per virtual row", async () => {
  const user = userEvent.setup();
  render(
    list({
      children: [
        <Option key="a" text="Alpha" value="a" divider />,
        <OptionGroupHeader key="header" label="Colours" />,
        <Option key="b" text="Beta" value="b" divider />,
        <Option key="c" text="Gamma" value="c" />,
      ],
    }),
  );
  screen.getByRole("combobox").focus();
  await user.keyboard("{End}");
  const gamma = screen.getByRole("option", { name: "Gamma" });
  expect(screen.getByRole("group", { name: "Colours" })).toContainElement(
    gamma,
  );
  expect(gamma).toHaveAttribute("aria-setsize", "3");
  expect(gamma).toHaveAttribute("aria-posinset", "3");
  expect(gamma).toHaveAttribute("aria-describedby");
  expect(mockMeasureElement).toHaveBeenCalled();
  await user.keyboard("{ArrowUp}");
  expect(screen.getAllByTestId("divider")).toHaveLength(2);
});

test("preserves option styles while applying virtual positioning", () => {
  render(
    list({
      children: (
        <Option
          text="Styled"
          value="styled"
          style={{
            color: "red",
            position: "relative",
            top: 12,
            transform: "scale(2)",
          }}
        />
      ),
    }),
  );
  expect(screen.getByRole("option")).toHaveStyle({
    color: "rgb(255, 0, 0)",
    position: "absolute",
    top: "0px",
    transform: "translateY(0px)",
  });
});

test("excludes the loading row from the accessible option count and navigation", async () => {
  const user = userEvent.setup();
  render(list({ children: options(2), isLoading: true }));
  screen.getByRole("combobox").focus();
  await user.keyboard("{End}");
  expect(screen.getByRole("combobox")).toHaveAttribute(
    "aria-activedescendant",
    "item-1",
  );
  expect(screen.getByRole("option", { name: "Item 1" })).toHaveAttribute(
    "aria-setsize",
    "2",
  );
});

test("renders the loading row when it is in the virtual window", () => {
  mockVirtualIndexes = [2];
  render(list({ children: options(2), isLoading: true }));

  expect(screen.getByTestId("select-list-loader")).toBeVisible();
});

test("clears measurements and active focus on close, then restores selection on reopen", async () => {
  const user = userEvent.setup();
  const { rerender } = render(list({ selectedValue: "3" }));
  screen.getByRole("combobox").focus();
  await user.keyboard("{End}");
  rerender(list({ open: false, selectedValue: "3" }));
  expect(mockMeasureVirtualItems).toHaveBeenCalledTimes(1);
  expect(mockVirtualizerOptions.getScrollElement?.()).toBeNull();
  expect(screen.getByRole("combobox")).not.toHaveAttribute(
    "aria-activedescendant",
  );
  rerender(list({ selectedValue: "3" }));
  expect(screen.getByRole("combobox")).toHaveAttribute(
    "aria-activedescendant",
    "item-3",
  );
});

test("uses settled ResizeObserver measurements and cached sizes before layout", () => {
  render(list());
  const element = screen.getByRole("option");
  const instance = {
    getVirtualItems: () => [{ index: 0, size: 48 }],
    options: { horizontal: false },
  } as unknown as Virtualizer<HTMLElement, HTMLElement>;
  const entry = {
    borderBoxSize: [{ blockSize: 56 }],
  } as unknown as ResizeObserverEntry;
  expect(
    mockVirtualizerOptions.measureElement?.(element, entry, instance),
  ).toBe(56);
  expect(
    mockVirtualizerOptions.measureElement?.(element, undefined, instance),
  ).toBe(48);
  element.setAttribute("data-index", "999");
  expect(
    mockVirtualizerOptions.measureElement?.(element, undefined, instance),
  ).toBe(40);
});

test("supersedes pending scrolls on navigation and cancels them on unmount", () => {
  const frames = new Map<number, FrameRequestCallback>();
  let frameId = 0;
  const requestFrame = jest
    .spyOn(window, "requestAnimationFrame")
    .mockImplementation((callback: FrameRequestCallback) => {
      frameId += 1;
      frames.set(frameId, callback);
      return frameId;
    });
  const cancelFrame = jest
    .spyOn(window, "cancelAnimationFrame")
    .mockImplementation((id: number) => {
      frames.delete(id);
    });
  const runFrame = () =>
    act(() => {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach((callback) => callback(0));
    });
  try {
    const { unmount } = render(list());
    const input = screen.getByRole("combobox");
    input.focus();
    fireEvent.keyDown(input, { key: "End" });
    fireEvent.keyDown(input, { key: "Home" });
    mockScrollToOffset.mockClear();
    runFrame();
    expect(mockScrollToOffset).toHaveBeenCalledWith(0);
    expect(
      mockScrollToOffset.mock.calls.every(([offset]) => offset === 0),
    ).toBe(true);
    fireEvent.keyDown(input, { key: "End" });
    unmount();
    mockScrollToOffset.mockClear();
    runFrame();
    expect(mockScrollToOffset).not.toHaveBeenCalled();
  } finally {
    requestFrame.mockRestore();
    cancelFrame.mockRestore();
  }
});

test("stops pending scrolling when an offset cannot be resolved", () => {
  const frames = new Map<number, FrameRequestCallback>();
  let frameId = 0;
  const requestFrame = jest
    .spyOn(window, "requestAnimationFrame")
    .mockImplementation((callback: FrameRequestCallback) => {
      frameId += 1;
      frames.set(frameId, callback);
      return frameId;
    });

  try {
    render(list({ selectedValue: "0" }));
    mockGetOffsetForIndex.mockReturnValue(undefined as never);
    mockScrollToOffset.mockClear();
    act(() => frames.forEach((callback) => callback(0)));

    expect(mockScrollToOffset).not.toHaveBeenCalled();
  } finally {
    requestFrame.mockRestore();
  }
});

test("does not start scrolling when an option offset is unavailable", () => {
  render(list());
  const input = screen.getByRole("combobox");
  input.focus();
  mockGetOffsetForIndex.mockReturnValue(undefined as never);
  mockScrollToOffset.mockClear();

  fireEvent.keyDown(input, { key: "End" });

  expect(mockScrollToOffset).not.toHaveBeenCalled();
});

test("retries scrolling while the list position is still settling", () => {
  const frames = new Map<number, FrameRequestCallback>();
  let frameId = 0;
  const requestFrame = jest
    .spyOn(window, "requestAnimationFrame")
    .mockImplementation((callback: FrameRequestCallback) => {
      frameId += 1;
      frames.set(frameId, callback);
      return frameId;
    });

  try {
    render(list({ selectedValue: "1" }));
    mockScrollToOffset.mockClear();
    act(() => frames.forEach((callback) => callback(0)));

    expect(mockScrollToOffset).toHaveBeenCalledWith(40);
  } finally {
    requestFrame.mockRestore();
  }
});

test("does not confirm an active option on Space unless configured", async () => {
  const user = userEvent.setup();
  const onSelect = jest.fn();
  render(list({ onSelect }));

  screen.getByRole("combobox").focus();
  await user.keyboard("{End} ");

  expect(onSelect).not.toHaveBeenCalled();
});

test.each([
  ["{ArrowUp}", "item-2"],
  ["{PageUp}", "item-0"],
])(
  "uses the selected option as the %s navigation base",
  async (key, expectedId) => {
    const user = userEvent.setup();
    render(list({ selectedValue: "3" }));

    screen.getByRole("combobox").focus();
    await user.keyboard(key);

    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-activedescendant",
      expectedId,
    );
  },
);
