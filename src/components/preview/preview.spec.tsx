import React from "react";
import { mount, ReactWrapper } from "enzyme";
import Preview, { PreviewProps } from ".";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/__internal__/test-utils";
import PreviewPlaceholder from "./__internal__/preview-placeholder.component";

const render = (props: PreviewProps) => {
  return mount(<Preview {...props} />);
};

describe("Preview", () => {
  describe("when given children and no loading prop", () => {
    const childrenContent = "This is some text";
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = render({ children: childrenContent });
    });

    it("will render the text passed as children", () => {
      expect(wrapper.text()).toBe(childrenContent);
    });

    it("will not render a placeholder", () => {
      expect(wrapper.find(PreviewPlaceholder).exists()).toBe(false);
    });
  });

  describe("when given children and the 'loading' prop set to true", () => {
    it("will render a placeholder", () => {
      const childrenContent = "This is some text";
      const wrapper = render({ children: childrenContent, loading: true });

      expect(wrapper.find(PreviewPlaceholder).exists()).toBe(true);
    });
  });

  describe("when given no children and a falsy loading prop", () => {
    it("will not render a placeholder", () => {
      const wrapper = render({ loading: false });

      expect(wrapper.find(PreviewPlaceholder).exists()).toBe(false);
    });
  });

  describe("when given no children and no loading prop", () => {
    it("will render the placeholder", () => {
      const wrapper = render({});

      expect(wrapper.find(PreviewPlaceholder).exists()).toBe(true);
    });
  });

  describe("when the 'lines' prop is set", () => {
    it("renders the number of placeholders equal to that prop value", () => {
      const wrapper = render({ lines: 3 });

      expect(wrapper.find(PreviewPlaceholder).length).toBe(3);
    });
  });

  describe("when given a width and height", () => {
    it("renders a placeholder with that width and height", () => {
      const customSizes = { width: "10px", height: "20px" };
      const wrapper = render(customSizes);

      assertStyleMatch(
        {
          ...customSizes,
        },
        wrapper.find(PreviewPlaceholder)
      );
    });
  });

  describe("styled system", () => {
    testStyledSystemMargin((props) => <Preview {...props} />);
    testStyledSystemMargin((props) => <Preview {...props} loading />);
  });

  describe("Border radius", () => {
    it("should have the expected styling", () => {
      const wrapper = mount(<Preview />);

      assertStyleMatch(
        {
          borderRadius: "var(--borderRadius050)",
        },
        wrapper.find(PreviewPlaceholder)
      );
    });
  });
});
