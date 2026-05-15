import React from "react";
import { render, screen, act } from "@testing-library/react";

import useMediaQuery from ".";
import { mockMatchMedia } from "../../__spec_helper__/__internal__/test-utils";
import { simulateMediaQueryChange } from "../../__spec_helper__/mock-match-media";

const STORAGE_PREFIX = "__CARBON_MQ_";
const NORMALIZED_QUERY = "(min-width: 960px)";

const TestComponent = ({ query = "(min-width:960px)" }: { query?: string }) => {
  const matchQuery = useMediaQuery(query);
  return <span>{`${matchQuery}`}</span>;
};

afterEach(() => {
  sessionStorage.clear();
});

test("renders 'false' when the media query does not match", () => {
  mockMatchMedia(false);

  render(<TestComponent />);

  expect(screen.getByText("false")).toBeInTheDocument();
});

test("renders 'true' when the media query matches", () => {
  mockMatchMedia(true);

  render(<TestComponent />);

  expect(screen.getByText("true")).toBeInTheDocument();
});

test("removes event listener when the component unmounts", () => {
  const { removeEventListener } = mockMatchMedia(true);
  const removeListenerFn: jest.Mock = removeEventListener;
  removeListenerFn.mockClear();

  const { unmount } = render(<TestComponent />);

  expect(screen.getByText("true")).toBeInTheDocument();
  unmount();
  expect(removeListenerFn.mock.calls.length).toEqual(1);
});

test("only calls the removeEventListener once when multiple components are using the same query and unmount", () => {
  const { removeEventListener } = mockMatchMedia(true);
  const removeListenerFn: jest.Mock = removeEventListener;
  removeListenerFn.mockClear();

  const { unmount } = render(
    <>
      <TestComponent />
      <TestComponent />
    </>,
  );

  expect(screen.getAllByText("true").length).toEqual(2);
  unmount();
  expect(removeListenerFn.mock.calls.length).toEqual(1);
});

test("updates all subscribers when the media query changes", () => {
  mockMatchMedia(false);

  render(
    <>
      <TestComponent />
      <TestComponent />
    </>,
  );

  expect(screen.getAllByText("false")).toHaveLength(2);

  act(() => {
    simulateMediaQueryChange(true);
  });

  expect(screen.getAllByText("true")).toHaveLength(2);
});

describe("sessionStorage caching", () => {
  test("writes the matched value to sessionStorage on mount", () => {
    mockMatchMedia(true);

    render(<TestComponent />);

    expect(sessionStorage.getItem(`${STORAGE_PREFIX}${NORMALIZED_QUERY}`)).toBe(
      "true",
    );
  });

  test("reads a cached `true` value from sessionStorage on mount", () => {
    sessionStorage.setItem(`${STORAGE_PREFIX}${NORMALIZED_QUERY}`, "true");
    mockMatchMedia(true);

    render(<TestComponent />);

    expect(screen.getByText("true")).toBeInTheDocument();
  });

  test("reads a cached `false` value from sessionStorage on mount", () => {
    sessionStorage.setItem(`${STORAGE_PREFIX}${NORMALIZED_QUERY}`, "false");
    mockMatchMedia(false);

    render(<TestComponent />);

    expect(screen.getByText("false")).toBeInTheDocument();
  });

  test("corrects a stale sessionStorage value with the live matchMedia result", () => {
    sessionStorage.setItem(`${STORAGE_PREFIX}${NORMALIZED_QUERY}`, "true");
    mockMatchMedia(false);

    render(<TestComponent />);

    expect(screen.getByText("false")).toBeInTheDocument();
    expect(sessionStorage.getItem(`${STORAGE_PREFIX}${NORMALIZED_QUERY}`)).toBe(
      "false",
    );
  });

  test("updates sessionStorage when the media query changes", () => {
    mockMatchMedia(false);

    render(<TestComponent />);

    expect(sessionStorage.getItem(`${STORAGE_PREFIX}${NORMALIZED_QUERY}`)).toBe(
      "false",
    );

    act(() => {
      simulateMediaQueryChange(true);
    });

    expect(sessionStorage.getItem(`${STORAGE_PREFIX}${NORMALIZED_QUERY}`)).toBe(
      "true",
    );
  });

  test("handles sessionStorage being unavailable", () => {
    const getItemSpy = jest
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(() => {
        throw new Error("SecurityError");
      });
    const setItemSpy = jest
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("SecurityError");
      });

    mockMatchMedia(true);

    render(<TestComponent />);

    expect(screen.getByText("true")).toBeInTheDocument();

    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
  });

  test("returns undefined when sessionStorage has no cached value and no matchMedia yet", () => {
    mockMatchMedia(false);

    render(<TestComponent query="" />);

    expect(screen.getByText("undefined")).toBeInTheDocument();
  });
});

describe("query normalization", () => {
  test("normalizes whitespace variations to the same query", () => {
    mockMatchMedia(true);

    const { unmount } = render(<TestComponent query="(min-width:960px)" />);
    expect(screen.getByText("true")).toBeInTheDocument();
    unmount();

    render(<TestComponent query="( min-width:  960px )" />);
    expect(screen.getByText("true")).toBeInTheDocument();

    expect(sessionStorage.getItem(`${STORAGE_PREFIX}${NORMALIZED_QUERY}`)).toBe(
      "true",
    );
  });

  test("strips @media prefix before normalizing", () => {
    mockMatchMedia(true);

    render(<TestComponent query="@media (min-width:960px)" />);

    expect(screen.getByText("true")).toBeInTheDocument();
    expect(sessionStorage.getItem(`${STORAGE_PREFIX}${NORMALIZED_QUERY}`)).toBe(
      "true",
    );
  });
});
