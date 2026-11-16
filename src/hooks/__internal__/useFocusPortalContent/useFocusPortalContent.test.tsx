import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useFocusPortalContent, {
  nextElementToFocus,
} from "./useFocusPortalContent";

const MockComponent = ({ cb }: { cb: () => void }) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [target, setTarget] = useState<HTMLButtonElement | null>(null);

  const callback = () => {
    cb();
  };

  useFocusPortalContent({ current: container }, { current: target }, callback);

  return (
    <div>
      <button type="button">Before target</button>
      <button ref={setTarget} type="button">
        Target
      </button>
      <div ref={setContainer} data-role="menu">
        <button type="button">First</button>
        <button type="button">Middle</button>
        <button type="button">Last</button>
      </div>
      <button type="button">After target</button>
    </div>
  );
};

const mockCb = jest.fn();

afterEach(() => {
  mockCb.mockClear();
});

test("should focus the first element in the container when the target element is focused and the user presses tab key", async () => {
  render(<MockComponent cb={mockCb} />);

  const target = screen.getByText("Target");
  const first = screen.getByText("First");
  const afterTarget = screen.getByText("After target");

  target.focus();
  await userEvent.tab();
  expect(afterTarget).not.toHaveFocus();
  expect(first).toHaveFocus();
});

test("should focus the element after the target when the last element in the container is focused and the user presses tab key", async () => {
  render(<MockComponent cb={mockCb} />);

  const target = screen.getByText("Target");
  const last = screen.getByText("Last");
  const afterTarget = screen.getByText("After target");

  last.focus();
  await userEvent.tab();
  expect(target).not.toHaveFocus();
  expect(afterTarget).toHaveFocus();
});

test("should focus the target element when the first element in the container is focused and the user presses shift + tab keys", async () => {
  render(<MockComponent cb={mockCb} />);

  const target = screen.getByText("Target");
  const first = screen.getByText("First");
  const afterTarget = screen.getByText("After target");

  first.focus();
  await userEvent.tab({ shift: true });
  expect(afterTarget).not.toHaveFocus();
  expect(target).toHaveFocus();
});

test("should focus the elements within the container when the last element in the container is focused and the user presses shift + tab keys", async () => {
  render(<MockComponent cb={mockCb} />);

  const last = screen.getByText("Last");
  const middle = screen.getByText("Middle");
  const first = screen.getByText("First");

  last.focus();
  await userEvent.tab({ shift: true });
  expect(middle).toHaveFocus();
  await userEvent.tab({ shift: true });
  expect(first).toHaveFocus();
});

test("should focus the element before the target when it is focused and the user presses shift + tab keys", async () => {
  render(<MockComponent cb={mockCb} />);

  const target = screen.getByText("Target");
  const beforeTarget = screen.getByText("Before target");

  target.focus();
  await userEvent.tab({ shift: true });
  expect(beforeTarget).toHaveFocus();
});

test("finds the next control when an open menu temporarily removes its trigger from Tab order", () => {
  render(<MockComponent cb={mockCb} />);
  const target = screen.getByText("Target");
  target.tabIndex = -1;
  const container = screen.getByTestId("menu");

  expect(nextElementToFocus(target, container)).toBe(
    screen.getByText("After target"),
  );
});

test.each([
  ["negative tab index", <button tabIndex={-1}>Skipped</button>],
  [
    "disabled fieldset",
    <fieldset disabled>
      <button>Skipped</button>
    </fieldset>,
  ],
  [
    "hidden ancestor",
    <div hidden>
      <button>Skipped</button>
    </div>,
  ],
  [
    "inert ancestor",
    <div {...{ inert: "" }}>
      <button>Skipped</button>
    </div>,
  ],
  [
    "hidden visibility",
    <button style={{ visibility: "hidden" }}>Skipped</button>,
  ],
  [
    "collapsed visibility",
    <button style={{ visibility: "collapse" }}>Skipped</button>,
  ],
  [
    "display none ancestor",
    <div style={{ display: "none" }}>
      <button>Skipped</button>
    </div>,
  ],
  ["focus guard", <button data-focus-guard>Skipped</button>],
])(
  "skips a control with %s when resolving the next Tab stop",
  (_name, control) => {
    render(
      <>
        <button>Target</button>
        <div data-role="menu">
          <button>Menu item</button>
        </div>
        {control}
        <button>After target</button>
      </>,
    );

    expect(
      nextElementToFocus(
        screen.getByText("Target"),
        screen.getByTestId("menu"),
      ),
    ).toBe(screen.getByText("After target"));
  },
);

test("excludes submenu portals outside the main menu from the next Tab stop", () => {
  render(
    <>
      <button>Target</button>
      <div data-role="menu">
        <button>Menu item</button>
      </div>
      <div data-role="submenu">
        <button>Submenu item</button>
      </div>
      <button>After target</button>
    </>,
  );

  expect(
    nextElementToFocus(screen.getByText("Target"), screen.getByTestId("menu"), [
      screen.getByTestId("submenu"),
    ]),
  ).toBe(screen.getByText("After target"));
});
