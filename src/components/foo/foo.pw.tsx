import React from "react";
import v8toIstanbul from "v8-to-istanbul";
import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/experimental-ct-react17";
import Foo from "./foo.component";

const { describe, beforeAll, beforeEach, afterAll, afterEach } = test;

function findSubstringBetween(
  mainString: string,
  startString: string,
  endString: string
) {
  const regex = new RegExp(`${startString}(.*?)${endString}`);
  const match = mainString.match(regex);
  return match ? match[1] : ""; // Return the captured group if match found, otherwise return an empty string
}

describe("test run", () => {
  beforeEach(async ({ page }) => {
    // -> think it should be all here and below but it doesn't work
    await Promise.all([
      page.coverage.startJSCoverage(),
      page.coverage.startCSSCoverage(),
    ]);
  });

  afterEach(async ({ page }) => {
    const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage(),
    ]);

    const mergedCoverage = [...jsCoverage, ...cssCoverage];

    for (const entry of mergedCoverage) {
      let endString;
      const startString = "assets/";

      if (entry?.url?.includes("component")) {
        endString = ".component";
      } else if (entry?.url?.includes("style")) {
        endString = ".style";
      }

      if (endString) {
        const componentName = findSubstringBetween(
          entry.url,
          startString,
          endString
        );
        const converter = v8toIstanbul(
          `src/components/${componentName}/${componentName}${endString}.tsx`
        );
        await converter.load();
        converter.applyCoverage(entry.functions);

        const directory = "temp-coverage";

        if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory); // Create directory if it doesn't exist
        }

        const filePath = path.join(directory, "coverage.json");
        fs.writeFileSync(
          filePath,
          JSON.stringify(converter.toIstanbul(), null, 2)
        );
      }
    }
  });

  test("test with prop 1", async ({ mount, page }) => {
    await mount(<Foo prop1>FOOOO</Foo>);

    await expect(page.getByText("FOOOO")).toHaveCount(0);
  });

  test("test with no prop1", async ({ mount, page }) => {
    await mount(<Foo>FOOOO</Foo>);

    const foo = page.getByText("FOOOO");

    await expect(foo).toHaveText("FOOOO");
    await foo.click();
  });
});
