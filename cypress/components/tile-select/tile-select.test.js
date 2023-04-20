import React from "react";
import {
  TileSelect,
  TileSelectGroup,
} from "../../../src/components/tile-select";
import * as testStories from "../../../src/components/tile-select/tile-select-test.stories";
import * as stories from "../../../src/components/tile-select/tile-select.stories";
import Pill from "../../../src/components/pill/pill.component";
import Button from "../../../src/components/button/button.component";
import Icon from "../../../src/components/icon/icon.component";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { CHARACTERS } from "../../support/component-helper/constants";

import {
  tileSelectDataComponent,
  titleElement,
  subtitleElement,
  descElement,
  inputElement,
  legendStyleComponent,
} from "../../locators/tileSelect/index";

import {
  getComponent,
  getElement,
  getDataElementByValue,
} from "../../locators/index";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

context("Tests for TileSelect component", () => {
  describe("check props for TileSelect component", () => {
    it.each(testData)(
      "should check title as %s for TileSelect component",
      (title) => {
        CypressMountWithProviders(
          <testStories.TileSelectComponent title={title} />
        );
        titleElement().should("have.text", title);
      }
    );

    it.each(["add", "info"])(
      "should check titleAdornment iconType as %s for TileSelect component",
      (iconType) => {
        CypressMountWithProviders(
          <testStories.TileSelectComponent
            titleAdornment={<Icon type={iconType} />}
          />
        );
        getComponent("icon")
          .should("have.attr", "type", iconType)
          .and("be.visible");
      }
    );

    it.each(testData)(
      "should check subtitle as %s for TileSelect component",
      (subtitle) => {
        CypressMountWithProviders(
          <testStories.TileSelectComponent subtitle={subtitle} />
        );
        subtitleElement().should("have.text", subtitle);
      }
    );

    it.each(testData)(
      "should check description as %s for TileSelect component",
      (description) => {
        CypressMountWithProviders(
          <testStories.TileSelectComponent description={description} />
        );
        descElement().should("have.text", description);
      }
    );

    it("p element should be rendered when a description is passed to TileSelectGroup component", () => {
      CypressMountWithProviders(
        <testStories.MultiTileSelectGroupComponent description="foo" />
      );
      getDataElementByValue("tile-select-group-description")
        .should("exist")
        .and("be.visible");
    });

    it("p element should not be rendered when no description is passed to TileSelectGroup component", () => {
      CypressMountWithProviders(<testStories.MultiTileSelectGroupComponent />);
      getDataElementByValue("tile-select-group-description").should(
        "not.exist"
      );
    });

    it.each([
      [false, "rgba(0, 0, 0, 0.9)"],
      [true, "rgba(0, 0, 0, 0.3)"],
    ])(
      "should check when TileSelect component disabled prop set as %s",
      (disabled, borderColor) => {
        CypressMountWithProviders(
          <testStories.TileSelectComponent disabled={disabled} />
        );
        inputElement().should("have.css", "border-color", borderColor);
      }
    );

    it.each(["1", "2", "3", "4"])(
      "should check value as %s for TileSelect component",
      (value) => {
        CypressMountWithProviders(
          <testStories.TileSelectComponent value={value} />
        );
        inputElement().should("have.attr", "value", value);
      }
    );

    it.each(testData)(
      "should check id as %s for TileSelect component",
      (id) => {
        CypressMountWithProviders(<testStories.TileSelectComponent id={id} />);
        inputElement().should("have.attr", "id", id);
      }
    );

    it.each(testData)(
      "should check name as %s for TileSelect component",
      (name) => {
        CypressMountWithProviders(<TileSelect name={name} />);
        inputElement().should("have.attr", "name", name);
      }
    );

    it("should check TileSelect component when tile is selected", () => {
      CypressMountWithProviders(<TileSelect checked />);

      inputElement().should("have.attr", "aria-checked", "true");
    });

    it("should check TileSelect component when tile is not selected", () => {
      CypressMountWithProviders(<TileSelect checked={false} />);

      inputElement().should("have.attr", "aria-checked", "false");
    });

    it.each(testData)(
      "should check className as %s for TileSelect component",
      (className) => {
        CypressMountWithProviders(
          <testStories.TileSelectComponent className={className} />
        );
        tileSelectDataComponent().should("have.class", className);
      }
    );

    it("should check footer for TileSelect component", () => {
      CypressMountWithProviders(
        <testStories.TileSelectComponent
          footer={
            <Button
              ml={1}
              buttonType="tertiary"
              iconPosition="after"
              iconType="home"
            >
              Footer Button
            </Button>
          }
        />
      );
      getComponent("button")
        .should("be.visible")
        .and("have.text", "Footer Button");
    });

    it.each(testData)(
      "should check prefixAdornment as %s for TileSelect component",
      (PrefixAdornment) => {
        CypressMountWithProviders(
          <testStories.TileSelectComponent
            prefixAdornment={
              <>
                <Pill fill mr={1} mb="4px">
                  {PrefixAdornment}
                </Pill>{" "}
              </>
            }
          />
        );
        getComponent("pill")
          .should("have.text", PrefixAdornment)
          .and("be.visible");
      }
    );

    it("should check additionalInformation for TileSelect component", () => {
      CypressMountWithProviders(
        <testStories.TileSelectComponent
          additionalInformation={
            <>
              <Pill fill mr={1} mb="4px">
                Further information
              </Pill>
            </>
          }
        />
      );
      getComponent("pill")
        .should("be.visible")
        .and("have.text", "Further information");
    });
  });

  describe("check props for MultiTileSelect component", () => {
    it.each(["radio", "checkbox"])(
      "should check type as %s for TileSelect component",
      (type) => {
        CypressMountWithProviders(
          <testStories.TileSelectComponent multiSelect type={type} />
        );
        inputElement().should("have.attr", "type", type);
      }
    );

    it("should check multiSelect for TileSelect component", () => {
      CypressMountWithProviders(
        <testStories.MultiTileSelectGroupComponent multiSelect />
      );
      inputElement().eq(0).click().and("have.attr", "aria-checked", "true");

      inputElement().eq(1).click().and("have.attr", "aria-checked", "true");

      inputElement().eq(2).and("have.attr", "aria-checked", "false");

      inputElement().eq(3).and("have.attr", "aria-checked", "false");
    });
  });

  it.each([
    [false, "not.be.visible"],
    [true, "be.visible"],
  ])(
    "should check when accordionExpanded is set as %s for TileSelect component",
    (boolV, state) => {
      CypressMountWithProviders(
        <testStories.AccordionTileSelectComponent accordionExpanded={boolV} />
      );
      getElement("tile-select-accordion-content").parent().should(state);
    }
  );

  it.each(testData)(
    "should check accordionContent as %s for TileSelect component",
    (accordionContent) => {
      CypressMountWithProviders(
        <testStories.AccordionTileSelectComponent
          accordionContent={accordionContent}
        />
      );
      getElement("tile-select-accordion-content").should(
        "have.text",
        accordionContent
      );
    }
  );
});

describe("check props for ActionButtonAdornment", () => {
  it("should check customActionButton for TileSelect component", () => {
    CypressMountWithProviders(
      <testStories.ActionButtonAdornment
        customActionButton={(onClick) => (
          <Button onClick={onClick}>tile select button</Button>
        )}
      />
    );
    getComponent("button")
      .should("be.visible")
      .and("have.text", "tile select button");
  });

  it.each(["add", "info"])(
    "should check actionButtonAdornment iconType as %s for TileSelect component",
    (iconType) => {
      CypressMountWithProviders(
        <testStories.ActionButtonAdornment
          actionButtonAdornment={
            <Icon
              type={iconType}
              tooltipMessage="This tile cannot be reactivated at this time"
            />
          }
        />
      );
      getComponent("icon")
        .should("have.attr", "type", iconType)
        .and("be.visible");
    }
  );
});

describe("check props for TileSelectGroup component", () => {
  it.each(testData)(
    "should check name as %s for TileSelect component",
    (name) => {
      CypressMountWithProviders(
        <testStories.TileSelectGroupComponent name={name} />
      );
      inputElement().should("have.attr", "name", name);
    }
  );

  it.each(testData)(
    "should check legend as %s for TileSelectGroup component",
    (legend) => {
      CypressMountWithProviders(
        <testStories.TileSelectGroupComponent legend={legend} />
      );
      getElement("legend").should("be.visible").and("have.text", legend);
    }
  );

  it.each(testData)(
    "should check description as %s for TileSelectGroup component",
    (description) => {
      CypressMountWithProviders(
        <testStories.TileSelectGroupComponent description={description} />
      );
      legendStyleComponent().should("be.visible");
    }
  );

  it("should check value for TileSelectGroup component", () => {
    CypressMountWithProviders(
      <testStories.TileSelectGroupComponent value="1" />
    );
    inputElement().should("have.attr", "value", "1");
  });

  it.each(testData)(
    "should check children as %s for TileSelectGroup component",
    (characters) => {
      CypressMountWithProviders(
        <TileSelectGroup>
          <Pill fill mr={1} mb="4px">
            {characters}
          </Pill>
        </TileSelectGroup>
      );
      getComponent("pill").should("be.visible");
    }
  );
});

describe("should render TileSelect component and check events", () => {
  let callback;

  beforeEach(() => {
    callback = cy.stub();
  });

  it("should call onChange callback when a click event is triggered for TileSelectGroup", () => {
    CypressMountWithProviders(
      <testStories.TileSelectGroupComponent onChange={callback} />
    );
    inputElement()
      .eq(0)
      .click()
      .then(() => {
        // eslint-disable-next-line no-unused-expressions
        expect(callback).to.have.been.calledOnce;
      });
  });

  it("should call onBlur callback when a blur event is triggered for TileSelectGroup", () => {
    CypressMountWithProviders(
      <testStories.TileSelectGroupComponent onBlur={callback} />
    );
    inputElement()
      .eq(0)
      .focus()
      .blur()
      .then(() => {
        // eslint-disable-next-line no-unused-expressions
        expect(callback).to.have.been.calledOnce;
      });
  });

  it("should call onFocus callback when a focus event is triggered for TileSelect component", () => {
    CypressMountWithProviders(<TileSelect onFocus={callback} />);
    inputElement()
      .focus()
      .then(() => {
        // eslint-disable-next-line no-unused-expressions
        expect(callback).to.have.been.calledOnce;
      });
  });

  it("should call onChange callback when a click event is triggered for TileSelect component", () => {
    CypressMountWithProviders(<TileSelect onChange={callback} />);
    inputElement()
      .eq(0)
      .click()
      .then(() => {
        // eslint-disable-next-line no-unused-expressions
        expect(callback).to.have.been.calledOnce;
      });
  });

  it("should call onBlur callback when a blur event is triggered for TileSelect component", () => {
    CypressMountWithProviders(<TileSelect onBlur={callback} />);

    inputElement()
      .eq(0)
      .focus()
      .blur()
      .then(() => {
        // eslint-disable-next-line no-unused-expressions
        expect(callback).to.have.been.calledOnce;
      });
  });

  describe("Accessibility tests for Accordion", () => {
    // FE-4683
    it.skip("should pass accessibility tests for Default story", () => {
      CypressMountWithProviders(<stories.Default />);

      cy.checkAccessibility();
    });

    // FE-4683
    it.skip("should pass accessibility tests for MultiSelect story", () => {
      CypressMountWithProviders(<stories.MultiSelect />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for SingleTile story", () => {
      CypressMountWithProviders(<stories.SingleTile />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for WithAFooter story", () => {
      CypressMountWithProviders(<stories.WithAFooter />);

      cy.checkAccessibility();
    });

    // FE-4683
    it.skip("should pass accessibility tests for WithAPrefixAdornment story", () => {
      CypressMountWithProviders(<stories.WithAPrefixAdornment />);

      cy.checkAccessibility();
    });

    // FE-4683
    it.skip("should pass accessibility tests for WithAccordionFooter story", () => {
      CypressMountWithProviders(<stories.WithAccordionFooter />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for WithActionButtonAdornment story", () => {
      CypressMountWithProviders(<stories.WithActionButtonAdornment />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for WithAdditionalInformation story", () => {
      CypressMountWithProviders(<stories.WithAdditionalInformation />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for WithCustomActionButton story", () => {
      CypressMountWithProviders(<stories.WithCustomActionButton />);

      cy.checkAccessibility();
    });

    // FE-4683
    it.skip("should pass accessibility tests for WithCustomSpacing story", () => {
      CypressMountWithProviders(<stories.WithCustomSpacing />);

      cy.checkAccessibility();
    });
  });
});
