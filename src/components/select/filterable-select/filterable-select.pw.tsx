import React from "react";
import { FilterableSelectProps } from ".";
import { test, expect } from "../../../../playwright/helpers/base-test";
import {
  FilterableSelectComponent,
  FilterableSelectObjectAsValueComponent,
  FilterableSelectMultiColumnsComponent,
  FilterableSelectMultiColumnsNestedComponent,
  FilterableSelectWithActionButtonComponent,
  WithVirtualScrolling,
  FilterableSelectNestedInDialog,
  FilterableSelectWithDisabledOption,
  FilterableSelectControlled,
  WithObjectAsValue,
} from "./components.test-pw";
import {
  commonDataElementInputPreview,
  getDataElementByValue,
} from "../../../../playwright/components";
import { dialogWithRole } from "../../../../playwright/components/dialog";
import { loader } from "../../../../playwright/components/loader";
import {
  boldedAndUnderlinedValue,
  dropdownButton,
  filterableSelectAddElementButton,
  filterableSelectButtonIcon,
  multiColumnsSelectListBody,
  multiColumnsSelectListHeader,
  multiColumnsSelectListHeaderColumn,
  multiColumnsSelectListNoResultsMessage,
  multiColumnsSelectListRow,
  selectInput,
  selectList,
  selectListPosition,
  selectListScrollableWrapper,
  selectListWrapper,
  selectOptionByText,
} from "../../../../playwright/components/select";
import { checkAccessibility } from "../../../../playwright/support/helper";
import { CHARACTERS } from "../../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const addElementText = "Add a New Element";
const columns = 3;
const icon = "add";
const keyToTrigger = ["ArrowDown", "ArrowUp", "Home", "End"] as const;

test.describe("FilterableSelect component", () => {
  test("should not select an option when the user types non-matching filter text in the input and then presses the Enter key", async ({
    page,
    mount,
  }) => {
    await mount(<FilterableSelectComponent />);

    await selectInput(page).fill("f");
    await selectInput(page).press("Enter");
    await expect(getDataElementByValue(page, "input")).toHaveValue("");
  });

  test("should not select an option when the user types non-matching filter text and then presses ArrowDown key", async ({
    page,
    mount,
  }) => {
    await mount(<FilterableSelectComponent />);

    await selectInput(page).fill("f");
    await selectInput(page).press("ArrowDown");
    await expect(getDataElementByValue(page, "input")).toHaveValue("f");
  });

  test("should not select an option when the user types non-matching filter text and then presses ArrowUp key", async ({
    page,
    mount,
  }) => {
    await mount(<FilterableSelectComponent />);

    await selectInput(page).fill("f");
    await selectInput(page).press("ArrowUp");
    await expect(getDataElementByValue(page, "input")).toHaveValue("f");
  });

  test("renders loader when loading prop is set to true", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent isLoading />);

    const input = page.getByRole("combobox");
    const dropdownList = page.getByRole("listbox");

    await input.click();
    await dropdownList.waitFor();

    await expect(loader(page, 1)).toBeVisible();
  });

  test("scroll position of option list doesn't change, if the component's options are dynamically changed", async ({
    mount,
    page,
  }) => {
    const { update } = await mount(
      <FilterableSelectComponent label="Colour" />,
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

    await update(<FilterableSelectComponent label="Colour" />);

    await expect(page.getByRole("option")).toHaveCount(11);

    // check that the scroll position hasn't changed
    const newScrollPosition = await dropdownList.evaluate(
      (element) => element.scrollTop,
    );
    expect(newScrollPosition).toBeCloseTo(scrollPosition, 1);
  });

  test("should list options when value is set and select list is opened again", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent />);

    const option = "Amber";
    const count = 11;
    const buttonElement = dropdownButton(page);
    const wrapperElement = selectListWrapper(page);
    await buttonElement.click();
    await selectOptionByText(page, option).click();
    await expect(getDataElementByValue(page, "input")).toHaveValue(option);
    await expect(selectInput(page)).toHaveAttribute("aria-expanded", "false");
    await expect(wrapperElement).toBeHidden();
    await buttonElement.click();
    await expect(wrapperElement.locator("li")).toHaveCount(count);
  });

  test("should have correct option highlighted when select list is opened and value is an object", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectObjectAsValueComponent />);

    const inputElement = getDataElementByValue(page, "input");
    await expect(inputElement).toHaveValue("Green");
    await dropdownButton(page).click();
    const optionElement = selectOptionByText(page, "Green");

    await expect(optionElement).toHaveCSS(
      "background-color",
      "rgb(153, 173, 183)",
    );
  });

  test("should not highlight previously selected option when value is cleared", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectControlled />);

    const inputElement = getDataElementByValue(page, "input");
    await expect(inputElement).toHaveValue("Green");

    const clearValueButton = page.getByRole("button");
    await clearValueButton.click();

    await expect(inputElement).toHaveValue("");
    await dropdownButton(page).click();

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
    await dropdownButton(page).click();

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
    await mount(<FilterableSelectObjectAsValueComponent />);

    const input = page.getByRole("combobox");
    await expect(input).toHaveValue("Green");
    await expect(input).toHaveAttribute("aria-expanded", "false");

    await input.click();
    await page.getByRole("listbox").waitFor();

    await page.getByRole("option", { name: "Amber" }).click();
    await expect(input).toHaveValue("Amber");
  });

  (
    [
      ["top", "0px", "0px", "0px", "20px"],
      ["bottom", "600px", "0px", "0px", "20px"],
    ] as [
      FilterableSelectProps["listPlacement"],
      string,
      string,
      string,
      string,
    ][]
  ).forEach(([position, top, bottom, left, right]) => {
    test(`should flip list to opposite position when there is not enough space to render in ${position} position`, async ({
      mount,
      page,
    }) => {
      await mount(
        <FilterableSelectComponent
          listPlacement={position}
          flipEnabled
          mt={top}
          mb={bottom}
          ml={left}
          mr={right}
        />,
      );

      await dropdownButton(page).click();
      const listElement = selectListPosition(page);
      await expect(listElement).toHaveAttribute(
        "data-floating-placement",
        position === "top" ? "bottom" : "top",
      );
      await expect(listElement).toBeVisible();
    });
  });

  [
    ["bottom", "0px", "0px", "0px", "20px"],
    ["top", "600px", "0px", "0px", "20px"],
    ["bottom", "200px", "0px", "0px", "900px"],
    ["top", "600px", "0px", "900px", "20px"],
  ].forEach(([position, top, bottom, left, right]) => {
    test(`should render list in ${position} position with the most space when listPosition is not set and top is ${top}, bottom is ${bottom}, left is ${left} and right is ${right}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <FilterableSelectComponent mt={top} mb={bottom} ml={left} mr={right} />,
      );

      await dropdownButton(page).click();
      const listElement = selectListPosition(page);
      await expect(listElement).toHaveAttribute(
        "data-floating-placement",
        position,
      );
      await expect(listElement).toBeVisible();
    });
  });

  test("should render list options with multiple columns", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectMultiColumnsComponent />);

    await dropdownButton(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
    const headerElements = multiColumnsSelectListHeader(page);
    await expect(headerElements).toHaveCount(columns);
    for (let i = 0; i < columns; i++) {
      await expect(headerElements.nth(i)).toBeVisible();
    }
    const bodyElements = multiColumnsSelectListBody(page);
    await expect(bodyElements).toHaveCount(columns);
    for (let i = 0; i < columns; i++) {
      await expect(bodyElements.nth(i)).toBeVisible();
    }
    await expect(multiColumnsSelectListRow(page)).toHaveCSS(
      "background-color",
      "rgb(153, 173, 183)",
    );
  });

  test("should check table header content in list with multiple columns", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectMultiColumnsComponent />);

    const headerCol1 = "Name";
    const headerCol2 = "Surname";
    const headerCol3 = "Occupation";
    await dropdownButton(page).click();
    const firstColumnElement = multiColumnsSelectListHeaderColumn(page, 1);
    const secondColumnElement = multiColumnsSelectListHeaderColumn(page, 2);
    const thirdColumnElement = multiColumnsSelectListHeaderColumn(page, 3);
    await expect(firstColumnElement).toHaveText(headerCol1);
    await expect(firstColumnElement).toBeVisible();
    await expect(secondColumnElement).toHaveText(headerCol2);
    await expect(secondColumnElement).toBeVisible();
    await expect(thirdColumnElement).toHaveText(headerCol3);
    await expect(thirdColumnElement).toBeVisible();
  });

  ["Do", " Do", "Do ", " Do "].forEach((text) => {
    test(`should indicate a matched filtered string with bold and underline with entered string "${text}"`, async ({
      mount,
      page,
    }) => {
      await mount(<FilterableSelectMultiColumnsComponent />);

      const inputElement = commonDataElementInputPreview(page);
      await inputElement.click();
      await expect(inputElement).toBeFocused();
      await inputElement.fill(text);
      const highlightedValue = boldedAndUnderlinedValue(page, text);
      await expect(highlightedValue).toHaveCSS(
        "text-decoration-line",
        "underline",
      );
      await expect(highlightedValue).toHaveCSS(
        "text-decoration-style",
        "solid",
      );
      await expect(highlightedValue).toHaveCSS("font-weight", "500");
    });
  });

  test("should indicate no results match for entered string", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectMultiColumnsComponent />);

    const text = "Xyz";
    const inputElement = commonDataElementInputPreview(page);
    await inputElement.click();
    await expect(inputElement).toBeFocused();
    await inputElement.fill(text);
    await expect(selectListWrapper(page)).toBeVisible();
    const headerElements = multiColumnsSelectListHeader(page);
    await expect(headerElements).toHaveCount(columns);
    const assertions = [];
    for (let i = 0; i < columns; i++) {
      assertions.push(await expect(headerElements.nth(i)).toBeVisible());
    }
    await Promise.all(assertions);
    await expect(
      multiColumnsSelectListNoResultsMessage(page, text),
    ).toBeVisible();
  });

  test("should render list options with multiple columns and nested component", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectMultiColumnsNestedComponent />);

    await dropdownButton(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
    const headerElements = multiColumnsSelectListHeader(page);
    await expect(headerElements).toHaveCount(columns);
    const headerAssertions = [];
    for (let i = 0; i < columns; i++) {
      headerAssertions.push(await expect(headerElements.nth(i)).toBeVisible());
    }
    await Promise.all(headerAssertions);
    const bodyElements = multiColumnsSelectListBody(page);
    await expect(bodyElements).toHaveCount(columns);
    const bodyAssertions = [];
    for (let i = 0; i < columns; i++) {
      bodyAssertions.push(await expect(bodyElements.nth(i)).toBeVisible());
    }
    await Promise.all(bodyAssertions);
    const addElementButtonElement = filterableSelectAddElementButton(page);
    await expect(addElementButtonElement).toBeVisible();
    await expect(addElementButtonElement).toHaveText(addElementText);
    const iconElement = filterableSelectButtonIcon(page);
    await expect(iconElement).toBeVisible();
    await expect(iconElement).toHaveAttribute("type", icon);
  });

  test("should render list options with an action button and trigger Dialog on action", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectWithActionButtonComponent />);

    await dropdownButton(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
    const addElementButtonElement = filterableSelectAddElementButton(page);
    await expect(addElementButtonElement).toBeVisible();
    await expect(addElementButtonElement).toHaveText(addElementText);
    const iconElement = filterableSelectButtonIcon(page);
    await expect(iconElement).toBeVisible();
    await expect(iconElement).toHaveAttribute("type", icon);
    await addElementButtonElement.click();
    await expect(dialogWithRole(page, "dialog")).toBeVisible();
  });

  test("should render list options with an action button that is visible without scrolling and without affecting the list height", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectWithActionButtonComponent />);

    await dropdownButton(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
    await expect(filterableSelectAddElementButton(page)).toBeInViewport();
    const selectListHeight = await selectListWrapper(page).evaluate(
      (wrapperElement) =>
        parseInt(
          window.getComputedStyle(wrapperElement).getPropertyValue("height"),
        ),
    );
    expect(selectListHeight).toBeGreaterThan(220);
    expect(selectListHeight).toBeLessThan(250);
  });

  test("when navigating with the keyboard, the selected option is not hidden behind an action button", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectWithActionButtonComponent />);

    await dropdownButton(page).click();
    const inputElement = commonDataElementInputPreview(page);
    for (let i = 0; i < 5; i++) {
      await inputElement.focus();

      await inputElement.press("ArrowDown");
    }
    await expect(selectOptionByText(page, "Green").nth(0)).toBeInViewport();
  });

  test("should add new list option from Add new Dialog", async ({
    mount,
    page,
  }) => {
    const newOption = "New10";
    await mount(<FilterableSelectWithActionButtonComponent />);

    // open select list
    const input = page.getByRole("combobox");
    await input.click();
    await expect(page.getByRole("listbox")).toBeVisible();

    const addElementButtonElement = page.getByRole("button", {
      name: "Add a New Element",
    });
    await addElementButtonElement.click();

    const alert = page.getByRole("dialog");
    await expect(alert).toBeVisible();

    const alertAddNewButton = page.getByRole("button", { name: "Add new" });
    await alertAddNewButton.click();

    await expect(input).toHaveValue(newOption);
  });
});

test.describe("onListScrollBottom prop", () => {
  test("calls onListScrollBottom when the list is scrolled to the bottom", async ({
    mount,
    page,
  }) => {
    let called = false;

    await mount(
      <FilterableSelectComponent
        onListScrollBottom={() => {
          called = true;
        }}
      />,
    );

    await page.getByRole("combobox").click();
    await page.getByRole("listbox").waitFor();

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
      <FilterableSelectComponent
        onListScrollBottom={() => {
          called = true;
        }}
      />,
    );

    await page.getByRole("combobox").click();
    await page.getByRole("listbox").waitFor();

    const firstOption = page.getByRole("option").first();
    await firstOption.click();

    expect(called).toBeFalsy();
  });

  test("does not call onListScrollBottom when an option is clicked and list is re-opened", async ({
    mount,
    page,
  }) => {
    let called = false;

    await mount(
      <FilterableSelectComponent
        onListScrollBottom={() => {
          called = true;
        }}
      />,
    );

    const input = page.getByRole("combobox");
    await input.click();
    await page.getByRole("listbox").waitFor();

    const firstOption = page.getByRole("option").first();
    await firstOption.click();

    await input.click();

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

  [keyToTrigger[0], keyToTrigger[1]].forEach((key) => {
    test(`should not select an option when non-matching filter text is entered and then ${key} key is pressed`, async ({
      mount,
      page,
    }) => {
      await mount(<FilterableSelectComponent />);

      const input = page.getByRole("combobox");
      await input.fill("foo");
      await input.press(key);

      await expect(page.getByText('No results for "foo"')).toBeVisible();
    });
  });
});

test.describe("When nested inside of a Dialog component", () => {
  test("should not close the Dialog when Select is closed by pressing an escape key", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectNestedInDialog />);

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
    await mount(<FilterableSelectNestedInDialog />);

    await dropdownButton(page).click();
    await dialogWithRole(page, "dialog").click();
    await expect(selectList(page)).toBeHidden();
    await expect(commonDataElementInputPreview(page)).not.toBeFocused();
  });

  test("should focus the Select and open the list when autoFocus and openOnFocus props set", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectNestedInDialog autofocus openOnFocus />);

    await expect(commonDataElementInputPreview(page)).toBeFocused();
    await expect(selectList(page)).toBeVisible();
  });
});

test("should not throw when filter text does not match option text", async ({
  mount,
  page,
}) => {
  await mount(
    <FilterableSelectComponent value={undefined} onChange={undefined} />,
  );

  await commonDataElementInputPreview(page).fill("abc");
  await selectInput(page).press("Enter");
  await expect(getDataElementByValue(page, "input")).toHaveValue("");
});

test("skips disabled option while navigating via arrow keys", async ({
  mount,
  page,
}) => {
  await mount(<FilterableSelectWithDisabledOption />);

  const combobox = page.getByRole("combobox");
  await combobox.press("ArrowDown");

  const listbox = page.getByRole("listbox");
  await listbox.waitFor();
  await expect(combobox).toHaveValue("One");

  await combobox.press("ArrowDown");
  await expect(combobox).toHaveValue("Three");
});

// see https://github.com/Sage/carbon/issues/6399
test.describe("Test for scroll bug regression", () => {
  test("should show the first option after scrolling through the list, closing and then reopening", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent />);
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
test.describe("Accessibility tests for FilterableSelect component", () => {
  test("should pass accessibility tests with isLoading prop", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent isLoading />);

    await dropdownButton(page).click();
    await expect(loader(page, 1)).toBeVisible();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  test("should pass accessibility tests with multiple columns", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectMultiColumnsComponent />);

    await dropdownButton(page).click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  test("should pass accessibility tests with multiple columns and nested component", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectMultiColumnsNestedComponent />);

    await dropdownButton(page).click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  test("should pass accessibility tests with an action button and trigger Dialog on action", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectWithActionButtonComponent />);

    await dropdownButton(page).click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  test("should pass accessibility tests when nested in a dialog", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectNestedInDialog />);

    await dropdownButton(page).click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  testData.forEach((placeholderValue) => {
    test(`should pass accessibility tests with placeholder prop using ${placeholderValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<FilterableSelectComponent placeholder={placeholderValue} />);

      await checkAccessibility(page);
    });
  });
});
