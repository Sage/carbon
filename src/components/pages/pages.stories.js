import React, { useState } from "react";
import { select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Pages from ".";
import Page from "./page/page.component";
import DialogFullScreen from "../dialog-full-screen";
import Heading from "../heading/heading";
import Button from "../button";

export default {
  title: "Pages/Test",
  component: Pages,
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
    chromatic: {
      disabled: true,
    },
  },
};

export const Basic = () => {
  const initialpageIndex = select("initialPageIndex", [0, 1, 2]);
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(Number(initialpageIndex) || 0);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCancel = (ev) => {
    setIsOpen(false);
    setPageIndex(0);
    action("cancel")(ev);
  };

  const handleOpen = (ev) => {
    setIsOpen(true);
    if (!initialpageIndex) {
      setPageIndex(0);
    } else setPageIndex(Number(initialpageIndex));
    action("open")(ev);
  };

  const handleOnClick = (ev) => {
    setIsDisabled(true);
    setPageIndex(pageIndex + 1);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
    action("click")(ev);
    action("slide")(`Page index: ${pageIndex + 1}`);
  };

  const handleBackClick = (ev) => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
    if (!isDisabled) {
      ev.preventDefault();
      setPageIndex(pageIndex - 1);
      action("click")(ev);
      action("slide")(`Page index: ${pageIndex + 1}`);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open Preview</Button>
      <DialogFullScreen pagesStyling open={isOpen} onCancel={handleCancel}>
        <Pages initialpageIndex={initialpageIndex} pageIndex={pageIndex}>
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
          />
        </Pages>
      </DialogFullScreen>
    </div>
  );
};

Basic.story = {
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
