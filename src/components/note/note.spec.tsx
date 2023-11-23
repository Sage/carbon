import React from "react";
import { mount } from "enzyme";
import { EditorState } from "draft-js";
import Note from "./note.component";

import {
  StyledNoteMain,
  StyledNoteContent,
  StyledInlineControl,
  StyledTitle,
  StyledFooter,
  StyledFooterContent,
} from "./note.style";
import { ActionPopover, ActionPopoverItem } from "../action-popover";
import StyledStatusIconWrapper from "./__internal__/status-icon/status-icon.style";
import LinkPreview from "../link-preview";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";

function renderNote(props = {}) {
  const defaultProps = {
    createdDate: "23 May 2020, 12:08 PM",
    noteContent: EditorState.createEmpty(),
    ...props,
  };
  return mount(<Note {...defaultProps} />);
}

describe("Note", () => {
  describe("styled-system", () => {
    testStyledSystemMargin((props) => (
      <Note
        {...props}
        name="Carbon"
        createdDate="23 May 2020, 12:08 PM"
        noteContent={EditorState.createEmpty()}
      />
    ));
  });

  describe("Styling", () => {
    it("matches the expected", () => {
      const wrapper = renderNote();

      assertStyleMatch(
        {
          backgroundColor: "var(--colorsUtilityYang100)",
          border: "1px solid var(--colorsUtilityMajor100)",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          position: "relative",
          width: "100%",
          borderRadius: "var(--borderRadius100)",
        },
        wrapper
      );

      const content = wrapper.find(StyledNoteContent);

      assertStyleMatch(
        {
          position: "relative",
          width: "100%",
        },
        content
      );

      assertStyleMatch(
        {
          borderTop: "solid 1px var(--colorsUtilityMajor050)",
        },
        content,
        { modifier: ":last-of-type:not(:first-of-type)" }
      );

      const main = wrapper.find(StyledNoteMain);

      assertStyleMatch(
        {
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "var(--spacing300)",
        },
        main
      );
    });

    it('supports dynamic sizing by setting the "width" prop', () => {
      assertStyleMatch(
        {
          width: "75%",
        },
        renderNote({ width: 75 })
      );
    });
  });

  describe("StyledTitle", () => {
    const title = "title";

    it('does not render the "title" when prop is undefined', () => {
      expect(renderNote().find(StyledTitle).exists()).toBeFalsy();
    });

    it('renders the "title" with expected styling when prop has value', () => {
      const wrapper = renderNote({ title });

      assertStyleMatch(
        {
          fontWeight: "900",
          fontSize: "16px",
          lineHeight: "21px",
          paddingBottom: "16px",
        },
        wrapper.find(StyledTitle)
      );

      expect(wrapper.find(StyledTitle).exists()).toBeTruthy();
    });
  });

  describe("StyledInlineControl", () => {
    const inlineControl = (
      <ActionPopover>
        <ActionPopoverItem onClick={() => {}}>Edit</ActionPopoverItem>
      </ActionPopover>
    );

    it('does not render the "inlineControl" when prop is undefined', () => {
      expect(renderNote().find(StyledInlineControl).exists()).toBeFalsy();
    });

    it('renders the "inlineControl" with expected styling when prop has value', () => {
      const wrapper = renderNote({ inlineControl });

      assertStyleMatch(
        {
          display: "inline-block",
          minWidth: "fit-content",
        },
        wrapper.find(StyledInlineControl)
      );

      expect(wrapper.find(StyledInlineControl).exists()).toBeTruthy();
    });
  });

  describe("Footer Props", () => {
    const name = "foo";
    const createdDate = "25/12/20";

    it("renders the correct styling for the footer and content", () => {
      const wrapper = renderNote({ name, createdDate });

      assertStyleMatch(
        {
          display: "flex",
          marginBottom: "calc(-1 * var(--spacing100))",
          flexWrap: "wrap",
        },
        wrapper.find(StyledFooter)
      );

      assertStyleMatch(
        {
          alignItems: "baseline",
          fontWeight: "bold",
          marginTop: "var(--spacing200)",
        },
        wrapper.find(StyledFooterContent)
      );

      assertStyleMatch(
        {
          fontSize: "14px",
        },
        wrapper.find(StyledFooterContent),
        { modifier: ":first-of-type" }
      );

      assertStyleMatch(
        {
          fontSize: "12px",
          color: "var(--colorsUtilityYin065)",
          marginLeft: "var(--spacing200)",
        },
        wrapper.find(StyledFooterContent),
        { modifier: ":nth-of-type(2)" }
      );

      assertStyleMatch(
        {
          fontSize: "12px",
          color: "var(--colorsUtilityYin065)",
          cursor: "pointer",
          marginLeft: "var(--spacing300)",
        },
        wrapper.find(StyledFooterContent),
        { modifier: ":last-of-type:not(:nth-of-type(2))" }
      );
    });

    it("renders the correct styling for the footer and content when no name is passed", () => {
      const wrapper = renderNote({ createdDate });

      assertStyleMatch(
        {
          fontWeight: "bold",
          marginTop: "var(--spacing200)",
        },
        wrapper.find(StyledFooterContent)
      );

      assertStyleMatch(
        {
          fontSize: "12px",
          color: "var(--colorsUtilityYin065)",
        },
        wrapper.find(StyledFooterContent),
        { modifier: ":first-of-type" }
      );

      assertStyleMatch(
        {
          fontSize: "12px",
          color: "var(--colorsUtilityYin065)",
          cursor: "pointer",
          marginLeft: "var(--spacing300)",
        },
        wrapper.find(StyledFooterContent),
        { modifier: ":last-of-type:not(:first-of-type)" }
      );
    });

    it('renders the "name" and "createdDate" when props have value', () => {
      const wrapper = renderNote({ name, createdDate });
      const footerContent = wrapper.find(StyledFooterContent);
      expect(wrapper.find(StyledNoteContent)).toHaveLength(3);
      expect(wrapper.find(StyledFooter).exists()).toBeTruthy();
      expect(footerContent).toHaveLength(2);
      expect(footerContent.at(0).text()).toEqual("foo");
      expect(footerContent.at(1).text()).toEqual("25/12/20");
    });

    it('renders the "status" with tooltip when "text" and "timeStamp" have values', () => {
      const wrapper = renderNote({
        name,
        createdDate,
        status: { text: "foo", timeStamp: "123" },
      });
      const statusIcon = wrapper.find(StyledStatusIconWrapper);
      expect(wrapper.find(StyledFooterContent)).toHaveLength(3);
      expect(statusIcon.exists()).toBeTruthy();
      expect(statusIcon.text()).toEqual("foo");
    });
  });

  describe("invariant", () => {
    const mockGlobal = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => undefined);

    afterEach(() => {
      mockGlobal.mockReset();
    });

    it("throws if the width is < 0", () => {
      expect(() => {
        renderNote({ width: 0 });
      }).toThrow("<Note> width must be greater than 0");
    });

    it("throws if createdDate is not defined", () => {
      expect(() => {
        renderNote({ createdDate: undefined });
      }).toThrow("<Note> createdDate is required");
    });

    it("throws if noteContent is not defined", () => {
      expect(() => {
        renderNote({ noteContent: undefined });
      }).toThrow("<Note> noteContent is required");
    });

    it("throws if status.text is not defined", () => {
      expect(() => {
        renderNote({ status: {} });
      }).toThrow("<Note> status.text is required");
    });

    it("throws if status.timeStamp is not defined", () => {
      expect(() => {
        renderNote({ status: { text: "Edited" } });
      }).toThrow("<Note> status.timeStamp is required");
    });

    it("throws if inlineControl is not an ActionPopover", () => {
      expect(() => {
        renderNote({ inlineControl: <button type="button">A Button</button> });
      }).toThrow("<Note> inlineControl must be an instance of <ActionPopover>");
    });
  });

  describe("Link Previews", () => {
    it("renders any LinkPreviews passed in via the `previews` prop passed as an array", () => {
      const previews = [
        <LinkPreview url="foo" key="foo" />,
        null,
        <LinkPreview url="bar" key="bar" />,
        undefined,
        <LinkPreview url="wiz" key="wiz" />,
      ];
      const wrapper = renderNote({ previews });
      expect(wrapper.find(LinkPreview).length).toEqual(3);
      wrapper
        .find(LinkPreview)
        .forEach((preview) => expect(preview.find("a").exists()).toBeTruthy());
    });

    it("renders any LinkPreviews passed in via the `previews` prop passed as a node", () => {
      const previews = (
        <>
          <LinkPreview url="foo" key="foo" />,
          <LinkPreview url="bar" key="bar" />,
          <LinkPreview url="wiz" key="wiz" />,
        </>
      );
      const wrapper = renderNote({ previews });
      expect(wrapper.find(LinkPreview).length).toEqual(3);
      wrapper
        .find(LinkPreview)
        .forEach((preview) => expect(preview.find("a").exists()).toBeTruthy());
    });
  });
});
