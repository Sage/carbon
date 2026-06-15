import React from "react";
import MultiSelect from ".";
import Option from "../option";
import { test, expect } from "../../../../playwright/helpers/base-test";
import {
  MultiSelectComponent,
  WithVirtualScrolling,
  MultiSelectNestedInDialog,
  MultiSelectErrorOnChangeNewValidation,
  MultiSelectWithDisabledOption,
  MultiSelectMultiColumnsComponent,
} from "./components.test-pw";
import { commonDataElementInputPreview } from "../../../../playwright/components";
import { dialogWithRole } from "../../../../playwright/components/dialog";
import { loader } from "../../../../playwright/components/loader";
import {
  dropdownButton,
  multiSelectPill,
  selectInput,
  selectList,
  selectListScrollableWrapper,
  selectOptionByText,
} from "../../../../playwright/components/select";
import { checkAccessibility } from "../../../../playwright/support/helper";

test.describe("MultiSelect component", () => {
  test("scroll position of option list doesn't change, if the component's options are dynamically changed", async ({
    mount,
    page,
  }) => {
    const { update } = await mount(
      <MultiSelect label="Colour" onChange={() => {}} value={["Amber"]}>
        <Option text="Amber" value="Amber" />
        <Option text="Black" value="Black" />
        <Option text="Cyan" value="Cyan" />
        <Option text="Dark Blue" value="Dark Blue" />
        <Option text="Emerald" value="Emerald" />
        <Option text="Fuchsia" value="Fuchsia" />
        <Option text="Gold" value="Gold" />
      </MultiSelect>,
    );

    const input = page.getByRole("combobox");
    await input.focus();
    await input.press("ArrowDown");

    const dropdownList = page.getByRole("listbox");
    await dropdownList.waitFor();

    await page.keyboard.press("ArrowUp");
    await expect(page.getByRole("option").last()).toBeInViewport();

    const scrollPosition = await dropdownList.evaluate(
      (element) => element.scrollTop,
    );

    await update(
      <MultiSelect label="Colour" onChange={() => {}} value={["Amber"]}>
        <Option text="Amber" value="Amber" />
        <Option text="Black" value="Black" />
        <Option text="Cyan" value="Cyan" />
        <Option text="Dark Blue" value="Dark Blue" />
        <Option text="Emerald" value="Emerald" />
        <Option text="Fuchsia" value="Fuchsia" />
        <Option text="Gold" value="Gold" />
        <Option text="Hot Pink" value="Hot Pink" />
        <Option text="Indigo" value="Indigo" />
      </MultiSelect>,
    );

    await expect(page.getByRole("option")).toHaveCount(9);

    // check that the scroll position hasn't changed
    const newScrollPosition = await dropdownList.evaluate(
      (element) => element.scrollTop,
    );
    expect(newScrollPosition).toBeCloseTo(scrollPosition, 1);
  });

  test("calls onListScrollBottom when the dropdown list is scrolled to the bottom", async ({
    mount,
    page,
  }) => {
    let called = false;
    await mount(
      <MultiSelectComponent
        onListScrollBottom={() => {
          called = true;
        }}
      />,
    );

    const input = page.getByRole("combobox");
    await input.click();

    const dropdownList = page.getByRole("listbox");
    await dropdownList.waitFor();

    const lastOption = page.getByRole("option").last();
    await lastOption.scrollIntoViewIfNeeded();

    await expect(async () => {
      expect(called).toBeTruthy();
    }).toPass();
  });

  test("does not call onListScrollBottom when an option is clicked", async ({
    mount,
    page,
  }) => {
    let called = false;
    await mount(
      <MultiSelectComponent
        onListScrollBottom={() => {
          called = true;
        }}
      />,
    );

    const input = page.getByRole("combobox");
    await input.click();

    const dropdownList = page.getByRole("listbox");
    await dropdownList.waitFor();

    const firstOption = page.getByRole("option").first();
    await firstOption.click();

    expect(called).toBeFalsy();
  });
});

test.describe("Check virtual scrolling", () => {
  test("renders only an appropriate number of options into the DOM when first opened", async ({
    mount,
    page,
  }) => {
    await mount(<WithVirtualScrolling />);

    await dropdownButton(page).click();
    await expect(selectOptionByText(page, "Option 1.")).toBeInViewport();
    const option10 = selectOptionByText(page, "Option 10.");
    await expect(option10).toHaveCount(1);
    await expect(option10).not.toBeInViewport();
    await expect(selectOptionByText(page, "Option 30.")).toHaveCount(0);
  });

  test("changes the rendered options when you scroll down", async ({
    mount,
    page,
  }) => {
    await mount(<WithVirtualScrolling />);

    const input = page.getByRole("combobox");
    await input.click();

    const list = page.getByRole("listbox");
    await list.waitFor();

    const firstOption = page.getByRole("option").first();
    const lastOption = page.getByRole("option").last();

    await expect(firstOption).toHaveText("Option 1.");
    await expect(lastOption).toHaveText("Option 15.");

    await lastOption.scrollIntoViewIfNeeded();

    await expect(firstOption).not.toHaveText("Option 1.");
    await expect(lastOption).not.toHaveText("Option 15.");
  });

  test("should filter options when text is typed, taking into account non-rendered options", async ({
    mount,
    page,
  }) => {
    await mount(<WithVirtualScrolling />);

    await commonDataElementInputPreview(page).fill("Option 100");
    await expect(selectOptionByText(page, "Option 100.")).toBeInViewport();
    await expect(selectOptionByText(page, "Option 1000.")).toBeInViewport();
    await expect(selectOptionByText(page, "Option 1002.")).toBeInViewport();
  });
});

test.describe("When nested inside of a Dialog component", () => {
  test("should not close the Dialog when Select is closed by pressing an escape key", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectNestedInDialog />);

    await dropdownButton(page).click();
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
    await mount(<MultiSelectNestedInDialog />);

    await dropdownButton(page).click();
    await dialogWithRole(page, "dialog").click();
    await expect(selectList(page)).toBeHidden();
    await expect(commonDataElementInputPreview(page)).not.toBeFocused();
  });

  test("should focus the select input and open the list when autoFocus and openOnFocus props set", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectNestedInDialog autofocus openOnFocus />);

    await expect(commonDataElementInputPreview(page)).toBeFocused();
    await expect(selectList(page)).toBeVisible();
  });
});

test.describe("When error is triggered by onChange", () => {
  test("should display correctly", async ({ mount, page }) => {
    await mount(<MultiSelectErrorOnChangeNewValidation />);

    await dropdownButton(page).click();
    await selectOptionByText(page, "Green").click();
    await selectOptionByText(page, "Purple").click();
    await selectOptionByText(page, "Yellow").click();

    /* This is <p>Error</p> that displays the error message in the new validations.
      It does not have a data-element or data-component prop to target the element with.
      This can be refactored once this is implemented. */
    const errorElement = page.locator(
      'span[data-component="validation-message"]',
    );
    await expect(errorElement).toBeVisible();
    await expect(errorElement).toHaveText("Error");
  });
});

test("should not add an empty Pill when filter text does not match option text", async ({
  mount,
  page,
}) => {
  await mount(<MultiSelectComponent />);

  const pillElement = multiSelectPill(page);
  await expect(pillElement).toBeHidden();
  await commonDataElementInputPreview(page).fill("abc");
  await selectInput(page).press("Enter");
  await expect(pillElement).toBeHidden();
});

test("should not select a disabled option when a filter is typed", async ({
  mount,
  page,
}) => {
  await mount(<MultiSelectWithDisabledOption />);

  await dropdownButton(page).click();
  const inputElement = selectInput(page);
  await inputElement.fill("t");
  await inputElement.press("Enter");
  await expect(
    page.locator('[data-element="confirmed-selection-2"]'),
  ).toBeHidden();
  await inputElement.press("ArrowDown");
  await inputElement.press("Enter");
  await expect(
    page.locator('[data-element="confirmed-selection-3"]'),
  ).toBeVisible();

  const pillElement = multiSelectPill(page);
  await expect(pillElement).toHaveCount(1);
});

// see https://github.com/Sage/carbon/issues/6399
test.describe("Test for scroll bug regression", () => {
  test("should show the first option after scrolling through the list, closing and then reopening", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent />);
    const dropdownButtonElement = dropdownButton(page);
    await dropdownButtonElement.click();
    await selectListScrollableWrapper(page).evaluate((wrapper) =>
      wrapper.scrollBy(0, 500),
    );
    await commonDataElementInputPreview(page).press("Escape");
    await dropdownButtonElement.click();
    await expect(selectOptionByText(page, "Amber")).toBeInViewport();
  });
});

// all accessibility tests that run with the select list open fail on "scrollable region must have keyboard access",
// so this must be disabled in each such test. (See FE-5764.)
// This is a false positive (confirmed by Accessibility team) as the select list can be accessed via the select input and the arrow keys.
test.describe("Accessibility tests for MultiSelect component", () => {
  test("should pass accessibility tests with default example", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent />);

    await dropdownButton(page).click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  test("should pass accessibility tests with isLoading prop", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent isLoading />);

    await dropdownButton(page).click();
    await expect(loader(page, 1)).toBeVisible();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  test("should pass accessibility tests with multiple columns", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectMultiColumnsComponent />);

    await dropdownButton(page).click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  test("should pass accessibility tests for MultiSelect in nested dialog", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectNestedInDialog />);

    await dropdownButton(page).click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });
});
