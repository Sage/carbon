import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Heading from "./heading.component";
import Box from "../box";
import { Tile } from "../tile";
import { Dl, Dt, Dd } from "../definition-list";
import Button from "../button/button.component";
import Pill from "../pill/pill.component";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Heading> = {
  title: "Heading",
  component: Heading,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = () => {
  return <Heading title="This is a Title" />;
};
Default.storyName = "Default";

export const WithHeadingType: Story = () => {
  return (
    <>
      <Heading headingType="h1" title="This is a h1 Title" />
      <Heading headingType="h2" title="This is a h2 Title" />
      <Heading headingType="h3" title="This is a h3 Title" />
      <Heading headingType="h4" title="This is a h4 Title" />
      <Heading headingType="h5" title="This is a h5 Title" />
    </>
  );
};
WithHeadingType.storyName = "With Heading Type";

export const WithoutDivider: Story = () => {
  return <Heading title="This is a Title" divider={false} />;
};
WithoutDivider.storyName = "Without Divider";

export const WithSubheader: Story = () => {
  return <Heading title="This is a Title" subheader="This is a subheader" />;
};
WithSubheader.storyName = "With Subheader";

export const WithPill: Story = () => {
  return <Heading title="This is a Title" pills={<Pill>Pill</Pill>} />;
};
WithPill.storyName = "With Pill";

export const WithMultiplePills: Story = () => {
  return (
    <Heading
      title="This is a Title"
      pills={[
        <Pill mr={2} key="1">
          Pill 1
        </Pill>,
        <Pill mr={2} key="2" size="L">
          Pill 2
        </Pill>,
        <Pill mr={2} key="3" size="XL">
          Pill 3
        </Pill>,
      ]}
    />
  );
};
WithMultiplePills.storyName = "With Multiple Pills";

export const WithPillAndSubheader: Story = () => {
  return (
    <Heading
      title="This is a Title"
      pills={<Pill>Pill</Pill>}
      subheader="This is a subheader"
    />
  );
};
WithPillAndSubheader.storyName = "With Pill and Subheader";

export const WithSubheaderSeperator: Story = () => {
  return (
    <Heading
      title="This is a Title"
      subheader="This is a subheader"
      separator
    />
  );
};
WithSubheaderSeperator.storyName = "With Subheader Seperator";

export const WithPillSubheaderSeperator: Story = () => {
  return (
    <Heading
      title="This is a Title"
      subheader="This is a subheader"
      pills={<Pill>Pill</Pill>}
      separator
    />
  );
};
WithPillSubheaderSeperator.storyName = "With Pill, Subheader and Seperator";

export const WithSubheaderChildren: Story = () => {
  return (
    <Heading title="This is a Title" subheader="This is a subheader">
      This is content beneath a heading
    </Heading>
  );
};
WithSubheaderChildren.storyName = "With Subheader Children";

export const WithChildrenComponent: Story = () => {
  return (
    <Heading title="This is a Title" subheader="This is a subheader">
      <Tile width="95%">
        <Dl>
          <Dt>Drink</Dt>
          <Dd>Coffee</Dd>
          <Dt>Brew Method</Dt>
          <Dd>Stove Top Moka Pot</Dd>
          <Dt>Brand of Coffee</Dt>
          <Dd>Magic Coffee Beans</Dd>
          <Dt mb={0}>Main and Registered Address</Dt>
          <Dd mb="4px">Magic Coffee Beans,</Dd>
          <Dd mb="4px">In The Middle of Our Street,</Dd>
          <Dd mb="4px">Madness,</Dd>
          <Dd mb="4px">CO4 3VE</Dd>
          <Dd>
            <Button
              buttonType="tertiary"
              iconType="link"
              iconPosition="after"
              href="https://goo.gl/maps/GMReLoBpbn9mdZVZ7"
            >
              View in Google Maps
            </Button>
          </Dd>
        </Dl>
      </Tile>
    </Heading>
  );
};
WithChildrenComponent.storyName = "With Children Component";

export const WithHelp: Story = () => {
  return (
    <Box m={16}>
      <Heading
        title="This is a Title"
        subheader="This is a subheader"
        help="This should be helpful"
      />
    </Box>
  );
};
WithHelp.storyName = "With Help";

export const WithHelpPill: Story = () => {
  return (
    <Box m={16}>
      <Heading
        title="This is a Title"
        subheader="This is a subheader"
        help="This should be helpful"
        pills={<Pill>Pill</Pill>}
      />
    </Box>
  );
};
WithHelpPill.storyName = "With Help Pill";

export const WithHelpLink: Story = () => {
  return (
    <Box m={16}>
      <Heading
        title="This is a Title"
        subheader="This is a subheader"
        help="This should be helpful"
        helpLink="https://carbon.sage.com"
      />
    </Box>
  );
};
WithHelpLink.storyName = "With Help Link";
WithHelpLink.parameters = { chromatic: { disableSnapshot: true } };

export const WithBackLink: Story = () => {
  return (
    <Heading
      title="This is a Title"
      subheader="This is a subheader"
      backLink="https://carbon.sage.com"
    />
  );
};
WithBackLink.storyName = "With Back Link";
