import React from "react";
import { render, screen } from "@testing-library/react";
import CharacterCount from ".";

test("visible character count is visible", () => {
  render(<CharacterCount value={10} limit={5} isOverLimit={false} />);

  const visibleCharacterCount = screen.getByTestId("character-count");
  expect(visibleCharacterCount).toBeVisible();
});

test("visible character count renders with the 'aria-hidden' attribute", () => {
  render(<CharacterCount value={5} limit={10} isOverLimit={false} />);

  const visibleCharacterCount = screen.getByTestId("character-count");
  expect(visibleCharacterCount).toHaveAttribute("aria-hidden", "true");
});

test("visible character count renders with '{count} character(s) left' text content", () => {
  render(<CharacterCount value={5} limit={10} isOverLimit={false} />);

  const visibleCharacterCount = screen.getByTestId("character-count");
  expect(visibleCharacterCount).toHaveTextContent("5 characters left");
});

test("visible character count renders with '{count} character(s) too many' text content when `isOverLimit` prop is true", () => {
  render(<CharacterCount value={10} limit={5} isOverLimit />);

  const visuallyHiddenHint = screen.getByTestId("character-count");
  expect(visuallyHiddenHint).toHaveTextContent("5 characters too many");
});

test("visually hidden character counter is visually hidden", () => {
  render(<CharacterCount value={5} limit={10} isOverLimit={false} />);

  const visuallyHiddenCharacterCount = screen.getByTestId(
    "visually-hidden-character-count",
  );
  expect(visuallyHiddenCharacterCount).toHaveStyle({
    clipPath: "inset(50%)",
    height: "1px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "1px",
  });
});

test("visually hidden character count renders with the 'aria-live' attribute set to 'off'", () => {
  render(<CharacterCount value={5} limit={10} isOverLimit={false} />);

  const visuallyHiddenCharacterCount = screen.getByTestId(
    "visually-hidden-character-count",
  );
  expect(visuallyHiddenCharacterCount).toHaveAttribute("aria-live", "off");
});

test("visually hidden character count renders with the 'aria-live' attribute set to 'polite' when the `ariaLive` prop is 'polite'", () => {
  render(
    <CharacterCount
      value={5}
      limit={10}
      isOverLimit={false}
      ariaLive="polite"
    />,
  );

  const visuallyHiddenCharacterCount = screen.getByTestId(
    "visually-hidden-character-count",
  );
  expect(visuallyHiddenCharacterCount).toHaveAttribute("aria-live", "polite");
});

test("visually hidden character count renders with '{count} character(s) left' text content", () => {
  render(<CharacterCount value={5} limit={10} isOverLimit={false} />);

  const visuallyHiddenCharacterCount = screen.getByTestId(
    "visually-hidden-character-count",
  );
  expect(visuallyHiddenCharacterCount).toHaveTextContent("5 characters left");
});

test("visually hidden character count renders with '{count} character(s) too many' text content when `isDebouncedOverLimit` prop is true", () => {
  render(
    <CharacterCount
      value={10}
      limit={5}
      isOverLimit={false}
      isDebouncedOverLimit
    />,
  );

  const visuallyHiddenHint = screen.getByTestId(
    "visually-hidden-character-count",
  );
  expect(visuallyHiddenHint).toHaveTextContent("5 characters too many");
});

test("visually hidden hint is visually hidden", () => {
  render(<CharacterCount value={5} limit={10} isOverLimit={false} />);

  const visuallyHiddenHint = screen.getByTestId("visually-hidden-hint");
  expect(visuallyHiddenHint).toHaveStyle({
    clipPath: "inset(50%)",
    height: "1px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "1px",
  });
});

test("visually hidden hint renders with 'you can enter up to {count} character(s)' text content", () => {
  render(<CharacterCount value={5} limit={10} isOverLimit={false} />);

  const visuallyHiddenHint = screen.getByTestId("visually-hidden-hint");
  expect(visuallyHiddenHint).toHaveTextContent(
    "You can enter up to 10 characters",
  );
});
