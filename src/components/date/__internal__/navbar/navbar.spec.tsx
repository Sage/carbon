import React from "react";
import TestRenderer from "react-test-renderer";
import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";

import Navbar, { NavbarProps } from "./navbar.component";
import StyledButton from "./button.style";

const arrowKeys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
const actionKeys = ["Enter", "Space"];

describe("Navbar", () => {
  let wrapper: ShallowWrapper | ReactWrapper;
  let onPreviousClick: jest.Mock;
  let onNextClick: jest.Mock;

  describe("render", () => {
    beforeEach(() => {
      onPreviousClick = jest.fn();
      onNextClick = jest.fn();
      wrapper = shallow(
        <Navbar
          onPreviousClick={onPreviousClick}
          onNextClick={onNextClick}
          className="custom-class"
        />
      );
    });

    it("returns a previous button that calls onPreviousClick", () => {
      const prevButton = wrapper.find(StyledButton).at(0);
      prevButton.simulate("click");
      expect(onPreviousClick.mock.calls.length).toEqual(1);
    });

    it("returns a next button that calls onNextClick", () => {
      const nextButton = wrapper.find(StyledButton).at(1);
      nextButton.simulate("click");
      expect(onNextClick.mock.calls.length).toEqual(1);
    });

    it("applies the custom class name", () => {
      expect(wrapper.find(".custom-class").length).toEqual(1);
    });

    it("applies the expected aria-labels to the buttons", () => {
      wrapper = mount(
        <Navbar
          onPreviousClick={onPreviousClick}
          onNextClick={onNextClick}
          className="custom-class"
        />
      );

      const prevButton = wrapper.find(StyledButton).at(0).getDOMNode();
      const nextButton = wrapper.find(StyledButton).at(1).getDOMNode();

      expect(prevButton.getAttribute("aria-label")).toBe("Previous month");
      expect(nextButton.getAttribute("aria-label")).toBe("Next month");
    });

    it.each(arrowKeys)(
      "does not change the current month when %s key is pressed and previous button is focused",
      (key) => {
        const stopPropagation = jest.fn();
        const preventDefault = jest.fn();

        wrapper = mount(
          <Navbar
            onPreviousClick={onPreviousClick}
            onNextClick={onNextClick}
            className="custom-class"
          />
        );

        const prevButton = wrapper.find(StyledButton).at(0);
        (prevButton.getDOMNode() as HTMLElement).focus();
        prevButton.prop("onKeyDown")({
          key,
          stopPropagation,
          preventDefault,
        });

        expect(stopPropagation).toHaveBeenCalled();
        expect(preventDefault).toHaveBeenCalled();
      }
    );

    it.each(arrowKeys)(
      "does not change the current month when %s key is pressed and next button is focused",
      (key) => {
        const stopPropagation = jest.fn();
        const preventDefault = jest.fn();

        wrapper = mount(
          <Navbar
            onPreviousClick={onPreviousClick}
            onNextClick={onNextClick}
            className="custom-class"
          />
        );

        const nextButton = wrapper.find(StyledButton).at(1);
        (nextButton.getDOMNode() as HTMLElement).focus();
        nextButton.prop("onKeyDown")({
          key,
          stopPropagation,
          preventDefault,
        });

        expect(stopPropagation).toHaveBeenCalled();
        expect(preventDefault).toHaveBeenCalled();
      }
    );

    it.each(actionKeys)(
      "changes the current month when %s key is pressed and previous button is focused",
      (key) => {
        const stopPropagation = jest.fn();
        const preventDefault = jest.fn();

        wrapper = mount(
          <Navbar
            onPreviousClick={onPreviousClick}
            onNextClick={onNextClick}
            className="custom-class"
          />
        );

        const prevButton = wrapper.find(StyledButton).at(0);
        (prevButton.getDOMNode() as HTMLElement).focus();
        prevButton.prop("onKeyDown")({
          key,
          stopPropagation,
          preventDefault,
        });

        expect(stopPropagation).not.toHaveBeenCalled();
        expect(preventDefault).not.toHaveBeenCalled();
      }
    );

    it.each(actionKeys)(
      "changes the current month when %s key is pressed and next button is focused",
      (key) => {
        const stopPropagation = jest.fn();
        const preventDefault = jest.fn();

        wrapper = mount(
          <Navbar
            onPreviousClick={onPreviousClick}
            onNextClick={onNextClick}
            className="custom-class"
          />
        );

        const nextButton = wrapper.find(StyledButton).at(1);
        (nextButton.getDOMNode() as HTMLElement).focus();
        nextButton.prop("onKeyDown")({
          key,
          stopPropagation,
          preventDefault,
        });

        expect(stopPropagation).not.toHaveBeenCalled();
        expect(preventDefault).not.toHaveBeenCalled();
      }
    );
  });

  describe("Navbar Button", () => {
    const render = (props: NavbarProps = {}) => {
      return TestRenderer.create(
        <StyledButton {...props}>sample children</StyledButton>
      );
    };

    it("renders presentational div and context provider for its children", () => {
      expect(render()).toMatchSnapshot();
    });
  });
});
