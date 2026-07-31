import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import BasicBoxExample from "./components.test-pw";

test.describe("Prop tests", () => {
  test("should render the basic example with string values", async ({
    mount,
    page,
  }) => {
    await mount(<BasicBoxExample mt="6px" pb="4px" />);

    const dipsBox = page.locator("[data-element='dips-box']");

    await expect(dipsBox).toBeVisible();
    await expect(dipsBox).toHaveCSS("margin-top", "6px");
    await expect(dipsBox).toHaveCSS("padding-bottom", "4px");
  });

  test("should render the basic example with number values", async ({
    mount,
    page,
  }) => {
    await mount(<BasicBoxExample mt={6} pb={4} />);

    const dipsBox = page.locator("[data-element='dips-box']");

    await expect(dipsBox).toBeVisible();
    await expect(dipsBox).toHaveCSS("margin-top", "48px");
    await expect(dipsBox).toHaveCSS("padding-bottom", "32px");
  });

  test("should render the basic example with token values", async ({
    mount,
    page,
  }) => {
    await mount(
      <BasicBoxExample mt="var(--sizing025)" pb="var(--sizing025)" />,
    );

    const dipsBox = page.locator("[data-element='dips-box']");

    await expect(dipsBox).toBeVisible();
    await expect(dipsBox).toHaveCSS("margin-top", "2px");
    await expect(dipsBox).toHaveCSS("padding-bottom", "2px");
  });

  test("should render the basic example with a mix of token and string values", async ({
    mount,
    page,
  }) => {
    await mount(<BasicBoxExample mt="40px" pb="var(--sizing025)" />);

    const dipsBox = page.locator("[data-element='dips-box']");

    await expect(dipsBox).toBeVisible();
    await expect(dipsBox).toHaveCSS("margin-top", "40px");
    await expect(dipsBox).toHaveCSS("padding-bottom", "2px");
  });

  test("should render the basic example with a mix of token and number values", async ({
    mount,
    page,
  }) => {
    await mount(<BasicBoxExample mt={4} pb="var(--sizing025)" />);

    const dipsBox = page.locator("[data-element='dips-box']");

    await expect(dipsBox).toBeVisible();
    await expect(dipsBox).toHaveCSS("margin-top", "32px");
    await expect(dipsBox).toHaveCSS("padding-bottom", "2px");
  });
});
