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
    const mockGlobal = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => undefined);

    afterEach(() => {
      mockGlobal.mockReset();
    });

    it("throws an error when `children` and `src` are passed", () => {
      const errorMessage =
        "The 'Image' component renders as an 'img' element when the 'src' prop is used and therefore does not accept children.";
      expect(() => {
        mount(
          <Image src="foo.jpg" alt="foo">
            foo
          </Image>
        );
      }).toThrow(errorMessage);
    });

    it("throws an error when `src` is passed and no `alt` provided", () => {
      const errorMessage =
        "Please provide an 'alt' string when rendering the 'Image' component as an 'img' element.";

      expect(() => {
        mount(<Image src="foo.jpg" />);
      }).toThrow(errorMessage);
    });
  });
});
