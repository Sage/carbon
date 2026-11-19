import React from "react";
import { render, screen } from "@testing-library/react";

import createStrictContext from "./createStrictContext";

const [CardProvider, useCardContext] = createStrictContext<{ title: string }>({
  name: "CardContext",
  errorMessage:
    "Context is undefined. Make sure to wrap your component with <CardProvider />",
});

const CardHeader = () => {
  const { title } = useCardContext();
  return <h3>{title}</h3>;
};

test("error is thrown when context is accessed outside of provider", () => {
  const consoleErrorSpy = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  expect(() => render(<CardHeader />)).toThrow(
    "Context is undefined. Make sure to wrap your component with <CardProvider />",
  );

  consoleErrorSpy.mockRestore();
});

test("error is not thrown when context is accessed within the provider", () => {
  render(
    <CardProvider value={{ title: "Fruits" }}>
      <CardHeader />
    </CardProvider>,
  );
});

test("accessor hook returns context value, when called within the provider", () => {
  render(
    <CardProvider value={{ title: "Fruits" }}>
      <CardHeader />
    </CardProvider>,
  );

  expect(screen.getByRole("heading")).toHaveTextContent("Fruits");
});
