import React from "react";
import { render, screen, act } from "@testing-library/react";

import useMediaQuery from ".";
import { mockMatchMedia } from "../../__spec_helper__/__internal__/test-utils";
import { simulateMediaQueryChange } from "../../__spec_helper__/mock-match-media";

const TestComponent = () => {
  const matchQuery = useMediaQuery("(min-width:960px)");
  return <span>{`${matchQuery}`}</span>;
};

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
