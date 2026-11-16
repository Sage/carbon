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

// JSDOM has no layout: clipping calculations otherwise hide every popover.
// Keep keyboard/focus tests visible; useFloating tests supply explicit hide data.
jest.mock("@floating-ui/dom", () => {
  const actual =
    jest.requireActual<typeof import("@floating-ui/dom")>("@floating-ui/dom");

  return {
    __esModule: true,
    ...actual,
    hide: (options?: Parameters<typeof actual.hide>[0]) => ({
      ...actual.hide(options),
      fn: () => ({ data: { referenceHidden: false } }),
    }),
  };
});

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
