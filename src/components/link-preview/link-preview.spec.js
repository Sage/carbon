import React from "react";
import { mount } from "enzyme";
import LinkPreview from "./link-preview.component";
import {
  StyledLinkPreview,
  StyledPreviewWrapper,
  StyledCloseIconWrapper,
  StyledTitle,
  StyledDescription,
  StyledUrl,
} from "./link-preview.style";
import {
  StyledPreview,
  StyledPreviewPlaceholder,
} from "../preview/preview.style";
import Image from "../image";
import Placeholder from "./__internal__/placeholder.component";
import StyledIconButton from "../icon-button/icon-button.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";

const render = (props = {}) => {
  return mount(<LinkPreview {...props} />);
};

describe("LinkPreview", () => {
  let wrapper;

  describe("styling", () => {
    it("matches expected for default configuration", () => {
      wrapper = render();

      assertStyleMatch(
        {
          display: "flex",
          margin: "8px",
          border: "1px solid var(--colorsUtilityMajor050)",
          backgroundColor: "var(--colorsUtilityMajor025)",
          textDecoration: "none",
          color: "var(--colorsUtilityYin090)",
        },
        wrapper.find(StyledLinkPreview)
      );

      assertStyleMatch(
        {
          flexGrow: "1",
          padding: "16px",
        },
        wrapper.find(StyledPreviewWrapper)
      );

      assertStyleMatch(
        {
          marginTop: "8px",
        },
        wrapper.find(StyledPreviewWrapper),
        { modifier: `${StyledPreviewPlaceholder}:first-of-type` }
      );

      assertStyleMatch(
        {
          marginTop: "16px",
        },
        wrapper.find(StyledPreviewWrapper),
        { modifier: `${StyledPreviewPlaceholder}:not(:first-of-type)` }
      );
    });

    it("matches the expected when `onClose` prop is set", () => {
      wrapper = render({ onClose: () => {}, as: "div" });

      assertStyleMatch(
        {
          padding: "16px",
        },
        wrapper.find(StyledCloseIconWrapper)
      );
    });

    it("matches the expected when `isLoading` is false", () => {
      wrapper = render({ isLoading: false, url: "foo" });

      assertStyleMatch(
        {
          outline: "2px solid var(--colorsSemanticFocus500)",
        },
        wrapper.find(StyledLinkPreview),
        { modifier: ":focus" }
      );

      assertStyleMatch(
        {
          cursor: "pointer",
          backgroundColor: "var(--colorsUtilityMajor100)",
        },
        wrapper.find(StyledLinkPreview),
        { modifier: ":hover" }
      );

      assertStyleMatch(
        {
          display: "flex",
          flexDirection: "column",
          height: "100%",
        },
        wrapper.find(StyledPreviewWrapper),
        { modifier: `${StyledPreview}` }
      );

      assertStyleMatch(
        {
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          fontWeight: "700",
          fontSize: "14px",
          lineHeight: "21px",
        },
        wrapper.find(StyledTitle)
      );

      assertStyleMatch(
        {
          flexGrow: "1",
        },
        wrapper.find(StyledDescription)
      );

      assertStyleMatch(
        {
          display: "-webkit-box",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "21px",
        },
        wrapper.find(StyledDescription),
        { modifier: "> div" }
      );

      assertStyleMatch(
        {
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "21px",
          color: "var(--colorsUtilityMajor400)",
        },
        wrapper.find(StyledUrl)
      );
    });
  });

  describe("image props", () => {
    it("renders the placeholder Image if no config found", () => {
      wrapper = render();
      expect(wrapper.find(Image).exists()).toBeFalsy();
      expect(wrapper.find(Placeholder).exists()).toBeTruthy();
    });

    it("renders the Image with the provided config", () => {
      wrapper = render({
        image: {
          url: "foo",
          alt: "foo image alt text",
        },
      });
      expect(wrapper.find(Image).prop("src")).toEqual("foo");
      expect(wrapper.find(Image).prop("alt")).toEqual("foo image alt text");
    });

    it("renders the Image with the default alt text if none found in config", () => {
      wrapper = render({
        image: {
          url: "foo",
        },
      });
      expect(wrapper.find(Image).prop("src")).toEqual("foo");
      expect(wrapper.find(Image).prop("alt")).toEqual("Link preview image");
    });
  });

  describe.each(["div", "a"])("when the as prop is set to `%s`", (as) => {
    it("sets the props as expected", () => {
      wrapper = render({ as, isLoading: false, url: "foo" });
      const expectedUrl = as === "div" ? undefined : "foo";
      const expectedTarget = as === "div" ? undefined : "_blank";
      const expectedTabIndex = as === "div" ? -1 : 0;

      expect(wrapper.find(StyledLinkPreview).prop("href")).toEqual(expectedUrl);
      expect(wrapper.find(StyledLinkPreview).prop("target")).toEqual(
        expectedTarget
      );
      expect(wrapper.find(StyledLinkPreview).prop("tabIndex")).toEqual(
        expectedTabIndex
      );
    });
  });

  describe("clicking the close link preview close button", () => {
    it("should call the onClose callback with expected parameter", () => {
      const onClose = jest.fn();
      wrapper = render({ as: "div", onClose, url: "foo" });
      wrapper.find(StyledIconButton).prop("onClick")();

      expect(onClose).toHaveBeenCalledWith("foo");
    });
  });

  describe("displaying the url", () => {
    it("trims the scheme", () => {
      wrapper = render({ url: "https://www.foo.com" });
      expect(wrapper.find(StyledUrl).prop("children")).toEqual("www.foo.com");
    });
  });
});
