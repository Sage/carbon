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
  pagerSummary,
  pageSelectElement,
  showLabelBefore,
  currentPageSection,
  selectListWrapper,
  inputIconToggle,
} from "../../../playwright/components/pager/index";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const keysToTrigger = ["Enter", "Space"] as const;

test.describe("Styling tests", () => {
  test(`when used inside a Form, the current page input box should have no bottom margin`, async ({
    mount,
    page,
  }) => {
    await mount(<PagerInForm />);

    await expect(currentPageWrapper(page)).toHaveCSS("margin-bottom", "0px");
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

  test("should render responsive pager at 1001px width with all elements visible", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1001, height: 768 });
    await mount(<PagerComponentResponsive />);

    await expect(showLabelBefore(page)).toBeInViewport();
    await expect(pagerSummary(page)).toBeInViewport();
    await expect(firstArrow(page)).toBeInViewport();
    await expect(lastArrow(page)).toBeInViewport();
    await expect(nextArrow(page)).toBeInViewport();
    await expect(previousArrow(page)).toBeInViewport();
    await expect(currentPageSection(page).first()).toBeInViewport();
  });

  test("should render responsive pager at 901px width without first and last arrows", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 901, height: 768 });
    await mount(<PagerComponentResponsive />);

    await expect(showLabelBefore(page)).toBeInViewport();
    await expect(pagerSummary(page)).toBeInViewport();
    await expect(firstArrow(page)).toHaveCount(0);
    await expect(lastArrow(page)).toHaveCount(0);
    await expect(nextArrow(page)).toBeInViewport();
    await expect(previousArrow(page)).toBeInViewport();
    await expect(currentPageSection(page).first()).toBeInViewport();
  });

  test("should render responsive pager at 701px width without label before, summary, first and last arrows", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 701, height: 768 });
    await mount(<PagerComponentResponsive />);

    await expect(showLabelBefore(page)).toHaveCount(0);
    await expect(pagerSummary(page)).not.toBeInViewport();
    await expect(firstArrow(page)).toHaveCount(0);
    await expect(lastArrow(page)).toHaveCount(0);
    await expect(nextArrow(page)).toBeInViewport();
    await expect(previousArrow(page)).toBeInViewport();
    await expect(currentPageSection(page).first()).toBeInViewport();
  });

  test("should render responsive pager at 601px width without label before, summary, first and last arrows", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 601, height: 768 });
    await mount(<PagerComponentResponsive />);

    await expect(showLabelBefore(page)).toHaveCount(0);
    await expect(pagerSummary(page)).not.toBeInViewport();
    await expect(firstArrow(page)).toHaveCount(0);
    await expect(lastArrow(page)).toHaveCount(0);
    await expect(nextArrow(page)).toBeInViewport();
    await expect(previousArrow(page)).toBeInViewport();
    await expect(currentPageSection(page).first()).toBeInViewport();
  });

  test("should render responsive pager at 450px width without label before, summary, first and last arrows", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 450, height: 768 });
    await mount(<PagerComponentResponsive />);

    await expect(showLabelBefore(page)).toHaveCount(0);
    await expect(pagerSummary(page).first()).not.toBeInViewport();
    await expect(firstArrow(page)).toHaveCount(0);
    await expect(lastArrow(page)).toHaveCount(0);
    await expect(nextArrow(page)).toBeInViewport();
    await expect(previousArrow(page)).toBeInViewport();
    await expect(currentPageSection(page).first()).toBeInViewport();
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
