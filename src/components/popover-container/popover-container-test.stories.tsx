import React, { useState } from "react";

import Button from "../button";
import Box from "../box";
import PopoverContainer, {
  PopoverContainerProps,
} from "./popover-container.component";
import { Select, MultiSelect, Option } from "../select";
import { Menu, MenuItem, MenuSegmentTitle } from "../menu";
import Heading from "../heading";
import Typography from "../typography";
import Search from "../search";
import IconButton from "../icon-button";
import Icon from "../icon";
import RadioButton, { RadioButtonGroup } from "../radio-button";

import GlobalHeader from "../global-header";

import isChromatic from "../../../.storybook/isChromatic";

export default {
  title: "Popover Container/Test",
  component: PopoverContainer,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: false,
      delay: 2000,
    },
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

const defaultOpenState = isChromatic();

export const Default = ({ ...args }: PopoverContainerProps) => (
  <PopoverContainer {...args} />
);

Default.story = {
  name: "default",
  args: {
    title: "Title",
    open: true,
    closeButtonDataProps: {},
  },
};

export const WithSelect = () => {
  const [open, setOpen] = useState(defaultOpenState);
  return (
    <div style={{ height: 100 }}>
      <PopoverContainer
        containerAriaLabel="popover-container"
        openButtonAriaLabel="open"
        title="select example"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <Select label="my select" value="red" onChange={() => {}}>
          <Option value="red" text="red" />
          <Option value="green" text="green" />
          <Option value="blue" text="blue" />
        </Select>
      </PopoverContainer>
    </div>
  );
};

WithSelect.story = {
  name: "with select",
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const WithMultiSelect = () => {
  const [value, setValue] = useState<string[]>([]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as string[]);
  }

  return (
    <Box ml={5} mt={5}>
      <PopoverContainer title="multiSelect example">
        <MultiSelect
          label="my multiselect"
          value={value}
          onChange={onChangeHandler}
        >
          <Option value="red" text="red" />
          <Option value="green" text="green" />
          <Option value="blue" text="blue" />
        </MultiSelect>
      </PopoverContainer>
    </Box>
  );
};

WithMultiSelect.story = {
  name: "with multiSelect",
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const InAScrollableBlock = () => {
  return (
    <Box>
      <Box bg="#ccd6dbff" height={500} width={1100} />
      <Box height={400} overflow="scroll">
        <Box height={400} position="fixed">
          <PopoverContainer
            title="This is the title"
            disableAnimation
            renderOpenComponent={({
              "data-element": dataElement,
              onClick,
              ref,
              "aria-label": ariaLabel,
              id,
              "aria-expanded": ariaExpanded,
              "aria-haspopup": ariaHasPopup,
            }) => (
              <Button
                iconType="settings"
                iconPosition="after"
                data-element={dataElement}
                aria-label={ariaLabel}
                aria-haspopup={ariaHasPopup}
                aria-expanded={ariaExpanded}
                ref={ref}
                id={id}
                onClick={onClick}
                m={2}
              />
            )}
          >
            <Button>View all notifications</Button>
          </PopoverContainer>
        </Box>
      </Box>
    </Box>
  );
};
InAScrollableBlock.story = {
  name: "in a scrollable block",
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const InsideMenu = () => {
  const [open, setOpen] = useState(defaultOpenState);
  return (
    <Menu menuType="black">
      <MenuItem flex="0 0 auto">
        <PopoverContainer
          position="left"
          shouldCoverButton
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          open={open}
          renderOpenComponent={({ ref, onClick }) => (
            <IconButton aria-label="Notifications" ref={ref} onClick={onClick}>
              <Icon type="alert" />
            </IconButton>
          )}
          p={0}
        >
          <Box mt="-8px" backgroundColor="#f2f5f6ff">
            <Heading
              title={
                <Box mt={2} ml={2}>
                  Notifications
                </Box>
              }
              subheader={<Typography ml={2}>99 red balloons</Typography>}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Button size="small">Mark all as read</Button>
            <Button buttonType="primary" size="small">
              View all notifications
            </Button>
          </Box>
        </PopoverContainer>
      </MenuItem>
    </Menu>
  );
};
InsideMenu.story = {
  name: "inside menu",
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const InsideMenuWithOpenButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <Menu menuType="black">
      <MenuItem href="#">Menu Item One</MenuItem>
      <MenuItem onClick={() => {}} submenu="Menu Item Two">
        <MenuItem href="#">Submenu Item One</MenuItem>
        <MenuItem href="#">Submenu Item Two</MenuItem>
      </MenuItem>
      <MenuItem submenu="Search">
        <MenuSegmentTitle text="My Title" variant="alternate">
          <MenuItem>
            <Search
              key="business-search"
              variant="dark"
              placeholder="Search all businesses"
              searchWidth="100%"
              value=""
              onChange={() => {}}
            />
          </MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
        </MenuSegmentTitle>
      </MenuItem>
      <MenuItem>
        <PopoverContainer
          disableAnimation
          containerAriaLabel="notifications"
          closeButtonAriaLabel="closeContainerAriaLabel"
          position="left"
          shouldCoverButton
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          open={open}
          renderOpenComponent={({ ref, onClick }) => (
            <Box data-role="gblnav-notificationui-bell">
              <Button aria-label="Notifications" ref={ref} onClick={onClick}>
                <Box alignItems="center" display="flex" px={2}>
                  <Icon type="alert" />
                  notifications
                </Box>
              </Button>
            </Box>
          )}
        >
          Content
        </PopoverContainer>
      </MenuItem>
      <MenuItem href="#">Menu Item Six</MenuItem>
    </Menu>
  );
};
InsideMenuWithOpenButton.story = {
  name: "inside menu with open button",
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const InsideMenuWithPrimaryOpenButton = () => {
  const [open, setOpen] = useState(defaultOpenState);
  return (
    <Menu menuType="black">
      <MenuItem href="#">Menu Item One</MenuItem>
      <MenuItem onClick={() => {}} submenu="Menu Item Two">
        <MenuItem href="#">Submenu Item One</MenuItem>
        <MenuItem href="#">Submenu Item Two</MenuItem>
      </MenuItem>
      <MenuItem submenu="Search">
        <MenuSegmentTitle text="My Title" variant="alternate">
          <MenuItem>
            <Search
              key="business-search"
              value=""
              onChange={() => {}}
              variant="dark"
              placeholder="Search all businesses"
              searchWidth="100%"
            />
          </MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
        </MenuSegmentTitle>
      </MenuItem>
      <MenuItem>
        <PopoverContainer
          disableAnimation
          containerAriaLabel="notifications"
          closeButtonAriaLabel="closeContainerAriaLabel"
          position="left"
          shouldCoverButton
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          open={open}
          renderOpenComponent={({
            ref,
            onClick,
            "data-popover-container-button": dataPopoverContainerButton,
          }) => (
            <Box data-role="gblnav-notificationui-bell">
              <Button
                aria-label="Notifications"
                ref={ref}
                onClick={onClick}
                data-popover-container-button={dataPopoverContainerButton}
              >
                <Box alignItems="center" display="flex" px={2}>
                  <Icon type="alert" />
                  notifications
                </Box>
              </Button>
            </Box>
          )}
        >
          Content
        </PopoverContainer>
      </MenuItem>
      <MenuItem href="#">Menu Item Six</MenuItem>
    </Menu>
  );
};
InsideMenuWithPrimaryOpenButton.story = {
  name: "inside menu with primary open button",
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithFullWidthButton = () => {
  const [open, setOpen] = useState(defaultOpenState);
  return (
    <PopoverContainer
      title="This is the title"
      hasFullWidth
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      open={open}
      renderOpenComponent={({ ref, ...rest }) => (
        <Button
          iconPosition="after"
          iconType="filter_new"
          fullWidth
          ref={ref}
          {...rest}
        >
          Filter
        </Button>
      )}
    >
      Content
    </PopoverContainer>
  );
};

export const WithRadioButtons = () => {
  const [open1, setOpen1] = useState(false);

  return (
    <Box padding="25px" display="inline-flex">
      <PopoverContainer
        position="left"
        onOpen={() => setOpen1(true)}
        onClose={() => setOpen1(false)}
        open={open1}
        renderOpenComponent={({ ref, onClick }) => (
          <Button aria-label="Notifications" ref={ref} onClick={onClick}>
            With Radio children
          </Button>
        )}
        p={0}
      >
        <Box display="flex" justifyContent="space-between" p={2}>
          <RadioButtonGroup name="bar" value="1" onChange={() => {}}>
            <RadioButton value="1" label="radio 1" />
            <RadioButton value="2" label="radio 2" />
          </RadioButtonGroup>
        </Box>
      </PopoverContainer>
      <Button>foo</Button>
    </Box>
  );
};
WithRadioButtons.story = {
  name: "with radio buttons",
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithinGlobalHeader = ({
  shouldCoverButton,
}: PopoverContainerProps) => {
  const [popoverOpen, setPopoverOpen] = useState(defaultOpenState);

  return (
    <>
      <GlobalHeader>
        <Menu menuType="black" flex="1">
          <MenuItem flex="1" submenu="Product Switcher">
            <MenuItem href="#">Product A</MenuItem>
          </MenuItem>

          <PopoverContainer
            open={popoverOpen}
            onOpen={() => setPopoverOpen(true)}
            onClose={() => setPopoverOpen(false)}
            shouldCoverButton={shouldCoverButton}
            renderOpenComponent={() => (
              <MenuItem
                flex="0 0 auto"
                onClick={() => setPopoverOpen(true)}
                icon="alert"
              >
                Notifications
              </MenuItem>
            )}
          >
            Contents
          </PopoverContainer>
        </Menu>
      </GlobalHeader>
    </>
  );
};
WithinGlobalHeader.storyName = "Within Global Header";
WithinGlobalHeader.story = {
  name: "within-global-header",
  args: {
    shouldCoverButton: true,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const OnCloseTest = () => {
  const [closeCount, setCloseCount] = useState(0);
  const onClose = () => setCloseCount((count) => count + 1);
  return (
    <>
      <PopoverContainer onClose={onClose}>Content</PopoverContainer>
      <div>Close count: {closeCount}</div>
    </>
  );
};

OnCloseTest.storyName = "On Close Test";
OnCloseTest.story = {
  name: "on-close-test",
  args: {},
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
