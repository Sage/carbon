import React from "react";
import { shallow, mount } from "enzyme";
import PagerNavigation, {
  PagerNavigationProps,
} from "./pager-navigation.component";
import { StyledPagerLink, StyledPagerNavInner } from "../pager.style";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import StyledInputPresentation from "../../../__internal__/input/input-presentation.style";
import StyledInput from "../../../__internal__/input/input.style";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function render(props: PagerNavigationProps, renderType: any = shallow) {
  return renderType(<PagerNavigation {...props} />);
}

describe("Pager Navigation", () => {
  const props = {
    currentPage: 1,
    totalRecords: 100,
    onPagination: () => true,
    pageSize: 10,
    pageCount: 10,
    setCurrentPage: () => {},
  };

  it("renders the Pager Navigation correctly with the Mint Theme", () => {
    const wrapper = render(props, mount);

    assertStyleMatch(
      {
        display: "flex",
        flex: "1 1 auto",
        justifyContent: "center",
        alignItems: "center",
      },
      wrapper.find(PagerNavigation)
    );

    assertStyleMatch(
      {
        padding: "0",
        margin: "4px",
        lineHeight: "26px",
        minHeight: "24px",
      },
      wrapper.find(PagerNavigation),
      {
        modifier: `&& ${StyledInputPresentation}`,
      }
    );

    assertStyleMatch(
      {
        textAlign: "center",
        height: "24px",
      },
      wrapper.find(PagerNavigation),
      {
        modifier: `&& ${StyledInputPresentation} ${StyledInput}`,
      }
    );
  });

  describe("onClick", () => {
    it("does not trigger if link is disabled", () => {
      const onFirst = jest.fn();
      const wrapper = render(
        {
          onPagination: () => true,
          pageSize: 10,
          currentPage: 1,
          pageCount: 3,
          onFirst,
          setCurrentPage: () => {},
        },
        mount
      );
      const navLinks = wrapper.find(StyledPagerLink);
      const first = navLinks.first();
      first.simulate("click");
      expect(onFirst).toBeCalledTimes(0);
    });
  });

  describe("Current Page Input", () => {
    it("updates correctly on change", () => {
      const setCurrentPage = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: 10,
          setCurrentPage,
        },
        mount
      );

      const input = wrapper.find("input");
      input.simulate("change", { target: { value: 2 } });
      expect(setCurrentPage).toHaveBeenCalledWith(2);
    });

    it("updates correctly on keypress (enter)", () => {
      const setCurrentPage = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: 7,
          setCurrentPage,
        },
        mount
      );

      const input = wrapper.find("input");
      input.simulate("keyup", { key: "Enter", target: { value: 6 } });
      expect(setCurrentPage).toHaveBeenCalledWith(6);
    });

    it("does not update correctly on keypress (not enter)", () => {
      const setCurrentPage = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: 7,
          setCurrentPage,
        },
        mount
      );

      const input = wrapper.find("input");
      input.simulate("keyup", { key: "a", target: { value: 6 } });
      expect(setCurrentPage).not.toHaveBeenCalled();
    });

    it("updates correctly if new value is NaN", () => {
      const setCurrentPage = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: 7,
          setCurrentPage,
        },
        mount
      );

      const input = wrapper.find("input");
      input.simulate("keyup", { key: "Enter", target: { value: "asdfghjk" } });
      expect(setCurrentPage).toHaveBeenCalledWith(1);
    });

    it("resets value to 0 if there are 0 pages", () => {
      const onPagination = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: 0,
          onPagination,
          setCurrentPage: () => {},
          pageCount: 0,
        },
        mount
      );

      const input = wrapper.find("input");
      input.simulate("change", { target: { value: 2 } });
      input.simulate("blur", { target: { value: 2 } });
      expect(input.props().value).toBe("0");
      expect(onPagination).toHaveBeenCalledWith(0, 10, "input");
    });
  });

  describe("conditional rendering", () => {
    it("hides the page count input when 'showPageCount' is false", () => {
      const wrapper = render(
        {
          ...props,
          currentPage: 1,
          setCurrentPage: () => {},
          pageCount: 3,
          showPageCount: false,
        },
        mount
      );

      const navButtons = wrapper.find("button");
      expect(navButtons.length).toEqual(4);
      expect(wrapper.find(StyledPagerNavInner).exists()).toBeFalsy();
    });

    it("hides the `First` and `Last` buttons when 'showFirstAndLastButtons' is false", () => {
      const wrapper = render(
        {
          ...props,
          currentPage: 1,
          setCurrentPage: () => {},
          pageCount: 3,
          showFirstAndLastButtons: false,
        },
        mount
      );

      const navButtons = wrapper.find("button");
      expect(navButtons.length).toEqual(2);
      expect(navButtons.first().text()).toEqual("Previous");
      expect(navButtons.last().text()).toEqual("Next");
    });

    it("hides the `Previous` and `Next` buttons when 'showPreviousAndNextButtons' is false", () => {
      const wrapper = render(
        {
          ...props,
          currentPage: 1,
          setCurrentPage: () => {},
          pageCount: 3,
          showPreviousAndNextButtons: false,
        },
        mount
      );

      const navButtons = wrapper.find("button");
      expect(navButtons.length).toEqual(2);
      expect(navButtons.first().text()).toEqual("First");
      expect(navButtons.last().text()).toEqual("Last");
    });
  });
});
