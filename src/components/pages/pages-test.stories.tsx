import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import Pages from ".";
import Page, { PageProps } from "./page/page.component";
import DialogFullScreen from "../dialog-full-screen";
import Heading from "../heading";
import Button from "../button";
import Box from "../box";

export default {
  title: "Pages/Test",
  includeStories: ["DefaultStory", "DifferentPageHeights"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
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
};

interface PageStoryProps {
  initialPageIndex?: number;
  // eslint-disable-next-line react/no-unused-prop-types
  children?: string | Node;
}

export const DefaultStory = ({
  initialPageIndex,
}: PageStoryProps & Partial<PageProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(Number(initialPageIndex) || 0);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleCancel = (
    ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>,
  ) => {
    setIsOpen(false);
    setPageIndex(0);
    action("cancel")(ev);
  };
  const handleOpen = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    setIsOpen(true);
    if (!initialPageIndex) {
      setPageIndex(0);
    } else setPageIndex(Number(initialPageIndex));
    action("open")(event);
  };
  const handleOnClick = (
    ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
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
      | React.KeyboardEvent<HTMLButtonElement>,
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
    <div>
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
    </div>
  );
};

DefaultStory.storyName = "default";
DefaultStory.parameters = { args: { initialPageIndex: 0 } };

export const DifferentPageHeights = () => {
  const [pageIndex, setPageIndex] = useState(0);
  return (
    <Box p={1}>
      <Pages pageIndex={pageIndex}>
        <Page title={<Heading title="Page 1" />}>
          <div>
            <Button onClick={() => setPageIndex(1)}>Next page</Button>
          </div>
          <p>
            A moderate but not too-big amount of text here. A moderate but not
            too-big amount of text here. A moderate but not too-big amount of
            text here. A moderate but not too-big amount of text here. A
            moderate but not too-big amount of text here. A moderate but not
            too-big amount of text here. A moderate but not too-big amount of
            text here. A moderate but not too-big amount of text here. A
            moderate but not too-big amount of text here.
          </p>
        </Page>
        <Page title={<Heading title="Page 2" />}>
          <div>
            <Button onClick={() => setPageIndex(0)}>Previous page</Button>
            <Button onClick={() => setPageIndex(2)}>Next page</Button>
          </div>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
          <p>
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here. Lots and lots of text here. Lots and lots of
            text here. Lots and lots of text here. Lots and lots of text here.
            Lots and lots of text here. Lots and lots of text here. Lots and
            lots of text here. Lots and lots of text here. Lots and lots of text
            here. Lots and lots of text here. Lots and lots of text here. Lots
            and lots of text here.
          </p>
        </Page>
        <Page title={<Heading title="Page 3" />}>
          <div>
            <Button onClick={() => setPageIndex(1)}>Previous page</Button>
          </div>
          <p>Tiny amount of text</p>
        </Page>
      </Pages>
    </Box>
  );
};
