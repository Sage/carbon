import { configure } from "@testing-library/react";
import { enableFetchMocks } from "jest-fetch-mock";
import failOnConsole from "jest-fail-on-console";

import { setupMatchMediaMock } from "../mock-match-media";
import setupResizeObserverMock from "../mock-resize-observer";
import setupScrollToMock from "../mock-element-scrollto";

import "@testing-library/jest-dom";

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
