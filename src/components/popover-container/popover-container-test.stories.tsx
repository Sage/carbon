import React, { useState } from "react";

import Button from "../button/__next__";
import Box from "../box";
import PopoverContainer, {
  PopoverContainerProps,
} from "./popover-container.component";
import { Select, MultiSelect, Option } from "../select";
import { Menu, MenuItem, MenuSegmentTitle } from "../menu";
import Heading from "../heading";
import Typography from "../typography";
import Search from "../search";
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
      disableSnapshot: true,
    },
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
  const [open, setOpen] = useState(false);
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

WithSelect.storyName = "with select";

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

WithMultiSelect.storyName = "with multiSelect";

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
InAScrollableBlock.storyName = "in a scrollable block";
InAScrollableBlock.parameters = {
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const InsideMenu = () => {
  const [open, setOpen] = useState(false);
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
            <Button aria-label="Notifications" ref={ref} onClick={onClick}>
              <Icon type="alert" />
            </Button>
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
InsideMenu.storyName = "inside menu";

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
InsideMenuWithOpenButton.storyName = "inside menu with open button";

export const InsideMenuWithPrimaryOpenButton = () => {
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
InsideMenuWithPrimaryOpenButton.storyName =
  "inside menu with primary open button";

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
WithFullWidthButton.storyName = "with full width button";
WithFullWidthButton.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
  themeProvider: { chromatic: { theme: "sage" } },
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
WithRadioButtons.storyName = "with radio buttons";

export const WithinGlobalHeader = ({
  shouldCoverButton,
}: PopoverContainerProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

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

const ChromaticRow = ({ children }: { children: React.ReactNode }) => (
  <Box
    display="grid"
    gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
    columnGap={4}
    rowGap="220px"
    minHeight="220px"
  >
    {children}
  </Box>
);

export const Chromatic = () => (
  <Box display="flex" flexDirection="column" gap={4} padding={4}>
    <ChromaticRow>
      <PopoverContainer title="Default" open onClose={() => {}}>
        Contents
      </PopoverContainer>

      <PopoverContainer title="Zero offset" offset={0} open onClose={() => {}}>
        Contents
      </PopoverContainer>
    </ChromaticRow>
    <ChromaticRow>
      <PopoverContainer
        title="Small with curved roundness"
        size="small"
        roundness="curved"
        open
        onClose={() => {}}
      >
        Contents
      </PopoverContainer>
      <PopoverContainer
        title="Medium with moderate roundness"
        size="medium"
        roundness="moderate"
        open
        onClose={() => {}}
      >
        Contents
      </PopoverContainer>

      <PopoverContainer
        title="Large with moderate roundness"
        size="large"
        roundness="moderate"
        open
        onClose={() => {}}
      >
        Contents
      </PopoverContainer>
      <PopoverContainer
        title="Custom border radius"
        borderRadius="borderRadius200"
        open
        onClose={() => {}}
      >
        Contents
      </PopoverContainer>
      <PopoverContainer
        title="Cover button"
        shouldCoverButton
        open
        onClose={() => {}}
      >
        Contents
      </PopoverContainer>
    </ChromaticRow>
  </Box>
);

Chromatic.storyName = "Chromatic Visual States";
Chromatic.parameters = {
  chromatic: {
    disableSnapshot: false,
    delay: 2000,
  },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const ChromaticContentStates = () => (
  <Box display="flex" flexDirection="column" gap={4} padding={4} pt={10}>
    <ChromaticRow>
      <PopoverContainer
        title="Custom buttons"
        open
        onClose={() => {}}
        renderOpenComponent={({ ref, onClick }) => (
          <Button ref={ref} onClick={onClick}>
            Open
          </Button>
        )}
        renderCloseComponent={({ ref, onClick, "aria-label": ariaLabel }) => (
          <Button ref={ref} onClick={onClick} aria-label={ariaLabel}>
            Close
          </Button>
        )}
      >
        Custom button content
      </PopoverContainer>
      <PopoverContainer
        title="Select content"
        open
        onClose={() => {}}
        containerAriaLabel="select example"
      >
        <Select
          label="my select"
          value="red"
          onChange={() => {}}
          openOnFocus
          autoFocus
        >
          <Option value="red" text="red" />
          <Option value="green" text="green" />
          <Option value="blue" text="blue" />
        </Select>
      </PopoverContainer>
      <PopoverContainer title="MultiSelect content" open onClose={() => {}}>
        <MultiSelect
          label="my multiselect"
          value={[]}
          onChange={() => {}}
          openOnFocus
          autoFocus
        >
          <Option value="red" text="red" />
          <Option value="green" text="green" />
          <Option value="blue" text="blue" />
        </MultiSelect>
      </PopoverContainer>
    </ChromaticRow>
    <ChromaticRow>
      <PopoverContainer title="Radio buttons" open onClose={() => {}} p={0}>
        <Box p={2}>
          <RadioButtonGroup
            name="chromatic-radio"
            value="1"
            onChange={() => {}}
          >
            <RadioButton value="1" label="radio 1" />
            <RadioButton value="2" label="radio 2" />
          </RadioButtonGroup>
        </Box>
      </PopoverContainer>
      <Box mt="120px">
        <PopoverContainer
          title="Full width button"
          hasFullWidth
          open
          onClose={() => {}}
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
      </Box>
    </ChromaticRow>
    <Box>
      <GlobalHeader pt={2}>
        <Menu menuType="black" flex="1">
          <MenuItem href="#">Menu item</MenuItem>
          <MenuItem>
            <PopoverContainer
              title="Header notifications"
              position="left"
              shouldCoverButton
              open
              onClose={() => {}}
              renderOpenComponent={({ ref, onClick }) => (
                <Button aria-label="Notifications" ref={ref} onClick={onClick}>
                  Notifications
                </Button>
              )}
            >
              Notification content
            </PopoverContainer>
          </MenuItem>
        </Menu>
      </GlobalHeader>
    </Box>
  </Box>
);

ChromaticContentStates.storyName = "Chromatic Content States";
ChromaticContentStates.parameters = {
  chromatic: {
    disableSnapshot: false,
    delay: 2000,
  },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const ChromaticPosition = () => (
  <Box display="flex" flexDirection="column" gap={4} padding={4}>
    <Box
      width="100%"
      minHeight="220px"
      display="flex"
      justifyContent="flex-end"
      alignItems="flex-start"
    >
      <PopoverContainer
        title="Left position"
        position="left"
        open
        onClose={() => {}}
      >
        Contents
      </PopoverContainer>
    </Box>
    <Box
      width="100%"
      minHeight="220px"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
    >
      <PopoverContainer
        title="Center position"
        position="center"
        open
        onClose={() => {}}
      >
        Contents
      </PopoverContainer>
    </Box>
    <Box
      width="100%"
      minHeight="220px"
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <PopoverContainer
        title="Right Position"
        position="right"
        open
        onClose={() => {}}
      >
        Contents
      </PopoverContainer>
    </Box>
  </Box>
);

ChromaticPosition.storyName = "Chromatic Positions";
ChromaticPosition.parameters = {
  chromatic: {
    disableSnapshot: false,
    delay: 2000,
  },
  themeProvider: { chromatic: { theme: "sage" } },
};
