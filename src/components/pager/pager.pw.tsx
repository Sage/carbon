import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { PagerProps } from "./pager.component";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  PagerComponent,
  PagerComponentResponsive,
  PagerInForm,
  PagerComponentRecords,
} from "./components.test-pw";
import {
  pageSelect,
  previousArrow,
  nextArrow,
  firstArrow,
  lastArrow,
  currentPageWrapper,
  pagerSummary,
  showLabelBefore,
  currentPageSection,
  inputIconToggle,
} from "../../../playwright/components/pager/index";

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

test.describe("Accessibility tests", () => {
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
