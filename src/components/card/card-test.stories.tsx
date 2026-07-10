import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { within } from "storybook/test";
import { Card, CardFooter, CardProps } from ".";

import Link from "../link";
import Typography from "../typography";
import Icon from "../icon";
import Box from "../box";
import { ActionPopover, ActionPopoverItem } from "../action-popover";

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
          <Box pl="16px" pr="16px" pt="24px" pb="24px" flexGrow={1}>
            <Typography mb="0" textAlign="center">
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </Typography>
          </Box>
        </CardFooter>
      }
    >
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h1">Heading</Typography>
          <Typography m={0}>Additional text</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
      <Box display="flex" pt="24px" pb="24px">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <Typography variant="h2">More text</Typography>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
    </Card>
  );
};
DefaultStory.storyName = "default";

export const DraggableSpacingSizes = () => {
  return (
    <>
      {(["none", "extra-small", "small", "medium", "large"] as const).map(
        (spacing) => (
          <Card
            key={spacing}
            draggable
            draggableAccessory={
              <ActionPopover m={0} rightAlignMenu>
                <ActionPopoverItem onClick={() => {}}>
                  Move up
                </ActionPopoverItem>
                <ActionPopoverItem onClick={() => {}}>
                  Move down
                </ActionPopoverItem>
              </ActionPopover>
            }
            spacing={spacing}
            mb="16px"
            footer={
              <CardFooter>
                <Box pl="16px" pr="16px" pt="24px" pb="24px" flexGrow={1}>
                  <Typography mb="0" textAlign="center">
                    <Link icon="link" href="https://carbon.sage.com/">
                      Footer link
                    </Link>
                  </Typography>
                </Box>
              </CardFooter>
            }
          >
            <Box display="flex">
              <Box flexGrow={1} minWidth={0}>
                <Typography variant="h1">Spacing: {spacing}</Typography>
                <Typography m={0}>Additional text</Typography>
              </Box>
              <Box display="flex" alignItems="flex-start">
                <Icon type="image" />
              </Box>
            </Box>
          </Card>
        ),
      )}
    </>
  );
};
DraggableSpacingSizes.storyName = "draggable spacing sizes";

export const CustomHeight = () => {
  return (
    <>
      <Card
        height="500px"
        onClick={() => {}}
        footer={
          <CardFooter>
            <Box pl="16px" pr="16px" pt="24px" pb="24px" flexGrow={1}>
              <Typography mb="0" textAlign="center">
                <Link icon="link" href="https://carbon.sage.com/">
                  Footer link
                </Link>
              </Typography>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography variant="h1">Heading</Typography>
            <Typography m={0}>Additional text</Typography>
          </Box>
          <Box flexGrow={1} display="flex" justifyContent="flex-end">
            <Icon type="image" />
          </Box>
        </Box>
        <Box display="flex" pt="24px" pb="24px">
          <Box flexGrow={1}>
            <Typography m={0} weight="medium" textAlign="center">
              Body text
            </Typography>
            <Typography textAlign="center" variant="h2">
              More text
            </Typography>
            <Typography textAlign="center">Even more text</Typography>
          </Box>
        </Box>
      </Card>
      <Card
        height="500px"
        href="#"
        footer={
          <CardFooter>
            <Box pl="16px" pr="16px" pt="24px" pb="24px" flexGrow={1}>
              <Typography mb="0" textAlign="center">
                <Link icon="link" href="https://carbon.sage.com/">
                  Footer link
                </Link>
              </Typography>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography variant="h1">Heading</Typography>
            <Typography m={0}>Additional text</Typography>
          </Box>
          <Box flexGrow={1} display="flex" justifyContent="flex-end">
            <Icon type="image" />
          </Box>
        </Box>
        <Box display="flex" pt="24px" pb="24px">
          <Box flexGrow={1}>
            <Typography m={0} weight="medium" textAlign="center">
              Body text
            </Typography>
            <Typography textAlign="center" variant="h2">
              More text
            </Typography>
            <Typography textAlign="center">Even more text</Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export const InteractiveFocusedWithFooter: StoryObj<typeof Card> = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    themeProvider: { chromatic: { theme: "sage" } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole("button");
    card.focus();
  },
  render: () => (
    <Card
      onClick={() => {}}
      footer={
        <CardFooter>
          <Box pl="16px" pr="16px" pt="24px" pb="24px" flexGrow={1}>
            <Typography mb="0" textAlign="center">
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </Typography>
          </Box>
        </CardFooter>
      }
    >
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h1">Focused Card</Typography>
          <Typography m={0}>Card with footer in focused state</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
    </Card>
  ),
};

export const InteractiveFocusedWithoutFooter: StoryObj<typeof Card> = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    themeProvider: { chromatic: { theme: "sage" } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole("button");
    card.focus();
  },
  render: () => (
    <Card onClick={() => {}}>
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h1">Focused Card</Typography>
          <Typography m={0}>Card without footer in focused state</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
    </Card>
  ),
};
