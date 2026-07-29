import React from "react";
import { act, render, screen } from "@testing-library/react";
import ResultsAnnouncement from "./results-announcement.component";

test("renders announcement immediately on first non-empty value", () => {
  render(
    <ResultsAnnouncement
      announcement="No search results"
      announcementKey="t"
    />,
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
      <ResultsAnnouncement
        announcement="No search results"
        announcementKey="t"
      />,
    );

    rerender(
      <ResultsAnnouncement
        announcement="2 results are available."
        announcementKey="te"
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
    <ResultsAnnouncement
      announcement="No search results"
      announcementKey="t"
    />,
  );

  rerender(<ResultsAnnouncement announcement="" announcementKey="" />);

  const statusRegions = screen.getAllByRole("status");

  expect(statusRegions[0]).toBeEmptyDOMElement();
  expect(statusRegions[1]).toBeEmptyDOMElement();
});

test("repeats the same announcement when its key changes", () => {
  jest.useFakeTimers();

  try {
    const { rerender } = render(
      <ResultsAnnouncement
        announcement="Loading options..."
        announcementKey={1}
        delay={0}
      />,
    );
    const statusRegions = screen.getAllByRole("status");
    const firstRegion = statusRegions.findIndex((status) =>
      status.textContent?.includes("Loading options..."),
    );

    rerender(
      <ResultsAnnouncement
        announcement="Loading options..."
        announcementKey={2}
        delay={0}
      />,
    );
    act(() => jest.runOnlyPendingTimers());

    expect(statusRegions[1 - firstRegion]).toHaveTextContent(
      "Loading options...",
    );
  } finally {
    jest.useRealTimers();
  }
});

test("cancels a queued announcement when cleared", () => {
  jest.useFakeTimers();

  try {
    const { rerender } = render(
      <ResultsAnnouncement announcement="Loading options..." />,
    );
    rerender(<ResultsAnnouncement announcement="2 new options available." />);
    rerender(<ResultsAnnouncement announcement="" />);
    act(() => jest.runOnlyPendingTimers());

    screen
      .getAllByRole("status")
      .forEach((status) => expect(status).toBeEmptyDOMElement());
  } finally {
    jest.useRealTimers();
  }
});
