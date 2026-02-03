import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { linkComponent } from "../../../playwright/components/link";
import {
  Default,
  FocusedCrumbBecomesCurrent,
  Inverse,
} from "./components.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("should render Breadcrumbs component", () => {
  test("should not have any focus styling when a crumb is clicked and becomes current", async ({
    mount,
    page,
  }) => {
    await mount(<FocusedCrumbBecomesCurrent />);

    await linkComponent(page).press("Tab");
    await expect(linkComponent(page)).toHaveCSS(
      "box-shadow",
      "rgb(0, 0, 0) 0px 4px 0px 0px",
    );
    await expect(linkComponent(page)).toHaveCSS(
      "background-color",
      "rgb(255, 210, 116)",
    );

    await linkComponent(page).click();
    await expect(linkComponent(page)).not.toHaveCSS(
      "box-shadow",
      "rgb(0, 0, 0) 0px 4px 0px 0px",
    );
    await expect(linkComponent(page)).not.toHaveCSS("background-color", "none");
  });

  test("should not have any focus styling when a crumb with href set is clicked and becomes current", async ({
    mount,
    page,
  }) => {
    await mount(<FocusedCrumbBecomesCurrent hasHref />);

    await linkComponent(page).press("Tab");
    await expect(linkComponent(page)).toHaveCSS(
      "box-shadow",
      "rgb(0, 0, 0) 0px 4px 0px 0px",
    );
    await expect(linkComponent(page)).toHaveCSS(
      "background-color",
      "rgb(255, 210, 116)",
    );

    await linkComponent(page).click();
    await expect(linkComponent(page)).not.toHaveCSS(
      "box-shadow",
      "rgb(0, 0, 0) 0px 4px 0px 0px",
    );
    await expect(linkComponent(page)).not.toHaveCSS("background-color", "none");
  });

  test("should not have any focus styling when user presses Enter key on focused crumb and it becomes current", async ({
    mount,
    page,
  }) => {
    await mount(<FocusedCrumbBecomesCurrent />);

    await linkComponent(page).press("Tab");
    await expect(linkComponent(page)).toHaveCSS(
      "box-shadow",
      "rgb(0, 0, 0) 0px 4px 0px 0px",
    );
    await expect(linkComponent(page)).toHaveCSS(
      "background-color",
      "rgb(255, 210, 116)",
    );

    await linkComponent(page).press("Enter");
    await expect(linkComponent(page)).not.toHaveCSS(
      "box-shadow",
      "rgb(0, 0, 0) 0px 4px 0px 0px",
    );
    await expect(linkComponent(page)).not.toHaveCSS("background-color", "none");
  });

  test("should not have any focus styling when user presses Enter key on focused crumb with href set and it becomes current", async ({
    mount,
    page,
  }) => {
    await mount(<FocusedCrumbBecomesCurrent hasHref />);
    await linkComponent(page).press("Tab");
    await expect(linkComponent(page)).toHaveCSS(
      "box-shadow",
      "rgb(0, 0, 0) 0px 4px 0px 0px",
    );
    await expect(linkComponent(page)).toHaveCSS(
      "background-color",
      "rgb(255, 210, 116)",
    );

    await linkComponent(page).press("Enter");
    await expect(linkComponent(page)).not.toHaveCSS(
      "box-shadow",
      "rgb(0, 0, 0) 0px 4px 0px 0px",
    );
    await expect(linkComponent(page)).not.toHaveCSS("background-color", "none");
  });
});

test.describe("Accessibility tests for Breadcrumbs component", () => {
  test("should pass accessibility tests for default Breadcrumbs", async ({
    mount,
    page,
  }) => {
    await mount(<Default />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for inverse Breadcrumbs", async ({
    mount,
    page,
  }) => {
    await mount(<Inverse />);
    await checkAccessibility(page);
  });
});
