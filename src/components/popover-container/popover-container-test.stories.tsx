import React, { useState, useEffect } from "react";
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
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableRowHeader,
  FlatTableCell,
  FlatTableCheckbox,
} from "../flat-table";
import Dialog from "../dialog";
import Form from "../form";
import DateRange, { DateRangeChangeEvent } from "../date-range";
import DateInput, { DateChangeEvent } from "../date";
import isChromatic from "../../../.storybook/isChromatic";

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
    "WithDateRange",
    "InsideDialog",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
      delay: 2000,
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
      hasFullWidth
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

export const WithDateRange = () => {
  const [open, setOpen] = useState(defaultOpenState);
  const [state, setState] = useState(["01/10/2016", "30/10/2016"]);
  const handleChange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setState(newValue);
  };

  return (
    <Box width="100vw" height="100vh">
      <PopoverContainer
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        renderOpenComponent={({ ref, ...rest }) => (
          <Button
            iconPosition="after"
            iconType="filter_new"
            ref={ref}
            {...rest}
          >
            Filter
          </Button>
        )}
        title="Should render over sticky column"
      >
        <Box height="200px">
          <DateRange
            mt={2}
            startLabel="Disabled Portal"
            endLabel="In Portal"
            onChange={handleChange}
            value={state}
            startDateProps={{ disablePortal: true }}
          />
        </Box>
      </PopoverContainer>
      <FlatTable my={2} width="380px" overflowX="auto" title="FlatTable">
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Select</FlatTableHeader>
            <FlatTableRowHeader>Name</FlatTableRowHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader>Relationship Status</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCheckbox ariaLabelledBy="ft-row-1-cell-1 ft-row-1-cell-2 ft-row-1-cell-3" />
            <FlatTableRowHeader id="ft-row-1-cell-1">
              John Doe
            </FlatTableRowHeader>
            <FlatTableCell id="ft-row-1-cell-2">London</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-3">Single</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCheckbox ariaLabelledBy="ft-row-2-cell-1 ft-row-2-cell-2 ft-row-2-cell-3" />
            <FlatTableRowHeader id="ft-row-2-cell-1">
              Jane Doe
            </FlatTableRowHeader>
            <FlatTableCell id="ft-row-2-cell-2">York</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-3">Married</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </Box>
  );
};
WithDateRange.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const InsideDialog = () => {
  const [open, setOpen] = useState(defaultOpenState);
  const [openPopover, setOpenPopover] = useState(false);
  const [dateRangeValue, setDateRangeValue] = useState([
    "01/10/2016",
    "30/10/2016",
  ]);
  const [dateValue, setDateValue] = useState("04/04/2019");

  const handleDateRange = (ev: DateRangeChangeEvent) => {
    const newValue = [
      ev.target.value[0].formattedValue,
      ev.target.value[1].formattedValue,
    ];
    setDateRangeValue(newValue);
  };

  const handleDate = (ev: DateChangeEvent) => {
    setDateValue(ev.target.value.formattedValue);
  };

  useEffect(() => {
    setTimeout(() => {
      setOpenPopover(defaultOpenState);
    }, 1000);
  }, []);

  return (
    <Box width="100vw" height="100vh">
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} title="Dialog with PopoverContainer">
        <Form
          stickyFooter
          leftSideButtons={
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Box height="250px">
            <PopoverContainer
              open={openPopover}
              onClose={() => setOpenPopover(false)}
              onOpen={() => setOpenPopover(true)}
              renderOpenComponent={({ ref, ...rest }) => (
                <Button
                  iconPosition="after"
                  iconType="filter_new"
                  ref={ref}
                  {...rest}
                >
                  Filter
                </Button>
              )}
            >
              <Box height="200px">
                <DateRange
                  mt={2}
                  startLabel="Disabled Portal"
                  endLabel="In Portal"
                  onChange={handleDateRange}
                  value={dateRangeValue}
                  startDateProps={{ disablePortal: true }}
                />
              </Box>
            </PopoverContainer>
            <DateInput
              label="Date"
              name="date-input"
              value={dateValue}
              onChange={handleDate}
            />
          </Box>
        </Form>
      </Dialog>
    </Box>
  );
};
InsideDialog.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
