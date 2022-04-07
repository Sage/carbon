import * as React from "react";
import { Carousel, Slide } from "./carousel.component";
import Box from "../box/box.component";
import Typography from "../typography/typography.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import {
  slide,
  nextArrowButton,
  previousArrowButton,
  carousel,
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
    <Carousel>
      <Slide {...props}>
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

/* const CarouselComponentNoSlide = () => {
  return (
    <Carousel enableSlideSelector={false}>
      <Slide>
        <Box height={200} display="flex" alignItems="center" justifyContent="center" bg="#003349">
          <Typography variant="h1" color="#090">
            Slide 1
          </Typography>
        </Box>
      </Slide>
      <Slide>
        <Box height={200} display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h1">Slide 2</Typography>
        </Box>
      </Slide>
      <Slide>
        <Box height={200} display="flex" alignItems="center" justifyContent="center" bg="#69418f">
          <Typography variant="h1" color="#fff">
            Slide 3
          </Typography>
        </Box>
      </Slide>
    </Carousel>
  );
}; */

context("Testing Carousel component", () => {
  describe("Should render Carousel component", () => {
    it.each([
      ["0", "Slide 1"],
      ["1", "Full clickable slide"],
      ["2", "Slide 3"],
      ["3", "Slide 4"],
      ["4", "Slide 5"],
    ])("should set slide %s title to %s by default", (index, title) => {
      CypressMountWithProviders(<CarouselComponent />);

      slide(index).should("have.text", title);
    });

    it("should verify Previous arrow button is disabled on first slide", () => {
      CypressMountWithProviders(<CarouselComponent initialSlideIndex={0} />);

      previousArrowButton().should("be.disabled").and("have.attr", "disabled");
    });

    it("should verify Next arrow button is disabled on last slide", () => {
      CypressMountWithProviders(<CarouselComponent initialSlideIndex={1} />);

      previousArrowButton().should("be.disabled").and("have.attr", "disabled");
    });

    it("should call click action when clicked", () => {
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
  describe("Should render Carousel component", () => {
    it.each([[true], [false]])(
      "should verify Slide Selector is disabled",
      (isEnabled) => {
        CypressMountWithProviders(
          <CarouselComponent enableSlideSelector={isEnabled} />
        );

        if (isEnabled === false) {
          carousel().should("not.have.attr", "data-element", slideSelector);
        } else {
          carousel().should("have.attr", "data-element", slideSelector);
        }
      }
    );

    it.each([[true], [false]])(
      "should verify Previous arrow button is enabled/disabled",
      (isEnabled) => {
        CypressMountWithProviders(
          <CarouselComponent
            enablePreviousButton={isEnabled}
            initialSlideIndex={2}
          />
        );

        if (isEnabled === false) {
          previousArrowButton()
            .should("have.attr", "disabled-type", "button")
            .and("not.have.attr", "type", "button");
        } else {
          previousArrowButton()
            .should("have.attr", "type", "button")
            .and("not.have.attr", "disabled-type", "button");
        }
      }
    );

    it.each([[true], [false]])(
      "should verify Next arrow button is enabled/disabled %s",
      (isEnabled) => {
        CypressMountWithProviders(
          <CarouselComponent enableNextButton={isEnabled} />
        );

        if (isEnabled === false) {
          nextArrowButton()
            .should("have.attr", "disabled-type", "button")
            .and("not.have.attr", "type", "button");
        } else {
          nextArrowButton()
            .should("have.attr", "type", "button")
            .and("not.have.attr", "disabled-type", "button");
        }
      }
    );
  });

  describe.only("Should render Carousel component", () => {
    it.each([
      ["1", "0", "Slide 1"],
      ["2", "1", "Full clickable slide"],
      ["3", "2", "Slide 3"],
      ["4", "3", "Slide 4"],
    ])(
      "when previous arrow is clicked to slide %s from slide %s title should be %s",
      (index, indexSlide, title) => {
        // CypressMountWithProviders(<CarouselComponent slideIndex={index} />);
        CypressMountWithProviders(
          <CarouselComponent initialSlideIndex={indexSlide} />
        );

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
      "when Next arrow is clicked from slide %s to slide %s title should be %s",
      (index, indexSlide, title) => {
        CypressMountWithProviders(<CarouselComponent />);

        clickCarouselButton("right");

        slide(indexSlide).should("have.text", title);
      }
    );
  });
});
