import React from "react";
import { Meta } from "@storybook/react";
import { Card, CardRow, CardFooter, CardColumn, CardProps } from ".";

import Link from "../link";
import Heading from "../heading";
import Typography from "../typography";
import Icon from "../icon";
import Box from "../box";

export default {
  title: "Card/Test",
  includeStories: ["DefaultStory", "CustomHeight"],
  component: Card,
  parameters: {
    docs: {
      description: {
        component: "Test stories for the `Card` component.",
      },
    },
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    children: { table: { disable: true } },
    onClick: { table: { disable: true } },
    footer: { table: { disable: true } },
  },
} as Meta<typeof Card>;

export const DefaultStory = (
  args: Omit<CardProps, "onClick" | "children" | "footer">,
) => {
  return (
    <Card
      {...args}
      footer={
        <CardFooter>
          <CardColumn>
            <Link icon="link" href="https://carbon.sage.com/">
              Footer link
            </Link>
          </CardColumn>
        </CardFooter>
      }
    >
      <CardRow>
        <CardColumn align="left">
          <Heading title="Heading" divider={false} />
          <Typography fontSize="16px" m={0}>
            Additional text
          </Typography>
        </CardColumn>
        <CardColumn align="right">
          <Icon type="image" />
        </CardColumn>
      </CardRow>
      <CardRow>
        <CardColumn>
          <Typography fontSize="16px" m={0} fontWeight="bold">
            Body text
          </Typography>
          <Heading title="More text" divider={false} />
          <Typography>Even more text</Typography>
        </CardColumn>
      </CardRow>
    </Card>
  );
};
DefaultStory.storyName = "default";

export const CardComponent = (props: Partial<CardProps>) => {
  return (
    <Card {...props}>
      <CardRow>
        <CardColumn align="left">
          <Heading title="Stripe - [account name]" divider={false} />
          <Typography fontSize="16px" m={0}>
            user.name@sage.com
          </Typography>
        </CardColumn>
        <CardColumn align="right">
          <Icon type="image" />
        </CardColumn>
      </CardRow>
      <CardRow>
        <CardColumn>
          <Typography fontSize="16px" m={0} fontWeight="bold">
            Stripe Balance
          </Typography>
          <Heading title="£ 0.00" divider={false} />
          <Typography>LAST ENTRY: 15 DAYS AGO</Typography>
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

export const CardTextAlignment = ({ ...props }) => {
  return (
    <Card>
      <CardRow>
        <CardColumn {...props}>
          <Typography fontSize="16px" m={0} fontWeight="bold">
            Stripe Balance
          </Typography>
          <Heading title="£ 0.00" divider={false} />
          <Typography>LAST ENTRY: 15 DAYS AGO</Typography>
        </CardColumn>
      </CardRow>
    </Card>
  );
};

export const CustomHeight = () => {
  return (
    <>
      <Card
        height="500px"
        onClick={() => {}}
        footer={
          <CardFooter>
            <CardColumn>
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </CardColumn>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn align="left">
            <Heading title="Heading" divider={false} />
            <Typography fontSize="16px" m={0}>
              Additional text
            </Typography>
          </CardColumn>
          <CardColumn align="right">
            <Icon type="image" />
          </CardColumn>
        </CardRow>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" m={0} fontWeight="bold">
              Body text
            </Typography>
            <Heading title="More text" divider={false} />
            <Typography>Even more text</Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        height="500px"
        href="#"
        footer={
          <CardFooter>
            <CardColumn>
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </CardColumn>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn align="left">
            <Heading title="Heading" divider={false} />
            <Typography fontSize="16px" m={0}>
              Additional text
            </Typography>
          </CardColumn>
          <CardColumn align="right">
            <Icon type="image" />
          </CardColumn>
        </CardRow>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" m={0} fontWeight="bold">
              Body text
            </Typography>
            <Heading title="More text" divider={false} />
            <Typography>Even more text</Typography>
          </CardColumn>
        </CardRow>
      </Card>
    </>
  );
};
