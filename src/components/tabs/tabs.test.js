import React from "react";
import { Tabs, Tab } from "./tabs.component";
import { tabById, tabContentById } from "../../../cypress/locators/tabs";
import Box from "../box/box.component";
import Icon from "../icon/icon.component";
import Pill from "../pill/pill.component";
import Checkbox from "../checkbox/checkbox.component";
import {
  getDataElementByValue,
  tooltipPreview,
} from "../../../cypress/locators";
import { keyCode } from "../../../cypress/support/helper";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { useJQueryCssValueAndAssert } from "../../../cypress/support/component-helper/common-steps";

const TabsComponent = ({ ...props }) => {
  return (
    <div
      style={{
        padding: "4px",
      }}
    >
      <Tabs align="left" position="top" {...props}>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
          {...props}
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </div>
  );
};

const TabsComponentValidations = ({ ...props }) => {
  const [errors, setErrors] = React.useState({
    one: true,
    two: false,
    three: false,
  });
  const [warnings, setWarnings] = React.useState({
    one: true,
    two: true,
    three: false,
  });
  const [infos, setInfos] = React.useState({
    one: true,
    two: true,
    three: true,
  });
  return (
    <div
      style={{
        padding: "4px",
      }}
    >
      <Tabs align="left" position="top" {...props}>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          <Checkbox
            label="Add error"
            error={errors.one}
            onChange={() => setErrors({ ...errors, one: !errors.one })}
            checked={errors.one}
          />
          <Checkbox
            label="Add warning"
            warning={warnings.one}
            onChange={() => setWarnings({ ...warnings, one: !warnings.one })}
            checked={warnings.one}
          />
          <Checkbox
            label="Add info"
            info={infos.one}
            onChange={() => setInfos({ ...infos, one: !infos.one })}
            checked={infos.one}
          />
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          <Checkbox
            label="Add error"
            error={errors.two}
            onChange={() => setErrors({ ...errors, two: !errors.two })}
          />
          <Checkbox
            label="Add warning"
            warning={warnings.two}
            onChange={() => setWarnings({ ...warnings, two: !warnings.two })}
            checked={warnings.two}
          />
          <Checkbox
            label="Add info"
            info={infos.two}
            onChange={() => setInfos({ ...infos, two: !infos.two })}
            checked={infos.two}
          />
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          <Checkbox
            label="Add error"
            error={errors.three}
            onChange={() => setErrors({ ...errors, three: !errors.three })}
          />
          <Checkbox
            label="Add warning"
            warning={warnings.three}
            onChange={() =>
              setWarnings({ ...warnings, three: !warnings.three })
            }
          />
          <Checkbox
            label="Add info"
            info={infos.three}
            onChange={() => setInfos({ ...infos, three: !infos.three })}
            checked={infos.three}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const TabsComponentValidationsUnregistering = ({ validation }) => {
  const [show, setShow] = React.useState(true);

  return (
    <div
      style={{
        padding: "4px",
      }}
    >
      <button
        data-element="foo-button"
        type="button"
        onClick={() => setShow(false)}
      >
        Hide Tab Child
      </button>
      <Tabs align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          {show && (
            <Checkbox
              label="Add error"
              onChange={() => {}}
              checked
              {...validation}
            />
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

const TabsValidationOverride = () => {
  const [validation, setValidation] = React.useState({
    error: true,
    warning: false,
    info: false,
  });

  const { error, warning, info } = validation;

  return (
    <Tabs
      align="left"
      position="top"
      validationStatusOverride={{
        "tab-1": {
          error: false,
          warning: false,
          info: false,
        },
      }}
    >
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-1"
        title="Tab 1"
        key="tab-1"
      >
        <Checkbox
          label="Add error"
          error={error}
          onChange={() =>
            setValidation((currentState) => ({
              ...currentState,
              error: !currentState.error,
            }))
          }
          checked={error}
        />
        <Checkbox
          label="Add warning"
          warning={warning}
          onChange={() =>
            setValidation((currentState) => ({
              ...currentState,
              warning: !currentState.warning,
            }))
          }
          checked={warning}
        />
        <Checkbox
          label="Add info"
          info={info}
          onChange={() =>
            setValidation((currentState) => ({
              ...currentState,
              info: !currentState.info,
            }))
          }
          checked={info}
        />
      </Tab>
    </Tabs>
  );
};

context("Testing Tabs component", () => {
  describe("should render Tabs component", () => {
    it.each([1, 2, 3, 4, 5])(
      "should verify when tab %s is clicked that tab is visible and content text is displayed",
      (id) => {
        CypressMountWithProviders(<TabsComponent />);

        tabById(id).click();
        tabContentById(id)
          .should("be.visible")
          .and("have.text", `Content for tab ${id}`);
      }
    );

    it("should verify first tab has a link property", () => {
      CypressMountWithProviders(
        <TabsComponent href="https://carbon.sage.com/" />
      );

      tabById(1)
        .should("have.attr", "href", "https://carbon.sage.com/")
        .and("have.attr", "target", "_blank");
    });

    it("should verify Tabs hidden content is not rendered when renderHiddenTabs prop is false", () => {
      CypressMountWithProviders(<TabsComponent renderHiddenTabs={false} />);

      tabContentById(1).should("be.visible");
      tabContentById(2).should("not.exist");
    });

    it.each([5, 4, 3, 2, 1])(
      "should verify correct tab is visible and correct content displayed when tab %s is selected using selectedTabId prop",
      (id) => {
        CypressMountWithProviders(
          <TabsComponent selectedTabId={`tab-${id}`} />
        );

        tabContentById(id)
          .should("be.visible")
          .and("have.text", `Content for tab ${id}`);
      }
    );

    it.each([
      ["right", "have.css", "not.have.css"],
      ["left", "not.have.css", "have.css"],
    ])(
      "should verify Tabs component is %s aligned",
      (alignment, value, startValue) => {
        CypressMountWithProviders(<TabsComponent align={alignment} />);

        tabById(1)
          .parent()
          .should(value, "text-align", alignment)
          .and(value, "justify-content", "flex-end")
          .and(startValue, "justify-content", "normal");
      }
    );

    it.each([
      ["top", "row", 40],
      ["left", "column", 200],
    ])("should verify Tabs component is %s positioned", (pos, flex, height) => {
      CypressMountWithProviders(<TabsComponent position={pos} />);

      tabById(1)
        .parent()
        .should("have.css", "flex-direction", flex)
        .then(($el) => {
          useJQueryCssValueAndAssert($el, "height", height);
        });
    });

    it.each([
      ["default", "row", 40, 67],
      ["large", "column", 48, 88],
    ])(
      "should verify Tabs height and width when size is %s",
      (size, flex, height, width) => {
        CypressMountWithProviders(<TabsComponent size={size} />);

        tabById(1).then(($el) => {
          useJQueryCssValueAndAssert($el, "height", height);
          useJQueryCssValueAndAssert($el, "width", width);
        });
      }
    );

    it.each([
      ["extended", true, 1358],
      ["trimmed", false, 333],
    ])(
      "should verify Tabs dividing line is %s when extendedLine prop is %s",
      (state, bool, width) => {
        CypressMountWithProviders(<TabsComponent extendedLine={bool} />);

        tabById(1)
          .parent()
          .then(($el) => {
            expect(parseInt($el.css("width"))).to.be.within(
              width - 3,
              width + 3
            );
          });
      }
    );

    it.each([
      ["off", "none", "none", "none", "none"],
      ["on", "solid", "none", "solid", "solid"],
      ["no sides", "solid", "none", "none", "none"],
    ])(
      "should verify Tabs borders are set to %s when positioned on top",
      (state, top, bottom, right, left) => {
        CypressMountWithProviders(<TabsComponent borders={state} />);

        tabById(1)
          .children()
          .should("have.css", "border-top-style", top)
          .and("have.css", "border-bottom-style", bottom)
          .and("have.css", "border-right-style", right)
          .and("have.css", "border-left-style", left);
      }
    );

    it.each([
      ["off", "none", "none", "none", "none"],
      ["on", "solid", "solid", "none", "solid"],
      ["no sides", "solid", "solid", "none", "none"],
    ])(
      "should verify Tabs borders are set to %s when positioned on left",
      (state, top, bottom, right, left) => {
        CypressMountWithProviders(
          <TabsComponent position="left" borders={state} />
        );

        tabById(1)
          .children()
          .should("have.css", "border-top-style", top)
          .and("have.css", "border-bottom-style", bottom)
          .and("have.css", "border-right-style", right)
          .and("have.css", "border-left-style", left);
      }
    );

    it("should verify Tabs header width is set by headerWidth prop", () => {
      CypressMountWithProviders(
        <TabsComponent headerWidth="440px" align="left" position="left" />
      );

      tabById(1)
        .parent()
        .parent()
        .then(($el) => {
          useJQueryCssValueAndAssert($el, "width", 440);
        });
    });

    it.each([
      ["default", "rgb(255, 255, 255)"],
      ["alternate", "rgb(204, 214, 219)"],
    ])("should verify Tabs variant prop", (variant, backColor) => {
      CypressMountWithProviders(<TabsComponent variant={variant} />);

      tabById(1).should("have.css", "background-color", backColor);
    });

    it.each([
      CHARACTERS.STANDARD,
      CHARACTERS.DIACRITICS,
      CHARACTERS.SPECIALCHARACTERS,
    ])("should verify first tabs title is %s", (text) => {
      CypressMountWithProviders(<TabsComponent title={text} />);

      tabById(1).should("have.text", text);
    });

    it("should verify tabId is cypress_data-tab", () => {
      CypressMountWithProviders(<TabsComponent tabId={CHARACTERS.STANDARD} />);

      getDataElementByValue("select-tab").should(
        "have.attr",
        "id",
        `${CHARACTERS.STANDARD}-tab`
      );
    });

    it("should verify Tabs can be customised with customLayout prop", () => {
      CypressMountWithProviders(
        <TabsComponent
          position="left"
          customLayout={
            <Box
              width="calc(100% - 30px)"
              display="flex"
              flexDirection="column"
              padding="4px 4px 22px 14px"
            >
              <Box display="flex" justifyContent="flex-end">
                <Icon type="settings" color="primary" />
                <Icon type="home" />
              </Box>
              <Box display="flex" justifyContent="flex-start">
                Tab 1
              </Box>
            </Box>
          }
        />
      );

      tabById(1)
        .children()
        .children()
        .children()
        .children()
        .children()
        .should("have.attr", "data-component", "icon");
      tabById(1).children().children().children(1).should("have.text", "Tab 1");
    });

    it("should verify Tabs can be displayed with title siblings", () => {
      CypressMountWithProviders(
        <TabsComponent
          siblings={[
            <Pill size="S" pillRole="status" fill>
              12
            </Pill>,
          ]}
        />
      );

      tabById(1)
        .children()
        .children(1)
        .children()
        .should("have.attr", "data-component", "pill")
        .and("have.text", "12");
    });

    it.each([
      ["before", 0],
      ["after", 1],
    ])(
      "should verify Tabs title can be displayed %s siblings",
      (pos, child) => {
        CypressMountWithProviders(
          <TabsComponent
            titlePosition={pos}
            siblings={[
              <Pill size="S" pillRole="status" fill>
                12
              </Pill>,
            ]}
          />
        );

        tabById(1)
          .children()
          .children(child)
          .children()
          .should("have.attr", "data-component", "pill")
          .and("have.text", "12");
      }
    );

    it.each([
      [1, "error"],
      [2, "warning"],
      [3, "info"],
    ])(
      "should verify that tab %s has a %s icon displayed",
      (id, validation) => {
        CypressMountWithProviders(<TabsComponentValidations />);

        tabById(id)
          .children()
          .children(1)
          .children()
          .children()
          .should("have.attr", "data-component", "icon")
          .and("have.attr", "type", validation);
      }
    );

    it.each([
      [1, "error"],
      [2, "warning"],
      [3, "info"],
    ])(
      "should verify when tab %s is hovered over that %s message is displayed",
      (id, validationMessage) => {
        CypressMountWithProviders(<TabsComponentValidations />);

        tabById(id)
          .trigger("mouseover")
          .then(() => {
            tooltipPreview().should("have.text", validationMessage);
          });
      }
    );

    it.each(["error", "warning", "info"])(
      "should no longer report the any validation failures of children no longer mounted",
      (type) => {
        const validation = { [type]: true };

        CypressMountWithProviders(
          <TabsComponentValidationsUnregistering validation={validation} />
        );

        getDataElementByValue("foo-button").click();

        tabById(1).children().children().should("not.exist");
      }
    );

    it("should verify Tabs validation status is overridden", () => {
      CypressMountWithProviders(<TabsValidationOverride />);

      tabById(1).children().children().should("not.exist");
      tabById(1)
        .children()
        .should("have.css", "outline-color", "rgba(0, 0, 0, 0.9)");
    });
  });

  describe("check events for Tabs component", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onTabChange callback when a click event is triggered", () => {
      CypressMountWithProviders(<TabsComponent onTabChange={callback} />);

      tabById(2)
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onTabChange callback when right arrow key event is triggered", () => {
      CypressMountWithProviders(<TabsComponent onTabChange={callback} />);

      tabById(1)
        .trigger("keydown", keyCode("rightarrow"))
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onTabChange callback when left arrow key event is triggered", () => {
      CypressMountWithProviders(<TabsComponent onTabChange={callback} />);

      tabById(2)
        .trigger("keydown", keyCode("leftarrow"))
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });
});
