import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import ToolbarDropdown from "./dropdown.component";
import { TestEditor } from "../../../../TestEditor.component";

const options = [
  { id: "title", label: "Title", onClick: jest.fn() },
  { id: "subtitle", label: "Subtitle", onClick: jest.fn() },
  { id: "sectionHeader", label: "Section header", onClick: jest.fn() },
  { id: "sectionSubheader", label: "Section subheader", onClick: jest.fn() },
  { id: "paragraph", label: "Paragraph", onClick: jest.fn() },
];

const TestEditorWithToolbar = ({
  defaultState = false,
  size = "medium",
}: {
  defaultState: boolean;
  size?: "small" | "medium" | "large";
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultState);
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
        size={size}
      />
    </TestEditor>
  );
};

describe("ToolbarDropdown", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default selected option", () => {
    render(<TestEditorWithToolbar defaultState={false} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveTextContent(/Paragraph/gi);
  });

  it("opens menu on button click", async () => {
    render(<TestEditorWithToolbar defaultState={false} />);

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("closes menu on button click when already open", async () => {
    render(<TestEditorWithToolbar defaultState={true} />);

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes menu when clicking outside", async () => {
    render(<TestEditorWithToolbar defaultState={true} />);

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.click(document.body);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("handles keyboard Enter to open menu", async () => {
    render(<TestEditorWithToolbar defaultState={false} />);

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    act(() => {
      screen.getByRole("combobox").focus();
    });

    await userEvent.keyboard("{Enter}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("handles keyboard Enter to select option", async () => {
    render(<TestEditorWithToolbar defaultState={true} />);

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");
    expect(options[1].onClick).toHaveBeenCalled();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("navigates with ArrowDown", async () => {
    render(<TestEditorWithToolbar defaultState={false} />);
    await userEvent.click(screen.getByRole("combobox"));

    const menu = screen.getByRole("listbox");

    act(() => {
      menu.focus();
    });

    const menuitems = screen.getAllByRole("option");
    expect(menuitems[0]).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    expect(menuitems[1]).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    expect(menuitems[2]).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    expect(menuitems[3]).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    expect(menuitems[4]).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    expect(menuitems[0]).toHaveFocus();
  });

  it("navigates with ArrowUp", async () => {
    render(<TestEditorWithToolbar defaultState={false} />);
    await userEvent.click(screen.getByRole("combobox"));

    const menu = screen.getByRole("listbox");

    act(() => {
      menu.focus();
    });

    const menuitems = screen.getAllByRole("option");
    expect(menuitems[0]).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(menuitems[4]).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(menuitems[3]).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(menuitems[2]).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(menuitems[1]).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(menuitems[0]).toHaveFocus();
  });

  it("navigates with Home", async () => {
    render(<TestEditorWithToolbar defaultState={false} />);
    await userEvent.click(screen.getByRole("combobox"));

    const menu = screen.getByRole("listbox");

    act(() => {
      menu.focus();
    });

    const menuitems = screen.getAllByRole("option");
    expect(menuitems[0]).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    expect(menuitems[1]).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    expect(menuitems[2]).toHaveFocus();

    await userEvent.keyboard("{Home}");
    expect(menuitems[0]).toHaveFocus();
  });

  it("navigates with End", async () => {
    render(<TestEditorWithToolbar defaultState={false} />);
    await userEvent.click(screen.getByRole("combobox"));

    const menu = screen.getByRole("listbox");

    act(() => {
      menu.focus();
    });

    const menuitems = screen.getAllByRole("option");
    expect(menuitems[0]).toHaveFocus();

    await userEvent.keyboard("{End}");
    expect(menuitems[4]).toHaveFocus();
  });

  it("closes with Escape key", async () => {
    render(<TestEditorWithToolbar defaultState={true} />);

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes with Tab key", async () => {
    render(<TestEditorWithToolbar defaultState={true} />);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.tab();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("selects option with mouse click", async () => {
    render(<TestEditorWithToolbar defaultState={true} />);

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Subtitle"));
    expect(options[1].onClick).toHaveBeenCalled();
    expect(screen.getByRole("combobox")).toHaveTextContent(/Subtitle/gi);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("applies correct aria attributes", () => {
    render(<TestEditorWithToolbar defaultState={true} />);
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-controls",
      "test-typography-menu",
    );
  });

  it("renders correctly when size is set to small", () => {
    render(<TestEditorWithToolbar defaultState={true} size="small" />);
    expect(screen.getByRole("combobox")).toHaveStyle({
      height: "32px",
    });
    expect(screen.getByRole("listbox")).toHaveStyle({
      top: "38px",
    });
  });

  it("renders correctly when size is set to medium", () => {
    render(<TestEditorWithToolbar defaultState={true} />);
    expect(screen.getByRole("combobox")).toHaveStyle({
      height: "40px",
    });
    expect(screen.getByRole("listbox")).toHaveStyle({
      top: "46px",
    });
  });

  it("renders correctly when size is set to large", () => {
    render(<TestEditorWithToolbar defaultState={true} size="large" />);
    expect(screen.getByRole("combobox")).toHaveStyle({
      height: "48px",
    });
    expect(screen.getByRole("listbox")).toHaveStyle({
      top: "54px",
    });
  });
});
