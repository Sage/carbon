import React from "react";
import { mount } from "enzyme";
import {
  testStyledSystemMargin,
  testStyledSystemLayout,
  testStyledSystemBackground,
} from "../../__spec_helper__/test-utils";
import Image from "./image.component";

describe("Image", () => {
  testStyledSystemMargin((props) => <Image {...props} />);
  testStyledSystemLayout((props) => <Image {...props} />);
  testStyledSystemBackground((props) => <Image {...props} />);

  it("renders an `img` element when a value is passed via the `src` prop", () => {
    const wrapper = mount(
      <Image src="foo.jpg" alt="foo" backgroundImage="url('foo.jpg')" />
    );

    expect(wrapper.find("img").exists()).toBeTruthy();
    expect(wrapper.find("img").prop("src")).toEqual("foo.jpg");
  });

  it("renders a `div` element when no value is passed via the `src` prop", () => {
    const wrapper = mount(<Image backgroundImage="url('foo.jpg')" />);

    expect(wrapper.find("img").exists()).toBeFalsy();
    expect(wrapper.find("div").exists()).toBeTruthy();
  });

  describe("prop types", () => {
    beforeEach(() => {
      jest.spyOn(global.console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      global.console.error.mockReset();
    });

    it("throws an error when `children` and `src` are passed", () => {
      mount(
        <Image src="foo.jpg" alt="foo">
          foo
        </Image>
      );
      expect(console.error).toHaveBeenCalled();
    });

    it("throws an error when `src` is passed and no `alt` provided", () => {
      mount(<Image src="foo.jpg" />);
      expect(console.error).toHaveBeenCalled();
    });

    it("does not throw an error when `src` is passed and `alt` provided", () => {
      mount(<Image src="foo.jpg" alt="foo" />);
      expect(console.error).not.toHaveBeenCalled();
    });

    it("throws an error when `children` is passed and no `src` provided", () => {
      mount(<Image backgroundImage="url('foo.jpg')">foo</Image>);
      expect(console.error).not.toHaveBeenCalled();
    });
  });
});
