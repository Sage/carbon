import React from "react";
import Option from "../option";
import { test, expect } from "../../../../playwright/helpers/base-test";
import {
  SimpleSelectComponent,
  WithVirtualScrolling,
  SimpleSelectNestedInDialog,
  SimpleSelectNestedInDialogWithStickyFooter,
  SelectWithOptionGroupHeader,
  SelectionConfirmed,
  SelectionConfirmedManyOptions,
  SimpleSelectControlled,
  WithObjectAsValue,
  SimpleSelectObjectAsValueComponent,
} from "./components.test-pw";
import { commonDataElementInputPreview } from "../../../../playwright/components";
import { dialogWithRole } from "../../../../playwright/components/dialog";
import { dropdownButton } from "../../../../playwright/components/select";
import { checkAccessibility } from "../../../../playwright/support/helper";
import { CHARACTERS } from "../../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
type BoundingBox = { x: number; y: number; width: number; height: number };

test.describe("SimpleSelect component", () => {
  test("flips above the control when there is no space below", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 700, height: 240 });
    await mount(
      <div style={{ position: "fixed", bottom: 0, left: 20, width: 320 }}>
        <SimpleSelectComponent listMaxHeight={100} />
      </div>,
    );

    await page.getByRole("combobox").click();

    await expect(page.getByTestId("menu-wrapper")).toHaveAttribute(
      "data-floating-placement",
      "top",
    );
  });

  test("does not flip when flipEnabled is false", async ({ mount, page }) => {
    await page.setViewportSize({ width: 700, height: 240 });
    await mount(
      <div style={{ position: "fixed", bottom: 0, left: 20, width: 320 }}>
        <SimpleSelectComponent flipEnabled={false} listMaxHeight={100} />
      </div>,
    );

    await page.getByRole("combobox").click();

    await expect(page.getByTestId("menu-wrapper")).toHaveAttribute(
      "data-floating-placement",
      "bottom",
    );
  });

  test("scroll position of option list doesn't change, if the component's options are dynamically changed", async ({
    mount,
    page,
  }) => {
    const { update } = await mount(
      <SimpleSelectComponent label="Colour">
        <Option text="Amber" value="Amber" />
        <Option text="Black" value="Black" />
        <Option text="Cyan" value="Cyan" />
        <Option text="Dark Blue" value="Dark Blue" />
        <Option text="Emerald" value="Emerald" />
        <Option text="Fuchsia" value="Fuchsia" />
        <Option text="Gold" value="Gold" />
      </SimpleSelectComponent>,
    );

    const dropdownIcon = page.getByTestId("input-icon-toggle");
    await dropdownIcon.click();

    const dropdownList = page.getByRole("listbox");
    await dropdownList.waitFor();

    await page.keyboard.press("ArrowUp");

    const scrollPosition = await dropdownList.evaluate(
      (element) => element.scrollTop,
    );

    await update(
      <SimpleSelectComponent label="Colour">
        <Option text="Amber" value="Amber" />
        <Option text="Black" value="Black" />
        <Option text="Cyan" value="Cyan" />
        <Option text="Dark Blue" value="Dark Blue" />
        <Option text="Emerald" value="Emerald" />
        <Option text="Fuchsia" value="Fuchsia" />
        <Option text="Gold" value="Gold" />
        <Option text="Hot Pink" value="Hot Pink" />
        <Option text="Indigo" value="Indigo" />
      </SimpleSelectComponent>,
    );

    await expect(page.getByRole("option")).toHaveCount(11);

    // check that the scroll position hasn't changed
    const newScrollPosition = await dropdownList.evaluate(
      (element) => element.scrollTop,
    );
    expect(newScrollPosition).toBeCloseTo(scrollPosition, 1);
  });

  test("should not highlight previously selected option when value is cleared", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectControlled />);

    const inputElement = page.getByRole("combobox");
    await expect(inputElement).toHaveValue("Green");

    const clearValueButton = page.getByRole("button");
    await clearValueButton.click();

    await expect(inputElement).toHaveValue("");
    await inputElement.click();

    const optionElement = page.getByRole("option", { name: "Green" });
    await expect(optionElement).toHaveCSS(
      "background-color",
      "rgba(0, 0, 0, 0)",
    );
  });

  test("should not highlight previously selected option when object as value is cleared", async ({
    mount,
    page,
  }) => {
    await mount(<WithObjectAsValue />);

    const inputElement = page.getByRole("combobox");
    await expect(inputElement).toHaveValue("Green");

    const clearValueButton = page.getByRole("button");
    await clearValueButton.click();

    await expect(inputElement).toHaveValue("");
    await inputElement.click();

    const optionElement = page.getByRole("option", { name: "Green" });
    await expect(optionElement).toHaveCSS(
      "background-color",
      "rgba(0, 0, 0, 0)",
    );
  });

  test("should select another option when one is already selected and the value is an object", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectObjectAsValueComponent />);

    const positionValue = "Amber";
    const inputElement = page.getByRole("combobox");
    await expect(inputElement).toHaveValue("Green");
    await expect(page.getByRole("combobox")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    await inputElement.click();
    await page.getByRole("option").first().click();
    await expect(inputElement).toHaveValue(positionValue);
  });
});

test("should render an option that wraps onto more than one line correctly", async ({
  mount,
  page,
}) => {
  await mount(<SimpleSelectComponent />);

  const optionValue8 =
    "Like a lot of intelligent animals, most crows are quite social. For instance, American crows spend most of the year living in pairs or small family groups. During the winter months, they will congregate with hundreds or even thousands of their peers to sleep together at night";
  const optionValue9 = "Red";
  const optionValue10 = "White";
  const optionValue11 = "Yellow";
  await page.getByRole("combobox").click();
  const selectListWrapperElement = page.getByRole("listbox");
  await expect(selectListWrapperElement).toBeVisible();
  await page
    .getByRole("option", { name: optionValue11 })
    .scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("option", { name: optionValue8 }),
  ).toBeInViewport();
  await expect(
    page.getByRole("option", { name: optionValue9 }).nth(1),
  ).toBeInViewport();
  await expect(
    page.getByRole("option", { name: optionValue10 }),
  ).toBeInViewport();
  await expect(
    page.getByRole("option", { name: optionValue11 }),
  ).toBeInViewport();
});

test("renders loader when isLoading prop is set to true", async ({
  mount,
  page,
}) => {
  await mount(<SimpleSelectComponent isLoading />);

  const dropdownIcon = page.getByTestId("input-icon-toggle");
  const dropdownList = page.getByRole("listbox");

  await dropdownIcon.click();
  await dropdownList.waitFor();

  await expect(page.getByTestId("select-list-loader")).toBeVisible();
});

test.describe("Check virtual scrolling", () => {
  test("does not render all virtualised options", async ({ mount, page }) => {
    await mount(<WithVirtualScrolling />);

    await page.getByRole("combobox").click();

    await expect(
      page.getByRole("option", { name: "Option 1", exact: true }),
    ).toBeInViewport();

    await expect(
      page.getByRole("option", { name: "Option 50" }),
    ).not.toBeAttached();
  });

  test("changes rendered options as dropdown list is scrolled", async ({
    mount,
    page,
  }) => {
    await mount(<WithVirtualScrolling />);

    await page.getByRole("combobox").click();

    const firstOption = page.getByRole("option", {
      name: "Option 1",
      exact: true,
    });
    const lastOption = page.getByRole("option", {
      name: "Option 20",
      exact: true,
    });

    await expect(firstOption).toBeAttached();
    await expect(lastOption).not.toBeAttached();

    // scroll to the bottom of dropdown list
    await page.getByRole("listbox").evaluate((element) => {
      element.scrollBy(0, element.scrollHeight);
    });

    await expect(firstOption).not.toBeAttached();
    await expect(lastOption).toBeAttached();
  });

  test("when reopening the select after selecting an option, the selected option is visible", async ({
    mount,
    page,
  }) => {
    const maxHeight = 200;
    await mount(<SimpleSelectComponent listMaxHeight={maxHeight} />);

    await page.getByRole("combobox").click();
    await page
      .getByRole("listbox")
      .evaluate((wrapper) => wrapper.scrollBy(0, wrapper.scrollHeight));

    await expect(page.getByRole("option", { name: "Yellow" })).toBeInViewport({
      ratio: 1,
    });
    await page.getByRole("option", { name: "Yellow" }).click();

    await expect(page.getByRole("option", { name: "Yellow" })).toBeHidden();

    await page.getByRole("combobox").click();
    await expect(page.getByRole("option", { name: "Yellow" })).toBeInViewport({
      ratio: 1,
    });

    await page.locator("body").click();

    await page.getByRole("combobox").click();
    await expect(page.getByRole("option", { name: "Yellow" })).toBeInViewport({
      ratio: 1,
    });
  });

  test("a selected option stays rendered even when out of view", async ({
    mount,
    page,
  }) => {
    await mount(<WithVirtualScrolling />);

    // open list and select first option
    await page.getByRole("combobox").click();
    const firstOption = page.getByRole("option", {
      name: "Option 1",
      exact: true,
    });
    await firstOption.click();

    // reopen list
    await page.getByRole("combobox").click();

    // scroll to the bottom of dropdown list
    await page.getByRole("listbox").evaluate((element) => {
      element.scrollBy(0, element.scrollHeight);
    });

    await expect(firstOption).toBeAttached();
  });

  test("supports keyboard navigation and exposes the active virtual option", async ({
    mount,
    page,
  }) => {
    await mount(<WithVirtualScrolling />);

    const inputElement = page.getByRole("combobox");
    await inputElement.click();

    await inputElement.press("ArrowDown");
    await expect(
      page.getByRole("option", { name: "Option 1", exact: true }),
    ).toHaveAttribute("data-has-focus", "true");

    await inputElement.press("End");
    const lastOption = page.getByRole("option", {
      name: "Option 20",
      exact: true,
    });
    await expect(lastOption).toHaveAttribute("data-has-focus", "true");
    await expect(inputElement).toHaveAttribute(
      "aria-activedescendant",
      (await lastOption.getAttribute("id")) as string,
    );

    await inputElement.press("Home");
    await inputElement.press("PageDown");
    await expect(
      page.getByRole("option", { name: "Option 11", exact: true }),
    ).toHaveAttribute("data-has-focus", "true");

    await inputElement.press("PageUp");
    await inputElement.press("Enter");

    await expect(inputElement).toHaveValue("Option 1");
    await expect(inputElement).toBeFocused();
    await expect(page.getByRole("listbox")).toBeHidden();
  });

  test("selects a virtual option with Space", async ({ mount, page }) => {
    await mount(<WithVirtualScrolling />);

    const inputElement = page.getByRole("combobox");
    await inputElement.click();
    await inputElement.press("ArrowDown");
    await inputElement.press("ArrowDown");
    await inputElement.press(" ");

    await expect(inputElement).toHaveValue("Option 2");
    await expect(inputElement).toBeFocused();
    await expect(page.getByRole("listbox")).toBeHidden();
  });

  test("selects a virtual option with Tab and moves focus onwards", async ({
    mount,
    page,
  }) => {
    await mount(
      <>
        <WithVirtualScrolling />
        <button type="button">Next focusable</button>
      </>,
    );

    const inputElement = page.getByRole("combobox");
    await inputElement.click();
    await inputElement.press("ArrowDown");
    await inputElement.press("Tab");

    await expect(inputElement).toHaveValue("Option 1");
    await expect(
      page.getByRole("button", { name: "Next focusable" }),
    ).toBeFocused();
    await expect(page.getByRole("listbox")).toBeHidden();
  });

  test("scrolls a keyboard-selected virtual option into view when reopened", async ({
    mount,
    page,
  }) => {
    await mount(<WithVirtualScrolling />);

    const inputElement = page.getByRole("combobox");
    await inputElement.click();
    await inputElement.press("End");
    await inputElement.press("Enter");
    await expect(inputElement).toHaveValue("Option 20");

    await inputElement.click();
    await expect(
      page.getByRole("option", { name: "Option 20", exact: true }),
    ).toBeInViewport();
  });

  test("does not loop virtual keyboard navigation when disabled", async ({
    mount,
    page,
  }) => {
    await mount(<WithVirtualScrolling disableNavigationLoop />);

    const inputElement = page.getByRole("combobox");
    await inputElement.click();
    await inputElement.press("Home");
    await inputElement.press("ArrowUp");
    await inputElement.press("Enter");
    await expect(inputElement).toHaveValue("Option 1");

    await inputElement.click();
    await inputElement.press("End");
    await inputElement.press("ArrowDown");
    await inputElement.press("Enter");
    await expect(inputElement).toHaveValue("Option 20");
  });
});

test.describe("When nested inside of a Dialog component", () => {
  test("renders the option list above a sticky form footer", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectNestedInDialogWithStickyFooter />);

    await page.getByRole("combobox", { name: "Color" }).click();

    const menuWrapper = page.getByTestId("menu-wrapper");
    const formFooter = page.getByTestId("form-footer");
    const [menuZIndex, footerZIndex] = await Promise.all([
      menuWrapper.evaluate((element) =>
        Number.parseInt(getComputedStyle(element).zIndex, 10),
      ),
      formFooter.evaluate((element) =>
        Number.parseInt(getComputedStyle(element).zIndex, 10),
      ),
    ]);

    expect(menuZIndex).toBeGreaterThan(footerZIndex);

    const [menuBox, footerBox] = (await Promise.all([
      menuWrapper.boundingBox(),
      formFooter.boundingBox(),
    ])) as [BoundingBox, BoundingBox];

    const overlapPoint = {
      x: Math.max(menuBox.x, footerBox.x) + 10,
      y: Math.max(menuBox.y, footerBox.y) + 10,
    };
    expect(overlapPoint.x).toBeLessThan(
      Math.min(menuBox.x + menuBox.width, footerBox.x + footerBox.width),
    );
    expect(overlapPoint.y).toBeLessThan(
      Math.min(menuBox.y + menuBox.height, footerBox.y + footerBox.height),
    );
    expect(
      await page.evaluate(
        ({ x, y }) =>
          document
            .elementFromPoint(x, y)
            ?.closest('[data-role="menu-wrapper"]') !== null,
        overlapPoint,
      ),
    ).toBe(true);
  });

  test("should not close the Dialog when Select is closed by pressing an escape key", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectNestedInDialog />);

    await page.getByRole("combobox").click();
    const inputElement = commonDataElementInputPreview(page);
    const dialogElement = dialogWithRole(page, "dialog");
    await inputElement.press("Escape");
    await expect(page.getByRole("listbox")).toBeHidden();
    await expect(inputElement).toBeFocused();
    await expect(dialogElement).toBeVisible();
    await inputElement.press("Escape");
    await expect(dialogElement).toBeHidden();
  });

  test("should not refocus the select textbox when closing it by clicking outside", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectNestedInDialog />);

    await page.getByRole("combobox").click();
    await dialogWithRole(page, "dialog").click();
    await expect(page.getByRole("listbox")).toBeHidden();
    await expect(commonDataElementInputPreview(page)).not.toBeFocused();
  });

  test("should focus the select input and open the list when autoFocus and openOnFocus props set", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectNestedInDialog autofocus openOnFocus />);

    await expect(page.getByRole("combobox")).toBeFocused();
    await expect(page.getByRole("listbox")).toBeVisible();
  });

  test("should be able to focus the last item in the select list when the select list has an OptionGroupHeader", async ({
    mount,
    page,
  }) => {
    await mount(<SelectWithOptionGroupHeader />);

    const inputElement = page.getByRole("combobox");
    await inputElement.click();

    await inputElement.press("ArrowDown");
    await inputElement.press("ArrowDown");
    await inputElement.press("ArrowDown");
    const lastOption = page.getByRole("option", { name: "This is the last" });
    await expect(lastOption).toHaveAttribute("data-has-focus", "true");
    await expect(inputElement).toHaveAttribute(
      "aria-activedescendant",
      (await lastOption.getAttribute("id")) as string,
    );
  });
});

test.describe("Selection confirmed", () => {
  test("is set on the event when options are clicked", async ({
    mount,
    page,
  }) => {
    await mount(<SelectionConfirmed />);

    await dropdownButton(page).click();
    await page.getByRole("option", { name: "One" }).click();
    await expect(
      page.locator('[data-element="confirmed-selection-1"]'),
    ).toBeVisible();
    await dropdownButton(page).click();
    await page.getByRole("option", { name: "Five" }).click();
    await expect(
      page.locator('[data-element="confirmed-selection-1"]'),
    ).toBeHidden();
    await expect(
      page.locator('[data-element="confirmed-selection-5"]'),
    ).toBeVisible();
    await dropdownButton(page).click();
    await page.getByRole("option", { name: "Seven" }).click();
    await expect(
      page.locator('[data-element="confirmed-selection-5"]'),
    ).toBeHidden();
    await expect(
      page.locator('[data-element="confirmed-selection-7"]'),
    ).toBeVisible();
  });

  test("is set on the event when Enter key is pressed on an option using ArrowDown key to navigate", async ({
    mount,
    page,
  }) => {
    await mount(<SelectionConfirmed />);

    await dropdownButton(page).click();
    const inputElement = page.getByRole("combobox");
    await inputElement.press("ArrowDown");
    await inputElement.press("Enter");
    await expect(
      page.locator('[data-element="confirmed-selection-1"]'),
    ).toBeVisible();
    // to work around a race condition in the keydown handler, we fire a click first to ensure React knows the SelectList is open.
    // This ensures the down-arrow press moves to the next option when the test runs.
    await dropdownButton(page).click();
    await inputElement.press("ArrowDown");
    await inputElement.press("ArrowDown");
    await inputElement.press("Enter");
    await expect(
      page.locator('[data-element="confirmed-selection-1"]'),
    ).toBeHidden();
    await expect(
      page.locator('[data-element="confirmed-selection-3"]'),
    ).toBeVisible();
    await dropdownButton(page).click();
    await inputElement.press("ArrowDown");
    await inputElement.press("ArrowDown");
    await inputElement.press("Enter");
    await expect(
      page.locator('[data-element="confirmed-selection-3"]'),
    ).toBeHidden();
    await expect(
      page.locator('[data-element="confirmed-selection-5"]'),
    ).toBeVisible();
    await dropdownButton(page).click();
    await inputElement.press("ArrowDown");
    await inputElement.press("Enter");
    await expect(
      page.locator('[data-element="confirmed-selection-5"]'),
    ).toBeHidden();
    await expect(
      page.locator('[data-element="confirmed-selection-6"]'),
    ).toBeVisible();
  });

  test("is set on the event when Enter key is pressed on an option using ArrowUp key to navigate", async ({
    mount,
    page,
  }) => {
    await mount(<SelectionConfirmed />);

    await dropdownButton(page).click();
    const inputElement = page.getByRole("combobox");
    await inputElement.press("ArrowUp");
    await inputElement.press("Enter");
    await expect(
      page.locator('[data-element="confirmed-selection-9"]'),
    ).toBeVisible();
    // to work around a race condition in the keydown handler, we fire a click first to ensure React knows the SelectList is open.
    // This ensures the up-arrow press moves to the next option when the test runs.
    await dropdownButton(page).click();
    await inputElement.press("ArrowUp");
    await inputElement.press("ArrowUp");
    await inputElement.press("Enter");
    await expect(
      page.locator('[data-element="confirmed-selection-9"]'),
    ).toBeHidden();
    await expect(
      page.locator('[data-element="confirmed-selection-7"]'),
    ).toBeVisible();
    await dropdownButton(page).click();
    await inputElement.press("ArrowUp");
    await inputElement.press("ArrowUp");
    await inputElement.press("Enter");
    await expect(
      page.locator('[data-element="confirmed-selection-7"]'),
    ).toBeHidden();
    await expect(
      page.locator('[data-element="confirmed-selection-5"]'),
    ).toBeVisible();
    await dropdownButton(page).click();
    await inputElement.press("ArrowUp");
    await inputElement.press("Enter");
    await expect(
      page.locator('[data-element="confirmed-selection-5"]'),
    ).toBeHidden();
    await expect(
      page.locator('[data-element="confirmed-selection-4"]'),
    ).toBeVisible();
  });

  test("is set on the event when Enter key is pressed on an option after using alpha key", async ({
    mount,
    page,
  }) => {
    await mount(<SelectionConfirmed />);

    await dropdownButton(page).click();
    const inputElement = page.getByRole("combobox");
    await inputElement.type("t");
    await expect(
      page.locator('[data-element="confirmed-selection-2"]'),
    ).toBeHidden();
    await inputElement.press("Enter");
    await expect(
      page.locator('[data-element="confirmed-selection-2"]'),
    ).toBeVisible();
  });

  test("should not call onListScrollBottom callback when an option is clicked", async ({
    mount,
    page,
  }) => {
    let called = false;
    await mount(
      <SimpleSelectComponent
        onListScrollBottom={() => {
          called = true;
        }}
      />,
    );

    const dropdownIcon = page.getByTestId("input-icon-toggle");
    const optionList = page.getByRole("listbox");

    await dropdownIcon.click();
    await optionList.waitFor();

    const firstOption = page.getByRole("option").first();

    await firstOption.click();

    expect(called).toBeFalsy();
  });

  test("calls onListScrollBottom when the list is scrolled to the bottom", async ({
    mount,
    page,
  }) => {
    let called = false;
    await mount(
      <SimpleSelectComponent
        onListScrollBottom={() => {
          called = true;
        }}
      />,
    );

    await page.getByTestId("input-icon-toggle").click();
    const optionList = page.getByRole("listbox");
    await optionList.evaluate((element) => {
      element.scrollTop = element.scrollHeight;
      element.dispatchEvent(new Event("scroll"));
    });

    await expect.poll(() => called).toBeTruthy();
  });

  test("should not be called when an option is clicked and list is re-opened", async ({
    mount,
    page,
  }) => {
    let called = false;

    await mount(
      <SimpleSelectComponent
        onListScrollBottom={() => {
          called = true;
        }}
      />,
    );

    const dropdownIcon = page.getByTestId("input-icon-toggle");
    const optionList = page.getByRole("listbox");

    await dropdownIcon.click();
    await optionList.waitFor();

    const firstOption = page.getByRole("option").first();

    await firstOption.click();
    await optionList.waitFor({ state: "hidden" });

    await dropdownIcon.click();
    await optionList.waitFor();

    expect(called).toBeFalsy();
  });
});

test.describe("Keyboard navigation", () => {
  (
    ["ArrowDown", "ArrowUp", "Home", "End", "PageDown", "PageUp"] as const
  ).forEach((key) => {
    test(`opens the list when ${key} is pressed on the focused closed select`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleSelectComponent />);

      const inputElement = page.getByRole("combobox");
      await inputElement.focus();
      await inputElement.press(key);

      await expect(page.getByRole("listbox")).toBeVisible();
      await expect(inputElement).toHaveValue("");
    });
  });

  test("opens the list when Enter is pressed on the focused closed select", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent />);

    await page.getByRole("combobox").focus();
    await expect(page.getByRole("listbox")).toBeHidden();

    await page.getByRole("combobox").press("Enter");

    await expect(page.getByRole("listbox")).toBeVisible();
  });

  test("opens the list when Space is pressed on the focused closed select", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent />);

    await page.getByRole("combobox").focus();
    await expect(page.getByRole("listbox")).toBeHidden();

    await page.getByRole("combobox").press(" ");

    await expect(page.getByRole("listbox")).toBeVisible();
  });

  test("Home moves focus to the first option", async ({ mount, page }) => {
    await mount(<SelectionConfirmed />);

    await dropdownButton(page).click();
    const inputElement = page.getByRole("combobox");
    await inputElement.press("End");
    await inputElement.press("Home");
    await inputElement.press("Enter");

    await expect(
      page.locator('[data-element="confirmed-selection-1"]'),
    ).toBeVisible();
  });

  test("End moves focus to the last option", async ({ mount, page }) => {
    await mount(<SelectionConfirmed />);

    await dropdownButton(page).click();
    const inputElement = page.getByRole("combobox");
    await inputElement.press("End");
    await inputElement.press("Enter");

    await expect(
      page.locator('[data-element="confirmed-selection-9"]'),
    ).toBeVisible();
  });

  test("PageDown moves focus down by a fixed step rather than to the last option", async ({
    mount,
    page,
  }) => {
    await mount(<SelectionConfirmedManyOptions />);

    await dropdownButton(page).click();
    const inputElement = page.getByRole("combobox");
    await inputElement.press("PageDown");
    await inputElement.press("Enter");

    await expect(
      page.locator('[data-element="confirmed-selection-11"]'),
    ).toBeVisible();
  });

  test("PageUp moves focus up by a fixed step rather than to the first option", async ({
    mount,
    page,
  }) => {
    await mount(<SelectionConfirmedManyOptions />);

    await dropdownButton(page).click();
    const inputElement = page.getByRole("combobox");
    await inputElement.press("PageUp");
    await inputElement.press("Enter");

    await expect(
      page.locator('[data-element="confirmed-selection-10"]'),
    ).toBeVisible();
  });

  test("Space selects the focused option", async ({ mount, page }) => {
    await mount(<SelectionConfirmed />);

    await dropdownButton(page).click();
    const inputElement = page.getByRole("combobox");
    await inputElement.press("ArrowDown");
    await inputElement.press(" ");

    await expect(
      page.locator('[data-element="confirmed-selection-1"]'),
    ).toBeVisible();
  });

  test("Tab selects the focused option and moves focus to the next component", async ({
    mount,
    page,
  }) => {
    await mount(<SelectionConfirmedManyOptions />);

    await dropdownButton(page).click();
    const inputElement = page.getByRole("combobox");
    await inputElement.press("ArrowDown");
    await inputElement.press("Tab");

    await expect(
      page.locator('[data-element="confirmed-selection-1"]'),
    ).toBeVisible();
    await expect(page.getByTestId("next-focusable")).toBeFocused();
  });

  test("Tab closes without selecting when no option is focused", async ({
    mount,
    page,
  }) => {
    await mount(
      <>
        <SimpleSelectComponent />
        <button type="button">Next focusable</button>
      </>,
    );

    const inputElement = page.getByRole("combobox");
    await inputElement.focus();
    await inputElement.press("Enter");
    await inputElement.press("Tab");

    await expect(inputElement).toHaveValue("");
    await expect(page.getByRole("listbox")).toBeHidden();
    await expect(
      page.getByRole("button", { name: "Next focusable" }),
    ).toBeFocused();
  });

  test("does not loop keyboard navigation when disabled", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent disableNavigationLoop />);

    const inputElement = page.getByRole("combobox");
    await inputElement.click();
    await inputElement.press("Home");
    await inputElement.press("ArrowUp");
    await inputElement.press("Enter");
    await expect(inputElement).toHaveValue("Amber");

    await inputElement.click();
    await inputElement.press("End");
    await inputElement.press("ArrowDown");
    await inputElement.press("Enter");
    await expect(inputElement).toHaveValue("Yellow");
  });

  test("keeps typed characters in the default typeahead buffer for 1500ms", async ({
    mount,
    page,
  }) => {
    await page.clock.install();
    await mount(<SimpleSelectComponent />);

    const inputElement = page.getByRole("combobox");
    await inputElement.press("b");
    await expect(inputElement).toHaveValue("Black");

    await page.clock.runFor(750);
    await inputElement.press("r");

    await expect(inputElement).toHaveValue("Brown");
  });

  test("resets the typeahead buffer after a custom timeout", async ({
    mount,
    page,
  }) => {
    await page.clock.install();
    await mount(<SimpleSelectComponent typeaheadTimeout={100} />);

    const inputElement = page.getByRole("combobox");
    await inputElement.press("b");
    await expect(inputElement).toHaveValue("Black");

    await page.clock.runFor(150);
    await inputElement.press("r");

    await expect(inputElement).toHaveValue("Red");
  });
});

// see https://github.com/Sage/carbon/issues/6399
test.describe("Test for scroll bug regression", () => {
  test("should show the first option after scrolling through the list, closing and then reopening", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent />);
    const dropdownButtonElement = dropdownButton(page);
    await dropdownButtonElement.click();
    await page
      .getByRole("listbox")
      .evaluate((wrapper) => wrapper.scroll(0, 500));
    await commonDataElementInputPreview(page).press("Escape");
    await dropdownButtonElement.click();
    await expect(page.getByRole("option", { name: "Amber" })).toBeInViewport();
  });
});

// all accessibility tests that run with the select list open fail on "scrollable region must have keyboard access",
// so this must be disabled in each such test. (See FE-5764.)
// This is a false positive (confirmed by Accessibility team) as the select list can be accessed via the select input and the arrow keys.
test.describe("Accessibility tests for SimpleSelect component", () => {
  test("should pass accessibility tests with default example", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent />);

    await dropdownButton(page).click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  test("should pass accessibility tests with option group headers", async ({
    mount,
    page,
  }) => {
    await mount(<SelectWithOptionGroupHeader />);

    await dropdownButton(page).click();
    await checkAccessibility(page, undefined, "color-contrast");
  });

  test("should pass accessibility tests when nested in a dialog", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectNestedInDialog />);

    await page.getByRole("combobox").click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  testData.forEach((placeholderValue) => {
    test(`should pass accessibility tests with placeholder prop using ${placeholderValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleSelectComponent placeholder={placeholderValue} />);

      await checkAccessibility(page);
    });
  });
});
