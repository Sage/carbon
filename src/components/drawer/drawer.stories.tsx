import React, { useCallback, useMemo, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import styled from "styled-components";

import { Checkbox } from "../checkbox";
import Search from "../search";
import Drawer, { DrawerProps } from ".";
import Button from "../button";
import PopoverContainer from "../popover-container";
import DialogFullScreen from "../dialog-full-screen";
import { StyledDrawerContent, StyledDrawerSidebar } from "./drawer.style";
import Heading from "../heading";
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableCell,
  Sort,
} from "../flat-table";
import { Tabs, Tab } from "../tabs";
import Typography from "../typography";
import Box from "../box";
import Pager from "../pager";

const meta: Meta<typeof Drawer> = {
  title: "Drawer",
  component: Drawer,
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = (args: DrawerProps) => (
  <Box height="200px">
    <Drawer
      sidebarAriaLabel="default"
      expandedWidth="40%"
      animationDuration="0.5s"
      sidebar={
        <ul>
          <li>link a</li>
          <li>link b</li>
          <li>link c</li>
        </ul>
      }
      {...args}
    >
      content body content body content body content body content body content
      body content body
    </Drawer>
  </Box>
);
Default.storyName = "Default";

export const CustomHeight: Story = (args: DrawerProps) => (
  <Drawer
    height="230px"
    defaultExpanded
    sidebar={
      <ul>
        <li>link a</li>
        <li>link b</li>
        <li>link c</li>
      </ul>
    }
    {...args}
  >
    content body content body content body content body content body content
    body content body
  </Drawer>
);
CustomHeight.storyName = "Custom Height";
CustomHeight.args = {
  expandedWidth: "40%",
  animationDuration: "0.5s",
  sidebarAriaLabel: "custom height",
};

export const BackgroundColorRed: Story = (args: DrawerProps) => (
  <Box height="200px">
    <Drawer
      sidebar={
        <ul>
          <li>link a</li>
          <li>link b</li>
          <li>link c</li>
        </ul>
      }
      {...args}
    >
      content body content body content body content body content body content
      body content body
    </Drawer>
  </Box>
);
BackgroundColorRed.storyName = "Background Color Red";
BackgroundColorRed.args = {
  expandedWidth: "40%",
  animationDuration: "0.5s",
  sidebarAriaLabel: "custom background color red",
  backgroundColor: "#FF0000",
};

export const BackgroundColorWhite: Story = (args: DrawerProps) => (
  <Box height="200px" backgroundColor="#FF0000">
    <Drawer
      {...args}
      sidebar={
        <ul>
          <li>link a</li>
          <li>link b</li>
          <li>link c</li>
        </ul>
      }
    >
      content body content body content body content body content body content
      body content body
    </Drawer>
  </Box>
);
BackgroundColorWhite.storyName = "Background Color White";
BackgroundColorWhite.args = {
  expandedWidth: "40%",
  animationDuration: "0.5s",
  sidebarAriaLabel: "custom background color white",
  backgroundColor: "#FFFFFF",
};

export const BackgroundColorTransparent: Story = (args: DrawerProps) => (
  <Box height="200px" backgroundColor="#FF0000">
    <Drawer
      sidebar={
        <ul>
          <li>link a</li>
          <li>link b</li>
          <li>link c</li>
        </ul>
      }
      {...args}
    >
      content body content body content body content body content body content
      body content body
    </Drawer>
  </Box>
);
BackgroundColorTransparent.storyName = "Background Color Transparent";
BackgroundColorTransparent.args = {
  expandedWidth: "40%",
  animationDuration: "0.5s",
  sidebarAriaLabel: "custom background color transparent",
  backgroundColor: "transparent",
};

export const Title: Story = (args: DrawerProps) => (
  <Box height="200px">
    <Drawer
      expandedWidth="40%"
      animationDuration="0.5s"
      title={<Typography variant="h2">Drawer title</Typography>}
      sidebar={
        <ul>
          <li>link a</li>
          <li>link b</li>
          <li>link c</li>
        </ul>
      }
      {...args}
    >
      content body content body content body content body content body content
      body content body
    </Drawer>
  </Box>
);
Title.storyName = "Title";

export const WithSidebarAriaLabel: Story = (args: DrawerProps) => (
  <Box height="200px">
    <Drawer
      expandedWidth="40%"
      animationDuration="0.5s"
      sidebarAriaLabel="sidebar aria label"
      sidebar={
        <ul>
          <li>link a</li>
          <li>link b</li>
          <li>link c</li>
        </ul>
      }
      {...args}
    >
      content body content body content body content body content body content
      body content body
    </Drawer>
  </Box>
);
WithSidebarAriaLabel.storyName = "Sidebar Aria Label";

export const WithControls: Story = (args: DrawerProps) => (
  <Box height="200px">
    <Drawer
      showControls
      sidebar={
        <ul>
          <li>link a</li>
          <li>link b</li>
          <li>link c</li>
        </ul>
      }
      {...args}
    >
      content body content body content body content body content body content
      body content body
    </Drawer>
  </Box>
);
WithControls.storyName = "With Controls";
WithControls.args = {
  expandedWidth: "40%",
  animationDuration: "0.5s",
  sidebarAriaLabel: "with controls",
};

export const WithStickyHeader: Story = () => (
  <Box height="400px">
    <Drawer
      title={<Typography variant="h2">Sticky Header</Typography>}
      stickyHeader
      showControls
      expandedWidth="40%"
      animationDuration="0.5s"
      sidebar={
        <>
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
            mb={4}
          />
        </>
      }
    >
      content body content body content body content body content body content
      body content body
    </Drawer>
  </Box>
);
WithStickyHeader.storyName = "With Sticky Header";

export const WithFooter: Story = () => (
  <Box height="400px">
    <Drawer
      title={<Typography variant="h2">With Footer</Typography>}
      stickyHeader
      showControls
      expandedWidth="40%"
      animationDuration="0.5s"
      footer={
        <Box display="flex" justifyContent="flex-end">
          <Button mr="16px">Cancel</Button>
          <Button buttonType="primary" type="submit">
            Action
          </Button>
        </Box>
      }
      sidebar={
        <>
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
            mb={4}
          />
        </>
      }
    >
      content body content body content body content body content body content
      body content body
    </Drawer>
  </Box>
);
WithFooter.storyName = "With Footer";

export const WithStickyFooter: Story = () => (
  <Box height="400px">
    <Drawer
      title={<Typography variant="h2">Sticky Footer</Typography>}
      stickyHeader
      stickyFooter
      showControls
      expandedWidth="40%"
      animationDuration="0.5s"
      footer={
        <Box display="flex" justifyContent="flex-end">
          <Button mr="16px">Cancel</Button>
          <Button buttonType="primary" type="submit">
            Action
          </Button>
        </Box>
      }
      sidebar={
        <>
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="30px"
            mb={4}
          />
        </>
      }
    >
      content body content body content body content body content body content
      body content body
    </Drawer>
  </Box>
);
WithStickyFooter.storyName = "With Sticky Footer";

export const CustomSidebar: Story = (args: DrawerProps) => {
  const rows = [
    <FlatTableRow key="0">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="1">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="2">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="3">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>5</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="4">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="5">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="6">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="7">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="8">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>5</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="9">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="10">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="11">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="12">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="13">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>5</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="14">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="15">
      <FlatTableCell>John Doe</FlatTableCell>
      <FlatTableCell>London</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>0</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="16">
      <FlatTableCell>Jane Doe</FlatTableCell>
      <FlatTableCell>York</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="17">
      <FlatTableCell>John Smith</FlatTableCell>
      <FlatTableCell>Edinburgh</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>1</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="18">
      <FlatTableCell>Jane Smith</FlatTableCell>
      <FlatTableCell>Newcastle</FlatTableCell>
      <FlatTableCell>Married</FlatTableCell>
      <FlatTableCell>5</FlatTableCell>
    </FlatTableRow>,
    <FlatTableRow key="19">
      <FlatTableCell>Liz Anya</FlatTableCell>
      <FlatTableCell>Stoke</FlatTableCell>
      <FlatTableCell>Single</FlatTableCell>
      <FlatTableCell>2</FlatTableCell>
    </FlatTableRow>,
  ];
  const [recordsRange, setRecordsRange] = useState({ start: 0, end: 5 });
  const [currentPage, setCurrentPage] = useState(1);
  const renderRows = () => {
    const { start, end } = recordsRange;
    if (start < 0) return rows;
    if (end > rows.length) return rows.slice(start, rows.length);
    return rows.slice(start, end);
  };
  const handlePagination = (newPage: number, newPageSize: number) => {
    const start = (newPage - 1) * newPageSize;
    const end = start + newPageSize;
    setRecordsRange({ start, end });
    setCurrentPage(newPage);
  };
  return (
    <Box>
      <Drawer
        defaultExpanded
        sidebar={
          <FlatTable
            height="calc(100vh - 70px)"
            hasStickyFooter
            footer={
              <Pager
                totalRecords={rows.length}
                showPageSizeSelection
                pageSize={10}
                currentPage={currentPage}
                onPagination={(next, size) => handlePagination(next, size)}
                pageSizeSelectionOptions={[
                  { id: "10", name: 10 },
                  { id: "15", name: 15 },
                  { id: "20", name: 20 },
                ]}
              />
            }
          >
            <FlatTableHead>
              <FlatTableRow>
                <FlatTableHeader>Name</FlatTableHeader>
                <FlatTableHeader>Location</FlatTableHeader>
                <FlatTableHeader>Relationship Status</FlatTableHeader>
                <FlatTableHeader>Dependents</FlatTableHeader>
              </FlatTableRow>
            </FlatTableHead>
            <FlatTableBody>{renderRows()}</FlatTableBody>
          </FlatTable>
        }
        {...args}
      >
        content body content body content body content body content body content
        body content body
      </Drawer>
    </Box>
  );
};
CustomSidebar.storyName = "Custom Sidebar";
CustomSidebar.args = {
  expandedWidth: "35%",
  animationDuration: "0.5s",
  sidebarAriaLabel: "custom sidebar",
};

export const CustomContent: Story = (args: DrawerProps) => (
  <Box height="200px">
    <Drawer
      sidebarAriaLabel="custom content"
      sidebar={
        <ul>
          <li>link a</li>
          <li>link b</li>
          <li>link c</li>
        </ul>
      }
      {...args}
    >
      <FlatTable>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Client</FlatTableHeader>
            <FlatTableHeader>Client Type</FlatTableHeader>
            <FlatTableHeader>Categories</FlatTableHeader>
            <FlatTableHeader>Services</FlatTableHeader>
            <FlatTableHeader>Client</FlatTableHeader>
            <FlatTableHeader>Client Type</FlatTableHeader>
            <FlatTableHeader>Categories</FlatTableHeader>
            <FlatTableHeader>Services</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>John Doe</FlatTableCell>
            <FlatTableCell>Business</FlatTableCell>
            <FlatTableCell>Group1, Group2</FlatTableCell>
            <FlatTableCell>Accounting</FlatTableCell>
            <FlatTableCell>John Doe</FlatTableCell>
            <FlatTableCell>Business</FlatTableCell>
            <FlatTableCell>Group1, Group2</FlatTableCell>
            <FlatTableCell>Accounting</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jane Doe</FlatTableCell>
            <FlatTableCell>Business</FlatTableCell>
            <FlatTableCell>Group1, Group3</FlatTableCell>
            <FlatTableCell>Accounting</FlatTableCell>
            <FlatTableCell>Jane Doe</FlatTableCell>
            <FlatTableCell>Business</FlatTableCell>
            <FlatTableCell>Group1, Group3</FlatTableCell>
            <FlatTableCell>Accounting</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>John Smith</FlatTableCell>
            <FlatTableCell>Charity</FlatTableCell>
            <FlatTableCell>Group3</FlatTableCell>
            <FlatTableCell>Payroll</FlatTableCell>
            <FlatTableCell>John Smith</FlatTableCell>
            <FlatTableCell>Charity</FlatTableCell>
            <FlatTableCell>Group3</FlatTableCell>
            <FlatTableCell>Payroll</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jane Smith</FlatTableCell>
            <FlatTableCell>Partnership</FlatTableCell>
            <FlatTableCell>Group3</FlatTableCell>
            <FlatTableCell>Final Tax</FlatTableCell>
            <FlatTableCell>Jane Smith</FlatTableCell>
            <FlatTableCell>Partnership</FlatTableCell>
            <FlatTableCell>Group3</FlatTableCell>
            <FlatTableCell>Final Tax</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jane Smith</FlatTableCell>
            <FlatTableCell>Partnership</FlatTableCell>
            <FlatTableCell>Group3</FlatTableCell>
            <FlatTableCell>Final Tax</FlatTableCell>
            <FlatTableCell>Jane Smith</FlatTableCell>
            <FlatTableCell>Partnership</FlatTableCell>
            <FlatTableCell>Group3</FlatTableCell>
            <FlatTableCell>Final Tax</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jane Smith</FlatTableCell>
            <FlatTableCell>Partnership</FlatTableCell>
            <FlatTableCell>Group3</FlatTableCell>
            <FlatTableCell>Final Tax</FlatTableCell>
            <FlatTableCell>Jane Smith</FlatTableCell>
            <FlatTableCell>Partnership</FlatTableCell>
            <FlatTableCell>Group3</FlatTableCell>
            <FlatTableCell>Final Tax</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jane Smith</FlatTableCell>
            <FlatTableCell>Partnership</FlatTableCell>
            <FlatTableCell>Group3</FlatTableCell>
            <FlatTableCell>Final Tax</FlatTableCell>
            <FlatTableCell>Jane Smith</FlatTableCell>
            <FlatTableCell>Partnership</FlatTableCell>
            <FlatTableCell>Group3</FlatTableCell>
            <FlatTableCell>Final Tax</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </Drawer>
  </Box>
);
CustomContent.storyName = "Custom Content";
CustomContent.args = {
  expandedWidth: "20%",
  animationDuration: "0.5s",
};

export const DifferentExpandedWidth: Story = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const onChangeHandler = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);
  return (
    <Box>
      <p>
        Note: if you experience glitchy animation on `Drawer` component, please
        open canvas in new window (2nd icon in top right corner)
      </p>
      <Box height="200px">
        <Drawer
          title={<h2>Custom Expanded Width</h2>}
          showControls
          expandedWidth="62%"
          expanded
          onChange={onChangeHandler}
          sidebar={
            <ul>
              <li>link a</li>
              <li>link b</li>
              <li>link c</li>
            </ul>
          }
        >
          content body content body content body content body content body
          content body content body
        </Drawer>
      </Box>
    </Box>
  );
};
DifferentExpandedWidth.storyName = "Different Expanded Width";

export const DifferentAnimationSpeed: Story = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const onChangeHandler = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);
  return (
    <Box>
      <p>
        Note: if you experience glitchy animation on `Drawer` component, please
        open canvas in new window (2nd icon in top right corner)
      </p>
      <Box height="200px">
        <Drawer
          title={<h2>Custom Animation Duration</h2>}
          showControls
          expandedWidth="40%"
          animationDuration="3s"
          expanded={isExpanded}
          onChange={onChangeHandler}
          sidebar={
            <ul>
              <li>link a</li>
              <li>link b</li>
              <li>link c</li>
            </ul>
          }
        >
          content body content body content body content body content body
          content body content body
        </Drawer>
      </Box>
    </Box>
  );
};
DifferentAnimationSpeed.storyName = "Different Animation Speed";

export const Controlled: Story = (args: DrawerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const onChangeHandler = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);
  return (
    <Box>
      <p>
        Note: if you experience glitchy animation on `Drawer` component, please
        open canvas in new window (2nd icon in top right corner)
      </p>
      <Box height="200px">
        <Drawer
          backgroundColor="#FFF000"
          title={<h2>Controlled Usage Drawer</h2>}
          showControls
          expanded={isExpanded}
          onChange={onChangeHandler}
          sidebar={
            <ul>
              <li>link a</li>
              <li>link b</li>
              <li>link c</li>
            </ul>
          }
          {...args}
        >
          content body content body content body content body content body
          content body content body
        </Drawer>
      </Box>
    </Box>
  );
};
Controlled.storyName = "Controlled";
Controlled.args = {
  expandedWidth: "40%",
  animationDuration: "0.5s",
};

export const SideViewNavigation: Story = () => {
  type dataPropTypes = {
    ColumnA: {
      name: string;
    };
    ColumnB: string[];
  };

  const bodyDataItems = [
    {
      ColumnA: {
        name: "First Line",
      },
      ColumnB: ["Value 1", "Value 2", "Value 3"],
    },
    {
      ColumnA: {
        name: "Second Line",
      },
      ColumnB: ["Value 1", "Value 2"],
    },
    {
      ColumnA: {
        name: "Third Line",
      },
      ColumnB: ["Value 1", "Value 2", "Value 3", "Value 4"],
    },
    {
      ColumnA: {
        name: "Fourth Line",
      },
      ColumnB: ["Value 1"],
    },
    {
      ColumnA: {
        name: "Fifth Line",
      },
      ColumnB: ["Value 1"],
    },
    {
      ColumnA: {
        name: "Sixth Line",
      },
      ColumnB: ["Value 1"],
    },
  ];
  const [isExpanded, setIsExpanded] = useState(true);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortType, setSortType] = useState<"ascending" | "descending">(
    "descending",
  );
  const [pickedUpData, setPickedUpData] = useState<dataPropTypes>();
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };
  const handleOpenFilterClick = () => {
    setFilterOpen(!isFilterOpen);
  };
  const onChangeHandler = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);
  const NavigationContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 24px 24px 0;
    margin-bottom: 50px;
    align-items: center;
  `;
  const StyledDrawer = useMemo(() => {
    return styled(Drawer)`
      ${StyledDrawerContent} {
        overflow: visible;
      }
      ${StyledDrawerSidebar} {
        overflow: visible;
      }
    `;
  }, []);
  const showPickedUpData = (data?: dataPropTypes) => {
    if (!data) {
      return <Box>click on any row to show some data</Box>;
    }
    return (
      <Box paddingLeft="24px" paddingTop="24px">
        <Heading title={data.ColumnA.name} divider={false} />
      </Box>
    );
  };
  const createBodyData = (type: "ascending" | "descending" | false) => {
    const data = bodyDataItems;
    const sortedData = data.sort((a, b) => {
      if (type === "ascending") {
        if (a.ColumnA.name < b.ColumnA.name) {
          return -1;
        }
        if (a.ColumnA.name > b.ColumnA.name) {
          return 1;
        }
        return 0;
      }
      if (type === "descending") {
        if (a.ColumnA.name > b.ColumnA.name) {
          return -1;
        }
        if (a.ColumnA.name < b.ColumnA.name) {
          return 1;
        }
        return 0;
      }
      return 0;
    });
    return sortedData.map((dataItem: dataPropTypes) => (
      <FlatTableRow
        key={dataItem.ColumnA.name}
        onClick={() => setPickedUpData(dataItem)}
      >
        <FlatTableCell>
          <Box>{dataItem.ColumnA.name}</Box>
        </FlatTableCell>
        <FlatTableCell>
          {dataItem.ColumnB.map((role) => (
            <Box key={role}>{`${role}, `}</Box>
          ))}
        </FlatTableCell>
      </FlatTableRow>
    ));
  };
  const handleSortChange = () => {
    if (sortType === "ascending") {
      return setSortType("descending");
    }
    return setSortType("ascending");
  };
  return (
    <>
      <StyledDrawer
        expandedWidth="50%"
        animationDuration="0.5s"
        sidebarAriaLabel="side view navigation"
        expanded={isExpanded}
        onChange={onChangeHandler}
        sidebar={
          <Box>
            <NavigationContainer>
              <Search value="" placeholder="Search" searchWidth="40%" />
              <PopoverContainer
                title="Filter"
                renderOpenComponent={({ id }) => {
                  return (
                    <Button
                      buttonType={isFilterOpen ? "primary" : "tertiary"}
                      onClick={handleOpenFilterClick}
                      iconType={isFilterOpen ? "close" : "filter_new"}
                      iconPosition="after"
                      id={id}
                    >
                      Filter
                    </Button>
                  );
                }}
                renderCloseComponent={() => {
                  return <></>;
                }}
                open={isFilterOpen}
              >
                This is example component of Popover Container
              </PopoverContainer>
              <Button onClick={handleDialogOpen} ml="auto" buttonType="primary">
                Add User
              </Button>
            </NavigationContainer>
            <FlatTable colorTheme="transparent-white">
              <FlatTableHead>
                <FlatTableRow>
                  <FlatTableHeader key="user">
                    <Sort sortType={sortType} onClick={handleSortChange}>
                      Column A
                    </Sort>
                  </FlatTableHeader>
                  <FlatTableHeader key="roles">Column B</FlatTableHeader>
                </FlatTableRow>
              </FlatTableHead>
              <FlatTableBody>{createBodyData(sortType)}</FlatTableBody>
            </FlatTable>
          </Box>
        }
      >
        {showPickedUpData(pickedUpData)}
      </StyledDrawer>
      <DialogFullScreen
        onCancel={() => setIsDialogOpen(false)}
        open={isDialogOpen}
      >
        Content of DialogFullScreen
      </DialogFullScreen>
    </>
  );
};
SideViewNavigation.storyName = "Side View Navigation";

export const WithTabControls: Story = () => {
  const [active, setActive] = useState("tab-1");
  const [errors, setErrors] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  const [warnings, setWarnings] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  const [infos, setInfos] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  const validationStatus = {
    "tab-1": { error: errors.one, warning: warnings.one, info: infos.one },
    "tab-2": { error: errors.two, warning: warnings.two, info: infos.two },
    "tab-3": {
      error: errors.three,
      warning: warnings.three,
      info: infos.three,
    },
    "tab-4": {
      error: errors.four,
      warning: warnings.four,
      info: infos.four,
    },
  };
  return (
    <Box height="200px">
      <Drawer
        expandedWidth="30%"
        sidebarAriaLabel="with tab controls"
        sidebar={
          <Tabs
            onTabChange={(id) => setActive(id)}
            borders="no sides"
            validationStatusOverride={validationStatus}
          >
            <Tab
              errorMessage="error"
              warningMessage="warning"
              infoMessage="info"
              title="Tab 1"
              tabId="tab-1"
            />
            <Tab
              errorMessage="error"
              warningMessage="warning"
              infoMessage="info"
              title="Tab 2"
              tabId="tab-2"
            />
            <Tab
              errorMessage="error"
              warningMessage="warning"
              infoMessage="info"
              title="Tab 3"
              tabId="tab-3"
            />
            <Tab
              errorMessage="error"
              warningMessage="warning"
              infoMessage="info"
              title="Tab 4"
              tabId="tab-4"
            />
            <Tab
              errorMessage="error"
              warningMessage="warning"
              infoMessage="info"
              title="Tab 5"
              tabId="tab-5"
            />
            <Tab
              errorMessage="error"
              warningMessage="warning"
              infoMessage="info"
              title="Tab 6"
              tabId="tab-6"
            />
          </Tabs>
        }
      >
        <Box p={1}>
          <Box display={active === "tab-1" ? "block" : "none"}>
            <Tabs extendedLine={false}>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 1"
                tabId="tab-1-child-1"
              >
                Content 1
              </Tab>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 2"
                tabId="tab-1-child-2"
              >
                Content 2
              </Tab>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 3"
                tabId="tab-1-child-3"
              >
                Content 3
              </Tab>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 4"
                tabId="tab-1-child-4"
              >
                Content 4
              </Tab>
            </Tabs>
          </Box>
          <Box display={active === "tab-2" ? "block" : "none"}>
            <Tabs extendedLine={false}>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 1"
                tabId="tab-2-child-1"
              >
                Content 5
              </Tab>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 2"
                tabId="tab-2-child-2"
              >
                Content 6
              </Tab>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 3"
                tabId="tab-2-child-3"
              >
                Content 7
              </Tab>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 4"
                tabId="tab-2-child-4"
              >
                Content 8
              </Tab>
            </Tabs>
          </Box>
          <Box display={active === "tab-3" ? "block" : "none"}>
            <Tabs extendedLine={false}>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 1"
                tabId="tab-3-child-1"
              >
                Content 9
              </Tab>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 2"
                tabId="tab-3-child-2"
              >
                Content 10
              </Tab>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 3"
                tabId="tab-3-child-3"
              >
                Content 11
              </Tab>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 4"
                tabId="tab-3-child-4"
              >
                Content 12
              </Tab>
            </Tabs>
          </Box>
          <Box display={active === "tab-4" ? "block" : "none"} padding="4px">
            <Checkbox
              label="Add error"
              error={errors.four}
              onChange={() => setErrors({ ...errors, four: !errors.four })}
            />
            <Checkbox
              label="Add warning"
              warning={warnings.four}
              onChange={() =>
                setWarnings({ ...warnings, four: !warnings.four })
              }
            />
            <Checkbox
              label="Add info"
              info={infos.four}
              onChange={() => setInfos({ ...infos, four: !infos.four })}
            />
          </Box>
          <Box display={active === "tab-5" ? "block" : "none"}>
            <Tabs extendedLine={false}>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 1"
                tabId="tab-5-child-1"
              >
                Content 13
              </Tab>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 2"
                tabId="tab-5-child-2"
              >
                Content 14
              </Tab>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 3"
                tabId="tab-5-child-3"
              >
                Content 15
              </Tab>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 4"
                tabId="tab-5-child-4"
              >
                Content 16
              </Tab>
            </Tabs>
          </Box>
          <Box display={active === "tab-6" ? "block" : "none"}>
            <Tabs extendedLine={false}>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 1"
                tabId="tab-6-child-1"
              >
                Content 17
              </Tab>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 2"
                tabId="tab-6-child-2"
              >
                Content 18
              </Tab>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 3"
                tabId="tab-6-child-3"
              >
                Content 19
              </Tab>
              <Tab
                errorMessage="error"
                warningMessage="warning"
                infoMessage="info"
                title="Tab 4"
                tabId="tab-6-child-4"
              >
                Content 20
              </Tab>
            </Tabs>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
WithTabControls.storyName = "With Tab Controls";
