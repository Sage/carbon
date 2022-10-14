import * as React from "react";
import GridContainer from "./grid-container/grid-container.component";
import GridItem from "./grid-item/grid-item.component";
import { pod, gridPod, gridComponent } from "../../../cypress/locators/grid";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

const viewportSize = (sizeOfViewport) => {
  switch (sizeOfViewport) {
    case "default":
      cy.viewport(1958, 900);
      break;
    case "extra small":
      cy.viewport(599, 900);
      break;
    case "small":
      cy.viewport(959, 900);
      break;
    case "medium":
      cy.viewport(1259, 900);
      break;
    case "large":
      cy.viewport(1920, 900);
      break;
    case "extra large":
      cy.viewport(1922, 900);
      break;
    default:
      throw new Error(
        `${sizeOfViewport} is not defined in a scope. We want to resize to only for types of viewport`
      );
  }
};

const GridComponent = ({ ...props }) => {
  return (
    <>
      <GridContainer {...props}>
        <GridItem alignSelf="stretch" justifySelf="stretch" {...props}>
          <pod alignTitle="left" border padding="medium" variant="primary">
            1
          </pod>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="stretch">
          <pod alignTitle="left" border padding="medium" variant="primary">
            2
          </pod>
        </GridItem>
        <GridItem alignSelf="stretch" justifySelf="stretch">
          <pod alignTitle="left" border padding="medium" variant="primary">
            3
          </pod>
        </GridItem>
      </GridContainer>
    </>
  );
};

const GridComponentSized = ({ ...props }) => {
  return (
    <>
      <GridContainer {...props}>
        <GridItem alignSelf="stretch" justifySelf="stretch" {...props}>
          <pod alignTitle="left" border padding="medium" variant="primary">
            1
          </pod>
        </GridItem>
        <GridItem
          alignSelf="stretch"
          justifySelf="stretch"
          gridColumn="1 / 6"
          gridRow="2 / 3"
        >
          <pod alignTitle="left" border padding="medium" variant="primary">
            2
          </pod>
        </GridItem>
        <GridItem
          alignSelf="stretch"
          justifySelf="stretch"
          gridColumn="7 / 13"
          gridRow="4 / 5"
        >
          <pod alignTitle="left" border padding="medium" variant="primary">
            3
          </pod>
        </GridItem>
      </GridContainer>
    </>
  );
};

context("Testing Grid component", () => {
  describe("should render Grid component", () => {
    it.each([
      [1, "1 /1", "1 / 13", 1862],
      [2, "2 / 3", "1 / 6", 752],
      [3, "4 / 5", "7 / 13", 911],
    ])(
      "should render Grid viewport to default and verify pod width and height",
      (index, row, col, podWidth) => {
        CypressMountWithProviders(<GridComponentSized />);

        viewportSize("default");
        if (index === 1) {
          gridPod(index).should("have.css", "grid-row", "auto / auto");
          gridPod(index).should("have.css", "grid-column", "auto / auto");
          gridPod(index)
            .invoke("css", "width")
            .then(parseFloat)
            .then(($el) => {
              expect($el).to.be.gte(podWidth);
              expect($el).to.be.lt(podWidth + 1);
            });
        } else {
          gridPod(index).should("have.css", "grid-row", row);
          gridPod(index).should("have.css", "grid-column", col);
          gridPod(index)
            .invoke("css", "width")
            .then(parseFloat)
            .then(($el) => {
              expect($el).to.be.gte(podWidth);
              expect($el).to.be.lt(podWidth + 1);
            });
        }
      }
    );

    it.each([
      [1, "1 /1", "1 / 13", 551],
      [2, "2 / 3", "1 / 6", 220],
      [3, "4 / 5", "7 / 13", 267],
    ])(
      "should render Grid viewport to extra small and verify pod width and height",
      (index, row, col, podWidth) => {
        CypressMountWithProviders(<GridComponentSized />);

        viewportSize("extra small");
        if (index === 1) {
          gridPod(index).should("have.css", "grid-row", "auto / auto");
          gridPod(index).should("have.css", "grid-column", "auto / auto");
          gridPod(index)
            .invoke("css", "width")
            .then(parseFloat)
            .then(($el) => {
              expect($el).to.be.gte(podWidth);
              expect($el).to.be.lt(podWidth + 1);
            });
        } else {
          gridPod(index).should("have.css", "grid-row", row);
          gridPod(index).should("have.css", "grid-column", col);
          gridPod(index)
            .invoke("css", "width")
            .then(parseFloat)
            .then(($el) => {
              expect($el).to.be.gte(podWidth);
              expect($el).to.be.lt(podWidth + 1);
            });
        }
      }
    );

    it.each([
      [1, "1 /1", "1 / 13", 895],
      [2, "2 / 3", "1 / 6", 363],
      [3, "4 / 5", "7 / 13", 439],
    ])(
      "should render Grid viewport to small and verify pod width and height",
      (index, row, col, podWidth) => {
        CypressMountWithProviders(<GridComponentSized />);

        viewportSize("small");
        if (index === 1) {
          gridPod(index).should("have.css", "grid-row", "auto / auto");
          gridPod(index).should("have.css", "grid-column", "auto / auto");
          gridPod(index)
            .invoke("css", "width")
            .then(parseFloat)
            .then(($el) => {
              expect($el).to.be.gte(podWidth);
              expect($el).to.be.lt(podWidth + 1);
            });
        } else {
          gridPod(index).should("have.css", "grid-row", row);
          gridPod(index).should("have.css", "grid-column", col);
          gridPod(index)
            .invoke("css", "width")
            .then(parseFloat)
            .then(($el) => {
              expect($el).to.be.gte(podWidth);
              expect($el).to.be.lt(podWidth + 1);
            });
        }
      }
    );

    it.each([
      [1, "1 /1", "1 / 13", 1179],
      [2, "2 / 3", "1 / 6", 477],
      [3, "4 / 5", "7 / 13", 577],
    ])(
      "should render Grid viewport to medium and verify pod width and height",
      (index, row, col, podWidth) => {
        CypressMountWithProviders(<GridComponentSized />);

        viewportSize("medium");
        if (index === 1) {
          gridPod(index).should("have.css", "grid-row", "auto / auto");
          gridPod(index).should("have.css", "grid-column", "auto / auto");
          gridPod(index)
            .invoke("css", "width")
            .then(parseFloat)
            .then(($el) => {
              expect($el).to.be.gte(podWidth);
              expect($el).to.be.lt(podWidth + 1);
            });
        } else {
          gridPod(index).should("have.css", "grid-row", row);
          gridPod(index).should("have.css", "grid-column", col);
          gridPod(index)
            .invoke("css", "width")
            .then(parseFloat)
            .then(($el) => {
              expect($el).to.be.gte(podWidth);
              expect($el).to.be.lt(podWidth + 1);
            });
        }
      }
    );

    it.each([
      [1, "1 /1", "1 / 13", 1824],
      [2, "2 / 3", "1 / 6", 746],
      [3, "4 / 5", "7 / 13", 900],
    ])(
      "should render Grid viewport to large and verify pod width and height",
      (index, row, col, podWidth) => {
        CypressMountWithProviders(<GridComponentSized />);

        viewportSize("large");
        if (index === 1) {
          gridPod(index).should("have.css", "grid-row", "auto / auto");
          gridPod(index).should("have.css", "grid-column", "auto / auto");
          gridPod(index)
            .invoke("css", "width")
            .then(parseFloat)
            .then(($el) => {
              expect($el).to.be.gte(podWidth);
              expect($el).to.be.lt(podWidth + 1);
            });
        } else {
          gridPod(index).should("have.css", "grid-row", row);
          gridPod(index).should("have.css", "grid-column", col);
          gridPod(index)
            .invoke("css", "width")
            .then(parseFloat)
            .then(($el) => {
              expect($el).to.be.gte(podWidth);
              expect($el).to.be.lt(podWidth + 1);
            });
        }
      }
    );

    it.each([
      [1, "1 /1", "1 / 13", 1826],
      [2, "2 / 3", "1 / 6", 737],
      [3, "4 / 5", "7 / 13", 893],
    ])(
      "should render Grid viewport to extra large and verify pod width and height",
      (index, row, col, podWidth) => {
        CypressMountWithProviders(<GridComponentSized />);

        viewportSize("extra large");
        if (index === 1) {
          gridPod(index).should("have.css", "grid-row", "auto / auto");
          gridPod(index).should("have.css", "grid-column", "auto / auto");
          gridPod(index)
            .invoke("css", "width")
            .then(parseFloat)
            .then(($el) => {
              expect($el).to.be.gte(podWidth);
              expect($el).to.be.lt(podWidth + 1);
            });
        } else {
          gridPod(index).should("have.css", "grid-row", row);
          gridPod(index).should("have.css", "grid-column", col);
          gridPod(index)
            .invoke("css", "width")
            .then(parseFloat)
            .then(($el) => {
              expect($el).to.be.gte(podWidth);
              expect($el).to.be.lt(podWidth + 1);
            });
        }
      }
    );

    it.each([
      ["extra small", 16, 16],
      ["small", 24, 16],
      ["medium", 32, 24],
      ["large", 40, 24],
      ["extra large", 40, 40],
    ])(
      "should render Grid viewport to %s and verify padding and gap",
      (size, padding, gridGap) => {
        CypressMountWithProviders(<GridComponent />);

        viewportSize(size);
        gridComponent().should("have.css", "padding-left", `${padding}px`);
        gridComponent().should("have.css", "row-gap", `${gridGap}px`);
      }
    );

    it.each(["start", "end", "center", "stretch"])(
      "should render Grid with grid item alignment set to %s",
      (alignment) => {
        CypressMountWithProviders(<GridComponent alignSelf={alignment} />);

        gridComponent().children().should("have.css", "align-self", alignment);
      }
    );

    it.each(["start", "end", "center", "stretch"])(
      "should render Grid with grid item justification set to %s",
      (justification) => {
        CypressMountWithProviders(
          <GridComponent justifySelf={justification} />
        );

        gridComponent()
          .children()
          .should("have.css", "justify-self", justification);
      }
    );

    it("should render Grid with grid column start and end defined by gridColumn prop", () => {
      CypressMountWithProviders(<GridComponent gridColumn="4 / 10" />);

      gridComponent()
        .children()
        .should("have.css", "grid-column-start", "4")
        .and("have.css", "grid-column-end", "10")
        .and("have.css", "width", "623px");
    });

    it("should render Grid with grid row start and end defined by gridRow prop", () => {
      CypressMountWithProviders(<GridComponent gridRow="4 / 11" />);

      gridComponent()
        .children()
        .should("have.css", "grid-row-start", "4")
        .and("have.css", "grid-row-end", "11")
        .and("have.css", "height", "144px");
    });

    it("should render Grid with grid column and grid row defined by gridArea prop", () => {
      CypressMountWithProviders(<GridComponent gridArea="3 / 4 / 11 / 10" />);

      gridComponent()
        .children()
        .should("have.css", "grid-column", "4 / 10")
        .and("have.css", "grid-row", "3 / 11")
        .and("have.css", "width", "623px")
        .and("have.css", "height", "168px");
    });

    it("should render Grid with responsiveSettings", () => {
      CypressMountWithProviders(
        <GridContainer>
          <GridItem
            responsiveSettings={[
              {
                maxWidth: "1500px",
                gridColumn: "1 / 7",
                gridRow: "1 / 1",
                alignSelf: "stretch",
                justifySelf: "stretch",
              },
              {
                maxWidth: "1300px",
                gridColumn: "1 / 13",
                gridRow: "1 / 1",
                alignSelf: "stretch",
                justifySelf: "stretch",
              },
              {
                maxWidth: "900px",
                gridColumn: "1 / 9",
                gridRow: "2 / 2",
                alignSelf: "stretch",
                justifySelf: "stretch",
              },
            ]}
          >
            <pod alignTitle="left" border padding="medium" variant="primary">
              1
            </pod>
          </GridItem>
          <GridItem
            responsiveSettings={[
              {
                maxWidth: "1500px",
                gridColumn: "6 / 13",
                gridRow: "1 / 1",
                alignSelf: "end",
                justifySelf: "end",
              },
              {
                maxWidth: "1300px",
                gridColumn: "1 / 13",
                gridRow: "2 / 2",
                alignSelf: "end",
                justifySelf: "end",
              },
              {
                maxWidth: "900px",
                gridColumn: "1 / 9",
                gridRow: "3 / 3",
                alignSelf: "end",
                justifySelf: "end",
              },
            ]}
          >
            <pod alignTitle="left" border padding="medium" variant="primary">
              2
            </pod>
          </GridItem>
          <GridItem
            responsiveSettings={[
              {
                maxWidth: "1500px",
                gridColumn: "1 / 13",
                gridRow: "3 / 3",
                alignSelf: "start",
                justifySelf: "stretch",
              },
              {
                maxWidth: "1300px",
                gridColumn: "1 / 13",
                gridRow: "2 / 2",
                alignSelf: "start",
                justifySelf: "stretch",
              },
              {
                maxWidth: "900px",
                gridColumn: "1 / 9",
                gridRow: "3 / 3",
                alignSelf: "start",
                justifySelf: "stretch",
              },
            ]}
          >
            <pod alignTitle="left" border padding="medium" variant="primary">
              3
            </pod>
          </GridItem>
        </GridContainer>
      );

      gridComponent()
        .children()
        .should("have.css", "grid-column", "1 / 7")
        .and("have.css", "grid-row", "1 / 1")
        .and("have.css", "width", "623px")
        .and("have.css", "align-self", "stretch")
        .and("have.css", "justify-self", "stretch");
      gridComponent()
        .children()
        .eq(1)
        .should("have.css", "grid-column", "6 / 13")
        .and("have.css", "grid-row", "1 / 1")
        .and("have.css", "width", "8px")
        .and("have.css", "align-self", "end")
        .and("have.css", "justify-self", "end");
      gridComponent()
        .children()
        .eq(2)
        .should("have.css", "grid-column", "1 / 13")
        .and("have.css", "grid-row", "3 / 3")
        .and("have.css", "width", "1270px")
        .and("have.css", "align-self", "start")
        .and("have.css", "justify-self", "stretch");
    });
  });
});
