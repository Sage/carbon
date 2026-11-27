import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TreeViewItem, { TreeViewItemProps } from "./tree-view-item.component";

test("renders the label as plain text when there are no children or href", () => {
  render(<TreeViewItem id="item-1" label="Item 1" />);

  expect(screen.getByText("Item 1")).toBeVisible();
  expect(screen.queryByRole("link")).not.toBeInTheDocument();
  expect(screen.queryByRole("treeitem")).not.toBeInTheDocument();
});

test("renders a link with the 'href' when there are no children", () => {
  render(<TreeViewItem id="item-1" label="Item 1" href="/item-1" />);

  const link = screen.getByRole("link", { name: "Item 1" });

  expect(link).toHaveAttribute("href", "/item-1");
});

test("renders an empty children array as a leaf, using the 'href' when provided", () => {
  const props: TreeViewItemProps = {
    id: "item-1",
    label: "Item 1",
    href: "/item-1",
    children: [],
  };

  render(<TreeViewItem {...props} />);

  expect(screen.getByRole("link", { name: "Item 1" })).toBeVisible();
  expect(screen.queryByRole("treeitem")).not.toBeInTheDocument();
});

test("renders a collapsed toggle, and hides children, when children are provided", () => {
  const props: TreeViewItemProps = {
    id: "item-1",
    label: "Item 1",
    children: [{ id: "item-1.1", label: "Item 1.1" }],
  };

  render(<TreeViewItem {...props} />);

  const toggle = screen.getByRole("treeitem", { name: "Item 1" });

  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(toggle).toHaveAttribute("aria-controls", "item-1");
  expect(screen.queryByText("Item 1.1")).not.toBeInTheDocument();
  expect(screen.queryByRole("link")).not.toBeInTheDocument();
});

test("does not render the 'href' as a link when children are provided", () => {
  const props: TreeViewItemProps = {
    id: "item-1",
    label: "Item 1",
    href: "/item-1",
    children: [{ id: "item-1.1", label: "Item 1.1" }],
  };

  render(<TreeViewItem {...props} />);

  expect(screen.queryByRole("link")).not.toBeInTheDocument();
  expect(screen.getByRole("treeitem", { name: "Item 1" })).toBeVisible();
});

test("expands and renders child items when the toggle is clicked", async () => {
  const user = userEvent.setup();
  const props: TreeViewItemProps = {
    id: "item-1",
    label: "Item 1",
    children: [
      { id: "item-1.1", label: "Item 1.1" },
      { id: "item-1.2", label: "Item 1.2", href: "/item-1-2" },
    ],
  };

  render(<TreeViewItem {...props} />);

  const toggle = screen.getByRole("treeitem", { name: "Item 1" });
  await user.click(toggle);

  expect(toggle).toHaveAttribute("aria-expanded", "true");
  const tree = screen.getByRole("tree", { name: "Item 1" });

  expect(tree).toHaveAttribute("id", "item-1");
  expect(tree).toHaveAttribute("aria-labelledby", "item-1-toggle");
  expect(screen.getByText("Item 1.1")).toBeVisible();
  expect(screen.getByRole("link", { name: "Item 1.2" })).toHaveAttribute(
    "href",
    "/item-1-2",
  );
});

test("collapses child items when the toggle is clicked again", async () => {
  const user = userEvent.setup();
  const props: TreeViewItemProps = {
    id: "item-1",
    label: "Item 1",
    children: [{ id: "item-1.1", label: "Item 1.1" }],
  };

  render(<TreeViewItem {...props} />);

  const toggle = screen.getByRole("treeitem", { name: "Item 1" });
  await user.click(toggle);
  await user.click(toggle);

  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByText("Item 1.1")).not.toBeInTheDocument();
});

test("renders nested children recursively once expanded", async () => {
  const user = userEvent.setup();
  const props: TreeViewItemProps = {
    id: "item-1",
    label: "Item 1",
    children: [
      {
        id: "item-1.1",
        label: "Item 1.1",
        children: [{ id: "item-1.1.1", label: "Item 1.1.1" }],
      },
    ],
  };

  render(<TreeViewItem {...props} />);

  await user.click(screen.getByRole("treeitem", { name: "Item 1" }));
  expect(screen.queryByText("Item 1.1.1")).not.toBeInTheDocument();

  await user.click(screen.getByRole("treeitem", { name: "Item 1.1" }));
  expect(screen.getByText("Item 1.1.1")).toBeVisible();
});
