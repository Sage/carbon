import type React from "react";
import type { Locator, Page } from "@playwright/test";

export interface BenchmarkContext {
  component: Locator;
  /** Use page for portalled content outside the mounted root. */
  page: Page;
}

type Step = (context: BenchmarkContext) => Promise<void>;

export interface BenchmarkDefinition {
  id: string;
  /** JSX fixture owns browser-side state, props, data, and callbacks. */
  fixture: React.ReactElement;
  prepare?: Step;
  action: Step;
  /** Wait for the scenario's observable completion condition. */
  complete: Step;
  /** Additional correctness checks, performed after collection ends. */
  verify?: Step;
}

export const defineBenchmark = (definition: BenchmarkDefinition) => {
  if (!/^[a-z0-9]+(?:[/-][a-z0-9]+)*$/.test(definition.id)) {
    throw new Error(
      "Benchmark id must contain lowercase words separated by / or -",
    );
  }
  return definition;
};
