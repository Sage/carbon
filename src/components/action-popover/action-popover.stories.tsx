import React, { useRef } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
  RenderButtonProps,
  ActionPopoverHandle,
} from ".";
import Box from "../box";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from "../table";
import { Accordion } from "../accordion";
import Button from "../button/__next__";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

type PlaygroundArgs = React.ComponentProps<typeof ActionPopover> & {
  showIcons: boolean;
  disabledItems: boolean;
  showSubmenu: boolean;
  disabledSubmenu: boolean;
  additionalOptions: boolean;
  download: boolean;
};

const meta: Meta<PlaygroundArgs> = {
  title: "Action Popover",
  component: ActionPopover,
  argTypes: {
    ...styledSystemProps,
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    rightAlignMenu: { control: "boolean" },
    buttonLabel: { control: "text" },
    showIcons: {
      control: "boolean",
      description: "Show icons on the example's menu items.",
      table: { category: "Menu items" },
    },
    disabledItems: {
      control: "boolean",
      description: "Disable the delete action and the CSV submenu item.",
      table: { category: "Menu items" },
    },
    showSubmenu: {
      control: "boolean",
      description: "Include a print action with a submenu.",
      table: { category: "Menu items" },
    },
    disabledSubmenu: {
      control: "boolean",
      description: "Disable the parent item to prevent its submenu opening.",
      if: { arg: "showSubmenu", truthy: true },
      table: { category: "Menu items" },
    },
    additionalOptions: {
      control: "boolean",
      description: "Include a less frequent action separated by a divider.",
      table: { category: "Menu items" },
    },
    download: {
      control: "boolean",
      description: "Include a download link using the href and download props.",
      table: { category: "Menu items" },
    },
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

export default meta;
type Story = StoryObj<typeof ActionPopover>;

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    size: "medium",
    rightAlignMenu: false,
    showIcons: true,
    disabledItems: true,
    showSubmenu: true,
    disabledSubmenu: false,
    additionalOptions: true,
    download: true,
  },
  parameters: {
    controls: {
      include: [
        "size",
        "rightAlignMenu",
        "buttonLabel",
        "showIcons",
        "disabledItems",
        "showSubmenu",
        "disabledSubmenu",
        "additionalOptions",
        "download",
      ],
    },
  },
  render: ({
    showIcons,
    disabledItems,
    showSubmenu,
    disabledSubmenu,
    additionalOptions,
    download,
    ...args
  }) => (
    <Box height={400}>
      <ActionPopover {...args}>
        <ActionPopoverItem icon={showIcons ? "email" : undefined}>
          Email invoice
        </ActionPopoverItem>
        {showSubmenu && (
          <ActionPopoverItem
            icon={showIcons ? "print" : undefined}
            disabled={disabledSubmenu}
            submenu={
              <>
                <ActionPopoverItem icon={showIcons ? "pdf" : undefined}>
                  PDF
                </ActionPopoverItem>
                <ActionPopoverItem
                  icon={showIcons ? "csv" : undefined}
                  disabled={disabledItems}
                >
                  CSV
                </ActionPopoverItem>
              </>
            }
          >
            Print invoice
          </ActionPopoverItem>
        )}
        {download && (
          <ActionPopoverItem
            icon={showIcons ? "download" : undefined}
            href="data:text/csv;charset=utf-8,Invoice%2CAmount%0A123%2C100"
            download
          >
            Download invoice
          </ActionPopoverItem>
        )}
        <ActionPopoverItem
          icon={showIcons ? "delete" : undefined}
          disabled={disabledItems}
        >
          Delete invoice
        </ActionPopoverItem>
        {additionalOptions && <ActionPopoverDivider />}
        {additionalOptions && (
          <ActionPopoverItem icon={showIcons ? "settings" : undefined}>
            Manage invoices
          </ActionPopoverItem>
        )}
      </ActionPopover>
    </Box>
  ),
};

export const Default: Story = () => {
  const submenu = (
    <>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 1</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 2</ActionPopoverItem>
      <ActionPopoverItem disabled onClick={() => {}}>
        Sub Menu 3
      </ActionPopoverItem>
    </>
  );
  const submenuWithIcons = (
    <>
      <ActionPopoverItem icon="graph" onClick={() => {}}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem icon="add" onClick={() => {}}>
        Sub Menu 2
      </ActionPopoverItem>
      <ActionPopoverItem icon="print" disabled onClick={() => {}}>
        Sub Menu 3
      </ActionPopoverItem>
    </>
  );
  return (
    <Box mt={40} height={275}>
      <ActionPopover mb={1} onOpen={() => {}} onClose={() => {}}>
        <ActionPopoverItem
          disabled
          icon="graph"
          submenu={submenu}
          onClick={() => {}}
        >
          Business
        </ActionPopoverItem>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverItem icon="print" onClick={() => {}} submenu={submenu}>
          Print Invoice
        </ActionPopoverItem>
        <ActionPopoverItem icon="pdf" submenu={submenu} onClick={() => {}}>
          Download PDF
        </ActionPopoverItem>
        <ActionPopoverItem icon="csv" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem disabled icon="delete" onClick={() => {}}>
          Delete
        </ActionPopoverItem>
      </ActionPopover>
      <ActionPopover mb={1}>
        <ActionPopoverItem icon="csv" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>
      </ActionPopover>
      <ActionPopover>
        <ActionPopoverItem
          icon="csv"
          submenu={submenuWithIcons}
          onClick={() => {}}
        >
          Download CSV
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};
Default.storyName = "Default";

const renderSizeExample: NonNullable<Story["render"]> = (args) => (
  <Box height={350}>
    <ActionPopover {...args}>
      <ActionPopoverItem icon="email">Email invoice</ActionPopoverItem>
      <ActionPopoverItem
        icon="print"
        submenu={
          <>
            <ActionPopoverItem icon="print">Print invoice</ActionPopoverItem>
            <ActionPopoverItem icon="pdf">Download PDF</ActionPopoverItem>
            <ActionPopoverItem disabled>Print receipt</ActionPopoverItem>
          </>
        }
      >
        Print options
      </ActionPopoverItem>
      <ActionPopoverDivider />
      <ActionPopoverItem icon="delete" disabled>
        Delete invoice
      </ActionPopoverItem>
    </ActionPopover>
  </Box>
);

export const Small: Story = {
  args: { size: "small" },
  render: renderSizeExample,
};

export const Medium: Story = {
  args: { size: "medium" },
  render: renderSizeExample,
};

export const Large: Story = {
  args: { size: "large" },
  render: renderSizeExample,
};

export const MenuRightAligned: Story = () => {
  return (
    <Box height={250}>
      <ActionPopover rightAlignMenu>
        <ActionPopoverItem icon="email" disabled onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};
MenuRightAligned.storyName = "Menu Right Aligned";

export const CustomMenuButton: Story = () => {
  return (
    <Box height={250}>
      <ActionPopover
        renderButton={({ "data-element": dataElement, ariaAttributes }) => (
          <Button
            variantType="tertiary"
            iconType="dropdown"
            iconPosition="after"
            size="small"
            data-element={dataElement}
            {...ariaAttributes}
          >
            More
          </Button>
        )}
      >
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};
CustomMenuButton.storyName = "Custom Menu Button";

export const KeyboardNavigation: Story = () => {
  return (
    <Box height={250}>
      <ActionPopover>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverItem disabled icon="csv" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>
        <ActionPopoverItem icon="pdf" onClick={() => {}}>
          Download PDF
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};
KeyboardNavigation.storyName = "Keyboard Navigation";

export const InOverflowHiddenContainer: Story = () => {
  return (
    <Box mt={40} height={275} maxWidth={800}>
      <Accordion title="Heading">
        <Box m={2}>
          <ActionPopover>
            <ActionPopoverItem onClick={() => {}}>
              Enroll Device
            </ActionPopoverItem>
            <ActionPopoverItem onClick={() => {}}>
              Assign Owner
            </ActionPopoverItem>
            <ActionPopoverDivider />
            <ActionPopoverItem onClick={() => {}}>
              Manage Devices
            </ActionPopoverItem>
          </ActionPopover>
          <ActionPopover>
            <ActionPopoverItem onClick={() => {}}>
              Enroll Device
            </ActionPopoverItem>
            <ActionPopoverItem onClick={() => {}}>
              Assign Owner
            </ActionPopoverItem>
            <ActionPopoverDivider />
            <ActionPopoverItem onClick={() => {}}>
              Manage Devices
            </ActionPopoverItem>
          </ActionPopover>
          <ActionPopover>
            <ActionPopoverItem onClick={() => {}}>
              Enroll Device
            </ActionPopoverItem>
            <ActionPopoverItem onClick={() => {}}>
              Assign Owner
            </ActionPopoverItem>
            <ActionPopoverDivider />
            <ActionPopoverItem onClick={() => {}}>
              Manage Devices
            </ActionPopoverItem>
          </ActionPopover>
        </Box>
      </Accordion>
    </Box>
  );
};
InOverflowHiddenContainer.storyName = "In Overflow Hidden Container";

export const InTable: Story = () => {
  return (
    <Box pt={120} height={250}>
      <Table size="small">
        <TableHead>
          <TableRow id="header-row-in-table">
            <TableHeader>Name</TableHeader>
            <TableHeader>Location</TableHeader>
            <TableHeader>Relationship Status</TableHeader>
            <TableHeader width="60px">Dependents</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow id="row-1-in-table">
            <TableCell>John Doe</TableCell>
            <TableCell>London</TableCell>
            <TableCell>Single</TableCell>
            <TableCell>
              <ActionPopover
                renderButton={({
                  "data-element": dataElement,
                  ariaAttributes,
                }: RenderButtonProps) => (
                  <Button
                    data-element={dataElement}
                    size="xs"
                    {...ariaAttributes}
                  >
                    Actions
                  </Button>
                )}
              >
                <ActionPopoverItem
                  icon="print"
                  onClick={() => {}}
                  submenu={
                    <>
                      <ActionPopoverItem onClick={() => {}}>
                        CSV
                      </ActionPopoverItem>
                      <ActionPopoverItem onClick={() => {}}>
                        PDF
                      </ActionPopoverItem>
                    </>
                  }
                >
                  Print
                </ActionPopoverItem>
                <ActionPopoverDivider />
                <ActionPopoverItem onClick={() => {}} icon="delete">
                  Delete
                </ActionPopoverItem>
              </ActionPopover>
            </TableCell>
          </TableRow>
          <TableRow id="row-2-in-table">
            <TableCell>Jane Doe</TableCell>
            <TableCell>York</TableCell>
            <TableCell>Married</TableCell>
            <TableCell>
              <ActionPopover
                renderButton={({
                  "data-element": dataElement,
                  ariaAttributes,
                }: RenderButtonProps) => (
                  <Button
                    data-element={dataElement}
                    size="xs"
                    {...ariaAttributes}
                  >
                    Actions
                  </Button>
                )}
              >
                <ActionPopoverItem
                  icon="print"
                  onClick={() => {}}
                  submenu={
                    <>
                      <ActionPopoverItem onClick={() => {}}>
                        CSV
                      </ActionPopoverItem>
                      <ActionPopoverItem onClick={() => {}}>
                        PDF
                      </ActionPopoverItem>
                    </>
                  }
                >
                  Print
                </ActionPopoverItem>
                <ActionPopoverDivider />
                <ActionPopoverItem onClick={() => {}} icon="delete">
                  Delete
                </ActionPopoverItem>
              </ActionPopover>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};
InTable.storyName = "In Table";

export const FocusButtonProgrammatically = () => {
  const ref = useRef<ActionPopoverHandle>(null);
  const refMore = useRef<ActionPopoverHandle>(null);

  const renderButton = ({
    "data-element": dataElement,
    ariaAttributes,
  }: RenderButtonProps) => (
    <Button
      variantType="tertiary"
      iconType="ellipsis_vertical"
      iconPosition="after"
      size="small"
      aria-label={undefined}
      data-element={dataElement}
      {...ariaAttributes}
    >
      More
    </Button>
  );

  return (
    <>
      <Button
        onClick={() => {
          ref.current?.focusButton();
        }}
      >
        Focus
      </Button>
      <ActionPopover ref={ref}>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>

      <Button
        onClick={() => {
          refMore.current?.focusButton();
        }}
      >
        Focus More
      </Button>
      <ActionPopover renderButton={renderButton} ref={refMore} mt={3}>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </>
  );
};
FocusButtonProgrammatically.storyName = "Focus Button Programmatically";
