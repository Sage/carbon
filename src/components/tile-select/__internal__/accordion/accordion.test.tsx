import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Accordion from "./accordion.component";
import useResizeObserver from "../../../../hooks/__internal__/useResizeObserver";

jest.mock("../../../../hooks/__internal__/useResizeObserver");

test("the expected styles are applied to the component", () => {
  render(<Accordion>Content</Accordion>);

  const contentContainer = screen.getByTestId(
    "tile-select-accordion-content-container",
  );
  const content = screen.getByTestId("tile-select-accordion-content");

  expect(contentContainer).toHaveStyleRule(
    "backgroundColor: var(--colorsActionMinor050)",
  );
  expect(content).toHaveStyle({
    padding: "24px",
    position: "relative",
    zIndex: "200",
  });
});

test("resize observer recalculates the content height", () => {
  render(<Accordion expanded>Content</Accordion>);

  const content = screen.getByTestId("tile-select-accordion-content");
  jest.spyOn(content, "scrollHeight", "get").mockImplementation(() => 200);
  jest.spyOn(content, "scrollHeight", "get").mockImplementation(() => 400);

  act(() => {
    global.innerWidth = 500;
    global.innerHeight = 500;

    const useResizeObserverMock = useResizeObserver as jest.Mock;
    useResizeObserverMock.mock.calls[
      useResizeObserverMock.mock.calls.length - 1
    ][1]();
  });

  const contentContainer = screen.getByTestId(
    "tile-select-accordion-content-container",
  );

  expect(contentContainer).toHaveStyle({
    maxHeight: `400px`,
  });
});
