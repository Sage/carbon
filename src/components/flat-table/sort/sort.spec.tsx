import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { assertStyleMatch } from "__spec_helper__/test-utils";
import Sort, { SortProps } from "./sort.component";
import Icon from "../../icon";
import StyledIcon from "../../icon/icon.style";
import Typography from "../../typography";
import { StyledSort, StyledSpaceHolder } from "./sort.style";
import { FlatTableThemeContext, FlatTableProps } from "../flat-table.component";

function renderSort(props: SortProps = {}) {
  return mount(<Sort {...props}>Name</Sort>);
}

describe("Sort", () => {
  let wrapper: ReactWrapper;
  let onClickFn: jest.Mock;

  const ENTER_KEY = { key: "Enter" };
  const SPACE_KEY = { key: " " };
  const RANDOM_KEY = { key: "a" };

  beforeEach(() => {
    onClickFn = jest.fn();
    wrapper = renderSort({ onClick: onClickFn });
  });

  afterEach(() => {
    onClickFn.mockClear();
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should not render Icon if sortType does not exist", () => {
    wrapper = renderSort();

    expect(wrapper.find(Icon).exists()).toBe(false);
  });

  it('should render Icon `sort_up` if sortType="ascending"', () => {
    wrapper = renderSort({ sortType: "ascending" });

    expect(wrapper.find(Icon).props().type).toBe("sort_up");
  });

  it('should render Icon `sort_down` if sortType="descending"', () => {
    wrapper = renderSort({ sortType: "descending" });

    expect(wrapper.find(Icon).props().type).toBe("sort_down");
  });

  it("should render the correct accessible name when the `accessibleName` prop is passed", () => {
    const sortType = "ascending";
    const customAccessibleName = `Sort all accountants below in an ${sortType} order.`;
    wrapper = renderSort({ accessibleName: customAccessibleName, sortType });

    expect(wrapper.find(Typography).text()).toBe(customAccessibleName);
  });

  it("should render a default accessible name when a child and the `sortType` prop is passed", () => {
    wrapper = mount(<Sort sortType="ascending">Accountants</Sort>);

    expect(wrapper.find(Typography).text()).toBe(
      "Sort all Accountants in an ascending order."
    );
  });

  it("should render a default accessible name when just a child is passed", () => {
    wrapper = mount(<Sort>Accountants</Sort>);

    expect(wrapper.find(Typography).text()).toBe(
      "Sort all Accountants in an ascending or descending order."
    );
  });

  it("should render a default accessible name when just the `sortType` prop is passed", () => {
    const sortType = "ascending";
    wrapper = mount(<Sort sortType={sortType} />);

    expect(wrapper.find(Typography).text()).toBe(
      "Sort all contents in an ascending order."
    );
  });

  it("should render a default accessible name when neither a child or the `sortType` prop is passed", () => {
    wrapper = mount(<Sort />);

    expect(wrapper.find(Typography).text()).toBe(
      "Sort all contents in an ascending or descending order."
    );
  });

  it("should fire callback if clicked", () => {
    wrapper.find(StyledSort).props().onClick();

    expect(onClickFn).toHaveBeenCalled();
  });

  it("should fire callback if enter key is pressed", () => {
    wrapper.find(StyledSort).simulate("keyDown", ENTER_KEY);

    expect(onClickFn).toHaveBeenCalled();
  });

  it("should fire callback if space key is pressed", () => {
    wrapper.find(StyledSort).simulate("keyDown", SPACE_KEY);

    expect(onClickFn).toHaveBeenCalled();
  });

  it("should not fire callback if either enter key or space key is pressed", () => {
    wrapper.find(StyledSort).simulate("keyDown", RANDOM_KEY);

    expect(onClickFn).not.toHaveBeenCalled();
  });

  it("should render `<StyledSpaceHolder />` if `sortType` prop is not provided", () => {
    expect(wrapper.find(StyledSpaceHolder).exists()).toBe(true);
  });

  it("should not render `StyledSpaceHolder` if `sortType` prop is provided", () => {
    wrapper = renderSort({ sortType: "ascending" });

    expect(wrapper.find(StyledSpaceHolder).exists()).toBe(false);
  });

  it("should render Icon with correct colour when colorTheme is dark", () => {
    wrapper = mount(
      <FlatTableThemeContext.Provider
        value={{ colorTheme: "dark", getTabStopElementId: () => "" }}
      >
        <Sort sortType="ascending">Name</Sort>
      </FlatTableThemeContext.Provider>
    );

    assertStyleMatch(
      {
        color: "var(--colorsActionMinorYang100)",
      },
      wrapper.find(StyledIcon)
    );
  });

  it.each<FlatTableProps["colorTheme"]>([
    "light",
    "transparent-base",
    "transparent-white",
  ])(
    "should render Icon with correct colour when colorTheme is %s",
    (color) => {
      wrapper = mount(
        <FlatTableThemeContext.Provider
          value={{ colorTheme: color, getTabStopElementId: () => "" }}
        >
          <Sort sortType="ascending">Name</Sort>
        </FlatTableThemeContext.Provider>
      );

      assertStyleMatch(
        {
          color: "var(--colorActionMinor500)",
        },
        wrapper.find(StyledIcon)
      );
    }
  );
});
