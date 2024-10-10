import React, { useState } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import { simulateSelectTextboxEvent } from "../../../__spec_helper__/__internal__/select-test-utils";
import { MultiSelect, Option } from "..";
import StyledOption from "../option/option.style";
import MatchingText from "../__internal__/utils/matching-text.style";
import SelectList from "../__internal__/select-list/select-list.component";
import { StyledSelectListContainer } from "../__internal__/select-list/select-list.style";
import Pill from "../../pill";
import mockDOMRect from "../../../__spec_helper__/mock-dom-rect";

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

describe("MultiSelect", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockDOMRect(200, 200, "select-list-scrollable-container");
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  // catches previous bug
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
      document.body.dispatchEvent(
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

          document.body.dispatchEvent(
            new KeyboardEvent("keydown", {
              key,
              bubbles: true,
            })
          );
        });
      }).not.toThrow();
    }
  );

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

  // implementation specific
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
});
