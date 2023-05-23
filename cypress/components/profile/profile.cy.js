import React from "react";
import { ProfileComponentTest as ProfileComponent } from "../../../src/components/profile/profile-test.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { assertCssValueIsApproximately } from "../../support/component-helper/common-steps";
import { CHARACTERS } from "../../support/component-helper/constants";
import { PROFILE_SIZES } from "../../../src/components/profile/profile.config";

import {
  profilePreview,
  emailPreview,
  namePreview,
  avatarPreview,
  initialPreview,
} from "../../locators/profile/index";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

context("Tests for Profile component", () => {
  describe("should check Profile component properties", () => {
    it("should check className for Profile component", () => {
      CypressMountWithProviders(
        <ProfileComponent className="profile-cypress-classname" />
      );
      profilePreview().should("have.class", "profile-cypress-classname");
    });

    it.each(testData)(
      "should check email as %s for Profile component",
      (email) => {
        CypressMountWithProviders(
          <ProfileComponent
            email={email}
            src="https://www.gravatar.com/avatar/05c1c705ee45d7ae88b80b3a8866ddaa?s=24&d=404"
          />
        );
        emailPreview().should("have.text", email);
      }
    );

    it.each(testData)(
      "should check name as %s for Profile component",
      (name) => {
        CypressMountWithProviders(
          <ProfileComponent
            name={name}
            src="https://www.gravatar.com/avatar/05c1c705ee45d7ae88b80b3a8866ddaa?s=24&d=404"
          />
        );
        namePreview().should("have.text", name);
      }
    );

    it.each([
      [
        "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
      ],
      [
        "https://www.gravatar.com/avatar/05c1c705ee45d7ae88b80b3a8866ddaa?s=24&d=404",
      ],
    ])("should check avatar for Profile component", (srcImage) => {
      CypressMountWithProviders(<ProfileComponent src={srcImage} />);
      avatarPreview()
        .should("have.css", "height", "40px")
        .and("have.css", "width", "40px");
      avatarPreview().children().should("have.attr", "src", srcImage);
    });

    it.each([
      [PROFILE_SIZES[0], 22],
      [PROFILE_SIZES[1], 30],
      [PROFILE_SIZES[2], 38],
      [PROFILE_SIZES[3], 54],
      [PROFILE_SIZES[4], 70],
      [PROFILE_SIZES[5], 102],
      [PROFILE_SIZES[6], 126],
    ])("should check %s size for Profile component", (size, heightAndWidth) => {
      CypressMountWithProviders(<ProfileComponent size={size} />);
      initialPreview().then(($el) => {
        assertCssValueIsApproximately($el, "height", heightAndWidth);
        assertCssValueIsApproximately($el, "width", heightAndWidth);
      });
    });

    it.each([
      ["Dan Jin", "DJ"],
      ["Sid Ford", "SF"],
    ])(
      "should check initials for %s in Profile component",
      (name, passInitials) => {
        CypressMountWithProviders(
          <ProfileComponent initials={passInitials} name={name} />
        );
        initialPreview().then(($el) => {
          assertCssValueIsApproximately($el, "height", 38);
          assertCssValueIsApproximately($el, "width", 38);
        });
      }
    );
  });

  describe("Accessibility tests for Profile component", () => {
    it("should check className for accessibility tests", () => {
      CypressMountWithProviders(
        <ProfileComponent className="profile-cypress-classname" />
      );
      cy.checkAccessibility();
    });

    it.each(testData)(
      "should check email as %s for accessibility tests",
      (email) => {
        CypressMountWithProviders(
          <ProfileComponent
            email={email}
            src="https://www.gravatar.com/avatar/05c1c705ee45d7ae88b80b3a8866ddaa?s=24&d=404"
          />
        );
        cy.checkAccessibility();
      }
    );

    it.each(testData)(
      "should check name as %s for accessibility tests",
      (name) => {
        CypressMountWithProviders(
          <ProfileComponent
            name={name}
            src="https://www.gravatar.com/avatar/05c1c705ee45d7ae88b80b3a8866ddaa?s=24&d=404"
          />
        );
        cy.checkAccessibility();
      }
    );

    it.each([
      [
        "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
      ],
      [
        "https://www.gravatar.com/avatar/05c1c705ee45d7ae88b80b3a8866ddaa?s=24&d=404",
      ],
    ])("should check src image as %s for accessibility tests", (srcImage) => {
      CypressMountWithProviders(<ProfileComponent src={srcImage} />);
      cy.checkAccessibility();
    });

    it.each([
      PROFILE_SIZES[0],
      PROFILE_SIZES[1],
      PROFILE_SIZES[2],
      PROFILE_SIZES[3],
      PROFILE_SIZES[4],
      PROFILE_SIZES[5],
      PROFILE_SIZES[6],
    ])("should check profile size as %s for accessibility tests", (size) => {
      CypressMountWithProviders(<ProfileComponent size={size} />);
      cy.checkAccessibility();
    });

    it.each([
      ["Dan Jin", "DJ"],
      ["Sid Ford", "SF"],
    ])(
      "should check %s initials as %s for accessibility tests",
      (name, passInitials) => {
        CypressMountWithProviders(
          <ProfileComponent initials={passInitials} name={name} />
        );
        cy.checkAccessibility();
      }
    );
  });
});
