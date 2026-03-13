import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";

import ToolbarDropdown from "./dropdown.component";

import TextEditor from "../../../../../text-editor.component";

describe("ToolbarDropdown", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default selected option", () => {
    render(<TextEditor labelText="Test Editor" namespace="test" />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveTextContent(/Paragraph/gi);
  });

  it("opens menu on button click", async () => {
    render(<TextEditor labelText="Test Editor" namespace="test" />);

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("closes menu on button click when already open", async () => {
    render(<TextEditor labelText="Test Editor" namespace="test" />);
    await userEvent.click(screen.getByRole("combobox"));

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes menu when clicking outside", async () => {
    render(<TextEditor labelText="Test Editor" namespace="test" />);

    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.click(document.body);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("handles keyboard Enter to open menu", async () => {
    render(<TextEditor labelText="Test Editor" namespace="test" />);

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    act(() => {
      screen.getByRole("combobox").focus();
    });

    await userEvent.keyboard("{Enter}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("handles keyboard Enter to select option", async () => {
    render(<TextEditor labelText="Test Editor" namespace="test" />);

    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");
    expect(screen.getByRole("combobox")).toHaveTextContent(/Title/gi);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("navigates with ArrowDown", async () => {
    render(<TextEditor labelText="Test Editor" namespace="test" />);
    await userEvent.click(screen.getByRole("combobox"));

    const menuitems = screen.getAllByRole("option");
    await userEvent.keyboard("{ArrowDown}");
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
    render(<TextEditor labelText="Test Editor" namespace="test" />);
    await userEvent.click(screen.getByRole("combobox"));

    const menuitems = screen.getAllByRole("option");

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

    await userEvent.keyboard("{ArrowUp}");
    expect(menuitems[4]).toHaveFocus();
  });

  it("navigates with Home", async () => {
    render(<TextEditor labelText="Test Editor" namespace="test" />);
    act(() => {
      screen.getByRole("combobox").focus();
    });
    await userEvent.keyboard("{Enter}");

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
    render(<TextEditor labelText="Test Editor" namespace="test" />);
    act(() => {
      screen.getByRole("combobox").focus();
    });
    await userEvent.keyboard("{Enter}");

    const menuitems = screen.getAllByRole("option");
    expect(menuitems[0]).toHaveFocus();

    await userEvent.keyboard("{End}");
    expect(menuitems[4]).toHaveFocus();
  });

  it("closes with Escape key", async () => {
    render(<TextEditor labelText="Test Editor" namespace="test" />);

    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes with Tab key", async () => {
    render(<TextEditor labelText="Test Editor" namespace="test" />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.tab();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("selects option with mouse click", async () => {
    render(<TextEditor labelText="Test Editor" namespace="test" />);

    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Subtitle"));
    expect(screen.getByRole("combobox")).toHaveTextContent(/Subtitle/gi);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("applies correct aria attributes", async () => {
    render(<TextEditor labelText="Test Editor" namespace="test" />);

    await userEvent.click(screen.getByRole("combobox"));

    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-controls",
      "test-typography-menu",
    );
  });

  it("renders correctly when size is set to small", async () => {
    render(
      <TextEditor labelText="Test Editor" namespace="test" size="small" />,
    );

    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("combobox")).toHaveStyle({
      height: "32px",
    });
    expect(screen.getByRole("listbox")).toHaveStyle({
      top: "38px",
    });
  });

  it("renders correctly when size is set to medium", async () => {
    render(
      <TextEditor labelText="Test Editor" namespace="test" size="medium" />,
    );

    await userEvent.click(screen.getByRole("combobox"));

    expect(screen.getByRole("combobox")).toHaveStyle({
      height: "40px",
    });
    expect(screen.getByRole("listbox")).toHaveStyle({
      top: "46px",
    });
  });

  it("renders correctly when size is set to large", async () => {
    render(
      <TextEditor labelText="Test Editor" namespace="test" size="large" />,
    );

    await userEvent.click(screen.getByRole("combobox"));

    expect(screen.getByRole("combobox")).toHaveStyle({
      height: "48px",
    });
    expect(screen.getByRole("listbox")).toHaveStyle({
      top: "54px",
    });
  });

  it("defaults isFirstButton to false when rendered with LexicalComposer", () => {
    const initialConfig = {
      namespace: "test-dropdown-composer",
      nodes: [],
      onError: () => {},
    };

    render(
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarDropdown
          options={[
            { id: "title", label: "Title", onClick: jest.fn() },
            { id: "subtitle", label: "Subtitle", onClick: jest.fn() },
          ]}
          value="0"
          isOpen={false}
          namespace="test-dropdown"
          focusedIndex={0}
        />
      </LexicalComposer>,
    );

    expect(screen.getByRole("combobox")).toHaveAttribute("tabindex", "-1");
  });
});
