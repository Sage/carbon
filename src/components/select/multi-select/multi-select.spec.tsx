import React, { useRef, useState } from "react";
import { act } from "react-dom/test-utils";
import { mount, ReactWrapper } from "enzyme";
import StyledLabel, {
  StyledLabelContainer,
} from "../../../__internal__/label/label.style";

import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../../__spec_helper__/test-utils";
import {
  simulateSelectTextboxEvent,
  simulateDropdownEvent,
} from "../../../__spec_helper__/select-test-utils";
import { MultiSelect, Option, MultiSelectProps } from "..";
import StyledOption from "../option/option.style";
import Textbox from "../../textbox";
import MatchingText from "../utils/matching-text.style";
import SelectList from "../select-list/select-list.component";
import {
  StyledSelectList,
  StyledSelectListContainer,
  StyledScrollableContainer,
} from "../select-list/select-list.style";
import Pill from "../../pill";
import InputPresentationStyle from "../../../__internal__/input/input-presentation.style";
import { InputPresentation } from "../../../__internal__/input";
import Logger from "../../../__internal__/utils/logger";
import guid from "../../../__internal__/utils/helpers/guid";
import StyledInput from "../../../__internal__/input/input.style";
import mockDOMRect from "../../../__spec_helper__/mock-dom-rect";

const mockedGuid = "mocked-guid";
jest.mock("../../../__internal__/utils/helpers/guid");
jest.useFakeTimers();
(guid as jest.MockedFunction<typeof guid>).mockReturnValue(mockedGuid);

function getSelect(props: Partial<MultiSelectProps> = {}) {
  return (
    <MultiSelect name="testSelect" id="testSelect" {...props}>
      <Option value="opt1" text="red" borderColor="red" fill />
      <Option value="opt2" text="green" borderColor="green" />
      <Option value="opt3" text="blue" />
      <Option value="opt4" text="yellow" />
      <Option value="opt5" text="forest green" />
    </MultiSelect>
  );
}

function renderSelect(props = {}, renderer = mount, opts = {}) {
  return renderer(getSelect(props), {
    attachTo: document.getElementById("enzymeContainer"),
    ...opts,
  });
}

jest.mock("../../../__internal__/utils/logger");

describe("MultiSelect", () => {
  let loggerSpy: jest.SpyInstance<void, [message: string]> | jest.Mock;
  let container: HTMLDivElement | null;

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "enzymeContainer";
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }

    container = null;
  });

  beforeEach(() => {
    mockDOMRect(200, 200, "select-list-scrollable-container");
  });

  it("should not throw an error when component has only one value and a value is typed in the Select Textbox", () => {
    const wrapper = mount(
      <MultiSelect name="testSelect" id="testSelect">
        <Option value="opt1" text="red" />
      </MultiSelect>
    );

    expect(wrapper.find(Option).length).toBe(1);
    expect(() => {
      act(() => {
        wrapper.find("input").simulate("change", { target: { value: "v" } });
      });
    }).not.toThrow();
  });

  describe("Deprecation warning for uncontrolled", () => {
    beforeEach(() => {
      loggerSpy = jest.spyOn(Logger, "deprecate");
    });

    afterEach(() => {
      loggerSpy.mockRestore();
    });

    afterAll(() => {
      loggerSpy.mockClear();
    });

    it("should display deprecation warning once", () => {
      renderSelect({ defaultValue: ["opt2", "opt1"] });

      expect(loggerSpy).toHaveBeenCalledWith(
        "Uncontrolled behaviour in `Multi Select` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
      );

      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });
  });

  testStyledSystemMargin((props) => getSelect(props));

  it("when text is passed in placeholder prop, input element in textbox uses it as placeholder text", () => {
    const placeholder = "foobaz";
    const wrapper = renderSelect({ placeholder });
    expect(
      wrapper.find("input[data-element='input']").prop("placeholder")
    ).toBe(placeholder);
  });

  it("should not render an empty Pill when non-matching filter text is input and enter key pressed", () => {
    const wrapper = renderSelect({}, mount);

    act(() => {
      wrapper.find("input").simulate("change", { target: { value: "foo" } });
      container?.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Enter",
          bubbles: true,
        })
      );
    });

    expect(wrapper.find(Pill).exists()).toBe(false);
  });

  it.each(["ArrowDown", "ArrowUp"])(
    "should not throw when non-matching filter text is input and %s pressed",
    (key) => {
      const wrapper = renderSelect({}, mount);

      expect(() => {
        act(() => {
          wrapper
            .find("input")
            .simulate("change", { target: { value: "foo" } });

          container?.dispatchEvent(
            new KeyboardEvent("keydown", {
              key,
              bubbles: true,
            })
          );
        });
      }).not.toThrow();
    }
  );

  describe("when an HTML element is clicked", () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = renderSelect({ openOnFocus: true });
    });

    describe("and that element is part of the Select", () => {
      it("then the SelectList should be open", () => {
        simulateSelectTextboxEvent(wrapper, "focus");
        expect(
          wrapper.find(StyledSelectListContainer).getDOMNode()
        ).toBeVisible();
        act(() => {
          wrapper
            .find(StyledSelectList)
            .getDOMNode()
            .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(
          wrapper.find(StyledSelectListContainer).getDOMNode()
        ).toBeVisible();
      });
    });

    describe("and that element is not part of the Select", () => {
      it("then the SelectList should be closed", () => {
        simulateSelectTextboxEvent(wrapper, "focus");
        expect(
          wrapper.find(StyledSelectListContainer).getDOMNode()
        ).toBeVisible();
        act(() => {
          document.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(
          wrapper.find(StyledSelectListContainer).getDOMNode()
        ).not.toBeVisible();
      });
    });
  });

  describe("when the id prop is set", () => {
    const mockId = "foo";
    const wrapper = renderSelect({ id: mockId, label: "bar" });

    it("then it should be passed to the Textbox component", () => {
      expect(wrapper.find(Textbox).prop("id")).toBe(mockId);
    });

    it("then a label id based on that prop should be passed to the SelectList component", () => {
      expect(wrapper.find(SelectList).prop("labelId")).toBe(`${mockId}-label`);
    });

    it("then a label id based on that prop should be passed to the Textbox component", () => {
      expect(wrapper.find(Textbox).prop("labelId")).toBe(`${mockId}-label`);
    });
  });

  describe("when the id prop is not set", () => {
    const wrapper = renderSelect({ id: undefined, label: "bar" });

    it("then a randomly generated id should be passed to the Textbox component", () => {
      expect(wrapper.find(Textbox).prop("id")).toBe(mockedGuid);
    });

    it("then a label id based on randomly generated id should be passed to the SelectList component", () => {
      expect(wrapper.find(SelectList).prop("labelId")).toBe(
        `${mockedGuid}-label`
      );
    });

    it("then a label id based on a randomly generated id should be passed to the Textbox component", () => {
      expect(wrapper.find(Textbox).prop("labelId")).toBe(`${mockedGuid}-label`);
    });
  });

  describe("with a ref", () => {
    it("the input ref should be forwarded", () => {
      let mockRef = { current: null };

      const WrapperComponent = () => {
        mockRef = useRef(null);

        return (
          <MultiSelect name="testSelect" id="testSelect" ref={mockRef}>
            <Option value="opt1" text="red" />
            <Option value="opt2" text="green" />
            <Option value="opt3" text="blue" />
            <Option value="opt4" text="black" />
          </MultiSelect>
        );
      };

      const wrapper = mount(<WrapperComponent />);

      expect(mockRef.current).toBe(wrapper.find("input").getDOMNode());
    });

    it("the input callback ref should be called with the DOM element", () => {
      let mockRef;

      const WrapperComponent = () => {
        mockRef = jest.fn();

        return (
          <MultiSelect name="testSelect" id="testSelect" ref={mockRef}>
            <Option value="opt1" text="red" />
            <Option value="opt2" text="green" />
            <Option value="opt3" text="blue" />
            <Option value="opt4" text="black" />
          </MultiSelect>
        );
      };

      const wrapper = mount(<WrapperComponent />);

      expect(mockRef).toHaveBeenCalledWith(wrapper.find("input").getDOMNode());
    });
  });

  describe("when listMaxHeight prop is provided", () => {
    it("overrides default list max-height", () => {
      mount(getSelect());
      const wrapper = renderSelect({ listMaxHeight: 120, openOnFocus: true });

      simulateDropdownEvent(wrapper, "click");
      assertStyleMatch(
        { maxHeight: "120px" },
        wrapper.find(StyledScrollableContainer)
      );
    });
  });

  it.each(["top", "bottom", "right", "left"])(
    "the listPlacement prop should be passed",
    (listPlacement) => {
      const wrapper = renderSelect({ listPlacement });

      simulateDropdownEvent(wrapper, "click");
      expect(wrapper.find(SelectList).prop("listPlacement")).toBe(
        listPlacement
      );
    }
  );

  it("the flipEnabled prop should be passed", () => {
    const wrapper = renderSelect({ flipEnabled: false });

    simulateDropdownEvent(wrapper, "click");
    expect(wrapper.find(SelectList).prop("flipEnabled")).toBe(false);
    wrapper.setProps({ flipEnabled: true });
    expect(wrapper.find(SelectList).prop("flipEnabled")).toBe(true);
  });

  it.each([
    ["small", "var(--sizing400)"],
    ["medium", "var(--sizing500)"],
    ["large", "var(--sizing600)"],
  ])("the input toggle icon should have proper left margin", (a, expected) => {
    const wrapper = renderSelect({ size: a });
    assertStyleMatch(
      {
        paddingRight: expected,
        position: "relative",
      },
      wrapper,
      { modifier: `${InputPresentationStyle}` }
    );
  });

  describe('when the "value" prop is passed', () => {
    it("then Pills should be rendered with corresponding titles", () => {
      const wrapper = renderSelect({
        value: ["opt1", "opt2"],
        onChange: jest.fn(),
      });

      expect(wrapper.find(Pill).at(0).prop("title")).toBe("red");
      expect(wrapper.find(Pill).at(1).prop("title")).toBe("green");
    });

    it("then Pills should be rendered with proper borderColor and fill props", () => {
      const wrapper = renderSelect({
        value: ["opt1", "opt2"],
        onChange: jest.fn(),
      });

      expect(wrapper.find(Pill).at(0).prop("borderColor")).toBe("red");
      expect(wrapper.find(Pill).at(0).prop("fill")).toBe(true);
      expect(wrapper.find(Pill).at(1).prop("borderColor")).toBe("green");
    });

    it("does not throw when no matching option found", () => {
      expect(() => {
        renderSelect({
          value: ["opt10"],
          onChange: jest.fn(),
        });
      }).not.toThrow();
    });
  });

  describe('when the "onFocus" prop has been passed and the input has been focused', () => {
    it("then that prop should be called", () => {
      const onFocusFn = jest.fn();
      const wrapper = renderSelect({ onFocus: onFocusFn });

      simulateSelectTextboxEvent(wrapper, "focus");
      expect(onFocusFn).toHaveBeenCalled();
    });
  });

  describe('when the "onBlur" prop has been passed and the input has been blurred', () => {
    it("then that prop should be called", () => {
      const onBlurFn = jest.fn();
      const wrapper = renderSelect({ onBlur: onBlurFn });

      simulateSelectTextboxEvent(wrapper, "blur");
      expect(onBlurFn).toHaveBeenCalled();
    });

    describe("and there is a mouseDown reported on open list", () => {
      it("then that prop should not be called", () => {
        const onBlurFn = jest.fn();
        const wrapper = renderSelect({ onBlur: onBlurFn, openOnFocus: true });

        simulateSelectTextboxEvent(wrapper, "focus");
        wrapper.find(Option).first().simulate("mousedown");
        simulateSelectTextboxEvent(wrapper, "blur");

        expect(onBlurFn).not.toHaveBeenCalled();
      });
    });
  });

  describe("when the Textbox Input is focused", () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = renderSelect();
    });

    it("the SelectList should not be rendered", () => {
      simulateSelectTextboxEvent(wrapper, "focus");
      expect(
        wrapper.find(StyledSelectListContainer).getDOMNode()
      ).not.toBeVisible();
    });

    describe.each(["ArrowDown", "ArrowUp", "Home", "End"])(
      'and "%s" key has been pressed',
      (key) => {
        it("the SelectList should be rendered", () => {
          simulateSelectTextboxEvent(wrapper, "keydown", { key });
          expect(
            wrapper.find(StyledSelectListContainer).getDOMNode()
          ).toBeVisible();
        });

        describe("with readOnly prop set to true", () => {
          it("then the SelectList should not be rendered", () => {
            wrapper.setProps({ readOnly: true });
            simulateSelectTextboxEvent(wrapper, "keydown", { key });
            expect(
              wrapper.find(StyledSelectListContainer).getDOMNode()
            ).not.toBeVisible();
          });
        });
      }
    );

    describe('and the "Enter" key has been pressed', () => {
      it("the SelectList should not be rendered", () => {
        simulateSelectTextboxEvent(wrapper, "keydown", { key: "Enter" });
        expect(
          wrapper.find(StyledSelectListContainer).getDOMNode()
        ).not.toBeVisible();
      });

      describe("with readOnly prop set to true", () => {
        it("then the SelectList should not be rendered", () => {
          wrapper.setProps({ readOnly: true });
          simulateSelectTextboxEvent(wrapper, "keydown", { key: "Enter" });
          expect(
            wrapper.find(StyledSelectListContainer).getDOMNode()
          ).not.toBeVisible();
        });
      });
    });
  });

  describe('when the "onKeyDown" prop is passed', () => {
    const expectedEventObject = {
      key: "ArrowDown",
    };

    it("then when a key is pressed, that prop should be called with expected values", () => {
      const onKeyDownFn = jest.fn();
      const wrapper = renderSelect({ onKeyDown: onKeyDownFn });

      simulateSelectTextboxEvent(wrapper, "keydown", expectedEventObject);

      expect(onKeyDownFn).toHaveBeenCalledWith(
        expect.objectContaining({
          ...expectedEventObject,
        })
      );
    });
  });

  describe.each(["Backspace", "Delete"])(
    'when a "%s" key has been pressed',
    (key) => {
      const keyDownEventObject = {
        key,
      };

      describe("and there is no filter text", () => {
        it("then the last value should be removed", () => {
          const wrapper = renderSelect({ defaultValue: ["opt2", "opt1"] });

          expect(wrapper.find(Pill)).toHaveLength(2);
          simulateSelectTextboxEvent(wrapper, "keydown", keyDownEventObject);
          expect(wrapper.find(Pill)).toHaveLength(1);
          expect(wrapper.find(Pill).props().title).toBe("green");
        });

        it("then the onChange prop should have been called", () => {
          const onChangeFn = jest.fn();
          const wrapper = renderSelect({
            defaultValue: ["opt2", "opt1"],
            onChange: onChangeFn,
          });

          onChangeFn.mockReset();
          simulateSelectTextboxEvent(wrapper, "keydown", keyDownEventObject);
          expect(onChangeFn).toHaveBeenCalled();
        });

        describe("with the value list already empty", () => {
          it("then the onChange prop should not have been called", () => {
            const onChangeFn = jest.fn();
            const wrapper = renderSelect({
              defaultValue: [],
              onChange: onChangeFn,
            });

            onChangeFn.mockReset();
            simulateSelectTextboxEvent(wrapper, "keydown", keyDownEventObject);
            expect(onChangeFn).not.toHaveBeenCalled();
          });
        });
      });

      describe("and the text in the Textbox is cleared after selection", () => {
        const mockOptionObject = {
          value: "opt3",
          text: "blue",
          selectionType: "enter",
          selectionConfirmed: true,
        };
        const changeEventObject = { target: { value: "b" } };

        it("then the last value should be removed", () => {
          const wrapper = renderSelect({ defaultValue: ["opt2", "opt1"] });
          simulateSelectTextboxEvent(wrapper, "change", changeEventObject);

          act(() => {
            wrapper.find(SelectList).prop("onSelect")(mockOptionObject);
          });
          expect(wrapper.update().find(Pill)).toHaveLength(3);
          simulateSelectTextboxEvent(wrapper, "keydown", keyDownEventObject);
          expect(wrapper.find(Pill)).toHaveLength(2);
        });
      });
    }
  );

  describe('when the "onDelete" prop has been called on a pill', () => {
    it("then a corresponding value should be removed from the Textbox value", () => {
      const wrapper = renderSelect({ defaultValue: ["opt1", "opt2", "opt3"] });

      act(() => {
        wrapper.find(Pill).at(0).props().onDelete?.();
      });

      expect(wrapper.update().find(Textbox).props().value).toEqual([
        "opt2",
        "opt3",
      ]);
    });
  });

  describe.each(["readOnly", "disabled"])(
    'when the "%s" prop is set in the Component',
    (prop) => {
      it('then there should not be the "onDelete" prop on a Pill', () => {
        const wrapper = renderSelect({
          defaultValue: ["opt1", "opt2", "opt3"],
          [prop]: true,
        });

        expect(wrapper.find(Pill).at(0).props().onDelete).toBe(undefined);
      });
    }
  );

  describe("when the Textbox Input is clicked", () => {
    it("the SelectList should not be rendered", () => {
      const wrapper = renderSelect();

      simulateSelectTextboxEvent(wrapper, "click");
      expect(
        wrapper.find(StyledSelectListContainer).getDOMNode()
      ).not.toBeVisible();
    });

    describe('and the "onClick" prop is passed', () => {
      it("then that prop should be called", () => {
        const onClickFn = jest.fn();
        const wrapper = renderSelect({ onClick: onClickFn });

        simulateSelectTextboxEvent(wrapper, "click");
        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe('and the "onOpen" prop is passed', () => {
      it("then that prop should not be called", () => {
        const onOpenFn = jest.fn();
        const wrapper = renderSelect({ onOpen: onOpenFn });

        simulateSelectTextboxEvent(wrapper, "click");
        expect(onOpenFn).not.toHaveBeenCalled();
      });

      describe("and the focus triggered by mouseDown on the input", () => {
        it("then that prop should not have been called", () => {
          const onOpenFn = jest.fn();
          const wrapper = renderSelect({ onOpen: onOpenFn });

          simulateSelectTextboxEvent(wrapper, "mousedown");
          simulateSelectTextboxEvent(wrapper, "focus");
          expect(onOpenFn).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe("when the Dropdown Icon in the Textbox has been clicked", () => {
    it("the SelectList should be rendered", () => {
      const wrapper = renderSelect();

      simulateDropdownEvent(wrapper, "click");
      expect(
        wrapper.find(StyledSelectListContainer).getDOMNode()
      ).toBeVisible();
    });

    describe("twice", () => {
      it("the SelectList should not be rendered", () => {
        const wrapper = renderSelect();
        simulateDropdownEvent(wrapper, "click");
        simulateDropdownEvent(wrapper, "click");
        expect(
          wrapper.find(StyledSelectListContainer).getDOMNode()
        ).not.toBeVisible();
      });
    });

    describe('and the "onOpen" prop is passed', () => {
      it("then that prop should be called", () => {
        const onOpenFn = jest.fn();
        const wrapper = renderSelect({ onOpen: onOpenFn });

        simulateDropdownEvent(wrapper, "click");
        expect(onOpenFn).toHaveBeenCalled();
      });
    });

    describe('and the "onClick" prop is passed', () => {
      it("then that prop should be called", () => {
        const onClickFn = jest.fn();
        const wrapper = renderSelect({ onClick: onClickFn });

        simulateDropdownEvent(wrapper, "click");
        expect(onClickFn).toHaveBeenCalled();
      });
    });
  });

  describe('when the "openOnFocus" prop is set', () => {
    describe("and the Textbox Input is focused", () => {
      it("the SelectList should be rendered", () => {
        const wrapper = renderSelect({ openOnFocus: true });

        simulateSelectTextboxEvent(wrapper, "focus");
        expect(
          wrapper.find(StyledSelectListContainer).getDOMNode()
        ).toBeVisible();
      });

      describe.each(["readOnly", "disabled"])(
        'with the "%s" prop passed',
        (prop) => {
          it("the SelectList should not be rendered", () => {
            const obj = { [prop]: true, openOnFocus: true };
            const wrapper = renderSelect(obj);

            simulateSelectTextboxEvent(wrapper, "focus");
            expect(
              wrapper.find(StyledSelectListContainer).getDOMNode()
            ).not.toBeVisible();
          });
        }
      );

      describe('with the "onFocus" prop passed', () => {
        it("then that prop should be called", () => {
          const onFocusFn = jest.fn();
          const wrapper = renderSelect({
            onFocus: onFocusFn,
            openOnFocus: true,
          });

          simulateSelectTextboxEvent(wrapper, "focus");
          expect(onFocusFn).toHaveBeenCalled();
        });
      });

      describe('with the "onOpen" prop passed', () => {
        let wrapper: ReactWrapper;
        let onOpenFn: jest.MockedFunction<() => void>;

        beforeEach(() => {
          onOpenFn = jest.fn();
          wrapper = renderSelect({ onOpen: onOpenFn, openOnFocus: true });
        });

        it("then that prop should have been called", () => {
          simulateSelectTextboxEvent(wrapper, "focus");
          expect(onOpenFn).toHaveBeenCalled();
        });

        describe("and with the SelectList already open", () => {
          it("then that prop should not be called", () => {
            simulateSelectTextboxEvent(wrapper, "focus");
            onOpenFn.mockReset();
            expect(
              wrapper.find(StyledSelectListContainer).getDOMNode()
            ).toBeVisible();
            wrapper.find("input").simulate("focus");
            expect(onOpenFn).not.toHaveBeenCalled();
          });
        });

        describe("and the focus triggered by mouseDown on the input", () => {
          it("then that prop should have been called", () => {
            simulateSelectTextboxEvent(wrapper, "mousedown");
            simulateSelectTextboxEvent(wrapper, "focus");
            expect(onOpenFn).toHaveBeenCalled();
          });
        });
      });
    });

    describe("and the focus triggered by mouseDown on the Dropdown Icon", () => {
      describe('with the "onOpen" prop passed', () => {
        const onOpenFn = jest.fn();
        const wrapper = renderSelect({ onOpen: onOpenFn, openOnFocus: true });

        it("then that prop should have been called", () => {
          simulateDropdownEvent(wrapper, "mousedown");
          simulateSelectTextboxEvent(wrapper, "focus");
          expect(onOpenFn).toHaveBeenCalled();
        });
      });
    });
  });

  describe("when a printable character has been typed in the Textbox", () => {
    it('the SelectList should have the "filterText" prop the same as the value', () => {
      const changeEventObject = { target: { value: "Foo" } };
      const wrapper = renderSelect();

      simulateSelectTextboxEvent(wrapper, "click");
      simulateSelectTextboxEvent(wrapper, "change", changeEventObject);
      expect(wrapper.update().find(SelectList).prop("filterText")).toBe("Foo");
    });

    describe('with the "onOpen" prop passed', () => {
      it("then that prop should be called", () => {
        const onOpenFn = jest.fn();
        const wrapper = renderSelect({ onOpen: onOpenFn });

        simulateSelectTextboxEvent(wrapper, "change", {
          target: { value: "b" },
        });

        expect(onOpenFn).toHaveBeenCalled();
      });
    });
  });

  describe("when the filter text contains whitespace,", () => {
    describe("which is leading whitespace:", () => {
      it("the matching option value is correct, and highlighted correctly", () => {
        const wrapper = renderSelect();

        simulateSelectTextboxEvent(wrapper, "change", {
          target: { value: "   Y" },
        });
        wrapper.update();

        const optionElement = wrapper.find(Option);

        expect(optionElement.prop("text")).toBe("yellow");
        expect(wrapper.find(StyledOption).prop("isHighlighted")).toBeTruthy();
      });

      it.each(["y", "ye", "yel", "yell", "yello", "yellow"])(
        "the matching option text is highlighted correctly",
        (passedValue) => {
          const wrapper = renderSelect();

          simulateSelectTextboxEvent(wrapper, "change", {
            target: { value: `   ${passedValue}` },
          });
          wrapper.update();

          expect(wrapper.find(MatchingText).prop("children")).toBe(passedValue);
        }
      );
    });

    describe("which is whitespace within the string:", () => {
      it("the matching option value is correct, and highlighted correctly", () => {
        const wrapper = renderSelect();

        simulateSelectTextboxEvent(wrapper, "change", {
          target: { value: "forest " },
        });
        wrapper.update();

        const optionElement = wrapper.find(Option);

        expect(optionElement.prop("text")).toBe("forest green");
        expect(wrapper.find(StyledOption).prop("isHighlighted")).toBeTruthy();
      });

      it.each(["forest", "forest green"])(
        "the matching option text is highlighted correctly",
        (passedValue) => {
          const wrapper = renderSelect();

          simulateSelectTextboxEvent(wrapper, "change", {
            target: { value: passedValue },
          });
          wrapper.update();

          expect(wrapper.find(MatchingText).prop("children")).toBe(passedValue);
        }
      );
    });

    describe("which is trailing whitespace", () => {
      it("the correct matching option value is correct, and highlighted correctly", () => {
        const wrapper = renderSelect();

        simulateSelectTextboxEvent(wrapper, "change", {
          target: { value: "yellow   " },
        });
        wrapper.update();

        const optionElement = wrapper.find(Option);

        expect(optionElement.prop("text")).toBe("yellow");
        expect(wrapper.find(StyledOption).prop("isHighlighted")).toBeTruthy();
      });

      it("the matching option text is highlighted correctly", () => {
        const wrapper = renderSelect();

        simulateSelectTextboxEvent(wrapper, "change", {
          target: { value: "yellow     " },
        });
        wrapper.update();

        expect(wrapper.find(MatchingText).prop("children")).toBe("yellow");
      });
    });

    describe("which is leading & trailing whitespace", () => {
      it("the matching option value is correct, and highlighted correctly", () => {
        const wrapper = renderSelect();

        simulateSelectTextboxEvent(wrapper, "change", {
          target: { value: "    yellow   " },
        });
        wrapper.update();

        const optionElement = wrapper.find(Option);

        expect(optionElement.prop("text")).toBe("yellow");
        expect(wrapper.find(StyledOption).prop("isHighlighted")).toBeTruthy();
      });

      it("the matching option text is highlighted correctly", () => {
        const wrapper = renderSelect();

        simulateSelectTextboxEvent(wrapper, "change", {
          target: { value: "    yellow   " },
        });
        wrapper.update();

        expect(wrapper.find(MatchingText).prop("children")).toBe("yellow");
      });
    });
  });

  describe('when the "onSelect" is called in the SelectList', () => {
    const mockOptionObject = {
      value: "opt1",
      text: "red",
      selectionType: "enter",
      selectionConfirmed: true,
    };
    const mockNavigationKeyOptionObject = {
      value: "opt1",
      text: "red",
      selectionType: "navigationKey",
      selectionConfirmed: false,
    };
    const textboxProps = {
      name: "testName",
      id: "testId",
    };
    const expectedEventObject = {
      selectionConfirmed: true,
      target: {
        ...textboxProps,
        value: ["opt1"],
      },
    };

    it("the SelectList should not be closed", () => {
      const wrapper = renderSelect({ openOnFocus: true });

      simulateSelectTextboxEvent(wrapper, "focus");
      expect(
        wrapper.find(StyledSelectListContainer).getDOMNode()
      ).toBeVisible();
      act(() => {
        wrapper.find(SelectList).prop("onSelect")(mockOptionObject);
      });
      expect(
        wrapper.find(StyledSelectListContainer).getDOMNode()
      ).toBeVisible();
    });

    describe('and the "onChange" prop is passed', () => {
      it("then that prop should be called with the same value in a list", () => {
        const onChangeFn = jest.fn();
        const wrapper = renderSelect({
          ...textboxProps,
          onChange: onChangeFn,
          openOnFocus: true,
        });

        simulateSelectTextboxEvent(wrapper, "focus");
        act(() => {
          wrapper.find(SelectList).prop("onSelect")(mockOptionObject);
        });
        expect(onChangeFn).toHaveBeenCalledWith(expectedEventObject);
      });

      describe('with the "selectionType" set to "navigationKey"', () => {
        it("sets correct highlighted element", () => {
          const onChangeFn = jest.fn();
          const wrapper = renderSelect({
            ...textboxProps,
            onChange: onChangeFn,
            openOnFocus: true,
          });

          simulateSelectTextboxEvent(wrapper, "focus");
          onChangeFn.mockReset();
          act(() => {
            wrapper.find(SelectList).prop("onSelect")(
              mockNavigationKeyOptionObject
            );
          });

          wrapper.update();
          expect(wrapper.find(SelectList).prop("highlightedValue")).toBe(
            mockNavigationKeyOptionObject.value
          );
        });

        it("then that prop should not be called", () => {
          const onChangeFn = jest.fn();
          const wrapper = renderSelect({
            ...textboxProps,
            onChange: onChangeFn,
            openOnFocus: true,
          });

          simulateSelectTextboxEvent(wrapper, "focus");
          onChangeFn.mockReset();
          act(() => {
            wrapper.find(SelectList).prop("onSelect")(
              mockNavigationKeyOptionObject
            );
          });
          expect(onChangeFn).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe("when an Option has been clicked", () => {
    it("then the SelectList should not be closed", () => {
      const wrapper = renderSelect({ openOnFocus: true });

      simulateSelectTextboxEvent(wrapper, "focus");
      act(() => {
        wrapper.find(Option).first().simulate("click");
      });
      expect(
        wrapper.find(StyledSelectListContainer).getDOMNode()
      ).toBeVisible();
    });

    describe('with the "onChange" prop passed', () => {
      describe("and that Option is already selected", () => {
        it("then that prop should not be called", () => {
          const onChangeFn = jest.fn();
          const wrapper = renderSelect({
            openOnFocus: true,
            defaultValue: ["opt1"],
          });

          simulateSelectTextboxEvent(wrapper, "focus");
          act(() => {
            wrapper.find(Option).first().simulate("click");
          });
          expect(onChangeFn).not.toHaveBeenCalled();
        });
      });

      describe("and that Option value is an object and it is already selected", () => {
        it("then that prop should not be called", () => {
          const onChangeFn = jest.fn();
          const wrapper = mount(
            <MultiSelect
              name="testSelect"
              id="testSelect"
              openOnFocus
              defaultValue={[{ id: "id1", value: "opt1" }]}
            >
              <Option value={{ id: "id1", value: "opt1" }} text="red" />
              <Option value={{ id: "id2", value: "opt2" }} text="green" />
              <Option value={{ id: "id3", value: "opt3" }} text="blue" />
            </MultiSelect>
          );

          simulateSelectTextboxEvent(wrapper, "focus");
          act(() => {
            wrapper.find(Option).first().simulate("click");
          });
          expect(onChangeFn).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('when the "onFilter" prop has been passed', () => {
    it("then that prop should be invoked when the input text has changed", () => {
      const filterText = "foo";
      const onFilterChangeFn = jest.fn();
      const wrapper = renderSelect({ onFilterChange: onFilterChangeFn });

      simulateSelectTextboxEvent(wrapper, "change", {
        target: { value: filterText },
      });
      expect(onFilterChangeFn).toHaveBeenCalledWith(filterText);
    });

    it("then it should not be invoked when the component rerenders", () => {
      const Component = () => {
        const [onFilterChangeCalled, setOnFilterChangeCalled] = useState(false);

        return (
          <>
            <div id="on-filter-called">
              {onFilterChangeCalled ? "true" : "false"}
            </div>
            <MultiSelect
              name="testSelect"
              id="testSelect"
              onFilterChange={() => setOnFilterChangeCalled(true)}
            >
              <Option value="opt1" text="red" />
              <Option value="opt2" text="green" />
              <Option value="opt3" text="blue" />
              <Option value="opt4" text="black" />
            </MultiSelect>
          </>
        );
      };

      const wrapper = mount(<Component />);
      expect(wrapper.find("#on-filter-called").text()).toBe("false");
      wrapper.setProps({});
      expect(wrapper.find("#on-filter-called").text()).toBe("false");
    });
  });

  describe('when the "onSelectListClose" is called in the SelectList', () => {
    it("the SelectList should be closed", () => {
      const wrapper = renderSelect({ openOnFocus: true });

      simulateSelectTextboxEvent(wrapper, "focus");
      expect(
        wrapper.find(StyledSelectListContainer).getDOMNode()
      ).toBeVisible();
      act(() => {
        wrapper.find(SelectList).prop("onSelectListClose")();
      });
      expect(
        wrapper.find(StyledSelectListContainer).getDOMNode()
      ).not.toBeVisible();
    });
  });

  describe("when the component is controlled", () => {
    const expectedObject = {
      selectionConfirmed: true,
      target: {
        id: "testSelect",
        name: "testSelect",
        value: ["opt1", "opt2"],
      },
    };

    const clickOptionObject = {
      value: "opt2",
      text: "black",
      selectionType: "click",
      selectionConfirmed: true,
    };

    describe("and an option is selected", () => {
      it("then the onChange prop should be called once with expected value", () => {
        const onChangeFn = jest.fn();
        const wrapper = renderSelect({ value: ["opt1"], onChange: onChangeFn });

        simulateDropdownEvent(wrapper, "click");
        expect(
          wrapper.find(StyledSelectListContainer).getDOMNode()
        ).toBeVisible();
        act(() => {
          wrapper.find(SelectList).prop("onSelect")(clickOptionObject);
        });
        expect(onChangeFn).toHaveBeenCalledTimes(1);
        expect(onChangeFn).toHaveBeenCalledWith(expectedObject);
      });
    });

    describe.each(["Backspace", "Delete"])(
      'when a "%s" key has been pressed and there is no filter text',
      (key) => {
        const keyDownEventObject = {
          key,
        };

        it("then the onChange prop should have been called without the last option", () => {
          const onChangeFn = jest.fn();
          const wrapper = renderSelect({
            value: ["opt1", "opt2", "opt3"],
            onChange: onChangeFn,
          });

          onChangeFn.mockReset();
          simulateSelectTextboxEvent(wrapper, "keydown", keyDownEventObject);
          expect(onChangeFn).toHaveBeenCalledWith(expectedObject);
        });
      }
    );
  });

  describe("when parent re-renders", () => {
    const WrapperComponent = () => {
      const mockRef = useRef();

      return (
        <MultiSelect
          openOnFocus
          name="testSelect"
          id="testSelect"
          ref={mockRef}
        >
          <Option value="opt1" text="red" />
          <Option value="opt2" text="green" />
          <Option value="opt3" text="blue" />
          <Option value="opt4" text="black" />
        </MultiSelect>
      );
    };

    it("should persist the input value", () => {
      const wrapper = mount(<WrapperComponent />);
      simulateSelectTextboxEvent(wrapper, "focus");
      act(() => {
        wrapper.find(Option).first().simulate("click");
      });
      expect(wrapper.update().find(Textbox).props().value).toEqual(["opt1"]);
      wrapper.setProps({ prop1: "bar" });
      expect(wrapper.update().find(Textbox).props().value).toEqual(["opt1"]);
    });
  });

  describe("required", () => {
    let wrapper: ReactWrapper;

    beforeAll(() => {
      wrapper = renderSelect({ label: "required", required: true });
    });

    it("the required prop is passed to the input", () => {
      const input = wrapper.find("input");
      expect(input.getDOMNode()).toHaveAttribute("required", "");
    });

    it("should add an asterisk after the label text", () => {
      assertStyleMatch(
        {
          content: '"*"',
          color: "var(--colorsSemanticNegative500)",
          fontWeight: "var(--fontWeights700)",
          marginLeft: "var(--spacing050)",
        },
        wrapper.find(StyledLabel),
        { modifier: "::after" }
      );
    });
  });

  describe("isOptional", () => {
    it("should add '(optional)' suffix when the isOptional prop is true", () => {
      const propWrapper = mount(
        <MultiSelect name="testSelect" id="testSelect" isOptional label="label">
          <Option value="opt1" text="red" borderColor="red" fill />
          <Option value="opt2" text="green" borderColor="green" />
          <Option value="opt3" text="blue" />
        </MultiSelect>
      );

      assertStyleMatch(
        {
          content: '"(optional)"',
        },
        propWrapper.find(StyledLabelContainer),
        { modifier: "::after" }
      );
    });
  });

  describe("uncontrolled", () => {
    const onChangeFn = jest.fn();
    const mockOptionObject = {
      value: "opt1",
      text: "red",
      selectionType: "enter",
      selectionConfirmed: true,
    };
    const textboxProps = {
      name: "testName",
      id: "testId",
    };
    const expectedEventObject = {
      selectionConfirmed: true,
      target: {
        ...textboxProps,
        value: ["opt1"],
      },
    };
    const wrapper = renderSelect({
      ...textboxProps,
      onChange: onChangeFn,
      openOnFocus: true,
    });

    it("does not call the onChange callback on first render", () => {
      expect(onChangeFn).not.toHaveBeenCalled();
    });

    it("calls the onChange callback when an update occurs after first render", () => {
      simulateSelectTextboxEvent(wrapper, "focus");
      act(() => {
        wrapper.find(SelectList).prop("onSelect")(mockOptionObject);
      });
      expect(onChangeFn).toHaveBeenCalledWith(expectedEventObject);
    });
  });

  describe("wrapPillText", () => {
    it("sets the allowTextWrap prop on the pills and overrides truncate value if true", () => {
      const pill = renderSelect({
        name: "testName",
        id: "testId",
        wrapPillText: true,
        truncatePillText: true,
        value: ["opt1"],
        onChange: jest.fn(),
      }).find(Pill);

      expect(pill.prop("wrapText")).toBe(true);
    });
  });
});

describe("aria-selected attribute for options", () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  describe("when controlled", () => {
    beforeEach(() => {
      wrapper = renderSelect({ value: ["opt1", "opt2"], onChange: () => {} });
    });

    it("the selected options have aria-selected=true", () => {
      simulateDropdownEvent(wrapper, "click");

      expect(
        wrapper.find(Option).at(0).getDOMNode().getAttribute("aria-selected")
      ).toBe("true");

      expect(
        wrapper.find(Option).at(1).getDOMNode().getAttribute("aria-selected")
      ).toBe("true");
    });

    it("the not selected options have aria-selected=false", () => {
      simulateDropdownEvent(wrapper, "click");

      expect(
        wrapper.find(Option).at(2).getDOMNode().getAttribute("aria-selected")
      ).toBe("false");
    });
  });

  describe("when uncontrolled", () => {
    beforeEach(() => {
      wrapper = renderSelect({ openOnFocus: true });
      simulateSelectTextboxEvent(wrapper, "focus");
      act(() => {
        wrapper.find(Option).first().simulate("click");
        wrapper.find(Option).at(1).simulate("click");
      });
    });

    it("the selected options have aria-selected=true", () => {
      expect(
        wrapper.find(Option).at(0).getDOMNode().getAttribute("aria-selected")
      ).toBe("true");

      expect(
        wrapper.find(Option).at(1).getDOMNode().getAttribute("aria-selected")
      ).toBe("true");
    });

    it("the not selected options have aria-selected=false", () => {
      expect(
        wrapper.find(Option).at(2).getDOMNode().getAttribute("aria-selected")
      ).toBe("false");
    });
  });

  it("has the expected border radius styling", () => {
    wrapper = renderSelect({});
    assertStyleMatch(
      { borderRadius: "var(--borderRadius050)" },
      wrapper.find(StyledInput)
    );

    assertStyleMatch(
      { borderRadius: "var(--borderRadius050)" },
      wrapper.find(StyledSelectListContainer)
    );
  });
});

describe("coverage filler for else path", () => {
  const wrapper = renderSelect();
  simulateSelectTextboxEvent(wrapper, "blur");
});

describe("when maxWidth is passed", () => {
  it("should be passed to InputPresentation", () => {
    const wrapper = renderSelect({ maxWidth: "67%" });

    assertStyleMatch(
      {
        maxWidth: "67%",
      },
      wrapper.find(InputPresentation)
    );
  });

  it("renders with maxWidth as 100% when no maxWidth is specified", () => {
    const wrapper = renderSelect({ maxWidth: "" });

    assertStyleMatch(
      {
        maxWidth: "100%",
      },
      wrapper.find(InputPresentation)
    );
  });
});
