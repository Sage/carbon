import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { within } from "storybook/test";
import { Card, CardFooter, CardRow, CardColumn, CardProps } from ".";

import Link from "../link";
import Typography from "../typography";
import Icon from "../icon";
import Box from "../box";
import { ActionPopover, ActionPopoverItem } from "../action-popover";
import Heading from "../heading";

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
            rightChildren={
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

export const DeprecatedCardRowAndColumn: StoryObj<typeof Card> = {
  parameters: {
    docs: {
      description: {
        story:
          "Test to ensure backward compatibility with deprecated `CardRow` and `CardColumn` components.",
      },
    },
  },
  render: () => (
    <Card
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
          <Typography fontSize="16px" m={0} fontWeight="500">
            Body text
          </Typography>
          <Heading title="More text" headingType="h2" divider={false} />
          <Typography>Even more text</Typography>
        </CardColumn>
      </CardRow>
    </Card>
  ),
};

export const DeprecatedCardRowWithPadding: StoryObj<typeof Card> = {
  parameters: {
    docs: {
      description: {
        story:
          "Test to ensure backward compatibility with deprecated `CardRow` component with custom padding props.",
      },
    },
  },
  render: () => (
    <Card
      footer={
        <CardFooter>
          <CardColumn>
            <Link icon="link" href="https://carbon.sage.com/">
              View Stripe Dashboard
            </Link>
          </CardColumn>
        </CardFooter>
      }
    >
      <CardRow pt={2} pb={0}>
        <CardColumn align="left">
          <Typography variant="h1">Stripe - [account name]</Typography>
          <Typography size="L" m={0}>
            user.name@sage.com
          </Typography>
        </CardColumn>
        <CardColumn align="right">
          <Icon type="image" />
        </CardColumn>
      </CardRow>
      <CardRow pt={0} pb={4}>
        <CardColumn>
          <Typography m={0} weight="medium">
            Stripe Balance
          </Typography>
          <Typography variant="h2">£ 0.00</Typography>
          <Typography>LAST ENTRY: 5 DAYS AGO</Typography>
        </CardColumn>
      </CardRow>
      <CardRow pt={0} pb={4}>
        <CardColumn>
          <Typography m={0} weight="medium">
            Stripe Balance
          </Typography>
          <Typography variant="h2">£ 0.00</Typography>
          <Typography>LAST ENTRY: 15 DAYS AGO</Typography>
        </CardColumn>
      </CardRow>
    </Card>
  ),
};

export const DeprecatedCardRowSpacingSizes: StoryObj<typeof Card> = {
  parameters: {
    docs: {
      description: {
        story:
          "Test to ensure `CardRow` receives spacing from parent Card context correctly.",
      },
    },
  },
  render: () => (
    <>
      {(["small", "medium", "large"] as const).map((spacing) => (
        <Card
          key={spacing}
          spacing={spacing}
          mb="16px"
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
              <Typography variant="h1">Spacing: {spacing}</Typography>
              <Typography m={0}>Additional text</Typography>
            </CardColumn>
            <CardColumn align="right">
              <Icon type="image" />
            </CardColumn>
          </CardRow>
          <CardRow>
            <CardColumn>
              <Typography m={0} weight="medium">
                Body text
              </Typography>
              <Typography variant="h2">More text</Typography>
            </CardColumn>
          </CardRow>
        </Card>
      ))}
    </>
  ),
};

export const DeprecatedCardRowWithInteractive: StoryObj<typeof Card> = {
  parameters: {
    docs: {
      description: {
        story:
          "Test to ensure deprecated `CardRow` and `CardColumn` work with interactive cards.",
      },
    },
  },
  render: () => (
    <Card
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
          <Heading title="Interactive Card" divider={false} />
          <Typography fontSize="16px" m={0}>
            Click me!
          </Typography>
        </CardColumn>
        <CardColumn align="right">
          <Icon type="image" />
        </CardColumn>
      </CardRow>
    </Card>
  ),
};
