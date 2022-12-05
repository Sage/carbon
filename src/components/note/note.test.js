import React from "react";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import Note from "./note.component";
import Box from "../box";
import LinkPreview from "../link-preview";
import { ActionPopover, ActionPopoverItem } from "../action-popover";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { tooltipPreview } from "../../../cypress/locators";
import { linkPreview } from "../../../cypress/locators/link-preview/index";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";

import {
  noteComponent,
  noteHeader,
  noteFooterCreatedBy,
  noteFooterChangeTime,
  noteStatus,
  noteContent,
} from "../../../cypress/locators/note";
import { actionPopoverWrapper } from "../../../cypress/locators/action-popover";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const NoteComponent = ({ text, ...props }) => {
  const initialValue = text
    ? EditorState.createWithContent(ContentState.createFromText(text))
    : EditorState.createEmpty();

  return (
    <Note
      title="Here is a Title"
      name="Lauren Smith"
      noteContent={initialValue}
      createdDate="23 May 2020, 12:08 PM"
      {...props}
    />
  );
};

const NoteComponentWithInlineControl = () => {
  const html = `<p>Lorem ipsum <b>dolor</b> sit amet. Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>
      <p>Lorem ipsum <b>dolor</b> sit amet, <i>consectetuer adipiscing elit.</i></p>
      <p>Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>`;
  const blocksFromHTML = convertFromHTML(html);
  const content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const noteContentVal = EditorState.createWithContent(content);
  const inlineControl = (
    <ActionPopover>
      <ActionPopoverItem onClick={() => {}}>Edit</ActionPopoverItem>
    </ActionPopover>
  );
  return (
    <Note
      title="Here is a Title"
      inlineControl={inlineControl}
      noteContent={noteContentVal}
      name="Lauren Smith"
      createdDate="23 May 2020, 12:08 PM"
    />
  );
};

context("Tests for Note component", () => {
  describe("check props for Note component", () => {
    it.each([CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS])(
      "should render Note with noteContent prop",
      (text) => {
        CypressMountWithProviders(<NoteComponent text={text} />);

        noteContent().should("have.text", text);
      }
    );

    it.each([
      [30, 75],
      [75, 187],
    ])(
      "should render Note with width prop is set to %s",
      (width, widthInPx) => {
        CypressMountWithProviders(
          <Box width="250px">
            <NoteComponent width={width} />
          </Box>
        );

        noteComponent()
          .should("have.attr", "width", width)
          .then(($el) => {
            const value = $el.css("width");
            // console.log(value);
            expect(parseInt(value)).to.be.within(widthInPx - 1, widthInPx + 1);
          });
      }
    );

    it("should render Note with inlineControl prop", () => {
      CypressMountWithProviders(<NoteComponentWithInlineControl />);

      actionPopoverWrapper().should("be.visible");
    });

    it.each(testData)(
      "should render Note with title prop set to %s",
      (title) => {
        CypressMountWithProviders(<NoteComponent title={title} />);

        noteHeader().should("have.text", title);
      }
    );

    it.each(testData)("should render Note with name prop set to %s", (name) => {
      CypressMountWithProviders(<NoteComponent name={name} />);

      noteFooterCreatedBy().should("have.text", name);
    });

    it("should render Note with createdDate prop", () => {
      const createdDate = "25 June 2022, 11:57 AM";

      CypressMountWithProviders(<NoteComponent createdDate={createdDate} />);

      noteFooterChangeTime().should("have.text", createdDate);
    });

    it.each(testData)(
      "should render Note with status prop set to %s",
      (value) => {
        CypressMountWithProviders(
          <NoteComponent
            status={{
              text: value,
              timeStamp: `${CHARACTERS.STANDARD}`,
            }}
          />
        );

        noteStatus().should("have.text", value).realHover();
        tooltipPreview().should("have.text", CHARACTERS.STANDARD);
      }
    );

    it("should render Note with previews prop", () => {
      const previews = [
        <LinkPreview
          title="This is an example of a title"
          url="https://www.bbc.co.uk"
          description="Captain, why are we out here chasing comets?"
        />,
        <LinkPreview
          title="This is an example of a title"
          url="https://www.sage.com"
          description="Captain, why are we out here chasing comets?"
        />,
      ];

      CypressMountWithProviders(<NoteComponent previews={previews} />);

      linkPreview().should("have.length", 2).and("be.visible");
    });

    it("should call onLinkAdded callback when a valid url is detected by Note component", () => {
      const callback = cy.stub();

      CypressMountWithProviders(
        <NoteComponent onLinkAdded={callback} text="https://carbon.s" />
      );

      noteComponent().then(() => {
        // eslint-disable-next-line no-unused-expressions
        expect(callback).to.have.been.calledOnce;
      });
    });
  });
});
