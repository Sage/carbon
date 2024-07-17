import React, { useRef } from "react";
import { act } from "react-dom/test-utils";
import { mount, ReactWrapper } from "enzyme";

import SelectList, { SelectListProps } from "./select-list.component";
import {
  StyledSelectList,
  StyledSelectListTableHeader,
} from "./select-list.style";
import Option from "../../option";
import OptionRow from "../../option-row/option-row.component";
import OptionGroupHeader from "../../option-group-header";
import ListActionButton from "../list-action-button";
import Loader from "../../../loader";
import { assertStyleMatch } from "../../../../__spec_helper__/__internal__/test-utils";
import Popover from "../../../../__internal__/popover";
import * as guidModule from "../../../../__internal__/utils/helpers/guid";
import StyledOption from "../../option/option.style";
import StyledOptionRow from "../../option-row/option-row.style";
import StyledOptionGroupHeader from "../../option-group-header/option-group-header.style";

const mockedGuid = "guid-12345";
const guidSpy = jest.spyOn(guidModule, "default");
guidSpy.mockImplementation(() => "guid-12345");

const tabKeyDownEvent = new KeyboardEvent("keydown", {
  key: "Tab",
  bubbles: true,
});
const downKeyDownEvent = new KeyboardEvent("keydown", {
  key: "ArrowDown",
  bubbles: true,
});
const upKeyDownEvent = new KeyboardEvent("keydown", {
  key: "ArrowUp",
  bubbles: true,
});
const homeKeyDownEvent = new KeyboardEvent("keydown", {
  key: "Home",
  bubbles: true,
});
const endKeyDownEvent = new KeyboardEvent("keydown", {
  key: "End",
  bubbles: true,
});

function getSelectList(props: Partial<SelectListProps>) {
  const defaultProps = {
    onSelect: () => {},
    onSelectListClose: () => {},
    isOpen: true,
    id: props.id,
  };

  const WrapperComponent = (wrapperProps: Partial<SelectListProps>) => {
    const mockRef = useRef(null);

    return (
      <SelectList ref={mockRef} {...defaultProps} {...props} {...wrapperProps}>
        <Option id={defaultProps.id} value="opt1" text="red" />
        <Option id={defaultProps.id} value="opt2" text="green" />
        <Option id={defaultProps.id} value="opt3" text="blue" />
      </SelectList>
    );
  };

  return <WrapperComponent />;
}

function getOptionRowSelectList(props: Partial<SelectListProps>) {
  const defaultProps = {
    onSelect: () => {},
    onSelectListClose: () => {},
    isOpen: true,
    id: props.id,
  };

  const WrapperComponent = (wrapperProps: Partial<SelectListProps>) => {
    const mockRef = useRef(null);

    return (
      <SelectList
        multiColumn
        ref={mockRef}
        {...defaultProps}
        {...props}
        {...wrapperProps}
      >
        <OptionRow id={defaultProps.id} value="opt1" text="red">
          <td>red</td>
        </OptionRow>
        <OptionRow id={defaultProps.id} value="opt2" text="green">
          <td>green</td>
        </OptionRow>
        <OptionRow id={defaultProps.id} value="opt3" text="blue">
          <td>blue</td>
        </OptionRow>
      </SelectList>
    );
  };

  return <WrapperComponent />;
}

function getGroupedSelectList(props: Partial<SelectListProps>) {
  const defaultProps = {
    onSelect: () => {},
    onSelectListClose: () => {},
    isOpen: true,
    id: props.id,
  };

  const WrapperComponent = (wrapperProps: Partial<SelectListProps>) => {
    const mockRef = useRef(null);

    return (
      <SelectList ref={mockRef} {...defaultProps} {...props} {...wrapperProps}>
        <OptionGroupHeader id={defaultProps.id} label="Heading one" />
        <Option id={defaultProps.id} value="opt1" text="red" />
        <Option id={defaultProps.id} value="opt2" text="green" />
        <OptionGroupHeader id={defaultProps.id} label="Heading two" />
        <Option id={defaultProps.id} value="opt3" text="blue" />
        <Option id={defaultProps.id} value="opt4" text="black" />
      </SelectList>
    );
  };

  return <WrapperComponent />;
}

function renderSelectList(props = {}, renderer = mount, enzymeOptions = {}) {
  return renderer(getSelectList(props), enzymeOptions);
}

function renderOptionRowSelectList(
  props = {},
  renderer = mount,
  enzymeOptions = {}
) {
  return renderer(getOptionRowSelectList(props), enzymeOptions);
}

function renderGroupedSelectList(props = {}, renderer = mount) {
  return renderer(getGroupedSelectList(props));
}

function renderWithVirtualScrollAndGroupHeaders() {
  const children = Array(11000)
    .fill(undefined)
    .map((_, index) =>
      index % 11 === 0 ? (
        <OptionGroupHeader
          key={`option-${index + 1}`}
          label={`Group ${index / 11 + 1}`}
          icon="individual"
        />
      ) : (
        <Option
          key={`option-${index + 1}`}
          value={`${index}`}
          text={`Option ${index - Math.floor(index / 11)}`}
        />
      )
    );

  const SelectListWithManyOptions = () => {
    const mockRef = useRef(null);

    return (
      <SelectList
        ref={mockRef}
        isOpen
        enableVirtualScroll
        virtualScrollOverscan={20}
        onSelect={() => {}}
        onSelectListClose={() => {}}
      >
        {children}
      </SelectList>
    );
  };
  return mount(<SelectListWithManyOptions />);
}

describe("SelectList", () => {
  let boundingClientRectSpy: jest.SpyInstance;

  beforeEach(() => {
    // need to mock getBoundingClientRect, which is used inside virtualisation library,
    // otherwise elements are measured to have 0 height
    boundingClientRectSpy = jest
      .spyOn(Element.prototype, "getBoundingClientRect")
      .mockImplementation(
        () =>
          ({
            height: 40,
          } as DOMRect)
      );
  });

  afterEach(() => {
    boundingClientRectSpy.mockRestore();
  });

  // TODO: Difficulty migrating this test due to use of SelectTextbox ref leading to TS errors
  describe("when the anchor element is provided", () => {
    let wrapper: ReactWrapper;
    const testContainer = document.createElement("div");
    const onFocusFn = jest.fn();
    const mockAnchorElement = document.createElement("div");
    const mockInput = document.createElement("input");
    mockAnchorElement.appendChild(mockInput);

    mockInput.focus = onFocusFn;
    testContainer.id = "enzymeContainer";
    document.body.appendChild(testContainer);

    beforeEach(() => {
      wrapper = mount(getSelectList({ anchorElement: mockAnchorElement }), {
        attachTo: testContainer,
      });
    });

    afterEach(() => {
      wrapper.detach();
    });

    afterAll(() => {
      document.body.removeChild(testContainer);
    });

    describe.each([
      ["Up", upKeyDownEvent],
      ["Down", downKeyDownEvent],
      ["Home", homeKeyDownEvent],
      ["End", endKeyDownEvent],
    ])("and then the %s key is pressed", (key, keyEvent) => {
      it("then the focus function should have been called on the anchor element", () => {
        onFocusFn.mockClear();
        act(() => {
          testContainer.dispatchEvent(keyEvent);
        });
        expect(onFocusFn).toHaveBeenCalled();
      });
    });
  });

  describe("when the isLoading prop is provided", () => {
    it("and is in multiColumn mode, then a Loader Component should be rendered", () => {
      const wrapper = renderOptionRowSelectList({
        isLoading: true,
        onListAction: () => {},
      });
      expect(wrapper.find(Loader).exists()).toBe(true);
    });

    describe.each([true, false])(
      "and there is only one option",
      (multiColumn) => {
        it("that option should have the hidden prop", () => {
          const SelectWithOneOption = () => {
            const ref = useRef(null);
            return (
              <SelectList
                onSelect={() => {}}
                onSelectListClose={() => {}}
                multiColumn={multiColumn}
                isLoading
                isOpen
                ref={ref}
              >
                {multiColumn ? (
                  <OptionRow value="opt1" text="red">
                    <td>foo</td>
                  </OptionRow>
                ) : (
                  <Option value="opt1" text="red" />
                )}
              </SelectList>
            );
          };

          const wrapper = mount(<SelectWithOneOption />);

          expect(
            wrapper
              .find(multiColumn ? OptionRow : Option)
              .first()
              .prop("hidden")
          ).toBe(true);
        });
      }
    );
  });

  describe("when the listActionButton prop is provided", () => {
    it("then the ListActionButton should be rendered", () => {
      const wrapper = renderSelectList({
        listActionButton: true,
        onListAction: () => {},
      });
      expect(wrapper.find(ListActionButton).exists()).toBe(true);
      wrapper.unmount();
    });

    describe("when the anchor element is provided", () => {
      let wrapper: ReactWrapper;
      const testContainer = document.createElement("div");
      const onFocusFn = jest.fn();
      const onSelectFn = jest.fn();
      const expectedSelectValue = {
        selectionType: "tab",
        selectionConfirmed: false,
      };

      document.body.appendChild(testContainer);

      beforeEach(() => {
        wrapper = renderSelectList(
          {
            listActionButton: true,
            onListAction: () => {},
            onSelect: onSelectFn,
          },
          mount,
          { attachTo: testContainer }
        );
      });

      afterEach(() => {
        wrapper.detach();
      });

      afterAll(() => {
        document.body.removeChild(testContainer);
      });

      it("then the focus function should have been called on the ListActionButton", () => {
        onFocusFn.mockClear();
        (wrapper
          .find(ListActionButton)
          .find("button")
          .getDOMNode() as HTMLButtonElement).focus = onFocusFn;
        act(() => {
          testContainer.dispatchEvent(tabKeyDownEvent);
        });
        expect(onFocusFn).toHaveBeenCalled();
      });

      describe("with the ListActionButton already focused", () => {
        it("then the onSelect function prop should have been called with expected value", () => {
          onSelectFn.mockClear();
          (wrapper
            .find(ListActionButton)
            .find("button")
            .getDOMNode() as HTMLButtonElement).focus();

          act(() => {
            testContainer.dispatchEvent(tabKeyDownEvent);
          });
          expect(onSelectFn).toHaveBeenCalledWith(expectedSelectValue);
        });
      });
    });
  });

  describe("popover", () => {
    it("renders Popover with correct props", () => {
      const wrapper = renderSelectList();

      expect(wrapper.find(Popover).props().disableBackgroundUI).toBe(true);
      expect(wrapper.find(Popover).props().animationFrame).toBe(true);
      expect(wrapper.find(Popover).props().middleware?.[0]).toMatchObject({
        name: "offset",
        options: 3,
      });
      expect(wrapper.find(Popover).props().middleware?.[1]).toMatchObject({
        name: "size",
      });
      expect(wrapper.find(Popover).props().middleware?.[2]).toMatchObject({
        name: "flip",
      });
    });

    it.each(["top", "bottom", "right", "left"])(
      "passes listPlacement prop as a placement prop",
      (listPlacement) => {
        const wrapper = renderSelectList({ listPlacement });

        expect(wrapper.find(Popover).prop("placement")).toBe(listPlacement);
      }
    );
  });

  describe("when non option elements are provided as children", () => {
    it("then isHighlighted prop should not be set on them", () => {
      const SelectWithNonOptionChildren = () => {
        const ref = useRef(null);
        return (
          <SelectList
            onSelect={() => {}}
            onSelectListClose={() => {}}
            isOpen
            ref={ref}
          >
            {false && ""}
            <li>not an option element</li>
          </SelectList>
        );
      };
      const wrapper = mount(<SelectWithNonOptionChildren />);
      expect(wrapper.find("li").prop("isHighlighted")).toBe(undefined);
      wrapper.unmount();
    });
  });

  describe("with option headings", () => {
    it("renders the select list with headings", () => {
      const wrapper = renderGroupedSelectList();
      expect(wrapper.find(OptionGroupHeader).length).toEqual(2);
    });

    describe("when the down key is pressed", () => {
      let wrapper;
      let domNode: HTMLElement;
      const onSelectFn = jest.fn();

      beforeEach(() => {
        wrapper = renderGroupedSelectList({ onSelect: onSelectFn });
        domNode = wrapper.getDOMNode();
        document.body.appendChild(domNode);
      });

      afterEach(() => {
        document.body.removeChild(domNode);
      });

      it("then the onSelect prop should have been called with expected data", () => {
        act(() => {
          domNode.dispatchEvent(downKeyDownEvent);
        });
        expect(onSelectFn).toHaveBeenCalledWith({
          id: mockedGuid,
          selectionType: "navigationKey",
          text: "red",
          value: "opt1",
          selectionConfirmed: false,
        });
      });
    });
  });

  describe("multiColumn mode", () => {
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "offsetWidth"
    );
    const originalClientWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "clientWidth"
    );

    afterAll(() => {
      if (originalOffsetWidth) {
        Object.defineProperty(
          HTMLElement.prototype,
          "offsetWidth",
          originalOffsetWidth
        );
      }

      if (originalClientWidth) {
        Object.defineProperty(
          HTMLElement.prototype,
          "clientWidth",
          originalClientWidth
        );
      }
    });

    it("aligns the column if needed", () => {
      Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
        configurable: true,
        value: 20,
      });
      Object.defineProperty(HTMLElement.prototype, "clientWidth", {
        configurable: true,
        value: 10,
      });

      const wrapper = renderOptionRowSelectList();
      assertStyleMatch(
        {
          width: "calc(100% - 10px)",
        },
        wrapper.find(StyledSelectListTableHeader),
        {
          modifier: "tr",
        }
      );
    });
  });

  describe("ARIA", () => {
    describe("when labelId prop is provided", () => {
      const labelId = "labelId-guid";
      guidSpy.mockImplementationOnce(() => labelId);

      it("set aria-labelledby to it", () => {
        const wrapper = renderSelectList({ labelId });
        const ariaLabelledBy = wrapper
          .find(StyledSelectList)
          .prop("aria-labelledby");
        expect(ariaLabelledBy).toEqual(labelId);
      });
    });

    describe("when labelId is undefined", () => {
      it("do not set aria-labelledby", () => {
        const wrapper = renderSelectList({ labelId: undefined });
        const ariaLabelledBy = wrapper
          .find(StyledSelectList)
          .prop("aria-labelledby");
        expect(ariaLabelledBy).toEqual(undefined);
      });
    });

    describe("aria-posinset and aria-setsize", () => {
      let wrapper: ReactWrapper;

      beforeEach(() => {
        wrapper = renderWithVirtualScrollAndGroupHeaders();
      });

      afterEach(() => {
        wrapper.unmount();
      });

      it("are set on the Option children, with aria-posinset going up in sequence", () => {
        const totalOptions = "10000";
        const optionChildren = wrapper.find(Option);
        const ninthOption = optionChildren.at(8).getDOMNode();
        expect(ninthOption.getAttribute("aria-setsize")).toBe(totalOptions);
        expect(ninthOption.getAttribute("aria-posinset")).toBe("9");
        const twelfthOption = optionChildren.at(11).getDOMNode();
        expect(twelfthOption.getAttribute("aria-setsize")).toBe(totalOptions);
        expect(twelfthOption.getAttribute("aria-posinset")).toBe("12");
      });

      it("are not set on the other children", () => {
        const groupHeader = wrapper.find(OptionGroupHeader).at(0).getDOMNode();
        expect(groupHeader.getAttribute("aria-setsize")).toBe(null);
        expect(groupHeader.getAttribute("aria-posinset")).toBe(null);
      });
    });
  });

  describe.each([
    ["Option", renderSelectList, StyledOption],
    ["OptionRow", renderOptionRowSelectList, StyledOptionRow],
    ["OptionGroupHeader", renderGroupedSelectList, StyledOptionGroupHeader],
  ])(
    "ID checks on %s children when SelectList is parent",
    (component, listRenderer, optionType) => {
      let wrapper: ReactWrapper;
      let domNode: HTMLElement;
      const id = "foo";

      it("id attribute should equal the value of the id prop when passed", () => {
        wrapper = listRenderer({ id });

        domNode = wrapper.find(optionType).at(0).getDOMNode();
        expect(domNode.getAttribute("id")).toBe(id);
      });

      it("when no id pop is passed, id attribute should be populated using a guid", () => {
        wrapper = listRenderer();

        domNode = wrapper.find(optionType).at(0).getDOMNode();
        expect(domNode.getAttribute("id")).toBe(mockedGuid);
      });
    }
  );

  describe("IDs are stable over the component's lifecycle", () => {
    let wrapper: ReactWrapper;
    let optionIds: string[];

    beforeEach(() => {
      guidSpy.mockRestore();
      wrapper = renderSelectList({ isOpen: false });
      optionIds = wrapper
        .find(Option)
        .map((option) => option.getDOMNode().getAttribute("id") as string);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("when the list is opened for the first time", () => {
      wrapper.setProps({ open: true });
      wrapper.update();
      const currentOptionIds = wrapper
        .find(Option)
        .map((option) => option.getDOMNode().getAttribute("id"));
      expect(currentOptionIds).toEqual(optionIds);
    });

    it("when the list is opened and then closed", () => {
      wrapper.setProps({ open: true });
      wrapper.update();
      wrapper.setProps({ open: false });
      wrapper.update();
      const currentOptionIds = wrapper
        .find(Option)
        .map((option) => option.getDOMNode().getAttribute("id"));
      expect(currentOptionIds).toEqual(optionIds);
    });

    it("when the list is opened, closed and then re-opened", () => {
      wrapper.setProps({ open: true });
      wrapper.update();
      wrapper.setProps({ open: false });
      wrapper.update();
      wrapper.setProps({ open: true });
      wrapper.update();
      const currentOptionIds = wrapper
        .find(Option)
        .map((option) => option.getDOMNode().getAttribute("id"));
      expect(currentOptionIds).toEqual(optionIds);
    });
  });
});
