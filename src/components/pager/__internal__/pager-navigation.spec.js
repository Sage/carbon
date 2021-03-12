import React from "react";
import { shallow, mount } from "enzyme";
import PagerNavigation from "./pager-navigation.component";
import { StyledPagerLinkStyles, StyledPagerNavInner } from "../pager.style";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import StyledInputPresentation from "../../../__experimental__/components/input/input-presentation.style";
import StyledInput from "../../../__experimental__/components/input/input.style";
import I18next from "../../../__spec_helper__/I18next";

function RenderWrapper({ ...props }) {
  return (
    <I18next>
      <PagerNavigation {...props} />
    </I18next>
  );
}

const pageSizeSelectionOptions = [
  { id: "10", name: 10 },
  { id: "25", name: 25 },
  { id: "50", name: 50 },
];

function render(props = {}, renderType = shallow) {
  props.setCurrentThemeName = () => {};
  return renderType(<RenderWrapper {...props} />);
}

describe("Pager Navigation", () => {
  const props = {
    currentPage: 1,
    totalRecords: 100,
    onPagination: () => true,
    pageSize: 10,
    pageCount: 10,
  };

  it("renders the Pager Navigation correctly with the Mint Theme", () => {
    const wrapper = render(
      {
        ...props,
        onPagination: () => true,
      },
      mount
    );

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
        margin: "8px 4px 0 4px",
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
          showPageSizeSelection: true,
          pageSizeSelectionOptions,
          currentPage: 1,
          pageCount: 3,
          totalRecords: 1,
          onFirst,
        },
        mount
      );
      const navLinks = wrapper.find(StyledPagerLinkStyles);
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
      input.simulate("keyup", { which: 13, target: { value: 6 } });
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
      input.simulate("keyup", { which: 2, target: { value: 6 } });
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
      input.simulate("keyup", { which: 13, target: { value: "asdfghjk" } });
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
