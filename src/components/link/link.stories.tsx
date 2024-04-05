import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Link from ".";
import Box from "../box";
import { Menu, MenuItem } from "../menu";
import Typography from "../typography";

const meta: Meta<typeof Link> = {
  title: "Link",
  component: Link,
  parameters: { controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const DefaultStory: Story = () => {
  return (
    <Link
      href="https://carbon.sage.com"
      target="_blank"
      rel="noreferrer noopener"
    >
      This is a link
    </Link>
  );
};
DefaultStory.storyName = "Default";

export const WithDisabled = () => {
  return <Link disabled>This is a disabled anchor link</Link>;
};
WithDisabled.storyName = "With Disabled";

export const WithIcon: Story = () => {
  return (
    <Link icon="settings" href="#foo">
      This is a link
    </Link>
  );
};
WithIcon.storyName = "With Icon";
WithIcon.parameters = { chromatic: { disableSnapshot: true } };

export const WithIconAlign: Story = () => {
  return (["left", "right"] as const).map((align) => (
    <div key={align} style={{ margin: "64px" }}>
      <Link icon="settings" iconAlign={align} href="#foo">
        This is a link
      </Link>
    </div>
  ));
};
WithIconAlign.storyName = "With Icon Align";

export const WithTooltip: Story = () => {
  return (
    <div style={{ margin: "64px" }}>
      <Link
        icon="settings"
        tooltipMessage="This is a tooltip message"
        href="#foo"
      >
        This is a link
      </Link>
    </div>
  );
};
WithTooltip.storyName = "With Tooltip";
WithTooltip.parameters = { chromatic: { disableSnapshot: true } };

export const WithIsSkipLink: Story = () => {
  return (
    <>
      <Link href="#main-content" isSkipLink />
      <Menu>
        <MenuItem href="#">Menu Item 1</MenuItem>
        <MenuItem href="#">Menu Item 2</MenuItem>
        <MenuItem href="#">Menu Item 3</MenuItem>
        <MenuItem href="#">Menu Item 4</MenuItem>
        <MenuItem href="#">Menu Item 5</MenuItem>
      </Menu>
      <Box py={2} id="main-content">
        <Typography mb={1} variant="h1">
          {" "}
          This is header of main content container{" "}
        </Typography>
        <Typography variant="p">
          Laborum anim magna pariatur ea mollit elit cillum exercitation irure
          consectetur. Lorem qui dolor reprehenderit reprehenderit ut ad. Esse
          magna aliquip ea culpa nulla laborum deserunt cupidatat ullamco fugiat
          in enim. Sunt velit tempor anim occaecat. Culpa ut consectetur sunt
          tempor eu est deserunt veniam. Voluptate commodo consequat ipsum
          aliquip elit aute pariatur occaecat eiusmod culpa dolore voluptate
          Lorem commodo. Consectetur anim exercitation esse irure est amet
          adipisicing cupidatat laborum non commodo id. Ex id nostrud aute
          deserunt. Qui non aute ea eu commodo anim labore dolor minim enim
          cillum eiusmod commodo ipsum. Consectetur ipsum consectetur Lorem
          tempor proident cillum eu minim. Adipisicing in nostrud sit Lorem ex
          aute tempor aliquip aute. Duis dolore laboris labore exercitation enim
          dolore anim occaecat anim laboris dolor ut. Lorem ullamco adipisicing
          duis aute non minim. Adipisicing consequat labore non aliquip anim.
        </Typography>
        <Link href="https://carbon.sage.com">Carbon Page</Link>
      </Box>
    </>
  );
};
WithIsSkipLink.storyName = "With Is Skip Link";
WithIsSkipLink.parameters = { chromatic: { disableSnapshot: true } };

export const WithOnClick: Story = () => {
  return (
    <Link onClick={() => {}}>
      This is actually a button but looks like a link
    </Link>
  );
};
WithOnClick.storyName = "With On Click";
WithOnClick.parameters = { chromatic: { disableSnapshot: true } };

export const Variants: Story = () => {
  return (
    <>
      <Link
        href="https://carbon.sage.com"
        target="_blank"
        rel="noreferrer noopener"
        variant="negative"
      >
        This is a link
      </Link>
      <br />
      <br />
      <Link
        href="https://carbon.sage.com"
        target="_blank"
        rel="noreferrer noopener"
        variant="neutral"
      >
        This is a link
      </Link>
    </>
  );
};
Variants.storyName = "Variants";

export const OnADarkBackground: Story = () => {
  return (
    <Box
      backgroundColor="#000000"
      width="max-content"
      padding="20px 10px"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Link
        href="https://carbon.sage.com"
        target="_blank"
        rel="noreferrer noopener"
        isDarkBackground
      >
        This is a link
      </Link>
      {(["left", "right"] as const).map((align) => (
        <React.Fragment key={`${align}-default-variant`}>
          <br />
          <Link icon="settings" isDarkBackground iconAlign={align} href="#foo">
            This is a link
          </Link>
        </React.Fragment>
      ))}
      <br />
      <Link
        href="https://carbon.sage.com"
        target="_blank"
        rel="noreferrer noopener"
        isDarkBackground
        variant="negative"
      >
        This is a link
      </Link>
      {(["left", "right"] as const).map((align) => (
        <React.Fragment key={`${align}-negative-variant`}>
          <br />
          <Link
            icon="settings"
            isDarkBackground
            variant="negative"
            iconAlign={align}
            href="#foo"
          >
            This is a link
          </Link>
        </React.Fragment>
      ))}
      <br />
      <Link
        href="https://carbon.sage.com"
        target="_blank"
        rel="noreferrer noopener"
        isDarkBackground
        variant="neutral"
      >
        This is a link
      </Link>
      {(["left", "right"] as const).map((align) => (
        <React.Fragment key={`${align}-neutral-variant`}>
          <br />
          <Link
            icon="settings"
            isDarkBackground
            variant="neutral"
            iconAlign={align}
            href="#foo"
          >
            This is a link
          </Link>
        </React.Fragment>
      ))}
      <br />
      <Link isDarkBackground disabled>
        This is a link
      </Link>
    </Box>
  );
};
OnADarkBackground.storyName = "On A Dark Background";

export const Wrapping = () => {
  return (
    <Box padding="25px" width="250px" backgroundColor="--colorsUtilityMajor025">
      <Typography>We&apos;ll be sorry to see you go</Typography>
      <Typography>
        If your subscription isn&apos;t quite right, we can help you{" "}
        <Link href="http://carbon.sage.com" target="_blank">
          find one that suits your business needs (new tab)
        </Link>
      </Typography>
    </Box>
  );
};
Wrapping.storyName = "Wrapping";
