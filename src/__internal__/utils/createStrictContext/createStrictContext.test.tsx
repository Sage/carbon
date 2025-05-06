import React from "react";
import { render, screen } from "@testing-library/react";
import Logger from "../logger";

import createStrictContext from "./createStrictContext";

const [CardProvider, useCardContext] = createStrictContext<{ title: string }>({
  name: "CardContext",
  defaultValue: { title: "" },
  errorMessage:
    "Context is undefined. Make sure to wrap your component with <CardProvider />",
});

const CardHeader = () => {
  const { title } = useCardContext();
  return <h3>{title}</h3>;
};

test("error is logged when context is accessed outside of provider", () => {
  const loggerSpy = jest.spyOn(Logger, "error").mockImplementation(() => {});

  render(<CardHeader />);

  expect(Logger.error).toHaveBeenCalledWith(
    "Context is undefined. Make sure to wrap your component with <CardProvider />\nThis logged warning will become a thrown error in a future major release.",
  );

  loggerSpy.mockRestore();
});

test("accessor hook returns defaultValue as a fallback, when called outside of the provider", () => {
  const loggerSpy = jest.spyOn(Logger, "error").mockImplementation(() => {});

  render(<CardHeader />);

  expect(screen.getByRole("heading")).toHaveTextContent("");

  loggerSpy.mockRestore();
});

test("error is not logged when context is accessed within the provider", () => {
  const loggerSpy = jest.spyOn(Logger, "error");

  render(
    <CardProvider value={{ title: "Fruits" }}>
      <CardHeader />
    </CardProvider>,
  );

  expect(Logger.error).not.toHaveBeenCalled();

  loggerSpy.mockRestore();
});

test("accessor hook returns context value, when called within the provider", () => {
  render(
    <CardProvider value={{ title: "Fruits" }}>
      <CardHeader />
    </CardProvider>,
  );

  expect(screen.getByRole("heading")).toHaveTextContent("Fruits");
});
