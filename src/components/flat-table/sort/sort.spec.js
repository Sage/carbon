import React from "react";
import { mount } from "enzyme";
import Sort from "./sort.component";
import Icon from "../../icon";
import { StyledSort, StyledSpaceHolder } from "./sort.style";

describe("Sort", () => {
  let wrapper, onClickFn, onKeyDownFn;

  const ENTER_KEY = { keyCode: 13, which: 13 };
  const SPACE_KEY = { keyCode: 32, which: 32 };
  const RANDOM_KEY = { keyCode: 82, which: 82 };

  beforeEach(() => {
    onClickFn = jest.fn();
    onKeyDownFn = jest.fn();
    wrapper = renderSort({ onClick: onClickFn, onKeyDown: onKeyDownFn });
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
    wrapper.props().onClick();

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

    expect(onKeyDownFn).not.toHaveBeenCalled();
  });

  it("should render `<StyledSpaceHolder />` if `sortType` prop is not provided", () => {
    expect(wrapper.find(StyledSpaceHolder).exists()).toBe(true);
  });

  it("should not render `StyledSpaceHoldcer` if `sortTyp`e prop is provided", () => {
    wrapper = renderSort({ sortType: "ascending" });

    expect(wrapper.find(StyledSpaceHolder).exists()).toBe(false);
  });
});

function renderSort(props, renderer = mount) {
  return renderer(<Sort {...props}>Name</Sort>);
}
