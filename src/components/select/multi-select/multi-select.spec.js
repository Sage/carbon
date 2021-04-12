import React, { useRef } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../../__spec_helper__/test-utils";
import MultiSelect from "./multi-select.component";
import Textbox from "../../../__experimental__/components/textbox";
import SelectTextbox from "../select-textbox/select-textbox.component";
import Option from "../option/option.component";
import SelectList from "../select-list/select-list.component";
import { StyledSelectList } from "../select-list/select-list.style";
import Pill from "../../pill";
import Label from "../../../__experimental__/components/label";
import InputPresentationStyle from "../../../__experimental__/components/input/input-presentation.style";

describe("MultiSelect", () => {
  testStyledSystemMargin((props) => getSelect(props));

  describe("when an HTML element is clicked", () => {
    let wrapper;
    let domNode;

    beforeEach(() => {
      wrapper = mount(getSelect({ openOnFocus: true }));
      domNode = wrapper.getDOMNode();
      document.body.appendChild(domNode);
    });

    describe("and that element is part of the Select", () => {
      it("then the SelectList should be open", () => {
        wrapper.find("input").simulate("focus");
        expect(wrapper.find(SelectList).exists()).toBe(true);
        act(() => {
          wrapper
            .find(StyledSelectList)
            .getDOMNode()
            .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(wrapper.update().find(SelectList).exists()).toBe(true);
      });
    });

    describe("and that element is not part of the Select", () => {
      it("then the SelectList should be closed", () => {
        wrapper.find("input").simulate("focus");
        expect(wrapper.find(SelectList).exists()).toBe(true);
        act(() => {
          document.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(wrapper.update().find(SelectList).exists()).toBe(false);
      });
    });

    afterEach(() => {
      document.body.removeChild(domNode);
    });
  });

  it("the input ref should be forwarded", () => {
    let mockRef;

    const WrapperComponent = () => {
      mockRef = useRef();

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

  describe("disablePortal", () => {
    it("renders SelectList as a content of positionedChildren prop on Textbox when disablePortal is true", () => {
      const wrapper = renderSelect({ disablePortal: true });

      wrapper.find(Textbox).find('[type="dropdown"]').first().simulate("click");
      const positionedChildren = mount(
        wrapper.find(SelectTextbox).props().positionedChildren
      );
      expect(positionedChildren.find(SelectList).exists()).toBe(true);
    });

    it("renders SelectList as a direct children of StyledSimpleSelect by default", () => {
      const wrapper = renderSelect();

      wrapper.find(Textbox).find('[type="dropdown"]').first().simulate("click");
      expect(wrapper.find(SelectTextbox).props().positionedChildren).toBe(
        undefined
      );
      expect(wrapper.find(SelectList).exists()).toBe(true);
    });
  });

  it.each([
    ["small", "32px"],
    ["medium", "40px"],
    ["large", "48px"],
  ])("the input toggle icon should have proper left margin", (a, expected) => {
    const wrapper = renderSelect({ size: a });
    assertStyleMatch(
      {
        paddingRight: expected,
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
  });

  describe('when the "onFocus" prop has been passed and the input has been focused', () => {
    it("then that prop should be called", () => {
      const onFocusFn = jest.fn();
      const wrapper = renderSelect({ onFocus: onFocusFn });

      wrapper.find("input").simulate("focus");
      expect(onFocusFn).toHaveBeenCalled();
    });
  });

  describe('when the "onBlur" prop has been passed and the input has been blurred', () => {
    it("then that prop should be called", () => {
      const onBlurFn = jest.fn();
      const wrapper = renderSelect({ onBlur: onBlurFn });

      wrapper.find("input").simulate("blur");
      expect(onBlurFn).toHaveBeenCalled();
    });

    describe("and there is a mouseDown reported on open list", () => {
      it("then that prop should not be called", () => {
        const onBlurFn = jest.fn();
        const wrapper = renderSelect({ onBlur: onBlurFn, openOnFocus: true });

        wrapper.find("input").simulate("focus");
        wrapper.find(Option).first().simulate("mousedown");
        wrapper.find("input").simulate("blur");
        expect(onBlurFn).not.toHaveBeenCalled();
      });
    });
  });

  describe("when the Textbox Input is focused", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = renderSelect();
    });

    it("the SelectList should not be rendered", () => {
      wrapper.find("input").simulate("focus");
      expect(wrapper.find(SelectList).exists()).toBe(false);
    });

    describe.each(["ArrowDown", "ArrowUp", "Home", "End"])(
      'and "%s" key has been pressed',
      (key) => {
        it("the SelectList should be rendered", () => {
          wrapper.find("input").simulate("keydown", { key });
          expect(wrapper.update().find(SelectList).exists()).toBe(true);
        });

        describe("with readOnly prop set to true", () => {
          it("then the SelectList should not be rendered", () => {
            wrapper.setProps({ readOnly: true });
            wrapper.update().find("input").simulate("keydown", { key });
            expect(wrapper.find(SelectList).exists()).toBe(false);
          });
        });
      }
    );

    describe('and the "Enter" key has been pressed', () => {
      it("the SelectList should not be rendered", () => {
        wrapper.find("input").simulate("keydown", { key: "Enter" });
        expect(wrapper.find(SelectList).exists()).toBe(false);
      });

      describe("with readOnly prop set to true", () => {
        it("then the SelectList should not be rendered", () => {
          wrapper.setProps({ readOnly: true });
          wrapper.update().find("input").simulate("keydown", { key: "Enter" });
          expect(wrapper.find(SelectList).exists()).toBe(false);
        });
      });
    });
  });

  describe('when the "onKeyDown" prop is passed', () => {
    const expectedEventObject = {
      key: "ArrowDown",
      which: 40,
    };

    it("then when a key is pressed, that prop should be called with expected values", () => {
      const onKeyDownFn = jest.fn();
      const wrapper = renderSelect({ onKeyDown: onKeyDownFn });

      wrapper.find("input").simulate("keyDown", expectedEventObject);

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
          wrapper.find("input").simulate("keyDown", keyDownEventObject);
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
          wrapper.find("input").simulate("keyDown", keyDownEventObject);
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
            wrapper.find("input").simulate("keyDown", keyDownEventObject);
            expect(onChangeFn).not.toHaveBeenCalled();
          });
        });
      });

      describe("and the text in the Textbox is cleared after selection", () => {
        const mockOptionObject = {
          value: "opt3",
          text: "blue",
          selectionType: "enter",
        };
        const changeEventObject = { target: { value: "b" } };

        it("then the last value should be removed", () => {
          const wrapper = renderSelect({ defaultValue: ["opt2", "opt1"] });
          wrapper.find("input").simulate("change", changeEventObject);

          act(() => {
            wrapper.find(SelectList).prop("onSelect")(mockOptionObject);
          });
          expect(wrapper.update().find(Pill)).toHaveLength(3);
          wrapper.find("input").simulate("keyDown", keyDownEventObject);
          expect(wrapper.find(Pill)).toHaveLength(2);
        });
      });
    }
  );

  describe('when the "onDelete" prop has been called on a pill', () => {
    it("then a corresponding value should be removed from the Textbox value", () => {
      const wrapper = renderSelect({ defaultValue: ["opt1", "opt2", "opt3"] });

      act(() => {
        wrapper.find(Pill).at(0).props().onDelete();
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

        expect(wrapper.find(Pill).at(0).props().onDelete).toBe(null);
      });
    }
  );

  describe("when the Textbox Input is clicked", () => {
    it("the SelectList should not be rendered", () => {
      const wrapper = renderSelect();

      wrapper.find("input").simulate("click");
      expect(wrapper.find(SelectList).exists()).toBe(false);
    });

    describe('and the "onClick" prop is passed', () => {
      it("then that prop should be called", () => {
        const onClickFn = jest.fn();
        const wrapper = renderSelect({ onClick: onClickFn });

        wrapper.find("input").simulate("click");
        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe('and the "onOpen" prop is passed', () => {
      it("then that prop should not be called", () => {
        const onOpenFn = jest.fn();
        const wrapper = renderSelect({ onOpen: onOpenFn });

        wrapper.find("input").simulate("click");
        expect(onOpenFn).not.toHaveBeenCalled();
      });

      describe("and the focus triggered by mouseDown on the input", () => {
        it("then that prop should not have been called", () => {
          const onOpenFn = jest.fn();
          const wrapper = renderSelect({ onOpen: onOpenFn });

          wrapper.find("input").simulate("mouseDown");
          wrapper.find("input").simulate("focus");
          expect(onOpenFn).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe("when the Dropdown Icon in the Textbox has been clicked", () => {
    it("the SelectList should be rendered", () => {
      const wrapper = renderSelect();

      wrapper.find(Textbox).find('[type="dropdown"]').first().simulate("click");
      expect(wrapper.find(SelectList).exists()).toBe(true);
    });

    describe("twice", () => {
      it("the SelectList should not be rendered", () => {
        const wrapper = renderSelect();
        const dropdown = wrapper
          .find(Textbox)
          .find('[type="dropdown"]')
          .first();
        dropdown.simulate("click");
        dropdown.simulate("click");
        expect(wrapper.find(SelectList).exists()).toBe(false);
      });
    });

    describe('and the "onOpen" prop is passed', () => {
      it("then that prop should be called", () => {
        const onOpenFn = jest.fn();
        const wrapper = renderSelect({ onOpen: onOpenFn });

        wrapper
          .find(Textbox)
          .find('[type="dropdown"]')
          .first()
          .simulate("click");
        expect(onOpenFn).toHaveBeenCalled();
      });
    });

    describe('and the "onClick" prop is passed', () => {
      it("then that prop should be called", () => {
        const onClickFn = jest.fn();
        const wrapper = renderSelect({ onClick: onClickFn });

        wrapper
          .find(Textbox)
          .find('[type="dropdown"]')
          .first()
          .simulate("click");
        expect(onClickFn).toHaveBeenCalled();
      });
    });
  });

  describe('when the "openOnFocus" prop is set', () => {
    describe("and the Textbox Input is focused", () => {
      it("the SelectList should be rendered", () => {
        const wrapper = renderSelect({ openOnFocus: true });

        wrapper.find("input").simulate("focus");
        expect(wrapper.find(SelectList).exists()).toBe(true);
      });

      describe.each(["readOnly", "disabled"])(
        'with the "%s" prop passed',
        (prop) => {
          it("the SelectList should not be rendered", () => {
            const obj = { [prop]: true, openOnFocus: true };
            const wrapper = renderSelect(obj);

            wrapper.find("input").simulate("focus");
            expect(wrapper.find(SelectList).exists()).toBe(false);
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

          wrapper.find("input").simulate("focus");
          expect(onFocusFn).toHaveBeenCalled();
        });
      });

      describe('with the "onOpen" prop passed', () => {
        let wrapper;
        let onOpenFn;

        beforeEach(() => {
          onOpenFn = jest.fn();
          wrapper = renderSelect({ onOpen: onOpenFn, openOnFocus: true });
        });

        it("then that prop should have been called", () => {
          wrapper.find("input").simulate("focus");
          expect(onOpenFn).toHaveBeenCalled();
        });

        describe("and with the SelectList already open", () => {
          it("then that prop should not be called", () => {
            wrapper.find("input").simulate("focus");
            onOpenFn.mockReset();
            expect(wrapper.find(SelectList).exists()).toBe(true);
            wrapper.find("input").simulate("focus");
            expect(onOpenFn).not.toHaveBeenCalled();
          });
        });

        describe("and the focus triggered by mouseDown on the input", () => {
          it("then that prop should have been called", () => {
            wrapper.find("input").simulate("mouseDown");
            wrapper.find("input").simulate("focus");
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
          wrapper
            .find(Textbox)
            .find('[type="dropdown"]')
            .first()
            .simulate("mouseDown");
          wrapper.find("input").simulate("focus");
          expect(onOpenFn).toHaveBeenCalled();
        });
      });
    });
  });

  describe("when a printable character has been typed in the Textbox", () => {
    it('the SelectList should have the "filterText" prop the same as the value', () => {
      const changeEventObject = { target: { value: "Foo" } };
      const wrapper = renderSelect();

      wrapper.find("input").simulate("click");
      wrapper.find("input").simulate("change", changeEventObject);
      expect(wrapper.update().find(SelectList).prop("filterText")).toBe("Foo");
    });

    describe('with the "onOpen" prop passed', () => {
      it("then that prop should be called", () => {
        const onOpenFn = jest.fn();
        const wrapper = renderSelect({ onOpen: onOpenFn });

        wrapper.find("input").simulate("change", { target: { value: "b" } });

        expect(onOpenFn).toHaveBeenCalled();
      });
    });
  });

  describe('when the "onSelect" is called in the SelectList', () => {
    const mockOptionObject = {
      value: "opt1",
      text: "red",
    };
    const mockNavigationKeyOptionObject = {
      value: "opt1",
      text: "red",
      selectionType: "navigationKey",
    };
    const textboxProps = {
      name: "testName",
      id: "testId",
    };
    const expectedEventObject = {
      target: {
        ...textboxProps,
        value: ["opt1"],
      },
    };

    it("the SelectList should not be closed", () => {
      const wrapper = renderSelect({ openOnFocus: true });

      wrapper.find("input").simulate("focus");
      expect(wrapper.find(SelectList).exists()).toBe(true);
      act(() => {
        wrapper.find(SelectList).prop("onSelect")(mockOptionObject);
      });
      expect(wrapper.update().find(SelectList).exists()).toBe(true);
    });

    describe('and the "onChange" prop is passed', () => {
      it("then that prop should be called with the same value in a list", () => {
        const onChangeFn = jest.fn();
        const wrapper = renderSelect({
          ...textboxProps,
          onChange: onChangeFn,
          openOnFocus: true,
        });

        wrapper.find("input").simulate("focus");
        act(() => {
          wrapper.find(SelectList).prop("onSelect")(mockOptionObject);
        });
        expect(onChangeFn).toHaveBeenCalledWith(expectedEventObject);
      });

      describe('with the "selectionType" set to "navigationKey"', () => {
        it("then that prop should not be called", () => {
          const onChangeFn = jest.fn();
          const wrapper = renderSelect({
            ...textboxProps,
            onChange: onChangeFn,
            openOnFocus: true,
          });

          wrapper.find("input").simulate("focus");
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

      wrapper.find("input").simulate("focus");
      act(() => {
        wrapper.find(Option).first().simulate("click");
      });
      expect(wrapper.update().find(SelectList).exists()).toBe(true);
    });

    describe('with the "onChange" prop passed', () => {
      describe("and that Option is already selected", () => {
        it("then that prop should not be called", () => {
          const onChangeFn = jest.fn();
          const wrapper = renderSelect({
            openOnFocus: true,
            defaultValue: ["opt1"],
          });

          wrapper.find("input").simulate("focus");
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

          wrapper.find("input").simulate("focus");
          act(() => {
            wrapper.find(Option).first().simulate("click");
          });
          expect(onChangeFn).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('when the "onSelectListClose" is called in the SelectList', () => {
    it("the SelectList should be closed", () => {
      const wrapper = renderSelect({ openOnFocus: true });

      wrapper.find("input").simulate("focus");
      expect(wrapper.find(SelectList).exists()).toBe(true);
      act(() => {
        wrapper.find(SelectList).prop("onSelectListClose")();
      });
      expect(wrapper.update().find(SelectList).exists()).toBe(false);
    });
  });

  describe("when the component is controlled", () => {
    const expectedObject = {
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
    };

    describe("and an option is selected", () => {
      it("then the onChange prop should be called with expected value", () => {
        const onChangeFn = jest.fn();
        const wrapper = renderSelect({ value: ["opt1"], onChange: onChangeFn });

        wrapper
          .find(Textbox)
          .find('[type="dropdown"]')
          .first()
          .simulate("click");
        expect(wrapper.find(SelectList).exists()).toBe(true);
        act(() => {
          wrapper.find(SelectList).prop("onSelect")(clickOptionObject);
        });
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
          wrapper.find("input").simulate("keyDown", keyDownEventObject);
          expect(onChangeFn).toHaveBeenCalledWith(expectedObject);
        });
      }
    );
  });

  describe("required", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = renderSelect({ label: "required", required: true });
    });

    it("the required prop is passed to the input", () => {
      const input = wrapper.find("input");
      expect(input.prop("required")).toBe(true);
    });

    it("the isRequired prop is passed to the label", () => {
      const label = wrapper.find(Label);
      expect(label.prop("isRequired")).toBe(true);
    });
  });
});

describe("coverage filler for else path", () => {
  const wrapper = renderSelect();
  wrapper.find("input").simulate("blur");
});

function renderSelect(props = {}, renderer = mount) {
  return renderer(getSelect(props));
}

function getSelect(props) {
  return (
    <MultiSelect name="testSelect" id="testSelect" {...props}>
      <Option value="opt1" text="red" />
      <Option value="opt2" text="green" />
      <Option value="opt3" text="blue" />
    </MultiSelect>
  );
}
