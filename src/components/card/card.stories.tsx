import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardFooter, CardProps } from ".";

import Typography from "../typography";
import Icon from "../icon";
import Link from "../link";
import Box from "../box";
import Button from "../button/__next__";
import Divider from "../divider";
import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
} from "../action-popover";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Card> = {
  title: "Card",
  component: Card,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: { controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const DefaultStory: Story = {
  render: (args: CardProps) => {
    return (
      <Card
        {...args}
        footer={
          <CardFooter>
            <Box
              pl="var(--global-space-comp-l)"
              pr="var(--global-space-comp-l)"
              pt="var(--global-space-comp-xl)"
              pb="var(--global-space-comp-xl)"
              flexGrow={1}
            >
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
            <div style={{ textAlign: "center" }}>
              <Typography variant="h2">More text</Typography>
            </div>
            <Typography textAlign="center">Even more text</Typography>
          </Box>
        </Box>
      </Card>
    );
  },
};
DefaultStory.storyName = "Default";

export const WithoutFooter: Story = () => {
  return (
    <Card>
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
          <Typography variant="h2" textAlign="center">
            More text
          </Typography>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
    </Card>
  );
};
WithoutFooter.storyName = "Without Footer";

export const WithoutFooterInteractive: Story = () => {
  const [clickCounter, setClickCounter] = useState(0);
  return (
    <Box>
      <Typography variant="b" mb={2}>
        Card has been clicked {clickCounter} times
      </Typography>
      <Card
        onClick={() => setClickCounter((prevCounter) => prevCounter + 1)}
        aria-label="Interactive card without footer"
      >
        <Box display="flex" width="100%">
          <Box flexGrow={1}>
            <Typography textAlign="left" variant="h1">
              Heading
            </Typography>
            <Typography textAlign="left" m={0}>
              Additional text
            </Typography>
          </Box>
          <Box flexGrow={1} display="flex" justifyContent="flex-end">
            <Icon type="image" />
          </Box>
        </Box>
        <Box display="flex" pt="24px" pb="24px" width="100%">
          <Box flexGrow={1}>
            <Typography m={0} weight="medium" textAlign="center">
              Body text
            </Typography>
            <Typography variant="h2" textAlign="center">
              More text
            </Typography>
            <Typography textAlign="center">Even more text</Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
WithoutFooterInteractive.parameters = { chromatic: { disableSnapshot: true } };
WithoutFooterInteractive.storyName = "Without Footer - Interactive";

export const NoneSpacing: Story = () => {
  return (
    <Card
      spacing="none"
      footer={
        <CardFooter>
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
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
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
    </Card>
  );
};
NoneSpacing.storyName = "No Spacing";

export const ExtraSmallSpacing: Story = () => {
  return (
    <Card
      spacing="extra-small"
      footer={
        <CardFooter>
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
            <Typography mb="0" textAlign="center">
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </Typography>
          </Box>
        </CardFooter>
      }
    >
      <Box display="flex" width="100%">
        <Box flexGrow={1}>
          <Typography variant="h1">Heading</Typography>
          <Typography m={0}>Additional text</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
      <Box display="flex" pt="16px" pb="16px" width="100%">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
    </Card>
  );
};
ExtraSmallSpacing.storyName = "Extra Small Spacing";

export const SmallSpacing: Story = () => {
  return (
    <Card
      spacing="small"
      footer={
        <CardFooter>
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
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
      <Box
        display="flex"
        pt="var(--global-space-comp-xl)"
        pb="var(--global-space-comp-xl)"
      >
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
    </Card>
  );
};
SmallSpacing.storyName = "Small Spacing";

export const MediumSpacing: Story = () => {
  return (
    <Card
      spacing="medium"
      footer={
        <CardFooter>
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
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
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
    </Card>
  );
};
MediumSpacing.storyName = "Medium Spacing";

export const LargeSpacing: Story = () => {
  return (
    <Card
      spacing="large"
      footer={
        <CardFooter>
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
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
      <Box display="flex" pt="32px" pb="32px">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
    </Card>
  );
};
LargeSpacing.storyName = "Large Spacing";

export const WithWidthProvided: Story = () => {
  return (
    <Card
      width="500px"
      footer={
        <CardFooter>
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
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
      <Box display="flex" pt="32px" pb="32px">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
    </Card>
  );
};
WithWidthProvided.storyName = "With Width Provided";

export const WithCustomHeight: Story = () => {
  return (
    <Card
      height="500px"
      footer={
        <CardFooter>
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
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
      <Box display="flex" pt="32px" pb="32px">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
    </Card>
  );
};
WithCustomHeight.storyName = "With Custom Height";

export const WithCurvedRoundness: Story = () => {
  return (
    <Card
      roundness="curved"
      footer={
        <CardFooter>
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
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
      <Box display="flex" pt="32px" pb="32px">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
    </Card>
  );
};
WithCurvedRoundness.storyName = "With Curved Roundness";

export const Interactive: Story = () => {
  const [clickCounter, setClickCounter] = useState(0);
  return (
    <Box>
      <Typography variant="b">
        Card has been clicked {clickCounter} times
      </Typography>
      <Card
        onClick={() => setClickCounter((prevCounter) => prevCounter + 1)}
        aria-label="Card with button element"
        footer={
          <CardFooter>
            <Box
              pl="var(--global-space-comp-l)"
              pr="var(--global-space-comp-l)"
              pt="var(--global-space-comp-xl)"
              pb="var(--global-space-comp-xl)"
              flexGrow={1}
            >
              <Typography mb="0" textAlign="center">
                <Link icon="link" href="https://carbon.sage.com/">
                  Footer link
                </Link>
              </Typography>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pt="var(--global-space-comp-xl)">
          <Box flexGrow={1}>
            <Typography size="L" m={0} weight="medium" textAlign="center">
              This Card is a button as it has an onClick prop
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card
        href="#"
        target="_blank"
        rel="noreferrer"
        aria-label="Card with anchor element"
        footer={
          <CardFooter>
            <Box
              pl="var(--global-space-comp-l)"
              pr="var(--global-space-comp-l)"
              pt="var(--global-space-comp-xl)"
              pb="var(--global-space-comp-xl)"
              flexGrow={1}
            >
              <Typography mb="0" textAlign="center">
                <Link icon="link" href="https://carbon.sage.com/">
                  Footer link
                </Link>
              </Typography>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pt="var(--global-space-comp-xl)">
          <Box flexGrow={1}>
            <Typography size="L" m={0} weight="medium" textAlign="center">
              This Card is a link as it has an href prop
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
Interactive.parameters = { chromatic: { disableSnapshot: true } };
Interactive.storyName = "Interactive";

export const Draggable: Story = () => {
  return (
    <Card
      draggable
      draggableAccessory={
        <ActionPopover m={0} rightAlignMenu>
          <ActionPopoverItem onClick={() => {}}>Move up</ActionPopoverItem>
          <ActionPopoverItem onClick={() => {}}>Move down</ActionPopoverItem>
          <ActionPopoverDivider />
          <ActionPopoverItem onClick={() => {}}>Delete</ActionPopoverItem>
          <ActionPopoverItem onClick={() => {}}>Edit</ActionPopoverItem>
        </ActionPopover>
      }
      footer={
        <CardFooter>
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
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
          <Typography variant="h2" textAlign="center">
            More text
          </Typography>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
    </Card>
  );
};
Draggable.storyName = "Draggable";

export const DifferentCardRowPadding: Story = () => {
  return (
    <Card
      footer={
        <CardFooter>
          <Box
            pl="var(--global-space-comp-l)"
            pr="var(--global-space-comp-l)"
            pt="var(--global-space-comp-xl)"
            pb="var(--global-space-comp-xl)"
            flexGrow={1}
          >
            <Typography mb="0" textAlign="center">
              <Link icon="link" href="https://carbon.sage.com/">
                Footer link
              </Link>
            </Typography>
          </Box>
        </CardFooter>
      }
    >
      <Box display="flex" pt="var(--global-space-comp-xl)" pb="0">
        <Box flexGrow={1}>
          <Typography variant="h1">Heading</Typography>
          <Typography m={0}>Additional text</Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
      <Box display="flex" pt="0" pb="var(--global-space-comp-l)">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
      <Box display="flex" pt={0} pb={4}>
        <Box flexGrow={1}>
          <Typography m={0} weight="medium" textAlign="center">
            Body text
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">More text</Typography>
          </div>
          <Typography textAlign="center">Even more text</Typography>
        </Box>
      </Box>
    </Card>
  );
};
DifferentCardRowPadding.parameters = { chromatic: { disableSnapshot: true } };
DifferentCardRowPadding.storyName = "Different Card Row Padding";

export const DifferentCardFooterPadding: Story = () => {
  return (
    <Box>
      <Card
        footer={
          <CardFooter px={1} py={1}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} variantType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button variantType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card
        footer={
          <CardFooter px={2} py={1}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} variantType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button variantType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card
        footer={
          <CardFooter px={3} py={1}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} variantType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button variantType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card
        footer={
          <CardFooter px={4} py={1}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} variantType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button variantType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card
        footer={
          <CardFooter px={5} py={1}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} variantType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button variantType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card
        footer={
          <CardFooter px={5} py={2}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} variantType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button variantType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
DifferentCardFooterPadding.parameters = {
  chromatic: { disableSnapshot: true },
};
DifferentCardFooterPadding.storyName = "Different Card Footer Padding";

export const MoreExamplesOfCardFooter: Story = () => {
  return (
    <Box>
      <Card
        footer={
          <CardFooter p={1}>
            <Box
              alignItems="center"
              width="100%"
              display="flex"
              justifyContent="space-around"
            >
              <Box flexGrow={1}>
                <Button
                  aria-label="Phone icon button"
                  onClick={() => {}}
                  iconType="phone"
                  variantType="subtle"
                  size="small"
                  mr="8px"
                />
                <Button
                  aria-label="Phone icon button"
                  onClick={() => {}}
                  iconType="phone"
                  variantType="subtle"
                  size="small"
                  mr="8px"
                />
                <Button
                  aria-label="Phone icon button"
                  onClick={() => {}}
                  iconType="phone"
                  variantType="subtle"
                  size="small"
                  mr="8px"
                />
                <Button
                  aria-label="Phone icon button"
                  onClick={() => {}}
                  iconType="phone"
                  variantType="subtle"
                  size="small"
                />
              </Box>
              <Box>
                <Button variantType="tertiary"> Button </Button>
                <Button variantType="primary" ml={2}>
                  Button
                </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card
        width="400px"
        footer={
          <CardFooter px={2} py={1}>
            <Box
              width="100%"
              alignItems="center"
              display="flex"
              justifyContent="center"
            >
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                variantType="tertiary"
                mr={2}
              >
                Edit Button
              </Button>
              <Divider py={0} px={2} h={30} />
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                variantType="tertiary"
                ml={2}
              >
                Edit Button
              </Button>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card
        width="400px"
        footer={
          <CardFooter variant="transparent" px={2} py={1}>
            <Box
              width="100%"
              alignItems="center"
              display="flex"
              justifyContent="center"
            >
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                variantType="tertiary"
                mr={2}
              >
                Edit Button
              </Button>
              <Divider py={0} px={2} h={30} />
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                variantType="tertiary"
                ml={2}
              >
                Edit Button
              </Button>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card
        footer={
          <CardFooter p={2}>
            <Box display="flex" width="100%" justifyContent="center">
              <Link icon="link" href="https://carbon.sage.com/">
                View Stripe Dashboard
              </Link>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pb="32px">
          <Box flexGrow={1}>
            <Typography mt={2} mb={0} weight="medium" textAlign="center">
              Here is some text
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
MoreExamplesOfCardFooter.storyName = "More Examples of Card Footer";
