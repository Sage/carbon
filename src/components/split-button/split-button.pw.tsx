import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  SplitButtonList,
  SplitButtonNestedInDialog,
  TwoSplitButtons,
} from "./components.test-pw";
import { Accordion } from "../accordion";
import SplitButton, { SplitButtonProps } from ".";
import Button from "../button";
import Box from "../box";
import { checkAccessibility } from "../../../playwright/support/helper";
import { splitToggleButton } from "../../../playwright/components/split-button";
import { CHARACTERS } from "../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("Functional tests", () => {
  test(`closes the list and focuses the next element on the page, when Tab key is pressed on last child button`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoSplitButtons />);

    const dropdownButton = page
      .getByRole("button", { name: "Show more" })
      .first();
    await dropdownButton.click();

    const buttonList = page.getByRole("list");
    await buttonList.waitFor();

    const lastButton = page.getByRole("button", { name: "Button 3" });
    await lastButton.press("Tab");

    await expect(
      page.getByRole("button", { name: "Split Button 2" }),
    ).toBeFocused();
    await expect(buttonList).toBeHidden();
  });
});

test.describe("when SplitButton is nested inside of a Dialog component", () => {
  test(`does not close dialog when Escape key is pressed while child buttons are visible`, async ({
    mount,
    page,
  }) => {
    await mount(<SplitButtonNestedInDialog />);

    const dialog = page.getByRole("dialog");
    await dialog.waitFor();

    const toggleButton = page.getByRole("button", { name: "Show more" });
    await toggleButton.click();

    const buttonList = page.getByRole("list");
    await buttonList.waitFor();

    await page.keyboard.press("Escape");

    await buttonList.waitFor({ state: "hidden" });
    await expect(dialog).toBeVisible();
  });
});

test.describe("Accessibility tests", () => {
  test(`should pass accessibility tests for default example`, async ({
    mount,
    page,
  }) => {
    await mount(<SplitButtonList />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests when open`, async ({ mount, page }) => {
    await mount(<SplitButtonList />);

    await splitToggleButton(page).nth(0).press("ArrowDown");
    await checkAccessibility(
      page,
      page.getByRole("button", { name: "Button 1" }),
    );
  });

  test(`should pass accessibility tests when disabled`, async ({
    mount,
    page,
  }) => {
    await mount(<SplitButtonList disabled />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for primary button`, async ({
    mount,
    page,
  }) => {
    await mount(<SplitButtonList buttonType="primary" />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for primary button type when open`, async ({
    mount,
    page,
  }) => {
    await mount(<SplitButtonList buttonType="primary" />);

    await splitToggleButton(page).nth(0).click();
    await checkAccessibility(page);
  });

  (["small", "large"] as SplitButtonProps["size"][]).forEach((size) => {
    test(`should pass accessibility tests with Sizes prop set to ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<SplitButtonList size={size} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((subtext) => {
    test(`should pass accessibility tests with Subtext prop set to ${subtext}`, async ({
      mount,
      page,
    }) => {
      await mount(<SplitButtonList size="large" subtext={subtext} />);

      await checkAccessibility(page);
    });
  });

  (["after", "before"] as SplitButtonProps["iconPosition"][]).forEach(
    (iconPosition) => {
      test(`should pass accessibility tests with iconPosition prop set to ${iconPosition}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <SplitButtonList iconType="add" iconPosition={iconPosition}>
            IconPosition
          </SplitButtonList>,
        );

        await checkAccessibility(page);
      });
    },
  );

  test(`should pass accessibility tests for component in hidden container`, async ({
    mount,
    page,
  }) => {
    await mount(
      <Accordion title="Heading">
        <Box p={4}>
          <SplitButton size="large" subtext="subtext" text="Split button">
            <Button size="large">Button 1</Button>
            <Button size="large">Button 2</Button>
            <Button size="large">Button 3</Button>
          </SplitButton>
        </Box>
      </Accordion>,
    );

    await page.getByRole("button", { name: "Heading" }).click();
    await splitToggleButton(page).nth(0).click();

    await checkAccessibility(page);
  });
});
