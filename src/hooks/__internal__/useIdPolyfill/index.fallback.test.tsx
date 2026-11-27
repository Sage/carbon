import React from "react";
import { render, screen } from "@testing-library/react";
import useIdPolyfill from "./index";

jest.mock("react", () => {
  const actual = jest.requireActual("react");
  return { ...actual, useId: undefined };
});

const MockComponent = () => {
  const id = useIdPolyfill();
  return <span data-role="id" data-id={id} />;
};

test("falls back to a stable generated guid when useId is unavailable", () => {
  const { rerender } = render(<MockComponent />);
  const id = screen.getByTestId("id").getAttribute("data-id");

  expect(id).toMatch(/^carbon-/);

  rerender(<MockComponent />);

  expect(screen.getByTestId("id")).toHaveAttribute("data-id", id);
});
