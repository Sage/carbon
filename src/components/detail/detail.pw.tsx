/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import Detail from "./detail.component";
import {
  childrenPreview,
  footnotePreview,
} from "../../../playwright/components/detail/index";

import { icon } from "../../../playwright/components/index";

import { CHARACTERS } from "../../../playwright/support/constants";
import { checkAccessibility } from "../../../playwright/support/helper";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("check Detail component text input", () => {
  testData.forEach((text) => {
    test(`check Detail children on preview is ${text} children value`, async ({
      mount,
      page,
    }) => {
      await mount(<Detail>{text}</Detail>);

      await expect(childrenPreview(page)).toHaveText(text);
    });

    test(`check Detail footnote on preview is ${text} footnote value`, async ({
      mount,
      page,
    }) => {
      await mount(<Detail footnote={text} />);

      await expect(footnotePreview(page)).toHaveText(text);
    });
  });
});

test("should set Detail icon on preview to chevron_up", async ({
  mount,
  page,
}) => {
  await mount(<Detail icon="chevron_up" />);

  await expect(icon(page)).toHaveAttribute("type", "chevron_up");
  const isVisible = await icon(page).isVisible();
  expect(isVisible).toBeTruthy();
});

test.describe("Accessibility tests for Detail component", () => {
  test("should pass accessibility tests for Detail default story", async ({
    mount,
    page,
  }) => {
    await mount(<Detail />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Detail component with footnote", async ({
    mount,
    page,
  }) => {
    await mount(<Detail footnote="footnote"> "detail"</Detail>);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Detail component with icon on preview set to chevron_up", async ({
    mount,
    page,
  }) => {
    await mount(<Detail icon="chevron_up" />);

    await checkAccessibility(page);
  });
});
