import React from "react";
import { mount, ReactWrapper, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { Input } from "../../__internal__/input";
import Button from "../button";
import Search, { SearchProps } from "./search.component";
import StyledSearchButton from "./search-button.style";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import StyledTextInput from "../../__internal__/input/input-presentation.style";
import StyledInputIconToggle from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import StyledIcon from "../icon/icon.style";
import Icon from "../icon";
import TextBox from "../textbox";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import Logger from "../../__internal__/utils/logger";

describe("Search", () => {
  let wrapper: ReactWrapper;
  let onBlur: jest.Mock;
  let onFocus: jest.Mock;
  let onChange: jest.Mock;
  let onClick: jest.Mock;
  let onKeyDown: jest.Mock;

  testStyledSystemMargin((props) => <Search value="" {...props} />);

  function renderSearch(
    props: SearchProps & React.RefAttributes<HTMLInputElement>
  ) {
    return mount(<Search {...props} />);
  }

  describe("styles", () => {
    it("matches the expected styles", () => {
      assertStyleMatch(
        {
          borderBottom: "2px solid var(--colorsUtilityMajor300)",
          display: "inline-flex",
          fontSize: "14px",
          fontWeight: "700",
        },
        renderSearch({ value: "" })
      );
    });

    it("applies the default width when the user does not specify a width", () => {
      assertStyleMatch(
        {
          borderBottom: "2px solid var(--colorsUtilityMajor300)",
          display: "inline-flex",
          fontSize: "14px",
          fontWeight: "700",
          width: "100%",
        },
        renderSearch({ value: "", searchWidth: undefined })
      );
    });

    it("applies the correct width specified by the user", () => {
      assertStyleMatch(
        {
          borderBottom: "2px solid var(--colorsUtilityMajor300)",
          display: "inline-flex",
          fontSize: "14px",
          fontWeight: "700",
          width: "400px",
        },
        renderSearch({ value: "", searchWidth: "400px" })
      );
    });

    it("matches the expected styles when the input is focused", () => {
      wrapper = renderSearch({ value: "" });
      const input = wrapper.find("input");
      input.simulate("focus");

      assertStyleMatch(
        {
          borderBottom: "2px solid var(--colorsUtilityMajor300)",
        },
        wrapper
      );
    });

    it("matches the expected styles when variant is dark, the input is not focused and has a value", () => {
      wrapper = renderSearch({ value: "search", variant: "dark" });

      assertStyleMatch(
        {
          borderBottom: "2px solid var(--colorsUtilityMajor200)",
          backgroundColor: "transparent",
        },
        wrapper
      );
    });

    it("matches the expected styles when the input is not focused, has a value and search has button", () => {
      wrapper = renderSearch({ value: "search", searchButton: true });

      assertStyleMatch(
        {
          borderBottom: "2px solid var(--colorsUtilityMajor300)",
          backgroundColor: "transparent",
        },
        wrapper
      );
    });

    it("matches the expected styles for icon when variant is dark", () => {
      wrapper = renderSearch({
        value: "",
        searchButton: true,
        id: "Search",
        name: "Search",
        variant: "dark",
      });
      const icon = wrapper
        .find(Icon)
        .findWhere((n) => n.props().type === "search")
        .hostNodes();
      act(() => {
        const input = wrapper.find(Input);
        input.simulate("focus");
      });
      wrapper.update();

      assertStyleMatch(
        {
          color: "var(--colorsYin090)",
        },
        icon
      );
    });

    it("applies the expected styling to the input", () => {
      wrapper = renderSearch({ value: "" });

      assertStyleMatch(
        {
          fontSize: "14px",
          fontWeight: "700",
        },
        wrapper,
        { modifier: `${StyledTextInput}` }
      );
    });

    it("applies the expected styling to the search button", () => {
      wrapper = renderSearch({ value: "FooBar", searchButton: true }).find(
        StyledSearchButton
      );
      assertStyleMatch(
        {
          display: "inline-flex",
          borderBottom: "none",
        },
        wrapper
      );
    });

    it("applies the expected styling to the close icon", () => {
      wrapper = renderSearch({ value: "FooBar" });
      assertStyleMatch(
        {
          marginBottom: "-1px",
        },
        wrapper,
        { modifier: `${StyledInputIconToggle}` }
      );

      assertStyleMatch(
        {
          color: "var(--colorsActionMinor500)",
        },
        wrapper,
        { modifier: `${StyledIcon}` }
      );

      assertStyleMatch(
        {
          color: "var(--colorsActionMinor600)",
        },
        wrapper,
        { modifier: `${StyledIcon}:hover` }
      );
    });

    it("applies the expected styling to the close icon when dark variant", () => {
      wrapper = renderSearch({ value: "FooBar", variant: "dark" });
      assertStyleMatch(
        {
          marginBottom: "-1px",
        },
        wrapper,
        { modifier: `${StyledInputIconToggle}` }
      );

      assertStyleMatch(
        {
          color: "var(--colorsUtilityMajor200)",
        },
        wrapper,
        { modifier: `${StyledIcon}` }
      );

      assertStyleMatch(
        {
          color: "var(--colorsUtilityMajor100)",
        },
        wrapper,
        { modifier: `${StyledIcon}:hover` }
      );
    });

    it("applies the expected styling to the close icon when dark variant and input is focused", () => {
      wrapper = renderSearch({ value: "FooBar", variant: "dark" });
      act(() => {
        const input = wrapper.find(Input);
        input.simulate("focus");
      });
      wrapper.update();

      assertStyleMatch(
        {
          marginBottom: "-1px",
        },
        wrapper,
        { modifier: `${StyledInputIconToggle}` }
      );

      assertStyleMatch(
        {
          color: "var(--colorsUtilityMajor400)",
        },
        wrapper,
        { modifier: `${StyledIcon}` }
      );

      assertStyleMatch(
        {
          color: "var(--colorsUtilityMajor500)",
        },
        wrapper,
        { modifier: `${StyledIcon}:hover` }
      );
    });
  });

  describe("When button is true and textbox is active", () => {
    it("does not render an icon in textbox", () => {
      wrapper = renderSearch({
        value: "",
        searchButton: true,
        id: "Search",
        name: "Search",
      });
      const icon = wrapper
        .find(Icon)
        .findWhere((n) => n.props().type === "search")
        .hostNodes();
      act(() => {
        const input = wrapper.find(Input);
        input.simulate("focus");
      });
      wrapper.update();
      expect(icon.props().value).toEqual(undefined);
    });
  });

  describe("supports being an uncontrolled component", () => {
    beforeEach(() => {
      onKeyDown = jest.fn();
      onChange = jest.fn();
      onBlur = jest.fn();
      wrapper = renderSearch({
        defaultValue: "Bar",
        onBlur,
        onChange,
        onKeyDown,
        id: "Search",
        name: "Search",
      });
    });

    it("input does not call onClick", () => {
      onClick = jest.fn();
      wrapper = renderSearch({
        defaultValue: "FooBar",
        onClick,
        id: "Search",
        name: "Search",
      });
      act(() => {
        const textbox = wrapper.find("input");
        textbox.simulate("click");
      });
      wrapper.update();
      expect(onClick).not.toHaveBeenCalled();
    });

    it("accepts a default value", () => {
      wrapper = renderSearch({ defaultValue: "Bar" });
      const input = wrapper.find("input");
      input.simulate("change", { target: { value: "Bar" } });
      expect(input.props().value).toEqual("Bar");
    });

    describe("clicking the textbox icon", () => {
      it("calls the onChange", () => {
        onChange = jest.fn();
        wrapper = renderSearch({
          defaultValue: "Tick",
          onChange,
          id: "Search",
          name: "Search",
        });
        act(() => {
          const icon = wrapper
            .find(Icon)
            .findWhere((n) => n.props().type === "cross")
            .hostNodes();
          icon.simulate("click");
        });
        wrapper.update();
        expect(onChange).toHaveBeenCalled();
      });

      it("clears the input value", () => {
        wrapper = renderSearch({
          defaultValue: "Bar",
          id: "Search",
          name: "Search",
        });
        act(() => {
          const icon = wrapper
            .find(Icon)
            .findWhere((n) => n.props().type === "cross")
            .hostNodes();
          icon.simulate("click");
        });
        wrapper.update();
        const input = wrapper.find(Input);
        expect(input.props().value).toEqual("");
      });
    });

    describe("Clicking off the component", () => {
      it("calls onBlur", () => {
        onBlur = jest.fn();
        wrapper = renderSearch({ defaultValue: "Bar", onBlur });
        const input = wrapper.find("input");
        input.simulate("blur");
        expect(onBlur).toHaveBeenCalled();
      });
    });

    describe("focusing the component", () => {
      it("calls onFocus", () => {
        onFocus = jest.fn();
        wrapper = renderSearch({ defaultValue: "Bar", onFocus });
        const input = wrapper.find("input");
        input.simulate("focus");
        expect(onFocus).toHaveBeenCalled();
      });
    });
  });

  describe("supports being a controlled component", () => {
    beforeEach(() => {
      onKeyDown = jest.fn();
      onChange = jest.fn();
      onBlur = jest.fn();
      wrapper = renderSearch({
        value: "Bar",
        onBlur,
        onChange,
        onKeyDown,
        id: "Search",
        name: "Search",
      });
    });

    it("accepts a value and calls onChange prop", () => {
      const input = wrapper.find("input");
      input.simulate("change", { target: { value: "Bar" } });
      expect(input.props().value).toEqual("Bar");
      expect(onChange).toHaveBeenCalled();
    });

    it("passes other event handlers down to the input", () => {
      const keyDownParams = {
        key: "a",
        target: { selectionStart: 1, selectionEnd: 2 },
      };
      const input = wrapper.find("input");
      input.simulate("keydown", keyDownParams);
      expect(onKeyDown).toHaveBeenCalled();
    });

    describe("clicking the textbox icon", () => {
      it("calls the onChange", () => {
        act(() => {
          const icon = wrapper
            .find(Icon)
            .findWhere((n) => n.props().type === "cross")
            .hostNodes();
          icon.simulate("click");
          expect(onChange).toHaveBeenCalled();
        });
      });

      it("calls preventDefault", () => {
        const preventDefault = jest.fn();
        act(() => {
          const icon = wrapper
            .find(Icon)
            .findWhere((n) => n.props().type === "cross")
            .hostNodes();
          icon.simulate("mousedown", { preventDefault });
        });

        wrapper.update();

        expect(preventDefault).toHaveBeenCalled();
      });

      it("clears the input value", () => {
        wrapper = renderSearch({
          defaultValue: "Bar",
          onBlur,
          onChange,
          onKeyDown,
          id: "Search",
          name: "Search",
        });
        act(() => {
          const icon = wrapper
            .find(Icon)
            .findWhere((n) => n.props().type === "cross")
            .hostNodes();
          icon.simulate("click");
        });
        wrapper.update();
        const input = wrapper.find(Input);
        expect(input.props().value).toEqual("");
      });
    });

    describe("Clicking off the component", () => {
      it("calls onBlur", () => {
        const input = wrapper.find("input");
        input.simulate("blur");
        expect(onBlur).toHaveBeenCalled();
      });
    });
  });

  describe("Clicking the button", () => {
    it("calls onClick when uncontrolled", () => {
      onClick = jest.fn();
      wrapper = renderSearch({
        defaultValue: "FooBar",
        onClick,
        searchButton: true,
        id: "Search",
        name: "Search",
      });
      act(() => {
        const button = wrapper.find(Button);
        button.simulate("click");
      });
      wrapper.update();
      expect(onClick).toHaveBeenCalledWith({
        target: { id: "Search", name: "Search", value: "FooBar" },
      });
    });

    it("calls onClick when controlled", () => {
      onClick = jest.fn();
      wrapper = renderSearch({
        value: "FooBar",
        onClick,
        searchButton: true,
        id: "Search",
        name: "Search",
      });
      act(() => {
        const button = wrapper.find(Button);
        button.simulate("click");
      });
      wrapper.update();
      expect(onClick).toHaveBeenCalledWith({
        target: { id: "Search", name: "Search", value: "FooBar" },
      });
    });
  });

  describe("Prop Types", () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest
        .spyOn(global.console, "error")
        .mockImplementation(() => {});
    });

    it("validates children prop types", () => {
      expect(() => mount(<Search value="Foo" threshold={-4} />)).toThrow(
        "Threshold must be a positive number"
      );
      consoleSpy.mockRestore();
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      const wrapperWithTags = shallow(<Search value="" />);
      it("include correct component, element and role data tags", () => {
        rootTagTest(wrapperWithTags, "search");
      });
    });
  });

  describe("tab index should be set on clear button", () => {
    it("when input field is not empty", () => {
      wrapper = renderSearch({
        defaultValue: "Bar",
        id: "Search",
        name: "Search",
      });
      const input = wrapper.find(TextBox);
      expect(input.prop("iconTabIndex")).toEqual(0);
    });

    it("when input field is empty", () => {
      wrapper = renderSearch({
        defaultValue: "",
        id: "Search",
        name: "Search",
      });
      const input = wrapper.find(TextBox);
      expect(input.prop("iconTabIndex")).toEqual(-1);
    });
  });

  describe("when typing into the input", () => {
    const stopPropagationFn = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should stop propagation of the event for character keys", () => {
      const keyDownParams = {
        key: "a",
        target: { selectionStart: 1, selectionEnd: 2 },
        stopPropagation: stopPropagationFn,
      };
      const input = wrapper.find("input");
      input.simulate("keydown", keyDownParams);
      expect(stopPropagationFn).toHaveBeenCalled();
    });

    it("should stop propagation of the event for number keys", () => {
      const keyDownParams = {
        key: "2",
        target: { selectionStart: 1, selectionEnd: 2 },
        stopPropagation: stopPropagationFn,
      };
      const input = wrapper.find("input");
      input.simulate("keydown", keyDownParams);
      expect(stopPropagationFn).toHaveBeenCalled();
    });

    it("should not stop propagation of the event for other keys", () => {
      const keyDownParams = {
        key: "Tab",
        target: { selectionStart: 1, selectionEnd: 2 },
        stopPropagation: stopPropagationFn,
      };
      const input = wrapper.find("input");
      input.simulate("keydown", keyDownParams);
      expect(stopPropagationFn).not.toHaveBeenCalled();
    });
  });

  describe("when maxWidth is passed", () => {
    it("should be passed to InputPresentation", () => {
      assertStyleMatch(
        {
          maxWidth: "67%",
        },
        renderSearch({ value: "search", maxWidth: "67%" })
      );
    });

    it("renders with maxWidth as 100% when no maxWidth is specified", () => {
      assertStyleMatch(
        {
          maxWidth: "100%",
        },
        renderSearch({ value: "search", maxWidth: "" })
      );
    });
  });

  describe("refs", () => {
    it("should display deprecation warning when the inputRef prop is used", () => {
      const loggerSpy = jest.spyOn(Logger, "deprecate");
      const ref = { current: null };

      wrapper = renderSearch({ inputRef: ref, value: "" });

      expect(loggerSpy).toHaveBeenCalledWith(
        "The `inputRef` prop in `Search` component is deprecated and will soon be removed. Please use `ref` instead."
      );

      wrapper.setProps({ prop1: true });
      expect(loggerSpy).toHaveBeenCalledTimes(1);
      loggerSpy.mockRestore();
    });

    it("accepts ref as a ref object", () => {
      const ref = { current: null };
      wrapper = renderSearch({ ref, value: "" });

      expect(ref.current).toBe(wrapper.find("input").getDOMNode());
    });

    it("accepts ref as a ref callback", () => {
      const ref = jest.fn();
      wrapper = renderSearch({ ref, value: "" });

      expect(ref).toHaveBeenCalledWith(wrapper.find("input").getDOMNode());
    });

    it("sets ref to empty after unmount", () => {
      const ref = { current: null };
      wrapper = renderSearch({ ref, value: "" });

      wrapper.unmount();

      expect(ref.current).toBe(null);
    });
  });
});
