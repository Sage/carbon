import React from "react";
import { render, screen } from "@testing-library/react";

import useMediaQuery from ".";
import { mockMatchMedia } from "../../__spec_helper__/__internal__/test-utils";

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
