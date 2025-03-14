import React from "react";
import { render, screen, act } from "@testing-library/react";
import useCharacterCount from ".";

interface TestComponentProps {
  value: string;
  characterLimit?: number;
}

const TestComponent = ({ value, characterLimit }: TestComponentProps) => {
  const [characterCount] = useCharacterCount(value, characterLimit);

  return <div>{characterCount}</div>;
};

const MOCK_VALUE = "test string";

test("shows characters left when input is shorter than the character limit", () => {
  const characterLimit = 10;
  const valueShorterThanLimit = "Test";
  const expectedText = "6 characters left";

  render(
    <TestComponent
      value={valueShorterThanLimit}
      characterLimit={characterLimit}
    />,
  );

  const elements = screen.getAllByText(expectedText);
  expect(elements.length).toBeGreaterThan(0);
});

test("shows characters too many when input is longer than the character limit", () => {
  const characterLimit = 10;
  const valueLongerThanLimit = "This is a long test string";
  const expectedCharactersOver = valueLongerThanLimit.length - characterLimit;
  const expectedText = `${expectedCharactersOver} ${
    expectedCharactersOver === 1 ? "character" : "characters"
  } too many`;

  render(
    <TestComponent
      value={valueLongerThanLimit}
      characterLimit={characterLimit}
    />,
  );

  const elements = screen.getAllByText(expectedText);
  expect(elements.length).toBeGreaterThan(0);
});

test("does not return a character counter when no character limit is set", () => {
  render(<TestComponent value={MOCK_VALUE} />);

  const characterCountElement = screen.queryByText(
    /characters left|characters too many/i,
  );

  expect(characterCountElement).not.toBeInTheDocument();
});

describe("Character count updates with debounce", () => {
  const TEST_VALUE = "foo";
  const CHARACTER_LIMIT = 5;

  beforeEach(() => jest.useFakeTimers());

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should update the visually hidden count to '2 characters left' after a delay of 2000ms", async () => {
    const { rerender } = render(
      <TestComponent value="" characterLimit={CHARACTER_LIMIT} />,
    );

    rerender(
      <TestComponent value={TEST_VALUE} characterLimit={CHARACTER_LIMIT} />,
    );
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const elements = screen.getAllByText("2 characters left");
    expect(elements.length).toBeGreaterThan(0);
  });

  it("should maintain the visually hidden count as '5 characters left' before a delay of 2000ms", async () => {
    const { rerender } = render(
      <TestComponent value="" characterLimit={CHARACTER_LIMIT} />,
    );

    rerender(
      <TestComponent value={TEST_VALUE} characterLimit={CHARACTER_LIMIT} />,
    );
    act(() => {
      jest.advanceTimersByTime(100);
    });

    const elements = screen.getAllByText("5 characters left");
    expect(elements.length).toBeGreaterThan(0);
  });
});
