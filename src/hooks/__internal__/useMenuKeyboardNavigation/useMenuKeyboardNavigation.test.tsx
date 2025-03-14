import React, { useRef, useCallback } from "react";
import { screen, fireEvent, createEvent } from "@testing-library/react";
import { render } from "../../../__spec_helper__/__internal__/test-utils";

import useMenuKeyboardNavigation from ".";

const containerID = "buttons-container";
const mainButtonID = "main-button";
const childButtonID = "child-button";
const nextDOMElementID = "next-DOM-element";

interface MockComponentProps {
  hideCb: () => void;
}

jest.useFakeTimers();

const MockComponent = ({ hideCb }: MockComponentProps) => {
  const mainRef = useRef<HTMLButtonElement>(null);
  const refs = [
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
  ];
  const children = refs.map((ref, index) => {
    const childID = `${childButtonID}-${String(index)}`;
    return (
      <button ref={ref} key={childID} type="button">
        {childID}
      </button>
    );
  });

  const getButtonChildren = useCallback(
    () =>
      // DOM query is part of the mock component's implementation, and is not used by tests to find elements.
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelectorAll<HTMLButtonElement>(
        `[data-role="${containerID}"] button`,
      ),
    [],
  );

  const handleKeyDown = useMenuKeyboardNavigation(
    mainRef,
    getButtonChildren,
    hideCb,
    true,
  );

  return (
    <>
      <button type="button" ref={mainRef} data-role={mainButtonID}>
        Main Button
      </button>
      <button type="button" data-role={nextDOMElementID}>
        Next Element in DOM
      </button>
      <div
        data-role={containerID}
        role="presentation"
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </>
  );
};
describe("useMenuKeyboardNavigation", () => {
  it.each([
    ["End", "End", ""],
    ["Ctrl + ArrowDown", "ArrowDown", "ctrlKey"],
    ["Meta + ArrowDown", "ArrowDown", "metaKey"],
  ])("focuses the last child button when %s is pressed", (_, key, modifier) => {
    const hideCb = jest.fn();
    render(<MockComponent hideCb={hideCb} />);

    fireEvent.keyDown(screen.getByTestId(containerID), {
      key,
      ctrlKey: modifier === "ctrlKey",
      metaKey: modifier === "metaKey",
    });
    expect(screen.getByText(`${childButtonID}-2`)).toHaveFocus();
  });

  it.each([
    ["Home", "Home", ""],
    ["Ctrl + ArrowUp", "ArrowUp", "ctrlKey"],
    ["Meta + ArrowUp", "ArrowUp", "metaKey"],
  ])(
    "focuses the first child button when %s is pressed",
    (_, key, modifier) => {
      const hideCb = jest.fn();
      render(<MockComponent hideCb={hideCb} />);

      fireEvent.keyDown(screen.getByTestId(containerID), {
        key,
        ctrlKey: modifier === "ctrlKey",
        metaKey: modifier === "metaKey",
      });
      expect(screen.getByText(`${childButtonID}-0`)).toHaveFocus();
    },
  );

  it("pressing ArrowDown key focuses the next child in the list and does not loop when last one is reached", () => {
    const hideCb = jest.fn();
    render(<MockComponent hideCb={hideCb} />);

    fireEvent.keyDown(screen.getByTestId(containerID), { key: "ArrowDown" });
    expect(screen.getByText(`${childButtonID}-0`)).toHaveFocus();
    fireEvent.keyDown(screen.getByTestId(containerID), { key: "ArrowDown" });
    expect(screen.getByText(`${childButtonID}-1`)).toHaveFocus();
    fireEvent.keyDown(screen.getByTestId(containerID), { key: "ArrowDown" });
    expect(screen.getByText(`${childButtonID}-2`)).toHaveFocus();
    fireEvent.keyDown(screen.getByTestId(containerID), { key: "ArrowDown" });
    expect(screen.getByText(`${childButtonID}-2`)).toHaveFocus();
  });

  it("pressing ArrowUp key focuses the previous child in the list and does not loop when first one is reached", () => {
    const hideCb = jest.fn();
    render(<MockComponent hideCb={hideCb} />);
    screen.getByText(`${childButtonID}-2`).focus();
    expect(screen.getByText(`${childButtonID}-2`)).toHaveFocus();
    fireEvent.keyDown(screen.getByTestId(containerID), { key: "ArrowUp" });
    expect(screen.getByText(`${childButtonID}-1`)).toHaveFocus();
    fireEvent.keyDown(screen.getByTestId(containerID), { key: "ArrowUp" });
    expect(screen.getByText(`${childButtonID}-0`)).toHaveFocus();
    fireEvent.keyDown(screen.getByTestId(containerID), { key: "ArrowUp" });
    expect(screen.getByText(`${childButtonID}-0`)).toHaveFocus();
  });

  it("pressing Escape key calls the hide callback and focuses the main button", () => {
    const hideCb = jest.fn();
    render(<MockComponent hideCb={hideCb} />);
    fireEvent.keyUp(screen.getByTestId(containerID), { key: "Escape" });
    expect(hideCb).toHaveBeenCalled();
    expect(screen.getByTestId(mainButtonID)).toHaveFocus();
  });

  it("pressing Enter key does not trigger prevent default", () => {
    const hideCb = jest.fn();
    render(<MockComponent hideCb={hideCb} />);
    const container = screen.getByTestId(containerID);
    const keyDownEvent = createEvent.keyDown(container, { key: "Enter" });

    fireEvent(container, keyDownEvent);

    expect(keyDownEvent.defaultPrevented).toBe(false);
  });

  it("pressing Space key does not trigger prevent default", () => {
    const hideCb = jest.fn();
    render(<MockComponent hideCb={hideCb} />);
    const container = screen.getByTestId(containerID);
    const keyDownEvent = createEvent.keyDown(container, { key: " " });

    fireEvent(container, keyDownEvent);

    expect(keyDownEvent.defaultPrevented).toBe(false);
  });

  it("pressing Tab key does not trigger prevent default", () => {
    const hideCb = jest.fn();
    render(<MockComponent hideCb={hideCb} />);
    const container = screen.getByTestId(containerID);
    const keyDownEvent = createEvent.keyDown(container, { key: "Tab" });

    fireEvent(container, keyDownEvent);

    expect(keyDownEvent.defaultPrevented).toBe(false);
  });

  it("pressing ArrowDown key does trigger prevent default", () => {
    const hideCb = jest.fn();
    render(<MockComponent hideCb={hideCb} />);
    const container = screen.getByTestId(containerID);
    const keyDownEvent = createEvent.keyDown(container, { key: "ArrowDown" });

    fireEvent(container, keyDownEvent);

    expect(keyDownEvent.defaultPrevented).toBe(true);
  });

  it("pressing ArrowUp key does trigger prevent default", () => {
    const hideCb = jest.fn();
    render(<MockComponent hideCb={hideCb} />);
    const container = screen.getByTestId(containerID);
    const keyDownEvent = createEvent.keyDown(container, { key: "ArrowUp" });

    fireEvent(container, keyDownEvent);

    expect(keyDownEvent.defaultPrevented).toBe(true);
  });

  it("pressing End key does trigger prevent default", () => {
    const hideCb = jest.fn();
    render(<MockComponent hideCb={hideCb} />);
    const container = screen.getByTestId(containerID);
    const keyDownEvent = createEvent.keyDown(container, { key: "End" });

    fireEvent(container, keyDownEvent);

    expect(keyDownEvent.defaultPrevented).toBe(true);
  });

  it("pressing Home key does trigger prevent default", () => {
    const hideCb = jest.fn();
    render(<MockComponent hideCb={hideCb} />);
    const container = screen.getByTestId(containerID);
    const keyDownEvent = createEvent.keyDown(container, { key: "Home" });

    fireEvent(container, keyDownEvent);

    expect(keyDownEvent.defaultPrevented).toBe(true);
  });

  it("calls hide callback when no child button in the menu is focused", () => {
    const hideCb = jest.fn();
    render(<MockComponent hideCb={hideCb} />);

    fireEvent.focus(screen.getByRole("button", { name: "Main Button" }));

    fireEvent.focus(screen.getByText(`${childButtonID}-0`));

    fireEvent.focus(
      screen.getByRole("button", { name: "Next Element in DOM" }),
    );
    expect(hideCb).toHaveBeenCalled();
  });
});
