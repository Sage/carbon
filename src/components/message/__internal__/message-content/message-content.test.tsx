import React from "react";
import { render, screen } from "@testing-library/react";
import MessageContent from "./message-content.component";

test("renders with expected padding when `showCloseIcon` is true", () => {
  render(<MessageContent showCloseIcon>Message</MessageContent>);

  expect(screen.getByTestId("message-content")).toHaveStyle({
    padding: "15px 50px 15px 20px",
  });
});

test("renders with expected padding when `showCloseIcon` is false", () => {
  render(<MessageContent showCloseIcon={false}>Message</MessageContent>);

  expect(screen.getByTestId("message-content")).toHaveStyle({
    padding: "15px 20px 15px 20px",
  });
});
