import * as React from "react";
import { Carousel, Slide } from "./carousel.component";
import Box from "../box/box.component";
import Typography from "../typography/typography.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import {
  slide,
  nextArrowButton,
  previousArrowButton,
  slideSelector,
} from "../../../cypress/locators/carousel";

function clickCarouselButton(direction) {
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

const CarouselComponent = ({ ...props }) => {
  return (
    <Carousel {...props}>
      <Slide>
        <Box
          height={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#003349"
        >
          <Typography variant="h1" color="#090">
            Slide 1
          </Typography>
        </Box>
      </Slide>
      <Slide>
        <Box
          height={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h1">Full clickable slide</Typography>
        </Box>
      </Slide>
      <Slide>
        <Box
          height={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#69418f"
        >
          <Typography variant="h1" color="#fff">
            Slide 3
          </Typography>
        </Box>
      </Slide>
      <Slide>
        <Box
          height={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#69418f"
        >
          <Typography variant="h1" color="#fff">
            Slide 4
          </Typography>
        </Box>
      </Slide>
      <Slide>
        <Box
          height={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#69418f"
        >
          <Typography variant="h1" color="#fff">
            Slide 5
          </Typography>
        </Box>
      </Slide>
    </Carousel>
  );
};

context("Testing Carousel component", () => {
  describe("Should render Carousel component", () => {
    it.each([
      ["0", "Slide 1"],
      ["1", "Full clickable slide"],
      ["2", "Slide 3"],
      ["3", "Slide 4"],
      ["4", "Slide 5"],
    ])("should verify slide %s title is %s", (index, title) => {
      CypressMountWithProviders(<CarouselComponent />);

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

    it.each([[true], [false]])(
      "should verify slide Selector is enabled/disabled when 'enableSlideSelector' is set to %s",
      (isEnabled) => {
        CypressMountWithProviders(
          <CarouselComponent enableSlideSelector={isEnabled} />
        );

        if (isEnabled === false) {
          slideSelector().should("not.exist");
        } else {
          slideSelector().should("exist");
        }
      }
    );

    it.each([[true], [false]])(
      "should verify left arrow button is enabled/disabled when 'enablePreviousButton' is set to %s",
      (isEnabled) => {
        CypressMountWithProviders(
          <CarouselComponent enablePreviousButton={isEnabled} slideIndex={2} />
        );

        if (isEnabled === false) {
          previousArrowButton().should("not.exist");
        } else {
          previousArrowButton()
            .should("have.attr", "type", "button")
            .and("not.have.attr", "disabled-type", "button");
        }
      }
    );

    it.each([[true], [false]])(
      "should verify right arrow button is enabled/disabled when 'enableNextButton' is set to %s",
      (isEnabled) => {
        CypressMountWithProviders(
          <CarouselComponent enableNextButton={isEnabled} />
        );

        if (isEnabled === false) {
          nextArrowButton().should("not.exist");
        } else {
          nextArrowButton()
            .should("have.attr", "type", "button")
            .and("not.have.attr", "disabled-type", "button");
        }
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

    it("should call onSlideChange when clicked", () => {
      const callback = cy.stub();

      CypressMountWithProviders(<CarouselComponent onSlideChange={callback} />);

      nextArrowButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });
});
