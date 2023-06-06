import React from "react";
import { mount, ReactWrapper } from "enzyme";
import Sort, { SortProps } from "./sort.component";
import Icon from "../../icon";
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

  beforeEach(() => {
    onClickFn = jest.fn();
    wrapper = renderSort({ onClick: onClickFn });
  });

  afterEach(() => {
    jest.clearAllMocks();
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
});
