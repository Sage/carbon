import React from "react";
import styled from "styled-components";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import useInputBehaviour from "./useInputBehaviour";

const Input = styled.input``;

// eslint-disable-next-line
const HookTestComponent = ({ blockGroupBehaviour }) => {
  const { inputRef, ...hookValues } = useInputBehaviour(blockGroupBehaviour);
  return (
    <Input
      type="text"
      {...hookValues}
      ref={(input) => inputRef({ current: input })}
    />
  );
};

const render = (blockGroupBehaviour) =>
  mount(<HookTestComponent blockGroupBehaviour={blockGroupBehaviour} />, {
    attachTo: document.getElementById("enzymeContainer"),
  });

describe("useInputBehaviour", () => {
  let wrapper;
  let container;

  describe("group behaviour enabled", () => {
    beforeEach(() => {
      container = document.createElement("div");
      container.id = "enzymeContainer";
      document.body.appendChild(container);
      wrapper = render();
    });

    afterEach(() => {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }

      container = null;
    });

    it("toggles hasFocus when element is focused and blurred", () => {
      act(() => {
        wrapper.find(Input).props().onFocus();
      });
      wrapper.update();
      expect(wrapper.find(Input).props().hasFocus).toBe(true);

      act(() => {
        wrapper.find(Input).props().onBlur();
      });
      wrapper.update();
      expect(wrapper.find(Input).props().hasFocus).toBe(false);
    });

    it("toggles hasMouseOver when mouse enters and leaves the element", () => {
      act(() => {
        wrapper.find(Input).props().onMouseEnter();
      });
      wrapper.update();
      expect(wrapper.find(Input).props().hasMouseOver).toBe(true);

      act(() => {
        wrapper.find(Input).props().onMouseLeave();
      });
      wrapper.update();
      expect(wrapper.find(Input).props().hasMouseOver).toBe(false);
    });

    it("focuses the element on mousedown event", () => {
      jest.useFakeTimers();
      act(() => {
        wrapper.find(Input).props().onMouseDown();
      });
      wrapper.update();
      jest.runAllTimers();
      expect(document.activeElement).toBe(wrapper.find(Input).getDOMNode());
    });
  });

  describe("group behaviour disabled", () => {
    beforeEach(() => {
      container = document.createElement("div");
      container.id = "enzymeContainer";
      document.body.appendChild(container);
      wrapper = render(true);
    });

    afterEach(() => {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }

      container = null;
    });

    it("blocks the group behaviour callbacks when prop is true", () => {
      expect(wrapper.find(Input).props().onMouseEnter).toEqual(undefined);
      expect(wrapper.find(Input).props().onMouseLeave).toEqual(undefined);
      expect(wrapper.find(Input).props().onBlur).toEqual(undefined);
      expect(wrapper.find(Input).props().onFocus).toEqual(undefined);
    });
  });
});
