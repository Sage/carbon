import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";

import { HyperlinkButton } from ".";

import TextEditor from "../../../../text-editor.component";

describe("Hyperlink button", () => {
  it("should render the hyperlink button correctly", () => {
    render(<TextEditor labelText="Test Editor" namespace="test" />);
    const linkButton = screen.getByTestId(`test-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();
    expect(linkButton).toHaveStyleRule("background-color", "transparent");
  });

  it("should render the dialog correctly when the button is clicked", async () => {
    render(<TextEditor labelText="Test Editor" namespace="test" />);
    const linkButton = screen.getByTestId(`test-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();

    await userEvent.click(linkButton);
    const dialog = screen.getByRole("dialog");

    await waitFor(() => {
      expect(dialog).toBeInTheDocument();
    });

    const dialogContent = within(dialog);
    const title = dialogContent.getByText("Add link");
    expect(title).toBeInTheDocument();

    const input = dialogContent.getAllByRole("textbox");
    expect(input).toHaveLength(2);

    const cancelButton = dialogContent.getByRole("button", {
      name: "Cancel",
    });
    expect(cancelButton).toBeInTheDocument();
    const addButton = dialogContent.getByRole("button", { name: "Save" });
    expect(addButton).toBeInTheDocument();
  });

  it("should close the dialog when the cancel button is clicked", async () => {
    render(<TextEditor labelText="Test Editor" namespace="test" />);
    const linkButton = screen.getByTestId(`test-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();

    await userEvent.click(linkButton);
    const dialog = screen.getByRole("dialog");

    await waitFor(() => {
      expect(dialog).toBeInTheDocument();
    });

    const dialogContent = within(dialog);
    const cancelButton = dialogContent.getByRole("button", {
      name: "Cancel",
    });
    expect(cancelButton).toBeInTheDocument();

    await userEvent.click(cancelButton);
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it(`should focus the hyperlink button when isFirstButton is set to true`, async () => {
    render(
      <TextEditor
        labelText="Test Editor"
        namespace="test"
        toolbarControls={["link"]}
      />,
    );
    const linkButton = screen.getByTestId(`test-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();

    expect(linkButton).toHaveAttribute("tabindex", "0");
    await userEvent.tab();
    expect(linkButton).toHaveFocus();
  });

  it(`should not focus the hyperlink button when isFirstButton is set to false`, async () => {
    render(
      <TextEditor
        labelText="Test Editor"
        namespace="test-rte"
        toolbarControls={["bold", "link"]}
      />,
    );
    const linkButton = screen.getByTestId(`test-rte-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();

    expect(linkButton).toHaveAttribute("tabindex", "-1");
    await userEvent.tab();
    await userEvent.tab();

    expect(linkButton).not.toHaveFocus();
  });

  it("defaults isFirstButton to false when rendered with LexicalComposer", () => {
    const initialConfig = {
      namespace: "test",
      nodes: [],
      onError: () => {},
    };

    render(
      <LexicalComposer initialConfig={initialConfig}>
        <HyperlinkButton namespace="test-hyperlink" setDialogOpen={() => {}} />
      </LexicalComposer>,
    );

    const hyperlinkButton = screen.getByRole("button", { name: "Hyperlink" });
    expect(hyperlinkButton).toHaveAttribute("tabindex", "-1");
  });
});
