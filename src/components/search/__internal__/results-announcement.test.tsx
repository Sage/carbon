import React from "react";
import { act, render, screen } from "@testing-library/react";
import ResultsAnnouncement from "./results-announcement.component";

test("renders announcement immediately on first non-empty value", () => {
  render(
    <ResultsAnnouncement announcement="No search results" searchValue="t" />,
  );

  const statusRegions = screen.getAllByRole("status");

  expect(statusRegions).toHaveLength(2);
  expect(
    statusRegions.some((status) =>
      status.textContent?.includes("No search results"),
    ),
  ).toBe(true);
});

test("debounces subsequent announcements and re-announces on search value change", () => {
  jest.useFakeTimers();

  try {
    const { rerender } = render(
      <ResultsAnnouncement announcement="No search results" searchValue="t" />,
    );

    rerender(
      <ResultsAnnouncement
        announcement="2 results are available."
        searchValue="te"
      />,
    );

    expect(
      screen
        .getAllByRole("status")
        .some((status) =>
          status.textContent?.includes("2 results are available."),
        ),
    ).toBe(false);

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(
      screen
        .getAllByRole("status")
        .some((status) =>
          status.textContent?.includes("2 results are available."),
        ),
    ).toBe(true);
  } finally {
    jest.useRealTimers();
  }
});

test("clears announcements when value is empty", () => {
  const { rerender } = render(
    <ResultsAnnouncement announcement="No search results" searchValue="t" />,
  );

  rerender(<ResultsAnnouncement announcement="" searchValue="" />);

  const statusRegions = screen.getAllByRole("status");

  expect(statusRegions[0]).toBeEmptyDOMElement();
  expect(statusRegions[1]).toBeEmptyDOMElement();
});
