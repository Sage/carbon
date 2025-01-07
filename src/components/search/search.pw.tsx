import { expect, test } from "@playwright/experimental-ct-react17";
import React from "react";
import {
  getDataElementByValue,
  tooltipPreview,
} from "../../../playwright/components";
import {
  searchButton,
  searchCrossIcon,
  searchDefault,
  searchDefaultInnerIcon,
  searchDefaultInput,
  searchIcon,
} from "../../../playwright/components/search/index";
import { CHARACTERS, VALIDATION } from "../../../playwright/support/constants";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
} from "../../../playwright/support/helper";
import Box from "../box";
import { SearchComponent } from "./components.test-pw";
import Search, { SearchProps } from "./search.component";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testDataStandard = CHARACTERS.STANDARD;
const keysToTrigger = ["Enter", "Space"] as const;

const validationTypes: [string, string][] = [
  ["error", VALIDATION.ERROR],
  ["warning", VALIDATION.WARNING],
  ["info", VALIDATION.INFO],
];

test.describe("When focused", () => {
  test("should have the expected styling for the input", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponent />);

    const searchDefaultInputElement = searchDefaultInput(page);
    await searchDefaultInputElement.focus();
    const searchDefaultInputElementParent =
      searchDefaultInputElement.locator("..");

    await expect(searchDefaultInputElementParent).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
  });

  test("should have the expected styling for the search icon", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponent searchButton />);

    const searchDefaultInputElement = searchDefaultInput(page);
    await searchDefaultInputElement.clear();
    await searchDefaultInputElement.fill(testDataStandard);
    const searchButtonElement = searchButton(page);
    await searchButtonElement.click({
      force: true,
    });

    await expect(searchButtonElement).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
  });

  test("should have the expected styling for the cross icon", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponent searchButton />);

    const searchDefaultInputElement = searchDefaultInput(page);
    await searchDefaultInputElement.clear();
    await searchDefaultInputElement.fill(testDataStandard);
    await searchDefaultInputElement.press("Tab");
    const searchCrossIconElementParent = searchCrossIcon(page).locator("..");

    await expect(searchCrossIconElementParent).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
  });
});

test.describe("Prop tests for Search component", () => {
  testData.forEach((placeholder) => {
    test(`should render Search with placeholder using ${placeholder} as special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<SearchComponent placeholder={placeholder} />);

      const searchDefaultInputElement = searchDefaultInput(page);

      await expect(searchDefaultInputElement).toHaveAttribute(
        "placeholder",
        placeholder,
      );
    });
  });

  test("should render Search with defaultValue prop", async ({
    mount,
    page,
  }) => {
    await mount(<Search defaultValue={testDataStandard} />);

    const searchDefaultInputElement = searchDefaultInput(page);

    await expect(searchDefaultInputElement).toHaveAttribute(
      "value",
      testDataStandard,
    );
  });

  test("should render Search with value prop", async ({ mount, page }) => {
    await mount(<SearchComponent value={testDataStandard} />);

    const searchDefaultInputElement = searchDefaultInput(page);

    await expect(searchDefaultInputElement).toHaveAttribute(
      "value",
      testDataStandard,
    );
  });

  test("should render Search with id prop", async ({ mount, page }) => {
    await mount(<SearchComponent id={testDataStandard} />);

    const searchDefaultElement = searchDefault(page);

    await expect(searchDefaultElement).toHaveAttribute("id", testDataStandard);
  });

  test("should render Search with name prop", async ({ mount, page }) => {
    await mount(<SearchComponent name={testDataStandard} />);

    const searchDefaultElement = searchDefault(page);

    await expect(searchDefaultElement).toHaveAttribute(
      "name",
      testDataStandard,
    );
  });

  test("should render Search with aria-label prop", async ({ mount, page }) => {
    await mount(<SearchComponent aria-label={testDataStandard} />);

    const searchDefaultInputElement = searchDefaultInput(page);

    await expect(searchDefaultInputElement).toHaveAttribute(
      "aria-label",
      testDataStandard,
    );
  });

  test("should render Search button with aria-label prop", async ({
    mount,
    page,
  }) => {
    await mount(
      <SearchComponent searchButton searchButtonAriaLabel={testDataStandard} />,
    );
    const searchDefaultInputElement = searchDefaultInput(page);
    await searchDefaultInputElement.clear();
    await searchDefaultInputElement.fill(testDataStandard);
    const searchButtonElement = searchButton(page);

    await expect(searchButtonElement).toHaveAttribute(
      "aria-label",
      testDataStandard,
    );
  });

  ([[true], [false]] as const).forEach(([searchButtonBool]) => {
    test(`should render Search with searchButton prop set to ${searchButtonBool}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Search
          searchButton={searchButtonBool}
          defaultValue={testDataStandard}
        />,
      );

      const searchFindIconElement = searchIcon(page);

      if (searchButtonBool) {
        await expect(searchFindIconElement).toBeInViewport();
      } else {
        await expect(searchFindIconElement).not.toBeInViewport();
      }
    });
  });

  test("should render Search with button text overridden when searchButton is passed a string value", async ({
    mount,
    page,
  }) => {
    await mount(<Search searchButton="foo" defaultValue={testDataStandard} />);

    await expect(page.getByText("foo")).toBeVisible();
  });

  (
    [
      ["34%", 464],
      ["70%", 956],
    ] as const
  ).forEach(([widthInPercentage, widthVal]) => {
    test(`should render Search with searchWidth prop set to ${widthInPercentage} percentage`, async ({
      mount,
      page,
    }) => {
      await mount(<SearchComponent searchWidth={widthInPercentage} />);

      const searchDefaultElement = searchDefault(page);

      await assertCssValueIsApproximately(
        searchDefaultElement,
        "width",
        widthVal,
      );
    });
  });

  (["475px", "250px"] as const).forEach((widthInPx) => {
    test(`should render Search with searchWidth prop set to ${widthInPx}`, async ({
      mount,
      page,
    }) => {
      await mount(<SearchComponent searchWidth={widthInPx} />);

      const searchDefaultElement = searchDefault(page);

      await expect(searchDefaultElement).toHaveCSS("width", widthInPx);
    });
  });

  (
    [
      ["10%", 135],
      ["34%", 464],
      ["70%", 956],
      ["100%", 1366],
    ] as const
  ).forEach(([widthInPercentage, widthVal]) => {
    test(`should render Search with maxWidth prop set to ${widthInPercentage}`, async ({
      mount,
      page,
    }) => {
      await mount(<SearchComponent maxWidth={widthInPercentage} />);

      const searchDefaultElement = searchDefault(page);

      await assertCssValueIsApproximately(
        searchDefaultElement,
        "width",
        widthVal,
      );
    });
  });

  test("when maxWidth has no value it should render as 100%", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponent maxWidth="" />);

    const searchElement = searchDefault(page);

    await expect(searchElement).toHaveCSS("max-width", "100%");
  });
});

(
  [
    ["default", "rgb(102, 132, 148)"],
    ["dark", "rgba(255, 255, 255, 0.8)"],
  ] as [SearchProps["variant"], string][]
).forEach(([variant, backgroundColor]) => {
  test(`should render Search with variant prop set to ${variant}`, async ({
    mount,
    page,
  }) => {
    await mount(
      <Box width="700px" height="108px">
        <div
          style={{
            padding: "32px",
            backgroundColor: "#003349",
          }}
        >
          <SearchComponent variant={variant} />
        </div>
      </Box>,
    );

    const searchDefaultElement = searchDefault(page);

    await expect(searchDefaultElement).toHaveCSS(
      "border-bottom-color",
      backgroundColor,
    );
  });
});

(
  [
    ["default", "rgb(51, 91, 112)"],
    ["dark", "rgb(255, 255, 255)"],
  ] as [SearchProps["variant"], string][]
).forEach(([variant, hoverColor]) => {
  test(`should render Search with variant prop set to ${variant} on hover`, async ({
    mount,
    page,
  }) => {
    await mount(
      <Box width="700px" height="108px">
        <div
          style={{
            padding: "32px",
            backgroundColor: "#003349",
          }}
        >
          <SearchComponent variant={variant} />
        </div>
      </Box>,
    );

    const searchDefaultInnerIconElement = searchDefaultInnerIcon(page);
    await searchDefaultInnerIconElement.hover();
    const searchDefaultElement = searchDefault(page);

    await expect(searchDefaultElement).toHaveCSS(
      "border-bottom-color",
      hoverColor,
    );
  });
});

test("should render Search with tabIndex prop", async ({ mount, page }) => {
  await mount(<SearchComponent tabIndex={-5} />);

  const searchDefaultInputElement = searchDefaultInput(page);

  await expect(searchDefaultInputElement).toHaveAttribute("tabIndex", "-5");
});

validationTypes.forEach(([type, colour]) => {
  test(`should render Search and set type to ${type} as string`, async ({
    mount,
    page,
  }) => {
    await mount(
      <SearchComponent
        {...{
          [type]: "Message",
        }}
      />,
    );

    const searchDefaultInputElementParent =
      searchDefaultInput(page).locator("..");

    await expect(searchDefaultInputElementParent).toHaveCSS(
      "border-color",
      colour,
    );

    const getDataElementByValueElementType = getDataElementByValue(page, type);
    await expect(getDataElementByValueElementType).toBeVisible();
  });
});

validationTypes.forEach((type) => {
  test(`should render Search and set type to ${type} as boolean`, async ({
    mount,
    page,
  }) => {
    await mount(
      <SearchComponent
        {...{
          [type[0]]: true,
        }}
      />,
    );
    const searchDefaultInputElementParent =
      searchDefaultInput(page).locator("..");

    await expect(searchDefaultInputElementParent).toHaveCSS(
      "border-color",
      type[1],
    );
  });
});

test("should have the expected border radius styling when no search button enabled", async ({
  mount,
  page,
}) => {
  await mount(<SearchComponent />);

  const searchDefaultInputElement = searchDefaultInput(page);
  await expect(searchDefaultInputElement).toHaveCSS("border-radius", "4px");

  const searchDefaultInputElementParent =
    searchDefaultInput(page).locator("..");
  await expect(searchDefaultInputElementParent).toHaveCSS(
    "border-radius",
    "4px",
  );
});

test("should have the expected border radius styling when search button enabled", async ({
  mount,
  page,
}) => {
  await mount(<SearchComponent searchButton value="foo" />);

  const searchDefaultInputElementParent =
    searchDefaultInput(page).locator("..");

  await expect(searchDefaultInputElementParent).toHaveCSS(
    "border-radius",
    "4px 0px 0px 4px",
  );
});

(
  ["top", "bottom", "left", "right"] as SearchProps["tooltipPosition"][]
).forEach((tooltipPositionValue) => {
  test(`should render Search with the tooltip in the ${tooltipPositionValue} position`, async ({
    mount,
    page,
  }) => {
    await mount(
      <SearchComponent
        m="250px"
        error={testDataStandard}
        tooltipPosition={tooltipPositionValue}
      />,
    );

    const getDataElementByValueElementError = getDataElementByValue(
      page,
      "error",
    );
    await getDataElementByValueElementError.hover();
    const tooltipPreviewElement = tooltipPreview(page);

    await expect(tooltipPreviewElement).toHaveText(testDataStandard);
    await expect(tooltipPreviewElement).toHaveAttribute(
      "data-placement",
      String(tooltipPositionValue),
    );
  });
});

test.describe("Functionality tests for Search component", () => {
  test("should verify proper color for Search icon button", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponent searchButton />);

    const searchDefaultInputElement = searchDefaultInput(page);
    await searchDefaultInputElement.clear();
    await searchDefaultInputElement.fill(testDataStandard);
    const searchButtonElement = searchButton(page);
    await searchButtonElement.click({
      force: true,
    });
    const mintColor = "rgb(0, 103, 56)";
    const searchIconElement = searchIcon(page);

    await expect(searchIconElement).toHaveCSS("background-color", mintColor);
  });

  test("should clear a Search input after click on cross icon", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponent />);

    const searchDefaultInputElement = searchDefaultInput(page);
    await searchDefaultInputElement.clear();
    await searchDefaultInputElement.fill(testDataStandard);
    const searchCrossIconElement = searchCrossIcon(page);
    await searchCrossIconElement.click({
      force: true,
    });

    await expect(searchDefaultInputElement).toHaveValue("");
    await expect(searchDefaultInputElement).toBeFocused();
  });

  test("should clear a Search input after enter key pressed and cross icon is focused", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponent />);

    const searchDefaultInputElement = searchDefaultInput(page);
    await searchDefaultInputElement.clear();
    await searchDefaultInputElement.fill(testDataStandard);
    const searchCrossIconElementParent = searchCrossIcon(page).locator("..");
    await searchCrossIconElementParent.focus();
    await searchCrossIconElementParent.press("Enter");

    await expect(searchDefaultInputElement).toHaveValue("");
    await expect(searchDefaultInputElement).toBeFocused();
  });
});

test.describe("Event tests for Search component", () => {
  test("should call onClick callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <Search
        onClick={() => {
          callbackCount += 1;
        }}
        defaultValue={testDataStandard}
        searchButton
      />,
    );

    const searchButtonElement = searchButton(page);
    await searchButtonElement.click();

    expect(callbackCount).toEqual(1);
  });

  test("should call onChange callback when a type event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <SearchComponent
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    const searchDefaultInputElement = searchDefaultInput(page);
    await searchDefaultInputElement.fill("1");

    expect(callbackCount).toEqual(1);
  });

  test("should call onFocus callback when a focus event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <SearchComponent
        onFocus={() => {
          callbackCount += 1;
        }}
      />,
    );

    const searchDefaultInputElement = searchDefaultInput(page);
    await searchDefaultInputElement.focus();

    expect(callbackCount).toEqual(1);
  });

  test("should call onBlur callback when a blur event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <SearchComponent
        onBlur={() => {
          callbackCount += 1;
        }}
      />,
    );

    const searchDefaultInputElement = searchDefaultInput(page);
    await searchDefaultInputElement.focus();
    await searchDefaultInputElement.blur();

    expect(callbackCount).toEqual(1);
  });

  ([keysToTrigger[0], keysToTrigger[1]] as const).forEach((key) => {
    test(`should call onKeyDown callback when a keyboard event is triggered using ${key}`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <SearchComponent
          onKeyDown={() => {
            callbackCount += 1;
          }}
        />,
      );

      const searchDefaultInputElement = searchDefaultInput(page);
      await searchDefaultInputElement.press(key);

      expect(callbackCount).toEqual(1);
    });
  });
});

test.describe("Accessibility tests for Search", () => {
  testData.forEach((placeholder) => {
    test(`should check accessibility with placeholder using ${placeholder} as special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<SearchComponent placeholder={placeholder} />);

      await checkAccessibility(page);
    });
  });

  test("should check accessibility with defaultValue prop", async ({
    mount,
    page,
  }) => {
    await mount(<Search defaultValue={testDataStandard} />);

    await checkAccessibility(page);
  });

  test("should check accessibility with value prop", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponent value={testDataStandard} />);

    await checkAccessibility(page);
  });

  test("should check accessibility with id prop", async ({ mount, page }) => {
    await mount(<SearchComponent id={testDataStandard} />);

    await checkAccessibility(page);
  });

  test("should check accessibility with name prop", async ({ mount, page }) => {
    await mount(<SearchComponent name={testDataStandard} />);

    await checkAccessibility(page);
  });

  test("should check accessibility with aria-label prop", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponent aria-label={testDataStandard} />);

    await checkAccessibility(page);
  });

  test("should check accessibility for searchButton", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponent searchButton />);

    await checkAccessibility(page);
  });

  validationTypes.forEach((type) => {
    test(`should check accessibility and set type to ${type} as boolean`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SearchComponent
          {...{
            [type[0]]: true,
          }}
        />,
      );

      await checkAccessibility(page);
    });
  });

  test("should check accessibility for searchButton with searchButtonAriaLabel", async ({
    mount,
    page,
  }) => {
    await mount(
      <SearchComponent searchButton searchButtonAriaLabel={testDataStandard} />,
    );

    await checkAccessibility(page);
  });

  (["34%", "70%"] as const).forEach((widthInPercentage) => {
    test(`should check accessibility with searchWidth prop set to ${widthInPercentage} percentage`, async ({
      mount,
      page,
    }) => {
      await mount(<SearchComponent searchWidth={widthInPercentage} />);

      await checkAccessibility(page);
    });
  });

  (["475px", "250px"] as const).forEach((width) => {
    test(`should check accessibility with searchWidth prop set to ${width}`, async ({
      mount,
      page,
    }) => {
      await mount(<SearchComponent searchWidth={width} />);

      await checkAccessibility(page);
    });
  });

  (["10%", "34%", "70%", "100%"] as const).forEach((widthInPercentage) => {
    test(`should check accessibility with maxWidth prop set to ${widthInPercentage}`, async ({
      mount,
      page,
    }) => {
      await mount(<SearchComponent maxWidth={widthInPercentage} />);

      await checkAccessibility(page);
    });
  });

  test("should check accessibility with tabIndex prop", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponent tabIndex={-5} />);

    await checkAccessibility(page);
  });

  validationTypes.forEach((type) => {
    test(`should check accessibility and set type to ${type} as string`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SearchComponent
          {...{
            [type[0]]: "Message",
          }}
        />,
      );

      await checkAccessibility(page);
    });
  });

  (
    ["top", "bottom", "left", "right"] as SearchProps["tooltipPosition"][]
  ).forEach((tooltipPositionValue) => {
    test(`should check accessibility with the tooltip in the ${tooltipPositionValue} position`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SearchComponent
          m="250px"
          error={testDataStandard}
          tooltipPosition={tooltipPositionValue}
        />,
      );

      const searchErrorIcon = getDataElementByValue(page, "error");
      await searchErrorIcon.hover();
      const tooltipPreviewElement = tooltipPreview(page);

      await checkAccessibility(page, tooltipPreviewElement);
    });
  });

  // FE-4670
  test.skip("should render Search component", () => {
    (["default", "dark"] as SearchProps["variant"][]).forEach((variant) => {
      test(`should check accessibility with variant prop set to ${variant}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <Box width="700px" height="108px" bg="#003349">
            <SearchComponent variant={variant} />
          </Box>,
        );

        await checkAccessibility(page);
      });
    });
  });
});
