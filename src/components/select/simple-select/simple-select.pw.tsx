import React from "react";
import Option from "../option";
import { test, expect } from "../../../../playwright/helpers/base-test";
import {
  SimpleSelectComponent,
  WithVirtualScrolling,
  SimpleSelectNestedInDialog,
  SelectWithOptionGroupHeader,
  SelectionConfirmed,
  SimpleSelectControlled,
  WithObjectAsValue,
  SimpleSelectObjectAsValueComponent,
} from "./components.test-pw";
import {
  commonDataElementInputPreview,
  getDataElementByValue,
} from "../../../../playwright/components";
import { dialogWithRole } from "../../../../playwright/components/dialog";
import {
  dropdownButton,
  selectInput,
  selectList,
  selectListScrollableWrapper,
  selectOption,
  selectOptionByText,
  selectText,
} from "../../../../playwright/components/select";
import {
  checkAccessibility,
  positionOfElement,
} from "../../../../playwright/support/helper";

test.describe("SimpleSelect component", () => {
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
    await expect(page.getByRole("option").last()).toBeInViewport();

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

    const inputElement = getDataElementByValue(page, "input");
    await expect(inputElement).toHaveValue("Green");

    const clearValueButton = page.getByRole("button");
    await clearValueButton.click();

    await expect(inputElement).toHaveValue("");
    await selectText(page).click();

    const optionElement = selectOptionByText(page, "Green");
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

    const inputElement = getDataElementByValue(page, "input");
    await expect(inputElement).toHaveValue("Green");

    const clearValueButton = page.getByRole("button");
    await clearValueButton.click();

    await expect(inputElement).toHaveValue("");
    await selectText(page).click();

    const optionElement = selectOptionByText(page, "Green");
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

    const position = "first";
    const positionValue = "Amber";
    const inputElement = getDataElementByValue(page, "input");
    await expect(inputElement).toHaveValue("Green");
    await expect(selectInput(page)).toHaveAttribute("aria-expanded", "false");
    await selectText(page).click();
    await selectOption(page, positionOfElement(position)).click();
    await expect(inputElement).toHaveValue(positionValue);
  });
});

test.describe("Check virtual scrolling", () => {
  test("does not render all virtualised options", async ({ mount, page }) => {
    await mount(<WithVirtualScrolling />);

    await page.getByText("Please Select...").click();

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

    await page.getByText("Please Select...").click();

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
    await page
      .getByTestId("select-list-scrollable-container")
      .evaluate((element) => {
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

    await selectText(page).click();
    await selectListScrollableWrapper(page).evaluate((wrapper) =>
      wrapper.scrollBy(0, wrapper.scrollHeight),
    );

    await expect(selectOptionByText(page, "Yellow")).toBeInViewport({
      ratio: 1,
    });
    await selectOptionByText(page, "Yellow").click();

    await expect(selectOptionByText(page, "Yellow")).toBeHidden();

    await selectText(page).click();
    await expect(selectOptionByText(page, "Yellow")).toBeInViewport({
      ratio: 1,
    });

    await page.locator("body").click();

    await selectText(page).click();
    await expect(selectOptionByText(page, "Yellow")).toBeInViewport({
      ratio: 1,
    });
  });

  test("a selected option stays rendered even when out of view", async ({
    mount,
    page,
  }) => {
    await mount(<WithVirtualScrolling />);

    // open list and select first option
    await page.getByText("Please Select...").click();
    const firstOption = page.getByRole("option", {
      name: "Option 1",
      exact: true,
    });
    await firstOption.click();

    // reopen list
    await page.getByTestId("select-text").click();

    // scroll to the bottom of dropdown list
    await page
      .getByTestId("select-list-scrollable-container")
      .evaluate((element) => {
        element.scrollBy(0, element.scrollHeight);
      });

    await expect(firstOption).toBeAttached();
  });
});

test.describe("When nested inside of a Dialog component", () => {
  test("should not close the Dialog when Select is closed by pressing an escape key", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectNestedInDialog />);

    await selectText(page).click();
    const inputElement = commonDataElementInputPreview(page);
    const dialogElement = dialogWithRole(page, "dialog");
    await inputElement.press("Escape");
    await expect(selectList(page)).toBeHidden();
    await expect(dialogElement).toBeVisible();
    await inputElement.press("Escape");
    await expect(dialogElement).toBeHidden();
  });

  test("should not refocus the select textbox when closing it by clicking outside", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectNestedInDialog />);

    await selectText(page).click();
    await dialogWithRole(page, "dialog").click();
    await expect(selectList(page)).toBeHidden();
    await expect(commonDataElementInputPreview(page)).not.toBeFocused();
  });

  test("should focus the select input and open the list when autoFocus and openOnFocus props set", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectNestedInDialog autofocus openOnFocus />);

    await expect(commonDataElementInputPreview(page)).toBeFocused();
    await expect(selectList(page)).toBeVisible();
  });

  test("should be able to focus the last item in the select list when the select list has an OptionGroupHeader", async ({
    mount,
    page,
  }) => {
    await mount(<SelectWithOptionGroupHeader />);

    await selectText(page).click();
    await commonDataElementInputPreview(page).press("ArrowDown");
    await commonDataElementInputPreview(page).press("ArrowDown");
    await commonDataElementInputPreview(page).press("ArrowDown");
    await expect(selectOptionByText(page, "This is the last")).toBeVisible();
  });
});

test.describe("Selection confirmed", () => {
  test("is set on the event when options are clicked", async ({
    mount,
    page,
  }) => {
    await mount(<SelectionConfirmed />);

    await dropdownButton(page).click();
    await selectOptionByText(page, "One").click();
    await expect(
      page.locator('[data-element="confirmed-selection-1"]'),
    ).toBeVisible();
    await dropdownButton(page).click();
    await selectOptionByText(page, "Five").click();
    await expect(
      page.locator('[data-element="confirmed-selection-1"]'),
    ).toBeHidden();
    await expect(
      page.locator('[data-element="confirmed-selection-5"]'),
    ).toBeVisible();
    await dropdownButton(page).click();
    await selectOptionByText(page, "Seven").click();
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
    const inputElement = selectInput(page);
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
    const inputElement = selectInput(page);
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
    const inputElement = selectInput(page);
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

// see https://github.com/Sage/carbon/issues/6399
test.describe("Test for scroll bug regression", () => {
  test("should show the first option after scrolling through the list, closing and then reopening", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent />);
    const dropdownButtonElement = dropdownButton(page);
    await dropdownButtonElement.click();
    await selectListScrollableWrapper(page).evaluate((wrapper) =>
      wrapper.scroll(0, 500),
    );
    await commonDataElementInputPreview(page).press("Escape");
    await dropdownButtonElement.click();
    await expect(selectOptionByText(page, "Amber")).toBeInViewport();
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

  test("should pass accessibility tests when nested in a dialog", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectNestedInDialog />);

    await selectText(page).click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });
});
