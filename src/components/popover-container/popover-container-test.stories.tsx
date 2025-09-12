import React, { useState, useEffect } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
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
import Link from "../link";
import Hr from "../hr";
import DateRange, { DateRangeChangeEvent } from "../date-range";
import DateInput, { DateChangeEvent } from "../date";
import GlobalHeader from "../global-header";
import carbonLogo from "../../../logo/carbon-logo.png";
import isChromatic from "../../../.storybook/isChromatic";

export default {
  title: "Popover Container/Test",
  component: PopoverContainer,
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

export const InsideMenuWithPrimaryOpenButtonResponsive = () => {
  const Logo = () => <img height={28} src={carbonLogo} alt="Carbon logo" />;
  const [open, setOpen] = useState(false);
  const isMid = useMediaQuery("(max-width: 1075px)");
  const isSmall = useMediaQuery("(max-width: 512px)");

  const PopoverLink = ({ text }: { text: string }) => (
    <Link href="#" variant="subtle" isDarkBackground underline="hover">
      {text}
    </Link>
  );

  return (
    <GlobalHeader logo={Logo()}>
      <Menu menuType="black" flex="1">
        <MenuItem flex="1" submenu="Product Switcher">
          <MenuItem href="#">Product A</MenuItem>
        </MenuItem>
        <MenuItem href="#" flex="0 0 auto">
          <PopoverContainer
            containerAriaLabel="Create"
            closeButtonAriaLabel="Close Create Popover"
            position={isSmall || !isMid ? "center" : "right"}
            offset={0}
            p={0}
            borderRadius="borderRadius000 borderRadius000 borderRadius200 borderRadius200"
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            open={open}
            renderOpenComponent={({
              ref,
              onClick,
              "data-popover-container-button": dataPopoverContainerButton,
            }) => (
              <Button
                aria-label="Create"
                ref={ref}
                onClick={onClick}
                data-popover-container-button={dataPopoverContainerButton}
              >
                <Box alignItems="center" display="flex" px={2}>
                  <Icon type="plus" />
                  Create
                </Box>
              </Button>
            )}
            renderCloseComponent={({ ref, onClick }) => (
              <Box position="absolute" right="15px" top="15px">
                <IconButton
                  aria-label="Close Create Popover"
                  ref={ref}
                  onClick={onClick}
                >
                  <Icon color="var(--colorsActionMajorYang100)" type="close" />
                </IconButton>
              </Box>
            )}
          >
            <Box
              display="flex"
              flexDirection={!isMid ? "row" : "column"}
              gap={!isMid ? "64px" : "24px"}
              padding="24px 32px"
              borderRadius="borderRadius000 borderRadius000 borderRadius200 borderRadius200"
              backgroundColor="var(--colorsActionMajor500)"
              boxSizing="border-box"
              marginLeft="0"
              maxHeight="410px"
              overflowY="auto"
              {...(isSmall && { width: "100vw" })}
            >
              <Box
                display="flex"
                flexDirection="column"
                boxSizing="border-box"
                margin="0"
                padding="0"
              >
                <Typography variant="segment-subheader" color="white" m={0}>
                  Lorem Ipsum
                </Typography>
                <Hr type="inverse" mt={1} mb={2} />
                <Box display="flex" flexDirection="row" gap="32px">
                  <Box display="flex" flexDirection="column" gap="8px">
                    <PopoverLink text="Lorem ipsum dolor" />
                    <PopoverLink text="Sit amet consectetur" />
                    <PopoverLink text="Adipiscing elit sed" />
                    <PopoverLink text="Do eiusmod tempor" />
                    <PopoverLink text="Incididunt ut labore" />
                    <PopoverLink text="Et dolore magna" />
                  </Box>
                  <Box display="flex" flexDirection="column" gap="8px">
                    <PopoverLink text="Aliqua ut enim" />
                    <PopoverLink text="Ad minim veniam" />
                    <PopoverLink text="Quis nostrud exercitation" />
                    <PopoverLink text="Ullamco laboris nisi" />
                    <PopoverLink text="Ut aliquip ex" />
                    <PopoverLink text="Ea commodo consequat" />
                  </Box>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                boxSizing="border-box"
                margin="0"
                padding="0"
              >
                <Typography variant="segment-subheader" color="white" m={0}>
                  Dolor Sit Amet
                </Typography>
                <Hr type="inverse" mt={1} mb={2} />
                <Box display="flex" flexDirection="row" gap="32px">
                  <Box display="flex" flexDirection="column" gap="8px">
                    <PopoverLink text="Duis aute irure" />
                    <PopoverLink text="Dolor in reprehenderit" />
                    <PopoverLink text="In voluptate velit" />
                    <PopoverLink text="Esse cillum dolore" />
                    <PopoverLink text="Eu fugiat nulla" />
                  </Box>
                  <Box display="flex" flexDirection="column" gap="8px">
                    <PopoverLink text="Pariatur excepteur sint" />
                    <PopoverLink text="Occaecat cupidatat non" />
                    <PopoverLink text="Proident sunt in" />
                    <PopoverLink text="Culpa qui officia" />
                    <PopoverLink text="Deserunt mollit anim" />
                  </Box>
                </Box>
              </Box>
            </Box>
          </PopoverContainer>
        </MenuItem>
        <MenuItem href="#" flex="0 0 auto" icon="person">
          User name
        </MenuItem>
        <MenuItem href="#" flex="0 0 auto" icon="person">
          User name
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Selected role">
          <MenuItem href="#">Administrator</MenuItem>
        </MenuItem>
        <MenuItem ariaLabel="search" icon="search" href="#" />
        <MenuItem ariaLabel="alert" icon="alert" href="#" />
        <MenuItem ariaLabel="settings" icon="settings" href="#" />
        <MenuItem ariaLabel="logout" icon="logout" href="#" />
      </Menu>
    </GlobalHeader>
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
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-1-cell-1 ft-row-1-cell-2 ft-row-1-cell-3"
              checked
              onChange={() => {}}
            />
            <FlatTableRowHeader id="ft-row-1-cell-1">
              John Doe
            </FlatTableRowHeader>
            <FlatTableCell id="ft-row-1-cell-2">London</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-3">Single</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-2-cell-1 ft-row-2-cell-2 ft-row-2-cell-3"
              checked
              onChange={() => {}}
            />
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
};
