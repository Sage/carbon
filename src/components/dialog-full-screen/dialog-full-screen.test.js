import * as React from "react";
import PropTypes from "prop-types";
import DialogFullScreen from "./dialog-full-screen.component";
import Dialog from "../dialog/dialog.component";
import Button from "../button";
import Textbox from "../textbox";
import Pill from "../pill";
import Form from "../form";
import Box from "../box";
import CarbonProvider from "../carbon-provider";
import {
  dialogTitle,
  dialogSubtitle,
  alertDialogPreview as dialogPreview,
} from "../../../cypress/locators/dialog";
import {
  dialogFullScreenPreview,
  dialogFullScreenChildren,
} from "../../../cypress/locators/dialog-full-screen";
import {
  closeIconButton,
  openDialogByName,
  portal,
  getDataElementByValue,
  tooltipPreview,
  getComponent,
  getElement,
} from "../../../cypress/locators/index";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { contentElement } from "../../../cypress/locators/content/index";
import { keyCode } from "../../../cypress/support/helper";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testAria = "cypress_aria";
const mainDialogTitle = "Main Dialog";
const nestedDialogTitle = "Nested Dialog";
const DialogFullScreenComponent = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const ref = React.useRef();
  return (
    <>
      <DialogFullScreen
        open={isOpen}
        showCloseIcon
        onCancel={() => setIsOpen(false)}
        focusFirstElement={ref}
        {...props}
      >
        <Button onClick={() => setIsOpen(false)}>Not focused</Button>
        <Button forwardRef={ref} onClick={() => setIsOpen(false)}>
          This should be focused first now
        </Button>

        <Textbox label="Textbox1" value="Textbox1" />
        <Textbox label="Textbox2" value="Textbox2" />
        <Textbox label="Textbox3" value="Textbox3" />
        <Form>{children}</Form>
      </DialogFullScreen>
    </>
  );
};

const NestedDialog = () => {
  const [mainDialogOpen, setMainDialogOpen] = React.useState(false);
  const [nestedDialogOpen, setNestedDialogOpen] = React.useState(false);

  const handleMainDialogOpen = () => {
    setMainDialogOpen(true);
  };

  const handleMainDialogCancel = () => {
    setMainDialogOpen(false);
  };

  const handleNestedDialogOpen = () => {
    setNestedDialogOpen(true);
  };

  const handleNestedDialogCancel = () => {
    setNestedDialogOpen(false);
  };

  return (
    <>
      <Button onClick={handleMainDialogOpen}>Open Main Dialog</Button>
      <DialogFullScreen
        open={mainDialogOpen}
        onCancel={handleMainDialogCancel}
        title={mainDialogTitle}
      >
        <Button onClick={handleNestedDialogOpen}>Open Nested Dialog</Button>
        <Dialog
          open={nestedDialogOpen}
          onCancel={handleNestedDialogCancel}
          title={nestedDialogTitle}
        >
          Nested Dialog Content
        </Dialog>
      </DialogFullScreen>
    </>
  );
};

const MultipleDialogsInDifferentProviders = () => {
  const [isModal1Open, setIsModal1Open] = React.useState(false);
  const [isModal2Open, setIsModal2Open] = React.useState(false);
  return (
    <>
      <CarbonProvider>
        <Box>
          <Button onClick={() => setIsModal1Open(true)}>Open Modal 1</Button>
          <DialogFullScreen
            title="Full Screen Dialog"
            open={isModal1Open}
            onCancel={() => setIsModal1Open(false)}
          >
            This is Modal 1
            <Button onClick={() => setIsModal2Open(true)}>Open Modal 2</Button>
          </DialogFullScreen>
        </Box>
      </CarbonProvider>
      <CarbonProvider>
        <Box>
          <Dialog open={isModal2Open} onCancel={() => setIsModal2Open(false)}>
            This is Modal 2
          </Dialog>
        </Box>
      </CarbonProvider>
    </>
  );
};

const DialogFullScreenWithHeaderChildren = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const HeaderChildren = (
    <div
      style={{
        margin: `$min-width: 568px 0 26px`,
      }}
    >
      <Pill as="help" fill>
        A pill
      </Pill>
      <Pill as="info" fill ml={2} mr={1}>
        Another pill
      </Pill>
    </div>
  );
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open DialogFullScreen</Button>
      <DialogFullScreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="An example of a long header"
        subtitle="Subtitle"
        headerChildren={HeaderChildren}
      >
        <Form
          stickyFooter
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <div>
            This is an example of a full screen Dialog with a Form as content
          </div>
          <Textbox label="First Name" />
          <Textbox label="Middle Name" />
          <Textbox label="Surname" />
          <Textbox label="Birth Place" />
          <Textbox label="Favourite Colour" />
          <Textbox label="Address" />
        </Form>
      </DialogFullScreen>
    </>
  );
};

DialogFullScreenComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

context("Testing DialogFullScreen component", () => {
  describe("render DialogFullScreen component and check properties", () => {
    it("should close Dialog Full Screen component after click on closeIcon", () => {
      CypressMountWithProviders(<DialogFullScreenComponent showCloseIcon />);

      closeIconButton().should("exist");
      dialogFullScreenPreview().should("exist");
      closeIconButton().click();
      dialogFullScreenPreview().should("not.exist");
    });

    it.each(specialCharacters)(
      "should render DialogFullScreen using %s as title",
      (title) => {
        CypressMountWithProviders(<DialogFullScreenComponent title={title} />);

        dialogTitle().should("have.text", title);
      }
    );

    it.each(specialCharacters)(
      "should render DialogFullScreen using %s as subtitle",
      (subtitle) => {
        CypressMountWithProviders(
          <DialogFullScreenComponent
            title="Dialog Full Screen Title"
            subtitle={subtitle}
          />
        );

        dialogSubtitle().should("have.text", subtitle);
      }
    );

    it.each(specialCharacters)(
      "should render DialogFullScreen component with %s as a children ",
      (childrenValue) => {
        CypressMountWithProviders(
          <DialogFullScreenComponent>{childrenValue}</DialogFullScreenComponent>
        );

        dialogFullScreenChildren().should("have.text", childrenValue);
      }
    );

    it("should render DialogFullScreen with disabledEscKey prop and not be closed after clicking Escape button", () => {
      CypressMountWithProviders(<DialogFullScreenComponent disableEscKey />);

      dialogFullScreenPreview().should("exist");
      dialogFullScreenPreview().trigger("keyup", keyCode("Esc"));
      dialogFullScreenPreview().should("exist");
    });

    it("should close DialogFullScreen after pressing Escape button", () => {
      CypressMountWithProviders(<DialogFullScreenComponent />);
      dialogFullScreenPreview().should("exist");
      dialogFullScreenPreview().trigger("keyup", keyCode("Esc"));
      dialogFullScreenPreview().should("not.exist");
    });

    it("should call the cancel action after closing the DialogFullScreen", () => {
      const callback = cy.stub();

      CypressMountWithProviders(
        <DialogFullScreenComponent onCancel={callback} />
      );

      closeIconButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should allow to close nested DialogFullScreen and then the main DialogFullScreen window", () => {
      CypressMountWithProviders(<NestedDialog />);

      openDialogByName(`Open ${mainDialogTitle}`).click();

      openDialogByName(`Open ${nestedDialogTitle}`).click();

      dialogPreview().should("exist");

      portal().contains(nestedDialogTitle).should("be.visible");

      dialogFullScreenPreview()
        .contains(mainDialogTitle)
        .should("not.be.visible");

      portal().contains(nestedDialogTitle).trigger("keyup", keyCode("Esc"));

      dialogPreview().should("not.exist");

      dialogFullScreenPreview().contains(mainDialogTitle).should("be.visible");

      dialogFullScreenPreview().trigger("keyup", keyCode("Esc"));

      dialogFullScreenPreview().should("not.exist");
    });

    it("should render nested dialogs with the aria-modal property only set on the top one", () => {
      CypressMountWithProviders(<NestedDialog />);

      openDialogByName(`Open ${mainDialogTitle}`).click();

      getElement("dialog-full-screen")
        .should("have.attr", "aria-modal")
        .and("eq", "true");

      openDialogByName(`Open ${nestedDialogTitle}`).click();

      getElement("dialog-full-screen").should("not.have.attr", "aria-modal");

      getElement("dialog").should("have.attr", "aria-modal").and("eq", "true");
    });

    it("should render nested dialogs with the aria-modal property only set on the top one, even when the dialogs are wrapped in separate CarbonProviders", () => {
      cy.mount(<MultipleDialogsInDifferentProviders />);

      openDialogByName("Open Modal 1").click();

      getElement("dialog-full-screen")
        .should("have.attr", "aria-modal")
        .and("eq", "true");

      openDialogByName("Open Modal 2").click();

      getElement("dialog-full-screen").should("not.have.attr", "aria-modal");

      getElement("dialog").should("have.attr", "aria-modal").and("eq", "true");
    });

    it("should render DialogFullScreen component with aria-describedby", () => {
      CypressMountWithProviders(
        <DialogFullScreenComponent aria-describedby={testAria} />
      );

      dialogFullScreenPreview()
        .should("have.attr", "aria-describedby")
        .and("contain", testAria);
    });

    it("should render DialogFullScreen component with aria-label", () => {
      CypressMountWithProviders(
        <DialogFullScreenComponent aria-label={testAria} />
      );
      dialogFullScreenPreview()
        .should("have.attr", "aria-label")
        .and("contain", testAria);
    });

    it("should render DialogFullScreen component with aria-labelledby", () => {
      CypressMountWithProviders(
        <DialogFullScreenComponent aria-labelledby={testAria} />
      );

      dialogFullScreenPreview()
        .should("have.attr", "aria-labelledby")
        .and("contain", testAria);
    });

    it("should render DialogFullScreen component using focusFirstElement", () => {
      CypressMountWithProviders(<DialogFullScreenComponent />);
      cy.contains("This should be focused first now").should("have.focus");
    });

    it("should render Dialog component disabling autofocus", () => {
      CypressMountWithProviders(<DialogFullScreenComponent disableAutoFocus />);
      cy.contains("This should be focused first now").should("not.have.focus");
    });

    it("should render DialogFullScreen component with help", () => {
      CypressMountWithProviders(
        <DialogFullScreenComponent
          title="Sample DialogFullScreen"
          help="Some help text"
        />
      );
      getDataElementByValue("question").trigger("mouseover");
      tooltipPreview().should("have.text", "Some help text");
    });

    it("should render DialogFullScreen component with role", () => {
      // eslint-disable-next-line jsx-a11y/aria-role
      CypressMountWithProviders(<DialogFullScreenComponent role="dialog" />);
      dialogFullScreenPreview()
        .should("have.attr", "role")
        .and("contain", "dialog");
    });

    it("should not render close icon when ShowCloseIcon is set to false", () => {
      CypressMountWithProviders(
        <DialogFullScreenComponent showCloseIcon={false} />
      );

      closeIconButton().should("not.exist");
    });

    it("should render close icon when ShowCloseIcon is set to true. When you click the CloseIcon the Dialog is closed", () => {
      CypressMountWithProviders(<DialogFullScreenComponent showCloseIcon />);

      dialogFullScreenPreview().should("exist");
      closeIconButton().click();
      dialogFullScreenPreview().should("not.exist");
    });

    it("should render Dialog Full Screen with header children", () => {
      CypressMountWithProviders(<DialogFullScreenWithHeaderChildren />);

      getComponent("pill").eq(0).should("have.text", "A pill");

      getComponent("pill").eq(1).should("have.text", "Another pill");
    });

    it("should render Dialog component with content padding disabled", () => {
      CypressMountWithProviders(
        <DialogFullScreenComponent
          title="Dialog Full Screen Title"
          disableContentPadding
        />
      );
      contentElement()
        .should("have.css", "padding-right", "0px")
        .should("have.css", "padding-bottom", "0px");
    });
  });
});
