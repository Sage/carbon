import React, { useState } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import {
  simulateSelectTextboxEvent,
  simulateDropdownEvent,
} from "../../../__spec_helper__/__internal__/select-test-utils";
import { MultiSelect, Option } from "..";
import StyledOption from "../option/option.style";
import Textbox from "../../textbox";
import MatchingText from "../__internal__/utils/matching-text.style";
import SelectList from "../__internal__/select-list/select-list.component";
import { StyledSelectListContainer } from "../__internal__/select-list/select-list.style";
import Pill from "../../pill";
import guid from "../../../__internal__/utils/helpers/guid";
import mockDOMRect from "../../../__spec_helper__/mock-dom-rect";

const mockedGuid = "mocked-guid";
jest.mock("../../../__internal__/utils/helpers/guid");
jest.useFakeTimers();
(guid as jest.MockedFunction<typeof guid>).mockReturnValue(mockedGuid);

function renderSelect(props = {}, renderer = mount, opts = {}) {
  return renderer(
    <MultiSelect name="testSelect" id="testSelect" {...props}>
      <Option value="opt1" text="red" />
      <Option value="opt2" text="green" />
      <Option value="opt3" text="blue" />
      <Option value="opt4" text="yellow" />
      <Option value="opt5" text="forest green" />
    </MultiSelect>,
    {
      attachTo: document.getElementById("enzymeContainer"),
      ...opts,
    }
  );
}

jest.mock("../../../__internal__/utils/logger");

describe("MultiSelect", () => {
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

  describe('when the "onBlur" prop has been passed and the input has been blurred', () => {
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

  describe('when the "openOnFocus" prop is set', () => {
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
});
