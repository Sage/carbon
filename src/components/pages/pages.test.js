import React from "react";
import Pages, { Page } from "./pages.component";
import DialogFullScreen from "../dialog-full-screen/dialog-full-screen.component";
import Button from "../button/button.component";
import Heading from "../heading/heading.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import {
  dataComponentButtonByText,
  backArrow,
} from "../../../cypress/locators/pages";
import {
  getComponent,
  getDataElementByValue,
} from "../../../cypress/locators/index";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";
import { disableTheAnimationAndTransitions } from "../../../cypress/support/component-helper/common-steps";

const PagesComponent = ({ ...props }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [pageIndex, setPageIndex] = React.useState(
    Number(props.initialpageIndex) ? Number(props.initialpageIndex) : undefined
  );
  const [isDisabled, setIsDisabled] = React.useState(false);

  const handleCancel = () => {
    setIsOpen(false);
    setPageIndex(0);
  };

  const handleOpen = () => {
    setIsOpen(true);

    if (!props.initialpageIndex) {
      setPageIndex(0);
    } else setPageIndex(Number(props.initialpageIndex));
  };

  const handleOnClick = () => {
    setIsDisabled(true);
    setPageIndex(pageIndex + 1);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
  };

  const handleBackClick = (ev) => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);

    if (!isDisabled) {
      ev.preventDefault();
      setPageIndex(pageIndex - 1);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open Preview</Button>
      <DialogFullScreen pagesStyling open={isOpen} onCancel={handleCancel}>
        <Pages pageIndex={pageIndex} {...props}>
          <Page title={<Heading title="My First Page" />}>
            <Button onClick={handleOnClick} disabled={isDisabled}>
              Go to second page
            </Button>
          </Page>
          <Page
            title={
              <Heading title="My Second Page" backLink={handleBackClick} />
            }
          >
            <Button onClick={handleOnClick} disabled={isDisabled}>
              Go to third page
            </Button>
          </Page>
          <Page
            title={<Heading title="My Third Page" backLink={handleBackClick} />}
          >
            Third Page
          </Page>
        </Pages>
      </DialogFullScreen>
    </div>
  );
};

const PageComponent = ({ children, ...props }) => {
  return (
    <Page title={<Heading title="My First Page" />} {...props}>
      {children}
    </Page>
  );
};

context("Testing Pages component", () => {
  before(() => {
    disableTheAnimationAndTransitions();
  });

  describe("should render Pages component", () => {
    describe.each(["initialpageIndex", "pageIndex"])("when %s", (propName) => {
      describe.each([
        ["number", 1],
        ["string", "1"],
      ])(`is passed as %s`, (type, propValue) => {
        it("should show the title that matches the one on the page with that index", () => {
          const props = { [propName]: propValue };

          CypressMountWithProviders(<PagesComponent {...props} />);

          dataComponentButtonByText("Open Preview").click();
          getDataElementByValue("title").should("have.text", "My Second Page");
        });
      });
    });

    it.each(["slide", "fade"])(
      "should render Pages component with transition set to %s",
      (transition) => {
        CypressMountWithProviders(<PagesComponent transition={transition} />);

        dataComponentButtonByText("Open Preview").click();
        dataComponentButtonByText("Go to second page").click();
        getComponent("page")
          .should("have.attr", "class")
          .and("contain", transition);
      }
    );

    it("should render Pages component and go next to Second page", () => {
      CypressMountWithProviders(<PagesComponent />);

      dataComponentButtonByText("Open Preview").click();
      dataComponentButtonByText(`Go to second page`).click();

      getDataElementByValue("title").should("have.text", "My Second Page");
    });

    it("should render Pages component and go next to Third page", () => {
      CypressMountWithProviders(<PagesComponent initialpageIndex={1} />);

      dataComponentButtonByText("Open Preview").click();
      dataComponentButtonByText(`Go to third page`).click();

      getDataElementByValue("title").should("have.text", "My Third Page");
    });

    it("should render Pages component and go back to Second page", () => {
      CypressMountWithProviders(<PagesComponent initialpageIndex={2} />);

      dataComponentButtonByText("Open Preview").click().wait(250);
      backArrow().click();

      getDataElementByValue("title").should("have.text", "My Second Page");
    });

    it("should render Pages component and go back to First page", () => {
      CypressMountWithProviders(<PagesComponent initialpageIndex={1} />);

      dataComponentButtonByText("Open Preview").click();
      backArrow().click();

      getDataElementByValue("title").should("have.text", "My First Page");
    });
  });

  describe("should render Page component", () => {
    it.each([CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS])(
      "with title prop set to %s",
      (title) => {
        CypressMountWithProviders(<PageComponent title={title} />);

        getComponent("page").should("have.text", title);
      }
    );
  });
});
