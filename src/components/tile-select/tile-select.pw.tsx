import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  getElement,
  getDataElementByValue,
} from "../../../playwright/components";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  TileSelectComponent,
  MultiTileSelectGroupComponent,
  AccordionTileSelectComponent,
  SingleTile,
  WithAFooter,
  WithAccordionFooter,
  WithActionButtonAdornment,
  WithCustomActionButton,
  TileSelectGroupComponent,
} from "./components.test-pw";
import {
  inputElement,
  tileGroupDescription,
} from "../../../playwright/components/tileSelect";
import { CHARACTERS } from "../../../playwright/support/constants";
import { TileSelect } from ".";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("check props for TileSelect component", () => {
  test("p element should be rendered when a description is passed", async ({
    mount,
    page,
  }) => {
    await mount(<MultiTileSelectGroupComponent description="foo" />);

    const tileSelectGroupDescription = getDataElementByValue(
      page,
      "tile-select-group-description",
    );

    await expect(tileSelectGroupDescription).toBeVisible();
  });

  test("p element should not be rendered when no description is passed", async ({
    mount,
    page,
  }) => {
    await mount(<MultiTileSelectGroupComponent />);

    const tileSelectGroupDescription = getDataElementByValue(
      page,
      "tile-select-group-description",
    );

    await expect(tileSelectGroupDescription).toHaveCount(0);
  });

  ["1", "2", "3", "4"].forEach((value) => {
    test(`should check when value prop is set as ${value}`, async ({
      mount,
      page,
    }) => {
      await mount(<TileSelectComponent value={value} />);

      await expect(inputElement(page)).toHaveAttribute("value", value);
    });
  });

  test("should check when tile is selected", async ({ mount, page }) => {
    await mount(<TileSelect checked />);

    await expect(inputElement(page)).toBeChecked();
  });

  test("should check when tile is not selected", async ({ mount, page }) => {
    await mount(<TileSelectComponent checked={false} />);

    await expect(inputElement(page)).not.toBeChecked();
  });

  test("should check when accordionExpanded set as false", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionTileSelectComponent accordionExpanded={false} />);

    const tileSelectAccordionChildren = getElement(
      page,
      "tile-select-accordion-content",
    ).locator("..");

    await expect(tileSelectAccordionChildren).toBeHidden();
  });

  test("should check when accordionExpanded set as true", async ({
    mount,
    page,
  }) => {
    await mount(<AccordionTileSelectComponent accordionExpanded />);

    const tileSelectAccordionChildren = getElement(
      page,
      "tile-select-accordion-content",
    ).locator("..");

    await expect(tileSelectAccordionChildren).toBeVisible();
  });
});

test.describe("check props for TileSelectGroup component", () => {
  testData.forEach((name) => {
    test(`should check name prop is set as ${name}`, async ({
      mount,
      page,
    }) => {
      await mount(<TileSelectGroupComponent name={name} />);

      const name1ElementInput = getElement(page, "input").first();

      await expect(name1ElementInput).toHaveAttribute("name", name);
    });
  });

  testData.forEach((legend) => {
    test(`should check legend prop is set as ${legend}`, async ({
      mount,
      page,
    }) => {
      await mount(<TileSelectGroupComponent legend={legend} />);

      const legendElementInput = getElement(page, "legend");
      await legendElementInput.isVisible();

      await expect(legendElementInput).toHaveText(legend);
    });
  });

  testData.forEach((description) => {
    test(`should check description prop is set as ${description}`, async ({
      mount,
      page,
    }) => {
      await mount(<TileSelectGroupComponent description={description} />);

      await expect(tileGroupDescription(page)).toHaveText(description);
    });
  });

  test("should check value prop", async ({ mount, page }) => {
    await mount(<TileSelectGroupComponent value="1" />);

    const value1ElementInput = getElement(page, "input").first();

    await expect(value1ElementInput).toHaveAttribute("value", "1");
  });
});

test.describe("Accessibility tests for Tile Select", () => {
  // We have two options here. We can either omit the colour contrast check as the mock component
  // used in the test has a disabled tile select, which is causing this failure.
  // Or we can remove the disabled tile select from the mock component.
  test("should pass accessibility tests for MultiSelect example", async ({
    mount,
    page,
  }) => {
    await mount(<MultiTileSelectGroupComponent />);

    await checkAccessibility(page, undefined, "color-contrast");
  });

  test("should pass accessibility tests for SingleTile example", async ({
    mount,
    page,
  }) => {
    await mount(<SingleTile />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for WithAFooter example", async ({
    mount,
    page,
  }) => {
    await mount(<WithAFooter />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for WithAccordionFooter example", async ({
    mount,
    page,
  }) => {
    await mount(<WithAccordionFooter />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for WithActionButtonAdornment example", async ({
    mount,
    page,
  }) => {
    await mount(<WithActionButtonAdornment />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for WithCustomActionButton example", async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomActionButton />);

    await checkAccessibility(page);
  });
});
