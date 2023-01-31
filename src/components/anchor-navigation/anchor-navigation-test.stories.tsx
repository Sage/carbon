import React, { useRef, useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import Textbox from "../textbox";
import Button from "../button";
import DialogFullScreen from "../dialog-full-screen";
import {
  AnchorNavigation,
  AnchorSectionDivider,
  AnchorNavigationItem,
} from ".";
import Box from "../box";
import Typography from "../typography";

export default {
  component: AnchorNavigation,
  title: "Anchor Navigation/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
} as ComponentMeta<typeof AnchorNavigation>;

interface ContentProps {
  title: string;
  noTextbox?: boolean;
}
const Content = ({ title, noTextbox }: ContentProps) => (
  <Box>
    <Typography variant="h2">{title}</Typography>
    {!noTextbox && <Textbox label={title} />}
    <Box mt="30px" mb="30px">
      Content
    </Box>
    <Box mt="30px" mb="30px">
      Content
    </Box>
    <Box mt="30px" mb="30px">
      Content
    </Box>
    <Box mt="30px" mb="30px">
      Content
    </Box>
    <Box mt="30px" mb="30px">
      Content
    </Box>
    <Box mt="30px" mb="30px">
      Content
    </Box>
  </Box>
);

export const DefaultStory: ComponentStory<typeof AnchorNavigation> = () => {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const ref5 = useRef<HTMLDivElement>(null);
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
      <Box ref={ref1}>
        <Content title="First section" />
      </Box>
      <AnchorSectionDivider />
      <Box ref={ref2}>
        <Content title="Second section" />
      </Box>
      <AnchorSectionDivider />
      <Box ref={ref3}>
        <Content noTextbox title="Third section" />
      </Box>
      <AnchorSectionDivider />
      <Box ref={ref4}>
        <Content title="Fourth section" />
      </Box>
      <AnchorSectionDivider />
      <Box ref={ref5}>
        <Content title="Fifth section" />
      </Box>
    </AnchorNavigation>
  );
};
DefaultStory.storyName = "default";

export const InFullScreenDialogStory: ComponentStory<
  typeof AnchorNavigation
> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const ref5 = useRef<HTMLDivElement>(null);
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
          <Box ref={ref1}>
            <Content title="First section" />
          </Box>
          <AnchorSectionDivider />
          <Box ref={ref2}>
            <Content title="Second section" />
          </Box>
          <AnchorSectionDivider />
          <Box ref={ref3}>
            <Content noTextbox title="Third section" />
          </Box>
          <AnchorSectionDivider />
          <Box ref={ref4}>
            <Content title="Fourth section" />
          </Box>
          <AnchorSectionDivider />
          <Box ref={ref5}>
            <Content title="Fifth section" />
          </Box>
        </AnchorNavigation>
      </DialogFullScreen>
    </>
  );
};
InFullScreenDialogStory.storyName = "in full screen dialog";

export const AnchorNavigationComponent = () => {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const ref5 = useRef<HTMLDivElement>(null);
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
      <Box ref={ref1}>
        <Content title="First section" />
      </Box>
      <AnchorSectionDivider />
      <Box ref={ref2}>
        <Content title="Second section" />
      </Box>
      <AnchorSectionDivider />
      <Box ref={ref3}>
        <Content noTextbox title="Third section" />
      </Box>
      <AnchorSectionDivider />
      <Box ref={ref4}>
        <Content title="Fourth section" />
      </Box>
      <AnchorSectionDivider />
      <Box ref={ref5}>
        <Content title="Fifth section" />
      </Box>
    </AnchorNavigation>
  );
};
