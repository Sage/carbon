import { expect, test } from "@playwright/experimental-ct-react17";
import React from "react";
import { SimpleSelectProps } from "..";
import {
  SimpleSelectComponent,
  SimpleSelectWithLazyLoadingComponent,
  SimpleSelectWithInfiniteScrollComponent,
  SimpleSelectMultipleColumnsComponent,
  SimpleSelectObjectAsValueComponent,
  SimpleSelectCustomOptionChildrenComponent,
  SimpleSelectGroupComponent,
  SimpleSelectWithLongWrappingTextComponent,
  SimpleSelectEventsComponent,
  WithVirtualScrolling,
  SimpleSelectNestedInDialog,
  SelectWithOptionGroupHeader,
  SelectionConfirmed,
  SelectWithDynamicallyAddedOption,
  SimpleSelectControlled,
  WithObjectAsValue,
  ListWidth,
  ComplexCustomChildren,
} from "./components.test-pw";
import {
  commonDataElementInputPreview,
  getDataElementByValue,
  helpIcon,
  tooltipPreview,
} from "../../../../playwright/components";
import { alertDialogPreview } from "../../../../playwright/components/dialog";
import { loader } from "../../../../playwright/components/loader";
import {
  dropdownButton,
  multiColumnsSelectListBody,
  multiColumnsSelectListHeader,
  multiColumnsSelectListHeaderColumn,
  multiColumnsSelectListRow,
  selectElementInput,
  selectInput,
  selectList,
  selectListCustomChild,
  selectListOptionGroup,
  selectListPosition,
  selectListScrollableWrapper,
  selectListWrapper,
  selectOption,
  selectOptionByText,
  selectText,
} from "../../../../playwright/components/select";
import {
  checkAccessibility,
  assertCssValueIsApproximately,
  positionOfElement,
  verifyRequiredAsteriskForLabel,
} from "../../../../playwright/support/helper";
import { CHARACTERS, SIZE } from "../../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testPropValue = CHARACTERS.STANDARD;
const keyToTrigger = ["ArrowDown", "ArrowUp", "Space", "Home", "End"] as const;

test("should have the expected styling when focused", async ({
  mount,
  page,
}) => {
  await mount(<SimpleSelectComponent />);

  const selectInputElement = commonDataElementInputPreview(page);
  await selectInputElement.focus();
  await expect(selectInputElement.locator("..")).toHaveCSS(
    "box-shadow",
    "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
  );
  await expect(selectInputElement.locator("..")).toHaveCSS(
    "outline",
    "rgba(0, 0, 0, 0) solid 3px",
  );
});

test.describe("SimpleSelect component", () => {
  testData.forEach((labelValue) => {
    test(`should render label using ${labelValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleSelectComponent label={labelValue} />);

      await expect(getDataElementByValue(page, "label")).toHaveText(labelValue);
    });
  });

  testData.forEach((labelHelpValue) => {
    test(`should render labelHelp message using ${labelHelpValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleSelectComponent labelHelp={labelHelpValue} />);

      await helpIcon(page).hover();
      await expect(tooltipPreview(page)).toHaveText(labelHelpValue);
    });
  });

  testData.forEach((placeholderValue) => {
    test(`should render placeholder using ${placeholderValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleSelectComponent placeholder={placeholderValue} />);

      await expect(selectText(page)).toHaveText(placeholderValue);
    });
  });

  test("should render with data-component prop set to playwright_data", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent data-component={testPropValue} />);

    await expect(
      selectElementInput(page).locator("..").locator(".."),
    ).toHaveAttribute("data-component", testPropValue);
  });

  test("should render with data-element prop set to playwright_data", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent data-element={testPropValue} />);

    await expect(
      selectElementInput(page).locator("..").locator(".."),
    ).toHaveAttribute("data-element", testPropValue);
  });

  test("should render with data-role prop set to playwright_data", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent data-role={testPropValue} />);

    await expect(
      selectElementInput(page).locator("..").locator(".."),
    ).toHaveAttribute("data-role", testPropValue);
  });

  (
    [
      ["top", "200px", "0px", "0px", "0px"],
      ["bottom", "0px", "0px", "0px", "0px"],
      ["left", "200px", "0px", "200px", "0px"],
      ["right", "200px", "0px", "0px", "200px"],
    ] as const
  ).forEach(([tooltipPositionValue, top, bottom, left, right]) => {
    test(`should render the help tooltip in the ${tooltipPositionValue} position`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SimpleSelectComponent
          labelHelp="Help"
          tooltipPosition={tooltipPositionValue}
          mt={top}
          mb={bottom}
          ml={left}
          mr={right}
        />,
      );

      await helpIcon(page).hover();
      const tooltipElement = tooltipPreview(page);
      await expect(tooltipElement).toBeVisible();
      await expect(tooltipElement).toHaveAttribute(
        "data-placement",
        tooltipPositionValue,
      );
    });
  });

  test("should check disabled prop", async ({ mount, page }) => {
    await mount(<SimpleSelectComponent disabled />);

    const selectInputElement = commonDataElementInputPreview(page);
    await expect(selectInputElement).toBeDisabled();
  });

  test("should render icon with disabled style", async ({ mount, page }) => {
    await mount(<SimpleSelectComponent disabled />);

    const dropdownButtonElement = dropdownButton(page);
    await expect(dropdownButtonElement).toBeVisible();
    await expect(dropdownButtonElement).toHaveCSS(
      "color",
      "rgba(0, 0, 0, 0.3)",
    );
  });

  test("should render as read only", async ({ mount, page }) => {
    await mount(<SimpleSelectComponent readOnly />);

    await selectText(page).click();
    await expect(commonDataElementInputPreview(page)).not.toBeEditable();
    await expect(selectText(page)).toHaveAttribute("aria-hidden", "true");
    await expect(selectListWrapper(page)).not.toBeVisible();
  });

  test("should render icon with read only style", async ({ mount, page }) => {
    await mount(<SimpleSelectComponent readOnly />);

    const dropdownButtonElement = dropdownButton(page);
    await expect(dropdownButtonElement).toBeVisible();
    await expect(dropdownButtonElement).toHaveCSS(
      "color",
      "rgba(0, 0, 0, 0.3)",
    );
  });

  test("should render as transparent", async ({ mount, page }) => {
    await mount(<SimpleSelectComponent transparent />);

    await expect(getDataElementByValue(page, "input")).toHaveCSS(
      "background",
      "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box",
    );
  });

  (
    [
      [SIZE.SMALL, "32px"],
      [SIZE.MEDIUM, "40px"],
      [SIZE.LARGE, "48px"],
    ] as [SimpleSelectProps["size"], string][]
  ).forEach(([size, height]) => {
    test(`should use ${size} as size and render with ${height} as height`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleSelectComponent size={size} />);

      await expect(commonDataElementInputPreview(page).locator("..")).toHaveCSS(
        "min-height",
        height,
      );
    });
  });

  test("should check autofocus prop", async ({ mount, page }) => {
    await mount(<SimpleSelectComponent autoFocus />);

    await expect(commonDataElementInputPreview(page)).toBeFocused();
  });

  test("should check required prop", async ({ mount, page }) => {
    await mount(<SimpleSelectComponent required />);

    await verifyRequiredAsteriskForLabel(page);
  });

  test("should check label is inline", async ({ mount, page }) => {
    await mount(<SimpleSelectComponent labelInline />);

    await expect(getDataElementByValue(page, "label").locator("..")).toHaveCSS(
      "-webkit-box-pack",
      "end",
    );
  });

  (
    [
      ["right", "end"],
      ["left", "start"],
    ] as [SimpleSelectProps["labelAlign"], string][]
  ).forEach(([alignment, cssProp]) => {
    test(`should use ${alignment} as labelAlignment and render with flex-${cssProp} as css properties`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleSelectComponent labelInline labelAlign={alignment} />);

      const labelParentElement = getDataElementByValue(page, "label").locator(
        "..",
      );
      await expect(labelParentElement).toHaveCSS("-webkit-box-pack", cssProp);
      await expect(labelParentElement).toHaveCSS(
        "justify-content",
        `flex-${cssProp}`,
      );
    });
  });

  [
    [10, 90, 135, 1229],
    [30, 70, 409, 956],
    [80, 20, 1092, 273],
  ].forEach(([label, input, labelRatio, inputRatio]) => {
    test(`should use ${label} as labelWidth, ${input} as inputWidth and render with correct label and input width ratios`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SimpleSelectComponent
          labelInline
          labelWidth={label}
          inputWidth={input}
        />,
      );

      await assertCssValueIsApproximately(
        getDataElementByValue(page, "label").locator(".."),
        "width",
        labelRatio,
      );
      await assertCssValueIsApproximately(
        getDataElementByValue(page, "input").locator(".."),
        "width",
        inputRatio,
      );
    });
  });

  ["10%", "30%", "50%", "80%", "100%"].forEach((maxWidth) => {
    test(`should check maxWidth as ${maxWidth}`, async ({ mount, page }) => {
      await mount(<SimpleSelectComponent maxWidth={maxWidth} />);

      await expect(
        getDataElementByValue(page, "input").locator("..").locator(".."),
      ).toHaveCSS("max-width", maxWidth);
    });
  });

  test("when maxWidth has no value it should render as 100%", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent maxWidth="" />);

    await expect(
      getDataElementByValue(page, "input").locator("..").locator(".."),
    ).toHaveCSS("max-width", "100%");
  });

  test("opens dropdown list when input is clicked", async ({ mount, page }) => {
    await mount(<SimpleSelectComponent />);

    await page.getByText("Please Select...").click();

    const combobox = page.getByRole("combobox", { name: "simple select" });
    await expect(combobox).toHaveAttribute("aria-expanded", "true");

    const dropdownList = page.getByRole("listbox");
    await expect(dropdownList).toBeVisible();
  });

  test("opens dropdown list when dropdown icon is clicked", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent />);

    const dropdownIcon = page.getByTestId("icon");
    await dropdownIcon.click();

    const dropdownList = page.getByRole("listbox");
    await expect(dropdownList).toBeVisible();
  });

  test("dropdown list appears beneath input when it is clicked", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent />);

    await page.getByText("Please select...").click();

    const combobox = await page
      .getByRole("combobox", { name: "simple select" })
      .boundingBox();
    const dropdownList = await page.getByRole("listbox").boundingBox();

    if (!combobox) throw new Error("Combobox not found or visible.");
    if (!dropdownList) throw new Error("Dropdown list not found or visible.");

    expect(combobox.y).toBeLessThan(dropdownList.y);
  });

  test("should close the list with the Tab key", async ({ mount, page }) => {
    await mount(<SimpleSelectComponent />);

    const selectListWrapperElement = selectListWrapper(page);
    const selectInputElement = selectInput(page);
    await selectText(page).click();
    await expect(selectListWrapperElement).toBeVisible();
    await selectInputElement.press("Tab");
    await expect(selectInputElement).toHaveAttribute("aria-expanded", "false");
    await expect(selectListWrapperElement).not.toBeVisible();
  });

  test("should close the list with the Esc key", async ({ mount, page }) => {
    await mount(<SimpleSelectComponent />);

    const selectListWrapperElement = selectListWrapper(page);
    await selectText(page).click();
    await expect(selectListWrapperElement).toBeVisible();
    await commonDataElementInputPreview(page).press("Escape");
    await expect(selectInput(page)).toHaveAttribute("aria-expanded", "false");
    await expect(selectListWrapperElement).not.toBeVisible();
  });

  test("should close the list by clicking out of the component", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent />);

    await selectText(page).click();
    const selectListWrapperElement = selectListWrapper(page);
    await expect(selectListWrapperElement).toBeVisible();
    await page.locator("body").click();
    await expect(selectInput(page)).toHaveAttribute("aria-expanded", "false");
    await expect(selectListWrapperElement).not.toBeVisible();
  });

  keyToTrigger.forEach((key) => {
    test(`should open the list when ${key} is pressed with Select input in focus`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleSelectComponent />);

      await commonDataElementInputPreview(page).focus();
      await selectInput(page).press(key);
      await expect(selectListWrapper(page)).toBeVisible();
    });
  });

  ["Amber", "Yellow"].forEach((option) => {
    test(`should select option ${option} when clicked from the list`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleSelectComponent />);

      await selectText(page).click();
      await selectOptionByText(page, option).click();
      await expect(getDataElementByValue(page, "input")).toHaveValue(option);
      await expect(selectInput(page)).toHaveAttribute("aria-expanded", "false");
      await expect(selectListWrapper(page)).not.toBeVisible();
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
    await selectText(page).click();
    const selectListWrapperElement = selectListWrapper(page);
    await expect(selectListWrapperElement).toBeVisible();
    await selectOptionByText(page, optionValue11).scrollIntoViewIfNeeded();
    await expect(selectOptionByText(page, optionValue8)).toBeInViewport();
    await expect(
      selectOptionByText(page, optionValue9).nth(1),
    ).toBeInViewport();
    await expect(selectOptionByText(page, optionValue10)).toBeInViewport();
    await expect(selectOptionByText(page, optionValue11)).toBeInViewport();
  });

  test("should render the lazy loader when the prop is set", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectWithLazyLoadingComponent />);

    await selectText(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
    await Promise.all(
      [0, 1, 2].map((i) => expect(loader(page, i)).toBeVisible()),
    );
  });

  test("should render a lazy loaded option when the infinite scroll prop is set", async ({
    mount,
    page,
  }) => {
    test.slow();

    await mount(<SimpleSelectWithInfiniteScrollComponent />);

    const option = "Lazy Loaded A1";
    const selectListWrapperElement = selectListWrapper(page);
    await selectText(page).click();
    await expect(selectListWrapperElement).toBeVisible();
    await Promise.all(
      [0, 1, 2].map((i) => expect(loader(page, i)).toBeVisible()),
    );
    await expect(selectOptionByText(page, option)).toHaveCount(0);
    await page.waitForTimeout(2000);
    await selectListScrollableWrapper(page).evaluate((wrapper) => {
      wrapper.scrollBy(0, 500);
    });
    await page.waitForTimeout(250);
    await Promise.all(
      [0, 1, 2].map((i) => expect(loader(page, i)).not.toBeVisible()),
    );
    await expect(selectOptionByText(page, option)).toBeVisible();
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip("infinite scroll example should not cycle back to the start when using down arrow key", async ({
    mount,
    page,
  }) => {
    // this is a slow test which can sometimes take more than the 30-second default timeout - so tell Playwright
    // to increase it
    test.slow();

    await mount(<SimpleSelectWithInfiniteScrollComponent />);

    const inputElement = commonDataElementInputPreview(page);
    await inputElement.focus();
    await inputElement.press("ArrowDown");
    const firstOption = selectOptionByText(page, "Amber");
    await firstOption.waitFor();
    for (let i = 0; i < 5; i++) {
      // eslint-disable-next-line no-await-in-loop
      await inputElement.press("ArrowDown");
    }
    await selectOptionByText(page, "Lazy Loaded A1").waitFor();

    // run this 10 times to try to catch any intermittent failures
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 3; j++) {
        // eslint-disable-next-line no-await-in-loop
        await inputElement.press("ArrowDown");
      }
      // wait for new lazy-loaded options to appear
      // eslint-disable-next-line no-await-in-loop
      await page.waitForTimeout(2000);
      // eslint-disable-next-line no-await-in-loop
      await expect(firstOption).not.toBeInViewport();
    }
  });

  test("the list should not change scroll position when the lazy-loaded options appear", async ({
    mount,
    page,
  }) => {
    test.slow();

    await mount(<SimpleSelectWithInfiniteScrollComponent />);

    // open the select list and choose an option
    const inputElement = commonDataElementInputPreview(page);
    await inputElement.focus();
    await inputElement.press("ArrowDown");
    const firstOption = selectOptionByText(page, "Amber");
    await firstOption.waitFor();
    await firstOption.click();

    // reopen the list and scroll to initiate the lazy loading. It's important to not use the keyboard here as that
    // won't trigger the bug.
    const scrollableWrapper = selectListScrollableWrapper(page);
    await selectText(page).click();
    await scrollableWrapper.evaluate((wrapper) => wrapper.scrollBy(0, 500));
    const scrollPositionBeforeLoad = await scrollableWrapper.evaluate(
      (element) => element.scrollTop,
    );

    await selectOptionByText(page, "Lazy Loaded A1").waitFor();
    const scrollPositionAfterLoad = await scrollableWrapper.evaluate(
      (element) => element.scrollTop,
    );
    expect(scrollPositionAfterLoad).toBe(scrollPositionBeforeLoad);
  });

  test("keyboard navigation should work correctly in multicolumn mode and ensure the selected option is visible", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectMultipleColumnsComponent />);

    await page.getByText("Please Select...").click();
    await page.getByRole("listbox").waitFor();

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");

    const lastOption = page.getByRole("option", { name: "Bill Zoe" });
    const input = page.getByRole("combobox");

    await expect(lastOption).toBeInViewport();
    await expect(input).toHaveValue("Bill Zoe");
  });

  test("should have correct option highlighted when select list is opened and value is an object", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectObjectAsValueComponent />);

    const inputElement = getDataElementByValue(page, "input");
    await expect(inputElement).toHaveValue("Green");
    await selectText(page).click();
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

  test("should render list options with multiple columns", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectMultipleColumnsComponent defaultValue="2" />);

    const columns = 3;
    await selectText(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
    const headerElements = multiColumnsSelectListHeader(page);
    await expect(headerElements).toHaveCount(columns);
    const headerAssertions = [];
    for (let i = 0; i < columns; i++) {
      headerAssertions.push(expect(headerElements.nth(i)).toBeVisible());
    }
    await Promise.all(headerAssertions);
    const bodyElements = multiColumnsSelectListBody(page);
    await expect(bodyElements).toHaveCount(columns);
    const bodyAssertions = [];
    for (let i = 0; i < columns; i++) {
      bodyAssertions.push(expect(bodyElements.nth(i)).toBeVisible());
    }
    await Promise.all(bodyAssertions);
    await expect(multiColumnsSelectListRow(page)).toHaveCSS(
      "background-color",
      "rgb(153, 173, 183)",
    );
  });

  test("should check table header content in list with multiple columns", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectMultipleColumnsComponent />);

    const headerCol1 = "Name";
    const headerCol2 = "Surname";
    const headerCol3 = "Occupation";
    await selectText(page).click();
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

  (
    [
      [1, "favourite", "orange"],
      [2, "money_bag", "black"],
      [3, "gift", "blue"],
    ] as [number, string, string][]
  ).forEach(([option, type, color]) => {
    test(`should render list option ${option} with custom option ${type} icon and custom icon color ${color}`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleSelectCustomOptionChildrenComponent />);

      await selectText(page).click();
      await expect(selectListWrapper(page)).toBeVisible();
      const optionElement = selectListCustomChild(page, option);
      await expect(optionElement).toHaveAttribute("type", type);
      await expect(optionElement).toHaveAttribute("color", color);
    });
  });

  test("should list option group header Group one", async ({ mount, page }) => {
    await mount(<SimpleSelectGroupComponent />);

    await selectText(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
    await expect(selectListOptionGroup(page)).toHaveText("Group one");
  });

  test("should contain custom option group header id groupHeader1", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectGroupComponent />);

    await selectText(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
    await expect(selectListOptionGroup(page).locator("..")).toHaveId(
      "groupHeader1",
    );
  });

  test("should render option group header data-component prop set to group-header", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectGroupComponent />);

    await selectText(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
    await expect(selectListOptionGroup(page).locator("..")).toHaveAttribute(
      "data-component",
      "option-group-header",
    );
  });

  test("should render option group header data-role prop set to group-header", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectGroupComponent />);

    await selectText(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
    await expect(selectListOptionGroup(page).locator("..")).toHaveAttribute(
      "data-role",
      "group-header",
    );
  });

  test("should render option group header data-element prop set to group-header", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectGroupComponent />);

    await selectText(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
    await expect(selectListOptionGroup(page).locator("..")).toHaveAttribute(
      "data-element",
      "group-header",
    );
  });

  test("should contain custom option row id 3", async ({ mount, page }) => {
    await mount(<SimpleSelectMultipleColumnsComponent />);

    await selectText(page).click();
    await expect(multiColumnsSelectListBody(page).locator("..")).toHaveId("3");
  });

  test("should render option row data-component prop set to option-row", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectMultipleColumnsComponent />);

    await selectText(page).click();
    await expect(
      multiColumnsSelectListBody(page).locator(".."),
    ).toHaveAttribute("data-component", "option-row");
  });

  test("should render option row data-role prop set to option-row", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectMultipleColumnsComponent />);

    await selectText(page).click();
    await expect(
      multiColumnsSelectListBody(page).locator(".."),
    ).toHaveAttribute("data-role", "option-row");
  });

  test("should render option row data-element prop set to option-row", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectMultipleColumnsComponent />);

    await selectText(page).click();
    await expect(
      multiColumnsSelectListBody(page).locator(".."),
    ).toHaveAttribute("data-element", "option-row");
  });

  test("should contain custom option id option1", async ({ mount, page }) => {
    await mount(<SimpleSelectCustomOptionChildrenComponent />);

    await selectText(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
    await expect(selectListCustomChild(page, 1).locator("..")).toHaveId(
      "option1",
    );
  });

  test("should render custom option data-component prop set to option", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectCustomOptionChildrenComponent />);

    await selectText(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
    await expect(selectListCustomChild(page, 1).locator("..")).toHaveAttribute(
      "data-component",
      "option",
    );
  });

  test("should render custom option data-role prop set to option", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectCustomOptionChildrenComponent />);

    await selectText(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
    await expect(selectListCustomChild(page, 1).locator("..")).toHaveAttribute(
      "data-role",
      "option",
    );
  });

  test("should render custom option data-element prop set to option", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectCustomOptionChildrenComponent />);

    await selectText(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
    await expect(selectListCustomChild(page, 1).locator("..")).toHaveAttribute(
      "data-element",
      "option",
    );
  });

  test("should render option list with proper maxHeight value", async ({
    mount,
    page,
  }) => {
    const maxHeight = 200;
    await mount(<SimpleSelectComponent listMaxHeight={maxHeight} />);

    await selectText(page).click();
    const wrapperElement = selectListScrollableWrapper(page);
    await expect(wrapperElement).toHaveCSS("max-height", `${maxHeight}px`);
    await expect(wrapperElement).toBeVisible();
  });

  (
    [
      ["top", "300px", "0px", "200px", "20px"],
      ["bottom", "0px", "0px", "0px", "20px"],
    ] as const
  ).forEach(([position, top, bottom, left, right]) => {
    test(`should render list in ${position} position when margins are top ${top}, bottom ${bottom}, left ${left} and right ${right}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SimpleSelectComponent
          listPlacement={position}
          mt={top}
          mb={bottom}
          ml={left}
          mr={right}
        />,
      );

      await selectText(page).click();
      const listElement = selectListPosition(page);
      await expect(listElement).toHaveAttribute(
        "data-floating-placement",
        position,
      );
      await expect(listElement).toBeVisible();
    });
  });

  (
    [
      ["top", "0px", "0px", "0px", "20px"],
      ["bottom", "600px", "0px", "0px", "20px"],
    ] as [SimpleSelectProps["listPlacement"], string, string, string, string][]
  ).forEach(([position, top, bottom, left, right]) => {
    test(`should flip list to opposite position when there is not enough space to render in ${position} position`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SimpleSelectComponent
          listPlacement={position}
          flipEnabled
          mt={top}
          mb={bottom}
          ml={left}
          mr={right}
        />,
      );

      let flipPosition = "";
      if (position === "top") {
        flipPosition = "bottom";
      }
      if (position === "bottom") {
        flipPosition = "top";
      }
      await selectText(page).click();
      const listElement = selectListPosition(page);
      await expect(listElement).toHaveAttribute(
        "data-floating-placement",
        flipPosition,
      );
      await expect(listElement).toBeVisible();
    });
  });

  (
    [
      ["top", "100px 300px", 150, 2],
      ["bottom", "0px 300px", 150, 68],
      ["top-end", "100px 300px", 150, 2],
      ["bottom-end", "0px 300px", 150, 68],
      ["top-start", "100px 0px", 0, 2],
      ["bottom-start", "100px 0px", 0, 168],
    ] as [
      NonNullable<SimpleSelectProps["listPlacement"]>,
      string,
      number,
      number,
    ][]
  ).forEach(([position, margin, left, top]) => {
    test(`should render list wider than the input when listWidth is 350 and positioned based on listPlacement of ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ListWidth margin={margin} listPlacement={position} listWidth={350} />,
      );

      const positionValue =
        !position.includes("end") && !position.includes("start")
          ? `${position}-end`
          : position;
      await selectText(page).click();
      const listElement = selectListPosition(page);
      const { inputWidth } = await selectText(page).evaluate((el) => ({
        inputWidth: window
          .getComputedStyle(el.parentElement as HTMLElement)
          .getPropertyValue("width"),
      }));
      const { listLeftPosition, listTopPosition } = await listElement.evaluate(
        (el) => ({
          listLeftPosition: el.getBoundingClientRect().left,
          listTopPosition: el.getBoundingClientRect().top,
        }),
      );

      await expect(listElement).toHaveAttribute(
        "data-floating-placement",
        positionValue,
      );
      await expect(listElement).toBeVisible();
      await expect(listElement).toHaveCSS("width", "350px");
      expect(inputWidth).toBe("200px");

      // sub-pixel rendering means this is not always exact
      expect(listLeftPosition).toBeCloseTo(left);
      expect(listTopPosition).toBeCloseTo(top);
    });
  });

  (
    [
      ["top", "0px"],
      ["top-end", "0px"],
    ] as [NonNullable<SimpleSelectProps["listPlacement"]>, string][]
  ).forEach(([position, margin]) => {
    test(`should render list wider than the input when listWidth is 350 and flip the placement based on original listPlacement of ${position} when there's no space to render it`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ListWidth margin={margin} listPlacement={position} listWidth={350} />,
      );

      await selectText(page).click();
      const listElement = selectListPosition(page);
      const { inputWidth } = await selectText(page).evaluate((el) => ({
        inputWidth: window
          .getComputedStyle(el.parentElement as HTMLElement)
          .getPropertyValue("width"),
      }));

      await expect(listElement).toHaveAttribute(
        "data-floating-placement",
        "bottom-start",
      );
      await expect(listElement).toBeVisible();
      await expect(listElement).toHaveCSS("width", "350px");
      expect(inputWidth).toBe("200px");
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
        <SimpleSelectComponent mt={top} mb={bottom} ml={left} mr={right} />,
      );

      await selectText(page).click();
      const listElement = selectListPosition(page);
      await expect(listElement).toHaveAttribute(
        "data-floating-placement",
        position,
      );
      await expect(listElement).toBeVisible();
    });
  });

  test("should have correct hover state of list option", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent />);

    const optionValue3 = "Blue";
    await selectText(page).click();
    const optionElement = selectOptionByText(page, optionValue3);
    await optionElement.hover();
    await expect(optionElement).toHaveCSS(
      "background-color",
      "rgb(204, 214, 219)",
    );
  });

  test("should have the expected border radius styling", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent />);

    await expect(selectInput(page)).toHaveCSS("border-radius", "4px");
    await expect(selectListWrapper(page)).toHaveCSS("border-radius", "4px");
  });

  test("should display the custom option in full when list is opened", async ({
    mount,
    page,
  }) => {
    await mount(<ComplexCustomChildren />);

    await selectText(page).click();
    const customOptionContent = selectListCustomChild(page, 1).nth(0);
    const wrapper = selectListWrapper(page);
    const customOptionHeight = await selectList(page)
      .locator("li")
      .evaluate((element) => element.getBoundingClientRect().height);
    const wrapperHeight = await wrapper.evaluate(
      (element) => element.getBoundingClientRect().height,
    );

    await expect(customOptionContent).toBeVisible();
    expect(wrapperHeight).toBe(customOptionHeight);
  });
});

test.describe("Check height of Select list when opened", () => {
  test("should not cut off any text with long option text", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectWithLongWrappingTextComponent />);

    await selectText(page).click();
    const wrapperElement = selectListWrapper(page);
    await expect(wrapperElement).toHaveCSS("height", "152px");
    await expect(wrapperElement).toBeVisible();
  });
});

test.describe("Check events for SimpleSelect component", () => {
  test("should call onChange event when a list option is selected", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback = () => {
      callbackCount += 1;
    };
    await mount(<SimpleSelectEventsComponent onChange={callback} />);

    const position = "first";
    await selectText(page).click();
    await selectOption(page, positionOfElement(position)).click();
    expect(callbackCount).toBe(1);
  });

  test("should call onBlur event when the list is closed", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback = () => {
      callbackCount += 1;
    };
    await mount(<SimpleSelectComponent onBlur={callback} />);

    await selectText(page).click();
    await commonDataElementInputPreview(page).blur();
    expect(callbackCount).toBe(1);
  });

  test("should call onClick event when mouse is clicked on text input", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback = () => {
      callbackCount += 1;
    };
    await mount(<SimpleSelectComponent onClick={callback} />);

    // need to force the click as the input is covered by the span containing "please select"
    // [not clear if this onClick is even needed since a user isn't able to click, but leaving the test in pending
    // pending discussion/investigation]
    await commonDataElementInputPreview(page).click({ force: true });
    expect(callbackCount).toBe(1);
  });

  test("should call onOpen when select list is opened", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback = () => {
      callbackCount += 1;
    };
    await mount(<SimpleSelectComponent onOpen={callback} />);

    await commonDataElementInputPreview(page).click({ force: true });
    expect(callbackCount).toBe(1);
  });

  test("should call onFocus when SimpleSelect is brought into focus", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback = () => {
      callbackCount += 1;
    };
    await mount(<SimpleSelectComponent onFocus={callback} />);

    await commonDataElementInputPreview(page).focus();
    expect(callbackCount).toBe(1);
  });

  keyToTrigger.slice(0, 2).forEach((key) => {
    test(`should call onKeyDown event when ${key} key is pressed`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      const callback = () => {
        callbackCount += 1;
      };
      await mount(<SimpleSelectComponent onKeyDown={callback} />);

      const inputElement = commonDataElementInputPreview(page);
      await inputElement.focus();
      await inputElement.press(key);
      expect(callbackCount).toBe(1);
    });
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

    await expect(selectOptionByText(page, "Yellow")).toBeInViewport();
    await selectOptionByText(page, "Yellow").click();

    await expect(selectOptionByText(page, "Yellow")).not.toBeVisible();

    await selectText(page).click();
    await expect(selectOptionByText(page, "Yellow")).toBeInViewport();

    await page.locator("body").click();

    await selectText(page).click();
    await expect(selectOptionByText(page, "Yellow")).toBeInViewport();
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
    const dialogElement = alertDialogPreview(page);
    await inputElement.press("Escape");
    await expect(selectList(page)).not.toBeVisible();
    await expect(dialogElement).toBeVisible();
    await inputElement.press("Escape");
    await expect(dialogElement).not.toBeVisible();
  });

  test("should not refocus the select textbox when closing it by clicking outside", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectNestedInDialog />);

    await selectText(page).click();
    await alertDialogPreview(page).click();
    await expect(selectList(page)).not.toBeVisible();
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

  test("should be able to focus the last item in the select list when the select list has an OptionGroupHeader ", async ({
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
    ).not.toBeVisible();
    await expect(
      page.locator('[data-element="confirmed-selection-5"]'),
    ).toBeVisible();
    await dropdownButton(page).click();
    await selectOptionByText(page, "Seven").click();
    await expect(
      page.locator('[data-element="confirmed-selection-5"]'),
    ).not.toBeVisible();
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
    ).not.toBeVisible();
    await expect(
      page.locator('[data-element="confirmed-selection-3"]'),
    ).toBeVisible();
    await dropdownButton(page).click();
    await inputElement.press("ArrowDown");
    await inputElement.press("ArrowDown");
    await inputElement.press("Enter");
    await expect(
      page.locator('[data-element="confirmed-selection-3"]'),
    ).not.toBeVisible();
    await expect(
      page.locator('[data-element="confirmed-selection-5"]'),
    ).toBeVisible();
    await dropdownButton(page).click();
    await inputElement.press("ArrowDown");
    await inputElement.press("Enter");
    await expect(
      page.locator('[data-element="confirmed-selection-5"]'),
    ).not.toBeVisible();
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
    ).not.toBeVisible();
    await expect(
      page.locator('[data-element="confirmed-selection-7"]'),
    ).toBeVisible();
    await dropdownButton(page).click();
    await inputElement.press("ArrowUp");
    await inputElement.press("ArrowUp");
    await inputElement.press("Enter");
    await expect(
      page.locator('[data-element="confirmed-selection-7"]'),
    ).not.toBeVisible();
    await expect(
      page.locator('[data-element="confirmed-selection-5"]'),
    ).toBeVisible();
    await dropdownButton(page).click();
    await inputElement.press("ArrowUp");
    await inputElement.press("Enter");
    await expect(
      page.locator('[data-element="confirmed-selection-5"]'),
    ).not.toBeVisible();
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
    ).not.toBeVisible();
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

  testData.forEach((labelValue) => {
    test(`should pass accessibility tests with label prop using ${labelValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleSelectComponent label={labelValue} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((labelHelpValue) => {
    test(`should pass accessibility tests with labelHelp prop using ${labelHelpValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleSelectComponent labelHelp={labelHelpValue} />);

      await helpIcon(page).hover();
      await checkAccessibility(page, tooltipPreview(page));
    });
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

  (
    [
      ["top", "200px", "0px", "0px", "0px"],
      ["bottom", "0px", "0px", "0px", "0px"],
      ["left", "200px", "0px", "200px", "0px"],
      ["right", "200px", "0px", "0px", "200px"],
    ] as [
      SimpleSelectProps["tooltipPosition"],
      string,
      string,
      string,
      string,
    ][]
  ).forEach(([tooltipPositionValue, top, bottom, left, right]) => {
    test(`should pass accessibility tests with tooltip prop in the ${tooltipPositionValue} position`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SimpleSelectComponent
          labelHelp="Help"
          tooltipPosition={tooltipPositionValue}
          mt={top}
          mb={bottom}
          ml={left}
          mr={right}
        />,
      );

      await helpIcon(page).hover();
      await checkAccessibility(page, tooltipPreview(page));
    });
  });

  test("should pass accessibility tests with disabled prop", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent disabled />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with readOnly prop", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent readOnly />);

    await checkAccessibility(page);
    await selectText(page).click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with transparent prop", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent transparent />);

    await checkAccessibility(page);
  });

  (
    [SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE] as SimpleSelectProps["size"][]
  ).forEach((size) => {
    test(`should pass accessibility tests with size prop as ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleSelectComponent size={size} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests with autoFocus prop", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent autoFocus />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with required prop", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent required />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with labelInline prop", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent labelInline />);

    await checkAccessibility(page);
  });

  (["right", "left"] as SimpleSelectProps["labelAlign"][]).forEach(
    (alignment) => {
      test(`should pass accessibility tests with labelAlign prop set as ${alignment}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <SimpleSelectComponent labelInline labelAlign={alignment} />,
        );

        await checkAccessibility(page);
      });
    },
  );

  [
    [10, 90],
    [30, 70],
    [80, 20],
  ].forEach(([label, input]) => {
    test(`should pass accessibility tests with labelWidth prop set as ${label} and inputWidth set as ${input}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SimpleSelectComponent
          labelInline
          labelWidth={label}
          inputWidth={input}
        />,
      );

      await checkAccessibility(page);
    });
  });

  ["10%", "30%", "50%", "80%", "100%"].forEach((maxWidth) => {
    test(`should pass accessibility tests with maxWidth prop set as ${maxWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleSelectComponent maxWidth={maxWidth} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests with isLoading prop", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectWithLazyLoadingComponent />);

    await selectText(page).click();
    await expect(loader(page, 1)).toBeVisible();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with onListScrollBottom prop", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectWithInfiniteScrollComponent />);

    await selectText(page).click();
    await checkAccessibility(page);
    // wait for content to finish loading before scrolling
    await expect(selectOptionByText(page, "Amber")).toBeVisible();
    await selectListScrollableWrapper(page).evaluate((wrapper) =>
      wrapper.scrollBy(0, 500),
    );
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  test("should pass accessibility tests with multiple columns", async ({
    mount,
    page,
  }) => {
    await mount(
      <SimpleSelectMultipleColumnsComponent label="multiple columns" />,
    );

    const inputElement = commonDataElementInputPreview(page);
    await inputElement.press("ArrowDown");
    await inputElement.focus();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  test("should pass accessibility tests with object as value", async ({
    mount,
    page,
  }) => {
    await mount(
      <SimpleSelectObjectAsValueComponent label="with object as value" />,
    );

    await selectText(page).click();
    await selectOption(page, positionOfElement("first")).click();
    await checkAccessibility(page);
  });

  [1, 2, 3].forEach((option) => {
    test(`should pass accessibility tests with custom option ${option} icon and custom icon color ${option}`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleSelectCustomOptionChildrenComponent />);

      await selectText(page).click();
      await expect(selectListCustomChild(page, option)).toBeVisible();
      // note: select list is open here, but "scrollable-region-focusable" is not needed, only because with only 3 options no
      // scrollbar is present
      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests with option group headers", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectGroupComponent label="groups" />);

    await selectText(page).click();
    // see FE-6285 - we will be able to remove the aria-required-children exception when that is fixed
    await checkAccessibility(
      page,
      undefined,
      "scrollable-region-focusable",
      "aria-required-children",
    );
  });

  test("should pass accessibility tests with listMaxHeight prop", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent listMaxHeight={200} />);

    await selectText(page).click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  (
    [
      ["top", "300px", "0px", "200px", "20px"],
      ["bottom", "0px", "0px", "0px", "20px"],
    ] as [SimpleSelectProps["listPlacement"], string, string, string, string][]
  ).forEach(([position, top, bottom, left, right]) => {
    test(`should pass accessibility tests with listPlacement prop as ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SimpleSelectComponent
          listPlacement={position}
          mt={top}
          mb={bottom}
          ml={left}
          mr={right}
        />,
      );

      await selectText(page).click();
      await checkAccessibility(page, undefined, "scrollable-region-focusable");
    });
  });

  (
    [
      ["top", "0px", "0px", "0px", "20px"],
      ["bottom", "600px", "0px", "0px", "20px"],
    ] as [SimpleSelectProps["listPlacement"], string, string, string, string][]
  ).forEach(([position, top, bottom, left, right]) => {
    test(`should pass accessibility tests with flipEnabled prop and listPlacement prop as ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SimpleSelectComponent
          listPlacement={position}
          flipEnabled
          mt={top}
          mb={bottom}
          ml={left}
          mr={right}
        />,
      );

      await selectText(page).click();
      await checkAccessibility(page, undefined, "scrollable-region-focusable");
    });
  });

  test("should pass accessibility tests with long option text", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectWithLongWrappingTextComponent />);

    await selectText(page).click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  test("should pass accessibility tests with virtual scrolling", async ({
    mount,
    page,
  }) => {
    await mount(<WithVirtualScrolling />);

    await page.getByText("Please Select...").click();
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

  test("should pass accessibility tests after selecting an option that dynamically adds a new option to the start of the list", async ({
    mount,
    page,
  }) => {
    await mount(<SelectWithDynamicallyAddedOption />);

    await selectText(page).click();
    await selectOptionByText(page, "A").click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  test("should pass accessibility tests in dynamically-changing example when a different option is selected", async ({
    mount,
    page,
  }) => {
    await mount(<SelectWithDynamicallyAddedOption />);

    await selectText(page).click();
    await selectOptionByText(page, "A").click();
    await selectText(page).click();
    await selectOptionByText(page, "B").click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });
});
