import React from "react";
import { ComponentStory } from "@storybook/react";

import Heading from "./heading.component";
import { Tile } from "../tile";
import Dl from "../definition-list/dl.component";
import Dt from "../definition-list/dt.component";
import Dd from "../definition-list/dd.component";
import Button from "../button/button.component";
import Pill from "../pill/pill.component";

export const Default: ComponentStory<typeof Heading> = () => (
  <Heading title="This is a Title" />
);

export const WithoutDivider: ComponentStory<typeof Heading> = () => (
  <Heading title="This is a Title" divider={false} />
);

export const WithSubheader: ComponentStory<typeof Heading> = () => (
  <Heading title="This is a Title" subheader="This is a subheader" />
);

export const WithPill: ComponentStory<typeof Heading> = () => (
  <Heading title="This is a Title" pills={<Pill>Pill</Pill>} />
);

export const WithMultiplePills: ComponentStory<typeof Heading> = () => (
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

export const WithPillAndSubheader: ComponentStory<typeof Heading> = () => (
  <Heading
    title="This is a Title"
    pills={<Pill>Pill</Pill>}
    subheader="This is a subheader"
  />
);

export const WithSubheaderSeperator: ComponentStory<typeof Heading> = () => (
  <Heading title="This is a Title" subheader="This is a subheader" separator />
);

export const WithPillSubheaderSeperator: ComponentStory<
  typeof Heading
> = () => (
  <Heading
    title="This is a Title"
    subheader="This is a subheader"
    pills={<Pill>Pill</Pill>}
    separator
  />
);

export const WithSubheaderChildren: ComponentStory<typeof Heading> = () => (
  <Heading title="This is a Title" subheader="This is a subheader">
    This is content beneath a heading
  </Heading>
);

export const WithChildrenComponent: ComponentStory<typeof Heading> = () => (
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

export const WithHelp: ComponentStory<typeof Heading> = () => (
  <div style={{ margin: "16px" }}>
    <Heading
      title="This is a Title"
      subheader="This is a subheader"
      help="This should be helpful"
    />
  </div>
);

export const WithHelpPill: ComponentStory<typeof Heading> = () => (
  <div style={{ margin: "16px" }}>
    <Heading
      title="This is a Title"
      subheader="This is a subheader"
      help="This should be helpful"
      pills={<Pill>Pill</Pill>}
    />
  </div>
);

export const WithHelpLink: ComponentStory<typeof Heading> = () => (
  <div style={{ margin: "16px" }}>
    <Heading
      title="This is a Title"
      subheader="This is a subheader"
      help="This should be helpful"
      helpLink="https://carbon.sage.com"
    />
  </div>
);
WithHelpLink.parameters = { chromatic: { disableSnapshot: true } };

export const WithBackLink: ComponentStory<typeof Heading> = () => (
  <Heading
    title="This is a Title"
    subheader="This is a subheader"
    backLink="https://carbon.sage.com"
  />
);
