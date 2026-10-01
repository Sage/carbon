import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import Badge, { BadgeProps } from ".";
import Box from "../box";
import Button from "../button/__next__";
import MultiActionButton from "../multi-action-button";
import SplitButton from "../split-button";
import { Menu, MenuItem } from "../menu";
import Icon from "../icon";
import Portrait from "../portrait";
import { Tabs, TabList, Tab, TabPanel } from "../tabs/__next__";
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
        <Button variantType="secondary" aria-describedby="badge-small">
          Filter
        </Button>
      </Badge>
      <Badge id="badge-medium" size="medium" {...args}>
        <Button variantType="secondary" aria-describedby="badge-medium">
          Filter
        </Button>
      </Badge>
      <Badge id="badge-large" size="large" {...args}>
        <Button variantType="secondary" aria-describedby="badge-large">
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
          <Typography m={0} variant="p" weight="medium" inverse>
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
      <TabList ariaLabel="Tabs with Badge">
        <Tab
          controls="tab-panel-1"
          id="tab-1"
          label="Tab 1"
          rightSlot={<Badge counter={55} size="large" {...args} />}
        />
        <Tab
          controls="tab-panel-2"
          id="tab-2"
          label="Tab 2"
          rightSlot={<Badge counter={555} size="large" {...args} />}
        />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2" tabId="tab-2">
        <Typography>Content 2</Typography>
      </TabPanel>
    </Tabs>
  );
};
InTabs.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const WithChildren: Story = ({ ...args }) => {
  return (
    <Badge id="badge-button" counter={99} {...args}>
      <Button variantType="secondary" aria-describedby="badge-button">
        Filter
      </Button>
    </Badge>
  );
};
WithChildren.storyName = "With Children";

export const Sizes: Story = ({ ...args }) => {
  return (
    <>
      <Badge id="badge-small" counter={99} size="small" {...args}>
        <Icon type="alert" color="black" />
      </Badge>
      <Badge id="badge-medium" counter={99} size="medium" {...args} />
      <Badge id="badge-large" counter={99} size="large" {...args} />
    </>
  );
};
Sizes.storyName = "Sizes";

export const SubtleVariant: Story = ({ ...args }) => {
  return (
    <>
      <Badge id="badge-subtle-small" counter={99} size="small" {...args}>
        <Icon type="alert" color="black" />
      </Badge>
      <Badge id="badge-subtle-medium" counter={99} size="medium" {...args} />
      <Badge id="badge-subtle-large" counter={99} size="large" {...args} />
    </>
  );
};
SubtleVariant.storyName = "Subtle Variant";
SubtleVariant.args = {
  variant: "subtle",
};

export const Inverse: Story = ({ ...args }) => {
  return (
    <>
      <Badge id="badge-inverse-small" counter={99} size="small" {...args}>
        <Icon type="alert" color="white" />
      </Badge>
      <Badge id="badge-inverse-medium" counter={99} size="medium" {...args} />
      <Badge id="badge-inverse-large" counter={99} size="large" {...args} />

      <Badge
        id="badge-icon"
        counter={99}
        size="small"
        variant="subtle"
        {...args}
      >
        <Icon type="alert" color="white" />
      </Badge>
      <Badge
        id="badge-subtle-inverse-medium"
        counter={99}
        size="medium"
        variant="subtle"
        {...args}
      />
      <Badge
        id="badge-subtle-inverse-large"
        counter={99}
        size="large"
        variant="subtle"
        {...args}
      />
    </>
  );
};
Inverse.storyName = "Inverse";
Inverse.args = {
  inverse: true,
};
Inverse.decorators = [
  (Story) => (
    <Box p={3} display="flex" gap={2} backgroundColor="--colorsUtilityYin090">
      <Story />
    </Box>
  ),
];

export const WithOnClick: Story = ({ ...args }) => {
  const counter = 9;
  return (
    <Badge
      id="badge-onclick"
      counter={counter}
      onClick={() => {}}
      aria-label={`Remove ${counter} filters.`}
      {...args}
    >
      <Button aria-describedby="badge-onclick" variantType="secondary">
        Filter
      </Button>
    </Badge>
  );
};
WithOnClick.storyName = "With OnClick";
WithOnClick.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const CustomColor: Story = ({ ...args }) => {
  const counter = 9;
  return (
    <Badge
      id="badge-custom-color"
      counter={counter}
      onClick={() => {}}
      aria-label={`Remove ${counter} filters.`}
      color="--colorsSemanticNegative500"
      {...args}
    >
      <Button
        aria-describedby="badge-custom-color"
        variantType="secondary"
        variant="destructive"
      >
        Filter
      </Button>
    </Badge>
  );
};
CustomColor.storyName = "Custom Color";
