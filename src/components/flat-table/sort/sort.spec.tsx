import React from "react";
import { mount, ReactWrapper } from "enzyme";
import Sort, { SortProps } from "./sort.component";
import Icon, { IconType } from "../../icon";
import { StyledSort, StyledSpaceHolder } from "./sort.style";

function renderSort(props: SortProps = {}) {
  return mount(<Sort {...props}>Name</Sort>);
}

describe("Sort", () => {
  let wrapper: ReactWrapper;
  let onClickFn: jest.Mock;

  const ENTER_KEY = { key: "Enter" };
  const SPACE_KEY = { key: " " };
  const RANDOM_KEY = { key: "a" };

  const renderedSortIcon = <Icon type="sort_up" />;

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

  it('should render default Icon `sort_up` if sortType="ascending"', () => {
    wrapper = renderSort({ sortType: "ascending" });

    expect(wrapper.find(Icon).props().type).toBe("sort_up");
  });

  it('should render default Icon `sort_down` if sortType="descending"', () => {
    wrapper = renderSort({ sortType: "descending" });

    expect(wrapper.find(Icon).props().type).toBe("sort_down");
  });

  it("should render the correct node when the Icon component is passed", () => {
    const iconNode = <Icon type="sort_up" />;
    wrapper = renderSort({ sortType: "ascending", sortIcon: iconNode });

    expect(wrapper.find(Icon).length).toBe(1);
  });

  it.each(["filter", "play", "chevron_down", "dropdown"] as IconType[])(
    'should render correct icon when the Icon component is passed as a node and the icon type value is "%s",',
    (iconType) => {
      const iconNode = <Icon type={iconType} />;
      wrapper = renderSort({
        sortType: "ascending",
        sortIcon: iconNode,
      });

      expect(wrapper.find(Icon).props().type).toBe(iconType);
    }
  );

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

  it("should render `<StyledSpaceHolder />` if both `sortIcon` & `sortType` props are not provided", () => {
    wrapper = renderSort();
    expect(wrapper.find(StyledSpaceHolder).exists()).toBe(true);
  });

  it("should not render `<StyledSpaceHolder />` if `sortIcon` prop is provided", () => {
    wrapper = renderSort({ sortIcon: renderedSortIcon });
    expect(wrapper.find(StyledSpaceHolder).exists()).toBe(false);
  });

  it("should not render `<StyledSpaceHolder />` if `sortType` prop is provided", () => {
    wrapper = renderSort({ sortType: "ascending" });
    expect(wrapper.find(StyledSpaceHolder).exists()).toBe(false);
  });

  it("should not render `<StyledSpaceHolder />` if both `sortIcon` & `sortType` props are provided", () => {
    wrapper = renderSort({ sortType: "ascending", sortIcon: renderedSortIcon });
    expect(wrapper.find(StyledSpaceHolder).exists()).toBe(false);
  });
});
