import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";

import {
  SimpleDraggable,
  WithDraggableCheckbox,
  WithMultipleContainers,
} from "../../../src/components/draggable/components.test-pw";

test("dragging an item downwards and dropping it on another within the same container should reorder the items", async ({
  mount,
  page,
}) => {
  await mount(<SimpleDraggable />);

  const apple = page.getByText("Apple");
  const venus = page.getByText("Venus");
  await apple.dragTo(venus);

  const allItems = page.getByTestId("draggable-item");
  await expect(allItems).toHaveCount(3);
  await expect(allItems).toHaveText(["Mercury", "Venus", "Apple"]);
});

test("dragging an item upwards and dropping it on another within the same container should reorder the items", async ({
  mount,
  page,
}) => {
  await mount(<SimpleDraggable />);

  const venus = page.getByText("Venus");
  const apple = page.getByText("Apple");
  await venus.dragTo(apple);

  const allItems = page.getByTestId("draggable-item");
  await expect(allItems).toHaveCount(3);
  await expect(allItems).toHaveText(["Venus", "Apple", "Mercury"]);
});

test("dragging an item and dropping it in its current location does not change the overall item order", async ({
  mount,
  page,
}) => {
  await mount(<SimpleDraggable />);

  const apple = page.getByText("Apple");
  await apple.dragTo(apple);

  const allItems = page.getByTestId("draggable-item");
  await expect(allItems).toHaveCount(3);
  await expect(allItems).toHaveText(["Apple", "Mercury", "Venus"]);
});

test("cannot drag and drop an item from one container to another", async ({
  mount,
  page,
}) => {
  await mount(<WithMultipleContainers />);

  const pluto = page.getByText("pluto");
  const apple = page.getByText("apple");
  await pluto.dragTo(apple);

  const fruits = page.getByTestId("fruits").getByTestId("draggable-item");
  const planets = page.getByTestId("planets").getByTestId("draggable-item");
  await expect(fruits).toHaveCount(3);
  await expect(planets).toHaveCount(1);
  await expect(fruits).toHaveText(["Apple", "Mango", "Cherry"]);
  await expect(planets).toHaveText(["Pluto"]);
});

test("calls container's getOrder callback with the correct arguments when an item is dragged and dropped within it", async ({
  mount,
  page,
}) => {
  let getOrderArgs: [unknown, unknown];
  await mount(
    <SimpleDraggable
      getOrder={(draggableItemIds, movedItemId) => {
        getOrderArgs = [draggableItemIds, movedItemId];
      }}
    />,
  );

  const apple = page.getByText("Apple");
  const venus = page.getByText("Venus");
  await apple.dragTo(venus);

  await expect
    .poll(() => getOrderArgs)
    .toEqual([["mercury", "venus", "apple"], "apple"]);
});

test("calls fruit container's getOrder callback with correct arguments when a planet item is attempted to be dragged and dropped into the fruit container", async ({
  mount,
  page,
}) => {
  let getOrderArgs: [unknown, unknown];
  await mount(
    <WithMultipleContainers
      getOrder={(draggableItemIds, movedItemId) => {
        getOrderArgs = [draggableItemIds, movedItemId];
      }}
    />,
  );

  const pluto = page.getByText("Pluto");
  const apple = page.getByText("Apple");
  await pluto.dragTo(apple);

  await expect
    .poll(() => getOrderArgs)
    .toEqual([["apple", "mango", "cherry"], "pluto"]);
});

test("an draggable item's rendered element is hidden from view while the item is being dragged", async ({
  mount,
  page,
}) => {
  await mount(<SimpleDraggable />);

  const apple = page.getByTestId("draggable-item").filter({ hasText: "Apple" });
  const viewportSize = page.viewportSize();

  if (!viewportSize) throw new Error("Unable to retrieve viewport size");

  // Drag item "Apple" to centre of the screen without dropping
  await apple.hover();
  await page.mouse.down();
  await page.mouse.move(viewportSize.width / 2, viewportSize.height / 2);

  await expect(apple).toHaveCSS("opacity", "0");

  await page.mouse.up();
});

test("can still check a draggable checkbox that has been dragged and dropped previously", async ({
  mount,
  page,
}) => {
  await mount(<WithDraggableCheckbox />);

  const apple = page.getByTestId("draggable-item").filter({
    hasText: "Apple",
  });
  const neptune = page.getByText("Neptune");
  await apple.dragTo(neptune);

  const checkbox = apple.getByRole("checkbox");
  await checkbox.check();

  await expect(checkbox).toBeChecked();
});

test("Accessibility tests pass for SimpleDraggable example", async ({
  mount,
  page,
}) => {
  await mount(<SimpleDraggable />);

  await checkAccessibility(page);
});

test("Accessibility tests pass for WithDraggableCheckbox example", async ({
  mount,
  page,
}) => {
  await mount(<WithDraggableCheckbox />);

  await checkAccessibility(page);
});

test("Accessibility tests pass for WithMultipleContainers example", async ({
  mount,
  page,
}) => {
  await mount(<WithMultipleContainers />);

  await checkAccessibility(page);
});
