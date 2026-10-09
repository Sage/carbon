import type { Locator } from "@playwright/test";
import type { FixtureResetElement } from "./use-fixture-reset";

const resetFixture = async (component: Locator) => {
  await component.locator("[data-benchmark-reset]").evaluate((element) => {
    const { resetBenchmarkFixture } = element as FixtureResetElement;
    if (!resetBenchmarkFixture) {
      throw new Error("Fixture reset is unavailable; attach useFixtureReset.");
    }
    resetBenchmarkFixture();
  });
};

export default resetFixture;
