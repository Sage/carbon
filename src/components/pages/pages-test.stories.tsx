import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { ComponentMeta } from "@storybook/react";

import Pages from ".";
import Page from "./page/page.component";
import DialogFullScreen from "../dialog-full-screen";
import Heading from "../heading";
import Button from "../button";

export default {
  title: "Pages/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    initialPageIndex: {
      options: [0, 1, 2],
      control: {
        type: "select",
      },
    },
  },
} as ComponentMeta<typeof Pages>;

interface PageStoryProps {
  initialPageIndex?: number;
}

export const DefaultStory = ({ initialPageIndex }: PageStoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(Number(initialPageIndex) || 0);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleCancel = (
    ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
  ) => {
    setIsOpen(false);
    setPageIndex(0);
    action("cancel")(ev);
  };
  const handleOpen = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    setIsOpen(true);
    if (!initialPageIndex) {
      setPageIndex(0);
    } else setPageIndex(Number(initialPageIndex));
    action("open")(event);
  };
  const handleOnClick = (
    ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    setIsDisabled(true);
    setPageIndex(pageIndex + 1);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
    action("click")(ev);
    action("slide")(`Page index: ${pageIndex + 1}`);
  };
  const handleBackClick = (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
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
    <>
      <Button onClick={handleOpen}>Open Preview</Button>
      <DialogFullScreen pagesStyling open={isOpen} onCancel={handleCancel}>
        <Pages initialpageIndex={initialPageIndex} pageIndex={pageIndex}>
          <Page title={<Heading title="My First Page" divider={false} />}>
            <Button onClick={handleOnClick} disabled={isDisabled}>
              Go to second page
            </Button>
          </Page>
          <Page
            title={
              <Heading
                title="My Second Page"
                backLink={handleBackClick}
                divider={false}
              />
            }
          >
            <Button onClick={handleOnClick} disabled={isDisabled}>
              Go to third page
            </Button>
          </Page>
          <Page
            title={
              <Heading
                title="My Third Page"
                backLink={handleBackClick}
                divider={false}
              />
            }
          >
            Third Page
          </Page>
        </Pages>
      </DialogFullScreen>
    </>
  );
};

DefaultStory.storyName = "default";
DefaultStory.parameters = { args: { initialPageIndex: 0 } };
