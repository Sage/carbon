import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import { shallow, mount, EnzymePropSelector } from "enzyme";
import { ThemeProvider } from "styled-components";

import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import { carbonThemeList } from "../../style/themes";
import Portrait from "./portrait.component";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import {
  StyledIcon,
  StyledCustomImg,
  StyledPortraitContainer,
  StyledPortraitInitials,
} from "./portrait.style";
import PortraitInitials from "./portrait-initials.component";
import PortraitGravatar from "./portrait-gravatar.component";
import Tooltip from "../tooltip";
import CarbonProvider from "../carbon-provider";

function renderDLS(element: JSX.Element) {
  return mount(
    <ThemeProvider theme={carbonThemeList[0]}>{element}</ThemeProvider>
  );
}

function renderFindTypeSuccess(
  element: JSX.Element,
  type: EnzymePropSelector,
  expectedProps: Record<string, unknown>
) {
  expect(renderDLS(element).find(type).props()).toMatchObject(expectedProps);
}

function renderFindTypeFail(element: JSX.Element, type: EnzymePropSelector) {
  expect(renderDLS(element).find(type)).toHaveLength(0);
}

describe("PortraitComponent", () => {
  testStyledSystemMargin((props) => <Portrait {...props} />);

  describe("Portrait styles", () => {
    it("applies expected styles to Portrait with initials", () => {
      const wrapper = mount(
        <Portrait shape="circle" initials="AB" darkBackground={false} />
      );

      assertStyleMatch(
        {
          display: "inline-block",
        },
        wrapper.find(StyledPortraitContainer)
      );

      assertStyleMatch(
        {
          width: "inherit",
          height: "inherit",
          margin: "1px",
          display: "inline-block",
          verticalAlign: "middle",
          boxSizing: "border-box",
          outline: "1px solid var(--colorsUtilityMajor200)",
        },
        wrapper.find(StyledPortraitInitials)
      );
    });

    // TODO: Currently due to this issue https://github.com/styled-components/jest-styled-components/pull/354 we are unable to test a media query with a `@supports` selector.
    // Once this has been resolved we will need to write a test that covers the styles that target `@media not all and (min-resolution: 0.001dpcm)
    // @supports (-webkit-appearance: none) and (stroke-color: transparent)`.

    it("applies expected styling to Portrait with icon", () => {
      const wrapper = mount(
        <Portrait shape="square" darkBackground={false} iconType="image" />
      );

      assertStyleMatch(
        {
          display: "inline-block",
        },
        wrapper.find(StyledPortraitContainer)
      );

      assertStyleMatch(
        {
          height: "24px",
          width: "24px",
        },
        wrapper.find(StyledIcon)
      );
    });
  });

  describe("render icon", () => {
    const testFail = (element: JSX.Element) =>
      renderFindTypeFail(element, StyledIcon);

    it("renders icon when not supplied with Gravatar or src or initials", () => {
      const wrapper = mount(
        <Portrait size="XXL" shape="square" darkBackground={false} />
      );
      expect(wrapper.find(StyledIcon).props()).toEqual(
        expect.objectContaining({ type: "individual", size: "XXL" })
      );
    });

    it("renders specified icon when not supplied with Gravatar, src or initials", () => {
      const wrapper = mount(
        <Portrait size="XXL" shape="square" darkBackground iconType="image" />
      );
      expect(wrapper.find(StyledIcon).props()).toEqual(
        expect.objectContaining({ type: "image", size: "XXL" })
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

    describe("onClick", () => {
      it("triggers `onClick` function", () => {
        const onClickFn = jest.fn();

        const wrapper = shallow(
          <Portrait
            size="XXL"
            shape="square"
            darkBackground={false}
            onClick={onClickFn}
          />
        );

        wrapper.simulate("click");
        expect(onClickFn).toHaveBeenCalledTimes(1);
      });

      it("check if has cursor pointer", () => {
        const onClickFn = jest.fn();
        const wrapper = mount(
          <Portrait size="L" darkBackground={false} onClick={onClickFn} />
        );
        assertStyleMatch(
          { cursor: "pointer" },
          wrapper.find(StyledPortraitContainer)
        );
      });
    });
  });

  describe("render initials", () => {
    const expectedProps = {
      initials: "AB",
      size: "M",
      alt: "",
      darkBackground: false,
    };

    const testSuccess = (element: JSX.Element) =>
      renderFindTypeSuccess(element, PortraitInitials, expectedProps);
    const testFail = (element: JSX.Element) =>
      renderFindTypeFail(element, PortraitInitials);

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
      jest.spyOn(console, "error");
      const props = {
        size: "XXL",
        initials: "AB",
        darkBackground: false,
        theme: carbonThemeList[0],
      } as const;
      renderDLS(<PortraitInitials {...props} />);
      renderDLS(<PortraitInitials {...props} darkBackground />);
      expect(console.error).toHaveBeenCalledTimes(0); // eslint-disable-line no-console
    });

    describe("onClick", () => {
      it("triggers `onClick` function", () => {
        const onClickFn = jest.fn();

        const wrapper = shallow(<Portrait initials="AB" onClick={onClickFn} />);

        wrapper.simulate("click");
        expect(onClickFn).toHaveBeenCalledTimes(1);
      });

      it("check if has cursor pointer", () => {
        const onClickFn = jest.fn();
        const wrapper = mount(<Portrait initials="AB" onClick={onClickFn} />);
        assertStyleMatch(
          { cursor: "pointer" },
          wrapper.find(StyledPortraitContainer)
        );
      });
    });
  });

  describe("render Gravatar", () => {
    const gravatarEmail = "example@example.com";

    const expectedProps = {
      gravatarEmail,
      size: "M",
      alt: "foo",
    };

    const testSuccess = (element: JSX.Element) =>
      renderFindTypeSuccess(element, PortraitGravatar, expectedProps);

    it("renders the Gravatar for the specified email address", () => {
      testSuccess(<Portrait gravatar={gravatarEmail} alt="foo" />);
    });

    describe("onClick", () => {
      it("triggers `onClick` function", () => {
        const onClickFn = jest.fn();

        const wrapper = shallow(
          <Portrait gravatar={gravatarEmail} alt="foo" onClick={onClickFn} />
        );

        wrapper.simulate("click");
        expect(onClickFn).toHaveBeenCalledTimes(1);
      });

      it("check if has cursor pointer", () => {
        const onClickFn = jest.fn();
        const wrapper = mount(
          <Portrait gravatar={gravatarEmail} alt="foo" onClick={onClickFn} />
        );
        assertStyleMatch(
          { cursor: "pointer" },
          wrapper.find(StyledPortraitContainer)
        );
      });
    });
  });

  describe("render custom image", () => {
    const imageUrl = "https://example.com/example.jpg";

    const testSuccess = (
      element: JSX.Element,
      expectedProps: Record<string, unknown>
    ) => renderFindTypeSuccess(element, StyledCustomImg, expectedProps);

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

    describe("onClick", () => {
      it("triggers `onClick` function", () => {
        const onClickFn = jest.fn();

        const wrapper = shallow(
          <Portrait src={imageUrl} alt="foo" onClick={onClickFn} />
        );
        wrapper.simulate("click");
        expect(onClickFn).toHaveBeenCalledTimes(1);
      });

      it("check if has cursor pointer", () => {
        const onClickFn = jest.fn();
        const wrapper = mount(
          <Portrait src={imageUrl} alt="foo" onClick={onClickFn} />
        );
        assertStyleMatch(
          { cursor: "pointer" },
          wrapper.find(StyledPortraitContainer)
        );
      });
    });
  });

  describe("external images", () => {
    it("can handle an error when the Gravatar doesn't exist", () => {
      const wrapper = mount(<Portrait gravatar="example@example.com" />);
      expect(wrapper.find(PortraitGravatar).exists()).toBeTruthy();
      ReactTestUtils.Simulate.error(
        wrapper.find(PortraitGravatar).getDOMNode()
      ); // Triggers `onError` of <StyledPortraitGravatar>
      wrapper.update();
      expect(wrapper.find(PortraitGravatar).exists()).toBeFalsy();
    });

    it("can handle an error when the custom image doesn't exist", () => {
      const wrapper = mount(<Portrait src="https://example.com/example.jpg" />);
      expect(wrapper.find(StyledCustomImg).exists()).toBeTruthy();
      ReactTestUtils.Simulate.error(wrapper.find(StyledCustomImg).getDOMNode()); // Triggers `onError` of <StyledCustomImg>
      wrapper.update();
      expect(wrapper.find(StyledCustomImg).exists()).toBeFalsy();
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

    it("includes user-image tag on internal elements when there is an image", () => {
      const rendered = renderDLS(<Portrait src={imageUrl} />);
      expect(
        rendered.find({ "data-element": "user-image" }).length
      ).toBeGreaterThan(0);
    });
  });

  it("renders a `Tooltip` if tooltipMessage is passed", () => {
    const wrapper = shallow(
      <Portrait initials="AB" tooltipMessage="message" />
    );

    expect(wrapper.find(Tooltip).exists()).toBeTruthy();
  });

  describe("roundedCornersOptOut", () => {
    it("sets the default shape to square when true", () => {
      const shape = mount(
        <CarbonProvider roundedCornersOptOut>
          <Portrait initials="AB" tooltipMessage="message" />
        </CarbonProvider>
      )
        .find(StyledPortraitInitials)
        .prop("shape");

      expect(shape).toEqual("square");
    });

    it("sets the default shape to circle when false", () => {
      const shape = mount(
        <CarbonProvider>
          <Portrait initials="AB" tooltipMessage="message" />
        </CarbonProvider>
      )
        .find(StyledPortraitInitials)
        .prop("shape");

      expect(shape).toEqual("circle");
    });
  });
});
