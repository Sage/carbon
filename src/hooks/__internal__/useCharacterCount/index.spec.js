import * as React from "react";
import { mount } from "enzyme";

import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import CharacterCount from "../../../__internal__/character-count";
import I18nProvider from "../../../components/i18n-provider";
import baseTheme from "../../../style/themes/base";
import useCharacterCount from ".";

const TestComponent = ({
  value,
  characterLimit,
  warnOverLimit,
  enforceCharacterLimit,
}) => {
  const [maxLength, characterCount] = useCharacterCount(
    value,
    characterLimit,
    warnOverLimit,
    enforceCharacterLimit
  );

  return (
    <>
      {characterCount}
      <span data-element="max-length">{maxLength}</span>
    </>
  );
};

const render = (props, params) => mount(<TestComponent {...props} />, params);
const mockValue = "test string";

describe("useCharacterCount", () => {
  it("returns a counter and no maxLength", () => {
    const wrapper = render({
      value: mockValue,
      characterLimit: "100",
      enforceCharacterLimit: false,
    });

    expect(wrapper.find('[data-element="max-length"]').text()).toBe("");
    expect(wrapper.find(CharacterCount).text()).toBe(`${mockValue.length}/100`);
  });

  it("returns a counter and maxLength", () => {
    const wrapper = render({
      value: mockValue,
      characterLimit: "100",
      enforceCharacterLimit: true,
    });

    expect(wrapper.find('[data-element="max-length"]').text()).toBe("100");
    expect(wrapper.find(CharacterCount).text()).toBe(`${mockValue.length}/100`);
  });

  it("returns a counter with an overlimit warning", () => {
    const wrapper = render({
      value: mockValue,
      characterLimit: "10",
      warnOverLimit: true,
      enforceCharacterLimit: false,
    });

    assertStyleMatch(
      {
        color: baseTheme.colors.error,
      },
      wrapper
    );
  });

  it("does not return a counter and no maxLength", () => {
    const wrapper = render({
      value: mockValue,
    });

    expect(wrapper.find('[data-element="max-length"]').text()).toBe("");
    expect(wrapper.find(CharacterCount).exists()).toBe(false);
  });

  describe("i18n", () => {
    it.each([
      ["en-GB", "0/1,000,000"],
      ["fr-FR", "0/1 000 000"],
    ])("displays %s format", (locale, limit) => {
      const wrapper = render(
        {
          value: "",
          characterLimit: "1000000",
        },
        {
          wrappingComponent: I18nProvider,
          wrappingComponentProps: {
            locale: {
              locale: () => locale,
            },
          },
        }
      );

      expect(wrapper.find(CharacterCount).text()).toBe(limit);
    });
  });
});
