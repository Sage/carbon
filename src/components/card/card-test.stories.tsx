import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card, CardRow, CardFooter, CardColumn } from ".";

import Link from "../link";
import Heading from "../heading";
import Typography from "../typography";
import Icon from "../icon";

export default {
  title: "Card/Test",
  component: Card,
  parameters: {
    docs: {
      description: {
        component: "Test stories for the `Card` component.",
      },
    },
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    action: { action: "action" },
  },
} as ComponentMeta<typeof Card>;

export const CardStory: ComponentStory<typeof Card> = (args) => {
  return (
    <Card interactive {...args}>
      <CardRow>
        <CardColumn align="left">
          <Heading title="Stripe - [account name]" divider={false} />
          <Typography variant="h5">user.name@sage.com</Typography>
        </CardColumn>
        <CardColumn align="right">
          <Icon type="image" />
        </CardColumn>
      </CardRow>
      <CardRow>
        <CardColumn>
          <Typography variant="h5" fontWeight="bold">
            Stripe Balance
          </Typography>
          <Heading title="£ 0.00" divider={false} />
          <Typography fontSize="12px">LAST ENTRY: 15 DAYS AGO</Typography>
        </CardColumn>
      </CardRow>
      <CardFooter>
        <CardColumn>
          <Link icon="link" href="https://carbon.sage.com/">
            View Stripe Dashboard
          </Link>
        </CardColumn>
      </CardFooter>
    </Card>
  );
};
CardStory.storyName = "default";
