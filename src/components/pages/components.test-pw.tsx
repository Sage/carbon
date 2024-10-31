import React, { useState } from "react";

import Typography from "../typography";
import Pages, { PagesProps } from ".";
import Page, { PageProps } from "./page/page.component";
import DialogFullScreen from "../dialog-full-screen";
import Heading from "../heading";
import Button from "../button";
import Box from "../box";

interface PageStoryProps {
  initialPageIndex?: number;
  // eslint-disable-next-line react/no-unused-prop-types
  children?: string | Node;
  // eslint-disable-next-line react/no-unused-prop-types
  testTitle?: string;
}

export const DefaultStory = ({
  initialPageIndex,
}: PageStoryProps & Partial<PageProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(Number(initialPageIndex) || 0);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCancel = () => {
    setIsOpen(false);
    setPageIndex(0);
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (!initialPageIndex) {
      setPageIndex(0);
    } else setPageIndex(Number(initialPageIndex));
  };

  const handleOnClick = () => {
    setIsDisabled(true);
    setPageIndex(pageIndex + 1);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
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
    }
  };

  return (
    <Box>
      <Button onClick={handleOpen}>Open Preview</Button>
      <DialogFullScreen
        aria-label="aria-label"
        pagesStyling
        open={isOpen}
        onCancel={handleCancel}
      >
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
    </Box>
  );
};

export const PagesComponent = (
  props: Partial<PageStoryProps> & Partial<PagesProps>,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(
    Number(props.initialPageIndex)
      ? Number(props.initialPageIndex)
      : undefined || 0,
  );
  const [isDisabled, setIsDisabled] = React.useState(false);

  const handleCancel = () => {
    setIsOpen(false);
    setPageIndex(0);
  };

  const handleOpen = () => {
    setIsOpen(true);

    if (!props.initialPageIndex) {
      setPageIndex(0);
    } else setPageIndex(Number(props.initialPageIndex));
  };

  const handleOnClick = () => {
    setIsDisabled(true);
    setPageIndex(pageIndex + 1);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
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
    }
  };

  return (
    <Box>
      <Button onClick={handleOpen}>Open Preview</Button>
      <DialogFullScreen
        aria-label="aria-label"
        pagesStyling
        open={isOpen}
        onCancel={handleCancel}
      >
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
    </Box>
  );
};

export const PageComponent = ({
  children,
  ...props
}: Partial<PageStoryProps> & Partial<PageProps>) => {
  return (
    <Page title={<Heading title="My First Page" />} {...props}>
      {children}
    </Page>
  );
};

export const PageComponentWithTitle = ({
  children,
  testTitle,
  ...props
}: Partial<PageStoryProps> & Partial<PageProps>) => {
  return (
    <Page title={<Typography>{testTitle}</Typography>} {...props}>
      {children}
    </Page>
  );
};
