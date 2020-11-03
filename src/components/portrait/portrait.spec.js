import React from "react";
import TestRenderer from "react-test-renderer";
import ReactTestUtils from "react-dom/test-utils";
import { shallow } from "enzyme";
import { ThemeProvider } from "styled-components";
import { carbonThemeList } from "../../style/themes";
import Browser from "../../utils/helpers/browser";
import Portrait from "./portrait.component";
import { rootTagTest } from "../../utils/helpers/tags/tags-specs";
import { StyledIcon, StyledCustomImg } from "./portrait.style";
import PortraitInitials from "./portrait-initials.component";
import PortraitGravatar from "./portrait-gravatar.component";

const mockCanvasDataURL = "data:image/png";

const mockDocumentWithCanvas = {
  createElement: () => ({
    width: 10,
    height: 10,
    toDataURL: () => mockCanvasDataURL,
    getContext: () => ({
      font: null,
      textAlign: null,
      fillStyle: null,
      fillRect: jasmine.createSpy("fillRect"),
      fillText: jasmine.createSpy("fillText"),
    }),
  }),
};

function renderDLS(element) {
  return TestRenderer.create(
    <ThemeProvider theme={carbonThemeList[0]}>{element}</ThemeProvider>
  );
}

function renderFindTypeSuccess(element, type, expectedProps) {
  expect(renderDLS(element).root.findByType(type).props).toMatchObject(
    expectedProps
  );
}

function renderFindTypeFail(element, type) {
  expect(renderDLS(element).root.findAllByType(type)).toHaveLength(0);
}

describe("PortraitComponent", () => {
  beforeEach(() => {
    spyOn(Browser, "getDocument").and.returnValue(mockDocumentWithCanvas);
  });

  describe("props validation", () => {
    beforeEach(() => {
      spyOn(console, "error");
    });

    /* eslint-disable no-console */

    describe("size", () => {
      it("accepts a valid size", () => {
        renderDLS(<Portrait src="foo" size="XXL" />);
        expect(console.error).toHaveBeenCalledTimes(0);
      });

      it("rejects an invalid size", () => {
        renderDLS(<Portrait src="foo" size="bar" />);
        expect(console.error).toHaveBeenCalled();
        expect(console.error.calls.argsFor(0).length).toBe(1);
        const expected = "Warning: Failed prop type: Invalid prop `size`";
        const actual = console.error.calls.argsFor(0)[0];
        expect(actual).toEqual(expect.stringContaining(expected));
      });
    });

    describe("shape", () => {
      it("accepts valid DLS shapes", () => {
        renderDLS(<Portrait src="foo" shape="square" />);
        renderDLS(<Portrait src="foo" shape="circle" />);
        expect(console.error).toHaveBeenCalledTimes(0);
      });

      it("rejects an invalid shape", () => {
        renderDLS(<Portrait src="foo" shape="bar" />);
        expect(console.error).toHaveBeenCalled();
        expect(console.error.calls.argsFor(0).length).toBe(1);
        const expected = "Warning: Failed prop type: Invalid prop `shape`";
        const actual = console.error.calls.argsFor(0)[0];
        expect(actual).toEqual(expect.stringContaining(expected));
      });
    });

    describe("src", () => {
      it("accepts a valid src", () => {
        renderDLS(
          <Portrait src="https://example.com/example.png" size="XXL" />
        );
        expect(console.error).toHaveBeenCalledTimes(0);
      });

      it("rejects an invalid src", () => {
        renderDLS(<Portrait src={42} size="XXL" />);
        expect(console.error).toHaveBeenCalled();
        expect(console.error.calls.argsFor(0).length).toBe(1);
        const expected =
          "Invalid prop `src` of type `number` supplied to `Portrait`, expected `string`.";
        const actual = console.error.calls.argsFor(0)[0];
        expect(actual).toMatch(expected);
      });
    });

    describe("gravatar and src", () => {
      it("throws an error when both gravatar and src are passed", () => {
        renderDLS(<Portrait gravatar="example@example.com" src="foo" />);
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error.calls.argsFor(0).length).toBe(1);
        const expected =
          'Warning: Failed prop type: Portrait requires a prop of "src" or "gravatar" but not both';
        const actual = console.error.calls.argsFor(0)[0];
        expect(actual).toMatch(expected);
      });
    });

    /* eslint-enable no-console */
  });

  describe("render icon", () => {
    const expectedProps = {
      type: "individual",
      size: "XXL",
      shape: "square",
      darkBackground: false,
    };

    const testSuccess = (element) =>
      renderFindTypeSuccess(element, StyledIcon, expectedProps);
    const testFail = (element) => renderFindTypeFail(element, StyledIcon);

    it("renders icon when not supplied with Gravatar or src or initials", () => {
      testSuccess(
        <Portrait size="XXL" shape="square" darkBackground={false} />
      );
    });

    it("doesn't render icon when supplied with src", () => {
      testFail(<Portrait src="https://example.com/example.jpg" />);
    });

    it("doesn't render icon when supplied with initials", () => {
      testFail(<Portrait initials="AB" />);
    });

    it("doesn't render icon when supplied with src and initials", () => {
      testFail(
        <Portrait src="https://example.com/example.jpg" initials="AB" />
      );
    });

    it("doesn't render icon when supplied with Gravatar and initials", () => {
      testFail(<Portrait gravatar="example@example.com" initials="AB" />);
    });

    describe("sizes", () => {
      beforeEach(() => {
        spyOn(console, "error");
      });

      /* eslint-disable no-console */

      it("accepts a valid DLS size", () => {
        const styledIconDark = (
          <StyledIcon type="individual" size="XXL" darkBackground />
        );
        const styledIconLight = (
          <StyledIcon type="individual" size="XXL" darkBackground={false} />
        );
        renderDLS(styledIconDark);
        renderDLS(styledIconLight);
        expect(console.error).toHaveBeenCalledTimes(0);
      });

      it("rejects an invalid size", () => {
        renderDLS(<StyledIcon type="individual" size="foo" darkBackground />);
        expect(console.error).toHaveBeenCalled();
        expect(console.error.calls.argsFor(0).length).toBe(1);
        const expected = "Warning: Failed prop type: Invalid prop `size`";
        const actual = console.error.calls.argsFor(0)[0];
        expect(actual).toEqual(expect.stringContaining(expected));
      });

      /* eslint-enable no-console */
    });
  });

  describe("render initials", () => {
    const expectedProps = {
      initials: "AB",
      size: "M",
      alt: "",
      darkBackground: false,
    };

    const testSuccess = (element) =>
      renderFindTypeSuccess(element, PortraitInitials, expectedProps);
    const testFail = (element) => renderFindTypeFail(element, PortraitInitials);

    it("renders initials when supplied with initials but no Gravatar or src", () => {
      testSuccess(<Portrait initials="AB" />);
    });

    it("renders empty alt attribute when alt prop is empty", () => {
      testSuccess(<Portrait initials="AB" alt="" />);
    });

    it("renders empty alt attribute when alt prop is not supplied", () => {
      renderDLS(<Portrait initials="AB" />);
      testSuccess(<Portrait initials="AB" />);
    });

    it("doesn't render initials when supplied with src", () => {
      testFail(<Portrait src="https://example.com/example.jpg" />);
    });

    it("doesn't render initials when supplied with Gravatar and empty initials but no src", () => {
      testFail(<Portrait gravatar="example@example.com" initials="" />);
    });

    it("can render the DLS theme", () => {
      spyOn(console, "error");
      const props = {
        size: "XXL",
        initials: "AB",
        darkBackground: false,
        theme: carbonThemeList[0],
      };
      renderDLS(<PortraitInitials {...props} />);
      props.darkBackground = true;
      renderDLS(<PortraitInitials {...props} />);
      expect(console.error).toHaveBeenCalledTimes(0); // eslint-disable-line no-console
    });
  });

  describe("render Gravatar", () => {
    const gravatarEmail = "example@example.com";

    const expectedProps = {
      gravatarEmail,
      size: "M",
      alt: "foo",
    };

    const testSuccess = (element) =>
      renderFindTypeSuccess(element, PortraitGravatar, expectedProps);

    it("renders the Gravatar for the specified email address", () => {
      testSuccess(<Portrait gravatar={gravatarEmail} alt="foo" />);
    });
  });

  describe("render custom image", () => {
    const imageUrl = "https://example.com/example.jpg";

    const testSuccess = (element, expectedProps) =>
      renderFindTypeSuccess(element, StyledCustomImg, expectedProps);

    it("renders avatar when supplied with src but no Gravatar", () => {
      testSuccess(<Portrait src={imageUrl} alt="foo" />, {
        src: imageUrl,
        alt: "foo",
        size: "M",
        "data-element": "user-image",
      });
    });

    it("renders empty alt attribute when alt prop is empty", () => {
      testSuccess(<Portrait src={imageUrl} alt="" />, {
        src: imageUrl,
        alt: "",
        size: "M",
        "data-element": "user-image",
      });
    });

    it("renders empty alt attribute when alt prop is not supplied", () => {
      testSuccess(<Portrait src={imageUrl} />, {
        src: imageUrl,
        alt: "",
        size: "M",
        "data-element": "user-image",
      });
    });
  });

  describe("external images", () => {
    it("can handle an error when the Gravatar doesn't exist", () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Portrait gravatar="example@example.com" />
      );
      const img = ReactTestUtils.findRenderedDOMComponentWithTag(
        rendered,
        "img"
      ); // Finds <StyledPortraitGravatar>
      expect(rendered.state.externalError).toBe(false);
      ReactTestUtils.Simulate.error(img); // Triggers `onError` of <StyledPortraitGravatar>
      expect(rendered.state.externalError).toBe(true);
    });

    it("can handle an error when the custom image doesn't exist", () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Portrait src="https://example.com/example.jpg" />
      );
      const img = ReactTestUtils.findRenderedDOMComponentWithTag(
        rendered,
        "img"
      ); // Finds <StyledCustomImg>
      expect(rendered.state.externalError).toBe(false);
      ReactTestUtils.Simulate.error(img); // Triggers `onError` of <StyledCustomImg>
      expect(rendered.state.externalError).toBe(true);
    });

    it("resets the error state when the Gravatar is changed", () => {
      const wrapper = shallow(<Portrait gravatar="example@example.com" />);
      wrapper.setState({ externalError: true });
      wrapper.setProps({ gravatar: "test@test.com" });
      expect(wrapper.state().externalError).toBe(false);
    });

    it("resets the error state when the custom image src is changed", () => {
      const wrapper = shallow(
        <Portrait src="https://example.com/example.jpg" />
      );
      wrapper.setState({ externalError: true });
      wrapper.setProps({ src: "https://test.com/test.jpg" });
      expect(wrapper.state().externalError).toBe(false);
    });
  });

  describe("tags", () => {
    const imageUrl = "https://example.com/example.jpg";

    it("includes data tags for component, element and role on Portrait component", () => {
      const wrapper = shallow(
        <Portrait src={imageUrl} data-element="bar" data-role="baz" />,
        { context: { theme: carbonThemeList[0] } }
      );
      rootTagTest(wrapper, "portrait", "bar", "baz");
    });

    describe("includes user-image tag on internal elements when there is an image", () => {
      const rendered = renderDLS(<Portrait src={imageUrl} />);
      expect(
        rendered.root.findAllByProps({ "data-element": "user-image" }).length
      ).toBeGreaterThan(0);
    });
  });
});
