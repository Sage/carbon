/* eslint-disable react/prop-types */
import React from "react";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/test";

import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
  ActionPopoverMenu,
  ActionPopoverProps,
} from ".";
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableCell,
} from "../flat-table";
import styledSystemProps from "../../../.storybook/utils/styled-system-props";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";
import Box from "../box";

export default {
  title: "Action Popover/Test",
  includeStories: [
    "Default",
    "LongMenuExample",
    "ActionPopoverClick",
    "ActionPopoverSubmenuClick",
    "ActionPopoverKeyboard",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Default = () => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem onClick={action("sub menu 1")}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem onClick={action("sub menu 2")}>
        Sub Menu 2
      </ActionPopoverItem>
      <ActionPopoverItem disabled onClick={action("sub menu 3")}>
        Sub Menu 3
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );
  const submenuWithIcons = (
    <ActionPopoverMenu>
      <ActionPopoverItem icon="graph" onClick={action("sub menu 1")}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem icon="add" onClick={action("sub menu 2")}>
        Sub Menu 2
      </ActionPopoverItem>
      <ActionPopoverItem icon="print" disabled onClick={action("sub menu 3")}>
        Sub Menu 3
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );
  return (
    <div style={{ marginTop: "40px", height: "275px" }}>
      <FlatTable isZebra>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>First Name</FlatTableHeader>
            <FlatTableHeader>Last Name</FlatTableHeader>
            <FlatTableHeader>Options</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>John</FlatTableCell>
            <FlatTableCell>Doe</FlatTableCell>
            <FlatTableCell>
              <ActionPopover
                onOpen={action("popover opened")}
                onClose={action("popover closed")}
              >
                <ActionPopoverItem
                  disabled
                  icon="graph"
                  submenu={submenu}
                  onClick={action("email")}
                >
                  Business
                </ActionPopoverItem>
                <ActionPopoverItem icon="email" onClick={action("email")}>
                  Email Invoice
                </ActionPopoverItem>
                <ActionPopoverItem
                  icon="print"
                  onClick={action("print")}
                  submenu={submenu}
                >
                  Print Invoice
                </ActionPopoverItem>
                <ActionPopoverItem
                  icon="pdf"
                  submenu={submenu}
                  onClick={action("pdf")}
                >
                  Download PDF
                </ActionPopoverItem>
                <ActionPopoverItem icon="csv" onClick={action("csv")}>
                  Download CSV
                </ActionPopoverItem>
                <ActionPopoverDivider />
                <ActionPopoverItem icon="delete" onClick={action("delete")}>
                  Delete
                </ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jane</FlatTableCell>
            <FlatTableCell>Smith</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem icon="csv" onClick={action("csv")}>
                  Download CSV
                </ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Bob</FlatTableCell>
            <FlatTableCell>Jones</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem
                  icon="csv"
                  submenu={submenuWithIcons}
                  onClick={action("csv")}
                >
                  Download CSV
                </ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </div>
  );
};

Default.storyName = "default";

export const ActionPopoverCustom = ({ ...props }) => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem data-element="submenu1" {...props}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem {...props}>Sub Menu 2</ActionPopoverItem>
      <ActionPopoverItem disabled>Sub Menu 3</ActionPopoverItem>
    </ActionPopoverMenu>
  );

  const submenuWithIcons = (
    <ActionPopoverMenu>
      <ActionPopoverItem icon="graph">Sub Menu 1</ActionPopoverItem>
      <ActionPopoverItem icon="add">Sub Menu 2</ActionPopoverItem>
      <ActionPopoverItem icon="print" disabled>
        Sub Menu 3
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );

  return (
    <div
      style={{
        marginTop: "40px",
        height: "275px",
      }}
    >
      <FlatTable isZebra>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>First Name</FlatTableHeader>
            <FlatTableHeader>Last Name</FlatTableHeader>
            <FlatTableHeader>Options</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>John</FlatTableCell>
            <FlatTableCell>Doe</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem
                  disabled
                  icon="graph"
                  submenu={submenu}
                  {...props}
                >
                  Business
                </ActionPopoverItem>
                <ActionPopoverItem icon="email" {...props}>
                  Email Invoice
                </ActionPopoverItem>
                <ActionPopoverItem icon="print" {...props} submenu={submenu}>
                  Print Invoice
                </ActionPopoverItem>
                <ActionPopoverItem icon="pdf" {...props} submenu={submenu}>
                  Download PDF
                </ActionPopoverItem>
                <ActionPopoverItem icon="csv" {...props}>
                  Download CSV
                </ActionPopoverItem>
                <ActionPopoverDivider />
                <ActionPopoverItem icon="delete" {...props}>
                  Delete
                </ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jane</FlatTableCell>
            <FlatTableCell>Smith</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem
                  download
                  {...props}
                  icon="download"
                  href="example-img.jpg"
                >
                  Download
                </ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Bob</FlatTableCell>
            <FlatTableCell>Jones</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem
                  icon="csv"
                  {...props}
                  submenu={submenuWithIcons}
                >
                  Download CSV
                </ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </div>
  );
};

export const ActionPopoverWithProps = ({ ...props }) => {
  return (
    <div
      style={{
        height: "250px",
      }}
    >
      <FlatTable>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>First Name</FlatTableHeader>
            <FlatTableHeader>Last Name</FlatTableHeader>
            <FlatTableHeader>Third Column</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>John</FlatTableCell>
            <FlatTableCell>Doe</FlatTableCell>
            <FlatTableCell>
              <ActionPopover {...props}>
                <ActionPopoverItem
                  data-element="menu-item1"
                  icon="email"
                  disabled
                  onClick={() => {}}
                >
                  Email Invoice
                </ActionPopoverItem>
                <ActionPopoverDivider />
                <ActionPopoverItem
                  data-element="menu-item2"
                  onClick={() => {}}
                  icon="delete"
                >
                  Delete
                </ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </div>
  );
};

export const ActionPopoverWithNoIconsOrSubmenus = ({ ...props }) => (
  <ActionPopover {...props}>
    <ActionPopoverItem onClick={() => {}}>Business</ActionPopoverItem>
    <ActionPopoverItem onClick={() => {}}>Email Invoice</ActionPopoverItem>
    <ActionPopoverItem onClick={() => {}}>Print Invoice</ActionPopoverItem>
    <ActionPopoverItem onClick={() => {}}>Download PDF</ActionPopoverItem>
    <ActionPopoverItem onClick={() => {}}>Download CSV</ActionPopoverItem>
    <ActionPopoverDivider />
    <ActionPopoverItem onClick={() => {}}>Delete</ActionPopoverItem>
    <ActionPopoverItem onClick={() => {}}>Return Home</ActionPopoverItem>
  </ActionPopover>
);

export const ActionPopoverWithSomeSubmenusAndNoIcons = ({ ...props }) => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem data-element="submenu1" icon="bin" onClick={() => {}}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem data-element="submenu2" onClick={() => {}}>
        Sub Menu 2
      </ActionPopoverItem>
      <ActionPopoverItem data-element="submenu3" onClick={() => {}}>
        Sub Menu 3
      </ActionPopoverItem>
      <ActionPopoverItem data-element="submenu4" onClick={() => {}}>
        Sub Menu 4
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );

  return (
    <ActionPopover {...props}>
      <ActionPopoverItem onClick={() => {}}>Business</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Email Invoice
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Print Invoice</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Download PDF</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Download CSV
      </ActionPopoverItem>
      <ActionPopoverDivider />
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Delete
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Return Home
      </ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverWithSubmenusAndNoIcons = ({ ...props }) => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem data-element="submenu1" icon="bin" onClick={() => {}}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem data-element="submenu2" onClick={() => {}}>
        Sub Menu 2
      </ActionPopoverItem>
      <ActionPopoverItem data-element="submenu3" onClick={() => {}}>
        Sub Menu 3
      </ActionPopoverItem>
      <ActionPopoverItem data-element="submenu4" onClick={() => {}}>
        Sub Menu 4
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );

  return (
    <ActionPopover {...props}>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Business
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Email Invoice
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Print Invoice
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Download PDF
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Download CSV
      </ActionPopoverItem>
      <ActionPopoverDivider />
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Delete
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Return Home
      </ActionPopoverItem>
    </ActionPopover>
  );
};
export const ActionPopoverWithIconsAndNoSubmenus = ({ ...props }) => (
  <ActionPopover {...props}>
    <ActionPopoverItem icon="graph" onClick={() => {}}>
      Business
    </ActionPopoverItem>
    <ActionPopoverItem icon="email" onClick={() => {}}>
      Email Invoice
    </ActionPopoverItem>
    <ActionPopoverItem icon="print" onClick={() => {}}>
      Print Invoice
    </ActionPopoverItem>
    <ActionPopoverItem icon="pdf" onClick={() => {}}>
      Download PDF
    </ActionPopoverItem>
    <ActionPopoverItem icon="csv" onClick={() => {}}>
      Download CSV
    </ActionPopoverItem>
    <ActionPopoverDivider />
    <ActionPopoverItem icon="delete" onClick={() => {}}>
      Delete
    </ActionPopoverItem>
    <ActionPopoverItem icon="home" onClick={() => {}}>
      Return Home
    </ActionPopoverItem>
  </ActionPopover>
);

export const ActionPopoverWithSubmenusAndIcons = ({ ...props }) => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem icon="bin" onClick={() => {}}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 2</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 3</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 4</ActionPopoverItem>
    </ActionPopoverMenu>
  );

  return (
    <ActionPopover {...props}>
      <ActionPopoverItem
        data-element="menu-item1"
        icon="graph"
        onClick={() => {}}
        submenu={submenu}
      >
        Business
      </ActionPopoverItem>
      <ActionPopoverItem icon="email" onClick={() => {}} submenu={submenu}>
        Email Invoice
      </ActionPopoverItem>
      <ActionPopoverItem icon="print" onClick={() => {}} submenu={submenu}>
        Print Invoice
      </ActionPopoverItem>
      <ActionPopoverItem icon="pdf" onClick={() => {}} submenu={submenu}>
        Download PDF
      </ActionPopoverItem>
      <ActionPopoverItem icon="csv" onClick={() => {}} submenu={submenu}>
        Download CSV
      </ActionPopoverItem>
      <ActionPopoverDivider />
      <ActionPopoverItem icon="delete" onClick={() => {}} submenu={submenu}>
        Delete
      </ActionPopoverItem>
      <ActionPopoverItem icon="home" onClick={() => {}} submenu={submenu}>
        Return Home
      </ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverWithIconsAndSomeSubmenus = ({ ...props }) => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem icon="bin" onClick={() => {}}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 2</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 3</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 4</ActionPopoverItem>
    </ActionPopoverMenu>
  );

  return (
    <ActionPopover {...props}>
      <ActionPopoverItem icon="graph" onClick={() => {}}>
        Business
      </ActionPopoverItem>
      <ActionPopoverItem icon="email" onClick={() => {}}>
        Email Invoice
      </ActionPopoverItem>
      <ActionPopoverItem icon="print" onClick={() => {}}>
        Print Invoice
      </ActionPopoverItem>
      <ActionPopoverItem icon="pdf" onClick={() => {}}>
        Download PDF
      </ActionPopoverItem>
      <ActionPopoverItem icon="csv" onClick={() => {}} submenu={submenu}>
        Download CSV
      </ActionPopoverItem>
      <ActionPopoverDivider />
      <ActionPopoverItem icon="delete" onClick={() => {}} submenu={submenu}>
        Delete
      </ActionPopoverItem>
      <ActionPopoverItem icon="home" onClick={() => {}} submenu={submenu}>
        Return Home
      </ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverWithSubmenusAndSomeIcons = ({ ...props }) => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem icon="bin" onClick={() => {}}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 2</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 3</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 4</ActionPopoverItem>
    </ActionPopoverMenu>
  );

  return (
    <ActionPopover {...props}>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Business
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Email Invoice
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Print Invoice
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Download PDF
      </ActionPopoverItem>
      <ActionPopoverItem icon="csv" onClick={() => {}} submenu={submenu}>
        Download CSV
      </ActionPopoverItem>
      <ActionPopoverDivider />
      <ActionPopoverItem icon="delete" onClick={() => {}} submenu={submenu}>
        Delete
      </ActionPopoverItem>
      <ActionPopoverItem icon="home" onClick={() => {}} submenu={submenu}>
        Return Home
      </ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverWithVariableChildren = ({ ...props }) => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem icon="bin" onClick={() => {}}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 2</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 3</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 4</ActionPopoverItem>
    </ActionPopoverMenu>
  );

  return (
    <ActionPopover {...props}>
      <ActionPopoverItem onClick={() => {}}>Business</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Email Invoice</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Print Invoice</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Download PDF</ActionPopoverItem>
      <ActionPopoverItem icon="csv" onClick={() => {}} submenu={submenu}>
        Download CSV
      </ActionPopoverItem>
      <ActionPopoverDivider />
      <ActionPopoverItem icon="delete" onClick={() => {}} submenu={submenu}>
        Delete
      </ActionPopoverItem>
      <ActionPopoverItem icon="home" onClick={() => {}} submenu={submenu}>
        Return Home
      </ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverMenuWithProps = ({ ...props }) => {
  return (
    <ActionPopover>
      <ActionPopoverItem
        submenu={
          <ActionPopoverMenu {...props}>
            <ActionPopoverItem icon="graph">Sub Menu 1</ActionPopoverItem>
            <ActionPopoverItem icon="add">Sub Menu 2</ActionPopoverItem>
            <ActionPopoverItem icon="print" disabled>
              Sub Menu 3
            </ActionPopoverItem>
            <ActionPopoverItem icon="bin">Sub Menu 4</ActionPopoverItem>
          </ActionPopoverMenu>
        }
      >
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem>Sub Menu 2</ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverPropsComponent = (
  props: Partial<ActionPopoverProps>,
) => {
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem>Sub Menu 1</ActionPopoverItem>
      <ActionPopoverItem>Sub Menu 2</ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverPropsComponentWithFirstAndLastDisabled = (
  props: Partial<ActionPopoverProps>,
) => {
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem disabled>Item 1</ActionPopoverItem>
      <ActionPopoverItem>Item 2</ActionPopoverItem>
      <ActionPopoverItem>Item 3</ActionPopoverItem>
      <ActionPopoverItem>Item 4</ActionPopoverItem>
      <ActionPopoverItem>Item 5</ActionPopoverItem>
      <ActionPopoverItem>Item 6</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 7</ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverPropsComponentWithOnlyFirstAndLastNotDisabled = (
  props: Partial<ActionPopoverProps>,
) => {
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem>Item 1</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 2</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 3</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 4</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 5</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 6</ActionPopoverItem>
      <ActionPopoverItem>Item 7</ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverPropsComponentWithOnlyFirstDisabled = (
  props: Partial<ActionPopoverProps>,
) => {
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem disabled>Item 1</ActionPopoverItem>
      <ActionPopoverItem>Item 2</ActionPopoverItem>
      <ActionPopoverItem>Item 3</ActionPopoverItem>
      <ActionPopoverItem>Item 4</ActionPopoverItem>
      <ActionPopoverItem>Item 5</ActionPopoverItem>
      <ActionPopoverItem>Item 6</ActionPopoverItem>
      <ActionPopoverItem>Item 7</ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverPropsComponentWithOnlyLastDisabled = (
  props: Partial<ActionPopoverProps>,
) => {
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem>Item 1</ActionPopoverItem>
      <ActionPopoverItem>Item 2</ActionPopoverItem>
      <ActionPopoverItem>Item 3</ActionPopoverItem>
      <ActionPopoverItem>Item 4</ActionPopoverItem>
      <ActionPopoverItem>Item 5</ActionPopoverItem>
      <ActionPopoverItem>Item 6</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 7</ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverPropsComponentWithSomeDisabled = (
  props: Partial<ActionPopoverProps>,
) => {
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem>Item 1</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 2</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 3</ActionPopoverItem>
      <ActionPopoverItem>Item 4</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 5</ActionPopoverItem>
      <ActionPopoverItem>Item 6</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 7</ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverPropsComponentAllDisabled = (
  props: Partial<ActionPopoverProps>,
) => {
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem disabled>Item 1</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 2</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 3</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 4</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 5</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 6</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 7</ActionPopoverItem>
    </ActionPopover>
  );
};

export const LongMenuExample = () => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 1</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 2</ActionPopoverItem>
      <ActionPopoverItem disabled onClick={() => {}}>
        Sub Menu 3
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );
  return (
    <Box mt={60} height={275}>
      <ActionPopover onOpen={() => {}} onClose={() => {}}>
        <ActionPopoverItem
          disabled
          icon="graph"
          submenu={submenu}
          onClick={() => {}}
        >
          Business
        </ActionPopoverItem>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoiceee
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
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoiceee
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
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoiceee
        </ActionPopoverItem>
        <ActionPopoverItem
          data-role="print-invoice"
          icon="print"
          onClick={() => {}}
          submenu={submenu}
        >
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
    </Box>
  );
};

// Play Functions
const meta: Meta<typeof ActionPopover> = {
  title: "ActionPopover",
  component: ActionPopover,
  argTypes: {
    ...styledSystemProps,
  },
};

export { meta };

type Story = StoryObj<typeof ActionPopover>;

const ActionPopoverDefaultComponent = () => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 1</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 2</ActionPopoverItem>
      <ActionPopoverItem disabled onClick={() => {}}>
        Sub Menu 3
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );
  return (
    <Box mt={40} height={275}>
      <ActionPopover onOpen={() => {}} onClose={() => {}}>
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
        <ActionPopoverItem
          data-role="print-invoice"
          icon="print"
          onClick={() => {}}
          submenu={submenu}
        >
          Print Invoice
        </ActionPopoverItem>
        <ActionPopoverItem icon="pdf" submenu={submenu} onClick={() => {}}>
          Download PDF
        </ActionPopoverItem>
        <ActionPopoverItem icon="csv" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem icon="delete" onClick={() => {}}>
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};

export const ActionPopoverClick: Story = {
  render: () => <ActionPopoverDefaultComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const actionPopoverButtons = canvas.getAllByRole("button");
    await userEvent.click(actionPopoverButtons[0]);
  },
};

ActionPopoverClick.storyName = "ActionPopover Click";
ActionPopoverClick.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const ActionPopoverSubmenuClick: Story = {
  render: () => <ActionPopoverDefaultComponent />,
  play: async ({ canvasElement }) => {
    // This is required due to a known issue with the canvasElement not being the parent of the component when a Portal is used.
    // https://github.com/storybookjs/storybook/issues/26963
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const canvas = within(canvasElement.parentElement!);
    const actionPopoverButtons = canvas.getAllByRole("button");
    await userEvent.click(actionPopoverButtons[0]);
    await waitFor(() => userInteractionPause(300));

    const elementWithSubmenu = canvas.getByRole("button", {
      name: "Print Invoice",
    });
    await userEvent.hover(elementWithSubmenu);
  },
  decorators: [
    (StoryToRender) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryToRender />
      </div>
    ),
  ],
};

ActionPopoverSubmenuClick.storyName = "ActionPopover Submenu Click";
ActionPopoverSubmenuClick.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const ActionPopoverKeyboard: Story = {
  render: () => <ActionPopoverDefaultComponent />,
  play: async () => {
    await userEvent.tab();
    await waitFor(() => userInteractionPause(300));
    await userEvent.keyboard("{enter}");
    await waitFor(() => userInteractionPause(300));

    await userEvent.keyboard("{arrowdown}");
    await waitFor(() => userInteractionPause(300));
    await userEvent.keyboard("{arrowright}");
  },
  decorators: [
    (StoryToRender) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryToRender />
      </div>
    ),
  ],
};

ActionPopoverKeyboard.storyName = "ActionPopover Keyboard";
