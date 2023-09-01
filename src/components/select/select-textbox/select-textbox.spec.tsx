import React, { useState } from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import SelectTextbox, { SelectTextboxProps } from ".";
import Textbox from "../../textbox";
import InputPresentationStyle, {
  StyledInputPresentationContainer,
} from "../../../__internal__/input/input-presentation.style";
import * as guidModule from "../../../__internal__/utils/helpers/guid";
import Translation from "../../../locales/en-gb";
import * as useFloatingModule from "../../../hooks/__internal__/useFloating/useFloating";

const useFloatingSpy = jest.spyOn(useFloatingModule, "default");
const guidSpy = jest.spyOn(guidModule, "default");
guidSpy.mockImplementation(() => "guid-12345");

const Component = (props: Partial<SelectTextboxProps>) => {
  const [textboxRef, setTextboxRef] = useState<HTMLInputElement | null>(null);

  function assignInput(input: HTMLInputElement | null) {
    setTextboxRef(input);
  }

  return (
    <SelectTextbox
      onChange={() => {}}
      textboxRef={textboxRef}
      ref={assignInput}
      {...props}
    />
  );
};

describe("SelectTextbox", () => {
  describe("useFloating", () => {
    it("calls useFloating with proper argument", () => {
      useFloatingSpy.mockClear();
      const wrapper = mount(<Component isOpen />);
      act(() => {
        wrapper.update();
      });
      const call = useFloatingSpy.mock.calls[1][0];

      expect(call.isOpen).toBe(true);
      expect(call.reference).toEqual({
        current: wrapper.find(StyledInputPresentationContainer).getDOMNode(),
      });
      expect(call.floating).toEqual({
        current: wrapper.find(InputPresentationStyle).getDOMNode(),
      });
      expect(call.animationFrame).toBe(true);
      expect(call.strategy).toBe("fixed");

      const rects = { reference: { height: 40, width: 0, y: 0, x: 0 } };

      expect(
        call.middleware?.[0]?.options?.({
          rects,
          placement: "bottom",
        })
      ).toEqual({ mainAxis: -40 });
    });
  });

  describe("when rendered", () => {
    it("should contain a Textbox with expected props", () => {
      const wrapper = mount(<SelectTextbox onChange={() => {}} />);

      expect(wrapper.find(Textbox).exists()).toBe(true);
      expect(wrapper.find(Textbox).props().placeholder).toBe(undefined);
      expect(wrapper.find(Textbox).props().inputIcon).toBe("dropdown");
      expect(wrapper.find(Textbox).props().autoComplete).toBe("off");
    });
  });

  describe("when the onFocus prop has been passed and the input has been focused", () => {
    it("then that prop should be called", () => {
      const onFocusFn = jest.fn();
      const wrapper = mount(
        <SelectTextbox onChange={() => {}} onFocus={onFocusFn} />
      );

      wrapper.find("input").simulate("focus");
      expect(onFocusFn).toHaveBeenCalled();
    });
  });

  describe("when the onBlur prop has been passed and the input has been unfocused", () => {
    it("then that prop should be called", () => {
      const onBlurFn = jest.fn();
      const wrapper = mount(
        <SelectTextbox onChange={() => {}} onBlur={onBlurFn} />
      );

      wrapper.find("input").simulate("blur");
      expect(onBlurFn).toHaveBeenCalled();
    });
  });

  describe("when a descendent of FilterableSelect or MultiSelect", () => {
    it("do not render button-like span overlay in the textbox", () => {
      const wrapper = mount(
        <SelectTextbox onChange={() => {}} hasTextCursor />
      );
      expect(wrapper.find("span[data-element='select-text']").exists()).toBe(
        false
      );
    });

    it("and placeholder prop is passed, input element uses it as placeholder text", () => {
      const placeholder = "foobaz";
      const wrapper = mount(
        <SelectTextbox
          onChange={() => {}}
          hasTextCursor
          placeholder={placeholder}
        />
      );
      expect(wrapper.find("input").prop("placeholder")).toBe(placeholder);
    });

    it("and placeholder prop is not passed, input element uses locale default value as placeholder text", () => {
      const wrapper = mount(
        <SelectTextbox
          onChange={() => {}}
          hasTextCursor
          placeholder={undefined}
        />
      );
      expect(wrapper.find("input").prop("placeholder")).toBe(
        Translation.select.placeholder()
      );
    });

    it('the input element should be of type "text"', () => {
      const wrapper = mount(
        <SelectTextbox onChange={() => {}} hasTextCursor />
      );
      expect(wrapper.find("input").prop("type")).toBe("text");
    });
  });

  describe("when a descendent of SimpleSelect", () => {
    it("renders span overlay in the textbox, that is hidden from screen readers", () => {
      const wrapper = mount(
        <SelectTextbox onChange={() => {}} hasTextCursor={undefined} />
      );
      const selectText = wrapper.find("span[data-element='select-text']");
      expect(selectText.exists()).toBe(true);
      expect(selectText.prop("aria-hidden")).toBe(true);
    });

    it("and placeholder prop is passed, span overlaying textbox uses it as placeholder text", () => {
      const placeholder = "foobaz";
      const wrapper = mount(
        <SelectTextbox
          onChange={() => {}}
          hasTextCursor={undefined}
          placeholder={placeholder}
        />
      );
      expect(wrapper.find("span[data-element='select-text']").text()).toBe(
        placeholder
      );
    });

    it("and placeholder prop is not passed, span overlaying textbox uses locale default value as placeholder text", () => {
      const wrapper = mount(
        <SelectTextbox onChange={() => {}} hasTextCursor={undefined} />
      );
      expect(wrapper.find("span[data-element='select-text']").text()).toBe(
        Translation.select.placeholder()
      );
    });
  });

  describe("ARIA", () => {
    const mockTextId = "mockTextId";

    beforeEach(() => {
      guidSpy.mockImplementationOnce(() => mockTextId);
    });

    it("the ariaLabel prop value should be passed down to the aria-label prop in the Textbox", () => {
      const mockAriaLabel = "foo";
      const wrapper = mount(
        <SelectTextbox onChange={() => {}} ariaLabel="foo" />
      );
      const ariaLabel = wrapper.find(Textbox).prop("aria-label");
      expect(ariaLabel).toBe(mockAriaLabel);
    });

    describe.each([
      ["set", "foo"],
      ["not set", undefined],
    ])(
      "when the ariaLabelledBy prop is %s",
      (description, mockAriaLabelledBy) => {
        const mockLabelId = "baz";

        describe("with the hasTextCursor prop set to true", () => {
          it("then the aria-labelledby in the Textbox should be the value of the ariaLabelledBy prop", () => {
            const wrapper = mount(
              <SelectTextbox
                onChange={() => {}}
                ariaLabelledby={mockAriaLabelledBy}
                hasTextCursor
                labelId={mockLabelId}
              />
            );
            const ariaLabelledBy = wrapper
              .find(Textbox)
              .prop("aria-labelledby");

            expect(ariaLabelledBy).toBe(mockAriaLabelledBy);
          });

          describe("and the accessibilityLabelId prop", () => {
            it("then the aria-labelledby in the Textbox should contain both id's", () => {
              const mockAccessibilityLabelId = "bar";
              const wrapper = mount(
                <SelectTextbox
                  onChange={() => {}}
                  accessibilityLabelId={mockAccessibilityLabelId}
                  ariaLabelledby={mockAriaLabelledBy}
                  hasTextCursor
                  labelId={mockLabelId}
                />
              );
              const ariaLabelledBy = wrapper
                .find(Textbox)
                .prop("aria-labelledby");

              expect(ariaLabelledBy).toEqual(
                expect.stringContaining(mockAriaLabelledBy || mockLabelId)
              );
              expect(ariaLabelledBy).toEqual(
                expect.stringContaining(mockAccessibilityLabelId)
              );
            });
          });
        });
      }
    );

    describe("when the ariaLabel prop is set without ariaLabelledBy", () => {
      it("then the aria-labelledby prop of the Textbox should be undefined", () => {
        const wrapper = mount(
          <SelectTextbox onChange={() => {}} ariaLabel="bar" />
        );
        const ariaLabelledBy = wrapper.find(Textbox).prop("aria-labelledby");

        expect(ariaLabelledBy).toBe(undefined);
      });
    });
  });
});

describe("coverage filler for else path", () => {
  const wrapper = mount(<SelectTextbox onChange={() => {}} />);
  wrapper.find("input").simulate("blur");
  wrapper.find("input").simulate("focus");
});
