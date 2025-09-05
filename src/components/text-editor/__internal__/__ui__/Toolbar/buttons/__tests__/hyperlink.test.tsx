import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { act } from "react";

import { HyperlinkButton } from "./..";
import TestEditor from "../../../../../__tests__/utils/TestEditor";

const HyperlinkDemo = ({
  firstButtonOverride = false,
}: {
  firstButtonOverride?: boolean;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <TestEditor>
      <HyperlinkButton
        namespace="test"
        setDialogOpen={setIsOpen}
        dialogOpen={isOpen}
        isFirstButton={firstButtonOverride}
      />
    </TestEditor>
  );
};

describe("Hyperlink button", () => {
  it("should render the hyperlink button correctly", () => {
    render(<HyperlinkDemo />);
    const linkButton = screen.getByTestId(`test-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();
    expect(linkButton).toHaveStyleRule("background-color", "transparent");
  });

  it("should render the dialog correctly when the button is clicked", async () => {
    render(<HyperlinkDemo />);
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
    render(<HyperlinkDemo />);
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
    const user = userEvent.setup();
    render(<HyperlinkDemo firstButtonOverride />);
    const linkButton = screen.getByTestId(`test-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();

    expect(linkButton).toHaveAttribute("tabindex", "0");
    await user.tab();
    await user.tab();

    expect(linkButton).toHaveFocus();
  });

  it(`should not focus the hyperlink button when isFirstButton is set to false`, async () => {
    const user = userEvent.setup();
    render(<HyperlinkDemo firstButtonOverride={false} />);
    const linkButton = screen.getByTestId(`test-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();

    expect(linkButton).toHaveAttribute("tabindex", "-1");
    await user.tab();
    await user.tab();

    expect(linkButton).not.toHaveFocus();
  });

  it(`should not persist data between modals when the close button is pressed`, async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    jest.useFakeTimers();

    render(<HyperlinkDemo />);
    const linkButton = screen.getByTestId(`test-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();
    await user.click(linkButton);

    let dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    let dialogContent = within(dialog);

    const urlInput = dialogContent.getAllByRole("textbox")[0];
    const textInput = dialogContent.getAllByRole("textbox")[1];

    await user.type(urlInput, "https://carbon.sage.com");

    await user.type(textInput, "Carbon");

    const cancelButton = dialogContent.getByRole("button", {
      name: "Cancel",
    });

    await user.click(cancelButton);

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );

    await user.click(linkButton);

    dialog = screen.getByRole("dialog");

    await waitFor(() => {
      expect(dialog).toBeInTheDocument();
    });

    dialogContent = within(dialog);

    const newUrlInput = dialogContent.getAllByRole("textbox")[0];
    const newTextInput = dialogContent.getAllByRole("textbox")[1];

    expect(newUrlInput).toHaveValue("");
    expect(newTextInput).toHaveValue("");

    jest.useRealTimers();
  });

  it(`should not persist data between modals when the ESC key is pressed`, async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    jest.useFakeTimers();

    render(<HyperlinkDemo />);
    const linkButton = screen.getByTestId(`test-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();
    await user.click(linkButton);

    let dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    let dialogContent = within(dialog);

    const urlInput = dialogContent.getAllByRole("textbox")[0];
    const textInput = dialogContent.getAllByRole("textbox")[1];

    await user.type(urlInput, "https://carbon.sage.com");

    await user.type(textInput, "Carbon");

    await user.keyboard("{Escape}");

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );

    await user.click(linkButton);

    dialog = screen.getByRole("dialog");

    await waitFor(() => {
      expect(dialog).toBeInTheDocument();
    });

    dialogContent = within(dialog);

    const newUrlInput = dialogContent.getAllByRole("textbox")[0];
    const newTextInput = dialogContent.getAllByRole("textbox")[1];

    expect(newUrlInput).toHaveValue("");
    expect(newTextInput).toHaveValue("");

    jest.useRealTimers();
  });

  it("should submit the form when the save button is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    jest.useFakeTimers();

    render(<HyperlinkDemo />);

    const editor = screen.getByRole("textbox");

    await user.click(editor);
    await act(() => {
      user.type(editor, "Hello ");
    });
    await user.tripleClick(editor);

    const linkButton = screen.getByTestId(`test-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();
    await user.click(linkButton);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const dialogContent = within(dialog);

    const urlInput = dialogContent.getAllByRole("textbox")[0];
    const textInput = dialogContent.getAllByRole("textbox")[1];

    await user.type(urlInput, "https://carbon.sage.com");

    await user.type(textInput, "Carbon");

    const saveButton = dialogContent.getByRole("button", { name: "Save" });
    expect(saveButton).toBeInTheDocument();

    await user.click(saveButton);

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );

    jest.useRealTimers();
  });
});
