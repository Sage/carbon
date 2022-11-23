import React from "react";
import Portrait from "./portrait.component";
import Box from "../box";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { icon, getDataElementByValue } from "../../../cypress/locators";
import { PORTRAIT_SIZES, PORTRAIT_SIZE_PARAMS } from "./portrait.config";

import {
  portraitPreview,
  portraitInitials,
  portraitImage,
} from "../../../cypress/locators/portrait";

const testData = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];

const colors = [
  ["orange", "rgb(255, 156, 75)"],
  ["red", "rgb(205, 56, 75)"],
  ["black", "rgb(0, 0, 0)"],
  ["brown", "rgb(105, 61, 57)"],
];

const testImage =
  "https://www.gravatar.com/avatar/cceff1ad774bf89b1f75cb6e5005333c?s=40&d=404";

const imageURL = [
  "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
  "https://www.gravatar.com/avatar/05c1c705ee45d7ae88b80b3a8866ddaa?s=24&d=404",
];

const PortraitComponent = ({ ...props }) => {
  return (
    <Portrait
      tooltipMessage="Rebecca Smith"
      tooltipIsVisible
      src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
      {...props}
    />
  );
};

context("Tests for Portrait component", () => {
  describe("check props for Portrait component", () => {
    it("should check gravatar for Portrait component", () => {
      CypressMountWithProviders(<Portrait gravatar="chris.barber@sage.com" />);
      portraitPreview()
        .should("have.css", "height", "40px")
        .and("have.css", "width", "40px");
      portraitPreview().children().should("have.attr", "src", testImage);
    });

    it.each(imageURL)(
      "should check custom image url for Portrait component",
      (srcImage) => {
        CypressMountWithProviders(<Portrait src={srcImage} />);
        portraitPreview()
          .should("have.css", "height", "40px")
          .and("have.css", "width", "40px");
        portraitPreview().children().should("have.attr", "src", srcImage);
      }
    );

    it.each([
      [PORTRAIT_SIZES[0], PORTRAIT_SIZE_PARAMS[PORTRAIT_SIZES[0]].dimensions],
      [PORTRAIT_SIZES[1], PORTRAIT_SIZE_PARAMS[PORTRAIT_SIZES[1]].dimensions],
      [PORTRAIT_SIZES[2], PORTRAIT_SIZE_PARAMS[PORTRAIT_SIZES[2]].dimensions],
      [PORTRAIT_SIZES[3], PORTRAIT_SIZE_PARAMS[PORTRAIT_SIZES[3]].dimensions],
      [PORTRAIT_SIZES[4], PORTRAIT_SIZE_PARAMS[PORTRAIT_SIZES[4]].dimensions],
      [PORTRAIT_SIZES[5], PORTRAIT_SIZE_PARAMS[PORTRAIT_SIZES[5]].dimensions],
      [PORTRAIT_SIZES[6], PORTRAIT_SIZE_PARAMS[PORTRAIT_SIZES[6]].dimensions],
    ])(
      "should check %s size for Portrait component",
      (size, heightAndWidth) => {
        CypressMountWithProviders(<Portrait size={size} />);
        portraitPreview()
          .should("have.css", "height", `${heightAndWidth}px`)
          .and("have.css", "width", `${heightAndWidth}px`);
      }
    );

    it("should check alt text for %s in Portrait component", () => {
      CypressMountWithProviders(
        <Portrait alt="cypress-test" src={testImage} />
      );
      portraitImage().should("have.attr", "alt", "cypress-test");
    });

    it.each([
      ["square", "0px"],
      ["circle", "50%"],
    ])("should check %s shape for Portrait component", (shape, radius) => {
      CypressMountWithProviders(<Portrait shape={shape} />);
      portraitPreview().children().should("have.css", "border-radius", radius);
    });

    it.each(["error", "warning", "info"])(
      "should check %s icon for Portrait component",
      (iconType) => {
        CypressMountWithProviders(<Portrait iconType={iconType} />);
        icon().should("have.attr", "data-element", iconType).and("be.visible");
      }
    );

    it.each([
      ["Kate Wool", "KW"],
      ["Jane Col", "JC"],
    ])(
      "should check initials for %s in Portrait component",
      (name, passInitials) => {
        CypressMountWithProviders(<Portrait initials={passInitials} />);
        portraitInitials()
          .should("have.css", "height", "38px")
          .and("have.css", "width", "38px");
      }
    );

    it.each([
      [false, "rgb(242, 245, 246)"],
      [true, "rgb(153, 173, 183)"],
    ])(
      "should check when dark background colour set to % in Portrait component",
      (boolValue, color) => {
        CypressMountWithProviders(<Portrait darkBackground={boolValue} />);
        portraitPreview()
          .children()
          .should("have.css", "background-color", color);
      }
    );

    it.each(testData)(
      "should check tooltipMessage as %s for Portrait component",
      (tooltipMessage) => {
        CypressMountWithProviders(
          <PortraitComponent tooltipMessage={tooltipMessage} />
        );
        portraitPreview().realHover();
        getDataElementByValue("tooltip")
          .should("be.visible")
          .and("have.text", tooltipMessage);
      }
    );

    it.each(testData)(
      "should check tooltipId as %s for Portrait component",
      (tooltipId) => {
        CypressMountWithProviders(<PortraitComponent tooltipId={tooltipId} />);
        portraitPreview().realHover();
        getDataElementByValue("tooltip")
          .should("be.visible")
          .and("have.id", tooltipId);
      }
    );

    it("should check when tooltip visibility is true for Portrait component", () => {
      CypressMountWithProviders(<PortraitComponent tooltipIsVisible />);
      getDataElementByValue("tooltip")
        .should("be.visible")
        .and("have.text", "Rebecca Smith");
    });

    it("should check when tooltip visibility is false for Portrait component", () => {
      CypressMountWithProviders(<PortraitComponent tooltipIsVisible={false} />);
      getDataElementByValue("tooltip").should("not.exist");
    });

    it.each(["top", "bottom", "left", "right"])(
      "should render Portrait with the tooltip in the %s position",
      (tooltipPosition) => {
        CypressMountWithProviders(
          <Box width="700px" height="108px">
            <div
              style={{
                padding: "200px",
              }}
            >
              <PortraitComponent tooltipPosition={tooltipPosition} />
            </div>
          </Box>
        );
        getDataElementByValue("tooltip")
          .should("be.visible")
          .and("have.attr", "data-placement", tooltipPosition);
      }
    );

    it("should check error tooltipType for Portrait component", () => {
      CypressMountWithProviders(<PortraitComponent tooltipType="error" />);
      getDataElementByValue("tooltip").and(
        "have.css",
        "background-color",
        "rgb(203, 55, 74)"
      );
    });

    it.each([
      ["medium", "14px"],
      ["large", "16px"],
    ])(
      "should render Portrait with the tooltip in the %s size",
      (tooltipSize, fontSize) => {
        CypressMountWithProviders(
          <PortraitComponent tooltipSize={tooltipSize} />
        );
        getDataElementByValue("tooltip")
          .should("be.visible")
          .and("have.css", "font-size", fontSize);
      }
    );

    it.each(colors)(
      "should check tooltip background-color as %s for Portrait component",
      (name, color) => {
        CypressMountWithProviders(<PortraitComponent tooltipBgColor={color} />);
        getDataElementByValue("tooltip").should(
          "have.css",
          "background-color",
          color
        );
      }
    );

    it.each(colors)(
      "should check tooltip font color as %s for Portrait component",
      (name, color) => {
        CypressMountWithProviders(
          <PortraitComponent tooltipFontColor={color} isFocused />
        );
        getDataElementByValue("tooltip").should("have.css", "color", color);
      }
    );

    describe("should render Portrait component for event tests", () => {
      let callback;

      beforeEach(() => {
        callback = cy.stub();
      });

      it("should call onClick callback when a click event is triggered for Portrait component", () => {
        CypressMountWithProviders(<Portrait onClick={callback} />);

        portraitPreview()
          .click()
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      });
    });
  });
});
