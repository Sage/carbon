import React from "react";
import TestRenderer from "react-test-renderer";
import { mount } from "enzyme";
import {
  assertStyleMatch,
  mockMatchMedia,
} from "../../../__spec_helper__/test-utils";
import { RadioButton, RadioButtonGroup } from ".";
import {
  StyledFieldset,
  StyledLegendContainer,
} from "../../../__internal__/fieldset/fieldset.style";
import RadioButtonGroupStyle from "./radio-button-group.style";
import Fieldset from "../../../__internal__/fieldset";
import Label from "../label";

const buttonValues = ["test-1", "test-2"];
const name = "test-group";

function render(props, renderer = TestRenderer.create) {
  const children = buttonValues.map((value, index) => (
    <RadioButton
      id={`rId-${index}`}
      key={`radio-key-${value}`}
      onChange={jest.fn()}
      value={value}
    />
  ));

  return renderer(
    <RadioButtonGroup
      name={name}
      legend="Test RadioButtonGroup Legend"
      onBlur={jest.fn()}
      onChange={jest.fn()}
      {...props}
    >
      {children}
    </RadioButtonGroup>
  );
}

describe("RadioButtonGroup", () => {
  it("renders as expected", () => {
    expect(render({})).toMatchSnapshot();
  });

  describe("with an inline legend", () => {
    describe("when adaptiveLegendBreakpoint prop is set", () => {
      describe("when screen bigger than breakpoint", () => {
        beforeEach(() => {
          mockMatchMedia(true);
        });

        it("should pass legendInline to Fieldset", () => {
          const wrapper = render(
            {
              legend: "Legend",
              legendInline: true,
              adaptiveLegendBreakpoint: 1000,
            },
            mount
          );

          expect(wrapper.find(Fieldset).props().inline).toEqual(true);
        });
      });

      describe("when screen smaller than breakpoint", () => {
        beforeEach(() => {
          mockMatchMedia(false);
        });

        it("should pass legendInline to Fieldset", () => {
          const wrapper = render(
            {
              legend: "Legend",
              legendInline: true,
              adaptiveLegendBreakpoint: 1000,
            },
            mount
          );

          expect(wrapper.find(Fieldset).props().inline).toEqual(false);
        });
      });
    });
  });

  describe("with a left margin (ml prop)", () => {
    describe("when adaptiveSpacingBreakpoint prop is set", () => {
      describe("when screen bigger than breakpoint", () => {
        beforeEach(() => {
          mockMatchMedia(true);
        });

        it("should pass the correct margin to Fieldset", () => {
          const wrapper = render(
            {
              legend: "Legend",
              legendInline: true,
              adaptiveSpacingBreakpoint: 1000,
              ml: "10%",
            },
            mount
          );

          expect(wrapper.find(Fieldset).props().ml).toEqual("10%");
        });
      });

      describe("when screen smaller than breakpoint", () => {
        beforeEach(() => {
          mockMatchMedia(false);
        });

        it('should pass "0" to Fieldset', () => {
          const wrapper = render(
            {
              legend: "Legend",
              legendInline: true,
              adaptiveSpacingBreakpoint: 1000,
              ml: "10%",
            },
            mount
          );

          expect(wrapper.find(Fieldset).props().ml).toEqual(undefined);
        });
      });
    });
  });

  describe("styles", () => {
    it("applies the correct Legend Container styles", () => {
      assertStyleMatch(
        {
          display: "flex",
        },
        mount(<RadioButtonGroupStyle inline />)
      );
    });
  });

  describe("validations", () => {
    it.each([
      ["error", "string"],
      ["error", true],
      ["warning", "string"],
      ["warning", true],
      ["info", "string"],
      ["info", true],
    ])(
      "when %s is passed as %s it is passed as boolean to RadioButton",
      (type, value) => {
        const wrapper = render({ [type]: value }, mount);
        wrapper
          .find(RadioButton)
          .forEach((node) => expect(node.props()[type]).toBe(true));
      }
    );
  });

  describe("style overrides", () => {
    let wrapper;
    const customStyleObject = {
      backgroundColor: "red",
      display: "flex",
      fontSize: "200px",
    };
    const styleOverride = {
      root: customStyleObject,
      content: customStyleObject,
      legend: customStyleObject,
    };

    beforeEach(() => {
      wrapper = render({ styleOverride }, mount);
    });

    it("renders root element with properly assigned styles", () => {
      assertStyleMatch(customStyleObject, wrapper.find(StyledFieldset));
    });

    it("renders content wrapper with properly assigned styles", () => {
      assertStyleMatch(customStyleObject, wrapper.find(RadioButtonGroupStyle));
    });

    it("renders legend element with properly assigned styles", () => {
      assertStyleMatch(customStyleObject, wrapper.find(StyledLegendContainer));
    });
  });

  describe("required", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <RadioButtonGroup name="radio" label="Group Label" required>
          <RadioButton label="off" value="test" />
          <RadioButton label="on" value="test" />
        </RadioButtonGroup>
      );
    });

    it("the required prop is passed to the inputs", () => {
      const inputs = wrapper.find("input");
      inputs.forEach((input) => {
        expect(input.prop("required")).toBe(true);
      });
    });

    it("the isRequired prop is not passed to the labels", () => {
      const labels = wrapper.find(Label);
      labels.forEach((label) => {
        expect(label.prop("isRequired")).toBe(undefined);
      });
    });

    it("the isRequired prop is passed to the fieldset", () => {
      const fieldset = wrapper.find(Fieldset);
      expect(fieldset.prop("isRequired")).toBe(true);
    });
  });
});
