import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  BasicConfiguration,
  OutOfBoundsConfiguration,
} from "./components.test-pw";

(["continuous", "onDrop"] as const).forEach((dragType) => {
  test.describe(`${dragType} dragging`, () => {
    test(`should complete a basic drag from Item 1 to Item 2`, async ({
      mount,
      page,
    }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item1 = page.getByText("Item 1");
      const item2 = page.getByText("Item 2");
      await item1.dragTo(item2);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 2");
      await expect(items.nth(1)).toHaveText("Item 1");
      await expect(items.nth(2)).toHaveText("Item 3");
      await expect(items.nth(3)).toHaveText("Item 4");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should drag Item 1 to Item 3`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item1 = page.getByText("Item 1");
      const item3 = page.getByText("Item 3");
      await item1.dragTo(item3);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 2");
      await expect(items.nth(1)).toHaveText("Item 3");
      await expect(items.nth(2)).toHaveText("Item 1");
      await expect(items.nth(3)).toHaveText("Item 4");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should drag Item 1 to Item 4`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item1 = page.getByText("Item 1");
      const item4 = page.getByText("Item 4");
      await item1.dragTo(item4);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 2");
      await expect(items.nth(1)).toHaveText("Item 3");
      await expect(items.nth(2)).toHaveText("Item 4");
      await expect(items.nth(3)).toHaveText("Item 1");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should drag Item 1 to Item 5`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item1 = page.getByText("Item 1");
      const item5 = page.getByText("Item 5");
      await item1.dragTo(item5);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 2");
      await expect(items.nth(1)).toHaveText("Item 3");
      await expect(items.nth(2)).toHaveText("Item 4");
      await expect(items.nth(3)).toHaveText("Item 5");
      await expect(items.nth(4)).toHaveText("Item 1");
    });

    test(`should drag Item 2 to Item 1`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item2 = page.getByText("Item 2");
      const item1 = page.getByText("Item 1");
      await item2.dragTo(item1);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 2");
      await expect(items.nth(1)).toHaveText("Item 1");
      await expect(items.nth(2)).toHaveText("Item 3");
      await expect(items.nth(3)).toHaveText("Item 4");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should drag Item 2 to Item 3`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item2 = page.getByText("Item 2");
      const item3 = page.getByText("Item 3");
      await item2.dragTo(item3);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 3");
      await expect(items.nth(2)).toHaveText("Item 2");
      await expect(items.nth(3)).toHaveText("Item 4");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should drag Item 2 to Item 4`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item2 = page.getByText("Item 2");
      const item4 = page.getByText("Item 4");
      await item2.dragTo(item4);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 3");
      await expect(items.nth(2)).toHaveText("Item 4");
      await expect(items.nth(3)).toHaveText("Item 2");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should drag Item 2 to Item 5`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item2 = page.getByText("Item 2");
      const item5 = page.getByText("Item 5");
      await item2.dragTo(item5);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 3");
      await expect(items.nth(2)).toHaveText("Item 4");
      await expect(items.nth(3)).toHaveText("Item 5");
      await expect(items.nth(4)).toHaveText("Item 2");
    });

    test(`should drag Item 3 to Item 1`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item3 = page.getByText("Item 3");
      const item1 = page.getByText("Item 1");
      await item3.dragTo(item1);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 3");
      await expect(items.nth(1)).toHaveText("Item 1");
      await expect(items.nth(2)).toHaveText("Item 2");
      await expect(items.nth(3)).toHaveText("Item 4");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should drag Item 3 to Item 2`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item3 = page.getByText("Item 3");
      const item2 = page.getByText("Item 2");
      await item3.dragTo(item2);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 3");
      await expect(items.nth(2)).toHaveText("Item 2");
      await expect(items.nth(3)).toHaveText("Item 4");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should drag Item 3 to Item 4`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item3 = page.getByText("Item 3");
      const item4 = page.getByText("Item 4");
      await item3.dragTo(item4);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 2");
      await expect(items.nth(2)).toHaveText("Item 4");
      await expect(items.nth(3)).toHaveText("Item 3");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should drag Item 3 to Item 5`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item3 = page.getByText("Item 3");
      const item5 = page.getByText("Item 5");
      await item3.dragTo(item5);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 2");
      await expect(items.nth(2)).toHaveText("Item 4");
      await expect(items.nth(3)).toHaveText("Item 5");
      await expect(items.nth(4)).toHaveText("Item 3");
    });

    test(`should drag Item 4 to Item 1`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item4 = page.getByText("Item 4");
      const item1 = page.getByText("Item 1");
      await item4.dragTo(item1);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 4");
      await expect(items.nth(1)).toHaveText("Item 1");
      await expect(items.nth(2)).toHaveText("Item 2");
      await expect(items.nth(3)).toHaveText("Item 3");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should drag Item 4 to Item 2`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item4 = page.getByText("Item 4");
      const item2 = page.getByText("Item 2");
      await item4.dragTo(item2);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 4");
      await expect(items.nth(2)).toHaveText("Item 2");
      await expect(items.nth(3)).toHaveText("Item 3");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should drag Item 4 to Item 3`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item4 = page.getByText("Item 4");
      const item3 = page.getByText("Item 3");
      await item4.dragTo(item3);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 2");
      await expect(items.nth(2)).toHaveText("Item 4");
      await expect(items.nth(3)).toHaveText("Item 3");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should drag Item 4 to Item 5`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item4 = page.getByText("Item 4");
      const item5 = page.getByText("Item 5");
      await item4.dragTo(item5);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 2");
      await expect(items.nth(2)).toHaveText("Item 3");
      await expect(items.nth(3)).toHaveText("Item 5");
      await expect(items.nth(4)).toHaveText("Item 4");
    });

    test(`should drag Item 5 to Item 1`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item5 = page.getByText("Item 5");
      const item1 = page.getByText("Item 1");
      await item5.dragTo(item1);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 5");
      await expect(items.nth(1)).toHaveText("Item 1");
      await expect(items.nth(2)).toHaveText("Item 2");
      await expect(items.nth(3)).toHaveText("Item 3");
      await expect(items.nth(4)).toHaveText("Item 4");
    });

    test(`should drag Item 5 to Item 2`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item5 = page.getByText("Item 5");
      const item2 = page.getByText("Item 2");
      await item5.dragTo(item2);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 5");
      await expect(items.nth(2)).toHaveText("Item 2");
      await expect(items.nth(3)).toHaveText("Item 3");
      await expect(items.nth(4)).toHaveText("Item 4");
    });

    test(`should drag Item 5 to Item 3`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item5 = page.getByText("Item 5");
      const item3 = page.getByText("Item 3");
      await item5.dragTo(item3);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 2");
      await expect(items.nth(2)).toHaveText("Item 5");
      await expect(items.nth(3)).toHaveText("Item 3");
      await expect(items.nth(4)).toHaveText("Item 4");
    });

    test(`should drag Item 5 to Item 4`, async ({ mount, page }) => {
      await mount(<BasicConfiguration dragType={dragType} />);
      const item5 = page.getByText("Item 5");
      const item4 = page.getByText("Item 4");
      await item5.dragTo(item4);
      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 2");
      await expect(items.nth(2)).toHaveText("Item 3");
      await expect(items.nth(3)).toHaveText("Item 5");
      await expect(items.nth(4)).toHaveText("Item 4");
    });

    test(`should return all items to their original render state when Item 1 is dragged out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item1 = page.getByText("Item 1");
      const outOfBounds = page.getByText("Out of bounds");

      await item1.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 2");
      await expect(items.nth(2)).toHaveText("Item 3");
      await expect(items.nth(3)).toHaveText("Item 4");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should return all items to their original render state when Item 2 is dragged out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item2 = page.getByText("Item 2");
      const outOfBounds = page.getByText("Out of bounds");

      await item2.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 2");
      await expect(items.nth(2)).toHaveText("Item 3");
      await expect(items.nth(3)).toHaveText("Item 4");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should return all items to their original render state when Item 3 is dragged out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item3 = page.getByText("Item 3");
      const outOfBounds = page.getByText("Out of bounds");

      await item3.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 2");
      await expect(items.nth(2)).toHaveText("Item 3");
      await expect(items.nth(3)).toHaveText("Item 4");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should return all items to their original render state when Item 4 is dragged out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item4 = page.getByText("Item 4");
      const outOfBounds = page.getByText("Out of bounds");

      await item4.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 2");
      await expect(items.nth(2)).toHaveText("Item 3");
      await expect(items.nth(3)).toHaveText("Item 4");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should return all items to their original render state when Item 5 is dragged out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item5 = page.getByText("Item 5");
      const outOfBounds = page.getByText("Out of bounds");

      await item5.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 2");
      await expect(items.nth(2)).toHaveText("Item 3");
      await expect(items.nth(3)).toHaveText("Item 4");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should maintain order when Item 1 is dragged to Item 2 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item1 = page.getByText("Item 1");
      const item2 = page.getByText("Item 2");
      const outOfBounds = page.getByText("Out of bounds");
      await item1.dragTo(item2);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 2");
      await expect(itemsBefore.nth(1)).toHaveText("Item 1");
      await expect(itemsBefore.nth(2)).toHaveText("Item 3");
      await expect(itemsBefore.nth(3)).toHaveText("Item 4");
      await expect(itemsBefore.nth(4)).toHaveText("Item 5");

      await item1.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 2");
      await expect(items.nth(1)).toHaveText("Item 1");
      await expect(items.nth(2)).toHaveText("Item 3");
      await expect(items.nth(3)).toHaveText("Item 4");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should maintain order when Item 1 is dragged to Item 3 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item1 = page.getByText("Item 1");
      const item3 = page.getByText("Item 3");
      const outOfBounds = page.getByText("Out of bounds");
      await item1.dragTo(item3);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 2");
      await expect(itemsBefore.nth(1)).toHaveText("Item 3");
      await expect(itemsBefore.nth(2)).toHaveText("Item 1");
      await expect(itemsBefore.nth(3)).toHaveText("Item 4");
      await expect(itemsBefore.nth(4)).toHaveText("Item 5");

      await item1.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 2");
      await expect(items.nth(1)).toHaveText("Item 3");
      await expect(items.nth(2)).toHaveText("Item 1");
      await expect(items.nth(3)).toHaveText("Item 4");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should maintain order when Item 1 is dragged to Item 4 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item1 = page.getByText("Item 1");
      const item4 = page.getByText("Item 4");
      const outOfBounds = page.getByText("Out of bounds");
      await item1.dragTo(item4);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 2");
      await expect(itemsBefore.nth(1)).toHaveText("Item 3");
      await expect(itemsBefore.nth(2)).toHaveText("Item 4");
      await expect(itemsBefore.nth(3)).toHaveText("Item 1");
      await expect(itemsBefore.nth(4)).toHaveText("Item 5");

      await item1.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 2");
      await expect(items.nth(1)).toHaveText("Item 3");
      await expect(items.nth(2)).toHaveText("Item 4");
      await expect(items.nth(3)).toHaveText("Item 1");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should maintain order when Item 1 is dragged to Item 5 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item1 = page.getByText("Item 1");
      const item5 = page.getByText("Item 5");
      const outOfBounds = page.getByText("Out of bounds");
      await item1.dragTo(item5);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 2");
      await expect(itemsBefore.nth(1)).toHaveText("Item 3");
      await expect(itemsBefore.nth(2)).toHaveText("Item 4");
      await expect(itemsBefore.nth(3)).toHaveText("Item 5");
      await expect(itemsBefore.nth(4)).toHaveText("Item 1");

      await item1.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 2");
      await expect(items.nth(1)).toHaveText("Item 3");
      await expect(items.nth(2)).toHaveText("Item 4");
      await expect(items.nth(3)).toHaveText("Item 5");
      await expect(items.nth(4)).toHaveText("Item 1");
    });

    test(`should maintain order when Item 2 is dragged to Item 1 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item2 = page.getByText("Item 2");
      const item1 = page.getByText("Item 1");
      const outOfBounds = page.getByText("Out of bounds");
      await item2.dragTo(item1);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 2");
      await expect(itemsBefore.nth(1)).toHaveText("Item 1");
      await expect(itemsBefore.nth(2)).toHaveText("Item 3");
      await expect(itemsBefore.nth(3)).toHaveText("Item 4");
      await expect(itemsBefore.nth(4)).toHaveText("Item 5");

      await item2.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 2");
      await expect(items.nth(1)).toHaveText("Item 1");
      await expect(items.nth(2)).toHaveText("Item 3");
      await expect(items.nth(3)).toHaveText("Item 4");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should maintain order when Item 2 is dragged to Item 3 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item2 = page.getByText("Item 2");
      const item3 = page.getByText("Item 3");
      const outOfBounds = page.getByText("Out of bounds");
      await item2.dragTo(item3);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 1");
      await expect(itemsBefore.nth(1)).toHaveText("Item 3");
      await expect(itemsBefore.nth(2)).toHaveText("Item 2");
      await expect(itemsBefore.nth(3)).toHaveText("Item 4");
      await expect(itemsBefore.nth(4)).toHaveText("Item 5");

      await item2.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 3");
      await expect(items.nth(2)).toHaveText("Item 2");
      await expect(items.nth(3)).toHaveText("Item 4");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should maintain order when Item 2 is dragged to Item 4 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item2 = page.getByText("Item 2");
      const item4 = page.getByText("Item 4");
      const outOfBounds = page.getByText("Out of bounds");
      await item2.dragTo(item4);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 1");
      await expect(itemsBefore.nth(1)).toHaveText("Item 3");
      await expect(itemsBefore.nth(2)).toHaveText("Item 4");
      await expect(itemsBefore.nth(3)).toHaveText("Item 2");
      await expect(itemsBefore.nth(4)).toHaveText("Item 5");

      await item2.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 3");
      await expect(items.nth(2)).toHaveText("Item 4");
      await expect(items.nth(3)).toHaveText("Item 2");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should maintain order when Item 2 is dragged to Item 5 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item2 = page.getByText("Item 2");
      const item5 = page.getByText("Item 5");
      const outOfBounds = page.getByText("Out of bounds");
      await item2.dragTo(item5);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 1");
      await expect(itemsBefore.nth(1)).toHaveText("Item 3");
      await expect(itemsBefore.nth(2)).toHaveText("Item 4");
      await expect(itemsBefore.nth(3)).toHaveText("Item 5");
      await expect(itemsBefore.nth(4)).toHaveText("Item 2");

      await item2.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 3");
      await expect(items.nth(2)).toHaveText("Item 4");
      await expect(items.nth(3)).toHaveText("Item 5");
      await expect(items.nth(4)).toHaveText("Item 2");
    });

    test(`should maintain order when Item 3 is dragged to Item 1 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item3 = page.getByText("Item 3");
      const item1 = page.getByText("Item 1");
      const outOfBounds = page.getByText("Out of bounds");
      await item3.dragTo(item1);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 3");
      await expect(itemsBefore.nth(1)).toHaveText("Item 1");
      await expect(itemsBefore.nth(2)).toHaveText("Item 2");
      await expect(itemsBefore.nth(3)).toHaveText("Item 4");
      await expect(itemsBefore.nth(4)).toHaveText("Item 5");

      await item3.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 3");
      await expect(items.nth(1)).toHaveText("Item 1");
      await expect(items.nth(2)).toHaveText("Item 2");
      await expect(items.nth(3)).toHaveText("Item 4");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should maintain order when Item 3 is dragged to Item 2 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item3 = page.getByText("Item 3");
      const item2 = page.getByText("Item 2");
      const outOfBounds = page.getByText("Out of bounds");
      await item3.dragTo(item2);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 1");
      await expect(itemsBefore.nth(1)).toHaveText("Item 3");
      await expect(itemsBefore.nth(2)).toHaveText("Item 2");
      await expect(itemsBefore.nth(3)).toHaveText("Item 4");
      await expect(itemsBefore.nth(4)).toHaveText("Item 5");

      await item3.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 3");
      await expect(items.nth(2)).toHaveText("Item 2");
      await expect(items.nth(3)).toHaveText("Item 4");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should maintain order when Item 3 is dragged to Item 4 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item3 = page.getByText("Item 3");
      const item4 = page.getByText("Item 4");
      const outOfBounds = page.getByText("Out of bounds");
      await item3.dragTo(item4);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 1");
      await expect(itemsBefore.nth(1)).toHaveText("Item 2");
      await expect(itemsBefore.nth(2)).toHaveText("Item 4");
      await expect(itemsBefore.nth(3)).toHaveText("Item 3");
      await expect(itemsBefore.nth(4)).toHaveText("Item 5");

      await item3.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 2");
      await expect(items.nth(2)).toHaveText("Item 4");
      await expect(items.nth(3)).toHaveText("Item 3");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should maintain order when Item 3 is dragged to Item 5 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item3 = page.getByText("Item 3");
      const item5 = page.getByText("Item 5");
      const outOfBounds = page.getByText("Out of bounds");
      await item3.dragTo(item5);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 1");
      await expect(itemsBefore.nth(1)).toHaveText("Item 2");
      await expect(itemsBefore.nth(2)).toHaveText("Item 4");
      await expect(itemsBefore.nth(3)).toHaveText("Item 5");
      await expect(itemsBefore.nth(4)).toHaveText("Item 3");

      await item3.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 2");
      await expect(items.nth(2)).toHaveText("Item 4");
      await expect(items.nth(3)).toHaveText("Item 5");
      await expect(items.nth(4)).toHaveText("Item 3");
    });

    test(`should maintain order when Item 4 is dragged to Item 1 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item4 = page.getByText("Item 4");
      const item1 = page.getByText("Item 1");
      const outOfBounds = page.getByText("Out of bounds");
      await item4.dragTo(item1);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 4");
      await expect(itemsBefore.nth(1)).toHaveText("Item 1");
      await expect(itemsBefore.nth(2)).toHaveText("Item 2");
      await expect(itemsBefore.nth(3)).toHaveText("Item 3");
      await expect(itemsBefore.nth(4)).toHaveText("Item 5");

      await item4.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 4");
      await expect(items.nth(1)).toHaveText("Item 1");
      await expect(items.nth(2)).toHaveText("Item 2");
      await expect(items.nth(3)).toHaveText("Item 3");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should maintain order when Item 4 is dragged to Item 2 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item4 = page.getByText("Item 4");
      const item2 = page.getByText("Item 2");
      const outOfBounds = page.getByText("Out of bounds");
      await item4.dragTo(item2);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 1");
      await expect(itemsBefore.nth(1)).toHaveText("Item 4");
      await expect(itemsBefore.nth(2)).toHaveText("Item 2");
      await expect(itemsBefore.nth(3)).toHaveText("Item 3");
      await expect(itemsBefore.nth(4)).toHaveText("Item 5");

      await item4.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 4");
      await expect(items.nth(2)).toHaveText("Item 2");
      await expect(items.nth(3)).toHaveText("Item 3");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should maintain order when Item 4 is dragged to Item 3 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item4 = page.getByText("Item 4");
      const item3 = page.getByText("Item 3");
      const outOfBounds = page.getByText("Out of bounds");
      await item4.dragTo(item3);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 1");
      await expect(itemsBefore.nth(1)).toHaveText("Item 2");
      await expect(itemsBefore.nth(2)).toHaveText("Item 4");
      await expect(itemsBefore.nth(3)).toHaveText("Item 3");
      await expect(itemsBefore.nth(4)).toHaveText("Item 5");

      await item4.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 2");
      await expect(items.nth(2)).toHaveText("Item 4");
      await expect(items.nth(3)).toHaveText("Item 3");
      await expect(items.nth(4)).toHaveText("Item 5");
    });

    test(`should maintain order when Item 4 is dragged to Item 5 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item4 = page.getByText("Item 4");
      const item5 = page.getByText("Item 5");
      const outOfBounds = page.getByText("Out of bounds");
      await item4.dragTo(item5);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 1");
      await expect(itemsBefore.nth(1)).toHaveText("Item 2");
      await expect(itemsBefore.nth(2)).toHaveText("Item 3");
      await expect(itemsBefore.nth(3)).toHaveText("Item 5");
      await expect(itemsBefore.nth(4)).toHaveText("Item 4");

      await item4.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 2");
      await expect(items.nth(2)).toHaveText("Item 3");
      await expect(items.nth(3)).toHaveText("Item 5");
      await expect(items.nth(4)).toHaveText("Item 4");
    });

    test(`should maintain order when Item 5 is dragged to Item 1 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item5 = page.getByText("Item 5");
      const item1 = page.getByText("Item 1");
      const outOfBounds = page.getByText("Out of bounds");
      await item5.dragTo(item1);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 5");
      await expect(itemsBefore.nth(1)).toHaveText("Item 1");
      await expect(itemsBefore.nth(2)).toHaveText("Item 2");
      await expect(itemsBefore.nth(3)).toHaveText("Item 3");
      await expect(itemsBefore.nth(4)).toHaveText("Item 4");

      await item5.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 5");
      await expect(items.nth(1)).toHaveText("Item 1");
      await expect(items.nth(2)).toHaveText("Item 2");
      await expect(items.nth(3)).toHaveText("Item 3");
      await expect(items.nth(4)).toHaveText("Item 4");
    });

    test(`should maintain order when Item 5 is dragged to Item 2 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item5 = page.getByText("Item 5");
      const item2 = page.getByText("Item 2");
      const outOfBounds = page.getByText("Out of bounds");
      await item5.dragTo(item2);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 1");
      await expect(itemsBefore.nth(1)).toHaveText("Item 5");
      await expect(itemsBefore.nth(2)).toHaveText("Item 2");
      await expect(itemsBefore.nth(3)).toHaveText("Item 3");
      await expect(itemsBefore.nth(4)).toHaveText("Item 4");

      await item5.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 5");
      await expect(items.nth(2)).toHaveText("Item 2");
      await expect(items.nth(3)).toHaveText("Item 3");
      await expect(items.nth(4)).toHaveText("Item 4");
    });

    test(`should maintain order when Item 5 is dragged to Item 3 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item5 = page.getByText("Item 5");
      const item3 = page.getByText("Item 3");
      const outOfBounds = page.getByText("Out of bounds");
      await item5.dragTo(item3);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 1");
      await expect(itemsBefore.nth(1)).toHaveText("Item 2");
      await expect(itemsBefore.nth(2)).toHaveText("Item 5");
      await expect(itemsBefore.nth(3)).toHaveText("Item 3");
      await expect(itemsBefore.nth(4)).toHaveText("Item 4");

      await item5.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 2");
      await expect(items.nth(2)).toHaveText("Item 5");
      await expect(items.nth(3)).toHaveText("Item 3");
      await expect(items.nth(4)).toHaveText("Item 4");
    });

    test(`should maintain order when Item 5 is dragged to Item 4 and then out of bounds`, async ({
      mount,
      page,
    }) => {
      await mount(<OutOfBoundsConfiguration />);
      const item5 = page.getByText("Item 5");
      const item4 = page.getByText("Item 4");
      const outOfBounds = page.getByText("Out of bounds");
      await item5.dragTo(item4);

      const draggableContainerBefore = page.getByTestId("draggable-container");
      const itemsBefore = draggableContainerBefore.getByText(/Item \d/);
      await expect(itemsBefore.nth(0)).toHaveText("Item 1");
      await expect(itemsBefore.nth(1)).toHaveText("Item 2");
      await expect(itemsBefore.nth(2)).toHaveText("Item 3");
      await expect(itemsBefore.nth(3)).toHaveText("Item 5");
      await expect(itemsBefore.nth(4)).toHaveText("Item 4");

      await item5.dragTo(outOfBounds);

      const draggableContainer = page.getByTestId("draggable-container");
      const items = draggableContainer.getByText(/Item \d/);
      await expect(items.nth(0)).toHaveText("Item 1");
      await expect(items.nth(1)).toHaveText("Item 2");
      await expect(items.nth(2)).toHaveText("Item 3");
      await expect(items.nth(3)).toHaveText("Item 5");
      await expect(items.nth(4)).toHaveText("Item 4");
    });
  });
});
