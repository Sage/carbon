import React from "react";
import type { Locator } from "@playwright/test";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  checkAccessibility,
  getStyle,
} from "../../../playwright/support/helper";
import {
  WithDirectionalDropIndicators,
  WithBoxCardsAndTiles,
  SimpleDraggable,
  WithDraggableCheckbox,
  WithMultipleContainers,
  WithLinkedContainers,
  WithControlledLinkedContainers,
  WithCustomDraggablePanels,
  WithDraggableMenus,
  WithAnnouncedTestStory,
  WithInsertionLayout,
} from "./components.test-pw";
import { DraggableContainer, DraggableContainerGroup, DraggableItem } from ".";
import {
  DraggableDifferentContainers,
  LargeList,
} from "./draggable-test.stories";

type Bounds = NonNullable<Awaited<ReturnType<Locator["boundingBox"]>>>;

const surfaceSelectors = {
  card: '[data-component="card"]',
  tile: '[data-role="tile-wrapper"]',
};

const dropOffsets = {
  before: (_bounds: Bounds, offsetY: number) => offsetY,
  after: (bounds: Bounds) => bounds.height + 5,
};

const gapPoints = {
  bottom: (bounds: Bounds) => ({
    x: bounds.x + bounds.width / 2,
    y: bounds.y + bounds.height + 5,
  }),
  left: (bounds: Bounds) => ({
    x: bounds.x - 5,
    y: bounds.y + bounds.height / 2,
  }),
  right: (bounds: Bounds) => ({
    x: bounds.x + bounds.width + 5,
    y: bounds.y + bounds.height / 2,
  }),
};

async function getBounds(element: Locator) {
  const bounds = await element.boundingBox();
  if (!bounds) throw new Error("Expected element bounds");
  return bounds;
}

async function dragToItem(
  source: Locator,
  target: Locator,
  placement: "before" | "after",
) {
  const item = target.locator(
    'xpath=ancestor-or-self::*[@data-component="draggable-item"][1]',
  );
  const dropTarget = (await item.count()) ? item : target;
  const afterItem = placement === "after" && (await item.count()) > 0;
  const page = source.page();
  await source.hover();
  await page.mouse.down();
  await dropTarget.scrollIntoViewIfNeeded();
  const bounds = await getBounds(dropTarget);
  const x = bounds.x + bounds.width / 2;
  const y = bounds.y + (afterItem ? bounds.height + 5 : bounds.height * 0.2);
  await page.mouse.move(x, y, { steps: 3 });
  await page.mouse.move(x + 1, y + 1, { steps: 3 });
  await page.mouse.up();
}

test("reuses large-list geometry across pointer moves and refreshes it after scrolling", async ({
  mount,
  page,
}) => {
  await mount(<LargeList />);
  const list = page.getByTestId("large-list");
  const items = list.getByTestId("draggable-item");
  const target = items.nth(3);
  const bounds = await getBounds(target);
  await items.first().getByTestId("draggable-item-drag-handle").hover();
  await page.mouse.down();
  await page.mouse.move(bounds.x + 30, bounds.y + 10, { steps: 4 });
  await page.mouse.move(bounds.x + 31, bounds.y + 11, { steps: 4 });

  await expect(target).toHaveAttribute("data-drop-indicator-position", "top");

  // Let initial ResizeObserver notifications settle before counting steady-state reads.
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
  await list.evaluate((container) => {
    container.dataset.measurements = "0";
    container
      .querySelectorAll<HTMLElement>('[data-component="draggable-item"]')
      .forEach((item) => {
        const getBounds = item.getBoundingClientRect.bind(item);
        item.getBoundingClientRect = () => {
          container.dataset.measurements = String(
            Number(container.dataset.measurements) + 1,
          );
          return getBounds();
        };
      });
  });

  await page.mouse.move(bounds.x + 45, bounds.y + 12, { steps: 12 });
  await page.mouse.move(bounds.x + 65, bounds.y + 13, { steps: 12 });

  expect(Number(await list.getAttribute("data-measurements"))).toBeLessThan(
    120,
  );

  await page.getByTestId("large-list-scroll-area").evaluate((element) => {
    element.scrollTop = 240;
  });
  await page.mouse.move(bounds.x + 70, bounds.y + 14, { steps: 3 });
  await page.mouse.move(bounds.x + 75, bounds.y + 15, { steps: 3 });
  await expect
    .poll(async () => Number(await list.getAttribute("data-measurements")))
    .toBeGreaterThanOrEqual(120);

  await expect(target).not.toHaveAttribute("data-drop-indicator-position");
  await expect(list.locator("[data-drop-indicator-position]")).toHaveCount(1);
  await page.mouse.up();
});

for (const { fraction, placement, edge, expected } of [
  {
    fraction: 0,
    placement: "before",
    edge: "top",
    expected: ["A", "B", "E", "C", "D"],
  },
  {
    fraction: 0.14,
    placement: "before",
    edge: "top",
    expected: ["A", "B", "E", "C", "D"],
  },
  {
    fraction: 0.16,
    placement: "after",
    edge: "bottom",
    expected: ["A", "B", "C", "E", "D"],
  },
  {
    fraction: 0.3,
    placement: "after",
    edge: "bottom",
    expected: ["A", "B", "C", "E", "D"],
  },
]) {
  test(`inserts ${placement} with ${Math.round(fraction * 100)}% of the dragged surface past the target`, async ({
    mount,
    page,
  }) => {
    let order: unknown;
    await mount(
      <WithInsertionLayout
        getOrder={(ids) => {
          order = ids;
        }}
      />,
    );
    const items = page
      .getByTestId("insertion-target")
      .getByTestId("draggable-item");
    const target = items.filter({ hasText: "C" });
    const bounds = await getBounds(target);
    const source = items.last();
    const sourceBounds = await getBounds(source);
    const handle = source.getByTestId("draggable-item-drag-handle");
    const handleBounds = await getBounds(handle);
    const offsetY = handleBounds.y + handleBounds.height / 2 - sourceBounds.y;
    await handle.hover();
    await page.mouse.down();
    const y = bounds.y + offsetY + sourceBounds.height * fraction;
    await page.mouse.move(bounds.x + bounds.width / 2, y, { steps: 3 });
    await page.mouse.move(bounds.x + bounds.width / 2 + 1, y, { steps: 3 });

    await expect(target).toHaveAttribute("data-drop-indicator-position", edge);

    await page.mouse.up();

    await expect(items).toHaveText(expected);
    await expect.poll(() => order).toEqual(expected);
    await expect(page.locator("[data-drop-indicator-position]")).toHaveCount(0);
  });
}

test("appends when the dragged surface passes the last item by 15%", async ({
  mount,
  page,
}) => {
  await mount(<WithInsertionLayout />);
  const container = page.getByTestId("insertion-target");
  const items = container.getByTestId("draggable-item");
  const target = items.last();
  const bounds = await getBounds(target);
  const containerBounds = await getBounds(container);

  expect(containerBounds.y + containerBounds.height).toBeGreaterThan(
    bounds.y + bounds.height + 6,
  );

  const sourceBounds = await getBounds(items.first());
  const handle = items.first().getByTestId("draggable-item-drag-handle");
  const handleBounds = await getBounds(handle);
  const offsetY = handleBounds.y + handleBounds.height / 2 - sourceBounds.y;
  await handle.hover();
  await page.mouse.down();
  await page.mouse.move(
    bounds.x + bounds.width / 2,
    bounds.y + offsetY + sourceBounds.height * 0.14,
    { steps: 3 },
  );
  await page.mouse.move(
    bounds.x + bounds.width / 2 + 1,
    bounds.y + offsetY + sourceBounds.height * 0.14,
    { steps: 3 },
  );

  await expect(target).toHaveAttribute("data-drop-indicator-position", "top");

  await page.mouse.move(
    bounds.x + bounds.width / 2,
    bounds.y + offsetY + sourceBounds.height * 0.16,
    { steps: 3 },
  );
  await page.mouse.move(
    bounds.x + bounds.width / 2 + 1,
    bounds.y + offsetY + sourceBounds.height * 0.16,
    { steps: 3 },
  );

  await expect(target).toHaveAttribute(
    "data-drop-indicator-position",
    "bottom",
  );

  await page.mouse.up();

  await expect(items).toHaveText(["B", "C", "D", "E", "A"]);
});

for (const kind of ["card", "tile"] as const) {
  for (const { direction, edge } of [
    { direction: "ltr", edge: "right" },
    { direction: "rtl", edge: "left" },
  ] as const) {
    for (const sourceIndex of [1, 2]) {
      test(`${kind} drops item ${sourceIndex + 1} directly onto item ${sourceIndex + 2} in ${direction}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <WithDirectionalDropIndicators kind={kind} direction={direction} />,
        );
        const items = page.getByTestId("draggable-item");
        const source = items.nth(sourceIndex);
        const target = items.nth(sourceIndex + 1);
        const selector = surfaceSelectors[kind];
        const sourceBounds = await getBounds(source.locator(selector));
        const targetBounds = await getBounds(target.locator(selector));
        const handle = source.getByTestId("drag-handle");
        const handleBounds = await getBounds(handle);
        const x =
          targetBounds.x +
          handleBounds.x +
          handleBounds.width / 2 -
          sourceBounds.x;
        const y =
          targetBounds.y +
          handleBounds.y +
          handleBounds.height / 2 -
          sourceBounds.y;
        await handle.hover();
        await page.mouse.down();
        await page.mouse.move(x, y, { steps: 3 });
        await page.mouse.move(x, y + 1, { steps: 3 });

        await expect(target).toHaveAttribute(
          "data-drop-indicator-position",
          edge,
        );

        await page.mouse.up();
        const expected = [
          "Item 1",
          "Item 2",
          "Item 3",
          "Item 4",
          "Item 5",
          "Item 6",
        ];
        [expected[sourceIndex], expected[sourceIndex + 1]] = [
          expected[sourceIndex + 1],
          expected[sourceIndex],
        ];

        await expect(items).toHaveText(expected);
      });
    }
  }
}

test("moves the keyline after the target when entering the gap", async ({
  mount,
  page,
}) => {
  await mount(<WithInsertionLayout />);
  const items = page
    .getByTestId("insertion-target")
    .getByTestId("draggable-item");
  const target = items.nth(2);
  const bounds = await getBounds(target);
  await items.last().getByTestId("draggable-item-drag-handle").hover();
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + 5, {
    steps: 3,
  });
  await page.mouse.move(bounds.x + bounds.width / 2 + 1, bounds.y + 6, {
    steps: 3,
  });

  await expect(target).toHaveAttribute("data-drop-indicator-position", "top");

  await page.mouse.move(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height + 5,
    { steps: 3 },
  );
  await page.mouse.move(
    bounds.x + bounds.width / 2 + 1,
    bounds.y + bounds.height + 6,
    { steps: 3 },
  );

  await expect(target).toHaveAttribute(
    "data-drop-indicator-position",
    "bottom",
  );
  await page.mouse.up();
  await expect(items).toHaveText(["A", "B", "C", "E", "D"]);
});

for (const scenario of [
  {
    layout: "vertical",
    direction: "ltr",
    previous: 1,
    next: 2,
    edge: "bottom",
    expected: ["A", "B", "E", "C", "D"],
  },
  {
    layout: "grid",
    direction: "ltr",
    previous: 1,
    next: 2,
    edge: "right",
    expected: ["A", "B", "E", "C", "D"],
  },
  {
    layout: "grid",
    direction: "rtl",
    previous: 1,
    next: 2,
    edge: "left",
    expected: ["A", "B", "E", "C", "D"],
  },
  {
    layout: "grid",
    direction: "ltr",
    previous: 2,
    next: 3,
    edge: "bottom",
    expected: ["A", "B", "C", "E", "D"],
  },
] as const) {
  test(`drops into a ${scenario.layout} ${scenario.direction} gap at the ${scenario.edge} boundary`, async ({
    mount,
    page,
  }) => {
    await mount(
      <WithInsertionLayout
        layout={scenario.layout}
        direction={scenario.direction}
      />,
    );
    const items = page
      .getByTestId("insertion-target")
      .getByTestId("draggable-item");
    const target = items.nth(scenario.previous);
    const previous = await getBounds(target);
    const next = await getBounds(items.nth(scenario.next));
    const { x, y } = gapPoints[scenario.edge](previous);

    expect(next.y + next.height).toBeGreaterThan(previous.y);

    await items.last().getByTestId("draggable-item-drag-handle").hover();
    await page.mouse.down();
    await page.mouse.move(x, y, { steps: 3 });
    await page.mouse.move(x + 1, y, { steps: 3 });

    await expect(target).toHaveAttribute(
      "data-drop-indicator-position",
      scenario.edge,
    );
    await expect(page.locator("[data-drop-indicator-position]")).toHaveCount(1);
    await page.mouse.up();
    await expect(items).toHaveText([...scenario.expected]);
  });
}

test("transfers into a gap using the same insertion boundary as the keyline", async ({
  mount,
  page,
}) => {
  await mount(<WithInsertionLayout />);
  const items = page
    .getByTestId("insertion-target")
    .getByTestId("draggable-item");
  const bounds = await getBounds(items.nth(1));
  await page
    .getByTestId("insertion-source")
    .getByTestId("draggable-item-drag-handle")
    .hover();
  await page.mouse.down();
  await page.mouse.move(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height + 5,
    { steps: 3 },
  );
  await page.mouse.move(
    bounds.x + bounds.width / 2 + 1,
    bounds.y + bounds.height + 6,
    { steps: 3 },
  );

  await expect(items.nth(1)).toHaveAttribute(
    "data-drop-indicator-position",
    "bottom",
  );

  await page.mouse.up();

  await expect(items).toHaveText(["A", "B", "X", "C", "D", "E"]);
  await expect(
    page.getByTestId("insertion-source").getByTestId("draggable-item"),
  ).toHaveCount(0);
});

test("moving forwards into a gap adjusts for removing the source", async ({
  mount,
  page,
}) => {
  await mount(<WithInsertionLayout />);
  const items = page
    .getByTestId("insertion-target")
    .getByTestId("draggable-item");
  const bounds = await getBounds(items.nth(1));
  await items.first().getByTestId("draggable-item-drag-handle").hover();
  await page.mouse.down();
  await page.mouse.move(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height + 5,
    { steps: 3 },
  );
  await page.mouse.move(
    bounds.x + bounds.width / 2 + 1,
    bounds.y + bounds.height + 6,
    { steps: 3 },
  );

  await expect(items.nth(1)).toHaveAttribute(
    "data-drop-indicator-position",
    "bottom",
  );

  await page.mouse.up();

  await expect(items).toHaveText(["B", "A", "C", "D", "E"]);
});

test("cancelling over a gap clears the keyline and ghost without reporting a move", async ({
  mount,
  page,
}) => {
  let calls = 0;
  await mount(
    <WithInsertionLayout
      getOrder={() => {
        calls += 1;
      }}
    />,
  );
  const items = page
    .getByTestId("insertion-target")
    .getByTestId("draggable-item");
  const bounds = await getBounds(items.nth(1));
  await items.last().getByTestId("draggable-item-drag-handle").hover();
  await page.mouse.down();
  await page.mouse.move(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height + 5,
    { steps: 3 },
  );
  await page.mouse.move(
    bounds.x + bounds.width / 2 + 1,
    bounds.y + bounds.height + 6,
    { steps: 3 },
  );

  await expect(items.nth(1)).toHaveAttribute(
    "data-drop-indicator-position",
    "bottom",
  );

  await page.keyboard.press("Escape");
  await page.mouse.up();

  await expect(page.locator("[data-drop-indicator-position]")).toHaveCount(0);
  await expect(page.locator('[data-is-dragging="true"]')).toHaveCount(0);
  await expect(items).toHaveText(["A", "B", "C", "D", "E"]);
  expect(calls).toBe(0);
});

test("dropping in the gap before the adjacent item does not report a move", async ({
  mount,
  page,
}) => {
  let calls = 0;
  await mount(
    <WithInsertionLayout
      getOrder={() => {
        calls += 1;
      }}
    />,
  );
  const items = page
    .getByTestId("insertion-target")
    .getByTestId("draggable-item");
  const bounds = await getBounds(items.nth(1));
  await items.first().getByTestId("draggable-item-drag-handle").hover();
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y - 5, {
    steps: 3,
  });
  await page.mouse.move(bounds.x + bounds.width / 2 + 1, bounds.y - 4, {
    steps: 3,
  });

  await expect(page.locator("[data-drop-indicator-position]")).toHaveCount(0);

  await page.mouse.up();

  await expect(items).toHaveText(["A", "B", "C", "D", "E"]);
  expect(calls).toBe(0);
});

for (const { name, variant, itemCount } of [
  { name: "Default", variant: "default", itemCount: 5 },
  { name: "Flex Direction", variant: "flex-direction", itemCount: 5 },
  { name: "Custom", variant: "custom", itemCount: 4 },
] as const) {
  test(`${name} test story announces moves in screen-reader-only Typography`, async ({
    mount,
    page,
  }) => {
    await mount(<WithAnnouncedTestStory variant={variant} />);
    const status = page.getByRole("status");

    await expect(status).toHaveAttribute("aria-live", "polite");
    await expect(status).toHaveAttribute("aria-atomic", "true");
    await expect(status).toHaveCSS("position", "absolute");
    await expect(status).toHaveCSS("width", "1px");

    await dragToItem(
      page.getByTestId("draggable-item-drag-handle").first(),
      page.getByTestId("draggable-item").last(),
      "after",
    );

    await expect(status).toHaveText(
      `Draggable Label One moved to position ${itemCount} of ${itemCount}.`,
    );
  });
}

test("linked containers transfer items in both directions and into an empty container", async ({
  mount,
  page,
}) => {
  const orders: unknown[] = [];
  await mount(
    <WithLinkedContainers getOrder={(...args) => orders.push(args)} />,
  );
  const fruits = page.getByTestId("linked-fruits");
  const planets = page.getByTestId("linked-planets");
  await dragToItem(
    fruits.getByTestId("draggable-item-drag-handle").first(),
    planets.getByTestId("draggable-item"),
    "after",
  );

  await expect(fruits.getByTestId("draggable-item")).toHaveText(["Banana"]);
  await expect(planets.getByTestId("draggable-item")).toHaveText([
    "Venus",
    "Apple",
  ]);
  await expect
    .poll(() => orders)
    .toEqual([
      [["banana"], 1],
      [["venus", 1], 1],
    ]);

  await dragToItem(
    planets.getByTestId("draggable-item-drag-handle").first(),
    fruits.getByTestId("draggable-item"),
    "before",
  );

  await expect(fruits.getByTestId("draggable-item")).toHaveText([
    "Venus",
    "Banana",
  ]);
  await expect(planets.getByTestId("draggable-item")).toHaveText(["Apple"]);
  await dragToItem(
    planets.getByTestId("draggable-item-drag-handle"),
    fruits.getByTestId("draggable-item").first(),
    "before",
  );
  await expect(planets.getByTestId("draggable-item")).toHaveCount(0);

  await dragToItem(
    fruits.getByTestId("draggable-item-drag-handle").first(),
    planets,
    "after",
  );

  await expect(planets.getByTestId("draggable-item")).toHaveText(["Apple"]);
  await expect(fruits.getByTestId("draggable-item")).toHaveText([
    "Venus",
    "Banana",
  ]);
  await expect(page.locator('[data-is-dragging="true"]')).toHaveCount(0);
});

test("different linked groups remain isolated", async ({ mount, page }) => {
  await mount(
    <>
      <WithLinkedContainers />
      <WithLinkedContainers />
    </>,
  );
  const first = page.getByTestId("linked-fruits").first();
  const second = page.getByTestId("linked-planets").last();
  await dragToItem(
    first.getByTestId("draggable-item-drag-handle").first(),
    second.getByTestId("draggable-item"),
    "after",
  );

  await expect(first.getByTestId("draggable-item")).toHaveText([
    "Apple",
    "Banana",
  ]);
  await expect(second.getByTestId("draggable-item")).toHaveText(["Venus"]);
});

test("linked transfers keep parent-controlled lists and inputs synchronized", async ({
  mount,
  page,
}) => {
  await mount(<WithControlledLinkedContainers />);
  const first = page.getByTestId("controlled-first");
  const second = page.getByTestId("controlled-second");
  await dragToItem(
    first.getByTestId("draggable-item-drag-handle"),
    second.getByTestId("draggable-item"),
    "after",
  );

  await expect(first.getByTestId("draggable-item")).toHaveCount(0);
  await expect(second.getByRole("checkbox", { name: "Apple" })).toBeChecked();
  await second.getByRole("checkbox", { name: "Apple" }).uncheck();
  await expect(
    second.getByRole("checkbox", { name: "Apple" }),
  ).not.toBeChecked();
  await dragToItem(
    second.getByTestId("draggable-item-drag-handle").last(),
    second.getByTestId("draggable-item").first(),
    "before",
  );
  await expect(second.getByRole("checkbox")).toHaveCount(2);
  await expect(second.getByTestId("draggable-item").first()).toContainText(
    "Apple",
  );
  await dragToItem(
    second.getByTestId("draggable-item-drag-handle").first(),
    first,
    "after",
  );
  await expect(
    first.getByRole("checkbox", { name: "Apple" }),
  ).not.toBeChecked();
});

test("a linked group rejects duplicate IDs instead of losing an item", async ({
  mount,
  page,
}) => {
  await mount(
    <DraggableContainerGroup>
      <DraggableContainer data-role="first-container">
        <DraggableItem id={1}>Apple</DraggableItem>
      </DraggableContainer>
      <DraggableContainer data-role="second-container">
        <DraggableItem id="1">Venus</DraggableItem>
      </DraggableContainer>
    </DraggableContainerGroup>,
  );
  const first = page.getByTestId("first-container");
  const second = page.getByTestId("second-container");
  await dragToItem(
    first.getByTestId("draggable-item-drag-handle"),
    second.getByTestId("draggable-item"),
    "after",
  );

  await expect(first.getByTestId("draggable-item")).toHaveText(["Apple"]);
  await expect(second.getByTestId("draggable-item")).toHaveText(["Venus"]);
});

test("DraggableDifferentContainers transfers between its linked containers", async ({
  mount,
  page,
}) => {
  await mount(<DraggableDifferentContainers />);
  const first = page.getByTestId("draggable-container").first();
  const second = page.getByTestId("draggable-container").last();
  await dragToItem(
    first.getByTestId("draggable-item-drag-handle").first(),
    second.getByTestId("draggable-item"),
    "after",
  );
  await expect(first.getByTestId("draggable-item")).toHaveCount(2);
  await expect(second.getByTestId("draggable-item")).toHaveCount(2);
  await expect(second.getByText("Item Four", { exact: true })).toBeVisible();

  await dragToItem(
    second.getByTestId("draggable-item-drag-handle").last(),
    first.getByTestId("draggable-item").last(),
    "after",
  );
  await dragToItem(
    second.getByTestId("draggable-item-drag-handle"),
    first.getByTestId("draggable-item").last(),
    "after",
  );

  await expect(second.getByTestId("draggable-item")).toHaveCount(0);
  const bounds = await getBounds(second);
  expect(bounds.width).toBeGreaterThanOrEqual(260);
  expect(bounds.height).toBeGreaterThanOrEqual(160);
  await dragToItem(
    first.getByTestId("draggable-item-drag-handle").first(),
    second,
    "after",
  );
  await expect(second.getByTestId("draggable-item")).toHaveCount(1);
});

test("DraggableDifferentContainers supports keyboard reordering and transfers into empty containers", async ({
  mount,
  page,
}) => {
  await mount(<DraggableDifferentContainers />);
  const first = page.getByTestId("draggable-container").first();
  const second = page.getByTestId("draggable-container").last();
  const four = page.getByRole("button", {
    name: "Reorder Item Four",
    exact: true,
  });

  const openActions = async (label: string) => {
    await page
      .getByRole("button", { name: `Reorder ${label}`, exact: true })
      .focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("list").locator("button:not(:disabled)").first(),
    ).toBeFocused();
  };

  await openActions("Item Four");
  await expect(
    page.getByRole("button", { name: "Move earlier", exact: true }),
  ).toBeDisabled();

  await page.getByRole("button", { name: "Move last", exact: true }).focus();
  await page.keyboard.press("Enter");

  await expect(first.getByTestId("draggable-item").last()).toContainText(
    "Item Four",
  );
  await expect(four).toBeFocused();

  await openActions("Item Four");
  await page
    .getByRole("button", { name: "Move to second container", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await expect(second.getByText("Item Four", { exact: true })).toBeVisible();
  await expect(four).toBeFocused();
  await expect(page.getByRole("status")).toHaveText(
    "Item Four moved to the second container, position 2 of 2.",
  );

  for (const label of ["Item Five", "Item Six"]) {
    await openActions(label);
    await page
      .getByRole("button", { name: "Move to second container", exact: true })
      .focus();
    await page.keyboard.press("Enter");
  }
  await expect(first.getByTestId("draggable-item")).toHaveCount(0);
  await openActions("Item Four");
  await page
    .getByRole("button", { name: "Move to first container", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await expect(first.getByText("Item Four", { exact: true })).toBeVisible();
  await expect(four).toBeFocused();
  await expect(page.getByRole("status")).toHaveText(
    "Item Four moved to the first container, position 1 of 1.",
  );
  await checkAccessibility(page);
});

for (const [index, title, placement] of [
  [0, "Rounded article component", "after"],
  [1, "Rounded section component", "before"],
  [2, "Asymmetric article component", "after"],
  [3, "Asymmetric section component", "before"],
  [4, "Square article component", "after"],
  [5, "Square section component", "before"],
] as const) {
  test(`custom ${title} uses its internal handle and registered surface`, async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomDraggablePanels />);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByTestId("draggable-item-drag-handle")).toHaveCount(0);
    await expect(page.getByTestId("drag-handle")).toHaveCount(6);
    const surface = page.locator(`[aria-label="${title}"]`);
    const source = page.getByTestId("draggable-item").filter({ has: surface });
    await surface.getByRole("button", { name: `Increment ${title}` }).click();
    // A square registered surface must win even when its interior has rounded corners.
    await surface.getByTestId("drag-handle").evaluate((element) => {
      (element as HTMLElement).style.borderRadius = "40px";
    });
    const sourceBounds = await getBounds(source);
    const surfaceBounds = await getBounds(surface);
    const targetIndex = index ^ 1;
    const target = page.getByTestId("draggable-item").nth(targetIndex);
    const targetBounds = await getBounds(target);
    const radii = await surface.evaluate((element) => {
      const style = getComputedStyle(element);
      return [
        style.borderTopLeftRadius,
        style.borderTopRightRadius,
        style.borderBottomRightRadius,
        style.borderBottomLeftRadius,
      ];
    });
    const handle = surface.getByTestId("drag-handle");
    const handleBounds = await getBounds(handle);
    const offsetX = handleBounds.x + handleBounds.width / 2 - surfaceBounds.x;
    const offsetY = handleBounds.y + handleBounds.height / 2 - surfaceBounds.y;
    await handle.hover();
    await page.mouse.down();
    const dropX = targetBounds.x + offsetX;
    const dropY =
      targetBounds.y + dropOffsets[placement](targetBounds, offsetY);
    await page.mouse.move(dropX, dropY, { steps: 3 });
    await page.mouse.move(dropX + 1, dropY + 1, { steps: 3 });
    await expect(source).toHaveAttribute("data-is-dragging", "true");
    await expect(target).toHaveAttribute(
      "data-drop-indicator-position",
      /left|right|top|bottom/,
    );
    const lineWidth = parseFloat(await getStyle(target, "width", "::before"));
    const lineHeight = parseFloat(await getStyle(target, "height", "::before"));
    expect(Math.min(lineWidth, lineHeight)).toBe(3);
    const ghost = await source.evaluate((element) => {
      const style = getComputedStyle(element, "::after");
      return {
        top: parseFloat(style.top),
        left: parseFloat(style.left),
        width: parseFloat(style.width),
        height: parseFloat(style.height),
        radii: [
          style.borderTopLeftRadius,
          style.borderTopRightRadius,
          style.borderBottomRightRadius,
          style.borderBottomLeftRadius,
        ],
      };
    });
    expect(sourceBounds.x + ghost.left).toBeCloseTo(surfaceBounds.x, 1);
    expect(sourceBounds.y + ghost.top).toBeCloseTo(surfaceBounds.y, 1);
    expect(ghost.width).toBeCloseTo(surfaceBounds.width, 1);
    expect(ghost.height).toBeCloseTo(surfaceBounds.height, 1);
    expect(ghost.radii).toEqual(radii);
    await page.mouse.up();
    await expect(
      page.getByTestId("draggable-item").nth(targetIndex),
    ).toContainText(title);
    await expect(
      surface.getByRole("button", { name: `Increment ${title}` }),
    ).toHaveText("Clicked 1 times");
    await expect(
      page.getByRole("status").filter({ hasText: title }),
    ).toHaveText(`${title} moved to position ${targetIndex + 1} of 6.`);
    await expect(source).toHaveAttribute("data-is-dragging", "false");
  });
}

test("reorders on drop and reports the resulting order", async ({
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

  await dragToItem(
    page.getByTestId("draggable-item-drag-handle").first(),
    page.getByTestId("draggable-item").filter({ hasText: "Venus" }),
    "after",
  );

  await expect(page.getByTestId("draggable-item")).toHaveText([
    "Mercury",
    "Venus",
    "Apple",
  ]);
  await expect
    .poll(() => getOrderArgs)
    .toEqual([["mercury", "venus", "apple"], "apple"]);

  // A second drag uses the item's new index, without remounting its content.
  await dragToItem(
    page.getByTestId("draggable-item-drag-handle").last(),
    page.getByTestId("draggable-item").first(),
    "before",
  );
  await expect(page.getByTestId("draggable-item")).toHaveText([
    "Apple",
    "Mercury",
    "Venus",
  ]);
});

for (const { name, kind, label, announcementLabel, itemCount } of [
  {
    name: "Card",
    kind: "card" as const,
    label: "card 1",
    announcementLabel: "Card 1",
    itemCount: 12,
  },
  {
    name: "Custom panel",
    kind: "custom" as const,
    label: "Rounded article component",
    announcementLabel: "Rounded article component",
    itemCount: 6,
  },
]) {
  test(`${name} menu announces keyboard moves and restores focus to the moved trigger`, async ({
    mount,
    page,
  }) => {
    await mount(<WithDraggableMenus kind={kind} />);
    const actions = page.getByRole("button", {
      name: `Reorder ${label}`,
      exact: true,
    });
    const items = page.getByTestId("draggable-item");
    await actions.focus();
    await page.keyboard.press("Enter");

    await expect(
      page.getByRole("button", { name: "Move earlier", exact: true }),
    ).toBeDisabled();

    await page.getByRole("button", { name: "Move Last", exact: true }).focus();
    await page.keyboard.press("Enter");

    await expect(
      items
        .last()
        .getByRole("button", { name: `Reorder ${label}`, exact: true }),
    ).toBeVisible();
    await expect(actions).toBeFocused();
    await expect(
      page.getByRole("status").filter({ hasText: announcementLabel }),
    ).toHaveText(
      `${announcementLabel} moved to position ${itemCount} of ${itemCount}.`,
    );

    await page.keyboard.press("Enter");

    await expect(
      page.getByRole("button", { name: "Move later", exact: true }),
    ).toBeDisabled();
    await page.getByRole("button", { name: "Move First", exact: true }).focus();
    await page.keyboard.press("Enter");

    await expect(
      items
        .first()
        .getByRole("button", { name: `Reorder ${label}`, exact: true }),
    ).toBeVisible();
    await expect(actions).toBeFocused();
    await expect(
      page.getByRole("status").filter({ hasText: announcementLabel }),
    ).toHaveText(`${announcementLabel} moved to position 1 of ${itemCount}.`);
  });
}

for (const {
  direction,
  sourceIndex,
  targetIndex,
  edge,
  placement,
  expected,
} of [
  {
    direction: "up",
    sourceIndex: 2,
    targetIndex: 0,
    edge: "top",
    placement: "before",
    expected: ["Venus", "Apple", "Mercury"],
  },
  {
    direction: "down",
    sourceIndex: 0,
    targetIndex: 2,
    edge: "bottom",
    placement: "after",
    expected: ["Mercury", "Venus", "Apple"],
  },
] as const) {
  test(`shows the indicator when dragging ${direction} and preserves the item's space`, async ({
    mount,
    page,
  }) => {
    await mount(<SimpleDraggable />);
    const items = page.getByTestId("draggable-item");
    const source = items.nth(sourceIndex);
    const target = items.nth(targetIndex);
    const sourceBounds = await getBounds(source);
    const targetBounds = await getBounds(target);

    await source.getByTestId("draggable-item-drag-handle").hover();
    await page.mouse.down();
    const dropY =
      targetBounds.y +
      dropOffsets[placement](targetBounds, targetBounds.height * 0.2);
    await page.mouse.move(targetBounds.x + targetBounds.width / 2, dropY, {
      steps: 3,
    });
    await page.mouse.move(targetBounds.x + targetBounds.width / 2 + 1, dropY, {
      steps: 3,
    });

    await expect(source).toHaveAttribute("data-is-dragging", "true");
    await expect(source).not.toHaveCSS("display", "none");
    expect((await getBounds(source)).height).toBe(sourceBounds.height);
    await expect(target).toHaveAttribute("data-drop-indicator-position", edge);
    expect(await getStyle(target, "height", "::before")).toBe("3px");
    await expect(items).toHaveText(["Apple", "Mercury", "Venus"]);

    await page.mouse.up();
    await expect(items).toHaveText([...expected]);
    await expect(page.locator('[data-is-dragging="true"]')).toHaveCount(0);
    await expect(page.locator("[data-drop-indicator-position]")).toHaveCount(0);
  });
}

test("dragging content outside the handle does not reorder items", async ({
  mount,
  page,
}) => {
  await mount(<SimpleDraggable />);
  await page.getByText("Apple").dragTo(page.getByText("Venus"));
  await expect(page.getByTestId("draggable-item")).toHaveText([
    "Apple",
    "Mercury",
    "Venus",
  ]);
});

test("dropping on the source leaves its order unchanged without a callback", async ({
  mount,
  page,
}) => {
  let called = false;
  await mount(
    <SimpleDraggable
      getOrder={() => {
        called = true;
      }}
    />,
  );
  const handle = page.getByTestId("draggable-item-drag-handle").first();
  await handle.dragTo(handle);

  await expect(page.getByTestId("draggable-item")).toHaveText([
    "Apple",
    "Mercury",
    "Venus",
  ]);
  expect(called).toBe(false);
});

test("dropping outside clears the drag state and leaves the order unchanged", async ({
  mount,
  page,
}) => {
  let called = false;
  await mount(
    <SimpleDraggable
      getOrder={() => {
        called = true;
      }}
    />,
  );
  await page.getByTestId("draggable-item-drag-handle").first().hover();
  await page.mouse.down();
  await page.mouse.move(1000, 700, { steps: 3 });
  await page.mouse.move(1001, 701, { steps: 3 });
  await page.mouse.up();

  await expect(page.getByTestId("draggable-item")).toHaveText([
    "Apple",
    "Mercury",
    "Venus",
  ]);
  await expect(page.locator('[data-is-dragging="true"]')).toHaveCount(0);
  expect(called).toBe(false);
});

test("containers with overlapping IDs are isolated", async ({
  mount,
  page,
}) => {
  let called = false;
  await mount(
    <>
      <DraggableContainer
        data-role="fruits"
        getOrder={() => {
          called = true;
        }}
      >
        <DraggableItem id={0}>Apple</DraggableItem>
        <DraggableItem id={1}>Banana</DraggableItem>
      </DraggableContainer>
      <DraggableContainer data-role="planets">
        <DraggableItem id={0}>Mercury</DraggableItem>
        <DraggableItem id={1}>Venus</DraggableItem>
      </DraggableContainer>
    </>,
  );
  const fruits = page.getByTestId("fruits");
  const planets = page.getByTestId("planets");
  await dragToItem(
    planets.getByTestId("draggable-item-drag-handle").first(),
    fruits.getByTestId("draggable-item").last(),
    "after",
  );

  await expect(fruits.getByTestId("draggable-item")).toHaveText([
    "Apple",
    "Banana",
  ]);
  await expect(planets.getByTestId("draggable-item")).toHaveText([
    "Mercury",
    "Venus",
  ]);
  expect(called).toBe(false);

  await dragToItem(
    fruits.getByTestId("draggable-item-drag-handle").first(),
    fruits.getByTestId("draggable-item").last(),
    "after",
  );

  await expect(fruits.getByTestId("draggable-item")).toHaveText([
    "Banana",
    "Apple",
  ]);
  await expect(planets.getByTestId("draggable-item")).toHaveText([
    "Mercury",
    "Venus",
  ]);
});

test("checkbox content remains interactive after reordering", async ({
  mount,
  page,
}) => {
  await mount(<WithDraggableCheckbox />);
  await dragToItem(
    page.getByTestId("draggable-item-drag-handle").first(),
    page.getByText("Neptune"),
    "after",
  );
  const checkbox = page.getByRole("checkbox", { name: "Apple" });
  await checkbox.check();

  await expect(checkbox).toBeChecked();
});

test("reorders Cards and Tiles inside a child Box and preserves interactive content", async ({
  mount,
  page,
}) => {
  let getOrderArgs: unknown;
  await mount(
    <WithBoxCardsAndTiles
      getOrder={(...args) => {
        getOrderArgs = args;
      }}
    />,
  );
  const parent = page.getByTestId("custom-parent");
  const items = parent.getByTestId("draggable-item");
  const checkbox = parent.getByRole("checkbox", { name: "First card" });

  await expect(items.first().getByTestId("drag-handle")).toHaveAttribute(
    "draggable",
    "true",
  );
  await expect(
    items.first().getByTestId("draggable-item-drag-handle"),
  ).toHaveCount(0);
  await expect(
    items.nth(1).getByTestId("draggable-item-drag-handle"),
  ).toHaveCount(0);
  await expect(items.nth(1).getByTestId("drag-handle")).toHaveAttribute(
    "draggable",
    "true",
  );

  const tileContent = parent.getByTestId("tile-draggable-content");

  await expect(tileContent).toHaveCSS("flex-direction", "row");

  const firstColumn = await getBounds(parent.getByTestId("tile-first-column"));
  const secondColumn = await getBounds(
    parent.getByTestId("tile-second-column"),
  );
  const tileHandle = await getBounds(items.nth(1).getByTestId("drag-handle"));

  expect(firstColumn.y).toBe(secondColumn.y);
  expect(firstColumn.x).toBeLessThan(secondColumn.x);
  expect(tileHandle.y + tileHandle.height).toBeLessThanOrEqual(firstColumn.y);
  await expect(parent.locator('[draggable="true"]')).toHaveCount(3);

  await checkbox.check();
  await dragToItem(
    items.first().locator('[data-element="draggable-item-drag-handle"]'),
    items.last(),
    "after",
  );

  await expect(items).toHaveText(["Middle tile", "Last card", "First card"]);
  await expect
    .poll(() => getOrderArgs)
    .toEqual([["tile", "card-two", "card-one"], "card-one"]);
  await expect(checkbox).toBeChecked();
  await checkbox.uncheck();
  await expect(checkbox).not.toBeChecked();

  await dragToItem(
    items.first().locator('[data-element="draggable-item-drag-handle"]'),
    items.last(),
    "after",
  );

  await expect(items).toHaveText(["Last card", "First card", "Middle tile"]);
  await expect
    .poll(() => getOrderArgs)
    .toEqual([["card-two", "card-one", "tile"], "tile"]);
  await expect(parent).toHaveCSS("display", "flex");
  await expect(parent).toHaveCSS("flex-direction", "column");
  await checkAccessibility(page);
});

test("accessibility for SimpleDraggable", async ({ mount, page }) => {
  await mount(<SimpleDraggable />);
  await checkAccessibility(page);
});

test("accessibility for WithDraggableCheckbox", async ({ mount, page }) => {
  await mount(<WithDraggableCheckbox />);
  await checkAccessibility(page);
});

test("accessibility for WithMultipleContainers", async ({ mount, page }) => {
  await mount(<WithMultipleContainers />);
  await checkAccessibility(page);
});

test("Tile ActionPopover controls reorder with the keyboard and stay synchronized with dragging", async ({
  mount,
  page,
}) => {
  await mount(<WithDraggableMenus kind="tile" />);
  const items = page.getByTestId("draggable-item");
  const order = () =>
    items.locator('[data-role="tile-draggable-content"]').allTextContents();
  const actions = page.getByRole("button", {
    name: "Reorder tile 1",
    exact: true,
  });
  const handle = items.first().getByTestId("drag-handle");
  const handleBounds = await getBounds(handle);
  const actionsBounds = await getBounds(actions);

  expect(actionsBounds.x).toBeGreaterThan(handleBounds.x + handleBounds.width);
  expect(
    Math.abs(
      actionsBounds.y +
        actionsBounds.height / 2 -
        (handleBounds.y + handleBounds.height / 2),
    ),
  ).toBeLessThan(2);

  await actions.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Move earlier", exact: true }),
  ).toBeDisabled();
  const later = page.getByRole("button", { name: "Move later", exact: true });
  await later.focus();
  await page.keyboard.press("Enter");
  await expect
    .poll(order)
    .toEqual([
      "Tile 2",
      "Tile 1",
      "Tile 3",
      "Tile 4",
      "Tile 5",
      "Tile 6",
      "Tile 7",
      "Tile 8",
      "Tile 9",
      "Tile 10",
      "Tile 11",
      "Tile 12",
    ]);
  await expect(actions).toBeFocused();
  await expect(
    page.getByRole("status").filter({ hasText: "Tile 1" }),
  ).toHaveText("Tile 1 moved to position 2 of 12.");

  await dragToItem(
    items.nth(1).getByTestId("drag-handle"),
    items.last(),
    "after",
  );

  await expect
    .poll(order)
    .toEqual([
      "Tile 2",
      "Tile 3",
      "Tile 4",
      "Tile 5",
      "Tile 6",
      "Tile 7",
      "Tile 8",
      "Tile 9",
      "Tile 10",
      "Tile 11",
      "Tile 12",
      "Tile 1",
    ]);
  await expect(
    page.getByRole("status").filter({ hasText: "Tile 1" }),
  ).toHaveText("Tile 1 moved to position 12 of 12.");

  await actions.click();

  await expect(
    page.getByRole("button", { name: "Move later", exact: true }),
  ).toBeDisabled();

  await page.getByRole("button", { name: "Move earlier", exact: true }).click();

  await expect
    .poll(order)
    .toEqual([
      "Tile 2",
      "Tile 3",
      "Tile 4",
      "Tile 5",
      "Tile 6",
      "Tile 7",
      "Tile 8",
      "Tile 9",
      "Tile 10",
      "Tile 11",
      "Tile 1",
      "Tile 12",
    ]);

  // ActionPopover mounts its menu on demand, so axe requests manual review of
  // closed buttons' aria-controls. Verify every target exists while open.
  for (const button of await page
    .getByRole("button", { name: /^Reorder tile/ })
    .all()) {
    await button.click();

    await expect(button).toHaveAttribute("aria-expanded", "true");

    const menuId = await button.getAttribute("aria-controls");

    expect(menuId).not.toBeNull();
    await expect(page.locator(`[id="${menuId}"]`)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(button).toHaveAttribute("aria-expanded", "false");
  }
  await checkAccessibility(page);
});

for (const kind of ["card", "tile"] as const) {
  for (const scenario of [
    {
      sourceIndex: 0,
      targetIndex: 1,
      edge: "right",
      point: gapPoints.right,
      line: (surface: Bounds, neighbour: Bounds, radius: number) => ({
        top: surface.y + radius,
        left: surface.x + (surface.width + neighbour.x - surface.x - 3) / 2,
        width: 3,
        height: surface.height - 2 * radius,
      }),
    },
    {
      sourceIndex: 1,
      targetIndex: 0,
      edge: "left",
      point: (surface: Bounds) => ({
        x: surface.x + surface.width * 0.1,
        y: surface.y + surface.height / 2,
      }),
      line: (surface: Bounds, _neighbour: Bounds, radius: number) => ({
        top: surface.y + radius,
        left: surface.x - 11,
        width: 3,
        height: surface.height - 2 * radius,
      }),
    },
    {
      sourceIndex: 0,
      targetIndex: 3,
      edge: "bottom",
      point: gapPoints.bottom,
      line: (surface: Bounds, _neighbour: Bounds, radius: number) => ({
        top: surface.y + surface.height + 8,
        left: surface.x + radius,
        width: surface.width - 2 * radius,
        height: 3,
      }),
    },
    {
      sourceIndex: 3,
      targetIndex: 0,
      edge: "top",
      point: (surface: Bounds) => ({
        x: surface.x + surface.width / 2,
        y: surface.y - 5,
      }),
      line: (surface: Bounds, _neighbour: Bounds, radius: number) => ({
        top: surface.y - 11,
        left: surface.x + radius,
        width: surface.width - 2 * radius,
        height: 3,
      }),
    },
  ] as const) {
    test(`${kind} indicates ${scenario.edge} and stops before the rounded corners`, async ({
      mount,
      page,
    }) => {
      await mount(<WithDirectionalDropIndicators kind={kind} />);
      const items = page.getByTestId("draggable-item");
      const source = items.nth(scenario.sourceIndex);
      const target = items.nth(scenario.targetIndex);
      const surface = target.locator(surfaceSelectors[kind]);
      const targetBounds = await getBounds(target);
      const surfaceBounds = await getBounds(surface);
      const radius = await surface.evaluate((element) =>
        parseFloat(getComputedStyle(element).borderTopLeftRadius),
      );

      expect(radius).toBeGreaterThan(0);
      const nextSurfaceBounds = await getBounds(
        items.nth(2).locator(surfaceSelectors[kind]),
      );
      await source.getByTestId("drag-handle").hover();
      await page.mouse.down();

      const { x, y } = scenario.point(surfaceBounds);
      await page.mouse.move(x, y, { steps: 3 });
      await page.mouse.move(x + 1, y + 1, { steps: 3 });

      await expect(target).toHaveAttribute(
        "data-drop-indicator-position",
        scenario.edge,
      );
      const line = await target.evaluate((element) => {
        const style = getComputedStyle(element, "::before");
        return {
          top: parseFloat(style.top),
          left: parseFloat(style.left),
          width: parseFloat(style.width),
          height: parseFloat(style.height),
        };
      });

      const expectedLine = scenario.line(
        surfaceBounds,
        nextSurfaceBounds,
        radius,
      );

      expect(Math.min(line.width, line.height)).toBe(3);
      expect(targetBounds.y + line.top).toBeCloseTo(expectedLine.top, 1);
      expect(targetBounds.x + line.left).toBeCloseTo(expectedLine.left, 1);
      expect(line.width).toBeCloseTo(expectedLine.width, 1);
      expect(line.height).toBeCloseTo(expectedLine.height, 1);

      await page.mouse.up();
      const expected = [1, 2, 3, 4, 5, 6];
      const [moved] = expected.splice(scenario.sourceIndex, 1);
      expected.splice(scenario.targetIndex, 0, moved);

      await expect(items).toHaveText(expected.map((id) => `Item ${id}`));
      await expect(page.locator("[data-drop-indicator-position]")).toHaveCount(
        0,
      );
    });
  }
}

test("uses the left edge for a leftward move in an RTL grid", async ({
  mount,
  page,
}) => {
  await mount(<WithDirectionalDropIndicators direction="rtl" />);
  const items = page.getByTestId("draggable-item");
  const target = items.nth(1);
  const bounds = await getBounds(target.locator(surfaceSelectors.card));
  await items.first().getByTestId("drag-handle").hover();
  await page.mouse.down();
  await page.mouse.move(bounds.x - 5, bounds.y + bounds.height / 2, {
    steps: 3,
  });
  await page.mouse.move(bounds.x - 4, bounds.y + bounds.height / 2 + 1, {
    steps: 3,
  });

  await expect(target).toHaveAttribute("data-drop-indicator-position", "left");

  await page.mouse.up();

  await expect(items).toHaveText([
    "Item 2",
    "Item 1",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);
});

test("uses vertical indicators when the responsive grid wraps to one column", async ({
  mount,
  page,
}) => {
  await page.setViewportSize({ width: 340, height: 900 });
  await mount(<WithDirectionalDropIndicators kind="tile" />);
  const items = page.getByTestId("draggable-item");
  const target = items.nth(1);
  const bounds = await getBounds(target);
  await items.first().getByTestId("drag-handle").hover();
  await page.mouse.down();
  await page.mouse.move(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height + 5,
    { steps: 3 },
  );
  await page.mouse.move(
    bounds.x + bounds.width / 2 + 1,
    bounds.y + bounds.height + 6,
    { steps: 3 },
  );

  await expect(target).toHaveAttribute(
    "data-drop-indicator-position",
    "bottom",
  );

  await page.mouse.up();

  await expect(items).toHaveText([
    "Item 2",
    "Item 1",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);
});

for (const kind of ["card", "tile"] as const) {
  for (const { shape, styles } of [
    { shape: "default", styles: {} },
    {
      shape: "asymmetric",
      styles: {
        boxSizing: "border-box",
        width: "calc(100% - 24px)",
        margin: "8px 12px",
        borderTopLeftRadius: "28px 16px",
        borderTopRightRadius: "12px",
        borderBottomRightRadius: "20% 15%",
        borderBottomLeftRadius: "4px 8px",
        transition: "none",
      },
    },
  ]) {
    test(`${kind} ghost matches its ${shape} surface and preserves the layout`, async ({
      mount,
      page,
    }) => {
      await mount(<WithDirectionalDropIndicators kind={kind} />);
      const items = page.getByTestId("draggable-item");
      const source = items.filter({ hasText: "Item 1" });
      const surface = source.locator(surfaceSelectors[kind]);
      await surface.evaluate((element, style) => {
        Object.assign((element as HTMLElement).style, style);
      }, styles);
      const sourceBounds = await getBounds(source);
      const surfaceBounds = await getBounds(surface);
      const targetBounds = await getBounds(
        items.nth(1).locator(surfaceSelectors[kind]),
      );
      const radii = await surface.evaluate((element) => {
        const style = getComputedStyle(element);
        return [
          style.borderTopLeftRadius,
          style.borderTopRightRadius,
          style.borderBottomRightRadius,
          style.borderBottomLeftRadius,
        ];
      });
      await source.getByTestId("drag-handle").hover();
      await page.mouse.down();
      await page.mouse.move(
        targetBounds.x + targetBounds.width / 2,
        targetBounds.y + targetBounds.height + 5,
        { steps: 3 },
      );
      await page.mouse.move(
        targetBounds.x + targetBounds.width / 2 + 1,
        targetBounds.y + targetBounds.height + 6,
        { steps: 3 },
      );

      await expect(source).toHaveAttribute("data-is-dragging", "true");
      const ghost = await source.evaluate((element) => {
        const style = getComputedStyle(element, "::after");
        return {
          top: parseFloat(style.top),
          left: parseFloat(style.left),
          width: parseFloat(style.width),
          height: parseFloat(style.height),
          radii: [
            style.borderTopLeftRadius,
            style.borderTopRightRadius,
            style.borderBottomRightRadius,
            style.borderBottomLeftRadius,
          ],
          background: style.backgroundColor,
          shadow: style.boxShadow,
        };
      });
      expect(sourceBounds.x + ghost.left).toBeCloseTo(surfaceBounds.x, 1);
      expect(sourceBounds.y + ghost.top).toBeCloseTo(surfaceBounds.y, 1);
      expect(ghost.width).toBeCloseTo(surfaceBounds.width, 1);
      expect(ghost.height).toBeCloseTo(surfaceBounds.height, 1);
      expect(ghost.radii).toEqual(radii);
      expect(ghost.background).not.toBe("rgba(0, 0, 0, 0)");
      expect(ghost.shadow).not.toBe("none");
      await expect(source).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
      await expect(source).toHaveCSS("box-shadow", "none");
      await expect(surface).toHaveCSS("visibility", "hidden");
      expect(await getBounds(source)).toEqual(sourceBounds);

      await page.mouse.up();

      await expect(source).toHaveAttribute("data-is-dragging", "false");
      expect(
        await source.evaluate(
          (element) => getComputedStyle(element, "::after").content,
        ),
      ).toBe("none");
      await expect(surface).toHaveCSS("visibility", "visible");
      await expect(items).toHaveText([
        "Item 2",
        "Item 1",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6",
      ]);
    });
  }
}

test("clears the rounded ghost when the drag is cancelled", async ({
  mount,
  page,
}) => {
  await mount(<WithDirectionalDropIndicators />);
  const items = page.getByTestId("draggable-item");
  const source = items.filter({ hasText: "Item 1" });
  const targetBounds = await getBounds(items.nth(1));
  await source.getByTestId("drag-handle").hover();
  await page.mouse.down();
  await page.mouse.move(targetBounds.x + 20, targetBounds.y + 60, { steps: 3 });
  await page.mouse.move(targetBounds.x + 21, targetBounds.y + 61, { steps: 3 });

  await expect(source).toHaveAttribute("data-is-dragging", "true");

  await page.keyboard.press("Escape");
  await page.mouse.up();

  await expect(source).toHaveAttribute("data-is-dragging", "false");
  expect(
    await source.evaluate(
      (element) => getComputedStyle(element, "::after").content,
    ),
  ).toBe("none");
  await expect(items).toHaveText([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);
});
