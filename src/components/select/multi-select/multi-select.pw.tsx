import { expect, test } from "@playwright/experimental-ct-react17";
import React from "react";
import { MultiSelectProps } from "../../../../src/components/select";
import {
  MultiSelectComponent,
  MultiSelectDefaultValueComponent,
  MultiSelectMaxOptionsComponent,
  MultiSelectWithLazyLoadingComponent,
  MultiSelectLazyLoadTwiceComponent,
  MultiSelectObjectAsValueComponent,
  MultiSelectMultiColumnsComponent,
  MultiSelectCustomColorComponent,
  MultiSelectLongPillComponent,
  MultiSelectOnFilterChangeEventComponent,
  MultiSelectWithManyOptionsAndVirtualScrolling,
  MultiSelectNestedInDialog,
  MultiSelectErrorOnChangeNewValidation,
  SelectionConfirmed,
  MultiSelectWithDisabledOption,
} from "../../../../src/components/select/multi-select/components.test-pw";
import {
  commonDataElementInputPreview,
  getDataElementByValue,
  helpIcon,
  tooltipPreview,
} from "../../../../playwright/components";
import { alertDialogPreview } from "../../../../playwright/components/dialog";
import { loader } from "../../../../playwright/components/loader";
import { pillCloseIcon } from "../../../../playwright/components/pill";
import {
  boldedAndUnderlinedValue,
  dropdownButton,
  multiColumnsSelectListBody,
  multiColumnsSelectListHeader,
  multiColumnsSelectListHeaderColumn,
  multiColumnsSelectListNoResultsMessage,
  multiColumnsSelectListRow,
  multiSelectPill,
  multiSelectPillByPosition,
  multiSelectPillByText,
  selectElementInput,
  selectInput,
  selectList,
  selectListPosition,
  selectListScrollableWrapper,
  selectListWrapper,
  selectOption,
  selectOptionByText,
  selectResetButton,
} from "../../../../playwright/components/select";
import { HooksConfig } from "../../../../playwright";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
  positionOfElement,
  verifyRequiredAsteriskForLabel,
} from "../../../../playwright/support/helper";
import { CHARACTERS, SIZE } from "../../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testPropValue = CHARACTERS.STANDARD;
const columns = 3;
const option1 = "Green";
const option2 = "Purple";
const option3 = "Yellow";
const listOption = "Amber";
const defaultValue = ["10"];
const keyToTrigger = [
  "ArrowDown",
  "ArrowUp",
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End",
  "Enter",
] as const;

test.describe("When focused", () => {
  test("should have the expected styling when the focusRedesignOptOut is false", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent />);

    const inputElement = commonDataElementInputPreview(page);
    await inputElement.focus();
    await expect(inputElement.locator("..")).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
    );
    await expect(inputElement.locator("..")).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px"
    );
  });

  test("should have the expected styling when the focusRedesignOptOut is true", async ({
    mount,
    page,
  }) => {
    await mount<HooksConfig>(<MultiSelectDefaultValueComponent />, {
      hooksConfig: {
        focusRedesignOptOut: true,
      },
    });

    const selectInputElement = commonDataElementInputPreview(page);
    await selectInputElement.focus();
    await expect(selectInputElement.locator("..")).toHaveCSS(
      "outline",
      "rgb(255, 188, 25) solid 3px"
    );
  });
});

test.describe("MultiSelect component", () => {
  testData.forEach((labelValue) => {
    test(`should render label using ${labelValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiSelectComponent label={labelValue} />);

      await expect(getDataElementByValue(page, "label")).toHaveText(labelValue);
    });
  });

  testData.forEach((labelHelpValue) => {
    test(`should render labelHelp message using ${labelHelpValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiSelectComponent labelHelp={labelHelpValue} />);

      await helpIcon(page).hover();
      await expect(tooltipPreview(page)).toHaveText(labelHelpValue);
    });
  });

  testData.forEach((placeholderValue) => {
    test(`should render placeholder using ${placeholderValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiSelectComponent placeholder={placeholderValue} />);

      await expect(selectInput(page)).toHaveAttribute(
        "placeholder",
        placeholderValue
      );
    });
  });

  test("should render with name prop set to test value", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent name={testPropValue} />);

    await expect(commonDataElementInputPreview(page)).toHaveAttribute(
      "name",
      testPropValue
    );
  });

  test("should render with id prop set to test value", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent id={testPropValue} />);

    await expect(commonDataElementInputPreview(page)).toHaveId(testPropValue);
  });

  test("should render with data-component prop set to test value", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent data-component={testPropValue} />);

    await expect(
      selectElementInput(page).locator("..").locator("..")
    ).toHaveAttribute("data-component", testPropValue);
  });

  test("should render with data-element prop set to test value", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent data-element={testPropValue} />);

    await expect(
      selectElementInput(page).locator("..").locator("..")
    ).toHaveAttribute("data-element", testPropValue);
  });

  test("should render with data-role prop set to test value", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent data-role={testPropValue} />);

    await expect(
      selectElementInput(page).locator("..").locator("..")
    ).toHaveAttribute("data-role", testPropValue);
  });

  ([
    ["top", "200px", "0px", "0px", "0px"],
    ["bottom", "0px", "0px", "0px", "0px"],
    ["left", "200px", "0px", "200px", "0px"],
    ["right", "200px", "0px", "0px", "200px"],
  ] as const).forEach(([tooltipPositionValue, top, bottom, left, right]) => {
    test(`should render the help tooltip in the ${tooltipPositionValue} position`, async ({
      mount,
      page,
    }) => {
      await mount(
        <MultiSelectComponent
          labelHelp="Help"
          tooltipPosition={tooltipPositionValue}
          mt={top}
          mb={bottom}
          ml={left}
          mr={right}
        />
      );

      await helpIcon(page).hover();
      const tooltipElement = tooltipPreview(page);
      await expect(tooltipElement).toBeVisible();
      await expect(tooltipElement).toHaveAttribute(
        "data-placement",
        tooltipPositionValue
      );
    });
  });

  test("should check disabled prop", async ({ mount, page }) => {
    await mount(<MultiSelectComponent disabled />);

    const selectInputElement = commonDataElementInputPreview(page);
    await expect(selectInputElement).toBeDisabled();
  });

  test("should render icon with disabled style", async ({ mount, page }) => {
    await mount(<MultiSelectComponent disabled />);

    const dropdownButtonElement = dropdownButton(page);
    await expect(dropdownButtonElement).toBeVisible();
    await expect(dropdownButtonElement).toHaveCSS(
      "color",
      "rgba(0, 0, 0, 0.3)"
    );
  });

  test("should render as read only", async ({ mount, page }) => {
    await mount(<MultiSelectComponent readOnly />);

    await expect(commonDataElementInputPreview(page)).not.toBeEditable();
    await selectInput(page).click();
    await expect(selectListWrapper(page)).not.toBeVisible();
  });

  test("should render icon with read only style", async ({ mount, page }) => {
    await mount(<MultiSelectComponent readOnly />);

    const dropdownButtonElement = dropdownButton(page);
    await expect(dropdownButtonElement).toBeVisible();
    await expect(dropdownButtonElement).toHaveCSS(
      "color",
      "rgba(0, 0, 0, 0.3)"
    );
  });

  ([
    [SIZE.SMALL, "32px"],
    [SIZE.MEDIUM, "40px"],
    [SIZE.LARGE, "48px"],
  ] as [MultiSelectProps["size"], string][]).forEach(([size, height]) => {
    test(`should use ${size} as size and render MultiSelect with ${height} as height`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiSelectComponent size={size} />);

      await expect(commonDataElementInputPreview(page).locator("..")).toHaveCSS(
        "min-height",
        height
      );
    });
  });

  test("should check autofocus prop", async ({ mount, page }) => {
    await mount(<MultiSelectComponent autoFocus />);

    await expect(commonDataElementInputPreview(page)).toBeFocused();
  });

  test("should check required prop", async ({ mount, page }) => {
    await mount(<MultiSelectComponent required />);

    await verifyRequiredAsteriskForLabel(page);
  });

  test("should check label is inline", async ({ mount, page }) => {
    await mount(<MultiSelectComponent labelInline />);

    await expect(getDataElementByValue(page, "label").locator("..")).toHaveCSS(
      "-webkit-box-pack",
      "end"
    );
  });

  ([
    ["flex", 399],
    ["flex", 400],
    ["block", 401],
  ] as const).forEach(([displayValue, breakpoint]) => {
    test(`should check label alignment is ${displayValue} with adaptiveLabelBreakpoint ${breakpoint} and viewport 400`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({
        width: 400,
        height: 300,
      });
      await mount(
        <MultiSelectComponent
          labelInline
          adaptiveLabelBreakpoint={breakpoint}
        />
      );

      await expect(
        getDataElementByValue(page, "label").locator("..").locator("..")
      ).toHaveCSS("display", displayValue);
    });
  });

  ([
    ["right", "end"],
    ["left", "start"],
  ] as [MultiSelectProps["labelAlign"], string][]).forEach(
    ([alignment, cssProp]) => {
      test(`should use ${alignment} as labelAligment and render with flex-${cssProp} as css properties`, async ({
        mount,
        page,
      }) => {
        await mount(
          <MultiSelectComponent labelInline labelAlign={alignment} />
        );

        const labelParentElement = getDataElementByValue(page, "label").locator(
          ".."
        );
        await expect(labelParentElement).toHaveCSS("-webkit-box-pack", cssProp);
        await expect(labelParentElement).toHaveCSS(
          "justify-content",
          `flex-${cssProp}`
        );
      });
    }
  );

  [
    [10, 90, 135, 1229],
    [30, 70, 409, 954],
    [80, 20, 1092, 273],
  ].forEach(([label, input, labelRatio, inputRatio]) => {
    test(`should use ${label} as labelWidth, ${input} as inputWidth and render with correct label and input width ratios`, async ({
      mount,
      page,
    }) => {
      await mount(
        <MultiSelectComponent
          labelInline
          labelWidth={label}
          inputWidth={input}
        />
      );

      await assertCssValueIsApproximately(
        getDataElementByValue(page, "label").locator(".."),
        "width",
        labelRatio
      );
      await assertCssValueIsApproximately(
        getDataElementByValue(page, "input").locator(".."),
        "width",
        inputRatio
      );
    });
  });

  ["10%", "30%", "50%", "80%", "100%"].forEach((maxWidth) => {
    test(`should check maxWidth as ${maxWidth}`, async ({ mount, page }) => {
      await mount(<MultiSelectComponent maxWidth={maxWidth} />);

      await expect(
        getDataElementByValue(page, "input").locator("..").locator("..")
      ).toHaveCSS("max-width", maxWidth);
    });
  });

  test("when maxWidth has no value it should render as 100%", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent maxWidth="" />);

    await expect(
      getDataElementByValue(page, "input").locator("..").locator("..")
    ).toHaveCSS("max-width", "100%");
  });

  test("should not open the list with focus on input", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent />);

    const inputElement = commonDataElementInputPreview(page);
    await inputElement.focus();
    await expect(inputElement).toBeFocused();
    await expect(inputElement).toHaveAttribute("aria-expanded", "false");
    await expect(selectListWrapper(page)).not.toBeVisible();
  });

  test("should not open the list with mouse click on input", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent />);

    const inputElement = commonDataElementInputPreview(page);
    await inputElement.click();
    await expect(inputElement).toBeFocused();
    await expect(inputElement).toHaveAttribute("aria-expanded", "false");
    await expect(selectListWrapper(page)).not.toBeVisible();
  });

  test("should open the list with mouse click on dropdown button", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent />);

    await dropdownButton(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
  });

  test("should close the list with mouse click on dropdown button", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent />);

    await dropdownButton(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
    await dropdownButton(page).click();
    await expect(selectListWrapper(page)).not.toBeVisible();
  });

  test("should close the list with the Tab key", async ({ mount, page }) => {
    await mount(<MultiSelectComponent />);

    const selectListWrapperElement = selectListWrapper(page);
    const selectInputElement = selectInput(page);
    await dropdownButton(page).click();
    await expect(selectListWrapperElement).toBeVisible();
    await selectInputElement.press("Tab");
    await expect(selectInputElement).toHaveAttribute("aria-expanded", "false");
    await expect(selectListWrapperElement).not.toBeVisible();
  });

  test("should close the list with the Esc key", async ({ mount, page }) => {
    await mount(<MultiSelectComponent />);

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
    await mount(<MultiSelectComponent />);

    await dropdownButton(page).click();
    const selectListWrapperElement = selectListWrapper(page);
    await expect(selectListWrapperElement).toBeVisible();
    await page.locator("body").click({ position: { x: 0, y: 0 } });
    await expect(selectInput(page)).toHaveAttribute("aria-expanded", "false");
    await expect(selectListWrapperElement).not.toBeVisible();
  });

  [keyToTrigger[0], keyToTrigger[1], keyToTrigger[4], keyToTrigger[5]].forEach(
    (key) => {
      test(`should open the list when ${key} is pressed with input in focus`, async ({
        mount,
        page,
      }) => {
        await mount(<MultiSelectComponent />);

        await commonDataElementInputPreview(page).focus();
        await selectInput(page).press(key);
        await expect(selectListWrapper(page)).toBeVisible();
      });
    }
  );

  test("should not open the list when Enter is pressed with input in focus", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent />);

    await commonDataElementInputPreview(page).focus();
    await selectInput(page).press("Enter");
    await expect(selectListWrapper(page)).not.toBeVisible();
  });

  ["Amber", "Yellow"].forEach((option) => {
    test(`should select option ${option} when clicked from the list and create option pill in the input`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiSelectComponent />);

      await dropdownButton(page).click();
      await selectOptionByText(page, option).click();
      await expect(selectInput(page)).toHaveAttribute("aria-expanded", "true");
      await expect(selectListWrapper(page)).toBeVisible();
      await expect(multiSelectPill(page)).toHaveAttribute("title", option);
    });
  });

  test("should select two options and create option pills in the input", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent />);

    await dropdownButton(page).click();
    await selectOptionByText(page, option1).click();
    await expect(selectInput(page)).toHaveAttribute("aria-expanded", "true");
    await expect(selectListWrapper(page)).toBeVisible();
    await expect(multiSelectPill(page)).toHaveAttribute("title", option1);
    await selectOptionByText(page, option2).click();
    await expect(multiSelectPillByPosition(page, 0)).toHaveAttribute(
      "title",
      option1
    );
    await expect(multiSelectPillByPosition(page, 1)).toHaveAttribute(
      "title",
      option2
    );
  });

  test("should check number of selected options are limited to 2", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectMaxOptionsComponent />);

    const length = 2;
    await dropdownButton(page).click();
    await selectOptionByText(page, option1).click();
    await expect(selectInput(page)).toHaveAttribute("aria-expanded", "true");
    await expect(selectListWrapper(page)).toBeVisible();
    await expect(multiSelectPill(page)).toHaveAttribute("title", option1);
    await selectOptionByText(page, option2).click();
    await selectOptionByText(page, option3).click();
    await expect(multiSelectPill(page)).toHaveCount(length);
    await expect(multiSelectPillByPosition(page, 0)).toHaveAttribute(
      "title",
      option1
    );
    await expect(multiSelectPillByPosition(page, 1)).toHaveAttribute(
      "title",
      option2
    );
  });

  [
    ["A", "Amber", "Black", "Orange"],
    ["O", "Brown", "Orange", "Yellow"],
  ].forEach(([text, optionValue1, optionValue2, optionValue3]) => {
    test(`should filter options when ${text} is typed`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiSelectComponent />);

      await commonDataElementInputPreview(page).type(text);
      await expect(selectInput(page)).toHaveAttribute("aria-expanded", "true");
      await expect(selectListWrapper(page)).toBeVisible();
      const optionOne = selectOption(page, positionOfElement("first"));
      const optionTwo = selectOption(page, positionOfElement("second"));
      const optionThree = selectOption(page, positionOfElement("third"));
      await expect(optionOne).toHaveText(optionValue1);
      await expect(optionOne).toBeVisible();
      await expect(optionOne).toHaveCSS(
        "background-color",
        "rgb(153, 173, 183)"
      );
      await expect(optionTwo).toHaveText(optionValue2);
      await expect(optionTwo).toBeVisible();
      await expect(optionTwo).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
      await expect(optionThree).toHaveText(optionValue3);
      await expect(optionThree).toBeVisible();
      await expect(optionThree).toHaveCSS(
        "background-color",
        "rgba(0, 0, 0, 0)"
      );
    });
  });

  [keyToTrigger[0], keyToTrigger[1]].forEach((key) => {
    test(`should not select an option when non-matching filter text is entered and then ${key} key is pressed`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiSelectComponent />);

      await commonDataElementInputPreview(page).type("foo");
      await commonDataElementInputPreview(page).press(key);
      await expect(page.getByText('No results for "foo"')).toBeVisible();
    });
  });

  test("should render the lazy loader when the prop is set", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectWithLazyLoadingComponent />);

    await dropdownButton(page).click();
    await expect(selectListWrapper(page)).toBeVisible();
    await Promise.all(
      [0, 1, 2].map((i) => expect(loader(page, i)).toBeVisible())
    );
  });

  test("should render the lazy loader when the prop is set and list is opened again", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectLazyLoadTwiceComponent />);

    const buttonElement = dropdownButton(page);
    const wrapperElement = selectListWrapper(page);
    await buttonElement.click();
    await expect(wrapperElement).toBeVisible();
    await Promise.all(
      [0, 1, 2].map((i) => expect(loader(page, i)).toBeVisible())
    );
    await expect(selectOptionByText(page, listOption)).toBeVisible();
    await buttonElement.click();
    await selectResetButton(page).click();
    await buttonElement.click();
    await expect(wrapperElement).toBeVisible();
    await Promise.all(
      [0, 1, 2].map((i) => expect(loader(page, i)).toBeVisible())
    );
  });

  test("should list options when value is set and select list is opened again", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent />);

    const count = 11;
    const dropdownButtonElement = dropdownButton(page);
    const wrapperElement = await selectListWrapper(page);
    await dropdownButtonElement.click();
    await selectOptionByText(page, listOption).click();
    await expect(multiSelectPill(page)).toHaveAttribute("title", listOption);
    await expect(selectInput(page)).toHaveAttribute("aria-expanded", "true");
    await expect(wrapperElement).toBeVisible();
    await dropdownButtonElement.click();
    await dropdownButtonElement.click();
    await expect(wrapperElement.locator("li")).toHaveCount(count);
  });

  test("should check list is open when input is focused and openOnFocus is set", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent openOnFocus />);

    await commonDataElementInputPreview(page).focus();
    await expect(selectInput(page)).toHaveAttribute("aria-expanded", "true");
    await expect(selectListWrapper(page)).toBeVisible();
  });

  test("should check list is open when input is clicked and openOnFocus is set", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent openOnFocus />);

    await commonDataElementInputPreview(page).click();
    await expect(selectInput(page)).toHaveAttribute("aria-expanded", "true");
    await expect(selectListWrapper(page)).toBeVisible();
  });

  test("should open correct list and select one when an object is already set as a value", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectObjectAsValueComponent />);

    await expect(multiSelectPill(page)).toHaveAttribute("title", option1);
    await expect(selectInput(page)).toHaveAttribute("aria-expanded", "false");
    await dropdownButton(page).click();
    await selectOptionByText(page, option2).click();
    await expect(multiSelectPillByPosition(page, 0)).toHaveAttribute(
      "title",
      option1
    );
    await expect(multiSelectPillByPosition(page, 1)).toHaveAttribute(
      "title",
      option2
    );
  });

  ([
    ["top", "0px", "0px", "0px", "20px"],
    ["bottom", "600px", "0px", "0px", "20px"],
    ["left", "200px", "0px", "0px", "900px"],
    ["right", "200px", "0px", "500px", "20px"],
  ] as [
    MultiSelectProps["listPlacement"],
    string,
    string,
    string,
    string
  ][]).forEach(([position, top, bottom, left, right]) => {
    test(`should flip list to opposite position when there is not enough space to render in ${position} position`, async ({
      mount,
      page,
    }) => {
      await mount(
        <MultiSelectComponent
          listPlacement={position}
          flipEnabled
          mt={top}
          mb={bottom}
          ml={left}
          mr={right}
        />
      );

      let flipPosition = "";
      if (position === "top") {
        flipPosition = "bottom";
      }
      if (position === "bottom") {
        flipPosition = "top";
      }
      if (position === "left") {
        flipPosition = "right";
      }
      if (position === "right") {
        flipPosition = "left";
      }
      await dropdownButton(page).click();
      const listElement = selectListPosition(page);
      await expect(listElement).toHaveAttribute(
        "data-floating-placement",
        flipPosition
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
        <MultiSelectComponent mt={top} mb={bottom} ml={left} mr={right} />
      );

      await dropdownButton(page).click();
      const listElement = selectListPosition(page);
      await expect(listElement).toHaveAttribute(
        "data-floating-placement",
        position
      );
      await expect(listElement).toBeVisible();
    });
  });

  test("should render list options with multiple columns", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectMultiColumnsComponent />);

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
      "rgba(0, 0, 0, 0)"
    );
  });

  test("should check table header content in list with multiple columns", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectMultiColumnsComponent />);

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
      await mount(<MultiSelectMultiColumnsComponent />);

      const inputElement = commonDataElementInputPreview(page);
      await inputElement.click();
      await expect(inputElement).toBeFocused();
      await inputElement.type(text);
      const highlightedValue = boldedAndUnderlinedValue(page, text);
      await expect(highlightedValue).toHaveCSS(
        "text-decoration-line",
        "underline"
      );
      await expect(highlightedValue).toHaveCSS(
        "text-decoration-style",
        "solid"
      );
      await expect(highlightedValue).toHaveCSS("font-weight", "700");
    });
  });

  test("should indicate no results match for entered string Xyz", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectMultiColumnsComponent />);

    const text = "Xyz";
    const inputElement = commonDataElementInputPreview(page);
    await inputElement.click();
    await expect(inputElement).toBeFocused();
    await inputElement.type(text);
    await expect(selectListWrapper(page)).toBeVisible();
    const headerElements = multiColumnsSelectListHeader(page);
    await expect(headerElements).toHaveCount(columns);
    const assertions = [];
    for (let i = 0; i < columns; i++) {
      assertions.push(expect(headerElements.nth(i)).toBeVisible());
    }
    await Promise.all(assertions);
    await expect(
      multiColumnsSelectListNoResultsMessage(page, text)
    ).toBeVisible();
  });

  [
    ["3", "Blue"],
    ["7", "Pink"],
  ].forEach(([value, option]) => {
    test(`should set defaultValue prop to ${value} and show option pill ${option} preselected`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiSelectDefaultValueComponent defaultValue={[value]} />);

      await expect(multiSelectPill(page)).toHaveAttribute("title", option);
    });
  });

  test("should have no pill option preselected if defaultValue prop is not set", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectDefaultValueComponent />);

    await expect(multiSelectPill(page)).toHaveCount(0);
  });

  test("should render with custom coloured pills", async ({ mount, page }) => {
    await mount(<MultiSelectCustomColorComponent />);

    const firstPill = multiSelectPillByPosition(page, 0);
    const secondPill = multiSelectPillByPosition(page, 1);
    await expect(firstPill).toHaveCSS("border-color", "rgb(255, 191, 0)");
    await expect(firstPill).toHaveCSS("background-color", "rgb(255, 191, 0)");
    await expect(secondPill).toHaveCSS("border-color", "rgb(0, 119, 200)");
    await expect(secondPill).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  });

  ([
    ["third", "Blue as the sky on a summer's day"],
    ["fifth", "Green as the grass in a spring meadow"],
  ] as const).forEach(([option, text]) => {
    test(`should select ${option} list option and show pill with complete long text wrapped in the input`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiSelectLongPillComponent wrapPillText />);

      await dropdownButton(page).click();
      await selectOption(page, positionOfElement(option)).click();
      await expect(multiSelectPill(page)).toHaveAttribute("title", text);
    });
  });

  test("should show selected pill option with correctly formatted delete button when focused", async ({
    mount,
    page,
  }) => {
    await mount(
      <MultiSelectDefaultValueComponent defaultValue={defaultValue} />
    );

    await expect(multiSelectPill(page)).toHaveAttribute("title", "White");
    const closeIcon = pillCloseIcon(page);
    await closeIcon.focus();
    await expect(closeIcon).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
    );
    await expect(closeIcon).toHaveCSS("background-color", "rgb(0, 103, 56)");
  });

  test("should delete pill option with delete button", async ({
    mount,
    page,
  }) => {
    await mount(
      <MultiSelectDefaultValueComponent defaultValue={defaultValue} />
    );

    const pillElement = multiSelectPill(page);
    await expect(pillElement).toHaveAttribute("title", "White");
    await pillCloseIcon(page).click();
    await expect(pillElement).toHaveCount(0);
  });

  test("should delete pill option with backspace key", async ({
    mount,
    page,
  }) => {
    await mount(
      <MultiSelectDefaultValueComponent defaultValue={defaultValue} />
    );

    const pillElement = multiSelectPill(page);
    await expect(pillElement).toHaveAttribute("title", "White");
    await commonDataElementInputPreview(page).press("Backspace");
    await expect(pillElement).toHaveCount(0);
  });

  test("should delete all selected pill options and leave list open", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent />);

    await dropdownButton(page).click();
    await selectOptionByText(page, option1).click();
    await selectOptionByText(page, option2).click();
    await expect(selectInput(page)).toHaveAttribute("aria-expanded", "true");
    const wrapperElement = selectListWrapper(page);
    await expect(wrapperElement).toBeVisible();
    const inputElement = await commonDataElementInputPreview(page);
    await inputElement.press("Backspace");
    await expect(multiSelectPillByText(page, option2)).toHaveCount(0);
    await expect(wrapperElement).toBeVisible();
    await inputElement.press("Backspace");
    await expect(multiSelectPill(page)).toHaveCount(0);
    await expect(wrapperElement).toBeVisible();
  });

  test("should have correct hover state of list option", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent />);

    await dropdownButton(page).click();
    const optionElement = selectOptionByText(page, option1);
    await optionElement.hover();
    await expect(optionElement).toHaveCSS(
      "background-color",
      "rgb(204, 214, 219)"
    );
  });

  test("should contain custom option id option1", async ({ mount, page }) => {
    await mount(<MultiSelectComponent />);

    await dropdownButton(page).click();
    await expect(selectOptionByText(page, listOption)).toHaveId("option1");
  });

  test("should render option data-component prop set to option", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent />);

    await dropdownButton(page).click();
    await expect(selectOptionByText(page, listOption)).toHaveAttribute(
      "data-component",
      "option"
    );
  });

  test("should render option data-role prop set to option1", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent />);

    await dropdownButton(page).click();
    await expect(selectOptionByText(page, listOption)).toHaveAttribute(
      "data-role",
      "option1"
    );
  });

  test("should render option data-element prop set to option1", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent />);

    await dropdownButton(page).click();
    await expect(selectOptionByText(page, listOption)).toHaveAttribute(
      "data-element",
      "option1"
    );
  });

  test("should contain custom option row id 3", async ({ mount, page }) => {
    await mount(<MultiSelectMultiColumnsComponent />);

    await dropdownButton(page).click();
    await expect(multiColumnsSelectListBody(page).locator("..")).toHaveId("3");
  });

  test("should render option row data-component prop set to option-row", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectMultiColumnsComponent />);

    await dropdownButton(page).click();
    await expect(
      multiColumnsSelectListBody(page).locator("..")
    ).toHaveAttribute("data-component", "option-row");
  });

  test("should render option row data-role prop set to option-row", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectMultiColumnsComponent />);

    await dropdownButton(page).click();
    await expect(
      multiColumnsSelectListBody(page).locator("..")
    ).toHaveAttribute("data-role", "option-row");
  });

  test("should render option row data-element prop set to option-row", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectMultiColumnsComponent />);

    await dropdownButton(page).click();
    await expect(
      multiColumnsSelectListBody(page).locator("..")
    ).toHaveAttribute("data-element", "option-row");
  });

  test("should have the expected border radius styling", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent />);

    await expect(selectInput(page)).toHaveCSS("border-radius", "4px");
    await expect(selectListWrapper(page)).toHaveCSS("border-radius", "4px");
  });
});

test.describe("Check events for MultiSelect component", () => {
  test("should call onClick event when mouse is clicked on text input", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback = () => {
      callbackCount += 1;
    };
    await mount(<MultiSelectComponent onClick={callback} />);

    await commonDataElementInputPreview(page).click();
    await expect(callbackCount).toBe(1);
  });

  test("should call onFocus when MultiSelect is brought into focus", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback = () => {
      callbackCount += 1;
    };
    await mount(<MultiSelectComponent onFocus={callback} />);

    await commonDataElementInputPreview(page).focus();
    await expect(callbackCount).toBe(1);
  });

  test("should call onOpen when MultiSelect is opened", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback = () => {
      callbackCount += 1;
    };
    await mount(<MultiSelectComponent onOpen={callback} />);

    await dropdownButton(page).click();
    await expect(callbackCount).toBe(1);
  });

  test("should call onBlur event when the list is closed", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback = () => {
      callbackCount += 1;
    };
    await mount(<MultiSelectComponent onBlur={callback} />);

    await dropdownButton(page).click();
    await selectInput(page).blur();
    await expect(callbackCount).toBe(1);
  });

  test("should call onChange event once when a list option is selected", async ({
    mount,
    page,
  }) => {
    type CallbackArgument = Parameters<
      Required<MultiSelectProps>["onChange"]
    >[0];
    const callbackArguments: CallbackArgument[] = [];
    const callback = (e: CallbackArgument) => {
      callbackArguments.push(e);
    };
    await mount(<MultiSelectComponent onChange={callback} />);

    const position = "first";
    const option = ["1"];
    await dropdownButton(page).click();
    await selectOption(page, positionOfElement(position)).click();
    await expect(callbackArguments.length).toBe(1);
    await expect(callbackArguments[0]).toMatchObject({
      target: { value: option },
      selectionConfirmed: true,
    });
  });

  [
    keyToTrigger[0],
    keyToTrigger[1],
    keyToTrigger[2],
    keyToTrigger[3],
    keyToTrigger[6],
  ].forEach((key) => {
    test(`should call onKeyDown event when ${key} key is pressed`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      const callback = () => {
        callbackCount += 1;
      };
      await mount(<MultiSelectComponent onKeyDown={callback} />);

      const inputElement = commonDataElementInputPreview(page);
      await inputElement.focus();
      await inputElement.press(key);
      await expect(callbackCount).toBe(1);
    });
  });

  test("should call onFilterChange event when a filter string is input", async ({
    mount,
    page,
  }) => {
    type CallbackArgument = Parameters<
      Required<MultiSelectProps>["onFilterChange"]
    >[0];
    const callbackArguments: CallbackArgument[] = [];
    const callback = (e: CallbackArgument) => {
      callbackArguments.push(e);
    };
    await mount(
      <MultiSelectOnFilterChangeEventComponent onFilterChange={callback} />
    );

    const text = "B";
    const inputElement = commonDataElementInputPreview(page);
    await inputElement.focus();
    await inputElement.type(text);
    await expect(callbackArguments.length).toBe(1);
    await expect(callbackArguments[0]).toBe(text);
  });
});

test.describe("Check virtual scrolling", () => {
  test("renders only an appropriate number of options into the DOM when first opened", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectWithManyOptionsAndVirtualScrolling />);

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
    await mount(<MultiSelectWithManyOptionsAndVirtualScrolling />);

    await dropdownButton(page).click();
    await selectListScrollableWrapper(page).evaluate((wrapper) =>
      wrapper.scrollTo(0, 750)
    );
    await page.waitForTimeout(250);
    await expect(selectOptionByText(page, "Option 1.")).toHaveCount(0);
    await expect(selectOptionByText(page, "Option 20.")).toBeInViewport();
    const option30 = selectOptionByText(page, "Option 30.");
    await expect(option30).toHaveCount(1);
    await expect(option30).not.toBeInViewport();
    await expect(selectOptionByText(page, "Option 40.")).toHaveCount(0);
  });

  test("should filter options when text is typed, taking into account non-rendered options", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectWithManyOptionsAndVirtualScrolling />);

    await commonDataElementInputPreview(page).type("Option 100");
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
    await mount(<MultiSelectNestedInDialog />);

    await dropdownButton(page).click();
    await alertDialogPreview(page).click();
    await expect(selectList(page)).not.toBeVisible();
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
    await selectOptionByText(page, option1).click();
    await selectOptionByText(page, option2).click();
    await selectOptionByText(page, option3).click();

    /* This is <p>Error</p> that displays the error message in the new validations. 
      It does not have a data-element or data-component prop to target the element with. 
      This can be refactored once this is implemented. */
    const errorElement = page.locator("p");
    await expect(errorElement).toBeVisible();
    await expect(errorElement).toHaveText("Error");
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
    await selectOptionByText(page, "Five").click();
    await selectOptionByText(page, "Seven").click();

    await expect(
      page.locator('[data-element="confirmed-selections"] > *')
    ).toHaveCount(3);
    await expect(
      page.locator('[data-element="confirmed-selection-1"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-element="confirmed-selection-5"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-element="confirmed-selection-7"]')
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
    await inputElement.press("ArrowDown");
    await inputElement.press("ArrowDown");
    await inputElement.press("Enter");
    await inputElement.press("ArrowDown");
    await inputElement.press("ArrowDown");
    await inputElement.press("Enter");
    await inputElement.press("ArrowDown");
    await inputElement.press("Enter");

    await expect(
      page.locator('[data-element="confirmed-selections"] > *')
    ).toHaveCount(4);
    await expect(
      page.locator('[data-element="confirmed-selection-1"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-element="confirmed-selection-3"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-element="confirmed-selection-5"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-element="confirmed-selection-6"]')
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
    await inputElement.press("ArrowUp");
    await inputElement.press("ArrowUp");
    await inputElement.press("Enter");
    await inputElement.press("ArrowUp");
    await inputElement.press("ArrowUp");
    await inputElement.press("Enter");
    await inputElement.press("ArrowUp");
    await inputElement.press("Enter");

    await expect(
      page.locator('[data-element="confirmed-selections"] > *')
    ).toHaveCount(4);
    await expect(
      page.locator('[data-element="confirmed-selection-9"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-element="confirmed-selection-7"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-element="confirmed-selection-5"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-element="confirmed-selection-4"]')
    ).toBeVisible();
  });

  test("is set on the event when the selected options are removed via Backspace key", async ({
    mount,
    page,
  }) => {
    await mount(<SelectionConfirmed />);

    await dropdownButton(page).click();
    const inputElement = selectInput(page);
    await inputElement.press("ArrowDown");
    await inputElement.press("Enter");
    await inputElement.press("ArrowDown");
    await inputElement.press("Enter");
    await inputElement.press("ArrowDown");
    await inputElement.press("Enter");
    await inputElement.press("ArrowDown");
    await inputElement.press("Enter");

    const confirmedSelections = page.locator(
      '[data-element="confirmed-selections"] > *'
    );
    await expect(confirmedSelections).toHaveCount(4);

    await inputElement.press("Backspace");
    await expect(confirmedSelections).toHaveCount(3);
    await inputElement.press("Backspace");
    await expect(confirmedSelections).toHaveCount(2);
    await inputElement.press("Backspace");
    await expect(confirmedSelections).toHaveCount(1);
    await inputElement.press("Backspace");
    await expect(confirmedSelections).toHaveCount(0);
  });

  test("is set on the event when the selected options are removed via clicking close icon of Pills", async ({
    mount,
    page,
  }) => {
    await mount(<SelectionConfirmed />);

    await dropdownButton(page).click();
    await selectOptionByText(page, "One").click();
    await selectOptionByText(page, "Five").click();
    await selectOptionByText(page, "Seven").click();

    const confirmedSelections = page.locator(
      '[data-element="confirmed-selections"] > *'
    );
    await expect(confirmedSelections).toHaveCount(3);
    await pillCloseIcon(page).nth(2).click();
    await expect(confirmedSelections).toHaveCount(2);
    await pillCloseIcon(page).nth(1).click();
    await expect(confirmedSelections).toHaveCount(1);
    await pillCloseIcon(page).nth(0).click();
    await expect(confirmedSelections).toHaveCount(0);
  });
});

test("should not add an empty Pill when filter text does not match option text", async ({
  mount,
  page,
}) => {
  await mount(<MultiSelectComponent />);

  const pillElement = multiSelectPill(page);
  await expect(pillElement).not.toBeVisible();
  await commonDataElementInputPreview(page).type("abc");
  await selectInput(page).press("Enter");
  await expect(pillElement).not.toBeVisible();
});

test("should not select a disabled option when a filter is typed", async ({
  mount,
  page,
}) => {
  await mount(<MultiSelectWithDisabledOption />);

  await dropdownButton(page).click();
  const inputElement = selectInput(page);
  await inputElement.type("t");
  await inputElement.press("Enter");
  await expect(
    page.locator('[data-element="confirmed-selection-2"]')
  ).not.toBeVisible();
  await inputElement.press("ArrowDown");
  await inputElement.press("Enter");
  await expect(
    page.locator('[data-element="confirmed-selection-3"]')
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
      wrapper.scrollBy(0, 500)
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

  testData.forEach((labelValue) => {
    test(`should pass accessibility tests with label prop using ${labelValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiSelectComponent label={labelValue} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((labelHelpValue) => {
    test(`should pass accessibility tests with labelHelp prop using ${labelHelpValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiSelectComponent labelHelp={labelHelpValue} />);

      await helpIcon(page).hover();
      await checkAccessibility(page, tooltipPreview(page));
    });
  });

  testData.forEach((placeholderValue) => {
    test(`should pass accessibility tests with placeholder prop using ${placeholderValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiSelectComponent placeholder={placeholderValue} />);

      await checkAccessibility(page);
    });
  });

  ([
    ["top", "200px", "0px", "0px", "0px"],
    ["bottom", "0px", "0px", "0px", "0px"],
    ["left", "200px", "0px", "200px", "0px"],
    ["right", "200px", "0px", "0px", "200px"],
  ] as [
    MultiSelectProps["tooltipPosition"],
    string,
    string,
    string,
    string
  ][]).forEach(([tooltipPositionValue, top, bottom, left, right]) => {
    test(`should pass accessibility tests with tooltip prop in the ${tooltipPositionValue} position`, async ({
      mount,
      page,
    }) => {
      await mount(
        <MultiSelectComponent
          labelHelp="Help"
          tooltipPosition={tooltipPositionValue}
          mt={top}
          mb={bottom}
          ml={left}
          mr={right}
        />
      );

      await helpIcon(page).hover();
      await checkAccessibility(page, tooltipPreview(page));
    });
  });

  test("should pass accessibility tests with disabled prop", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent disabled />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with readOnly prop", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent readOnly />);

    await checkAccessibility(page);
    await selectInput(page).click();
    await checkAccessibility(page);
  });

  ([SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE] as MultiSelectProps["size"][]).forEach(
    (size) => {
      test(`should pass accessibility tests with size prop as ${size}`, async ({
        mount,
        page,
      }) => {
        await mount(<MultiSelectComponent size={size} />);

        await checkAccessibility(page);
      });
    }
  );

  test("should pass accessibility tests with autoFocus prop", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent autoFocus />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with required prop", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent required />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with labelInline prop", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent labelInline />);

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
        <MultiSelectComponent
          labelInline
          adaptiveLabelBreakpoint={breakpoint}
        />
      );

      await checkAccessibility(page);
    });
  });

  (["right", "left"] as MultiSelectProps["labelAlign"][]).forEach(
    (alignment) => {
      test(`should pass accessibility tests with labelAlign prop set as ${alignment}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <MultiSelectComponent labelInline labelAlign={alignment} />
        );

        await checkAccessibility(page);
      });
    }
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
        <MultiSelectComponent
          labelInline
          labelWidth={label}
          inputWidth={input}
        />
      );

      await checkAccessibility(page);
    });
  });

  ["10%", "30%", "50%", "80%", "100%"].forEach((maxWidth) => {
    test(`should pass accessibility tests with maxWidth prop set as ${maxWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiSelectComponent maxWidth={maxWidth} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests with isLoading prop", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectWithLazyLoadingComponent />);

    await dropdownButton(page).click();
    await expect(loader(page, 1)).toBeVisible();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with openOnFocus prop", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectComponent openOnFocus />);

    await commonDataElementInputPreview(page).focus();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  test("should pass accessibility tests with object as value", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectObjectAsValueComponent />);

    await dropdownButton(page).click();
    await selectOptionByText(page, option2).click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  ([
    ["top", "0px", "0px", "0px", "20px"],
    ["bottom", "600px", "0px", "0px", "20px"],
    ["left", "200px", "0px", "0px", "900px"],
    ["right", "200px", "0px", "500px", "20px"],
  ] as [
    MultiSelectProps["listPlacement"],
    string,
    string,
    string,
    string
  ][]).forEach(([position, top, bottom, left, right]) => {
    test(`should pass accessibility tests with flipEnabled prop and listPlacement set to ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <MultiSelectComponent
          listPlacement={position}
          flipEnabled
          mt={top}
          mb={bottom}
          ml={left}
          mr={right}
        />
      );

      await dropdownButton(page).click();
      await checkAccessibility(page, undefined, "scrollable-region-focusable");
    });
  });

  test("should pass accessibility tests with multiple columns", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectMultiColumnsComponent />);

    await dropdownButton(page).click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });

  ["3", "7"].forEach((value) => {
    test(`should pass accessibility tests with defaultValue prop set to ${value}`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiSelectDefaultValueComponent defaultValue={[value]} />);
      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests with custom coloured pills", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectCustomColorComponent />);

    await checkAccessibility(page);
  });

  (["third", "fifth"] as const).forEach((option) => {
    test(`should pass accessibility tests for MultiSelect wrapPillText prop when clicking on ${option} option`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiSelectLongPillComponent wrapPillText />);

      await dropdownButton(page).click();
      await selectOption(page, positionOfElement(option)).click();
      await checkAccessibility(page, undefined, "scrollable-region-focusable");
    });
  });

  test("should pass accessibility tests with virtual scrolling", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectWithManyOptionsAndVirtualScrolling />);

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

  test("should pass accessibility tests when error is triggered by onChange", async ({
    mount,
    page,
  }) => {
    await mount(<MultiSelectErrorOnChangeNewValidation />);

    await dropdownButton(page).click();
    await selectOptionByText(page, option1).click();
    await selectOptionByText(page, option2).click();
    await selectOptionByText(page, option3).click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });
});
