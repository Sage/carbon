import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Navbar from "./navbar.component";

test("should call `onPreviousClick` when the user clicks the previous button", async () => {
  const user = userEvent.setup();
  const onPreviousClick = jest.fn();
  const onNextClick = jest.fn();
  render(
    <Navbar
      onPreviousClick={onPreviousClick}
      onNextClick={onNextClick}
      className="custom-class"
    />,
  );
  const prevButton = screen.getByRole("button", { name: "Previous month" });
  await user.click(prevButton);

  expect(onPreviousClick).toHaveBeenCalledTimes(1);
});

test("should call `onNextClick` when the user clicks the next button", async () => {
  const user = userEvent.setup();
  const onPreviousClick = jest.fn();
  const onNextClick = jest.fn();
  render(
    <Navbar
      onPreviousClick={onPreviousClick}
      onNextClick={onNextClick}
      className="custom-class"
    />,
  );
  const nextButton = screen.getByRole("button", { name: "Next month" });
  await user.click(nextButton);

  expect(onNextClick).toHaveBeenCalledTimes(1);
});

test("should apply the custom class passed via `className` prop", () => {
  render(
    <Navbar
      onPreviousClick={jest.fn()}
      onNextClick={jest.fn()}
      className="custom-class"
    />,
  );

  expect(screen.getByTestId("date-navbar")).toHaveClass("custom-class");
});

test("should apply the expected aria-labels to the button controls", () => {
  render(<Navbar onPreviousClick={jest.fn()} onNextClick={jest.fn()} />);
  const prevButton = screen.getByRole("button", { name: "Previous month" });
  const nextButton = screen.getByRole("button", { name: "Next month" });

  expect(prevButton).toHaveAttribute("aria-label", "Previous month");
  expect(nextButton).toHaveAttribute("aria-label", "Next month");
});

test("should not change the current month when 'arrowdown' key is pressed and previous button is focused", async () => {
  const user = userEvent.setup();
  const onPreviousClick = jest.fn();
  render(<Navbar onPreviousClick={onPreviousClick} onNextClick={jest.fn()} />);
  const prevButton = screen.getByRole("button", { name: "Previous month" });
  prevButton.focus();
  await user.keyboard("{arrowdown}");

  expect(onPreviousClick).not.toHaveBeenCalled();
});

test("should not change the current month when 'arrowup' key is pressed and previous button is focused", async () => {
  const user = userEvent.setup();
  const onPreviousClick = jest.fn();
  render(<Navbar onPreviousClick={onPreviousClick} onNextClick={jest.fn()} />);
  const prevButton = screen.getByRole("button", { name: "Previous month" });
  prevButton.focus();
  await user.keyboard("{arrowup}");

  expect(onPreviousClick).not.toHaveBeenCalled();
});

test("should not change the current month when 'arrowleft' key is pressed and previous button is focused", async () => {
  const user = userEvent.setup();
  const onPreviousClick = jest.fn();
  render(<Navbar onPreviousClick={onPreviousClick} onNextClick={jest.fn()} />);
  const prevButton = screen.getByRole("button", { name: "Previous month" });
  prevButton.focus();
  await user.keyboard("{arrowleft}");

  expect(onPreviousClick).not.toHaveBeenCalled();
});

test("should not change the current month when 'arrowright' key is pressed and previous button is focused", async () => {
  const user = userEvent.setup();
  const onPreviousClick = jest.fn();
  render(<Navbar onPreviousClick={onPreviousClick} onNextClick={jest.fn()} />);
  const prevButton = screen.getByRole("button", { name: "Previous month" });
  prevButton.focus();
  await user.keyboard("{arrowright}");

  expect(onPreviousClick).not.toHaveBeenCalled();
});

test("should not change the current month when 'arrowdown' key is pressed and next button is focused", async () => {
  const user = userEvent.setup();
  const onNextClick = jest.fn();
  render(<Navbar onPreviousClick={jest.fn()} onNextClick={onNextClick} />);
  const nextButton = screen.getByRole("button", { name: "Next month" });
  nextButton.focus();
  await user.keyboard("{arrowdown}");

  expect(onNextClick).not.toHaveBeenCalled();
});

test("should not change the current month when 'arrowup' key is pressed and next button is focused", async () => {
  const user = userEvent.setup();
  const onNextClick = jest.fn();
  render(<Navbar onPreviousClick={jest.fn()} onNextClick={onNextClick} />);
  const nextButton = screen.getByRole("button", { name: "Next month" });
  nextButton.focus();
  await user.keyboard("{arrowup}");

  expect(onNextClick).not.toHaveBeenCalled();
});

test("should not change the current month when 'arrowleft' key is pressed and next button is focused", async () => {
  const user = userEvent.setup();
  const onNextClick = jest.fn();
  render(<Navbar onPreviousClick={jest.fn()} onNextClick={onNextClick} />);
  const nextButton = screen.getByRole("button", { name: "Next month" });
  nextButton.focus();
  await user.keyboard("{arrowleft}");

  expect(onNextClick).not.toHaveBeenCalled();
});

test("should not change the current month when 'arrowright' key is pressed and next button is focused", async () => {
  const user = userEvent.setup();
  const onNextClick = jest.fn();
  render(<Navbar onPreviousClick={jest.fn()} onNextClick={onNextClick} />);
  const nextButton = screen.getByRole("button", { name: "Next month" });
  nextButton.focus();
  await user.keyboard("{arrowright}");

  expect(onNextClick).not.toHaveBeenCalled();
});

test("should change the current month when 'Enter' key is pressed and previous button is focused", async () => {
  const user = userEvent.setup();
  const onPreviousClick = jest.fn();

  render(<Navbar onPreviousClick={onPreviousClick} onNextClick={jest.fn()} />);
  const prevButton = screen.getByRole("button", { name: "Previous month" });
  prevButton.focus();
  await user.keyboard("{Enter}");

  expect(onPreviousClick).toHaveBeenCalled();
});

test("should change the current month when ' ' (Space) key is pressed and previous button is focused", async () => {
  const user = userEvent.setup();
  const onPreviousClick = jest.fn();
  render(<Navbar onPreviousClick={onPreviousClick} onNextClick={jest.fn()} />);
  const prevButton = screen.getByRole("button", { name: "Previous month" });
  prevButton.focus();
  await user.keyboard(" ");

  expect(onPreviousClick).toHaveBeenCalled();
});

test("should change the current month when 'Enter' key is pressed and next button is focused", async () => {
  const user = userEvent.setup();
  const onNextClick = jest.fn();
  render(<Navbar onPreviousClick={jest.fn()} onNextClick={onNextClick} />);
  const nextButton = screen.getByRole("button", { name: "Next month" });
  nextButton.focus();
  await user.keyboard("{Enter}");

  expect(onNextClick).toHaveBeenCalled();
});

test("should change the current month when Space key is pressed and next button is focused", async () => {
  const user = userEvent.setup();
  const onNextClick = jest.fn();
  render(<Navbar onPreviousClick={jest.fn()} onNextClick={onNextClick} />);
  const nextButton = screen.getByRole("button", { name: "Next month" });
  nextButton.focus();
  await user.keyboard(" ");

  expect(onNextClick).toHaveBeenCalled();
});
