import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { PagerProps } from "./pager.component";
import { checkAccessibility } from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../playwright/support/constants";
import {
  PagerComponent,
  PagerComponentResponsive,
  PagerInForm,
  PagerComponentRecords,
} from "./components.test-pw";
import {
  pageSelect,
  maxPages,
  previousArrow,
  nextArrow,
  firstArrow,
  lastArrow,
  currentPageWrapper,
  currentPageLabelWrapper,
  currentPageInput,
  pagerSummary,
  pageSelectElement,
  showLabelBefore,
  pageSizeLabelAfter,
  currentPageSection,
  pager,
  selectListWrapper,
  inputIconToggle,
} from "../../../playwright/components/pager/index";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const recordsDiff = [
  [
    {
      id: "12",
      name: 12,
    },
    "12",
  ],
  [
    {
      id: "135",
      name: 135,
    },
    "135",
  ],
  [
    {
      id: "819",
      name: 819,
    },
    "819",
  ],
] as const;

const keysToTrigger = ["Enter", "Space"] as const;

test.describe("Styling tests", () => {
  test(`should have the expected focus styling`, async ({ mount, page }) => {
    await mount(<PagerComponent />);

    await page.keyboard.press("Tab");
    const inputParent = currentPageInput(page).locator("..");

    await expect(inputParent).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(inputParent).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );
  });

  test(`when used inside a Form, the current page input box should have no bottom margin`, async ({
    mount,
    page,
  }) => {
    await mount(<PagerInForm />);

    await expect(currentPageWrapper(page)).toHaveCSS("margin-bottom", "0px");
  });
});

test.describe("Prop tests", () => {
  [2, 5, 7].forEach((currentPage) => {
    test(`should render with currentPage prop set to ${currentPage}`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent currentPage={currentPage} />);

      await expect(currentPageInput(page)).toHaveAttribute(
        "value",
        `${currentPage}`,
      );
    });
  });

  [50, 100, 235].forEach((totalRecords) => {
    test(`should render with totalRecords prop set to ${totalRecords}`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent totalRecords={totalRecords} />);

      await expect(pagerSummary(page)).toHaveText(`${totalRecords} items`);
    });
  });

  [
    [1, 100],
    [10, 10],
    [25, 4],
    [100, 1],
  ].forEach(([pageSizeVal, pageSizeOf]) => {
    test(`should render with pageSize prop set to ${pageSizeVal}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PagerComponent pageSize={pageSizeVal} showPageSizeSelection />,
      );

      await expect(pageSelect(page)).toHaveAttribute("value", `${pageSizeVal}`);
      await expect(maxPages(page)).toHaveText(`of ${pageSizeOf}`);
    });
  });

  recordsDiff.forEach(([record, index]) => {
    test(`should render with pageSizeSelectionOptions prop set to ${index}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PagerComponentRecords
          pageSizeSelectionOptions={[record]}
          showPageSizeSelection
        />,
      );

      await inputIconToggle(page).click();

      await expect(
        selectListWrapper(page).locator("ul").locator("li"),
      ).toHaveAttribute("data-component", "option");
    });
  });

  [true, false].forEach((showSelection) => {
    test(`should render with showPageSizeSelection prop set to ${showSelection}`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent showPageSizeSelection={showSelection} />);

      if (showSelection) {
        await expect(pageSelectElement(page)).toBeVisible();
      } else {
        await expect(pageSelectElement(page)).toHaveCount(0);
      }
    });
  });

  [true, false].forEach((showBefore) => {
    test(`should render with showPageSizeLabelBefore prop set to ${showBefore}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PagerComponent
          showPageSizeLabelBefore={showBefore}
          showPageSizeSelection
        />,
      );

      if (showBefore) {
        await expect(showLabelBefore(page)).toBeVisible();
      } else {
        await expect(showLabelBefore(page)).toHaveCount(0);
      }
      await expect(pageSelectElement(page)).toBeVisible();
    });
  });

  [true, false].forEach((showAfter) => {
    test(`should render with showPageSizeLabelAfter prop set to ${showAfter}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PagerComponent
          showPageSizeLabelAfter={showAfter}
          showPageSizeSelection
        />,
      );

      if (showAfter) {
        await expect(pageSizeLabelAfter(page)).toBeVisible();
      } else {
        await expect(pageSizeLabelAfter(page)).toHaveCount(0);
      }
      await expect(pageSelectElement(page)).toBeVisible();
    });
  });

  [true, false].forEach((showTotal) => {
    test(`should render with showTotalRecords prop set to ${showTotal}`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent showTotalRecords={showTotal} />);

      if (showTotal) {
        await expect(pagerSummary(page)).toBeVisible();
      } else {
        await expect(pagerSummary(page)).toBeHidden();
      }
    });
  });

  [true, false].forEach((showButtons) => {
    test(`should render with showFirstAndLastButtons prop set to ${showButtons}`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent showFirstAndLastButtons={showButtons} />);

      if (showButtons) {
        await expect(firstArrow(page)).toHaveCount(1);
        await expect(lastArrow(page)).toHaveCount(1);
      } else {
        await expect(firstArrow(page)).toHaveCount(0);
        await expect(lastArrow(page)).toHaveCount(0);
      }
    });
  });

  [true, false].forEach((showButtons) => {
    test(`should render with showPreviousAndNextButtons prop set to ${showButtons}`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent showPreviousAndNextButtons={showButtons} />);

      if (showButtons) {
        await expect(previousArrow(page)).toHaveCount(1);
        await expect(nextArrow(page)).toHaveCount(1);
      } else {
        await expect(previousArrow(page)).toHaveCount(0);
        await expect(nextArrow(page)).toHaveCount(0);
      }
    });
  });

  [true, false].forEach((showCount) => {
    test(`should render with showPageCount prop set to ${showCount}`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent showPageCount={showCount} />);

      if (showCount) {
        await expect(currentPageSection(page).first()).toBeVisible();
      } else {
        await expect(currentPageSection(page)).toBeHidden();
      }
    });
  });

  (
    [
      ["default", "rgb(250, 251, 251)"],
      ["alternate", "rgb(237, 241, 242)"],
    ] as [PagerProps["variant"], string][]
  ).forEach(([variant, backgroundColor]) => {
    test(`should render with variant prop set to ${variant}`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent variant={variant} />);

      if (variant === "default") {
        await expect(pager(page)).toHaveCSS(
          "background-color",
          backgroundColor,
        );
        await expect(pager(page)).toHaveCSS(
          "border-color",
          "rgb(204, 214, 219)",
        );
      } else {
        await expect(pager(page)).toHaveCSS(
          "background-color",
          backgroundColor,
        );
        await expect(pager(page)).toHaveCSS(
          "border-color",
          "rgb(204, 214, 219)",
        );
      }
    });
  });

  [true, false].forEach((hideElements) => {
    test(`should render links as intended when hideDisabledElements is set to ${hideElements} and currentPage is 1`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PagerComponent currentPage={1} hideDisabledElements={hideElements} />,
      );

      if (hideElements) {
        await expect(firstArrow(page)).toBeHidden();
        await expect(previousArrow(page)).toBeHidden();
      } else {
        await expect(firstArrow(page)).toBeVisible();
        await expect(previousArrow(page)).toBeVisible();
      }
    });
  });

  [true, false].forEach((hideElements) => {
    test(`should render links as intended when hideDisabledElements is set to ${hideElements} and currentPage is 10`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PagerComponent currentPage={10} hideDisabledElements={hideElements} />,
      );

      if (hideElements) {
        await expect(nextArrow(page)).toBeHidden();
        await expect(lastArrow(page)).toBeHidden();
      } else {
        await expect(nextArrow(page)).toBeVisible();
        await expect(lastArrow(page)).toBeVisible();
      }
    });
  });

  test(`should render both pager link when hideDisabledElements is set to true, but currentPage is greater than 1`, async ({
    mount,
    page,
  }) => {
    await mount(<PagerComponent currentPage={7} hideDisabledElements />);

    await expect(firstArrow(page)).toBeVisible();
    await expect(previousArrow(page)).toBeVisible();
  });

  [false, true].forEach((pageNumber) => {
    test(`should render standard pager nav number input correctly when interactivePageNumber is ${pageNumber}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PagerComponent currentPage={1} interactivePageNumber={pageNumber} />,
      );

      if (pageNumber) {
        await expect(currentPageWrapper(page)).toBeVisible();
      } else {
        await expect(currentPageWrapper(page)).toHaveCount(0);
      }
    });
  });

  [true, false].forEach((pageNumber) => {
    test(`should render pager nav label is correctly when interactivePageNumber is ${pageNumber}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PagerComponent currentPage={1} interactivePageNumber={pageNumber} />,
      );

      if (pageNumber) {
        await expect(currentPageLabelWrapper(page)).toHaveCount(0);
      } else {
        await expect(currentPageLabelWrapper(page)).toBeVisible();
      }
    });
  });
});

test.describe("Functional tests", () => {
  [-1, -10, -100, ...testData].forEach((totalRecords) => {
    test(`should set totalRecords out of scope to ${totalRecords}`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent totalRecords={totalRecords} />);

      await expect(pagerSummary(page)).toHaveText(`${totalRecords} items`);
      await expect(maxPages(page)).toHaveText("of 1");
    });
  });

  test(`should disable nextArrow and lastArrow buttons after clicking on lastArrow button`, async ({
    mount,
    page,
  }) => {
    await mount(<PagerComponent currentPage={3} />);

    await lastArrow(page).click();

    await expect(nextArrow(page)).toHaveAttribute("disabled", /.*/);
    await expect(lastArrow(page)).toHaveAttribute("disabled", /.*/);
  });

  test(`should disable firstArrow and previousArrow buttons after clicking on firstArrow button`, async ({
    mount,
    page,
  }) => {
    await mount(<PagerComponent currentPage={3} />);

    await firstArrow(page).click();

    await expect(firstArrow(page)).toHaveAttribute("disabled", /.*/);
    await expect(previousArrow(page)).toHaveAttribute("disabled", /.*/);
  });

  test(`should disable firstArrow and previousArrow buttons after clicking on previousArrow button`, async ({
    mount,
    page,
  }) => {
    await mount(<PagerComponent currentPage={2} />);

    await previousArrow(page).click();

    await expect(firstArrow(page)).toHaveAttribute("disabled", /.*/);
    await expect(previousArrow(page)).toHaveAttribute("disabled", /.*/);
  });

  test(`should disable firstArrow and previousArrow buttons after clicking on nextArrow button`, async ({
    mount,
    page,
  }) => {
    await mount(<PagerComponent currentPage={9} />);

    await nextArrow(page).click();

    await expect(nextArrow(page)).toHaveAttribute("disabled", /.*/);
    await expect(lastArrow(page)).toHaveAttribute("disabled", /.*/);
  });

  [1001, 901, 701, 601, 450].forEach((viewportWidth) => {
    test(`should render with ${viewportWidth}px width`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({
        width: Number(viewportWidth),
        height: 768,
      });

      await mount(<PagerComponentResponsive />);

      if (viewportWidth === 1001) {
        await expect(showLabelBefore(page)).toBeInViewport();
        await expect(pagerSummary(page)).toBeInViewport();
        await expect(firstArrow(page)).toBeInViewport();
        await expect(lastArrow(page)).toBeInViewport();
      }
      if (viewportWidth === 901) {
        await expect(showLabelBefore(page)).toBeInViewport();
        await expect(pagerSummary(page)).toBeInViewport();
        await expect(firstArrow(page)).toHaveCount(0);
        await expect(lastArrow(page)).toHaveCount(0);
      }
      if (viewportWidth === 701) {
        await expect(showLabelBefore(page)).toHaveCount(0);
        await expect(pagerSummary(page)).not.toBeInViewport();
        await expect(firstArrow(page)).toHaveCount(0);
        await expect(lastArrow(page)).toHaveCount(0);
      }
      if (viewportWidth === 601) {
        await expect(showLabelBefore(page)).toHaveCount(0);
        await expect(pagerSummary(page)).not.toBeInViewport();
        await expect(firstArrow(page)).toHaveCount(0);
        await expect(lastArrow(page)).toHaveCount(0);
      }
      if (viewportWidth === 450) {
        await expect(showLabelBefore(page)).toHaveCount(0);
        await expect(pagerSummary(page).first()).not.toBeInViewport();
        await expect(firstArrow(page)).toHaveCount(0);
        await expect(lastArrow(page)).toHaveCount(0);
      }
      await expect(nextArrow(page)).toBeInViewport();
      await expect(previousArrow(page)).toBeInViewport();
      await expect(currentPageSection(page).first()).toBeInViewport();
    });
  });

  [1001, 901, 701, 601, 450].forEach((viewportWidth) => {
    test(`should be able to access the firstArrow button with showPageSizeSelection in focus with ${viewportWidth}px width`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({
        width: Number(viewportWidth),
        height: 768,
      });

      await mount(<PagerComponent showPageSizeSelection />);

      const currentPage = currentPageWrapper(page)
        .locator("div")
        .nth(0)
        .locator("div")
        .nth(0)
        .locator("div")
        .nth(0)
        .locator("input");

      await expect(currentPage).toHaveAttribute("value", "1");
      await nextArrow(page).click();
      await expect(currentPage).toHaveAttribute("value", "2");
      await pageSelect(page).focus();
      await firstArrow(page).click();
      await expect(currentPage).toHaveAttribute("value", "1");
    });
  });
});

test.describe("Events test", () => {
  test(`should call onPagination callback when a select event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <PagerComponent
        onPagination={() => {
          callbackCount += 1;
        }}
        showPageSizeSelection
        currentPage={5}
      />,
    );

    await pageSelectElement(page).click();
    const listWrapper = selectListWrapper(page)
      .locator("li")
      .filter({ hasText: "25" });
    await listWrapper.click();

    expect(callbackCount).toEqual(1);
  });

  test(`should call onNext callback when a click event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <PagerComponent
        onNext={() => {
          callbackCount += 1;
        }}
      />,
    );

    await nextArrow(page).click();

    expect(callbackCount).toEqual(1);
  });

  [...keysToTrigger].forEach((key) => {
    test(`should call onNext callback when a keyboard event is triggered by pressing ${key}`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <PagerComponent
          onNext={() => {
            callbackCount += 1;
          }}
        />,
      );

      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press(key);

      expect(callbackCount).toEqual(1);
    });
  });

  test(`should call onPrevious callback when a click event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <PagerComponent
        onPrevious={() => {
          callbackCount += 1;
        }}
        currentPage={5}
      />,
    );

    await previousArrow(page).click();

    expect(callbackCount).toEqual(1);
  });

  [...keysToTrigger].forEach((key) => {
    test(`should call onPrevious callback when a keyboard event is triggered by pressing ${key}`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <PagerComponent
          onPrevious={() => {
            callbackCount += 1;
          }}
          currentPage={5}
        />,
      );

      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press(key);

      expect(callbackCount).toEqual(1);
    });
  });

  test(`should call onFirst callback when a click event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <PagerComponent
        onFirst={() => {
          callbackCount += 1;
        }}
        currentPage={5}
      />,
    );

    await firstArrow(page).click();

    expect(callbackCount).toEqual(1);
  });

  [...keysToTrigger].forEach((key) => {
    test(`should call onFirst callback when a keyboard event is triggered by pressing ${key}`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <PagerComponent
          onFirst={() => {
            callbackCount += 1;
          }}
          currentPage={5}
        />,
      );

      await page.keyboard.press("Tab");
      await page.keyboard.press(key);

      expect(callbackCount).toEqual(1);
    });
  });

  test(`should call onLast callback when a click event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <PagerComponent
        onLast={() => {
          callbackCount += 1;
        }}
        currentPage={5}
      />,
    );

    await lastArrow(page).click();

    expect(callbackCount).toEqual(1);
  });

  [...keysToTrigger].forEach((key) => {
    test(`should call onLast callback when a keyboard event is triggered by pressing ${key}`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <PagerComponent
          onLast={() => {
            callbackCount += 1;
          }}
        />,
      );

      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press(key);

      expect(callbackCount).toEqual(1);
    });
  });
});

test.describe("Accessibility tests", () => {
  [2, 5, 7].forEach((currentPage) => {
    test(`should render with currentPage prop set to ${currentPage} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent currentPage={currentPage} />);

      await checkAccessibility(page);
    });
  });

  [50, 100, 235].forEach((totalRecords) => {
    test(`should render with totalRecords prop set to ${totalRecords} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent totalRecords={totalRecords} />);

      await checkAccessibility(page);
    });
  });

  [1, 10, 25, 100].forEach((pageSizeVal) => {
    test(`should render with pageSize prop set to ${pageSizeVal} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PagerComponent pageSize={pageSizeVal} showPageSizeSelection />,
      );

      await checkAccessibility(page);
    });
  });

  test(`should pass accessibility tests with pageSizeSelectionOptions prop`, async ({
    mount,
    page,
  }) => {
    await mount(
      <PagerComponentRecords
        pageSizeSelectionOptions={[{ id: "25", name: 25 }]}
      />,
    );

    await inputIconToggle(page).click();

    await checkAccessibility(page);
  });

  [true, false].forEach((showSelection) => {
    test(`should render with showPageSizeSelection prop set to ${showSelection} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent showPageSizeSelection={showSelection} />);

      await checkAccessibility(page);
    });
  });

  [true, false].forEach((showAfter) => {
    test(`should render with showPageSizeLabelAfter prop set to ${showAfter} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PagerComponent
          showPageSizeLabelAfter={showAfter}
          showPageSizeSelection
        />,
      );

      await checkAccessibility(page);
    });
  });

  [true, false].forEach((showRecords) => {
    test(`should render with showTotalRecords prop set to ${showRecords} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent showTotalRecords={showRecords} />);

      await checkAccessibility(page);
    });
  });

  [true, false].forEach((showButtons) => {
    test(`should render with showFirstAndLastButtons prop set to ${showButtons} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent showFirstAndLastButtons={showButtons} />);

      await checkAccessibility(page);
    });
  });

  [true, false].forEach((showButtons) => {
    test(`should render with showPreviousAndNextButtons prop set to ${showButtons} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent showPreviousAndNextButtons={showButtons} />);

      await checkAccessibility(page);
    });
  });

  [true, false].forEach((showCount) => {
    test(`should render with showPageCount prop set to ${showCount} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent showPageCount={showCount} />);

      await checkAccessibility(page);
    });
  });

  (["default", "alternate"] as PagerProps["variant"][]).forEach((variant) => {
    test(`should render with variant prop set to ${variant} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent variant={variant} />);

      await checkAccessibility(page);
    });
  });

  [true, false].forEach((showElements) => {
    test(`should pass accessibility tests when hideDisabledElements is set to ${showElements} and currentPage is 1`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PagerComponent currentPage={1} hideDisabledElements={showElements} />,
      );

      await checkAccessibility(page);
    });
  });

  [true, false].forEach((showElements) => {
    test(`should pass accessibility tests when hideDisabledElements is set to ${showElements} and currentPage is 10`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PagerComponent currentPage={10} hideDisabledElements={showElements} />,
      );

      await checkAccessibility(page);
    });
  });

  test(`should pass accessibility tests when hideDisabledElements is set to true, but currenPage is greater than 1`, async ({
    mount,
    page,
  }) => {
    await mount(<PagerComponent currentPage={7} hideDisabledElements />);

    await checkAccessibility(page);
  });

  [-1, -10, -100, ...testData].forEach((totalRecords) => {
    test(`should set totalRecords out of scope to ${totalRecords} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent totalRecords={totalRecords} />);

      await checkAccessibility(page);
    });
  });

  test(`should pass accessibility tests with nextArrow and lastArrow buttons disabled`, async ({
    mount,
    page,
  }) => {
    await mount(<PagerComponent currentPage={3} />);

    await lastArrow(page).click();

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests with firstArrow and previousArrow buttons disabled`, async ({
    mount,
    page,
  }) => {
    await mount(<PagerComponent currentPage={3} />);

    await firstArrow(page).click();

    await checkAccessibility(page);
  });

  [1001, 901, 701, 601, 45].forEach((viewportWidth) => {
    test(`should pass accessibility tests with ${viewportWidth}px width`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({ width: viewportWidth, height: 768 });
      await mount(<PagerComponentResponsive />);

      await checkAccessibility(page);
    });
  });

  [true, false].forEach((showBefore) => {
    test(`should pass accessibility tests with showPageSizeLabelBefore prop set to ${showBefore}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PagerComponent
          showPageSizeLabelBefore={showBefore}
          showPageSizeSelection
        />,
      );

      await checkAccessibility(page);
    });
  });

  [false, true].forEach((pageNumber) => {
    test(`should pass accessibility tests with interactivePageNumber prop set to ${pageNumber}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PagerComponent currentPage={1} interactivePageNumber={pageNumber} />,
      );

      await checkAccessibility(page);
    });
  });
});
