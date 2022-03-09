/* eslint-disable no-console */
import * as React from "react";
import Profile from "./profile.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import {
  profilePreview,
  emailPreview,
  namePreview,
  avatarPreview,
  initialPreview,
} from "../../../cypress/locators/profile/index";

const testData = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];
const INITIALS_CI_FOLDER = "initialsCI/";
const INITIALS_LOCAL_FOLDER = "initialsLocal/";

const DATA_IMAGE_PREFIX = "data:image/png;base64,";

context("Tests for Profile component", () => {
  describe("should check Profile component properties", () => {
    it("should set className for Profile component", () => {
      CypressMountWithProviders(
        <Profile className="profile-cypress-classname" />
      );
      profilePreview().should("have.class", "profile-cypress-classname");
    });

    it.each(testData)(
      "should set email out of scope to %s for Profile component",
      (email) => {
        CypressMountWithProviders(
          <Profile
            email={email}
            name="John Smith"
            src="https://www.gravatar.com/avatar/05c1c705ee45d7ae88b80b3a8866ddaa?s=24&d=404"
          />
        );
        emailPreview().should("have.text", email);
      }
    );

    it.each(testData)("should set name to %s for Profile component", (name) => {
      CypressMountWithProviders(
        <Profile
          email="johnsmith@sage.com"
          name={name}
          src="https://www.gravatar.com/avatar/05c1c705ee45d7ae88b80b3a8866ddaa?s=24&d=404"
        />
      );
      namePreview().should("have.text", name);
    });

    it.each([
      [
        "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
      ],
      [
        "https://www.gravatar.com/avatar/05c1c705ee45d7ae88b80b3a8866ddaa?s=24&d=404",
      ],
    ])("should check avatar for Profile component ", (srcImage) => {
      CypressMountWithProviders(
        <Profile email="email@email.com" name="John Doe" src={srcImage} />
      );
      avatarPreview()
        .should("have.css", "height", "40px")
        .and("have.css", "width", "40px");
      avatarPreview().children().should("have.attr", "src", srcImage);
    });

    it.each([
      ["Dan Joe", "DJ"],
      ["Smith Ford", "SF"],
    ])(
      "should check initials for %s in Profile component ",
      (name, passInitials) => {
        CypressMountWithProviders(
          <Profile
            email="email@email.com"
            initials={passInitials}
            name={name}
          />
        );
        initialPreview()
          .should("have.css", "height", "40px")
          .and("have.css", "width", "40px");

        cy.wait(1000);
        if (Cypress.env("CYPRESS_CI")) {
          cy.fixture(`${INITIALS_CI_FOLDER}${passInitials}.png`, "base64").then(
            ($initialsCI) => {
              initialPreview()
                .children()
                .should(
                  "have.attr",
                  "src",
                  `${DATA_IMAGE_PREFIX}${$initialsCI}`
                );
            }
          );
        } else {
          cy.fixture(
            `${INITIALS_LOCAL_FOLDER}${passInitials}.png`,
            "base64"
          ).then(($initialLocal) => {
            initialPreview()
              .children()
              .should(
                "have.attr",
                "src",
                `${DATA_IMAGE_PREFIX}${$initialLocal}`
              );
          });
        }
      }
    );

    it.each([
      ["XS", 24],
      ["S", 32],
      ["M", 40],
      ["ML", 56],
      ["L", 72],
      ["XL", 104],
      ["XXL", 128],
    ])(
      "should check %s size for Profile component ",
      (size, heightAndwidth) => {
        CypressMountWithProviders(
          <Profile email="johnsmith@sage.com" name="John Smith" size={size} />
        );
        initialPreview()
          .should("have.css", "height", `${heightAndwidth}px`)
          .and("have.css", "width", `${heightAndwidth}px`);
      }
    );
  });
});
