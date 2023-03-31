import * as React from "react";
import { mount, MountRendererProps } from "enzyme";
import CharacterCount from "../../../__internal__/character-count";
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
      expect(wrapper.find(CharacterCount).text()).toBe(
        `${
          limitMinusVlaue
            ? `You have ${
                characterLimit - mockValue.length
              } ${underCharacters} remaining`
            : `You have ${
                mockValue.length - characterLimit
              } ${overCharacters} too many`
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
      expect(wrapper.find(CharacterCount).text()).toBe(
        `${
          limitMinusVlaue
            ? `You have ${
                characterLimit - mockValue.length
              } ${underCharacters} remaining`
            : `You have ${
                mockValue.length - characterLimit
              } ${overCharacters} too many`
        }`
      );
    }
  );

  it("does not return a counter and no maxLength", () => {
    const wrapper = render({
      value: mockValue,
    });

    expect(wrapper.find('[data-element="max-length"]').text()).toBe("");
    expect(wrapper.find(CharacterCount).exists()).toBe(false);
  });
});
