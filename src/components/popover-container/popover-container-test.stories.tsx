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

export default {
  title: "Popover Container/Test",
  includeStories: [
    "Default",
    "WithSelect",
    "WithMultiSelect",
    "InAScrollableBlock",
    "InsideMenu",
    "InsideMenuWithOpenButton",
    "WithFullWidthButton",
    "WithRadioButtons",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

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
  return (
    <div style={{ height: 100 }}>
      <PopoverContainer
        containerAriaLabel="popover-container"
        openButtonAriaLabel="open"
        title="select example"
      >
        <Select label="my select">
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

WithSelect.story = {
  name: "with multiSelect",
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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          renderOpenComponent={({ isOpen, ref, onClick }) => (
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
              defaultValue=""
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

export const WithFullWidthButton = () => {
  return (
    <PopoverContainer
      title="This is the title"
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
          <RadioButtonGroup name="bar">
            <RadioButton value="1" label="radio 1" />
            <RadioButton value="2" label="radio 2" />
          </RadioButtonGroup>
        </Box>
      </PopoverContainer>
      <Button>foo</Button>
    </Box>
  );
};
