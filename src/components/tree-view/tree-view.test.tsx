import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TreeView from "./tree-view.component";

test("renders a tree with the given 'id' and an item for each entry", () => {
  render(
    <TreeView
      id="root"
      items={[
        { id: "item-1", label: "Item 1" },
        { id: "item-2", label: "Item 2", href: "/item-2" },
      ]}
    />,
  );

  const tree = screen.getByRole("tree");

  expect(tree).toHaveAttribute("id", "root");
  expect(screen.getByRole("treeitem", { name: "Item 1" })).toBeVisible();
  expect(screen.getByRole("link", { name: "Item 2" })).toBeVisible();
});

test("labels the tree with the 'ariaLabelledBy' prop when provided", () => {
  render(
    <>
      <h2 id="tree-heading">Files</h2>
      <TreeView
        id="root"
        ariaLabelledBy="tree-heading"
        items={[{ id: "item-1", label: "Item 1" }]}
      />
    </>,
  );

  expect(screen.getByRole("tree", { name: "Files" })).toBeInTheDocument();
});

test("renders no items when 'items' is empty", () => {
  render(<TreeView id="root" items={[]} />);

  expect(screen.getByRole("tree")).toBeEmptyDOMElement();
});

test("does not render nested items until their parent item is expanded", async () => {
  const user = userEvent.setup();

  render(
    <TreeView
      id="root"
      items={[
        {
          id: "item-1",
          label: "Item 1",
          children: [{ id: "item-1.1", label: "Item 1.1" }],
        },
      ]}
    />,
  );

  expect(screen.queryByText("Item 1.1")).not.toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Item 1" }));

  expect(screen.getByText("Item 1.1")).toBeVisible();
});
