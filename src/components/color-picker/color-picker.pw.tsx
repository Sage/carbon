import React from "react";
import type { Page } from "@playwright/test";

import { test, expect } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import ColorPickerComponent from "./components.test-pw";

const resolveToken = (page: Page, token: string) =>
  page.getByTestId("color-picker-swatch").evaluate((swatch, tokenName) => {
    const probe = document.createElement("span");
    probe.style.color = `var(${tokenName})`;
    swatch.parentElement?.appendChild(probe);
    const rgb = getComputedStyle(probe).color;
    probe.remove();
    return rgb;
  }, token);

test("selects a colour with the mouse and shows its swatch in the input", async ({
  mount,
  page,
}) => {
  await mount(<ColorPickerComponent />);

  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Teal" }).click();

  const selectText = page.getByTestId("select-text");
  await expect(selectText).toHaveText("Teal");
  await expect(selectText.getByTestId("color-picker-swatch")).toHaveAttribute(
    "data-color",
    "teal",
  );
});

test("selects a colour with the keyboard and typeahead", async ({
  mount,
  page,
}) => {
  await mount(<ColorPickerComponent />);

  const input = page.getByRole("combobox");
  await input.focus();
  await input.press("p");

  await expect(page.getByTestId("select-text")).toHaveText("Pink");

  await input.press("ArrowDown");
  await input.press("ArrowDown");
  await input.press("Enter");

  await expect(page.getByTestId("select-text")).toHaveText("Purple");
});

test("only offers the colours passed to `colors`", async ({ mount, page }) => {
  await mount(<ColorPickerComponent colors={["red", "blue"]} />);

  await page.getByRole("combobox").click();

  await expect(page.getByRole("option")).toHaveText(["Blue", "Red"]);
});

test("renders rich swatches with the rich colour token", async ({
  mount,
  page,
}) => {
  await mount(<ColorPickerComponent value="blue" palette="rich" />);

  await expect(page.getByTestId("color-picker-swatch")).toHaveCSS(
    "background-color",
    await resolveToken(page, "--mode-color-status-custom-blue-default"),
  );
});

test("renders muted swatches with the muted colour token", async ({
  mount,
  page,
}) => {
  await mount(<ColorPickerComponent value="blue" palette="muted" />);

  await expect(page.getByTestId("color-picker-swatch")).toHaveCSS(
    "background-color",
    await resolveToken(page, "--mode-color-status-custom-blue-hover-alt"),
  );
});

test.describe("Accessibility tests", () => {
  test("closed with no colour selected", async ({ mount, page }) => {
    await mount(<ColorPickerComponent inputHint="Hint text" />);

    await checkAccessibility(page);
  });

  (["rich", "muted"] as const).forEach((palette) => {
    test(`open with the ${palette} palette`, async ({ mount, page }) => {
      await mount(<ColorPickerComponent palette={palette} value="green" />);

      await page.getByRole("combobox").click();
      await expect(page.getByRole("listbox")).toBeVisible();

      await checkAccessibility(page);
    });
  });

  test("with an error", async ({ mount, page }) => {
    await mount(
      <ColorPickerComponent error="Error message" value="pink" required />,
    );

    await checkAccessibility(page);
  });

  test("when disabled", async ({ mount, page }) => {
    await mount(<ColorPickerComponent disabled value="pink" />);

    await checkAccessibility(page);
  });

  test("when read only", async ({ mount, page }) => {
    await mount(<ColorPickerComponent readOnly value="pink" />);

    await checkAccessibility(page);
  });
});
