import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pod from ".";
import Typography from "../typography";
import { testStyledSystemMarginRTL } from "../../__spec_helper__/__internal__/test-utils";

test("renders with `title` as a string", () => {
  render(<Pod title="Title" />);

  expect(
    screen.getByRole("heading", { name: "Title", level: 4 }),
  ).toBeVisible();
});

test("renders with `title` as a node", () => {
  render(<Pod title={<Typography variant="h1">Title</Typography>} />);

  expect(
    screen.getByRole("heading", { name: "Title", level: 1 }),
  ).toBeVisible();
});

test("renders with `subtitle` as a string", () => {
  render(<Pod title="Title" subtitle="Subtitle" />);

  expect(
    screen.getByRole("heading", { name: "Subtitle", level: 5 }),
  ).toBeVisible();
});

test("renders with `subtitle` as a node", () => {
  render(
    <Pod
      title="Title"
      subtitle={<Typography variant="h1">Subtitle</Typography>}
    />,
  );

  expect(
    screen.getByRole("heading", { name: "Subtitle", level: 1 }),
  ).toBeVisible();
});

test("renders with `footer`", () => {
  render(<Pod title="Title" footer="Footer" />);

  expect(screen.getByText("Footer")).toBeVisible();
});

test("renders with children", () => {
  render(
    <Pod title="Title">
      <Typography variant="h1">Children</Typography>
    </Pod>,
  );

  expect(screen.getByText("Children")).toBeVisible();
});

test("renders edit button when `onEdit` is provided", () => {
  render(<Pod title="Title" onEdit={() => {}} />);

  expect(screen.getByRole("button", { name: "Edit" })).toBeVisible();
});

test("renders edit button when `displayEditButtonOnHover` is true and pod is hovered", async () => {
  const user = userEvent.setup();
  render(<Pod title="Title" onEdit={() => {}} displayEditButtonOnHover />);

  expect(
    screen.queryByRole("button", { name: "Edit" }),
  ).not.toBeInTheDocument();

  await user.hover(screen.getByTestId("pod-block"));

  expect(screen.getByRole("button", { name: "Edit" })).toBeVisible();
});

test("calls `onEdit` when edit button is clicked", async () => {
  const user = userEvent.setup();
  const onEdit = jest.fn();
  render(<Pod title="Title" onEdit={onEdit} />);

  await user.click(screen.getByRole("button", { name: "Edit" }));

  expect(onEdit).toHaveBeenCalled();
});

test("calls `onEdit` when Enter key is pressed on the edit button", async () => {
  const user = userEvent.setup();
  const onEdit = jest.fn();
  render(<Pod title="Title" onEdit={onEdit} />);

  const editButton = screen.getByRole("button", { name: "Edit" });
  editButton.focus();

  await user.keyboard("{enter}");

  expect(onEdit).toHaveBeenCalled();
});

test("does not call `onEdit` when non-Enter key is pressed on the edit button", async () => {
  const user = userEvent.setup();
  const onEdit = jest.fn();
  render(<Pod title="Title" onEdit={onEdit} />);

  const editButton = screen.getByRole("button", { name: "Edit" });
  editButton.focus();

  await user.keyboard("a");
  expect(onEdit).not.toHaveBeenCalled();
});

test("calls `onEdit` when `triggerEditOnContent` is true and content is clicked", async () => {
  const user = userEvent.setup();
  const onEdit = jest.fn();
  render(<Pod title="Title" onEdit={onEdit} triggerEditOnContent />);

  await user.click(screen.getByTestId("pod-block"));

  expect(onEdit).toHaveBeenCalled();
});

test("calls `onEdit` when `triggerEditOnContent` is true and Enter key is pressed on the content", async () => {
  const user = userEvent.setup();
  const onEdit = jest.fn();
  render(<Pod title="Title" onEdit={onEdit} triggerEditOnContent />);

  const content = screen.getByTestId("pod-block");
  content.focus();

  await user.keyboard("{enter}");
  expect(onEdit).toHaveBeenCalled();
});

test("does not call `onEdit` when `triggerEditOnContent` is true and non-Enter key is pressed on the content", async () => {
  const user = userEvent.setup();
  const onEdit = jest.fn();
  render(<Pod title="Title" onEdit={onEdit} triggerEditOnContent />);

  const content = screen.getByTestId("pod-block");
  content.focus();

  await user.keyboard("a");
  expect(onEdit).not.toHaveBeenCalled();
});

test("renders delete button when `onDelete` is provided", () => {
  render(<Pod title="Title" onDelete={() => {}} />);

  expect(screen.getByRole("button", { name: "Delete" })).toBeVisible();
});

test("calls `onDelete` when delete button is clicked", async () => {
  const user = userEvent.setup();
  const onDelete = jest.fn();
  render(<Pod title="Title" onDelete={onDelete} />);

  await user.click(screen.getByRole("button", { name: "Delete" }));

  expect(onDelete).toHaveBeenCalled();
});

test("calls `onDelete` when Enter key is pressed on the delete button", async () => {
  const user = userEvent.setup();
  const onDelete = jest.fn();
  render(<Pod title="Title" onDelete={onDelete} />);

  const deleteButton = screen.getByRole("button", { name: "Delete" });
  deleteButton.focus();

  await user.keyboard("{enter}");
  expect(onDelete).toHaveBeenCalled();
});

test("does not call `onDelete` when non-Enter key is pressed on the delete button", async () => {
  const user = userEvent.setup();
  const onDelete = jest.fn();
  render(<Pod title="Title" onDelete={onDelete} />);

  const deleteButton = screen.getByRole("button", { name: "Delete" });
  deleteButton.focus();

  await user.keyboard("a");
  expect(onDelete).not.toHaveBeenCalled();
});

test("renders undo button when `onUndo` is provided and `softDelete` is true", () => {
  render(<Pod title="Title" onUndo={() => {}} softDelete />);

  expect(screen.getByRole("button", { name: "Undo" })).toBeVisible();
});

test("calls `onUndo` when undo button is clicked", async () => {
  const user = userEvent.setup();
  const onUndo = jest.fn();
  render(<Pod title="Title" onUndo={onUndo} softDelete />);

  await user.click(screen.getByRole("button", { name: "Undo" }));

  expect(onUndo).toHaveBeenCalled();
});

test("calls `onUndo` when Enter key is pressed on the undo button", async () => {
  const user = userEvent.setup();
  const onUndo = jest.fn();
  render(<Pod title="Title" onUndo={onUndo} softDelete />);

  const undoButton = screen.getByRole("button", { name: "Undo" });
  undoButton.focus();

  await user.keyboard("{enter}");
  expect(onUndo).toHaveBeenCalled();
});

test("does not call `onUndo` when non-Enter key is pressed on the undo button", async () => {
  const user = userEvent.setup();
  const onUndo = jest.fn();
  render(<Pod title="Title" onUndo={onUndo} softDelete />);

  const undoButton = screen.getByRole("button", { name: "Undo" });
  undoButton.focus();

  await user.keyboard("a");
  expect(onUndo).not.toHaveBeenCalled();
});

// coverage
test("renders content with focus border when edit button is focused and removes it on blur", () => {
  render(<Pod title="Title" onEdit={() => {}} />);

  const editButton = screen.getByRole("button", { name: "Edit" });
  editButton.focus();

  const content = screen.getByTestId("pod-block");
  expect(content).toHaveStyleRule(
    "border: 3px solid var(--colorsSemanticFocus500)",
  );

  editButton.blur();
  expect(content).not.toHaveStyleRule(
    "border: 3px solid var(--colorsSemanticFocus500)",
  );
});

// coverage
test("renders content with focus border when delete button is focused and removes it on blur", () => {
  render(<Pod title="Title" onDelete={() => {}} />);

  const deleteButton = screen.getByRole("button", { name: "Delete" });
  deleteButton.focus();

  const content = screen.getByTestId("pod-block");
  expect(content).toHaveStyleRule(
    "border: 3px solid var(--colorsSemanticFocus500)",
  );

  deleteButton.blur();
  expect(content).not.toHaveStyleRule(
    "border: 3px solid var(--colorsSemanticFocus500)",
  );
});

// coverage
test("renders content with focus border when undo button is focused and removes it on blur", () => {
  render(<Pod title="Title" softDelete onUndo={() => {}} />);

  const undoButton = screen.getByRole("button", { name: "Undo" });
  undoButton.focus();

  const content = screen.getByTestId("pod-block");
  expect(content).toHaveStyleRule(
    "border: 3px solid var(--colorsSemanticFocus500)",
  );

  undoButton.blur();
  expect(content).not.toHaveStyleRule(
    "border: 3px solid var(--colorsSemanticFocus500)",
  );
});

// coverage
test("renders with expected styles when edit button is hovered and removes it on mouseleave", async () => {
  const user = userEvent.setup();
  render(<Pod title="Title" onEdit={() => {}} />);

  const editButton = screen.getByRole("button", { name: "Edit" });
  await user.hover(editButton);

  const content = screen.getByTestId("pod-block");
  expect(content).toHaveStyleRule("background-color: --colorsUtilityMajor075");

  await user.unhover(editButton);
  expect(content).toHaveStyleRule("background-color: ----colorsUtilityYang100");
});

// coverage
test("renders with expected styles when delete button is hovered and removes it on mouseleave", async () => {
  const user = userEvent.setup();
  render(<Pod title="Title" onDelete={() => {}} />);

  const deleteButton = screen.getByRole("button", { name: "Delete" });
  await user.hover(deleteButton);

  const content = screen.getByTestId("pod-block");
  expect(content).toHaveStyleRule("background-color: --colorsUtilityMajor075");

  await user.unhover(deleteButton);
  expect(content).toHaveStyleRule("background-color: ----colorsUtilityYang100");
});

// coverage
test("renders with expected styles when undo button is hovered and removes it on mouseleave", async () => {
  const user = userEvent.setup();
  render(<Pod title="Title" softDelete onUndo={() => {}} />);

  const undoButton = screen.getByRole("button", { name: "Undo" });
  await user.hover(undoButton);

  const block = screen.getByTestId("pod-block");
  expect(block).toHaveStyleRule("background-color: --colorsUtilityMajor075");

  await user.unhover(undoButton);
  expect(block).toHaveStyleRule("background-color: ----colorsUtilityYang100");
});

// coverage
test("renders with `height` as a number", () => {
  render(<Pod data-role="pod" title="Title" height={100} />);

  expect(screen.getByTestId("pod")).toHaveStyle({ height: "100px" });
});

// coverage
test("renders with `height` as a string", () => {
  render(<Pod data-role="pod" title="Title" height="100%" />);

  expect(screen.getByTestId("pod")).toHaveStyle({ height: "100%" });
});

// coverage
test("renders block with no borders when `border` is false", () => {
  render(<Pod title="Title" border={false} />);

  const block = screen.getByTestId("pod-block");
  expect(block).toHaveStyle({ border: "none" });
});

// coverage
test("renders edit button with no borders when `border` is false", () => {
  render(<Pod title="Title" onEdit={() => {}} border={false} />);

  const button = screen.getByRole("button", { name: "Edit" });
  expect(button).toHaveStyle({ border: "none" });
});

// coverage
test("renders delete button with no borders when `border` is false", () => {
  render(<Pod title="Title" onDelete={() => {}} border={false} />);

  const button = screen.getByRole("button", { name: "Delete" });
  expect(button).toHaveStyle({ border: "none" });
});

// coverage
test("renders undo button with no borders when `border` is false", () => {
  render(<Pod title="Title" softDelete onUndo={() => {}} border={false} />);

  const button = screen.getByRole("button", { name: "Undo" });
  expect(button).toHaveStyle({ border: "none" });
});

// coverage
test("renders with expected styles when `internalEditButton` is true", () => {
  render(
    <Pod
      title="Title"
      onEdit={() => {}}
      onDelete={() => {}}
      internalEditButton
    />,
  );

  const buttonContainer = screen.getByTestId("action-button-container");
  expect(buttonContainer).toHaveStyle({
    position: "absolute",
    top: "2px",
    right: "2px",
    zIndex: "10",
  });

  const editButton = screen.getByRole("button", { name: "Edit" });
  expect(editButton).toHaveStyle({ border: "none" });
  expect(editButton).toHaveStyleRule(
    "background: var(--colorsActionMajorTransparent)",
  );

  const deleteButton = screen.queryByRole("button", { name: "Delete" });
  expect(deleteButton).toHaveStyle({ border: "none" });
  expect(deleteButton).toHaveStyleRule(
    "background: var(--colorsActionMajorTransparent)",
  );
});

// coverage
test("renders undo button with expected styles when `internalEditButton` is true", () => {
  render(<Pod title="Title" softDelete onUndo={() => {}} internalEditButton />);

  const undoButton = screen.getByRole("button", { name: "Undo" });
  expect(undoButton).toHaveStyle({ border: "none" });
  expect(undoButton).toHaveStyleRule(
    "background: var(--colorsActionMajorTransparent)",
  );
});

// coverage
test("renders with expected styles when `variant` is 'tile'", () => {
  render(<Pod title="Title" variant="tile" footer="Footer" />);

  const block = screen.getByTestId("pod-block");
  expect(block).toHaveStyleRule("box-shadow: 0 2px 3px 0 rgba(2, 18, 36, 0.2)");

  const footer = screen.getByText("Footer");
  expect(footer).toHaveStyleRule(
    "border-top: 1px solid var(--colorsUtilityMajor100)",
  );
});

// coverage
test("renders with expected styles when `align` is 'right' and `internalEditButton` is true", () => {
  render(
    <Pod
      title="Title"
      onEdit={() => {}}
      onDelete={() => {}}
      alignTitle="right"
      internalEditButton
    />,
  );

  const header = screen.getByTestId("pod-content-header");
  expect(header).toHaveStyle({ marginRight: "30px" });
});

// coverage
test("renders footer with correct colour when `softDelete` is true", () => {
  render(<Pod title="Title" footer="Footer" softDelete />);

  const footer = screen.getByText("Footer");
  expect(footer).toHaveStyleRule("color: var(--colorsUtilityYin055)");
});

// coverage
test("renders block with correct colour when `variant` is 'tile', `internalEditButton` is true and a button is focused", () => {
  render(
    <Pod title="Title" variant="tile" onEdit={() => {}} internalEditButton />,
  );

  const editButton = screen.getByRole("button", { name: "Edit" });
  editButton.focus();

  const block = screen.getByTestId("pod-block");
  expect(block).toHaveStyleRule(
    "background-color: var(--colorsActionMajorTransparent)",
  );
});

// coverage
test("renders block with correct padding when `border` is false and a button is focused", () => {
  render(<Pod title="Title" onEdit={() => {}} border={false} />);

  const editButton = screen.getByRole("button", { name: "Edit" });
  editButton.focus();

  const block = screen.getByTestId("pod-block");
  expect(block).toHaveStyle({ padding: "0" });
});

testStyledSystemMarginRTL(
  (props) => <Pod data-role="pod" {...props} />,
  () => screen.getByTestId("pod"),
);
