/* eslint-disable jest/valid-expect */
/* eslint-disable no-unused-expressions */
import React from "react";
import { CarouselProps } from "components/carousel";
import { CarouselComponent } from "../../../src/components/carousel/carousel-test.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import {
  slide,
  nextArrowButton,
  previousArrowButton,
  slideSelector,
} from "../../locators/carousel";
import { checkGoldenOutline } from "../../support/component-helper/common-steps";

function clickCarouselButton(direction: "left" | "right") {
  switch (direction) {
    case "left":
      previousArrowButton().click();
      break;
    case "right":
      nextArrowButton().click();
      break;
    default:
      throw new Error("Direction can be only left or right");
  }
}

context("Testing Carousel component", () => {
  describe("should render Carousel component", () => {
    it.each([
      ["0", "Slide 1"],
      ["1", "Full clickable slide"],
      ["2", "Slide 3"],
      ["3", "Slide 4"],
      ["4", "Slide 5"],
    ])("should verify slide %s title is %s", (index, title) => {
      CypressMountWithProviders(<CarouselComponent slideIndex={index} />);

      slide(index).should("have.text", title);
    });

    it.each([
      ["1", "0", "Slide 1"],
      ["2", "1", "Full clickable slide"],
      ["3", "2", "Slide 3"],
      ["4", "3", "Slide 4"],
    ])(
      "when left arrow is clicked to slide %s from slide %s title should be %s",
      (index, indexSlide, title) => {
        CypressMountWithProviders(<CarouselComponent slideIndex={index} />);

        clickCarouselButton("left");

        slide(indexSlide).should("have.text", title);
      }
    );

    it.each([
      ["0", "1", "Full clickable slide"],
      ["1", "2", "Slide 3"],
      ["2", "3", "Slide 4"],
      ["3", "4", "Slide 5"],
    ])(
      "when right arrow is clicked from slide %s to slide %s title should be %s",
      (index, indexSlide, title) => {
        CypressMountWithProviders(<CarouselComponent />);

        clickCarouselButton("right");

        slide(indexSlide).should("have.text", title);
      }
    );

    it("should verify left arrow button is disabled on first slide", () => {
      CypressMountWithProviders(<CarouselComponent slideIndex={0} />);

      previousArrowButton().should("be.disabled").and("have.attr", "disabled");
    });

    it("should verify right arrow button is disabled on last slide", () => {
      CypressMountWithProviders(<CarouselComponent slideIndex={4} />);

      nextArrowButton().should("be.disabled").and("have.attr", "disabled");
    });

    it.each([
      [true, "exist"],
      [false, "not.exist"],
    ])(
      "should verify when 'enableSlideSelector' is set to %s that slide Selector does %s",
      (isEnabled, state) => {
        CypressMountWithProviders(
          <CarouselComponent enableSlideSelector={isEnabled} />
        );

        slideSelector().should(state);
      }
    );

    it.each([
      [true, "exist"],
      [false, "not.exist"],
    ])(
      "should verify when 'enablePreviousButton' is set to %s that slide Selector does %s",
      (isEnabled, state) => {
        CypressMountWithProviders(
          <CarouselComponent enablePreviousButton={isEnabled} slideIndex={2} />
        );

        previousArrowButton().should(state);
      }
    );

    it.each([
      [true, "exist"],
      [false, "not.exist"],
    ])(
      "should verify when 'enableNextButton' is set to %s that slide Selector does %s",
      (isEnabled, state) => {
        CypressMountWithProviders(
          <CarouselComponent enableNextButton={isEnabled} />
        );

        nextArrowButton().should(state);
      }
    );

    it.each([
      ["0", "Slide 1"],
      ["1", "Full clickable slide"],
      ["2", "Slide 3"],
      ["3", "Slide 4"],
      ["4", "Slide 5"],
    ])("should set initial slide to %s", (index, title) => {
      CypressMountWithProviders(
        <CarouselComponent initialSlideIndex={index} />
      );

      slide(index).should("have.text", title);
    });

    it("should render Carousel component with className", () => {
      CypressMountWithProviders(
        <CarouselComponent className="carousel-classname" />
      );
      cy.get('[class*="carousel-classname"]').should("exist");
    });
  });

  describe("check events for Carousel component", () => {
    let callback: CarouselProps["onSlideChange"];

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onSlideChange when next arrow clicked", () => {
      CypressMountWithProviders(<CarouselComponent onSlideChange={callback} />);

      nextArrowButton()
        .click()
        .then(() => {
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onSlideChange when previous arrow clicked", () => {
      CypressMountWithProviders(
        <CarouselComponent onSlideChange={callback} slideIndex={2} />
      );

      previousArrowButton()
        .click()
        .then(() => {
          expect(callback).to.have.been.calledOnce;
        });
    });
  });

  describe("should check accessibility for Carousel component", () => {
    it("should check accessibility for default Carousel component", () => {
      CypressMountWithProviders(<CarouselComponent />);

      cy.checkAccessibility();
    });
  });

  describe("when focused", () => {
    it("the arrow buttons should have expected styling when opt out flag is true", () => {
      CypressMountWithProviders(<CarouselComponent />, undefined, undefined, {
        focusRedesignOptOut: true,
      });
      nextArrowButton()
        .focus()
        .then(($el) => {
          checkGoldenOutline($el);
        });

      nextArrowButton().click();

      previousArrowButton()
        .focus()
        .then(($el) => {
          checkGoldenOutline($el);
        });
    });

    it("the arrow buttons should have expected styling when opt out flag is false", () => {
      CypressMountWithProviders(<CarouselComponent />);
      nextArrowButton()
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");

      nextArrowButton().click();

      previousArrowButton()
        .focus()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
    });
  });

  describe("rounded corners", () => {
    it("should have the expected border radius styling", () => {
      CypressMountWithProviders(<CarouselComponent />);
      nextArrowButton().should("have.css", "border-radius", "32px");
      previousArrowButton().should("have.css", "border-radius", "32px");
      slide(0).should("have.css", "border-radius", "16px");
      slide(1).should("have.css", "border-radius", "16px");
      slide(2).should("have.css", "border-radius", "16px");
      slide(3).should("have.css", "border-radius", "16px");
      slide(4).should("have.css", "border-radius", "16px");
    });
  });
});
