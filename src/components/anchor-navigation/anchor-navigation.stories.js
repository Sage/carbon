import React, { useRef } from "react";
import { State, Store } from "@sambego/storybook-state";

import { dlsThemeSelector } from "../../../.storybook/theme-selectors";
import Textbox from "../../__experimental__/components/textbox";
import Button from "../button";
import DialogFullScreen from "../dialog-full-screen";

import {
  AnchorNavigation,
  AnchorSectionDivider,
  AnchorNavigationItem,
} from ".";

// eslint-disable-next-line react/prop-types
const Content = ({ title, noTextbox }) => (
  <>
    <div>
      <h2>{title}</h2>
      {!noTextbox && <Textbox label={title} />}
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
      <p style={{ marginTop: 30, marginBottom: 30 }}>Content</p>
    </div>
  </>
);

export default {
  title: "Test/AnchorNavigation",
  component: AnchorNavigation,
  parameters: {
    themeSelector: dlsThemeSelector,
    info: {
      disable: true,
    },
    chromatic: {
      disabled: true,
    },
  },
};

export const Basic = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();

  return (
    <AnchorNavigation
      stickyNavigation={
        <>
          <AnchorNavigationItem target={ref1}>First</AnchorNavigationItem>
          <AnchorNavigationItem target={ref2}>Second</AnchorNavigationItem>
          <AnchorNavigationItem target={ref3}>Third</AnchorNavigationItem>
          <AnchorNavigationItem target={ref4}>
            Navigation item with very long label
          </AnchorNavigationItem>
          <AnchorNavigationItem target={ref5}>Fifth</AnchorNavigationItem>
        </>
      }
    >
      <div ref={ref1}>
        <Content title="First section" />
      </div>
      <AnchorSectionDivider />
      <div ref={ref2}>
        <Content title="Second section" />
      </div>
      <AnchorSectionDivider />
      <div ref={ref3}>
        <Content noTextbox title="Third section" />
      </div>
      <AnchorSectionDivider />
      <div ref={ref4}>
        <Content title="Fourth section" />
      </div>
      <AnchorSectionDivider />
      <div ref={ref5}>
        <Content title="Fifth section" />
      </div>
    </AnchorNavigation>
  );
};

const store = new Store({
  open: false,
});

const handleOpen = () => {
  store.set({ open: true });
};

const handleClose = () => {
  store.set({ open: false });
};

export const InFullScreenDialog = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();

  return (
    <>
      <Button onClick={handleOpen}>Open AnchorNavigation</Button>

      <State store={store}>
        <DialogFullScreen
          open={store.get("open")}
          onCancel={handleClose}
          title="Title"
          subtitle="Subtitle"
        >
          <AnchorNavigation
            stickyNavigation={
              <>
                <AnchorNavigationItem target={ref1}>First</AnchorNavigationItem>
                <AnchorNavigationItem target={ref2}>
                  Second
                </AnchorNavigationItem>
                <AnchorNavigationItem target={ref3}>Third</AnchorNavigationItem>
                <AnchorNavigationItem target={ref4}>
                  Navigation item with very long label
                </AnchorNavigationItem>
                <AnchorNavigationItem target={ref5}>Fifth</AnchorNavigationItem>
              </>
            }
          >
            <div ref={ref1}>
              <Content title="First section" />
            </div>
            <AnchorSectionDivider />
            <div ref={ref2}>
              <Content title="Second section" />
            </div>
            <AnchorSectionDivider />
            <div ref={ref3}>
              <Content noTextbox title="Third section" />
            </div>
            <AnchorSectionDivider />
            <div ref={ref4}>
              <Content title="Fourth section" />
            </div>
            <AnchorSectionDivider />
            <div ref={ref5}>
              <Content title="Fifth section" />
            </div>
          </AnchorNavigation>
        </DialogFullScreen>
      </State>
    </>
  );
};

export const WithOverridenStyles = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();

  return (
    <AnchorNavigation
      styleOverride={{
        root: { backgroundColor: "#F2F5F6" },
        content: { marginLeft: 96, marginRight: 96 },
        navigation: { maxWidth: 450, top: 100, marginTop: 24 },
      }}
      stickyNavigation={
        <>
          <AnchorNavigationItem target={ref1}>First</AnchorNavigationItem>
          <AnchorNavigationItem target={ref2}>Second</AnchorNavigationItem>
          <AnchorNavigationItem target={ref3}>Third</AnchorNavigationItem>
          <AnchorNavigationItem target={ref4}>
            Navigation item with very long label
          </AnchorNavigationItem>
          <AnchorNavigationItem
            target={ref5}
            styleOverride={{ textDecoration: "underline" }}
          >
            Fifth
          </AnchorNavigationItem>
        </>
      }
    >
      <div ref={ref1}>
        <Content title="First section" />
      </div>
      <AnchorSectionDivider styleOverride={{ backgroundColor: "white" }} />
      <div ref={ref2}>
        <Content title="Second section" />
      </div>
      <AnchorSectionDivider />
      <div ref={ref3}>
        <Content noTextbox title="Third section" />
      </div>
      <AnchorSectionDivider />
      <div ref={ref4}>
        <Content title="Fourth section" />
      </div>
      <AnchorSectionDivider />
      <div ref={ref5}>
        <Content title="Fifth section" />
      </div>
    </AnchorNavigation>
  );
};

Basic.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

InFullScreenDialog.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

WithOverridenStyles.story = {
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};
