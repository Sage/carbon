import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { shallow, mount, ReactWrapper } from "enzyme";

import sageTheme from "../../style/themes/sage";
import RadioButtonMapper, {
  MappedChildProps,
  RadioButtonMapperProps,
} from "./radio-button-mapper.component";
import { RadioButton } from "../../components/radio-button";
import Button from "../../components/button";

const buttonValues = ["test-1", "test-2"];
const name = "test-group";

const Controller = ({
  groupProps,
  secondRadioProps,
}: {
  groupProps: Partial<RadioButtonMapperProps>;
  secondRadioProps: Partial<MappedChildProps>;
}) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <>
      <RadioButtonMapper
        name={name}
        onBlur={(e) => {
          setValue(e.target.value);
        }}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        {...groupProps}
      >
        <RadioButton name="one" value="one" />
        <RadioButton name="two" value="two" {...secondRadioProps} />
        <RadioButton name="three" value="three" />
      </RadioButtonMapper>
      <Button
        onClick={() => {
          setValue("one");
        }}
      >
        Set One
      </Button>
      <Button
        onClick={() => {
          setValue("two");
        }}
      >
        Set Two
      </Button>
    </>
  );
};

function render(props: Partial<RadioButtonMapperProps>, theme = sageTheme) {
  const children = buttonValues.map((value, index) => (
    <RadioButton
      id={`rId-${index}`}
      key={`radio-key-${value}`}
      onChange={jest.fn()}
      value={value}
    />
  ));

  return mount(
    <ThemeProvider theme={theme}>
      <RadioButtonMapper
        name={name}
        onBlur={jest.fn()}
        onChange={jest.fn()}
        {...props}
      >
        {children}
      </RadioButtonMapper>
    </ThemeProvider>
  );
}

function renderControlled(groupProps = {}, secondRadioProps = {}) {
  return mount(<Controller {...{ groupProps, secondRadioProps }} />);
}

function renderUncontrolled(
  groupProps: Partial<RadioButtonMapperProps> = {},
  secondRadioProps: Partial<MappedChildProps> = {}
) {
  return mount(
    <RadioButtonMapper
      name="radio-button-group"
      onChange={jest.fn()}
      {...groupProps}
    >
      <RadioButton value="one" />
      <RadioButton value="two" {...secondRadioProps} />
      <RadioButton value="three" />
    </RadioButtonMapper>
  );
}

function getRadioButtons(wrapper: ReactWrapper) {
  return wrapper.find(RadioButton);
}

function getButtons(wrapper: ReactWrapper) {
  return wrapper.find(Button);
}

describe("RadioButtonMapper", () => {
  it("accepts empty children", () => {
    expect(() => {
      mount(
        <RadioButtonMapper name={name}>
          {null}
          {false}
          {undefined}
        </RadioButtonMapper>
      );
    }).not.toThrow();
  });

  describe("child RadioButton prop / key mapping", () => {
    const wrapper = render({});
    const buttons = getRadioButtons(wrapper);
    const buttonArray = buttons.getElements();

    describe.each(buttonArray)("buttons[%#]", (button) => {
      const index = buttonArray.indexOf(button);

      describe("key / value (both derived from value prop)", () => {
        const expectedValue = buttonValues[index];
        const expectedKey = `.$radio-key-${expectedValue}`;

        it(`sets the value to ${expectedValue}`, () => {
          expect(button.props.value).toEqual(expectedValue);
        });

        it(`sets the key to ${expectedKey}`, () => {
          expect(button.key).toEqual(expectedKey);
        });
      });

      describe("name", () => {
        it("is set using the RadioButtonMapper name prop", () => {
          const buttonWrapper = buttons.at(buttonArray.indexOf(button));
          const input = buttonWrapper.find("input").getDOMNode();

          expect(input.getAttribute("name")).toEqual(name);
        });
      });
    });

    describe("selected button state", () => {
      describe("initial", () => {
        it("sets checked to false for both buttons", () => {
          buttonArray.forEach((button) => {
            expect(button.props.checked).toBe(false);
          });
        });
      });

      describe("defaultChecked", () => {
        it("sets a child radio button to checked when the prop is set programatically", () => {
          const radioGroup = shallow(
            <RadioButtonMapper name={name}>
              <RadioButton defaultChecked value="foo" />
            </RadioButtonMapper>
          );

          const button = radioGroup.find(RadioButton);
          expect(button.props().checked).toBe(true);
        });
      });

      describe.each(buttonArray)("when buttons[%#] has changed", (button) => {
        const index = buttonArray.indexOf(button);
        const otherIndex = index ? 0 : 1;
        let buttonWrapper = buttons.at(index);
        let otherButtonWrapper = buttons.at(otherIndex);
        const inputWrapper = buttonWrapper.find("input");
        const target = inputWrapper.instance();

        inputWrapper.simulate("change", { target });
        wrapper.update();

        buttonWrapper = getRadioButtons(wrapper).at(index);
        otherButtonWrapper = getRadioButtons(wrapper).at(otherIndex);

        it("sets checked === true when it is changed", () => {
          expect(buttonWrapper.props().checked).toBe(true);
          expect(otherButtonWrapper.props().checked).toBe(false);
        });

        it("sets checked === false when the other button is selected", () => {
          const otherInputWrapper = otherButtonWrapper.find("input");
          const otherTarget = otherInputWrapper.instance();

          otherInputWrapper.simulate("change", { target: otherTarget });
          wrapper.update();

          buttonWrapper = getRadioButtons(wrapper).at(index);
          otherButtonWrapper = getRadioButtons(wrapper).at(otherIndex);

          expect(buttonWrapper.props().checked).toBe(false);
          expect(otherButtonWrapper.props().checked).toBe(true);
        });
      });
    });
  });

  describe("defaultChecked", () => {
    it("sets a child radio button to checked when the prop is set programatically", () => {
      const radioGroup = mount(
        <RadioButtonMapper name={name}>
          <RadioButton defaultChecked name="foo" value="foo" />
          <RadioButton name="bar" value="bar" />
        </RadioButtonMapper>
      );

      const button = getRadioButtons(radioGroup).at(0);
      expect(button.prop("checked")).toBe(true);
    });
  });

  describe.each([
    ["controlled", renderControlled],
    ["uncontrolled", renderUncontrolled],
  ])("%s", (type, renderer) => {
    it("none of the radio buttons are checked by default", () => {
      const wrapper = renderer();
      const radio = getRadioButtons(wrapper);
      expect(radio.at(0).prop("checked")).toBe(false);
      expect(radio.at(1).prop("checked")).toBe(false);
      expect(radio.at(2).prop("checked")).toBe(false);
    });

    describe("onBlur function", () => {
      const onBlur = jest.fn();
      const wrapper = renderer({ onBlur });
      const radioButtons = getRadioButtons(wrapper);

      it.each(radioButtons.getElements())(
        "is passed down to RadioButton[%#]",
        (radioButton) => {
          expect(radioButton.props.onBlur).toBe(onBlur);
        }
      );
    });
  });

  describe("controlled", () => {
    it("changing the value checks the appropraite radio button", () => {
      const wrapper = renderControlled();
      const buttons = getButtons(wrapper);

      buttons.at(0).simulate("click");

      const radio = getRadioButtons(wrapper);
      expect(radio.at(0).prop("checked")).toBe(true);
      expect(radio.at(1).prop("checked")).toBe(false);
      expect(radio.at(2).prop("checked")).toBe(false);
    });
  });

  describe("uncontrolled", () => {
    it("clicking a value checks the appropraite radio button", () => {
      const wrapper = renderUncontrolled();
      let radio = getRadioButtons(wrapper);

      radio.at(0).find("input").simulate("change");

      radio = getRadioButtons(wrapper);
      expect(radio.at(0).prop("checked")).toBe(true);
      expect(radio.at(1).prop("checked")).toBe(false);
      expect(radio.at(2).prop("checked")).toBe(false);
    });

    describe("when onChange not passed in", () => {
      it("clicking a value checks the appropraite radio button", () => {
        const wrapper = mount(
          <RadioButtonMapper name="radio-button-group">
            <RadioButton name="one" value="one" />
            <RadioButton name="two" value="two" />
            <RadioButton name="three" value="three" />
          </RadioButtonMapper>
        );
        let radio = getRadioButtons(wrapper);

        radio.at(0).find("input").simulate("change");

        radio = getRadioButtons(wrapper);
        expect(radio.at(0).prop("checked")).toBe(true);
        expect(radio.at(1).prop("checked")).toBe(false);
        expect(radio.at(2).prop("checked")).toBe(false);
      });
    });

    describe("when children are passed in an array", () => {
      it("should render the list correctly", () => {
        const radioGroup = mount(
          <RadioButtonMapper name={name}>
            {[
              <input key="radio1" defaultChecked name="foo" value="foo" />,
              null,
              undefined,
              "foo",
              <input key="radio2" name="bar" value="bar" />,
            ]}
          </RadioButtonMapper>
        );

        expect(radioGroup.find("input").at(0).props().checked).toBe(true);
        expect(radioGroup.find("input").at(1).props().checked).toBe(false);
      });
    });
  });
});
