import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import ToolbarDropdown from "../dropdown.component";
import { TestEditor } from "../../../../../../__tests__/utils/TestEditor";

const options = [
  { id: "1", label: "Option 1", onClick: jest.fn() },
  { id: "2", label: "Option 2", onClick: jest.fn() },
  { id: "3", label: "Option 3", onClick: jest.fn() },
];

const TestEditorWithToolbar = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const [value, setValue] = React.useState("0");
  const onChange = (id: string) => setValue(id);

  return (
    <TestEditor>
      <ToolbarDropdown
        options={options}
        value={value}
        isOpen={isOpen}
        focusedIndex={focusedIndex}
        setIsOpen={setIsOpen}
        setFocusedIndex={setFocusedIndex}
        onChange={onChange}
        namespace="test"
      />
    </TestEditor>
  );
};

describe("ToolbarDropdown", () => {
  let setIsOpen: jest.Mock;
  let setFocusedIndex: jest.Mock;
  let onChange: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    setIsOpen = jest.fn();
    setFocusedIndex = jest.fn();
    onChange = jest.fn();
  });

  it("renders with default selected option", () => {
    render(
      <TestEditor>
        <ToolbarDropdown
          options={options}
          value="1"
          isOpen={false}
          focusedIndex={-1}
          setIsOpen={setIsOpen}
          setFocusedIndex={setFocusedIndex}
          onChange={onChange}
          namespace="test"
        />
      </TestEditor>,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Option 1");
  });

  it("opens menu on button click", () => {
    render(
      <TestEditor>
        <ToolbarDropdown
          options={options}
          value="1"
          isOpen={false}
          focusedIndex={-1}
          setIsOpen={setIsOpen}
          setFocusedIndex={setFocusedIndex}
          onChange={onChange}
          namespace="test"
        />
      </TestEditor>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(setIsOpen).toHaveBeenCalledWith(true);
    expect(setFocusedIndex).toHaveBeenCalledWith(0);
  });

  it("closes menu on button click when already open", () => {
    render(
      <TestEditor>
        <ToolbarDropdown
          options={options}
          value="1"
          isOpen={true}
          focusedIndex={-1}
          setIsOpen={setIsOpen}
          setFocusedIndex={setFocusedIndex}
          onChange={onChange}
          namespace="test"
        />
      </TestEditor>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(setFocusedIndex).toHaveBeenCalledWith(-1);
  });

  it("closes menu when clicking outside", () => {
    render(
      <TestEditor>
        <ToolbarDropdown
          options={options}
          value="1"
          isOpen={true}
          focusedIndex={-1}
          setIsOpen={setIsOpen}
          setFocusedIndex={setFocusedIndex}
          onChange={onChange}
          namespace="test"
        />
      </TestEditor>,
    );
    fireEvent.mouseDown(document.body);
    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(setFocusedIndex).toHaveBeenCalledWith(-1);
  });

  it("handles keyboard Enter to open menu", () => {
    render(
      <TestEditor>
        <ToolbarDropdown
          options={options}
          value="1"
          isOpen={false}
          focusedIndex={-1}
          setIsOpen={setIsOpen}
          setFocusedIndex={setFocusedIndex}
          onChange={onChange}
          namespace="test"
        />
      </TestEditor>,
    );
    fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });
    expect(setIsOpen).toHaveBeenCalledWith(true);
    expect(setFocusedIndex).toHaveBeenCalledWith(0);
  });

  it("handles keyboard Enter to select option", () => {
    render(
      <TestEditor>
        <ToolbarDropdown
          options={options}
          value="1"
          isOpen={true}
          focusedIndex={1}
          setIsOpen={setIsOpen}
          setFocusedIndex={setFocusedIndex}
          onChange={onChange}
          namespace="test"
        />
      </TestEditor>,
    );
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Enter" });
    expect(options[1].onClick).toHaveBeenCalled();
    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(setFocusedIndex).toHaveBeenCalledWith(-1);
  });

  it("navigates with ArrowDown", async () => {
    render(
      <TestEditor>
        <TestEditorWithToolbar />
      </TestEditor>,
    );

    const menu = screen.getByRole("menu");

    act(() => {
      menu.focus();
    });

    const menuitems = screen.getAllByRole("menuitem");
    expect(menuitems[0]).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    expect(menuitems[1]).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    expect(menuitems[2]).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    expect(menuitems[0]).toHaveFocus();
  });

  it("navigates with ArrowUp", async () => {
    render(
      <TestEditor>
        <TestEditorWithToolbar />
      </TestEditor>,
    );

    const menu = screen.getByRole("menu");

    act(() => {
      menu.focus();
    });

    const menuitems = screen.getAllByRole("menuitem");
    expect(menuitems[0]).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(menuitems[2]).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(menuitems[1]).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(menuitems[0]).toHaveFocus();
  });

  it("closes with Escape key", () => {
    render(
      <TestEditor>
        <ToolbarDropdown
          options={options}
          value="1"
          isOpen={true}
          focusedIndex={-1}
          setIsOpen={setIsOpen}
          setFocusedIndex={setFocusedIndex}
          onChange={onChange}
          namespace="test"
        />
      </TestEditor>,
    );
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(setFocusedIndex).toHaveBeenCalledWith(-1);
  });

  it("closes with Tab key", () => {
    render(
      <TestEditor>
        <ToolbarDropdown
          options={options}
          value="1"
          isOpen={true}
          focusedIndex={-1}
          setIsOpen={setIsOpen}
          setFocusedIndex={setFocusedIndex}
          onChange={onChange}
          namespace="test"
        />
      </TestEditor>,
    );
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Tab" });
    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(setFocusedIndex).toHaveBeenCalledWith(-1);
  });

  it("selects option with mouse click", () => {
    render(
      <TestEditor>
        <ToolbarDropdown
          options={options}
          value="1"
          isOpen={true}
          focusedIndex={1}
          setIsOpen={setIsOpen}
          setFocusedIndex={setFocusedIndex}
          onChange={onChange}
          namespace="test"
        />
      </TestEditor>,
    );
    fireEvent.mouseDown(screen.getByText("Option 2"));
    expect(options[1].onClick).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith("2");
    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(setFocusedIndex).toHaveBeenCalledWith(-1);
  });

  it("applies correct aria attributes", () => {
    render(
      <TestEditor>
        <ToolbarDropdown
          options={options}
          value="1"
          isOpen={true}
          focusedIndex={-1}
          setIsOpen={setIsOpen}
          setFocusedIndex={setFocusedIndex}
          onChange={onChange}
          namespace="test"
        />
      </TestEditor>,
    );
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-controls",
      "test-typography-menu",
    );
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });
});
