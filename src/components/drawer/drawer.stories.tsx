import React, { useCallback, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "../checkbox";
import Drawer, { DrawerProps } from ".";
import Button from "../button";
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableCell,
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
    controls: {
      exclude: ["title", "footer", "sidebar", "onChange"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = (args: DrawerProps) => (
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
Default.storyName = "Default";
Default.args = {
  expandedWidth: "40%",
  animationDuration: "0.5s",
  sidebarAriaLabel: "default",
  expanded: true,
};

export const CustomHeight: Story = (args: DrawerProps) => (
  <Drawer
    height="230px"
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
  expanded: true,
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
  expanded: true,
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
  expanded: true,
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
  expanded: true,
};

export const Title: Story = (args: DrawerProps) => (
  <Box height="200px">
    <Drawer
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
Title.args = {
  expandedWidth: "40%",
  animationDuration: "0.5s",
  expanded: true,
};

export const WithSidebarAriaLabel: Story = (args: DrawerProps) => (
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
WithSidebarAriaLabel.storyName = "Sidebar Aria Label";
WithSidebarAriaLabel.args = {
  expandedWidth: "40%",
  animationDuration: "0.5s",
  sidebarAriaLabel: "sidebar aria label",
  expanded: true,
};

export const WithControls: Story = (args: DrawerProps) => (
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
WithControls.storyName = "With Controls";
WithControls.args = {
  expandedWidth: "40%",
  animationDuration: "0.5s",
  sidebarAriaLabel: "with controls",
  showControls: true,
  expanded: true,
};

export const WithStickyHeader: Story = (args: DrawerProps) => (
  <Box height="400px">
    <Drawer
      title={<Typography variant="h2">Sticky Header</Typography>}
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
      {...args}
    >
      content body content body content body content body content body content
      body content body
    </Drawer>
  </Box>
);
WithStickyHeader.storyName = "With Sticky Header";
WithStickyHeader.args = {
  expandedWidth: "40%",
  animationDuration: "0.5s",
  stickyHeader: true,
  showControls: true,
  expanded: true,
};

export const WithFooter: Story = (args: DrawerProps) => (
  <Box height="400px">
    <Drawer
      title={<Typography variant="h2">With Footer</Typography>}
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
      {...args}
    >
      content body content body content body content body content body content
      body content body
    </Drawer>
  </Box>
);
WithFooter.storyName = "With Footer";
WithFooter.args = {
  expandedWidth: "40%",
  animationDuration: "0.5s",
  stickyHeader: true,
  showControls: true,
  expanded: true,
};

export const WithStickyFooter: Story = (args: DrawerProps) => (
  <Box height="400px">
    <Drawer
      title={<Typography variant="h2">Sticky Footer</Typography>}
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
      {...args}
    >
      content body content body content body content body content body content
      body content body
    </Drawer>
  </Box>
);
WithStickyFooter.storyName = "With Sticky Footer";
WithStickyFooter.args = {
  expandedWidth: "40%",
  animationDuration: "0.5s",
  stickyHeader: true,
  stickyFooter: true,
  showControls: true,
  expanded: true,
};

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
            title="Custom Sidebar - FlatTable component as sidebar content"
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
  expanded: true,
};

export const CustomContent: Story = (args: DrawerProps) => (
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
      <FlatTable title="Table for Custom Content - FlatTable component as drawer content">
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
  sidebarAriaLabel: "custom content",
  expanded: true,
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

export const Controlled: Story = () => {
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
          expandedWidth="40%"
          animationDuration="0.5s"
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
Controlled.storyName = "Controlled";

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
