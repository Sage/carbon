import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { PicklistItemProps } from "./picklist-item/picklist-item.component";
import {
  DuellingPicklistComponent,
  DuellingPicklistComponentAssigned,
  AlternativeSearch,
  Grouped,
  InDialog,
  AddItem,
  RemoveItem,
  Locked,
  CustomTooltipMessage,
} from "./components.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  getComponent,
  getDataElementByValue,
  tooltipPreview,
} from "../../../playwright/components";
import { CHARACTERS } from "../../../playwright/support/constants";
import { ICON } from "../../../playwright/components/locators";
import { DuellingPicklistProps } from "./duelling-picklist.component";

const specialCharacters = [
  CHARACTERS.STANDARD,
  CHARACTERS.DIACRITICS,
  CHARACTERS.SPECIALCHARACTERS,
];
const keyToTrigger = ["Space", "Enter"] as const;

test.describe(`should render Duelling-Picklist component`, () => {
  test(`should verify unassigned picklist has 10 items`, async ({
    mount,
    page,
  }) => {
    await mount(<DuellingPicklistComponent />);

    await expect(
      getDataElementByValue(page, "picklist").nth(0).locator("li"),
    ).toHaveCount(10);
    await expect(getDataElementByValue(page, "picklist-left-label")).toHaveText(
      "List 1 (10)",
    );
  });

  test(`should verify assigned picklist has 0 items`, async ({
    mount,
    page,
  }) => {
    await mount(<DuellingPicklistComponent />);

    await expect(
      getDataElementByValue(page, "picklist")
        .nth(1)
        .locator("li")
        .filter({ hasText: "Content" }),
    ).toHaveCount(0);
    await expect(
      getDataElementByValue(page, "picklist-placeholder"),
    ).toHaveText("Nothing to see here");
    await expect(
      getDataElementByValue(page, "picklist-right-label").nth(0),
    ).toHaveText("List 2 (0)");
  });

  test(`should verify component is enabled by default`, async ({
    mount,
    page,
  }) => {
    await mount(<DuellingPicklistComponent />);

    await expect(getComponent(page, "duelling-picklist")).not.toHaveAttribute(
      "disabled",
      /.*/,
    );
  });

  [
    [1, 9],
    [7, 3],
  ].forEach(([items, leftItems]) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`should verify when ${items} item(s) are assigned that unassigned picklist has ${leftItems} items and assigned picklist has ${items} item(s)`, async ({
      mount,
      page,
    }) => {
      await mount(<DuellingPicklistComponent />);

      const addItemButton = page.getByRole("button").first();
      for (let i = 0; i < items; i++) {
        await addItemButton.click();
      }
      await expect(
        getDataElementByValue(page, "picklist").nth(0).locator("li"),
      ).toHaveCount(leftItems);
      await expect(
        getDataElementByValue(page, "picklist-left-label").nth(0),
      ).toHaveText(`List 1 (${leftItems})`);
      await expect(
        getDataElementByValue(page, "picklist").nth(1).locator("li"),
      ).toHaveCount(items);
      await expect(
        getDataElementByValue(page, "picklist-right-label").nth(0),
      ).toHaveText(`List 2 (${items})`);
    });
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip(`should verify assigned picklist has 10 items when all items are added`, async ({
    mount,
    page,
  }) => {
    await mount(<DuellingPicklistComponent />);

    const addItemButton = page.getByRole("button").first();
    for (let i = 0; i < 10; i++) {
      await addItemButton.click();
    }
    await expect(
      getDataElementByValue(page, "picklist")
        .nth(0)
        .locator("li")
        .filter({ hasText: "Content" }),
    ).toHaveCount(0);
    await expect(
      getDataElementByValue(page, "picklist-placeholder"),
    ).toHaveText("Unassigned list empty");
    await expect(
      getDataElementByValue(page, "picklist-left-label").nth(0),
    ).toHaveText(`List 1 (0)`);
    await expect(
      getDataElementByValue(page, "picklist").nth(1).locator("li"),
    ).toHaveCount(10);
    await expect(
      getDataElementByValue(page, "picklist-right-label").nth(0),
    ).toHaveText(`List 2 (10)`);
  });

  test(`should verify assigned picklist has 0 items when assigned item is removed`, async ({
    mount,
    page,
  }) => {
    await mount(<DuellingPicklistComponent />);

    const addItemButton = page.getByRole("button").first();
    await addItemButton.click();
    await expect(
      getDataElementByValue(page, "picklist").nth(0).locator("li"),
    ).toHaveCount(9);
    await expect(
      getDataElementByValue(page, "picklist").nth(1).locator("li"),
    ).toHaveCount(1);

    const removeItemButton = getDataElementByValue(page, "remove");
    await removeItemButton.click();
    await expect(
      getDataElementByValue(page, "picklist").nth(0).locator("li"),
    ).toHaveCount(10);
    await expect(
      getDataElementByValue(page, "picklist")
        .nth(1)
        .locator("li")
        .filter({ hasText: "Content" }),
    ).toHaveCount(0);
  });

  [...keyToTrigger].forEach((pressed) => {
    test(`should verify item is added to assigned picklist when ${pressed} key is pressed`, async ({
      mount,
      page,
    }) => {
      await mount(<DuellingPicklistComponent />);

      const addItemButton = page.getByRole("button").first();
      await addItemButton.press(pressed);
      await expect(
        getDataElementByValue(page, "picklist").nth(0).locator("li"),
      ).toHaveCount(9);
      await expect(
        getDataElementByValue(page, "picklist").nth(1).locator("li"),
      ).toHaveCount(1);
    });
  });

  [...keyToTrigger].forEach((pressed) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`should verify item is removed from assigned picklist when ${pressed} key is pressed`, async ({
      mount,
      page,
    }) => {
      await mount(<DuellingPicklistComponent />);

      const addItemButton = page.getByRole("button").first();
      for (let i = 0; i < 10; i++) {
        await addItemButton.click();
      }
      await expect(
        getDataElementByValue(page, "picklist")
          .nth(0)
          .locator("li")
          .filter({ hasText: "Content" }),
      ).toHaveCount(0);
      await expect(
        getDataElementByValue(page, "picklist").nth(1).locator("li"),
      ).toHaveCount(10);

      const removeItemButton = getDataElementByValue(page, "remove").first();
      for (let i = 0; i < 10; i++) {
        await removeItemButton.press(pressed);
      }
      await expect(
        getDataElementByValue(page, "picklist").nth(0).locator("li"),
      ).toHaveCount(10);
      await expect(
        getDataElementByValue(page, "picklist")
          .nth(1)
          .locator("li")
          .filter({ hasText: "Content" }),
      ).toHaveCount(0);
    });
  });

  (
    [
      ["Content", 10],
      ["Content 1", 2],
      ["Content 10", 1],
    ] as [string, number][]
  ).forEach(([searchString, results]) => {
    test(`should verify when ${searchString} is enterted into search field that ${results} results are displayed`, async ({
      mount,
      page,
    }) => {
      await mount(<DuellingPicklistComponent />);

      const searchInput = page.getByLabel("search").first();
      await searchInput.fill(searchString);
      await expect(
        getDataElementByValue(page, "picklist").nth(0).locator("li"),
      ).toHaveCount(results);
    });
  });

  test(`should verify leftControl prop in component generates search field appears above unassigned picklist`, async ({
    mount,
    page,
  }) => {
    await mount(<DuellingPicklistComponent />);

    const leftSearch = getDataElementByValue(page, "picklist-left-control")
      .locator("div")
      .nth(0);
    await expect(leftSearch).toHaveAttribute("data-component", "search");
  });

  test(`should verify rightControl prop in component generates search field appears above assigned picklist`, async ({
    mount,
    page,
  }) => {
    await mount(<DuellingPicklistComponent />);

    const rightSearch = getDataElementByValue(page, "picklist-right-control")
      .locator("div")
      .nth(0);
    await expect(rightSearch).toHaveAttribute("data-component", "search");
  });

  (
    [
      ["disabled", true],
      ["enabled", false],
    ] as [string, DuellingPicklistProps["disabled"]][]
  ).forEach(([state, bool]) => {
    test(`should verify Duelling-Picklist is ${state} when disabled prop is ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(<DuellingPicklistComponent disabled={bool} />);

      if (bool) {
        await expect(getComponent(page, "duelling-picklist")).toHaveAttribute(
          "disabled",
          /.*/,
        );
        await expect(getComponent(page, "duelling-picklist")).toHaveCSS(
          "opacity",
          "0.2",
        );
        await expect(getComponent(page, "duelling-picklist")).toHaveCSS(
          "pointer-events",
          "none",
        );
        await expect(getComponent(page, "duelling-picklist")).toHaveCSS(
          "user-select",
          "none",
        );
      } else {
        await expect(
          getComponent(page, "duelling-picklist"),
        ).not.toHaveAttribute("disabled", /.*/);
      }
    });
  });

  test(`should verify unassigned picklist label is 'Left Label'`, async ({
    mount,
    page,
  }) => {
    await mount(<DuellingPicklistComponent leftLabel="Left Label" />);

    await expect(getDataElementByValue(page, "picklist-left-label")).toHaveText(
      "Left Label",
    );
  });

  test(`should verify assigned picklist label is 'Right Label'`, async ({
    mount,
    page,
  }) => {
    await mount(<DuellingPicklistComponent rightLabel="Right Label" />);

    await expect(
      getDataElementByValue(page, "picklist-right-label").nth(0),
    ).toHaveText("Right Label");
  });
});

test.describe(`should render Duelling-Picklist to test Picklist props`, () => {
  [...specialCharacters].forEach((chars) => {
    test(`should verify picklist placeholder is set to ${chars}`, async ({
      mount,
      page,
    }) => {
      await mount(<DuellingPicklistComponent text={chars} />);

      const addItemButton = page.getByRole("button").first();
      for (let i = 0; i < 10; i++) {
        await addItemButton.click();
      }

      await expect(
        getDataElementByValue(page, "picklist-placeholder"),
      ).toHaveText(chars);
    });
  });

  (
    [
      ["locked", true, "rgb(242, 245, 246)"],
      ["unlocked", false, "rgb(255, 255, 255)"],
    ] as [string, PicklistItemProps["locked"], string][]
  ).forEach(([state, bool, backColor]) => {
    test(`should verify picklist item is ${state} when locked prop is ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(<DuellingPicklistComponent locked={bool} />);

      const picklistItem = getDataElementByValue(page, "picklist-item").first();
      await expect(picklistItem).toHaveCSS("background-color", backColor);
      const picklistIcon = getDataElementByValue(page, "picklist-item")
        .first()
        .locator(ICON);
      if (bool) {
        await expect(picklistIcon).toHaveAttribute("data-element", state);
      } else {
        await expect(picklistIcon).not.toHaveAttribute("data-element", state);
      }
    });
  });

  test(`should verify picklist tooltip is 'Item Locked' when locked prop is true`, async ({
    mount,
    page,
  }) => {
    await mount(
      <DuellingPicklistComponent locked tooltipMessage="Item Locked" />,
    );

    const listItemIcon = getDataElementByValue(page, "picklist-item")
      .first()
      .locator(ICON);
    await listItemIcon.hover();
    await expect(tooltipPreview(page)).toHaveText("Item Locked");
  });
});

test.describe(`should render Duelling-Picklist with external searchbar and access checkbox`, () => {
  (
    [
      ["Content", 20],
      ["Content 1", 11],
      ["Content 10", 1],
    ] as [string, number][]
  ).forEach(([searchString, results]) => {
    test(`should verify ${results} are found when search field is placed outside the component`, async ({
      mount,
      page,
    }) => {
      await mount(<AlternativeSearch />);

      await page.getByLabel("search").fill(searchString);
      await expect(
        getDataElementByValue(page, "picklist").nth(0).locator("li"),
      ).toHaveCount(results);
    });
  });

  test(`should verify component is disabled when access checkox is checked`, async ({
    mount,
    page,
  }) => {
    await mount(<AlternativeSearch />);

    const checkbox = page.getByRole("checkbox");
    await checkbox.check();
    await expect(getComponent(page, "duelling-picklist")).toHaveAttribute(
      "disabled",
      /.*/,
    );
  });

  test(`should verify component is re-enabled when access checkbox is unchecked`, async ({
    mount,
    page,
  }) => {
    await mount(<AlternativeSearch />);

    const checkbox = page.getByRole("checkbox");
    await checkbox.check();
    await checkbox.uncheck();
    await expect(getComponent(page, "duelling-picklist")).not.toHaveAttribute(
      "disabled",
      /.*/,
    );
  });
});

test.describe(`should render Duelling-Picklist with items grouped and a picklist divider`, () => {
  test(`should verify component is displayed with divider`, async ({
    mount,
    page,
  }) => {
    await mount(<Grouped />);

    await expect(
      getDataElementByValue(page, "picklist-divider"),
    ).toBeAttached();
  });

  test(`should verify component is displayed in groups with group label`, async ({
    mount,
    page,
  }) => {
    await mount(<Grouped />);

    const group = getDataElementByValue(page, "picklist-group").first();
    await expect(group).toHaveText("Group A");
  });

  test(`should verify all items in a group are added to assigned picklist when group add button is clicked`, async ({
    mount,
    page,
  }) => {
    await mount(<Grouped />);

    const groupAddButton = getDataElementByValue(page, "picklist-group")
      .first()
      .locator("button");
    await groupAddButton.click();
    const group = getDataElementByValue(page, "picklist-group").nth(2);
    await expect(group).toHaveText("Group A");
    await expect(
      getDataElementByValue(page, "picklist").nth(1).locator("li").locator("p"),
    ).toHaveCount(3);
  });

  test(`should verify all items in a group are removed from assigned picklist when group remove button is clicked`, async ({
    mount,
    page,
  }) => {
    await mount(<Grouped />);

    const groupAddButton = getDataElementByValue(page, "picklist-group")
      .first()
      .locator("button");
    await groupAddButton.click();
    await expect(
      getDataElementByValue(page, "picklist").nth(0).locator("li").locator("p"),
    ).toHaveCount(3);
    await expect(
      getDataElementByValue(page, "picklist").nth(1).locator("li").locator("p"),
    ).toHaveCount(3);
    const groupRemoveButton = getDataElementByValue(page, "picklist-group")
      .nth(2)
      .locator("button");
    await groupRemoveButton.click();
    await expect(
      getDataElementByValue(page, "picklist").nth(0).locator("li").locator("p"),
    ).toHaveCount(6);
    await expect(
      getDataElementByValue(page, "picklist").nth(1).locator("li").locator("p"),
    ).toHaveCount(0);
  });
});

test.describe(`check events for Duelling-Picklist component`, () => {
  test(`should call onChange when add button clicked`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <DuellingPicklistComponent
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    const addItemButton = page.getByRole("button").first();
    await addItemButton.click();
    expect(callbackCount).toBe(1);
  });

  test(`should call onChange when remove button clicked`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <DuellingPicklistComponentAssigned
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    const removeItemButton = page.getByRole("button").first();
    await removeItemButton.click();
    expect(callbackCount).toBe(1);
  });

  [...keyToTrigger].forEach((pressed) => {
    test(`should call onChange when ${pressed} key pressed on add button`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <DuellingPicklistComponentAssigned
          onChange={() => {
            callbackCount += 1;
          }}
        />,
      );

      const addItemButton = page.getByRole("button").first();
      await addItemButton.press(pressed);
      expect(callbackCount).toBe(1);
    });
  });

  [...keyToTrigger].forEach((pressed) => {
    test(`should call onChange when ${pressed} key pressed on remove button`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <DuellingPicklistComponentAssigned
          onChange={() => {
            callbackCount += 1;
          }}
        />,
      );

      const removeItemButton = page.getByRole("button").first();
      await removeItemButton.press(pressed);
      expect(callbackCount).toBe(1);
    });
  });
});

test.describe(`Accessibility tests for Duelling-Picklist component`, () => {
  test(`should pass accessibility tests for default example`, async ({
    mount,
    page,
  }) => {
    await mount(<DuellingPicklistComponent />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for AlternativeSearch example`, async ({
    mount,
    page,
  }) => {
    await mount(<AlternativeSearch />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for Grouped example`, async ({
    mount,
    page,
  }) => {
    await mount(<Grouped />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for InDialog example`, async ({
    mount,
    page,
  }) => {
    await mount(<InDialog />);

    const dialogButton = getDataElementByValue(page, "main-text");
    await dialogButton.click();
    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for AddItem example`, async ({
    mount,
    page,
  }) => {
    await mount(<AddItem />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for RemoveItem example`, async ({
    mount,
    page,
  }) => {
    await mount(<RemoveItem />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for Locked example`, async ({
    mount,
    page,
  }) => {
    await mount(<Locked />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for CustomTooltipMessage example`, async ({
    mount,
    page,
  }) => {
    await mount(<CustomTooltipMessage />);

    const lockedItem = getDataElementByValue(page, "locked").first();
    await lockedItem.hover({ force: true });
    await expect(tooltipPreview(page)).toBeVisible();
    await checkAccessibility(page, tooltipPreview(page));
  });

  test.skip(`should pass accessibility tests when disabled`, async ({
    mount,
    page,
  }) => {
    await mount(<DuellingPicklistComponent disabled />);

    await checkAccessibility(page);
  });
});

test.describe("Border radius tests", () => {
  test(`should render the items with the expected border radius styling`, async ({
    mount,
    page,
  }) => {
    await mount(<DuellingPicklistComponent />);

    const addItemButton = page.getByRole("button").first();
    for (let i = 0; i < 5; i++) {
      await addItemButton.click();
    }

    const assignedItem1 = getDataElementByValue(page, "picklist")
      .nth(0)
      .locator("li")
      .nth(0);
    const assignedItem2 = getDataElementByValue(page, "picklist")
      .nth(0)
      .locator("li")
      .nth(1);
    const assignedItem3 = getDataElementByValue(page, "picklist")
      .nth(0)
      .locator("li")
      .nth(2);
    const assignedItem4 = getDataElementByValue(page, "picklist")
      .nth(0)
      .locator("li")
      .nth(3);
    const assignedItem5 = getDataElementByValue(page, "picklist")
      .nth(0)
      .locator("li")
      .nth(4);
    await expect(assignedItem1).toHaveCSS("border-radius", "8px");
    await expect(assignedItem2).toHaveCSS("border-radius", "8px");
    await expect(assignedItem3).toHaveCSS("border-radius", "8px");
    await expect(assignedItem4).toHaveCSS("border-radius", "8px");
    await expect(assignedItem5).toHaveCSS("border-radius", "8px");

    const unassignedItem1 = getDataElementByValue(page, "picklist")
      .nth(1)
      .locator("li")
      .nth(0);
    const unassignedItem2 = getDataElementByValue(page, "picklist")
      .nth(1)
      .locator("li")
      .nth(1);
    const unassignedItem3 = getDataElementByValue(page, "picklist")
      .nth(1)
      .locator("li")
      .nth(2);
    const unassignedItem4 = getDataElementByValue(page, "picklist")
      .nth(1)
      .locator("li")
      .nth(3);
    const unassignedItem5 = getDataElementByValue(page, "picklist")
      .nth(1)
      .locator("li")
      .nth(4);
    await expect(unassignedItem1).toHaveCSS("border-radius", "8px");
    await expect(unassignedItem2).toHaveCSS("border-radius", "8px");
    await expect(unassignedItem3).toHaveCSS("border-radius", "8px");
    await expect(unassignedItem4).toHaveCSS("border-radius", "8px");
    await expect(unassignedItem5).toHaveCSS("border-radius", "8px");
  });
});
