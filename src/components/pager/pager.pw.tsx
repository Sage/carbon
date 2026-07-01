import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { PagerProps } from ".";
import { checkAccessibility } from "../../../playwright/support/helper";
import { PagerComponent } from "./components.test-pw";

test("should focus the 'previous' button when 'last' button is pressed and then hidden", async ({
  mount,
  page,
}) => {
  await mount(<PagerComponent />);

  const lastButton = page.getByRole("button", { name: "Go to last page" });
  const previousButton = page.getByRole("button", {
    name: "Go to previous page",
  });

  await lastButton.click();

  await expect(previousButton).toBeFocused();
});

test("should focus the 'previous' button when 'next' is pressed on the penultimate page and then hidden", async ({
  mount,
  page,
}) => {
  await mount(<PagerComponent currentPage={9} />);

  const nextButton = page.getByRole("button", { name: "Go to next page" });
  const previousButton = page.getByRole("button", {
    name: "Go to previous page",
  });

  await nextButton.click();

  await expect(previousButton).toBeFocused();
});

test("should focus the 'next' button when 'previous' is pressed on the second page and then hidden", async ({
  mount,
  page,
}) => {
  await mount(<PagerComponent currentPage={2} />);

  const nextButton = page.getByRole("button", { name: "Go to next page" });
  const previousButton = page.getByRole("button", {
    name: "Go to previous page",
  });

  await previousButton.click();

  await expect(nextButton).toBeFocused();
});

test("should focus the 'next' button when 'first' is pressed and then hidden", async ({
  mount,
  page,
}) => {
  await mount(<PagerComponent currentPage={2} />);

  const nextButton = page.getByRole("button", { name: "Go to next page" });
  const firstButton = page.getByRole("button", { name: "Go to first page" });

  await firstButton.click();

  await expect(nextButton).toBeFocused();
});

test.describe("Accessibility tests", () => {
  [true, false].forEach((showSelection) => {
    test(`should render with showPageSizeSelection prop set to ${showSelection} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent showPageSizeSelection={showSelection} />);

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

  (["default", "alternate"] as PagerProps["variant"][]).forEach((variant) => {
    test(`should render with variant prop set to ${variant} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<PagerComponent variant={variant} />);

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
