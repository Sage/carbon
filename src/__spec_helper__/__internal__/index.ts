import { configure } from "@testing-library/react";
import { enableFetchMocks } from "jest-fetch-mock";
import failOnConsole from "jest-fail-on-console";

import { setupMatchMediaMock } from "../mock-match-media";
import setupResizeObserverMock from "../mock-resize-observer";
import setupScrollToMock from "../mock-element-scrollto";

import "@atlaskit/pragmatic-drag-and-drop-unit-testing/drag-event-polyfill";
import "@atlaskit/pragmatic-drag-and-drop-unit-testing/dom-rect-polyfill";
import "@testing-library/jest-dom";
import "jest-styled-components";

const isNotCI = process.env.CI !== "true";

// we don't need to increase the timeout when run on CI
if (isNotCI) {
  jest.setTimeout(7500);
}

failOnConsole({
  shouldFailOnError: true,
  shouldFailOnWarn: false,
});
enableFetchMocks();
setupResizeObserverMock();
setupMatchMediaMock();
setupScrollToMock();

configure({
  testIdAttribute:
    "data-role" /** Configure React Testing Library *ByTestId queries to use data-role tag */,
});
