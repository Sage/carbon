import { expect, test } from "@playwright/experimental-ct-react17";
import React from "react";
import {
  draggableItem,
  draggableItemByPosition,
} from "../../../playwright/components/draggable";
import { checkAccessibility } from "../../../playwright/support/helper";

import {
  DraggableCustom,
  DraggableDefault,
  DraggableDifferentContainers,
} from "../../../src/components/draggable/components.test-pw";

test.describe("Check functionality for Draggable component", () => {
  ([
    ["One", 0],
    ["One", 1],
    ["One", 2],
    ["One", 3],
    ["Two", 2],
    ["Three", 0],
    ["Four", 1],
  ] as const).forEach(([record, destinationId]) => {
    test(`should drag Draggable Label ${record} to position ${destinationId}`, async ({
      mount,
      page,
    }) => {
      await mount(<DraggableCustom />);

      const draggableItemElementRecord = draggableItem(page, record);
      const draggableItemByPositionElementDestinationId = draggableItemByPosition(
        page,
        destinationId
      );
      await draggableItemElementRecord.dragTo(
        draggableItemByPositionElementDestinationId
      );

      await expect(draggableItemByPositionElementDestinationId).toContainText(
        record
      );
    });
  });

  test("should not change the order of the DraggableItems when dragged outside of the DraggableContainer", async ({
    mount,
    page,
  }) => {
    await mount(<DraggableDifferentContainers />);

    const draggableItemElementFive = draggableItem(page, "Five");
    const draggableItemElementSeven = draggableItem(page, "Seven");
    await draggableItemElementFive.dragTo(draggableItemElementSeven);
    const draggableItemByPositionElement1 = draggableItemByPosition(page, 1);

    await expect(draggableItemByPositionElement1).toContainText("Five");
  });
});

test.describe("Check events for Draggable component", () => {
  test("should call getOrder callback when a drag&drop event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback = () => {
      callbackCount += 1;
    };

    await mount(<DraggableCustom getOrder={callback} />);

    const draggableItemElementOne = draggableItem(page, "One");
    const draggableItemByPositionElement3 = draggableItemByPosition(page, 3);
    await draggableItemElementOne.dragTo(draggableItemByPositionElement3);

    await expect(callbackCount).toBe(1);
  });

  test("should call getOrder callback when a drag&drop event is triggered from outside of the DraggableContainer", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback = () => {
      callbackCount += 1;
    };

    await mount(<DraggableDifferentContainers getOrder={callback} />);

    const draggableItemElementFive = draggableItem(page, "Five");
    const draggableItemElementSeven = draggableItem(page, "Seven");
    await draggableItemElementSeven.dragTo(draggableItemElementFive);

    await expect(callbackCount).toBe(1);
  });
});

test.describe("Accessibility tests for Draggable component", () => {
  test("should pass accessibility tests for default example", async ({
    mount,
    page,
  }) => {
    await mount(<DraggableDefault />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with different containers", async ({
    mount,
    page,
  }) => {
    await mount(<DraggableDifferentContainers />);

    await checkAccessibility(page);
  });
});
