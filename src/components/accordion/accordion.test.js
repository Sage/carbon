import * as React from "react";
import Accordion from "./accordion.component";
import AccordionGroup from "./accordion-group/accordion-group.component";
import Checkbox from "../checkbox/checkbox.component";
import Box from "../box/box.component";
import Button from "../button";
import Textbox from "../textbox/textbox.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import {
  accordion,
  accordionIcon,
  accordionDefaultTitle,
  accordionTitleContainer,
  accordionTitleContainerByPosition,
  accordionContent,
} from "../../../cypress/locators/accordion";
import { positionOfElement, keyCode } from "../../../cypress/support/helper";
import { getDataElementByValue } from "../../../cypress/locators";
import {
  ACCORDION_ADD_CONTENT,
  ACCORDION_REMOVE_CONTENT,
} from "../../../cypress/locators/accordion/locators";
import { checkGoldenOutline } from "../../../cypress/support/component-helper/common-steps";

const specialCharacters = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];
const sizes = [
  ["small", "24px"],
  ["large", "46px"],
];
const accWidths = [["700px"], ["900px"], ["1100px"], ["1300px"]];

const AccordionComponent = ({ ...props }) => {
  return (
    <Accordion
      customPadding={0}
      onChange={() => {}}
      subTitle="Sub Title"
      title="Title"
      width="100%"
      {...props}
    >
      <div>Content</div>
      <div>Content</div>
      <div>Content</div>
    </Accordion>
  );
};

const AccordionWithIcon = () => {
  const [errors] = React.useState({
    one: "error",
  });
  const [warnings] = React.useState({
    one: "warning",
  });

  const [expanded, setExpanded] = React.useState({
    one: false,
  });

  return (
    <AccordionGroup>
      <Accordion
        title="Heading"
        expanded={expanded.one}
        onChange={() =>
          setExpanded((previousState) => ({
            ...previousState,
            one: !previousState.one,
          }))
        }
        error={errors.one}
        warning={warnings.one}
      >
        <Checkbox label="Add error" />
      </Accordion>
    </AccordionGroup>
  );
};

const AccordionGroupWithError = () => {
  const [errors] = React.useState({
    one: "error",
    two: "error",
    three: "error",
  });

  return (
    <div
      style={{
        marginTop: "16px",
      }}
    >
      <AccordionGroup>
        <Accordion title="Heading" error={errors.one}>
          <div style={{ padding: "8px" }}>
            <Checkbox label="Add error" error={!!errors.one} />
          </div>
        </Accordion>
      </AccordionGroup>
    </div>
  );
};

const AccordionGroupWithWarning = () => {
  const [warnings] = React.useState({
    one: "warning",
  });

  return (
    <div
      style={{
        marginTop: "16px",
      }}
    >
      <AccordionGroup>
        <Accordion title="Heading" warning={warnings.one}>
          <div style={{ padding: "8px" }}>
            <Checkbox label="Add warning" warning={!!warnings.one} />
          </div>
        </Accordion>
      </AccordionGroup>
    </div>
  );
};

const AccordionGroupWithInfo = () => {
  const [infos] = React.useState({
    one: "info",
  });

  return (
    <div
      style={{
        marginTop: "16px",
      }}
    >
      <AccordionGroup>
        <Accordion title="Heading" info={infos.one}>
          <div style={{ padding: "8px" }}>
            <Checkbox label="Add info" info={!!infos.one} />
          </div>
        </Accordion>
      </AccordionGroup>
    </div>
  );
};

const AccordionGroupComponent = () => {
  return (
    <AccordionGroup>
      <Accordion
        title="First Accordion"
        customPadding={0}
        onChange={() => {}}
        width="100%"
      >
        <Box p={2}>
          <Textbox label="Textbox in an Accordion" />
        </Box>
      </Accordion>
      <Accordion
        title="Second Accordion"
        customPadding={0}
        onChange={() => {}}
        width="100%"
      >
        <Box p={2}>
          <Box height="100px" bg="primary" />
        </Box>
      </Accordion>
      <Accordion
        title="Third Accordion"
        customPadding={0}
        onChange={() => {}}
        width="100%"
      >
        <div>Content</div>
      </Accordion>
    </AccordionGroup>
  );
};

const DynamicContent = () => {
  const [contentCount, setContentCount] = React.useState(3);
  const modifyContentCount = (modifier) => {
    if (modifier === 1) {
      setContentCount(contentCount + 1);
    }
    if (modifier === -1 && contentCount > 0) {
      setContentCount(contentCount - 1);
    }
  };
  return (
    <>
      <Button data-element="add-content" onClick={() => modifyContentCount(1)}>
        Add content
      </Button>
      <Button
        data-element="remove-content"
        onClick={() => modifyContentCount(-1)}
        ml={2}
      >
        Remove content
      </Button>
      <Accordion title="Title" defaultExpanded>
        {Array.from({ length: contentCount }).map((_, index) => (
          <div key={index}>Content</div>
        ))}
      </Accordion>
    </>
  );
};

context("Testing Accordion component", () => {
  describe("should render Accordion component", () => {
    it("should check AccordionRow is expanded using click", () => {
      CypressMountWithProviders(<AccordionComponent />);

      accordionTitleContainer().click();

      accordionTitleContainer()
        .should("have.attr", "aria-expanded", "true")
        .and("be.visible");

      accordionContent()
        .should("have.attr", "data-element", "accordion-content")
        .and("be.visible");
    });

    it("should check AccordionRow is expanded using Enter key", () => {
      CypressMountWithProviders(<AccordionComponent />);

      accordionTitleContainer().trigger("keydown", keyCode("Enter"));

      accordionTitleContainer()
        .should("have.attr", "aria-expanded", "true")
        .and("be.visible");

      accordionContent()
        .should("have.attr", "data-element", "accordion-content")
        .and("be.visible");
    });

    it("should verify AccordionRow has golden border outline", () => {
      CypressMountWithProviders(<AccordionComponent />);

      accordionTitleContainer().focus();

      accordionDefaultTitle()
        .then(($el) => {
          checkGoldenOutline($el);
        })
        .and("be.visible");
    });

    it.each([["chevron_down"], ["dropdown"]])(
      "should set iconType to %s when Accordion row is closed",
      (iconType) => {
        CypressMountWithProviders(<AccordionComponent iconType={iconType} />);

        accordionIcon()
          .should("have.attr", "type", iconType)
          .and("be.visible")
          .and(
            "have.css",
            "transform",
            "matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)"
          );
      }
    );

    it.each([["chevron_down"], ["dropdown"]])(
      "should set iconType to %s when Accordion row is open",
      (iconType) => {
        CypressMountWithProviders(<AccordionComponent iconType={iconType} />);

        accordionTitleContainer().click();

        accordionIcon()
          .should("have.attr", "type", iconType)
          .and("be.visible")
          .and(
            "not.have.css",
            "transform",
            "matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)"
          );
      }
    );

    it.each([["left"], ["right"]])(
      "should set Accordion iconAlign to %s",
      (iconAlign) => {
        CypressMountWithProviders(<AccordionComponent iconAlign={iconAlign} />);

        accordionTitleContainerByPosition(positionOfElement("first"))
          .first()
          .should("have.attr", "data-element", "accordion-headings-container")
          .and("be.visible");
        accordionTitleContainerByPosition(positionOfElement("first"))
          .last()
          .should("have.attr", "data-component", "icon")
          .and("be.visible");
        if (iconAlign === "right") {
          // set by default
          accordionTitleContainer()
            .should("have.css", "justify-content", "space-between")
            .and("not.have.css", "flex-direction", "row-reverse");
          accordionTitleContainer(positionOfElement("first"))
            .first()
            .should("have.css", "margin-right", "0px");
        } else {
          accordionTitleContainer().should(
            "have.css",
            "flex-direction",
            "row-reverse"
          );
          accordionTitleContainerByPosition(positionOfElement("first"))
            .last()
            .should("have.css", "margin-right", "16px");
        }
      }
    );

    it("should verify AccordionRow is expanded by clicking on validation icon", () => {
      CypressMountWithProviders(<AccordionWithIcon />);

      accordionIcon().eq(0).click();

      accordionTitleContainer()
        .should("have.attr", "aria-expanded", "true")
        .and("be.visible");

      accordionContent()
        .should("have.attr", "data-element", "accordion-content")
        .and("be.visible");
    });

    it.each([[true], [false]])(
      "should call onChange callback when a click event is triggered and expanded is set to %s",
      (isExpanded) => {
        const callback = cy.stub();

        CypressMountWithProviders(
          <AccordionComponent expanded={isExpanded} onChange={callback} />
        );

        accordionTitleContainer()
          .click()
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it.each(specialCharacters)(
      "should render Accordion component with %s as a title",
      (titleValue) => {
        CypressMountWithProviders(<AccordionComponent title={titleValue} />);

        accordionTitleContainer().should("contain.text", titleValue);
      }
    );

    it.each(specialCharacters)(
      "should render Accordion component with %s as a subtitle",
      (titleValue) => {
        CypressMountWithProviders(<AccordionComponent subTitle={titleValue} />);

        accordionTitleContainer().should("contain.text", titleValue);
      }
    );

    it.each(sizes)(
      "should render Accordion component with %s as a size and has height property set to %s",
      (size, height) => {
        CypressMountWithProviders(<AccordionComponent size={size} />);

        accordionTitleContainer()
          .should("have.css", "height")
          .and("contain", height);
      }
    );

    it.each([
      ["solid", "rgb(204, 214, 219)"],
      ["none", "rgba(0, 0, 0, 0.9)"],
    ])(
      "should render Accordion component with border type '%s'",
      (border, colour) => {
        CypressMountWithProviders(<AccordionComponent borders={border} />);

        accordion()
          .should("have.css", "border-bottom-style", border)
          .and("have.css", "border-bottom-color", colour);
      }
    );

    it.each([["true"], ["false"]])(
      "should check Accordion is expanded or not by default",
      (state) => {
        CypressMountWithProviders(
          <AccordionComponent defaultExpanded={state} />
        );

        accordionTitleContainer()
          .should("have.attr", "aria-expanded", state)
          .and("be.visible");
      }
    );

    it.each([
      ["true", "be.visible"],
      ["false", "be.visible"],
    ])("should check Accordion is expanded or not", (state, visibility) => {
      CypressMountWithProviders(<AccordionComponent expanded={state} />);

      accordionTitleContainer()
        .should("have.attr", "aria-expanded", state)
        .and(visibility);
    });

    it.each([
      ["white", "rgb(255, 255, 255)", "be.visible"],
      ["transparent", "rgba(0, 0, 0, 0)", "be.visible"],
    ])("should check Accordion scheme is %s", (scheme, colour) => {
      CypressMountWithProviders(<AccordionComponent scheme={scheme} />);

      accordion().should("have.css", "background-color", colour);
    });

    it.each(accWidths)("should check Accordion width is %s", (widths) => {
      CypressMountWithProviders(<AccordionComponent width={widths} />);

      accordion().should("have.css", "width").and("equal", widths);
    });

    it("should verify Accordion has an error message in the tooltip", () => {
      CypressMountWithProviders(<AccordionGroupWithError />);

      accordionIcon().eq(0).click();

      accordionIcon()
        .should("have.attr", "data-element", "error")
        .and("have.attr", "type", "error");
    });

    it("should verify AccordionRow has a warning message in the tooltip", () => {
      CypressMountWithProviders(<AccordionGroupWithWarning />);

      accordionIcon().eq(0).click();

      accordionIcon()
        .should("have.attr", "data-element", "warning")
        .and("have.attr", "type", "warning");
    });

    it("should verify AccordionRow has an info message in the tooltip", () => {
      CypressMountWithProviders(<AccordionGroupWithInfo />);

      accordionIcon().eq(0).click();

      accordionIcon()
        .should("have.attr", "data-element", "info")
        .and("have.attr", "type", "info");
    });

    it.each([[100], [200], [300]])(
      "should check accordion heading is a button with width %spx",
      (widths) => {
        CypressMountWithProviders(
          <AccordionComponent
            title="Button"
            buttonHeading
            buttonWidth={widths}
          />
        );

        accordionTitleContainer()
          .should("have.css", "width")
          .and("contain", widths);
      }
    );

    it("should verify accordion title changes when accordion is opened", () => {
      CypressMountWithProviders(
        <AccordionComponent buttonHeading title="Closed" openTitle="Open" />
      );

      accordionTitleContainer().should("contain.text", "Closed");

      accordionIcon().eq(0).click();

      accordionTitleContainer().should("contain.text", "Open");
    });
  });

  describe("should render Accordion Grouped component", () => {
    it("should move through all grouped accordions using ArrowDown key and check focus", () => {
      CypressMountWithProviders(<AccordionGroupComponent />);

      accordionTitleContainer().eq(0).focus();
      accordionTitleContainerByPosition(0)
        .parent()
        .then(($el) => {
          checkGoldenOutline($el);
        })
        .and("be.visible");

      accordionTitleContainer().eq(0).trigger("keydown", keyCode("downarrow"));
      accordionTitleContainerByPosition(1)
        .parent()
        .then(($el) => {
          checkGoldenOutline($el);
        })
        .and("be.visible");

      accordionTitleContainer().eq(1).trigger("keydown", keyCode("downarrow"));
      accordionTitleContainerByPosition(2)
        .parent()
        .then(($el) => {
          checkGoldenOutline($el);
        })
        .and("be.visible");
    });

    it("should move to the last grouped accordion using End key and check it is focused", () => {
      CypressMountWithProviders(<AccordionGroupComponent />);

      accordionTitleContainer().eq(0).focus();

      accordionTitleContainer().eq(0).trigger("keydown", keyCode("End"));

      accordionTitleContainerByPosition(2)
        .parent()
        .then(($el) => {
          checkGoldenOutline($el);
        })
        .and("be.visible");
    });

    it("should move to the first grouped accordion using Home key and check it is focused", () => {
      CypressMountWithProviders(<AccordionGroupComponent />);

      accordionTitleContainer().eq(2).focus();

      accordionTitleContainer().eq(2).trigger("keydown", keyCode("Home"));

      accordionTitleContainerByPosition(0)
        .parent()
        .then(($el) => {
          checkGoldenOutline($el);
        })
        .and("be.visible");
    });
  });

  describe("should change content height when children change", () => {
    it("should have proper height", () => {
      CypressMountWithProviders(<DynamicContent />);
      accordionContent().parent().should("have.css", "height", "78px");
      getDataElementByValue(ACCORDION_ADD_CONTENT).click();
      accordionContent().parent().should("have.css", "height", "96px");
      getDataElementByValue(ACCORDION_ADD_CONTENT).click();
      accordionContent().parent().should("have.css", "height", "114px");
      getDataElementByValue(ACCORDION_REMOVE_CONTENT).click();
      accordionContent().parent().should("have.css", "height", "96px");
      getDataElementByValue(ACCORDION_REMOVE_CONTENT).click();
      accordionContent().parent().should("have.css", "height", "78px");
    });
  });
});
