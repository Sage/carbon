import { expect, test } from "@playwright/experimental-ct-react17";
import React from "react";
import FilterableSelect, { FilterableSelectProps } from ".";
import Option from "../option";
import {
  FilterableSelectComponent,
  FilterableSelectObjectAsValueComponent,
  FilterableSelectMultiColumnsComponent,
  FilterableSelectMultiColumnsNestedComponent,
  FilterableSelectWithActionButtonComponent,
  WithVirtualScrolling,
  FilterableSelectNestedInDialog,
  SelectionConfirmed,
  FilterableSelectWithDisabledOption,
  FilterableSelectControlled,
  WithObjectAsValue,
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
  boldedAndUnderlinedValue,
  dropdownButton,
  filterableSelectAddElementButton,
  filterableSelectButtonIcon,
  multiColumnsSelectListBody,
  multiColumnsSelectListHeader,
  multiColumnsSelectListHeaderColumn,
  multiColumnsSelectListNoResultsMessage,
  multiColumnsSelectListRow,
  selectElementInput,
  selectInput,
  selectList,
  selectListPosition,
  selectListScrollableWrapper,
  selectListWrapper,
  selectOption,
  selectOptionByText,
} from "../../../../playwright/components/select";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
  positionOfElement,
  verifyRequiredAsteriskForLabel,
} from "../../../../playwright/support/helper";
import { CHARACTERS, SIZE } from "../../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testPropValue = CHARACTERS.STANDARD;
const addElementText = "Add a New Element";
const columns = 3;
const icon = "add";
const keyToTrigger = ["ArrowDown", "ArrowUp", "Home", "End"] as const;
const listOption = "Amber";

test("should have the expected styling when focused", async ({
  mount,
  page,
}) => {
  await mount(<FilterableSelectComponent />);

  const inputElement = commonDataElementInputPreview(page);
  await inputElement.focus();
  await expect(inputElement.locator("..")).toHaveCSS(
    "box-shadow",
    "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
  );
  await expect(inputElement.locator("..")).toHaveCSS(
    "outline",
    "rgba(0, 0, 0, 0) solid 3px",
  );
});

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

  testData.forEach((labelValue) => {
    test(`should render label using ${labelValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<FilterableSelectComponent label={labelValue} />);

      await expect(getDataElementByValue(page, "label")).toHaveText(labelValue);
    });
  });

  testData.forEach((labelHelpValue) => {
    test(`should render labelHelp message using ${labelHelpValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<FilterableSelectComponent labelHelp={labelHelpValue} />);

      await helpIcon(page).hover();
      await expect(tooltipPreview(page)).toHaveText(labelHelpValue);
    });
  });

  testData.forEach((placeholderValue) => {
    test(`should render placeholder using ${placeholderValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<FilterableSelectComponent placeholder={placeholderValue} />);

      await expect(selectInput(page)).toHaveAttribute(
        "placeholder",
        placeholderValue,
      );
    });
  });

  test("should render with name prop set to test value", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent name={testPropValue} />);

    await expect(commonDataElementInputPreview(page)).toHaveAttribute(
      "name",
      testPropValue,
    );
  });

  test("should render with id prop set to test value", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent id={testPropValue} />);

    await expect(commonDataElementInputPreview(page)).toHaveId(testPropValue);
  });

  test("should render with data-component prop set to test value", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent data-component={testPropValue} />);

    await expect(
      selectElementInput(page).locator("..").locator(".."),
    ).toHaveAttribute("data-component", testPropValue);
  });

  test("should render with data-element prop set to test value", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent data-element={testPropValue} />);

    await expect(
      selectElementInput(page).locator("..").locator(".."),
    ).toHaveAttribute("data-element", testPropValue);
  });

  test("should render with data-role prop set to test value", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent data-role={testPropValue} />);

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
        <FilterableSelectComponent
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
    await mount(<FilterableSelectComponent disabled />);

    const selectInputElement = commonDataElementInputPreview(page);
    await expect(selectInputElement).toBeDisabled();
  });

  test("should render icon with disabled style", async ({ mount, page }) => {
    await mount(<FilterableSelectComponent disabled />);

    const dropdownButtonElement = dropdownButton(page);
    await expect(dropdownButtonElement).toBeVisible();
    await expect(dropdownButtonElement).toHaveCSS(
      "color",
      "rgba(0, 0, 0, 0.3)",
    );
  });

  test("should render as read only", async ({ mount, page }) => {
    await mount(<FilterableSelectComponent readOnly />);

    await expect(commonDataElementInputPreview(page)).not.toBeEditable();
    await selectInput(page).click();
    await expect(selectListWrapper(page)).not.toBeVisible();
  });

  test("should render icon with read only style", async ({ mount, page }) => {
    await mount(<FilterableSelectComponent readOnly />);

    const dropdownButtonElement = dropdownButton(page);
    await expect(dropdownButtonElement).toBeVisible();
    await expect(dropdownButtonElement).toHaveCSS(
      "color",
      "rgba(0, 0, 0, 0.3)",
    );
  });

  (
    [
      [SIZE.SMALL, "32px"],
      [SIZE.MEDIUM, "40px"],
      [SIZE.LARGE, "48px"],
    ] as [FilterableSelectProps["size"], string][]
  ).forEach(([size, height]) => {
    test(`should use ${size} as size and render with ${height} as height`, async ({
      mount,
      page,
    }) => {
      await mount(<FilterableSelectComponent size={size} />);

      await expect(commonDataElementInputPreview(page).locator("..")).toHaveCSS(
        "min-height",
        height,
      );
    });
  });

  test("should check autofocus prop", async ({ mount, page }) => {
    await mount(<FilterableSelectComponent autoFocus />);

    await expect(commonDataElementInputPreview(page)).toBeFocused();
  });

  test("should check required prop", async ({ mount, page }) => {
    await mount(<FilterableSelectComponent required />);

    await verifyRequiredAsteriskForLabel(page);
  });

  test("should check label is inline", async ({ mount, page }) => {
    await mount(<FilterableSelectComponent labelInline />);

    await expect(getDataElementByValue(page, "label").locator("..")).toHaveCSS(
      "-webkit-box-pack",
      "end",
    );
  });

  (
    [
      ["flex", 399],
      ["flex", 400],
      ["block", 401],
    ] as [string, number][]
  ).forEach(([displayValue, breakpoint]) => {
    test(`should check label alignment is ${displayValue} with adaptiveLabelBreakpoint ${breakpoint} and viewport 400`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({
        width: 400,
        height: 300,
      });
      await mount(
        <FilterableSelectComponent
          labelInline
          adaptiveLabelBreakpoint={breakpoint}
        />,
      );

      await expect(
        getDataElementByValue(page, "label").locator("..").locator(".."),
      ).toHaveCSS("display", displayValue);
    });
  });

  (
    [
      ["right", "end"],
      ["left", "start"],
    ] as [FilterableSelectProps["labelAlign"], string][]
  ).forEach(([alignment, cssProp]) => {
    test(`should use ${alignment} as labelAligment and render with flex-${cssProp} as css properties`, async ({
      mount,
      page,
    }) => {
      await mount(
        <FilterableSelectComponent labelInline labelAlign={alignment} />,
      );

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
        <FilterableSelectComponent
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
      await mount(<FilterableSelectComponent maxWidth={maxWidth} />);

      await expect(
        getDataElementByValue(page, "input").locator("..").locator(".."),
      ).toHaveCSS("max-width", maxWidth);
    });
  });

  test("when maxWidth has no value it should render as 100%", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent maxWidth="" />);

    await expect(
      getDataElementByValue(page, "input").locator("..").locator(".."),
    ).toHaveCSS("max-width", "100%");
  });

  test("should not open the list with focus on input", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent />);

    const inputElement = commonDataElementInputPreview(page);
    await inputElement.focus();
    await expect(inputElement).toBeFocused();
    await expect(inputElement).toHaveAttribute("aria-expanded", "false");
    await expect(selectListWrapper(page)).not.toBeVisible();
  });

  test("should open the list with mouse click on input", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent />);

    const inputElement = commonDataElementInputPreview(page);
    await inputElement.click();
    await expect(inputElement).toBeFocused();
    await expect(inputElement).toHaveAttribute("aria-expanded", "true");
    await expect(selectListWrapper(page)).toBeVisible();
  });

  test("should open the list with mouse click on dropdown button", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent />);

    await dropdownButton(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
  });

  test("should close the list with the Tab key", async ({ mount, page }) => {
    await mount(<FilterableSelectComponent />);

    const selectListWrapperElement = selectListWrapper(page);
    const selectInputElement = selectInput(page);
    await dropdownButton(page).click();
    await expect(selectListWrapperElement).toBeVisible();
    await selectInputElement.press("Tab");
    await expect(selectInputElement).toHaveAttribute("aria-expanded", "false");
    await expect(selectListWrapperElement).not.toBeVisible();
  });

  test("should close the list with the Esc key", async ({ mount, page }) => {
    await mount(<FilterableSelectComponent />);

    const selectListWrapperElement = selectListWrapper(page);
    await dropdownButton(page).click();
    await expect(selectListWrapperElement).toBeVisible();
    await commonDataElementInputPreview(page).press("Escape");
    await expect(selectInput(page)).toHaveAttribute("aria-expanded", "false");
    await expect(selectListWrapperElement).not.toBeVisible();
  });

  test("should close the list by clicking out of the component", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent />);

    await dropdownButton(page).click();
    const selectListWrapperElement = selectListWrapper(page);
    await expect(selectListWrapperElement).toBeVisible();
    await page.locator("body").click({ position: { x: 0, y: 0 } });
    await expect(selectInput(page)).toHaveAttribute("aria-expanded", "false");
    await expect(selectListWrapperElement).not.toBeVisible();
  });

  keyToTrigger.forEach((key) => {
    test(`should open the list when ${key} is pressed with input in focus`, async ({
      mount,
      page,
    }) => {
      await mount(<FilterableSelectComponent />);

      await commonDataElementInputPreview(page).focus();
      await selectInput(page).press(key);
      await expect(selectListWrapper(page)).toBeVisible();
    });
  });

  test("should not open the list when Enter is pressed with input in focus", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent />);

    await commonDataElementInputPreview(page).focus();
    await selectInput(page).press("Enter");
    await expect(selectListWrapper(page)).not.toBeVisible();
  });

  ["Amber", "Yellow"].forEach((option) => {
    test(`should select option ${option} when clicked from the list`, async ({
      mount,
      page,
    }) => {
      await mount(<FilterableSelectComponent />);

      await dropdownButton(page).click();
      await selectOptionByText(page, option).click();
      await expect(getDataElementByValue(page, "input")).toHaveValue(option);
      await expect(selectInput(page)).toHaveAttribute("aria-expanded", "false");
      await expect(selectListWrapper(page)).not.toBeVisible();
    });
  });

  (
    [
      ["A", ["Amber", "Black", "Orange"]],
      ["O", ["Brown", "Orange", "Yellow"]],
      [" O", ["Brown", "Orange", "Yellow"]],
      ["O ", ["Brown", "Orange", "Yellow"]],
      [" O ", ["Brown", "Orange", "Yellow"]],
    ] as const
  ).forEach(([text, filteredOptionText]) => {
    test(`should filter options when ${text} is typed`, async ({
      mount,
      page,
    }) => {
      await mount(<FilterableSelectComponent />);

      const input = page.getByRole("combobox");
      const dropdownList = page.getByRole("listbox");

      await input.fill(text);
      await dropdownList.waitFor();

      await expect(input).toHaveAttribute("aria-expanded", "true");
      await expect(dropdownList).toBeVisible();
      await expect(dropdownList.getByRole("option")).toHaveText(
        filteredOptionText,
      );
    });
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
      <FilterableSelect label="Colour">
        <Option text="Amber" value="Amber" />
        <Option text="Black" value="Black" />
        <Option text="Cyan" value="Cyan" />
        <Option text="Dark Blue" value="Dark Blue" />
        <Option text="Emerald" value="Emerald" />
        <Option text="Fuchsia" value="Fuchsia" />
        <Option text="Gold" value="Gold" />
      </FilterableSelect>,
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
      <FilterableSelect label="Colour">
        <Option text="Amber" value="Amber" />
        <Option text="Black" value="Black" />
        <Option text="Cyan" value="Cyan" />
        <Option text="Dark Blue" value="Dark Blue" />
        <Option text="Emerald" value="Emerald" />
        <Option text="Fuchsia" value="Fuchsia" />
        <Option text="Gold" value="Gold" />
        <Option text="Hot Pink" value="Hot Pink" />
        <Option text="Indigo" value="Indigo" />
      </FilterableSelect>,
    );

    await expect(page.getByRole("option")).toHaveCount(9);

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
    await expect(wrapperElement).not.toBeVisible();
    await buttonElement.click();
    await expect(wrapperElement.locator("li")).toHaveCount(count);
  });

  test("should check list is open when input is focused and openOnFocus is set", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent openOnFocus />);

    await commonDataElementInputPreview(page).focus();
    await expect(selectInput(page)).toHaveAttribute("aria-expanded", "true");
    await expect(selectListWrapper(page)).toBeVisible();
  });

  test("should not reopen list when openOnFocus set and user selects an option via click", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent openOnFocus />);

    const wrapperElement = selectListWrapper(page);
    await commonDataElementInputPreview(page).focus();
    await expect(selectInput(page)).toHaveAttribute("aria-expanded", "true");
    await expect(wrapperElement).toBeVisible();
    await selectOption(page, positionOfElement("first")).click();
    await expect(wrapperElement).not.toBeVisible();
  });

  test("should open list when openOnFocus set, user selects an option via enter key and then input is blurred then focused again", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent openOnFocus />);

    const wrapperElement = selectListWrapper(page);
    const inputElement = commonDataElementInputPreview(page);
    const selectInputElement = selectInput(page);
    await inputElement.focus();
    await expect(selectInputElement).toHaveAttribute("aria-expanded", "true");
    await expect(wrapperElement).toBeVisible();
    await selectInputElement.press("ArrowDown");
    await selectInputElement.press("Enter");
    await expect(wrapperElement).not.toBeVisible();
    await inputElement.blur();
    await inputElement.focus();
    await expect(wrapperElement).toBeVisible();
  });

  test("should check list is open when input is clicked and openOnFocus is set", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent openOnFocus />);

    await commonDataElementInputPreview(page).click();
    await expect(selectInput(page)).toHaveAttribute("aria-expanded", "true");
    await expect(selectListWrapper(page)).toBeVisible();
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

  test("should render option list with proper maxHeight value", async ({
    mount,
    page,
  }) => {
    const maxHeight = 200;
    await mount(<FilterableSelectComponent listMaxHeight={maxHeight} />);

    await dropdownButton(page).click();
    const wrapperElement = selectListScrollableWrapper(page);
    await expect(wrapperElement).toHaveCSS("max-height", `${maxHeight}px`);
    await expect(wrapperElement).toBeVisible();
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

      let flipPosition = "";
      if (position === "top") {
        flipPosition = "bottom";
      }
      if (position === "bottom") {
        flipPosition = "top";
      }
      await dropdownButton(page).click();
      const listElement = selectListPosition(page);
      await expect(listElement).toHaveAttribute(
        "data-floating-placement",
        flipPosition,
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
      // eslint-disable-next-line no-await-in-loop
      await expect(headerElements.nth(i)).toBeVisible();
    }
    const bodyElements = multiColumnsSelectListBody(page);
    await expect(bodyElements).toHaveCount(columns);
    for (let i = 0; i < columns; i++) {
      // eslint-disable-next-line no-await-in-loop
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
      assertions.push(expect(headerElements.nth(i)).toBeVisible());
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
    await expect(alertDialogPreview(page)).toBeVisible();
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
      // eslint-disable-next-line no-await-in-loop
      await inputElement.focus();
      // eslint-disable-next-line no-await-in-loop
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

  test("should have correct hover state of list option", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent />);

    const optionValue = "Blue";
    await dropdownButton(page).click();
    const optionElement = selectOptionByText(page, optionValue);
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
    await mount(<FilterableSelectComponent />);

    await expect(selectInput(page)).toHaveCSS("border-radius", "4px");
    await expect(selectListWrapper(page)).toHaveCSS("border-radius", "4px");
  });

  test("should contain custom option row id 3", async ({ mount, page }) => {
    await mount(<FilterableSelectMultiColumnsComponent />);

    await dropdownButton(page).click();
    await expect(multiColumnsSelectListBody(page).locator("..")).toHaveId("3");
  });

  test("should render option row data-component prop set to option-row", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectMultiColumnsComponent />);

    await dropdownButton(page).click();
    await expect(
      multiColumnsSelectListBody(page).locator(".."),
    ).toHaveAttribute("data-component", "option-row");
  });

  test("should render option row data-role prop set to option-row", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectMultiColumnsComponent />);

    await dropdownButton(page).click();
    await expect(
      multiColumnsSelectListBody(page).locator(".."),
    ).toHaveAttribute("data-role", "option-row");
  });

  test("should render option row data-element prop set to option-row", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectMultiColumnsComponent />);

    await dropdownButton(page).click();
    await expect(
      multiColumnsSelectListBody(page).locator(".."),
    ).toHaveAttribute("data-element", "option-row");
  });

  test("should contain custom option id option1", async ({ mount, page }) => {
    await mount(<FilterableSelectComponent />);

    await dropdownButton(page).click();
    await expect(selectOptionByText(page, listOption)).toHaveId("option1");
  });

  test("should render option data-component prop set to option", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent />);

    await dropdownButton(page).click();
    await expect(selectOptionByText(page, listOption)).toHaveAttribute(
      "data-component",
      "option",
    );
  });

  test("should render option data-role prop set to option1", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent />);

    await dropdownButton(page).click();
    await expect(selectOptionByText(page, listOption)).toHaveAttribute(
      "data-role",
      "option1",
    );
  });

  test("should render option data-element prop set to option1", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent />);

    await dropdownButton(page).click();
    await expect(selectOptionByText(page, listOption)).toHaveAttribute(
      "data-element",
      "option1",
    );
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
    await mount(<FilterableSelectNestedInDialog />);

    await dropdownButton(page).click();
    await alertDialogPreview(page).click();
    await expect(selectList(page)).not.toBeVisible();
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

  test("is set on the event when Enter key is pressed on an option after filtering", async ({
    mount,
    page,
  }) => {
    await mount(<SelectionConfirmed />);

    await dropdownButton(page).click();
    const inputElement = selectInput(page);
    await inputElement.fill("th");
    await expect(
      page.locator('[data-element="confirmed-selection-3"]'),
    ).not.toBeVisible();
    await inputElement.press("Enter");
    await expect(
      page.locator('[data-element="confirmed-selection-3"]'),
    ).toBeVisible();
  });

  test("is not set on the event when Enter key is pressed when there is no match", async ({
    mount,
    page,
  }) => {
    await mount(<SelectionConfirmed />);

    const inputElement = selectInput(page);
    await inputElement.fill("foo");
    await inputElement.press("Enter");
    // note: need to check count rather than visibility here - when the test fails and selectionConfirmed is set,
    // the span with the data-element prop exists but has size 0 due to having no text content - which Playwright
    // counts as not being visible
    expect(
      await page.locator('[data-element^="confirmed-selection-"]').count(),
    ).toBe(0);
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

test("should not select a disabled option when a filter is typed", async ({
  mount,
  page,
}) => {
  await mount(<FilterableSelectWithDisabledOption />);

  await dropdownButton(page).click();
  const inputElement = selectInput(page);
  await inputElement.fill("t");
  await inputElement.press("Enter");
  await expect(
    page.locator('[data-element="confirmed-selection-2"]'),
  ).not.toBeVisible();
  await inputElement.press("ArrowDown");
  await inputElement.press("Enter");
  await expect(
    page.locator('[data-element="confirmed-selection-3"]'),
  ).toBeVisible();
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
  test("should pass accessibility tests with default example", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent />);

    await dropdownButton(page).click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  testData.forEach((labelValue) => {
    test(`should pass accessibility tests with label prop using ${labelValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<FilterableSelectComponent label={labelValue} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((labelHelpValue) => {
    test(`should pass accessibility tests with labelHelp prop using ${labelHelpValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<FilterableSelectComponent labelHelp={labelHelpValue} />);

      await helpIcon(page).hover();
      await checkAccessibility(page, tooltipPreview(page));
    });
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

  (
    [
      ["top", "200px", "0px", "0px", "0px"],
      ["bottom", "0px", "0px", "0px", "0px"],
      ["left", "200px", "0px", "200px", "0px"],
      ["right", "200px", "0px", "0px", "200px"],
    ] as [
      FilterableSelectProps["tooltipPosition"],
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
        <FilterableSelectComponent
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
    await mount(<FilterableSelectComponent disabled />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with readOnly prop", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent readOnly />);

    await checkAccessibility(page);
    await selectInput(page).click();
    await checkAccessibility(page);
  });

  (
    [SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE] as FilterableSelectProps["size"][]
  ).forEach((size) => {
    test(`should pass accessibility tests with size prop as ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<FilterableSelectComponent size={size} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests with autoFocus prop", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent autoFocus />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with required prop", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent required />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with labelInline prop", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent labelInline />);

    await checkAccessibility(page);
  });

  [399, 400, 401].forEach((breakpoint) => {
    test(`should pass accessibility tests with adaptiveLabelBreakpoint prop set as ${breakpoint} and viewport 400`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({
        width: 400,
        height: 300,
      });
      await mount(
        <FilterableSelectComponent
          labelInline
          adaptiveLabelBreakpoint={breakpoint}
        />,
      );

      await checkAccessibility(page);
    });
  });

  (["right", "left"] as FilterableSelectProps["labelAlign"][]).forEach(
    (alignment) => {
      test(`should pass accessibility tests with labelAlign prop set as ${alignment}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <FilterableSelectComponent labelInline labelAlign={alignment} />,
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
        <FilterableSelectComponent
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
      await mount(<FilterableSelectComponent maxWidth={maxWidth} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests with isLoading prop", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent isLoading />);

    await dropdownButton(page).click();
    await expect(loader(page, 1)).toBeVisible();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  test("should pass accessibility tests with openOnFocus prop", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent openOnFocus />);

    await commonDataElementInputPreview(page).focus();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  test("should pass accessibility tests for FilterableSelect with object as value", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectObjectAsValueComponent />);

    await dropdownButton(page).click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  test("should pass accessibility tests with listMaxHeight prop", async ({
    mount,
    page,
  }) => {
    await mount(<FilterableSelectComponent listMaxHeight={200} />);

    await dropdownButton(page).click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
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
    test(`should pass accessibility tests with flipEnabled prop and listPlacement set to ${position}`, async ({
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
      await checkAccessibility(page, undefined, "scrollable-region-focusable");
    });
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

  test("should pass accessibility tests with virtual scrolling", async ({
    mount,
    page,
  }) => {
    await mount(<WithVirtualScrolling />);

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
});
