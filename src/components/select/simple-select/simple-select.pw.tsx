import React from "react";
import { SimpleSelectProps } from ".";
import Option from "../option";
import { test, expect } from "../../../../playwright/helpers/base-test";
import {
  SimpleSelectComponent,
  SimpleSelectMultipleColumnsComponent,
  SimpleSelectObjectAsValueComponent,
  SimpleSelectCustomOptionChildrenComponent,
  SimpleSelectGroupComponent,
  WithVirtualScrolling,
  SimpleSelectNestedInDialog,
  SelectWithOptionGroupHeader,
  SelectionConfirmed,
  SimpleSelectControlled,
  WithObjectAsValue,
  ListWidth,
  ComplexCustomChildren,
} from "./components.test-pw";
import {
  commonDataElementInputPreview,
  getDataElementByValue,
} from "../../../../playwright/components";
import { dialogWithRole } from "../../../../playwright/components/dialog";
import { loader } from "../../../../playwright/components/loader";
import {
  dropdownButton,
  multiColumnsSelectListBody,
  multiColumnsSelectListHeader,
  multiColumnsSelectListHeaderColumn,
  multiColumnsSelectListRow,
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
  positionOfElement,
} from "../../../../playwright/support/helper";
import { CHARACTERS } from "../../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const keyToTrigger = ["ArrowDown", "ArrowUp", "Space", "Home", "End"] as const;

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

  testData.forEach((placeholderValue) => {
    test(`should render placeholder using ${placeholderValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleSelectComponent placeholder={placeholderValue} />);

      await expect(selectText(page)).toHaveText(placeholderValue);
    });
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

    expect(combobox?.y).toBeLessThan(dropdownList?.y ?? 0);
  });

  test("should close the list with the Tab key", async ({ mount, page }) => {
    await mount(<SimpleSelectComponent />);

    const selectListWrapperElement = selectListWrapper(page);
    const selectInputElement = selectInput(page);
    await selectText(page).click();
    await expect(selectListWrapperElement).toBeVisible();
    await selectInputElement.press("Tab");
    await expect(selectInputElement).toHaveAttribute("aria-expanded", "false");
    await expect(selectListWrapperElement).toBeHidden();
  });

  test("should close the list with the Esc key", async ({ mount, page }) => {
    await mount(<SimpleSelectComponent />);

    const selectListWrapperElement = selectListWrapper(page);
    await selectText(page).click();
    await expect(selectListWrapperElement).toBeVisible();
    await commonDataElementInputPreview(page).press("Escape");
    await expect(selectInput(page)).toHaveAttribute("aria-expanded", "false");
    await expect(selectListWrapperElement).toBeHidden();
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
    await expect(selectListWrapperElement).toBeHidden();
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
      await expect(selectListWrapper(page)).toBeHidden();
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

  test("renders loader when isLoading prop is set to true", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent isLoading />);

    const dropdownIcon = page.getByTestId("input-icon-toggle");
    const dropdownList = page.getByRole("listbox");

    await dropdownIcon.click();
    await dropdownList.waitFor();

    await expect(loader(page, 1)).toBeVisible();
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

  test("keyboard navigation should work correctly in multicolumn mode and ensure the selected option is visible", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectMultipleColumnsComponent />);

    const input = page.getByRole("combobox");
    await page.getByText("Please Select...").click();
    await page.getByRole("listbox").waitFor({ state: "visible" });

    await input.press("ArrowDown");
    await expect(input).toHaveValue("John Doe");

    await input.press("ArrowDown");
    await expect(input).toHaveValue("Joe Vick");

    await input.press("ArrowDown");
    await expect(input).toHaveValue("Jane Poe");

    await input.press("ArrowDown");
    await expect(input).toHaveValue("Jill Moe");

    await input.press("ArrowDown");

    const lastOption = page.getByRole("option", {
      name: "Bill Zoe Astronaut",
    });

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
    await mount(<SimpleSelectMultipleColumnsComponent value="2" />);

    const columns = 3;
    await selectText(page).click();
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

      await selectText(page).click();
      const listElement = selectListPosition(page);
      await expect(listElement).toHaveAttribute(
        "data-floating-placement",
        position === "top" ? "bottom" : "top",
      );
      await expect(listElement).toBeVisible();
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
      expect(inputWidth).toBe("198px");
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

  (
    ["top", "top-start", "top-end"] as SimpleSelectProps["listPlacement"][]
  ).forEach((position) => {
    test(`should render list with expected box-shadow when listPosition is ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SimpleSelectComponent listPlacement={position} mt="200px" />,
      );

      await selectText(page).click();
      const listElement = selectListPosition(page);
      await expect(listElement).toHaveCSS(
        "box-shadow",
        "rgba(0, 20, 30, 0.2) 0px -5px 5px 0px, rgba(0, 20, 30, 0.1) 0px -10px 10px 0px",
      );
    });
  });

  (
    [
      "bottom",
      "bottom-start",
      "bottom-end",
    ] as SimpleSelectProps["listPlacement"][]
  ).forEach((position) => {
    test(`should render list with expected box-shadow when listPosition is ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleSelectComponent listPlacement={position} />);

      await selectText(page).click();
      const listElement = selectListPosition(page);
      await expect(listElement).toHaveCSS(
        "box-shadow",
        "rgba(0, 20, 30, 0.2) 0px 5px 5px 0px, rgba(0, 20, 30, 0.1) 0px 10px 10px 0px",
      );
    });
  });

  test("should update box-shadow when placement changes due to window resize", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent mt={200} />);

    await selectText(page).click();
    const listElement = selectListPosition(page);
    await expect(listElement).toHaveCSS(
      "box-shadow",
      "rgba(0, 20, 30, 0.2) 0px 5px 5px 0px, rgba(0, 20, 30, 0.1) 0px 10px 10px 0px",
    );
    await page.setViewportSize({ width: 1200, height: 250 });
    await expect(listElement).toHaveCSS(
      "box-shadow",
      "rgba(0, 20, 30, 0.2) 0px -5px 5px 0px, rgba(0, 20, 30, 0.1) 0px -10px 10px 0px",
    );
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

  testData.forEach((placeholderValue) => {
    test(`should pass accessibility tests with placeholder prop using ${placeholderValue} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleSelectComponent placeholder={placeholderValue} />);

      await checkAccessibility(page);
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

  test("should pass accessibility tests with isLoading prop", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectComponent isLoading />);

    await selectText(page).click();
    await expect(loader(page, 1)).toBeVisible();
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

  test("should pass accessibility tests when nested in a dialog", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleSelectNestedInDialog />);

    await selectText(page).click();
    await checkAccessibility(page, undefined, "scrollable-region-focusable");
  });
});
