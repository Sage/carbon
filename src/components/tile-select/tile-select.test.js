import React from "react";
import { TileSelect, TileSelectGroup } from ".";
import Pill from "../pill/pill.component";
import Image from "../image/image.component";
import Button from "../button/button.component";
import Icon from "../icon/icon.component";
import Box from "../box/box.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";

import {
  tileSelectDataComponent,
  titleElement,
  subtitleElement,
  descElement,
  inputElement,
  legendStyleComponent,
} from "../../../cypress/locators/tileSelect/index";

import {
  getComponent,
  getElement,
  getDataElementByValue,
} from "../../../cypress/locators/index";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const TileSelectComponent = ({ multiSelect, ...props }) => {
  const [value, setValue] = React.useState(null);
  return (
    <TileSelectGroup
      multiSelect={multiSelect}
      name="Tile Select"
      value={value}
      legend="Tile Select"
      description="Pick one of the available options"
      checked={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <TileSelect
        value="1"
        id="1"
        aria-label="1"
        title="Title"
        subtitle="Subtitle"
        description="Short and descriptive description"
        checked={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
    </TileSelectGroup>
  );
};

const MultiTileSelectGroupComponent = ({ ...props }) => {
  const [value1, setValue1] = React.useState(false);
  const [value2, setValue2] = React.useState(false);
  const [value3, setValue3] = React.useState(false);
  const [value4, setValue4] = React.useState(false);
  return (
    <TileSelectGroup legend="Tile Select" {...props}>
      <TileSelect
        value="1"
        name="multi-1"
        id="multi-1"
        aria-label="multi-1"
        title="Title"
        subtitle="Subtitle"
        description="Short and descriptive description"
        checked={value1}
        onChange={(e) => setValue1(e.target.checked)}
      />
      <TileSelect
        value="2"
        name="multi-2"
        id="multi-2"
        aria-label="multi-2"
        subtitle="Subtitle"
        titleAdornment={<Pill>Message</Pill>}
        description="Short and descriptive description"
        checked={value2}
        onChange={(e) => setValue2(e.target.checked)}
      />
      <TileSelect
        value="3"
        name="multi-3"
        id="multi-3"
        aria-label="multi-3"
        disabled
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
            tooltipVisible={false}
          />
        }
        description="Short and descriptive description"
        checked={value3}
        onChange={(e) => setValue3(e.target.checked)}
      />
      <TileSelect
        value="4"
        name="multi-4"
        id="multi-4"
        aria-label="multi-4"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
          />
        }
        description="Short and descriptive description"
        checked={value4}
        onChange={(e) => setValue4(e.target.checked)}
      />
    </TileSelectGroup>
  );
};

const AccordionTileSelectComponent = ({ ...props }) => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [expanded, setExpanded] = React.useState(true);
  const handleChange = (e) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };
  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title"
      subtitle="Subtitle"
      description="Short and descriptive description"
      checked={isChecked}
      onChange={handleChange}
      prefixAdornment={<Image height="40px" width="40px" />}
      accordionContent={
        <Box display="flex" flexWrap="wrap">
          <Box flexGrow="1" pr={1}>
            <Box
              width="100%"
              height="100px"
              bg="primary"
              display="inline-block"
            />
          </Box>
          <Box flexGrow="1" pl={1}>
            <Box
              width="100%"
              height="100px"
              bg="primary"
              display="inline-block"
            />
          </Box>
        </Box>
      }
      accordionControl={(controlId, contentId) => (
        <Button
          buttonType="tertiary"
          iconPosition="before"
          iconType="chevron_down"
          data-element="accordion-button"
          onClick={() => setExpanded((expandedState) => !expandedState)}
          px={1}
          mt={2}
          aria-controls={contentId}
          id={controlId}
        >
          {expanded ? "Close" : "Open"} accordion
        </Button>
      )}
      accordionExpanded={expanded}
      setAccordionExpanded={setExpanded}
      {...props}
    />
  );
};

const ActionButtonAdornment = ({ ...props }) => {
  const [value, setValue] = React.useState(null);
  return (
    <TileSelectGroup
      name="Tile Select"
      value={value}
      legend="Tile Select"
      description="Pick one of the available options"
      onChange={(e) => setValue(e.target.value)}
    >
      <TileSelect
        value="2"
        id="2"
        aria-label="2"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
          />
        }
        description="Short and descriptive description"
        customActionButton={(onClick) => (
          <Button
            onClick={onClick}
            buttonType="tertiary"
            type="button"
            px={1}
            size="small"
            destructive
            disabled
          >
            Remove
          </Button>
        )}
        actionButtonAdornment={
          <Icon
            type="info"
            tooltipMessage="This tile cannot be removed at this time"
          />
        }
        {...props}
      />
    </TileSelectGroup>
  );
};

const TileSelectGroupComponent = ({ ...props }) => {
  const [value, setValue] = React.useState(null);
  return (
    <TileSelectGroup
      name="Tile Select"
      value={value}
      legend="Tile Select"
      description="Pick one of the available options"
      checked={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    >
      <TileSelect
        value="1"
        id="1"
        aria-label="1"
        title="Title"
        subtitle="Subtitle"
        description="Short and descriptive description"
        checked={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <TileSelect
        value="2"
        id="2"
        aria-label="2"
        title="Title1"
        subtitle="Subtitle1"
        description="Short and descriptive description1"
        checked={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </TileSelectGroup>
  );
};

context("Tests for TileSelect component", () => {
  describe("check props for TileSelect component", () => {
    it.each(testData)(
      "should check title as %s for TileSelect component",
      (title) => {
        CypressMountWithProviders(<TileSelectComponent title={title} />);
        titleElement().should("have.text", title);
      }
    );

    it.each(["add", "info"])(
      "should check titleAdornment iconType as %s for TileSelect component",
      (iconType) => {
        CypressMountWithProviders(
          <TileSelectComponent titleAdornment={<Icon type={iconType} />} />
        );
        getComponent("icon")
          .should("have.attr", "type", iconType)
          .and("be.visible");
      }
    );

    it.each(testData)(
      "should check subtitle as %s for TileSelect component",
      (subtitle) => {
        CypressMountWithProviders(<TileSelectComponent subtitle={subtitle} />);
        subtitleElement().should("have.text", subtitle);
      }
    );

    it.each(testData)(
      "should check description as %s for TileSelect component",
      (description) => {
        CypressMountWithProviders(
          <TileSelectComponent description={description} />
        );
        descElement().should("have.text", description);
      }
    );

    it("p element should be rendered when a description is passed to TileSelectGroup component", () => {
      CypressMountWithProviders(
        <MultiTileSelectGroupComponent description="foo" />
      );
      getDataElementByValue("tile-select-group-description")
        .should("exist")
        .and("be.visible");
    });

    it("p element should not be rendered when no description is passed to TileSelectGroup component", () => {
      CypressMountWithProviders(<MultiTileSelectGroupComponent />);
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
        CypressMountWithProviders(<TileSelectComponent disabled={disabled} />);
        inputElement().should("have.css", "border-color", borderColor);
      }
    );

    it.each(["1", "2", "3", "4"])(
      "should check value as %s for TileSelect component",
      (value) => {
        CypressMountWithProviders(<TileSelectComponent value={value} />);
        inputElement().should("have.attr", "value", value);
      }
    );

    it.each(testData)(
      "should check id as %s for TileSelect component",
      (id) => {
        CypressMountWithProviders(<TileSelectComponent id={id} />);
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
          <TileSelectComponent className={className} />
        );
        tileSelectDataComponent().should("have.class", className);
      }
    );

    it("should check footer for TileSelect component", () => {
      CypressMountWithProviders(
        <TileSelectComponent
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
          <TileSelectComponent
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
        <TileSelectComponent
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
          <TileSelectComponent multiSelect type={type} />
        );
        inputElement().should("have.attr", "type", type);
      }
    );

    it("should check multiSelect for TileSelect component", () => {
      CypressMountWithProviders(<MultiTileSelectGroupComponent multiSelect />);
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
        <AccordionTileSelectComponent accordionExpanded={boolV} />
      );
      getElement("tile-select-accordion-content").parent().should(state);
    }
  );

  it.each(testData)(
    "should check accordionContent as %s for TileSelect component",
    (accordionContent) => {
      CypressMountWithProviders(
        <AccordionTileSelectComponent accordionContent={accordionContent} />
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
      <ActionButtonAdornment
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
        <ActionButtonAdornment
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
      CypressMountWithProviders(<TileSelectGroupComponent name={name} />);
      inputElement().should("have.attr", "name", name);
    }
  );

  it.each(testData)(
    "should check legend as %s for TileSelectGroup component",
    (legend) => {
      CypressMountWithProviders(<TileSelectGroupComponent legend={legend} />);
      getElement("legend").should("be.visible").and("have.text", legend);
    }
  );

  it.each(testData)(
    "should check description as %s for TileSelectGroup component",
    (description) => {
      CypressMountWithProviders(
        <TileSelectGroupComponent description={description} />
      );
      legendStyleComponent().should("be.visible");
    }
  );

  it("should check value for TileSelectGroup component", () => {
    CypressMountWithProviders(<TileSelectGroupComponent value="1" />);
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
    CypressMountWithProviders(<TileSelectGroupComponent onChange={callback} />);
    inputElement()
      .eq(0)
      .click()
      .then(() => {
        // eslint-disable-next-line no-unused-expressions
        expect(callback).to.have.been.calledOnce;
      });
  });

  it("should call onBlur callback when a blur event is triggered for TileSelectGroup", () => {
    CypressMountWithProviders(<TileSelectGroupComponent onBlur={callback} />);
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
});
