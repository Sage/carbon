import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ToolbarDropdown from "./dropdown.component";

describe("ToolbarDropdown", () => {
  const options = [
    { id: "1", label: "Option 1", onClick: jest.fn() },
    { id: "2", label: "Option 2", onClick: jest.fn() },
    { id: "3", label: "Option 3", onClick: jest.fn() },
  ];

  let setIsOpen: jest.Mock;
  let setFocusedIndex: jest.Mock;
  let onChange: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    setIsOpen = jest.fn();
    setFocusedIndex = jest.fn();
    onChange = jest.fn();
  });

  const renderDropdown = (props = {}) =>
    render(
      <ToolbarDropdown
        options={options}
        value="1"
        setIsOpen={setIsOpen}
        setFocusedIndex={setFocusedIndex}
        onChange={onChange}
        {...props}
      />,
    );

  it("renders with default selected option", () => {
    renderDropdown();
    expect(screen.getByRole("button")).toHaveTextContent("Option 1");
  });

  it("opens menu on button click", () => {
    renderDropdown({ isOpen: false });
    fireEvent.click(screen.getByRole("button"));
    expect(setIsOpen).toHaveBeenCalledWith(true);
    expect(setFocusedIndex).toHaveBeenCalledWith(0);
  });

  it("closes menu on button click when already open", () => {
    renderDropdown({ isOpen: true });
    fireEvent.click(screen.getByRole("button"));
    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(setFocusedIndex).toHaveBeenCalledWith(-1);
  });

  it("closes menu when clicking outside", () => {
    renderDropdown({ isOpen: true });
    fireEvent.mouseDown(document.body);
    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(setFocusedIndex).toHaveBeenCalledWith(-1);
  });

  it("handles keyboard Enter to open menu", () => {
    renderDropdown({ isOpen: false });
    fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });
    expect(setIsOpen).toHaveBeenCalledWith(true);
    expect(setFocusedIndex).toHaveBeenCalledWith(0);
  });

  it("handles keyboard Enter to select option", () => {
    renderDropdown({ isOpen: true, focusedIndex: 1 });
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Enter" });
    expect(options[1].onClick).toHaveBeenCalled();
    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(setFocusedIndex).toHaveBeenCalledWith(-1);
  });

  it("navigates with ArrowDown", () => {
    renderDropdown({ isOpen: true, focusedIndex: 0 });
    fireEvent.keyDown(screen.getByRole("menu"), { key: "ArrowDown" });

    expect(setFocusedIndex).toHaveBeenCalledWith(expect.any(Function));

    const updater = setFocusedIndex.mock.calls[0][0];
    expect(updater(2)).toBe(1);

    fireEvent.keyDown(screen.getByRole("menu"), { key: "ArrowDown" });
    expect(updater(2)).toBe(2);
  });

  it("navigates with ArrowDown and wraps around", () => {
    renderDropdown({ isOpen: true, focusedIndex: 2 });
    fireEvent.keyDown(screen.getByRole("menu"), { key: "ArrowDown" });

    expect(setFocusedIndex).toHaveBeenCalledWith(expect.any(Function));

    const updater = setFocusedIndex.mock.calls[0][0];
    expect(updater(2)).toBe(0);
  });

  it("navigates with ArrowUp", () => {
    renderDropdown({ isOpen: true, focusedIndex: 2 });
    fireEvent.keyDown(screen.getByRole("menu"), { key: "ArrowUp" });

    expect(setFocusedIndex).toHaveBeenCalledWith(expect.any(Function));

    const updater = setFocusedIndex.mock.calls[0][0];
    expect(updater(2)).toBe(1);

    fireEvent.keyDown(screen.getByRole("menu"), { key: "ArrowUp" });
    expect(updater(2)).toBe(0);
  });

  it("navigates with ArrowUp and wraps around", () => {
    renderDropdown({ isOpen: true, focusedIndex: 0 });
    fireEvent.keyDown(screen.getByRole("menu"), { key: "ArrowUp" });

    expect(setFocusedIndex).toHaveBeenCalledWith(expect.any(Function));

    const updater = setFocusedIndex.mock.calls[0][0];
    expect(updater(0)).toBe(2);
  });

  it("closes with Escape key", () => {
    renderDropdown({ isOpen: true });
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(setFocusedIndex).toHaveBeenCalledWith(-1);
  });

  it("closes with Tab key", () => {
    renderDropdown({ isOpen: true });
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Tab" });
    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(setFocusedIndex).toHaveBeenCalledWith(-1);
  });

  it("selects option with mouse click", () => {
    renderDropdown({ isOpen: true, focusedIndex: 1 });
    fireEvent.mouseDown(screen.getByText("Option 2"));
    expect(options[1].onClick).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith("2");
    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(setFocusedIndex).toHaveBeenCalledWith(-1);
  });

  it("applies correct aria attributes", () => {
    renderDropdown({ isOpen: true, namespace: "test" });
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-controls",
      "test-typography-menu",
    );
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });
});
