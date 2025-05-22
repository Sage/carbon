import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  BasicConfiguration,
  OutOfBoundsConfiguration,
  MultipleContainersConfiguration,
} from "./components.test-pw";

(["continuous", "onDrop"] as const).forEach((dragType) => {
  test.describe(`${dragType} dragging`, () => {
    test.describe("Basic Reordering", () => {
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
    });

    test.describe("Out of Bounds Behavior", () => {
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

      // Completing the cut-off test
      test(`should maintain order when Item 2 is dragged to Item 1 and then out of bounds`, async ({
        mount,
        page,
      }) => {
        await mount(<OutOfBoundsConfiguration />);
        const item2 = page.getByText("Item 2");
        const item1 = page.getByText("Item 1");
        const outOfBounds = page.getByText("Out of bounds");
        await item2.dragTo(item1);

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

        const draggableContainerBefore = page.getByTestId(
          "draggable-container",
        );
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

    test.describe("Multiple Containers - Cross Container Drag Prevention", () => {
      // Test dragging from Container 1 to Container 2
      test(`should not reorder Container 2 when Item 1 is dragged to Item 6`, async ({
        mount,
        page,
      }) => {
        await mount(<MultipleContainersConfiguration />);
        const item1 = page.getByText("Item 1", { exact: true });
        const item6 = page.getByText("Item 6");

        await item1.dragTo(item6);

        // Container 1 should remain unchanged
        const container1 = page.locator('[data-role="draggable-container-1"]');
        const container1Items = container1.getByText(/Item \d/);
        await expect(container1Items.nth(0)).toHaveText("Item 1");
        await expect(container1Items.nth(1)).toHaveText("Item 2");
        await expect(container1Items.nth(2)).toHaveText("Item 3");
        await expect(container1Items.nth(3)).toHaveText("Item 4");
        await expect(container1Items.nth(4)).toHaveText("Item 5");

        // Container 2 should remain unchanged
        const container2 = page.locator('[data-role="draggable-container-2"]');
        const container2Items = container2.getByText(/Item \d+/);
        await expect(container2Items.nth(0)).toHaveText("Item 6");
        await expect(container2Items.nth(1)).toHaveText("Item 7");
        await expect(container2Items.nth(2)).toHaveText("Item 8");
        await expect(container2Items.nth(3)).toHaveText("Item 9");
        await expect(container2Items.nth(4)).toHaveText("Item 10");
      });

      test(`should not reorder Container 2 when Item 2 is dragged to Item 8`, async ({
        mount,
        page,
      }) => {
        await mount(<MultipleContainersConfiguration />);
        const item2 = page.getByText("Item 2");
        const item8 = page.getByText("Item 8");

        await item2.dragTo(item8);

        // Container 1 should remain unchanged
        const container1 = page.locator('[data-role="draggable-container-1"]');
        const container1Items = container1.getByText(/Item \d/);
        await expect(container1Items.nth(0)).toHaveText("Item 1");
        await expect(container1Items.nth(1)).toHaveText("Item 2");
        await expect(container1Items.nth(2)).toHaveText("Item 3");
        await expect(container1Items.nth(3)).toHaveText("Item 4");
        await expect(container1Items.nth(4)).toHaveText("Item 5");

        // Container 2 should remain unchanged
        const container2 = page.locator('[data-role="draggable-container-2"]');
        const container2Items = container2.getByText(/Item \d+/);
        await expect(container2Items.nth(0)).toHaveText("Item 6");
        await expect(container2Items.nth(1)).toHaveText("Item 7");
        await expect(container2Items.nth(2)).toHaveText("Item 8");
        await expect(container2Items.nth(3)).toHaveText("Item 9");
        await expect(container2Items.nth(4)).toHaveText("Item 10");
      });

      test(`should not reorder Container 2 when Item 3 is dragged to Item 10`, async ({
        mount,
        page,
      }) => {
        await mount(<MultipleContainersConfiguration />);
        const item3 = page.getByText("Item 3");
        const item10 = page.getByText("Item 10");

        await item3.dragTo(item10);

        // Container 1 should remain unchanged
        const container1 = page.locator('[data-role="draggable-container-1"]');
        const container1Items = container1.getByText(/Item \d/);
        await expect(container1Items.nth(0)).toHaveText("Item 1");
        await expect(container1Items.nth(1)).toHaveText("Item 2");
        await expect(container1Items.nth(2)).toHaveText("Item 3");
        await expect(container1Items.nth(3)).toHaveText("Item 4");
        await expect(container1Items.nth(4)).toHaveText("Item 5");

        // Container 2 should remain unchanged
        const container2 = page.locator('[data-role="draggable-container-2"]');
        const container2Items = container2.getByText(/Item \d+/);
        await expect(container2Items.nth(0)).toHaveText("Item 6");
        await expect(container2Items.nth(1)).toHaveText("Item 7");
        await expect(container2Items.nth(2)).toHaveText("Item 8");
        await expect(container2Items.nth(3)).toHaveText("Item 9");
        await expect(container2Items.nth(4)).toHaveText("Item 10");
      });

      test(`should not reorder Container 2 when Item 4 is dragged to Item 7`, async ({
        mount,
        page,
      }) => {
        await mount(<MultipleContainersConfiguration />);
        const item4 = page.getByText("Item 4");
        const item7 = page.getByText("Item 7");

        await item4.dragTo(item7);

        // Container 1 should remain unchanged
        const container1 = page.locator('[data-role="draggable-container-1"]');
        const container1Items = container1.getByText(/Item \d/);
        await expect(container1Items.nth(0)).toHaveText("Item 1");
        await expect(container1Items.nth(1)).toHaveText("Item 2");
        await expect(container1Items.nth(2)).toHaveText("Item 3");
        await expect(container1Items.nth(3)).toHaveText("Item 4");
        await expect(container1Items.nth(4)).toHaveText("Item 5");

        // Container 2 should remain unchanged
        const container2 = page.locator('[data-role="draggable-container-2"]');
        const container2Items = container2.getByText(/Item \d+/);
        await expect(container2Items.nth(0)).toHaveText("Item 6");
        await expect(container2Items.nth(1)).toHaveText("Item 7");
        await expect(container2Items.nth(2)).toHaveText("Item 8");
        await expect(container2Items.nth(3)).toHaveText("Item 9");
        await expect(container2Items.nth(4)).toHaveText("Item 10");
      });

      test(`should not reorder Container 2 when Item 5 is dragged to Item 9`, async ({
        mount,
        page,
      }) => {
        await mount(<MultipleContainersConfiguration />);
        const item5 = page.getByText("Item 5");
        const item9 = page.getByText("Item 9");

        await item5.dragTo(item9);

        // Container 1 should remain unchanged
        const container1 = page.locator('[data-role="draggable-container-1"]');
        const container1Items = container1.getByText(/Item \d/);
        await expect(container1Items.nth(0)).toHaveText("Item 1");
        await expect(container1Items.nth(1)).toHaveText("Item 2");
        await expect(container1Items.nth(2)).toHaveText("Item 3");
        await expect(container1Items.nth(3)).toHaveText("Item 4");
        await expect(container1Items.nth(4)).toHaveText("Item 5");

        // Container 2 should remain unchanged
        const container2 = page.locator('[data-role="draggable-container-2"]');
        const container2Items = container2.getByText(/Item \d+/);
        await expect(container2Items.nth(0)).toHaveText("Item 6");
        await expect(container2Items.nth(1)).toHaveText("Item 7");
        await expect(container2Items.nth(2)).toHaveText("Item 8");
        await expect(container2Items.nth(3)).toHaveText("Item 9");
        await expect(container2Items.nth(4)).toHaveText("Item 10");
      });

      // Test dragging from Container 2 to Container 1
      test(`should not reorder Container 1 when Item 6 is dragged to Item 1`, async ({
        mount,
        page,
      }) => {
        await mount(<MultipleContainersConfiguration />);
        const item6 = page.getByText("Item 6");
        const item1 = page.getByText("Item 1", { exact: true });

        await item6.dragTo(item1);

        // Container 1 should remain unchanged
        const container1 = page.locator('[data-role="draggable-container-1"]');
        const container1Items = container1.getByText(/Item \d/);
        await expect(container1Items.nth(0)).toHaveText("Item 1");
        await expect(container1Items.nth(1)).toHaveText("Item 2");
        await expect(container1Items.nth(2)).toHaveText("Item 3");
        await expect(container1Items.nth(3)).toHaveText("Item 4");
        await expect(container1Items.nth(4)).toHaveText("Item 5");

        // Container 2 should remain unchanged
        const container2 = page.locator('[data-role="draggable-container-2"]');
        const container2Items = container2.getByText(/Item \d+/);
        await expect(container2Items.nth(0)).toHaveText("Item 6");
        await expect(container2Items.nth(1)).toHaveText("Item 7");
        await expect(container2Items.nth(2)).toHaveText("Item 8");
        await expect(container2Items.nth(3)).toHaveText("Item 9");
        await expect(container2Items.nth(4)).toHaveText("Item 10");
      });

      test(`should not reorder Container 1 when Item 7 is dragged to Item 3`, async ({
        mount,
        page,
      }) => {
        await mount(<MultipleContainersConfiguration />);
        const item7 = page.getByText("Item 7");
        const item3 = page.getByText("Item 3");

        await item7.dragTo(item3);

        // Container 1 should remain unchanged
        const container1 = page.locator('[data-role="draggable-container-1"]');
        const container1Items = container1.getByText(/Item \d/);
        await expect(container1Items.nth(0)).toHaveText("Item 1");
        await expect(container1Items.nth(1)).toHaveText("Item 2");
        await expect(container1Items.nth(2)).toHaveText("Item 3");
        await expect(container1Items.nth(3)).toHaveText("Item 4");
        await expect(container1Items.nth(4)).toHaveText("Item 5");

        // Container 2 should remain unchanged
        const container2 = page.locator('[data-role="draggable-container-2"]');
        const container2Items = container2.getByText(/Item \d+/);
        await expect(container2Items.nth(0)).toHaveText("Item 6");
        await expect(container2Items.nth(1)).toHaveText("Item 7");
        await expect(container2Items.nth(2)).toHaveText("Item 8");
        await expect(container2Items.nth(3)).toHaveText("Item 9");
        await expect(container2Items.nth(4)).toHaveText("Item 10");
      });

      test(`should not reorder Container 1 when Item 8 is dragged to Item 5`, async ({
        mount,
        page,
      }) => {
        await mount(<MultipleContainersConfiguration />);
        const item8 = page.getByText("Item 8");
        const item5 = page.getByText("Item 5");

        await item8.dragTo(item5);

        // Container 1 should remain unchanged
        const container1 = page.locator('[data-role="draggable-container-1"]');
        const container1Items = container1.getByText(/Item \d/);
        await expect(container1Items.nth(0)).toHaveText("Item 1");
        await expect(container1Items.nth(1)).toHaveText("Item 2");
        await expect(container1Items.nth(2)).toHaveText("Item 3");
        await expect(container1Items.nth(3)).toHaveText("Item 4");
        await expect(container1Items.nth(4)).toHaveText("Item 5");

        // Container 2 should remain unchanged
        const container2 = page.locator('[data-role="draggable-container-2"]');
        const container2Items = container2.getByText(/Item \d+/);
        await expect(container2Items.nth(0)).toHaveText("Item 6");
        await expect(container2Items.nth(1)).toHaveText("Item 7");
        await expect(container2Items.nth(2)).toHaveText("Item 8");
        await expect(container2Items.nth(3)).toHaveText("Item 9");
        await expect(container2Items.nth(4)).toHaveText("Item 10");
      });

      test(`should not reorder Container 1 when Item 9 is dragged to Item 2`, async ({
        mount,
        page,
      }) => {
        await mount(<MultipleContainersConfiguration />);
        const item9 = page.getByText("Item 9");
        const item2 = page.getByText("Item 2");

        await item9.dragTo(item2);

        // Container 1 should remain unchanged
        const container1 = page.locator('[data-role="draggable-container-1"]');
        const container1Items = container1.getByText(/Item \d/);
        await expect(container1Items.nth(0)).toHaveText("Item 1");
        await expect(container1Items.nth(1)).toHaveText("Item 2");
        await expect(container1Items.nth(2)).toHaveText("Item 3");
        await expect(container1Items.nth(3)).toHaveText("Item 4");
        await expect(container1Items.nth(4)).toHaveText("Item 5");

        // Container 2 should remain unchanged
        const container2 = page.locator('[data-role="draggable-container-2"]');
        const container2Items = container2.getByText(/Item \d+/);
        await expect(container2Items.nth(0)).toHaveText("Item 6");
        await expect(container2Items.nth(1)).toHaveText("Item 7");
        await expect(container2Items.nth(2)).toHaveText("Item 8");
        await expect(container2Items.nth(3)).toHaveText("Item 9");
        await expect(container2Items.nth(4)).toHaveText("Item 10");
      });

      test(`should not reorder Container 1 when Item 10 is dragged to Item 4`, async ({
        mount,
        page,
      }) => {
        await mount(<MultipleContainersConfiguration />);
        const item10 = page.getByText("Item 10");
        const item4 = page.getByText("Item 4");

        await item10.dragTo(item4);

        // Container 1 should remain unchanged
        const container1 = page.locator('[data-role="draggable-container-1"]');
        const container1Items = container1.getByText(/Item \d/);
        await expect(container1Items.nth(0)).toHaveText("Item 1");
        await expect(container1Items.nth(1)).toHaveText("Item 2");
        await expect(container1Items.nth(2)).toHaveText("Item 3");
        await expect(container1Items.nth(3)).toHaveText("Item 4");
        await expect(container1Items.nth(4)).toHaveText("Item 5");

        // Container 2 should remain unchanged
        const container2 = page.locator('[data-role="draggable-container-2"]');
        const container2Items = container2.getByText(/Item \d+/);
        await expect(container2Items.nth(0)).toHaveText("Item 6");
        await expect(container2Items.nth(1)).toHaveText("Item 7");
        await expect(container2Items.nth(2)).toHaveText("Item 8");
        await expect(container2Items.nth(3)).toHaveText("Item 9");
        await expect(container2Items.nth(4)).toHaveText("Item 10");
      });
    });
  });
});
