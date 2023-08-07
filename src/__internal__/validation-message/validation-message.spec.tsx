import React from "react";
import { mount } from "enzyme";
import ValidationMessage from ".";
import StyledValidationMessage from "./validation-message.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import { ValidationMessageProps } from "./validation-message.component";

const render = (props: ValidationMessageProps) =>
  mount(<ValidationMessage {...props} />);

const validationWithStrings = [
  ["error", "warning"],
  [undefined, "warning"],
];
const validationWithBooleans: (string | boolean | undefined)[][] = [
  [true, "string"],
  [undefined, true],
];

const computeId = (id?: string) => (id === "warning" ? "warningText" : id);

const addColorId = (arr: (string | undefined)[][]) =>
  arr.map((subArr) => [...subArr, computeId(subArr[0] || subArr[1])]);

describe("ValidationMessage component", () => {
  let wrapper;

  it.each(addColorId(validationWithStrings))(
    "applies the expected styling when passed error string equals `%s` and warning string equals `%s`",
    (error, warning) => {
      wrapper = render({ error, warning });

      assertStyleMatch(
        {
          color: error
            ? "var(--colorsSemanticNegative500)"
            : "var(--colorsSemanticCaution600)",
          fontWeight: error ? "bold" : "normal",
          marginTop: "0px",
          marginBottom: "8px",
        },
        wrapper.find(StyledValidationMessage)
      );
    }
  );

  it.each(validationWithStrings)(
    "renders the expected message when passed error string equals `%s` and warning string equals `%s`",
    (error, warning) => {
      wrapper = render({ error, warning });
      const expected = error || warning;

      expect(wrapper.text()).toEqual(expected);
    }
  );

  it.each(validationWithBooleans)(
    "does not render message when passed error is `%s` and warning is `%s`",
    (error, warning) => {
      wrapper = render({ error, warning });
      expect(wrapper.text()).toEqual("");
    }
  );

  it("does not render message when no props passed", () => {
    wrapper = render({});
    expect(wrapper.text()).toEqual("");
  });

  it("validationId should be passed to the message", () => {
    const mockId = "foo";
    wrapper = render({ validationId: mockId, error: "bar" });

    expect(wrapper.find(StyledValidationMessage).prop("id")).toEqual(mockId);
  });
});
