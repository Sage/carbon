import * as React from "react";
import { mount, MountRendererProps } from "enzyme";
import { act } from "react-dom/test-utils";
import {
  StyledCharacterCount,
  VisuallyHiddenCharacterCount,
} from "../../../__internal__/character-count/character-count.style";
import useCharacterCount from ".";

interface TestComponentProps {
  value: string;
  characterLimit?: number;
}

const TestComponent = ({ value, characterLimit }: TestComponentProps) => {
  const [characterCount] = useCharacterCount(value, characterLimit);

  return characterCount;
};

const render = (props: TestComponentProps, params?: MountRendererProps) =>
  mount(<TestComponent {...props} />, params);
const mockValue = "test string";

describe("useCharacterCount", () => {
  it.each([5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])(
    "returns a character counter",
    (characterLimit) => {
      const limitMinusValue = characterLimit - mockValue.length >= 0;
      const underCharacters =
        characterLimit - mockValue.length === 1 ? "character" : "characters";
      const overCharacters =
        mockValue.length - characterLimit === 1 ? "character" : "characters";
      const wrapper = render({
        value: mockValue,
        characterLimit,
      });

      expect(wrapper.find(StyledCharacterCount).text()).toBe(
        `${
          limitMinusValue
            ? `${characterLimit - mockValue.length} ${underCharacters} left`
            : `${mockValue.length - characterLimit} ${overCharacters} too many`
        }`
      );
    }
  );

  it("does not return a counter", () => {
    const wrapper = render({
      value: mockValue,
    });

    expect(wrapper.find(StyledCharacterCount).exists()).toBe(false);
  });
});

describe("Debounce tests", () => {
  beforeEach(() => jest.useFakeTimers());

  afterEach(() => {
    jest.useRealTimers();
  });

  it("visually hidden count should update after 2000ms delay", () => {
    const wrapper = render({
      value: "",
      characterLimit: 5,
    });

    wrapper.setProps({ value: "foo" });
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(wrapper.update().find(VisuallyHiddenCharacterCount).text()).toBe(
      "2 characters left"
    );
  });

  it("visually hidden count should not update before 2000ms delay", () => {
    const wrapper = render({
      value: "",
      characterLimit: 5,
    });

    wrapper.setProps({ value: "foo" });
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(wrapper.update().find(VisuallyHiddenCharacterCount).text()).toBe(
      "5 characters left"
    );
  });
});
