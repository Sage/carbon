import * as React from "react";
import { mount, MountRendererProps } from "enzyme";
import {
  StyledCharacterCount,
  VisuallyHiddenCharacterCount,
} from "../../../__internal__/character-count/character-count.style";
import useCharacterCount from ".";

interface TestComponentProps {
  value: string;
  characterLimit?: number;
  enforceCharacterLimit?: boolean;
}

const TestComponent = ({
  value,
  characterLimit,
  enforceCharacterLimit,
}: TestComponentProps) => {
  const [maxLength, characterCount] = useCharacterCount(
    value,
    characterLimit,
    enforceCharacterLimit
  );

  return (
    <>
      {characterCount}
      <span data-element="max-length">{maxLength}</span>
    </>
  );
};

const render = (props: TestComponentProps, params?: MountRendererProps) =>
  mount(<TestComponent {...props} />, params);
const mockValue = "test string";

describe("useCharacterCount", () => {
  it.each([5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])(
    "returns a counter and no maxLength",
    (characterLimit) => {
      const limitMinusVlaue = characterLimit - mockValue.length >= 0;
      const underCharacters =
        characterLimit - mockValue.length === 1 ? "character" : "characters";
      const overCharacters =
        mockValue.length - characterLimit === 1 ? "character" : "characters";
      const wrapper = render({
        value: mockValue,
        characterLimit,
        enforceCharacterLimit: false,
      });

      expect(wrapper.find('[data-element="max-length"]').text()).toBe("");
      expect(wrapper.find(StyledCharacterCount).text()).toBe(
        `${
          limitMinusVlaue
            ? `${characterLimit - mockValue.length} ${underCharacters} left`
            : `${mockValue.length - characterLimit} ${overCharacters} too many`
        }`
      );
    }
  );

  it.each([5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])(
    "returns a counter and maxLength",
    (characterLimit) => {
      const limitMinusVlaue = characterLimit - mockValue.length >= 0;
      const underCharacters =
        characterLimit - mockValue.length === 1 ? "character" : "characters";
      const overCharacters =
        mockValue.length - characterLimit === 1 ? "character" : "characters";
      const wrapper = render({
        value: mockValue,
        characterLimit,
        enforceCharacterLimit: true,
      });

      expect(wrapper.find('[data-element="max-length"]').text()).toBe(
        `${characterLimit}`
      );
      expect(wrapper.find(StyledCharacterCount).text()).toBe(
        `${
          limitMinusVlaue
            ? `${characterLimit - mockValue.length} ${underCharacters} left`
            : `${mockValue.length - characterLimit} ${overCharacters} too many`
        }`
      );
    }
  );

  it("does not return a counter and no maxLength", () => {
    const wrapper = render({
      value: mockValue,
    });

    expect(wrapper.find('[data-element="max-length"]').text()).toBe("");
    expect(wrapper.find(StyledCharacterCount).exists()).toBe(false);
  });
});

describe("Debounce tests", () => {
  it("visually hidden count should update after 2000ms delay", () => {
    jest.useFakeTimers();

    const wrapper = render({
      value: "",
      characterLimit: 5,
      enforceCharacterLimit: true,
    });

    wrapper.setProps({ value: "foo" });

    jest.advanceTimersByTime(2000);

    expect(wrapper.find(VisuallyHiddenCharacterCount).text()).toBe(
      "2 characters left"
    );
  });

  it("visually hidden count should not update before 2000ms delay", () => {
    jest.useFakeTimers();

    const wrapper = render({
      value: "",
      characterLimit: 5,
      enforceCharacterLimit: true,
    });

    wrapper.setProps({ value: "foo" });

    jest.advanceTimersByTime(100);

    expect(wrapper.find(VisuallyHiddenCharacterCount).text()).toBe(
      "5 characters left"
    );
  });
});
