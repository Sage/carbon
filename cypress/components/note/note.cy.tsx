import React from "react";
import {
  NoteComponent,
  NoteComponentWithInlineControl,
} from "../../../src/components/note/note-test.stories";
import Box from "../../../src/components/box";
import { NoteProps } from "../../../src/components/note";
import LinkPreview from "../../../src/components/link-preview";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { cyRoot, tooltipPreview } from "../../locators";
import { linkPreview } from "../../locators/link-preview/index";
import { CHARACTERS } from "../../support/component-helper/constants";

import {
  noteComponent,
  noteHeader,
  noteFooterCreatedBy,
  noteFooterChangeTime,
  noteStatus,
  noteContent,
} from "../../locators/note";
import { actionPopoverWrapper } from "../../locators/action-popover";


const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

context("Tests for Note component", () => {
  describe("check props for Note component", () => {
    it.each(testData)("should render Note with noteContent prop", (text) => {
      CypressMountWithProviders(<NoteComponent text={text} />);

      noteContent().should("have.text", text);
    });

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
            const value = parseInt($el.css("width"));
            cy.wrap(value).should("be.gte", widthInPx - 1)
            .and("be.lte", widthInPx + 1);
           
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
      const createdDate = "25 June 2022, 11:57 AM" as string;

      CypressMountWithProviders(<NoteComponent createdDate={createdDate}  />);

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
        cyRoot().realHover({ position: "topLeft" });
      }
    );

    it("should render Note with previews prop", () => {
      const previews = [
        <LinkPreview
          key="linkPreview1" 
          title="This is an example of a title"
          url="https://www.bbc.co.uk"
          description="Captain, why are we out here chasing comets?"
        />,
        <LinkPreview
          key="linkPreview2" 
          title="This is an example of a title"
          url="https://www.sage.com"
          description="Captain, why are we out here chasing comets?"
        />,
      ];

      CypressMountWithProviders(<NoteComponent previews={previews} />);

      linkPreview().should("have.length", 2).and("be.visible");
    });

    it("should call onLinkAdded callback when a valid url is detected by Note component", () => {
      const callback: NoteProps["onLinkAdded"] = cy.stub().as("onLinkAdded");

      CypressMountWithProviders(
        <NoteComponent onLinkAdded={callback} text="https://carbon.s" />
      );

      cy.get("@onLinkAdded").should("have.been.calledOnce");
    });
  });

  describe("Accessibility tests for Note component", () => {
    it.each(testData)(
      "should render Note with noteContent prop for accessibility tests",
      (text) => {
        CypressMountWithProviders(<NoteComponent text={text} />);

        cy.checkAccessibility();
      }
    );

    it.each([30, 75])(
      "should render Note with width prop is set to %s for accessibility tests",
      (width) => {
        CypressMountWithProviders(<NoteComponent width={width} />);
        cy.checkAccessibility();
      }
    );

    it("should render Note with inlineControl prop for accessibility tests", () => {
      CypressMountWithProviders(<NoteComponentWithInlineControl />);

      cy.checkAccessibility();
    });

    it.each(testData)(
      "should render Note with title prop set to %s for accessibility tests",
      (title) => {
        CypressMountWithProviders(<NoteComponent title={title} />);

        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should render Note with name prop set to %s for accessibility tests",
      (name) => {
        CypressMountWithProviders(<NoteComponent name={name} />);

        cy.checkAccessibility();
      }
    );

    it("should render Note with createdDate prop for accessibility tests", () => {
      const createdDate = "25 June 2022, 11:57 AM" as string;

      CypressMountWithProviders(<NoteComponent createdDate={createdDate} />);

      cy.checkAccessibility();
    });

    it.each(testData)(
      "should render Note with status prop set to %s for accessibility tests",
      (value) => {
        CypressMountWithProviders(
          <NoteComponent
            status={{
              text: value,
              timeStamp: `${CHARACTERS.STANDARD}`,
            }}
          />
        );
        cy.checkAccessibility();
      }
    );

    it("should render Note with previews prop for accessibility tests", () => {
      const previews = [
        <LinkPreview
          key="linkPreview1" 
          title="This is an example of a title"
          url="https://www.bbc.co.uk"
          description="Captain, why are we out here chasing comets?"
        />,
        <LinkPreview
          key="linkPreview2" 
          title="This is an example of a title"
          url="https://www.sage.com"
          description="Captain, why are we out here chasing comets?"
        />,
      ];

      CypressMountWithProviders(<NoteComponent previews={previews} />);

      cy.checkAccessibility();
    });

    it("should call onLinkAdded callback when a valid url is detected by Note component for accessibility tests", () => {
      const callback = cy.stub();

      CypressMountWithProviders(
        <NoteComponent onLinkAdded={callback} text="https://carbon.s" />
      );

      cy.checkAccessibility();
    });
  });

  it("should render with expected border radius styling", () => {
    CypressMountWithProviders(<NoteComponent />);

    noteComponent().should("have.css", "border-radius", "8px");
  });
});
