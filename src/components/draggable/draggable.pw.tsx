import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  checkAccessibility,
  getStyle,
} from "../../../playwright/support/helper";

import {
  SimpleDraggable,
  WithDraggableCheckbox,
  WithMultipleContainers,
} from "../../../src/components/draggable/components.test-pw";
import DraggableContainer from "./draggable-container.component";
import DraggableItem from "./draggable-item/draggable-item.component";

type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

test("dragging an item over another then dropping it in the indicated space swaps both items' positions", async ({
  mount,
  page,
}) => {
  await mount(<SimpleDraggable />);

  const dragged = page.getByText("Apple");
  const target = page.getByText("Venus");

  await expect(dragged).toBeVisible();
  await expect(target).toBeVisible();

  await dragged.dragTo(target);

  const allItems = page.getByTestId("draggable-item");
  await expect(allItems).toHaveCount(3);
  await expect(allItems).toHaveText(["Mercury", "Venus", "Apple"]);
});

test("dragging and dropping an item to its current location does not change the overall item order", async ({
  mount,
  page,
}) => {
  await mount(<SimpleDraggable />);

  const dragged = page.getByText("Apple");
  await dragged.dragTo(dragged);

  const allItems = page.getByTestId("draggable-item");
  await expect(allItems).toHaveCount(3);
  await expect(allItems).toHaveText(["Apple", "Mercury", "Venus"]);
});

test("positions dragged item above target, when dropped near its top edge", async ({
  mount,
  page,
}) => {
  await mount(<SimpleDraggable />);

  const dragged = page.getByText("Apple");
  const target = page.getByText("Venus");

  await dragged.hover();
  await page.mouse.down();

  // Move to bottom half of Venus
  let targetBox = (await target.boundingBox()) as BoundingBox;
  await page.mouse.move(targetBox.x, targetBox.y + targetBox.height);

  // Move to top half of target
  targetBox = (await target.boundingBox()) as BoundingBox;
  await page.mouse.move(targetBox.x, targetBox.y);

  await page.mouse.up();

  const allItems = page.getByTestId("draggable-item");
  await expect(allItems).toHaveCount(3);
  await expect(allItems).toHaveText(["Mercury", "Apple", "Venus"]);
});

test("positions dragged item below target, when dropped near its bottom edge", async ({
  mount,
  page,
}) => {
  await mount(<SimpleDraggable />);

  const dragged = page.getByText("Venus");
  const target = page.getByText("Apple");

  await dragged.hover();
  await page.mouse.down();

  // Move to top half of Apple
  let targetBox = (await target.boundingBox()) as BoundingBox;
  await page.mouse.move(targetBox.x, targetBox.y);

  // Move to bottom half of Apple
  targetBox = (await target.boundingBox()) as BoundingBox;
  await page.mouse.move(targetBox.x, targetBox.y + targetBox.height);

  await page.mouse.up();

  const allItems = page.getByTestId("draggable-item");
  await expect(allItems).toHaveCount(3);
  await expect(allItems).toHaveText(["Apple", "Venus", "Mercury"]);
});

test("cannot drag and drop an item outside its container", async ({
  mount,
  page,
}) => {
  const PAGE_HEIGHT = 1000;
  const PAGE_WIDTH = 1000;

  await mount(<SimpleDraggable />);
  await page.setViewportSize({ width: PAGE_WIDTH, height: PAGE_HEIGHT });

  const apple = page.getByText("Apple");
  const appleBox = (await apple.boundingBox()) as BoundingBox;

  await page.mouse.move(appleBox.x, appleBox.y);
  await page.mouse.down();
  await page.mouse.move(PAGE_WIDTH, PAGE_HEIGHT);
  await page.mouse.up();

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

test("reordering items in one container does not affect the other, even when they have items with the same ids", async ({
  mount,
  page,
}) => {
  await mount(
    <>
      <DraggableContainer data-role="fruits-container">
        <DraggableItem id={0}>Apple</DraggableItem>
        <DraggableItem id={1}>Banana</DraggableItem>
      </DraggableContainer>
      <DraggableContainer data-role="planets-container">
        <DraggableItem id={0}>Mercury</DraggableItem>
        <DraggableItem id={1}>Venus</DraggableItem>
      </DraggableContainer>
    </>,
  );

  const apple = page.getByText("Apple");
  const banana = page.getByText("Banana");
  await apple.dragTo(banana);

  const planets = page
    .getByTestId("planets-container")
    .getByTestId("draggable-item");

  await expect(planets).not.toHaveText(["Venus", "Mercury"]);
});

test("calls container's getOrder callback when an item is dragged and dropped within it", async ({
  mount,
  page,
}) => {
  let getOrderArgs: unknown;
  await mount(
    <SimpleDraggable
      getOrder={(...args) => {
        getOrderArgs = args;
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

test("does not call container's getOrder callback when attempting to drag and drop an item into a different container", async ({
  mount,
  page,
}) => {
  let getOrderArgs: unknown;
  await mount(
    <WithMultipleContainers
      getOrder={(...args) => {
        getOrderArgs = args;
      }}
    />,
  );

  const pluto = page.getByText("Pluto");
  const apple = page.getByText("Apple");
  await pluto.dragTo(apple);

  expect(getOrderArgs).toBeUndefined();
});

test("dragged item is no longer rendered when dragged out of its initial position", async ({
  mount,
  page,
}) => {
  const PAGE_HEIGHT = 1000;
  const PAGE_WIDTH = 1000;

  await mount(<SimpleDraggable />);
  await page.setViewportSize({ width: PAGE_WIDTH, height: PAGE_HEIGHT });

  const apple = page.getByTestId("draggable-item").filter({ hasText: "Apple" });
  const venus = page.getByTestId("draggable-item").filter({ hasText: "Venus" });

  const venusBox = (await venus.boundingBox()) as BoundingBox;

  await apple.hover();
  await page.mouse.down();
  await page.mouse.move(
    venusBox.x + venusBox.width / 2,
    venusBox.y + venusBox.height / 2,
  );
  await expect(apple).toHaveCSS("display", "none");

  await page.mouse.up();
});

test("item renders shadow below it, when a dragged item is over the bottom half of it", async ({
  mount,
  page,
}) => {
  await mount(<SimpleDraggable />);

  const apple = page.getByTestId("draggable-item").filter({ hasText: "Apple" });
  const venus = page.getByTestId("draggable-item").filter({ hasText: "Venus" });

  const appleBox = (await apple.boundingBox()) as BoundingBox;

  const venusBox = (await venus.boundingBox()) as BoundingBox;

  await apple.hover();
  await page.mouse.down();
  await page.mouse.move(venusBox.x, venusBox.y + venusBox.height - 1);

  const shadowContent = await getStyle(venus, "content", "after");
  const shadowDisplay = await getStyle(venus, "display", "after");
  const shadowHeight = await getStyle(venus, "height", "after");

  expect(shadowContent).toBeTruthy();
  expect(shadowDisplay).toBe("block");
  expect(shadowHeight).toBe(`${appleBox.height}px`);

  await page.mouse.up();
});

test("item renders shadow above it, when a dragged item is over the top half of it", async ({
  mount,
  page,
}) => {
  await mount(<SimpleDraggable />);

  const apple = page.getByTestId("draggable-item").filter({ hasText: "Apple" });
  const venus = page.getByTestId("draggable-item").filter({ hasText: "Venus" });

  const appleBox = (await apple.boundingBox()) as BoundingBox;

  const venusBox = (await venus.boundingBox()) as BoundingBox;

  await apple.hover();
  await page.mouse.down();
  await page.mouse.move(venusBox.x, venusBox.y + 1);

  const shadowContent = await getStyle(venus, "content", "before");
  const shadowDisplay = await getStyle(venus, "display", "before");
  const shadowHeight = await getStyle(venus, "height", "before");

  expect(shadowContent).toBeTruthy();
  expect(shadowDisplay).toBe("block");
  expect(shadowHeight).toBe(`${appleBox.height}px`);

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
  await checkbox.click();

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
