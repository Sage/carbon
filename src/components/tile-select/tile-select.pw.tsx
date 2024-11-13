import { expect, test } from "@playwright/experimental-ct-react";
import React from "react";
import { TileSelect } from ".";
import {
  getComponent,
  getElement,
  getDataElementByValue,
} from "../../../playwright/components";
import {
  checkAccessibility,
  containsClass,
} from "../../../playwright/support/helper";
import { HooksConfig } from "../../../playwright";
import {
  TileSelectComponent,
  MultiTileSelectGroupComponent,
  AccordionTileSelectComponent,
  TileSelectGroupComponent,
  WithTitleAdornment,
  PrefixAdornmentComponent,
  SingleTile,
  WithAFooter,
  WithAccordionFooter,
  WithActionButtonAdornment,
  WithAdditionalInformation,
  WithCustomActionButton,
  WithCustomSpacing,
} from "./components.test-pw";
import {
  tileSelectDataComponent,
  titleElement,
  subtitleElement,
  descElement,
  inputElement,
  tileGroupDescription,
} from "../../../playwright/components/tileSelect";
import { CHARACTERS } from "../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("check Focus Outline & Border Radius", () => {
  test("should have the expected styling when the focusRedesignOptOut is false", async ({
    mount,
    page,
  }) => {
    await mount(<TileSelectComponent />);

    const styleElement = inputElement(page);
    await styleElement.focus();
    const focusedElement = inputElement(page).locator("..");

    await expect(focusedElement).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(focusedElement).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );
  });

  test("should have the expected styling when the focusRedesignOptOut is true", async ({
    mount,
    page,
  }) => {
    await mount<HooksConfig>(<TileSelectComponent />, {
      hooksConfig: {
        focusRedesignOptOut: true,
      },
    });

    const styleElement = inputElement(page);
    await styleElement.focus();
    const focusedElement = inputElement(page).locator("..");

    await expect(focusedElement).toHaveCSS(
      "outline",
      "rgb(255, 188, 25) solid 3px",
    );
  });
});

test.describe("check props for TileSelect component", () => {
  testData.forEach((title) => {
    test(`should check ${title} as title`, async ({ mount, page }) => {
      await mount(<TileSelectComponent title={title} />);

      await expect(titleElement(page)).toHaveText(title);
    });
  });

  test("should check titleAdornment iconType for TileSelect component", async ({
    mount,
    page,
  }) => {
    await mount(<WithTitleAdornment />);

    const icon1 = getComponent(page, "icon").nth(0);
    const icon2 = getComponent(page, "icon").nth(1);

    await expect(icon1).toHaveAttribute("type", "add");
    await expect(icon1).toBeVisible();
    await expect(icon2).toHaveAttribute("type", "info");
    await expect(icon2).toBeVisible();
  });

  testData.forEach((subtitle) => {
    test(`should check ${subtitle} as subtitle`, async ({ mount, page }) => {
      await mount(<TileSelectComponent subtitle={subtitle} />);

      await expect(subtitleElement(page)).toHaveText(subtitle);
    });
  });

  testData.forEach((description) => {
    test(`should check ${description} as description`, async ({
      mount,
      page,
    }) => {
      await mount(<TileSelectComponent description={description} />);

      await expect(descElement(page)).toHaveText(description);
    });
  });

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

  (
    [
      [false, "rgba(0, 0, 0, 0.9)"],
      [true, "rgba(0, 0, 0, 0.3)"],
    ] as [boolean, string][]
  ).forEach(([disabled, borderColor]) => {
    test(`should check when disabled prop is set as ${disabled}`, async ({
      mount,
      page,
    }) => {
      await mount(<TileSelectComponent disabled={disabled} />);

      await expect(inputElement(page)).toHaveCSS("border-color", borderColor);
      if (disabled) {
        await expect(inputElement(page)).toBeDisabled();
      } else {
        await expect(inputElement(page)).toBeEnabled();
      }
    });
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

  testData.forEach((id) => {
    test(`should check id set as ${id}`, async ({ mount, page }) => {
      await mount(<TileSelectComponent id={id} />);

      await expect(inputElement(page)).toHaveAttribute("id", id);
    });
  });

  testData.forEach((name) => {
    test(`should check name set as ${name}`, async ({ mount, page }) => {
      await mount(<TileSelect name={name} />);

      await expect(inputElement(page)).toHaveAttribute("name", name);
    });
  });

  test("should check when tile is selected", async ({ mount, page }) => {
    await mount(<TileSelect checked />);

    await expect(inputElement(page)).toBeChecked();
  });

  test("should check when tile is not selected", async ({ mount, page }) => {
    await mount(<TileSelect checked={false} />);

    await expect(inputElement(page)).not.toBeChecked();
  });

  test("should render TileSelect component with className", async ({
    mount,
    page,
  }) => {
    await mount(<TileSelectComponent className="tile-select-classname" />);

    await containsClass(tileSelectDataComponent(page), "tile-select-classname");
  });

  test("should check footer prop", async ({ mount, page }) => {
    await mount(<WithAFooter />);

    const buttonElement = getComponent(page, "button");
    await buttonElement.isVisible();

    await expect(buttonElement).toHaveText("Footer Button");
  });

  test("should check prefixAdornment prop", async ({ mount, page }) => {
    await mount(<PrefixAdornmentComponent />);

    const pill1 = getComponent(page, "pill").nth(0);
    const pill2 = getComponent(page, "pill").nth(1);

    await expect(pill1).toHaveText(CHARACTERS.DIACRITICS);
    await expect(pill1).toBeVisible();
    await expect(pill2).toHaveText(CHARACTERS.SPECIALCHARACTERS);
    await expect(pill2).toBeVisible();
  });

  test("should check additionalInformation prop", async ({ mount, page }) => {
    await mount(<WithAdditionalInformation />);

    const pill1 = getComponent(page, "pill").nth(0);

    await expect(pill1).toHaveText("Message");
    await expect(pill1).toBeVisible();
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

    await expect(tileSelectAccordionChildren).not.toBeVisible();
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

  testData.forEach((accordionContent) => {
    test(`should check when accordionContent set as ${accordionContent}`, async ({
      mount,
      page,
    }) => {
      await mount(<TileSelectComponent accordionContent={accordionContent} />);

      const tileSelectAccordionChildren = getElement(
        page,
        "tile-select-accordion-content",
      );

      await expect(tileSelectAccordionChildren).toHaveText(accordionContent);
    });
  });
});

test.describe("check props for MultiTileSelect component", () => {
  test("should check when type prop is set as checkbox", async ({
    mount,
    page,
  }) => {
    await mount(<TileSelectComponent multiSelect type="checkbox" />);

    await expect(inputElement(page)).toHaveAttribute("type", "checkbox");
  });

  test("should check when type prop is set as radio", async ({
    mount,
    page,
  }) => {
    await mount(<TileSelectComponent multiSelect type="radio" />);

    await expect(inputElement(page)).toHaveAttribute("type", "radio");
  });

  test("should check multiSelect prop", async ({ mount, page }) => {
    await mount(<MultiTileSelectGroupComponent multiSelect />);

    const multiSelectInputElement0 = inputElement(page).nth(0);
    await multiSelectInputElement0.click();

    await expect(multiSelectInputElement0).toBeChecked();
    const multiSelectInputElement1 = inputElement(page).nth(1);
    await multiSelectInputElement1.click();

    await expect(multiSelectInputElement1).toBeChecked();
    const multiSelectInputElement2 = inputElement(page).nth(2);

    await expect(multiSelectInputElement2).not.toBeChecked();
    const multiSelectInputElement3 = inputElement(page).nth(3);

    await expect(multiSelectInputElement3).not.toBeChecked();
  });

  test("should render with the expected border radius styling", async ({
    mount,
    page,
  }) => {
    await mount(<TileSelectComponent />);

    const inputElementChildren = inputElement(page).locator("..");

    await expect(inputElementChildren).toHaveCSS("border-radius", "8px");
    await expect(inputElementChildren).toHaveCSS("overflow", "hidden");
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

test.describe("check props for ActionButtonAdornment", () => {
  test("should check customActionButton for TileSelect component", async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomActionButton />);

    const buttonElement = getComponent(page, "button").nth(0);
    await buttonElement.isVisible();

    await expect(buttonElement).toHaveText("Reactivate");
  });

  test("should check actionButtonAdornment iconType for TileSelect component", async ({
    mount,
    page,
  }) => {
    await mount(<WithActionButtonAdornment />);

    const iconElement = getComponent(page, "icon").nth(0);
    await iconElement.isVisible();
    await expect(iconElement).toHaveAttribute("type", "info");

    const iconElement1 = getComponent(page, "icon").nth(1);
    await iconElement1.isVisible();
    await expect(iconElement1).toHaveAttribute("type", "add");
  });
});

test.describe("should render TileSelect component and check events", () => {
  test("should call onChange callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TileSelectGroupComponent
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    const onChangeElement = inputElement(page).first();
    await onChangeElement.click();
    expect(callbackCount).toBe(1);
  });

  test("should call onBlur callback when a blur event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TileSelectGroupComponent
        onBlur={() => {
          callbackCount += 1;
        }}
      />,
    );

    const blurElement = inputElement(page).first();
    await blurElement.click();
    await blurElement.blur();
    expect(callbackCount).toEqual(1);
  });

  test("should call onFocus callback when a focus event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TileSelect
        onFocus={() => {
          callbackCount += 1;
        }}
      />,
    );

    const onFocusElement = inputElement(page);
    await onFocusElement.focus();
    await expect(callbackCount).toEqual(1);
  });

  test("should call onChange callback when a click event is triggered for TileSelect component", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TileSelect
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    const onChangeElement = inputElement(page).first();
    await onChangeElement.click();
    expect(callbackCount).toBe(1);
  });

  test("should call onBlur callback when a blur event is triggered for TileSelect component", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TileSelect
        onBlur={() => {
          callbackCount += 1;
        }}
      />,
    );

    const blurElement = inputElement(page).first();
    await blurElement.click();
    await blurElement.blur();
    expect(callbackCount).toEqual(1);
  });
});

test.describe("Accessibility tests for Tile Select", () => {
  // FE-4683
  test.skip("should pass accessibility tests for Default example", async ({
    mount,
    page,
  }) => {
    await mount(<TileSelectComponent />);

    await checkAccessibility(page);
  });

  // FE-4683
  test.skip("should pass accessibility tests for MultiSelect example", async ({
    mount,
    page,
  }) => {
    await mount(<MultiTileSelectGroupComponent />);

    await checkAccessibility(page);
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

  // FE-4683
  test.skip("should pass accessibility tests for WithAPrefixAdornment example", async ({
    mount,
    page,
  }) => {
    await mount(<PrefixAdornmentComponent />);

    await checkAccessibility(page);
  });

  // FE-4683
  test.skip("should pass accessibility tests for WithAccordionFooter example", async ({
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

  test("should pass accessibility tests for WithAdditionalInformation example", async ({
    mount,
    page,
  }) => {
    await mount(<WithAdditionalInformation />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for WithCustomActionButton example", async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomActionButton />);

    await checkAccessibility(page);
  });

  // FE-4683
  test.skip("should pass accessibility tests for WithCustomSpacing example", async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomSpacing />);

    await checkAccessibility(page);
  });
});
