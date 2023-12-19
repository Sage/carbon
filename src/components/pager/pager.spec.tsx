import React from "react";
import { mount, ReactWrapper, MountRendererProps } from "enzyme";
import { act } from "react-dom/test-utils";

import guid from "../../__internal__/utils/helpers/guid";
import { simulateSelectTextboxEvent } from "../../__spec_helper__/select-test-utils";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import Pager, { PagerProps } from "./pager.component";
import { Select } from "../select";
import SelectList from "../select/select-list/select-list.component";
import {
  StyledPagerLink,
  StyledPagerNavInner,
  StyledPagerNavLabel,
  StyledPagerSizeOptionsInner,
  StyledPagerSummary,
  StyledSelectContainer,
} from "./pager.style";
import NumberInput from "../number";
import StyledOption from "../select/option/option.style";
import Form from "../form";
import StyledFormField from "../../__internal__/form-field/form-field.style";
import I18nProvider from "../i18n-provider";

jest.mock("../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(
  () => "guid-12345"
);

const isSingular = (count: string | number) =>
  (typeof count === "string" ? parseInt(count) : count) === 1;

const wrappingComponent = (props: { children: React.ReactNode }) => (
  <I18nProvider
    {...props}
    locale={{
      locale: () => "fr",
      pager: {
        show: () => "Spectacle",
        records: (count: string | number) =>
          `${count} ${isSingular(count) ? "article" : "articles"}`,
        first: () => "First",
        last: () => "Last",
        next: () => "Next",
        previous: () => "Previous",
        pageX: () => "Page",
        ofY: (count) => `of ${count}`,
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

function render(props: PagerProps, params?: MountRendererProps) {
  return mount(<Pager {...props} />, params);
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
    const wrapper = render({
      ...props,
      pageSize: undefined,
      totalRecords: undefined,
    });
    expect(wrapper.find(StyledPagerSummary).text()).toBe("0 items");
  });

  describe("sets size selector value a type of string", () => {
    it("when page size prop is a type of number", () => {
      const wrapper = render({
        ...props,
        showPageSizeSelection: true,
        pageSize: 10,
      });
      expect(wrapper.find(Select).prop("value")).toBe("10");
    });

    it("when page size prop is a type of string", () => {
      const wrapper = render({
        ...props,
        showPageSizeSelection: true,
        pageSize: "10",
      });
      expect(wrapper.find(Select).prop("value")).toBe("10");
    });
  });

  describe("Navigate correctly on link click", () => {
    let wrapper: ReactWrapper;
    let onPagination: jest.Mock;
    let onNext: jest.Mock;
    let onPrevious: jest.Mock;
    let onFirst: jest.Mock;
    let onLast: jest.Mock;

    beforeEach(() => {
      onPagination = jest.fn();
      onNext = jest.fn();
      onPrevious = jest.fn();
      onFirst = jest.fn();
      onLast = jest.fn();
    });

    afterEach(() => wrapper.unmount());

    const getWrapper = (otherProps?: Partial<PagerProps>) =>
      render({
        ...props,
        onNext,
        onPrevious,
        onFirst,
        onLast,
        onPagination,
        ...otherProps,
      });

    it("disables the next and last link if on last page", () => {
      wrapper = getWrapper({ currentPage: 10 });
      const navLinks = wrapper.find(StyledPagerLink);
      const last = navLinks.last();
      const next = navLinks.at(2);
      last.simulate("click");
      next.simulate("click");
      expect(onPagination).not.toHaveBeenCalled();
    });

    it("disables the prev and first link if on first page", () => {
      wrapper = getWrapper({ currentPage: 1 });
      const navLinks = wrapper.find(StyledPagerLink);
      const first = navLinks.first();
      const prev = navLinks.at(1);
      first.simulate("click");
      prev.simulate("click");
      expect(onPagination).not.toHaveBeenCalled();
    });

    it("does not render the navigation buttons if theres only one page", () => {
      wrapper = getWrapper({ currentPage: 1, totalRecords: 5 });
      const navLinks = wrapper.find(StyledPagerLink);
      expect(navLinks.exists()).toBeFalsy();
    });

    it("does not render the 'First' and 'Last' navigation buttons if theres only two pages", () => {
      wrapper = getWrapper({ currentPage: 1, totalRecords: 20 });
      const navLinks = wrapper.find(StyledPagerLink);
      expect(navLinks.length).toEqual(2);
      expect(navLinks.first().find("button").text()).toEqual("Previous");
      expect(navLinks.last().find("button").text()).toEqual("Next");
    });

    it("when current page is 1 and hideDisabledElements is true, first set of pager links are hidden", () => {
      wrapper = getWrapper({ hideDisabledElements: true, currentPage: 1 });

      assertStyleMatch(
        {
          visibility: "hidden",
        },
        wrapper.find(StyledPagerLink).first()
      );
    });

    it("when current page is 10 and hideDisabledElements is true, second set of pager links are hidden", () => {
      wrapper = getWrapper({ hideDisabledElements: true, currentPage: 10 });

      assertStyleMatch(
        {
          visibility: "hidden",
        },
        wrapper.find(StyledPagerLink).at(2)
      );
    });

    it("when current page is between 1-10 and hideDisabledElements is true, both sets of pager links are displayed as normal", () => {
      wrapper = getWrapper({ hideDisabledElements: true, currentPage: 7 });

      assertStyleMatch(
        {
          visibility: undefined,
        },
        wrapper.find(StyledPagerLink).first()
      );

      assertStyleMatch(
        {
          visibility: undefined,
        },
        wrapper.find(StyledPagerLink).at(2)
      );
    });

    it("when interactivePageNumber is false, pager nav number input is not rendered", () => {
      wrapper = getWrapper({ interactivePageNumber: false });
      expect(wrapper.find(StyledPagerNavInner).exists()).toEqual(false);
    });

    it.each([1, 5, 10])(
      "when interactivePageNumber is false, pager nav label is rendered with correct inner text",
      (pageIndex) => {
        wrapper = getWrapper({
          interactivePageNumber: false,
          currentPage: pageIndex,
        });
        expect(wrapper.find(StyledPagerNavLabel).text()).toBe(
          `Page ${pageIndex} of 10`
        );
      }
    );

    it("when interactivePageNumber is false, pager nav label is rendered with correct styling", () => {
      wrapper = getWrapper({ interactivePageNumber: false, currentPage: 1 });

      assertStyleMatch(
        {
          padding: "9px 12px",
          margin: "4px 0",
        },
        wrapper.find(StyledPagerNavLabel)
      );
    });

    it("changes page correctly on clicking first link", () => {
      wrapper = getWrapper({ currentPage: 10 });
      const navLinks = wrapper.find(StyledPagerLink);
      const first = navLinks.first();
      first.find("button").simulate("click");
      expect(onFirst).toHaveBeenCalledTimes(1);
    });

    it("changes page correctly on clicking prev link", () => {
      wrapper = getWrapper({ currentPage: 3 });
      const navLinks = wrapper.find(StyledPagerLink);
      const prev = navLinks.at(1);
      prev.find("button").simulate("click");
      expect(onPrevious).toHaveBeenCalledTimes(1);
    });

    it("changes page correctly on clicking next link", () => {
      wrapper = getWrapper({ currentPage: 3 });
      const navLinks = wrapper.find(StyledPagerLink);
      const next = navLinks.at(2);
      next.find("button").simulate("click");
      expect(onNext).toHaveBeenCalledTimes(1);
    });

    it("next link is disabled on when on last page", () => {
      wrapper = getWrapper({ currentPage: 10 });
      const navLinks = wrapper.find(StyledPagerLink);
      const next = navLinks.at(2);
      next.find("button").simulate("click");
      expect(onNext).toHaveBeenCalledTimes(0);
    });

    it("changes page correctly on clicking last link", () => {
      wrapper = getWrapper({ currentPage: 3 });
      const navLinks = wrapper.find(StyledPagerLink);
      const last = navLinks.last();
      last.find("button").simulate("click");
      expect(onLast).toHaveBeenCalledTimes(1);
    });

    it("updates value when pageSize prop is changed", () => {
      wrapper = getWrapper();
      expect(wrapper.find(Select).prop("value")).toBe("10");
      wrapper.setProps({ pageSize: 25 });
      wrapper.update();
      expect(wrapper.find(Select).prop("value")).toBe("25");
    });
  });

  describe("when invalid totalRecords", () => {
    it("defaults currentPage to last page given its on last page", () => {
      const wrapper = render({
        ...props,
        pageSize: 10,
        totalRecords: 100,
        currentPage: 10,
        showPageSizeSelection: true,
      });

      const input = wrapper.find(NumberInput).find("input");
      input.simulate("keyup", { key: "Enter", target: { value: -100 } });
      expect(input.prop("value")).toBe("10");
    });

    it("defaults currentPage to 1 given currentPage is not last page", () => {
      const wrapper = render({
        ...props,
        pageSize: 10,
        totalRecords: 100,
        currentPage: 1,
        showPageSizeSelection: true,
      });

      const input = wrapper.find(NumberInput).find("input");
      input.simulate("keyup", { key: "Enter", target: { value: -100 } });
      expect(input.prop("value")).toBe("1");
    });

    it("defaults currentPage to first page", () => {
      const wrapper = render({
        ...props,
        pageSize: 10,
        totalRecords: -100,
        currentPage: 10,
        showPageSizeSelection: true,
      });

      const input = wrapper.find(NumberInput).find("input");
      expect(input.prop("value")).toBe("1");
    });
  });

  it("updates correctly if new current page value is higher than page count", () => {
    const wrapper = render({ ...props, currentPage: 10 });
    const input = wrapper.find(NumberInput).find("input");
    input.simulate("keyup", { key: "Enter", target: { value: 200 } });
    expect(input.prop("value")).toBe("10");
  });

  describe("conditional rendering of elements", () => {
    let wrapper: ReactWrapper;

    afterEach(() => wrapper.unmount());

    it("does not renders pageSizeSelection by default", () => {
      wrapper = render({
        totalRecords: "100",
        pageSize: 10,
        onPagination: () => true,
      });
      expect(wrapper.find(StyledPagerSizeOptionsInner).exists()).toBeFalsy();
    });

    it("renders the pageSize Select when 'showPageSizeSelection' is true", () => {
      wrapper = render({ ...props, onPagination: () => true });
      expect(
        wrapper.find(StyledPagerSizeOptionsInner).getDOMNode().firstChild
          ?.textContent
      ).toEqual(
        wrapper.find(StyledPagerSizeOptionsInner).find("label").first().text()
      );
      expect(wrapper.find(StyledPagerSizeOptionsInner).exists()).toBeTruthy();
      expect(
        wrapper.find(StyledPagerSizeOptionsInner).getDOMNode().lastChild
          ?.textContent
      ).toEqual(
        wrapper.find(StyledPagerSizeOptionsInner).find("div").last().text()
      );
    });

    it("does not render the label before pageSize Select when 'showPageSizeLabelBefore' is false", () => {
      wrapper = render({
        ...props,
        showPageSizeLabelBefore: false,
        onPagination: () => true,
      });

      expect(
        wrapper.find(StyledPagerSizeOptionsInner).getDOMNode().firstChild
      ).toEqual(wrapper.find(StyledSelectContainer).getDOMNode());

      expect(
        wrapper.find(StyledPagerSizeOptionsInner).getDOMNode().lastChild
          ?.textContent
      ).toEqual(
        wrapper.find(StyledPagerSizeOptionsInner).find("label").last().text()
      );
    });

    it("does not render the label after pageSize Select when 'showPageSizeLabelAfter' is false", () => {
      wrapper = render({
        ...props,
        showPageSizeLabelAfter: false,
        onPagination: () => true,
      });
      expect(
        wrapper.find(StyledPagerSizeOptionsInner).getDOMNode().firstChild
          ?.textContent
      ).toEqual(
        wrapper.find(StyledPagerSizeOptionsInner).find("label").first().text()
      );
      expect(
        wrapper.find(StyledPagerSizeOptionsInner).getDOMNode().lastChild
      ).toEqual(wrapper.find(StyledSelectContainer).getDOMNode());
    });

    it("does not render the total number of records 'showTotalRecords' is false", () => {
      wrapper = render({
        ...props,
        showTotalRecords: false,
        onPagination: () => true,
      });

      expect(wrapper.find(StyledPagerSummary).text()).toBe("");
    });

    it.each([
      [true, false],
      [false, true],
    ])(
      "renders a label correctly-linked to the select when either of 'showPageSizeLabelBefore' and 'showPageSizeLabelAfter' are true, and does not add an aria-label",
      (showPageSizeLabelBefore, showPageSizeLabelAfter) => {
        wrapper = render({
          ...props,
          showPageSizeLabelBefore,
          showPageSizeLabelAfter,
        });

        const selectInput = wrapper.find('input[role="combobox"]').getDOMNode();
        const selectLabel = wrapper.find("label").at(0).getDOMNode();

        expect(selectLabel.getAttribute("for")).toBe(selectInput.id);
        expect(selectInput.getAttribute("aria-label")).toBe(null);
      }
    );

    it("renders the select with an aria-label when both 'showPageSizeLabelBefore' and 'showPageSizeLabelAfter' are false", () => {
      wrapper = render({
        ...props,
        showPageSizeLabelBefore: false,
        showPageSizeLabelAfter: false,
      });

      const selectInput = wrapper.find('input[role="combobox"]').getDOMNode();

      expect(selectInput.getAttribute("aria-label")).toBe("Show");
    });
  });

  describe("callbacks work as expected", () => {
    let wrapper: ReactWrapper;
    let onNext: jest.Mock;
    let onFirst: jest.Mock;
    let onPrevious: jest.Mock;
    let onLast: jest.Mock;
    let callbacks: Record<string, jest.Mock>;

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
        const navLinks = wrapper.find(StyledPagerLink);
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
    ])("triggers on click event without %s callback", (call, currentPage) => {
      const wrapper = render({
        ...props,
        pageSize: 10,
        currentPage: 5,
        totalRecords: 100,
      });
      const pager = wrapper.find(Pager);
      const navLinks = pager.find(StyledPagerLink);
      const element = navLinks.find(
        `[data-element="pager-link-${call}"] button`
      );
      element.simulate("click");
      expect(
        wrapper.find('[data-element="current-page"]').first().prop("value")
      ).toBe(currentPage);
    });
  });

  describe("i18n", () => {
    const getShow = (wrapper: ReactWrapper) =>
      wrapper.find(StyledPagerSizeOptionsInner).getDOMNode().firstChild
        ?.textContent;
    const getRecords = (wrapper: ReactWrapper) =>
      wrapper.find(StyledPagerSizeOptionsInner).getDOMNode().lastChild
        ?.textContent;

    describe("default", () => {
      it("show", () => {
        const wrapper = render({ ...props });
        expect(getShow(wrapper)).toBe("Show");
      });

      it("records", () => {
        expect(getRecords(render({ ...props, pageSize: 100 }))).toBe("items");
        expect(getRecords(render({ ...props, pageSize: 1 }))).toBe("item");
        expect(getRecords(render({ ...props, pageSize: 0 }))).toBe("items");
      });
    });

    describe("fr", () => {
      it("show", () => {
        const wrapper = render({ ...props }, { wrappingComponent });
        expect(getShow(wrapper)).toBe("Spectacle");
      });

      it("records", () => {
        expect(
          getRecords(
            render({ ...props, pageSize: "100" }, { wrappingComponent })
          )
        ).toBe("100 articles");
        expect(
          getRecords(render({ ...props, pageSize: "1" }, { wrappingComponent }))
        ).toBe("1 article");
        expect(
          getRecords(render({ ...props, pageSize: "0" }, { wrappingComponent }))
        ).toBe("0 articles");
      });
    });
  });

  describe("DLS theme", () => {
    describe("Pager styling", () => {
      it("matches the expected style", () => {
        const wrapper = render({ ...props });

        assertStyleMatch(
          {
            padding: "0px 24px",
            fontSize: "13px",
            backgroundColor: "var(--colorsUtilityMajor010)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "var(--colorsUtilityYin090)",
            border: "1px solid var(--colorsUtilityMajor100)",
            borderRadius: "var(--borderRadius100)",
          },
          wrapper
        );
      });

      it("matches the expected style for alternate variant", () => {
        const wrapper = render({ ...props, variant: "alternate" });

        assertStyleMatch(
          {
            backgroundColor: "var(--colorsUtilityMajor040)",
          },
          wrapper
        );
      });
    });

    describe("Size Selector", () => {
      let onPagination: jest.Mock;
      let wrapper: ReactWrapper;

      const selectOptions = {
        value: 25,
        text: "25",
      };

      beforeEach(() => {
        onPagination = jest.fn();

        wrapper = render({
          ...props,
          currentPage: 4,
          onPagination,
        });
      });

      it("should not fire onPagination when user blur out from component", () => {
        act(() => {
          simulateSelectTextboxEvent(wrapper, "click");
        });

        wrapper
          .find(Select)
          .props()
          .onBlur?.({} as React.FocusEvent<HTMLInputElement>);
      });

      it("should update if option is clicked", () => {
        act(() => {
          simulateSelectTextboxEvent(wrapper, "click");
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
            .prop("onClick")(selectOptions.value);
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
            .onKeyDown?.(({
              key: "Enter",
              target: selectOptions,
            } as unknown) as React.KeyboardEvent<HTMLInputElement>);
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
            .onKeyDown?.(({
              key: "a",
              target: selectOptions,
            } as unknown) as React.KeyboardEvent<HTMLInputElement>);
        });

        expect(onPagination).not.toHaveBeenCalledWith();
      });
    });
  });

  describe("when inside a form", () => {
    it("the current page field has the correct styles", () => {
      const wrapper = mount(
        <Form>
          <Pager
            totalRecords={25}
            currentPage={1}
            pageSize={5}
            showPageCount
            onPagination={() => {}}
          />
        </Form>
      );
      assertStyleMatch(
        { marginBottom: "0" },
        wrapper.find(StyledPagerNavInner),
        { modifier: `&& ${StyledFormField}` }
      );
    });
  });
});
