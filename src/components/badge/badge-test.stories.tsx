import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Badge, { BadgeProps } from ".";
import Box from "../box";
import Button from "../button";
import MultiActionButton from "../multi-action-button";
import SplitButton from "../split-button";
import { Menu, MenuItem } from "../menu";
import Icon from "../icon";
import Portrait from "../portrait";
import { Tabs, Tab } from "../tabs/";
import Typography from "../typography";

const meta: Meta<typeof Badge> = {
  title: "Badge/Test",
  component: Badge,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    counter: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

interface BadgeTestProps extends BadgeProps {
  counterAsString?: string;
  counterAsNumber?: number;
}

export const Default = ({
  counterAsString,
  counterAsNumber,
  ...args
}: BadgeTestProps) => {
  return (
    <Box p={3} backgroundColor="--colorsUtilityMajor025">
      <Badge mr={2} counter={counterAsString} {...args} />
      <Badge counter={counterAsNumber} {...args} />
    </Box>
  );
};
Default.args = {
  counterAsString: "99+",
  counterAsNumber: 99,
};

export const WithOtherButtons: Story = ({ ...args }) => {
  return (
    <>
      <Badge {...args}>
        <MultiActionButton text="Multi action">
          <Button onClick={() => {}}>Action</Button>
          <Button onClick={() => {}}>Action</Button>
        </MultiActionButton>
      </Badge>

      <Badge {...args}>
        <SplitButton text="Split button">
          <Button href="#">Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </SplitButton>
      </Badge>
    </>
  );
};
WithOtherButtons.args = { counter: 2 };
WithOtherButtons.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const SizesWithChildren: Story = ({ ...args }) => {
  return (
    <Box m={2} display="flex" gap={2}>
      <Badge id="badge-small" size="small" {...args}>
        <Button buttonType="secondary" aria-describedby="badge-small">
          Filter
        </Button>
      </Badge>
      <Badge id="badge-medium" size="medium" {...args}>
        <Button buttonType="secondary" aria-describedby="badge-medium">
          Filter
        </Button>
      </Badge>
      <Badge id="badge-large" size="large" {...args}>
        <Button buttonType="secondary" aria-describedby="badge-large">
          Filter
        </Button>
      </Badge>
    </Box>
  );
};
SizesWithChildren.storyName = "Sizes with Children";
SizesWithChildren.args = { counter: 99 };

export const InMenu = ({ ...args }) => {
  return (
    <Menu menuType="black">
      <MenuItem onClick={() => {}}>
        MenuItem
        <Badge ml={1} counter={2} {...args} />
      </MenuItem>
      <MenuItem ariaLabel="Notifications" onClick={() => {}}>
        <Badge size="small" inverse counter={6} {...args}>
          <Icon type="alert" />
        </Badge>
      </MenuItem>
      <MenuItem onClick={() => {}}>
        <Box display="flex" alignItems="center" gap="8px">
          <Badge size="small" inverse counter={6} {...args}>
            <Portrait size="XS" initials="JS" />
          </Badge>
          <Typography m={0} fontWeight="500" fontSize="14px" color="white">
            John Smith
          </Typography>
        </Box>
      </MenuItem>
    </Menu>
  );
};
InMenu.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const InTabs = ({ ...args }) => {
  return (
    <Tabs>
      <Tab
        tabId="tab-1"
        title="Tab 1"
        siblings={<Badge mb="2px" counter={55} {...args} />}
      >
        Content
      </Tab>
      <Tab
        tabId="tab-2"
        title="Tab 2"
        siblings={<Badge mb="2px" counter={555} {...args} />}
      >
        Content
      </Tab>
    </Tabs>
  );
};
InTabs.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};
