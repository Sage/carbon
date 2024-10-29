import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";

import { PagesProps } from "../pages";
import {
  dataComponentButtonByText,
  backArrow,
} from "../../../playwright/components/pages";
import {
  getComponent,
  getDataElementByValue,
} from "../../../playwright/components";
import { CHARACTERS } from "../../../playwright/support/constants";
import {
  checkAccessibility,
  waitForAnimationEnd,
} from "../../../playwright/support/helper";
import {
  PageComponent,
  PageComponentWithTitle,
  PagesComponent,
} from "./components.test-pw";

test.describe("Prop checks for Pages component", () => {
  [
    ["number", 1],
    ["string", "1"],
  ].forEach(([type, propValue]) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`When initialPageIndex prop is passed as ${type}, should show the title that matches the one on the page with that index`, async ({
      mount,
      page,
    }) => {
      await mount(<PagesComponent initialpageIndex={propValue} />);

      await dataComponentButtonByText(page, "Open Preview").click();
      const pageComponentTitle = getDataElementByValue(page, "title").nth(1);
      await waitForAnimationEnd(pageComponentTitle);

      await expect(pageComponentTitle).toHaveText("My Second Page");
    });
  });

  [
    ["number", 1],
    ["string", "1"],
  ].forEach(([type, propValue]) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`When pageIndex prop is passed as ${type}, should show the title that matches the one on the page with that index`, async ({
      mount,
      page,
    }) => {
      await mount(<PagesComponent pageIndex={propValue} />);

      await dataComponentButtonByText(page, "Open Preview").click();
      await waitForAnimationEnd(getComponent(page, "page"));

      await expect(getDataElementByValue(page, "title")).toHaveText(
        "My Second Page",
      );
    });
  });

  (["slide", "fade"] as PagesProps["transition"][]).forEach((transition) => {
    test(`should render component with transition set to ${transition}`, async ({
      mount,
      page,
    }) => {
      await mount(<PagesComponent transition={transition} />);

      const pageComponent = getDataElementByValue(page, "visible-page").nth(0);

      await dataComponentButtonByText(page, "Open Preview").click();
      await dataComponentButtonByText(page, "Go to second page").click();
      const classAttribute = await pageComponent.getAttribute("class");

      await expect(classAttribute).toContain(transition);
    });
  });

  test("should render component and go next to Second page", async ({
    mount,
    page,
  }) => {
    await mount(<PagesComponent />);

    await dataComponentButtonByText(page, "Open Preview").click();
    await dataComponentButtonByText(page, "Go to second page").click();

    await expect(getDataElementByValue(page, "title").nth(0)).toHaveText(
      "My Second Page",
    );
  });

  test("should render component and go next to Third page", async ({
    mount,
    page,
  }) => {
    await mount(<PagesComponent initialPageIndex={1} />);

    await dataComponentButtonByText(page, "Open Preview").click();
    await dataComponentButtonByText(page, "Go to third page").click();

    await expect(getDataElementByValue(page, "title").nth(0)).toHaveText(
      "My Third Page",
    );
  });

  test("should render component and go back to Second page", async ({
    mount,
    page,
  }) => {
    await mount(<PagesComponent initialPageIndex={2} />);

    await dataComponentButtonByText(page, "Open Preview").click();
    await backArrow(page).click();

    await expect(getDataElementByValue(page, "title").nth(0)).toHaveText(
      "My Second Page",
    );
  });

  test("should render component and go back to First page", async ({
    mount,
    page,
  }) => {
    await mount(<PagesComponent initialPageIndex={1} />);

    await dataComponentButtonByText(page, "Open Preview").click();
    await backArrow(page).click();

    await expect(getDataElementByValue(page, "title").nth(0)).toHaveText(
      "My First Page",
    );
  });

  [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS].forEach(
    ([testTitle]) => {
      // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
      test.skip(`Page component should render as expected with title prop set to ${testTitle}`, async ({
        mount,
        page,
      }) => {
        await mount(<PageComponentWithTitle testTitle={testTitle} />);

        const pageComponent = getComponent(page, "page");
        await waitForAnimationEnd(pageComponent);

        await expect(pageComponent).toHaveText(`${testTitle}`);
      });
    },
  );
});

test.describe("Accessibility tests for Pages component", () => {
  [
    ["number", 1],
    ["string", "1"],
  ].forEach(([type, propValue]) => {
    test(`Check accessibility when initialPageIndex prop is passed as ${type}`, async ({
      mount,
      page,
    }) => {
      await mount(<PagesComponent initialpageIndex={propValue} />);

      await dataComponentButtonByText(page, "Open Preview").click();
      const pageComponentTitle = getDataElementByValue(page, "title").first();

      await checkAccessibility(page, pageComponentTitle);
    });
  });

  [
    ["number", 1],
    ["string", "1"],
  ].forEach(([type, propValue]) => {
    test(`Check accessibility when pageIndex prop is passed as ${type}`, async ({
      mount,
      page,
    }) => {
      await mount(<PagesComponent pageIndex={propValue} />);

      await dataComponentButtonByText(page, "Open Preview").click();

      await checkAccessibility(page, getComponent(page, "page"));
    });
  });

  (["slide", "fade"] as PagesProps["transition"][]).forEach((transition) => {
    test(`should render component with transition set to ${transition} and check accessibility`, async ({
      mount,
      page,
    }) => {
      await mount(<PagesComponent transition={transition} />);

      await dataComponentButtonByText(page, "Open Preview").click();

      await checkAccessibility(page, getComponent(page, "page"));
    });
  });

  test("should render component and check accessibility", async ({
    mount,
    page,
  }) => {
    await mount(<PagesComponent initialPageIndex={1} />);

    await dataComponentButtonByText(page, "Open Preview").click();

    await checkAccessibility(page, getComponent(page, "page"));
  });

  test("should render component with different padding and check accessibility", async ({
    mount,
    page,
  }) => {
    await mount(<PageComponent p={0} />);

    await checkAccessibility(page, getComponent(page, "page"));
  });
});
