import React from "react";
import Profile from "./profile.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";
import { PROFILE_SIZES } from "./profile.config";

import {
  profilePreview,
  emailPreview,
  namePreview,
  avatarPreview,
  initialPreview,
} from "../../../cypress/locators/profile/index";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

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
    ])("should check avatar for Profile component", (srcImage) => {
      CypressMountWithProviders(
        <Profile email="email@email.com" name="John Doe" src={srcImage} />
      );
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
      CypressMountWithProviders(
        <Profile email="johnsmith@sage.com" name="John Smith" size={size} />
      );
      initialPreview()
        .should("have.css", "height", `${heightAndWidth}px`)
        .and("have.css", "width", `${heightAndWidth}px`);
    });

    it.each([
      ["Dan Jin", "DJ"],
      ["Sid Ford", "SF"],
    ])(
      "should check initials for %s in Profile component",
      (name, passInitials) => {
        CypressMountWithProviders(
          <Profile
            email="email@email.com"
            initials={passInitials}
            name={name}
          />
        );
        initialPreview()
          .should("have.css", "height", "38px")
          .and("have.css", "width", "38px");
      }
    );
  });
});
