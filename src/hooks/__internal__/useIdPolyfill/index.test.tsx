import React from "react";
import { render, screen } from "@testing-library/react";
import useIdPolyfill from "./index";

const MockComponent = () => {
  const id = useIdPolyfill();
  return <span data-role="id" data-id={id} />;
};

test("returns a stable, non-empty id across renders", () => {
  const { rerender } = render(<MockComponent />);
  const id = screen.getByTestId("id").getAttribute("data-id");

  expect(id).toBeTruthy();

  rerender(<MockComponent />);

  expect(screen.getByTestId("id")).toHaveAttribute("data-id", id);
});
