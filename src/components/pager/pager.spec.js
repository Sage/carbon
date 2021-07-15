import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import guid from "../../utils/helpers/guid";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import baseTheme from "../../style/themes/base";
import Pager from "./pager.component";
import Select from "../select/simple-select/simple-select.component";
import SelectList from "../select/select-list/select-list.component";
import {
  StyledPagerLinkStyles,
  StyledPagerSizeOptionsInner,
  StyledPagerSummary,
} from "./pager.style";
import NumberInput from "../../__experimental__/components/number";
import StyledOption from "../select/option/option.style";
import { isSingular } from "../../locales/en-gb";
import I18nProvider from "../i18n-provider";

jest.mock("../../utils/helpers/guid");
guid.mockImplementation(() => "guid-12345");

const wrappingComponent = (props) => (
  <I18nProvider
    {...props}
    locale={{
      locale: "fr",
      pager: {
        show: "Spectacle",
        records: (count) =>
          `${count} ${isSingular(count) ? "article" : "articles"}`,
      },
    }}
  />
);
const pageSizeSelectionOptions = [
  { id: "10", name: 10 },
  { id: "25", name: 25 },
  { id: "50", name: 50 },
  { id: "100", name: 100 },
];

function render(props = {}, renderType = mount, params) {
  return renderType(<Pager onPagination={jest.fn()} {...props} />, params);
}

describe("Pager", () => {
  const props = {
    totalRecords: 100,
    onPagination: () => true,
    pageSize: 10,
    showPageSizeSelection: true,
    pageSizeSelectionOptions,
  };

  it("sets total records to 0 by default", () => {
    const wrapper = render();
    expect(wrapper.find(StyledPagerSummary).text()).toBe("0 items");
  });

  describe("Navigate correctly on link click", () => {
    let wrapper, onPagination, onNext, onPrevious, onFirst, onLast;

    beforeEach(() => {
      onPagination = jest.fn();
      onNext = jest.fn();
      onPrevious = jest.fn();
      onFirst = jest.fn();
      onLast = jest.fn();
    });

    afterEach(() => wrapper.unmount());

    const getWrapper = (otherProps) =>
      render(
        {
          ...props,
          onNext,
          onPrevious,
          onFirst,
          onLast,
          onPagination,
          ...otherProps,
        },
        mount
      );

    it("disables the next and last link if on last page", () => {
      wrapper = getWrapper({ currentPage: 10 });
      const navLinks = wrapper.find(StyledPagerLinkStyles);
      const last = navLinks.last();
      const next = navLinks.at(2);
      last.simulate("click");
      next.simulate("click");
      expect(onPagination).not.toHaveBeenCalled();
    });

    it("disables the prev and first link if on first page", () => {
      wrapper = getWrapper({ currentPage: 1 });
      const navLinks = wrapper.find(StyledPagerLinkStyles);
      const first = navLinks.first();
      const prev = navLinks.at(1);
      first.simulate("click");
      prev.simulate("click");
      expect(onPagination).not.toHaveBeenCalled();
    });

    it("does not render the navigation buttons if theres only one page", () => {
      wrapper = getWrapper({ currentPage: 1, totalRecords: 5 });
      const navLinks = wrapper.find(StyledPagerLinkStyles);
      expect(navLinks.exists()).toBeFalsy();
    });

    it("does not render the 'First' and 'Last' navigation buttons if theres only two pages", () => {
      wrapper = getWrapper({ currentPage: 1, totalRecords: 20 });
      const navLinks = wrapper.find(StyledPagerLinkStyles);
      expect(navLinks.length).toEqual(2);
      expect(navLinks.first().find("button").text()).toEqual("Previous");
      expect(navLinks.last().find("button").text()).toEqual("Next");
    });

    it("changes page correctly on clicking first link", () => {
      wrapper = getWrapper({ currentPage: 10 });
      const navLinks = wrapper.find(StyledPagerLinkStyles);
      const first = navLinks.first();
      first.simulate("click");
      expect(onFirst).toHaveBeenCalledTimes(1);
    });

    it("changes page correctly on clicking prev link", () => {
      wrapper = getWrapper({ currentPage: 3 });
      const navLinks = wrapper.find(StyledPagerLinkStyles);
      const prev = navLinks.at(1);
      prev.simulate("click");
      expect(onPrevious).toHaveBeenCalledTimes(1);
    });

    it("changes page correctly on clicking next link", () => {
      wrapper = getWrapper({ currentPage: 3 });
      const navLinks = wrapper.find(StyledPagerLinkStyles);
      const next = navLinks.at(2);
      next.simulate("click");
      expect(onNext).toHaveBeenCalledTimes(1);
    });

    it("next link is disabled on when on last page", () => {
      wrapper = getWrapper({ currentPage: 10 });
      const navLinks = wrapper.find(StyledPagerLinkStyles);
      const next = navLinks.at(2);
      assertStyleMatch(
        {
          cursor: "not-allowed",
        },
        next
      );
    });

    it("changes page correctly on clicking last link", () => {
      wrapper = getWrapper({ currentPage: 3 });
      const navLinks = wrapper.find(StyledPagerLinkStyles);
      const last = navLinks.last();
      last.simulate("click");
      expect(onLast).toHaveBeenCalledTimes(1);
    });
  });

  describe("when invalid totalRecords", () => {
    it("defaults currentPage to last page given its on last page", () => {
      const wrapper = render(
        {
          ...props,
          pageSize: 10,
          totalRecords: 100,
          currentPage: 10,
          showPageSizeSelection: true,
        },
        mount
      );

      const input = wrapper.find(NumberInput).find("input");
      input.simulate("keyup", { which: 13, target: { value: -100 } });
      expect(input.prop("value")).toBe("10");
    });

    it("defaults currentPage to 1 given currentPage is not last page", () => {
      const wrapper = render(
        {
          ...props,
          pageSize: 10,
          totalRecords: 100,
          currentPage: 1,
          showPageSizeSelection: true,
        },
        mount
      );

      const input = wrapper.find(NumberInput).find("input");
      input.simulate("keyup", { which: 13, target: { value: -100 } });
      expect(input.prop("value")).toBe("1");
    });

    it("defaults currentPage to first page", () => {
      const wrapper = render(
        {
          ...props,
          pageSize: 10,
          totalRecords: -100,
          currentPage: 10,
          showPageSizeSelection: true,
        },
        mount
      );

      const input = wrapper.find(NumberInput).find("input");
      expect(input.prop("value")).toBe("1");
    });
  });

  it("updates correctly if new current page value is higher than page count", () => {
    const wrapper = render({ ...props, currentPage: 10 }, mount);
    const input = wrapper.find(NumberInput).find("input");
    input.simulate("keyup", { which: 13, target: { value: 200 } });
    expect(input.prop("value")).toBe("10");
  });

  describe("conditional rendering of elements", () => {
    let wrapper;

    afterEach(() => wrapper.unmount());

    it("does not renders pageSizeSelection by default", () => {
      wrapper = render({
        totalRecords: 100,
        pageSize: 10,
        onPagination: () => true,
      });
      expect(wrapper.find(StyledPagerSizeOptionsInner).exists()).toBeFalsy();
    });

    it("renders the pageSize Select when 'showPageSizeSelection' is true", () => {
      wrapper = render({ ...props, onPagination: () => true });
      expect(
        wrapper.find("div[data-component='simple-select']").getDOMNode()
          .parentElement.firstChild.textContent
      ).toEqual(
        wrapper.find(StyledPagerSizeOptionsInner).find("span").first().text()
      );
      expect(wrapper.find(StyledPagerSizeOptionsInner).exists()).toBeTruthy();
      expect(
        wrapper.find("div[data-component='simple-select']").getDOMNode()
          .parentElement.lastChild.textContent
      ).toEqual(
        wrapper.find(StyledPagerSizeOptionsInner).find("span").last().text()
      );
    });

    it("does not render the label before pageSize Select when 'showPageSizeLabelBefore' is false", () => {
      wrapper = render({
        ...props,
        showPageSizeLabelBefore: false,
        onPagination: () => true,
      });
      expect(
        wrapper.find("div[data-component='simple-select']").getDOMNode()
          .parentElement.firstChild
      ).toEqual(
        wrapper.find("div[data-component='simple-select']").getDOMNode()
      );
      expect(
        wrapper.find("div[data-component='simple-select']").getDOMNode()
          .parentElement.lastChild.textContent
      ).toEqual(
        wrapper.find(StyledPagerSizeOptionsInner).find("span").last().text()
      );
    });

    it("does not render the label after pageSize Select when 'showPageSizeLabelAfter' is false", () => {
      wrapper = render({
        ...props,
        showPageSizeLabelAfter: false,
        onPagination: () => true,
      });
      expect(
        wrapper.find("div[data-component='simple-select']").getDOMNode()
          .parentElement.firstChild.textContent
      ).toEqual(
        wrapper.find(StyledPagerSizeOptionsInner).find("span").first().text()
      );
      expect(
        wrapper.find("div[data-component='simple-select']").getDOMNode()
          .parentElement.lastChild
      ).toEqual(
        wrapper.find("div[data-component='simple-select']").getDOMNode()
      );
    });

    it("does not render the total number of records 'showTotalRecords' is false", () => {
      wrapper = render({
        ...props,
        showTotalRecords: false,
        onPagination: () => true,
      });

      expect(wrapper.find(StyledPagerSummary).text()).toBe("");
    });
  });

  describe("callbacks work as expected", () => {
    let wrapper, onNext, onFirst, onPrevious, onLast, callbacks;

    beforeEach(() => {
      onNext = jest.fn();
      onFirst = jest.fn();
      onPrevious = jest.fn();
      onLast = jest.fn();

      wrapper = render({
        ...props,
        pageSize: 10,
        currentPage: 5,
        onNext,
        onFirst,
        onLast,
        onPrevious,
      });

      callbacks = {
        next: onNext,
        previous: onPrevious,
        first: onFirst,
        last: onLast,
      };
    });

    it.each([["next"], ["previous"], ["first"], ["last"]])(
      "calls %s callback",
      (call) => {
        const navLinks = wrapper.find(StyledPagerLinkStyles);
        const element = navLinks.find(
          `[data-element="pager-link-${call}"] button`
        );
        element.simulate("click");
        expect(callbacks[call]).toHaveBeenCalledTimes(1);
      }
    );
  });

  describe("when onNext, onFirst, onPrevious, onLast are not provided", () => {
    it.each([
      ["next", "6"],
      ["previous", "4"],
      ["first", "1"],
      ["last", "10"],
    ])(
      "it triggers on click event without %s callback",
      (call, currentPage) => {
        const wrapper = render({
          ...props,
          pageSize: 10,
          currentPage: 5,
          totalRecords: 100,
        });
        const pager = wrapper.find(Pager);
        const navLinks = pager.find(StyledPagerLinkStyles);
        const element = navLinks.find(
          `[data-element="pager-link-${call}"] button`
        );
        element.simulate("click");
        expect(
          wrapper.find('[data-element="current-page"]').first().prop("value")
        ).toBe(currentPage);
      }
    );
  });

  describe("i18n", () => {
    const getShow = (wrapper) =>
      wrapper.find("div[data-component='simple-select']").getDOMNode()
        .parentElement.firstChild.textContent;
    const getRecords = (wrapper) =>
      wrapper.find("div[data-component='simple-select']").getDOMNode()
        .parentElement.lastChild.textContent;

    describe("default", () => {
      it("show", () => {
        const wrapper = render({ ...props });
        expect(getShow(wrapper)).toBe("Show");
      });

      it("records", () => {
        expect(getRecords(render({ ...props, pageSize: 100 }))).toBe(
          "100 items"
        );
        expect(getRecords(render({ ...props, pageSize: 1 }))).toBe("1 item");
        expect(getRecords(render({ ...props, pageSize: 0 }))).toBe("0 items");
      });
    });

    describe("fr", () => {
      it("show", () => {
        const wrapper = render({ ...props }, mount, { wrappingComponent });
        expect(getShow(wrapper)).toBe("Spectacle");
      });

      it("records", () => {
        expect(
          getRecords(
            render({ ...props, pageSize: "100" }, mount, { wrappingComponent })
          )
        ).toBe("100 articles");
        expect(
          getRecords(
            render({ ...props, pageSize: "1" }, mount, { wrappingComponent })
          )
        ).toBe("1 article");
        expect(
          getRecords(
            render({ ...props, pageSize: "0" }, mount, { wrappingComponent })
          )
        ).toBe("0 articles");
      });
    });
  });

  describe("DLS theme", () => {
    describe("Pager styling", () => {
      it("matches the expected style", () => {
        const wrapper = render({ ...props }, mount);

        assertStyleMatch(
          {
            padding: "0px 24px",
            fontSize: "13px",
            backgroundColor: baseTheme.table.zebra,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopWidth: "0",
          },
          wrapper
        );
      });

      it("matches the expected style", () => {
        const wrapper = render({ ...props, variant: "alternate" }, mount);

        assertStyleMatch(
          {
            backgroundColor: baseTheme.pager.alternate,
          },
          wrapper
        );
      });
    });

    describe("Size Selector", () => {
      let onPagination;
      let wrapper;

      const selectOptions = {
        value: 25,
        text: "25",
      };

      beforeEach(() => {
        onPagination = jest.fn();

        wrapper = render(
          {
            ...props,
            currentPage: 4,
            onPagination,
          },
          mount
        );
      });

      it("should not fire onPagination when user blur out from component", () => {
        act(() => {
          wrapper.find(Select).find("input").simulate("click");
        });

        wrapper.find(Select).props().onBlur();
        expect(onPagination).not.toHaveBeenCalled();
      });

      it("should update if option is clicked", () => {
        act(() => {
          wrapper.find(Select).find("input").simulate("click");
        });

        act(() => {
          wrapper.find(Select).update();
        });

        expect(wrapper.find(Select).find(SelectList).exists()).toBe(true);

        act(() => {
          wrapper
            .find(Select)
            .find(SelectList)
            .find(StyledOption)
            .at(1)
            .prop("onClick")(selectOptions);
        });

        act(() => {
          wrapper.find(Select).update();
        });

        expect(onPagination).toHaveBeenCalledWith(1, 25, "page-select");
      });

      it("should update if enter key is used", () => {
        act(() => {
          wrapper
            .find(Select)
            .props()
            .onKeyDown({ which: 13, target: selectOptions });
        });

        act(() => {
          wrapper.find(Select).update();
        });

        expect(onPagination).toHaveBeenCalledWith(1, 25, "page-select");
      });

      it("should not update if different key than enter is used", () => {
        act(() => {
          wrapper
            .find(Select)
            .props()
            .onKeyDown({ which: 11, target: selectOptions });
        });

        expect(onPagination).not.toHaveBeenCalledWith();
      });
    });
  });
});
