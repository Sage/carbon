import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import {
  SettingsRowDefault,
  SettingRowWithLinkDescription,
  SettingsRowWithHeadingTypes,
} from "./components.test-pw";
import {
  settingsRowPreview,
  settingsRowChildren,
  settingsRowDescription,
  settingsRowTitle,
} from "../../../playwright/components/settings-row/index";
import { CHARACTERS } from "../../../playwright/support/constants";
import { HeadingType } from "../heading";
import {
  checkAccessibility,
  containsClass,
} from "../../../playwright/support/helper";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const headingType: HeadingType[] = ["h1", "h2", "h3", "h4", "h5"];
const dividerValue = [true, false];

test.describe("should check SettingsRow component properties", () => {
  testData.forEach((characterVals) => {
    test(`should check ${characterVals} as title for SettingsRow component`, async ({
      mount,
      page,
    }) => {
      await mount(<SettingsRowDefault title={characterVals} />);

      await expect(settingsRowTitle(page)).toHaveText(characterVals);
    });
  });

  headingType.forEach((heading) => {
    test(`should check HTML heading element is correct when headingType is ${heading}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SettingsRowDefault
          headingType={heading}
          title="foo"
          description="bar"
        />,
      );

      await expect(page.locator(heading)).toHaveText("foo");
    });
  });

  testData.forEach((characterVals) => {
    test(`should check ${characterVals} as description for SettingsRow component`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SettingsRowDefault title="foo" description={characterVals} />,
      );

      await expect(settingsRowDescription(page)).toHaveText(characterVals);
    });
  });

  test("should check link as description for SettingsRow component", async ({
    mount,
    page,
  }) => {
    const textDesc = "This is a link";

    await mount(
      <SettingRowWithLinkDescription title="foo" description={textDesc} />,
    );

    await expect(settingsRowDescription(page)).toHaveText(textDesc);
  });

  dividerValue.forEach((dividerVals) => {
    test(`should check when divider property is ${dividerVals} for SettingsRow component`, async ({
      mount,
      page,
    }) => {
      await mount(<SettingsRowDefault title="foo" divider={dividerVals} />);

      if (dividerVals) {
        await expect(settingsRowPreview(page)).toHaveCSS(
          "border-bottom-color",
          "rgb(230, 235, 237)",
        );

        await expect(settingsRowPreview(page)).toHaveCSS(
          "border-bottom-style",
          "solid",
        );

        await expect(settingsRowPreview(page)).toHaveCSS(
          "padding-bottom",
          "30px",
        );
      } else {
        await expect(settingsRowPreview(page)).not.toHaveCSS(
          "border-bottom-color",
          "rgb(230, 235, 237)",
        );

        await expect(settingsRowPreview(page)).not.toHaveCSS(
          "border-bottom-style",
          "solid",
        );

        await expect(settingsRowPreview(page)).not.toHaveCSS(
          "padding-bottom",
          "30px",
        );
      }
    });
  });

  testData.forEach((characterVals) => {
    test(`should check ${characterVals} as className for SettingsRow component`, async ({
      mount,
      page,
    }) => {
      await mount(<SettingsRowDefault className={characterVals} />);

      await containsClass(settingsRowPreview(page), characterVals);
    });
  });

  testData.forEach((characterVals) => {
    test(`should check ${characterVals} as children for SettingsRow component`, async ({
      mount,
      page,
    }) => {
      await mount(<SettingsRowDefault>{characterVals}</SettingsRowDefault>);

      await expect(settingsRowChildren(page)).toHaveText(characterVals);
    });
  });
});

test.describe("check accessibility for SettingsRow component", () => {
  test("should pass accessibility tests for SettingsRowDefault", async ({
    mount,
    page,
  }) => {
    await mount(<SettingsRowDefault />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for SettingRowWithLinkDescription", async ({
    mount,
    page,
  }) => {
    await mount(<SettingRowWithLinkDescription />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for SettingsRowWithHeadingTypes", async ({
    mount,
    page,
  }) => {
    await mount(<SettingsRowWithHeadingTypes />);

    await checkAccessibility(page);
  });
});
