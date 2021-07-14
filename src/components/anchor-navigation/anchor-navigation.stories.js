import React, { useRef, useState } from "react";

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
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
  },
};

export const Default = () => {
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

export const InFullScreenDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open AnchorNavigation</Button>

      <DialogFullScreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Title"
        subtitle="Subtitle"
      >
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
      </DialogFullScreen>
    </>
  );
};

Default.story = {
  name: "default",
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

InFullScreenDialog.story = {
  name: "in full screen dialog",
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
