import React from "react";
import { render, screen, within } from "@testing-library/react";
import getInertProps from ".";

test("adds and removes inert when its state changes", () => {
  const { rerender } = render(
    <button {...getInertProps(false)}>Action</button>,
  );
  const button = screen.getByText("Action");
  expect(button).not.toHaveAttribute("inert");

  rerender(<button {...getInertProps(true)}>Action</button>);
  expect(button).toHaveAttribute("inert", "");

  rerender(<button {...getInertProps(false)}>Action</button>);
  expect(button).not.toHaveAttribute("inert");
});

test("hydrates a server-rendered inert attribute and removes it on update", () => {
  const container = document.createElement("div");
  container.innerHTML = '<button inert="">Action</button>';
  const { rerender } = render(
    <button {...getInertProps(true)}>Action</button>,
    { container, hydrate: true },
  );
  const button = within(container).getByText("Action");
  expect(button).toHaveAttribute("inert", "");

  rerender(<button {...getInertProps(false)}>Action</button>);
  expect(button).not.toHaveAttribute("inert");
});
