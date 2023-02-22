import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";
import isChromatic from "../../../.storybook/isChromatic";

import Pages, { Page } from ".";
import DialogFullScreen from "../dialog-full-screen";
import Heading from "../heading";
import Button from "../button";

const defaultOpenState = isChromatic();

export const Default: ComponentStory<typeof Pages> = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [pageIndex, setPageIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
    setPageIndex(0);
  };
  const handleOpen = () => {
    setIsOpen(true);
    setPageIndex(0);
  };
  const handleOnClick = () => {
    setIsDisabled(true);
    setPageIndex(pageIndex + 1);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
  };
  const handleBackClick = (ev: { preventDefault: () => void }) => {
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
        <Pages pageIndex={pageIndex}>
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

export const WithInitialPageIndex: ComponentStory<typeof Pages> = () => {
  const initialpageIndex = 1;
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [pageIndex, setPageIndex] = useState(
    Number(initialpageIndex) ? Number(initialpageIndex) : 0
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
    setPageIndex(0);
  };
  const handleOpen = () => {
    setIsOpen(true);
    if (!initialpageIndex) {
      setPageIndex(0);
    } else setPageIndex(Number(initialpageIndex));
  };
  const handleOnClick = () => {
    setIsDisabled(true);
    setPageIndex(pageIndex + 1);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
  };
  const handleBackClick = (ev: { preventDefault: () => void }) => {
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
          >
            Third Page
          </Page>
        </Pages>
      </DialogFullScreen>
    </div>
  );
};

export const InsideDialogFullScreen: ComponentStory<typeof Pages> = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [pageIndex, setPageIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
    setPageIndex(0);
  };
  const handleOpen = () => {
    setIsOpen(true);
    setPageIndex(0);
  };
  const handleOnClick = () => {
    setIsDisabled(true);
    setPageIndex(pageIndex + 1);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
  };
  const handleBackClick = (ev: { preventDefault: () => void }) => {
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
        <Pages pageIndex={pageIndex}>
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

export const OverridingContentPadding: ComponentStory<typeof Pages> = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [pageIndex, setPageIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
    setPageIndex(0);
  };
  const handleOpen = () => {
    setIsOpen(true);
    setPageIndex(0);
  };
  const handleOnClick = () => {
    setIsDisabled(true);
    setPageIndex(pageIndex + 1);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
  };
  const handleBackClick = (ev: { preventDefault: () => void }) => {
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
        <Pages pageIndex={pageIndex}>
          <Page p={0} title={<Heading title="My First Page" />}>
            <Button onClick={handleOnClick} disabled={isDisabled}>
              Go to Last page
            </Button>
          </Page>
          <Page
            p={0}
            title={<Heading title="My Last Page" backLink={handleBackClick} />}
          >
            <Button onClick={handleBackClick} disabled={isDisabled}>
              Go to First page
            </Button>
          </Page>
        </Pages>
      </DialogFullScreen>
    </div>
  );
};
