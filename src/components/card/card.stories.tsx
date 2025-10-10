import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Card, CardRow, CardFooter, CardColumn, CardProps } from ".";

import Typography from "../typography";
import Heading from "../heading";
import Icon from "../icon";
import Link from "../link";
import Box from "../box";
import Button from "../button";
import Divider from "../divider";
import IconButton from "../icon-button";

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
            <Typography fontSize="16px" m={0} fontWeight="500">
              Body text
            </Typography>
            <Heading title="More text" headingType="h2" divider={false} />
            <Typography>Even more text</Typography>
          </CardColumn>
        </CardRow>
      </Card>
    );
  },
};
DefaultStory.storyName = "Default";

export const SmallSpacing: Story = () => {
  return (
    <Card
      spacing="small"
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
  );
};
SmallSpacing.storyName = "Small Spacing";

export const LargeSpacing: Story = () => {
  return (
    <Card
      spacing="large"
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
  );
};
LargeSpacing.storyName = "Large Spacing";

export const WithWidthProvided: Story = () => {
  return (
    <Card
      width="500px"
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
  );
};
WithWidthProvided.storyName = "With Width Provided";

export const WithCustomHeight: Story = () => {
  return (
    <Card
      height="500px"
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
  );
};
WithCustomHeight.storyName = "With Custom Height";

export const WithExtraRoundness: Story = () => {
  return (
    <Card
      roundness="large"
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
  );
};
WithExtraRoundness.storyName = "With Extra Roundness";

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
            <CardColumn>
              <Link href="https://carbon.sage.com/">Footer link</Link>
            </CardColumn>
          </CardFooter>
        }
      >
        <CardRow pt={3}>
          <CardColumn>
            <Typography fontSize="24px" m={0} fontWeight="bold">
              This Card is a button as it has an onClick prop
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        href="#"
        target="_blank"
        rel="noreferrer"
        aria-label="Card with anchor element"
        footer={
          <CardFooter>
            <CardColumn>
              <Link href="https://carbon.sage.com/">Footer link</Link>
            </CardColumn>
          </CardFooter>
        }
      >
        <CardRow pt={3}>
          <CardColumn>
            <Typography fontSize="24px" m={0} fontWeight="bold">
              This Card is a link as it has an href prop
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
    </Box>
  );
};
Interactive.parameters = { chromatic: { disableSnapshot: true } };
Interactive.storyName = "Interactive";

export const WithCustomBoxShadow: Story = () => {
  return (
    <Card
      boxShadow="boxShadow400"
      hoverBoxShadow="boxShadow200"
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
  );
};
WithCustomBoxShadow.storyName = "With Custom Box Shadow";

export const DifferentCardRowPadding: Story = () => {
  return (
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
      <CardRow pt={2} pb={0}>
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
      <CardRow pt={0} pb={4}>
        <CardColumn>
          <Typography fontSize="16px" m={0} fontWeight="500">
            Body text
          </Typography>
          <Heading title="More text" headingType="h2" divider={false} />
          <Typography>Even more text</Typography>
        </CardColumn>
      </CardRow>
      <CardRow pt={0} pb={4}>
        <CardColumn>
          <Typography fontSize="16px" m={0} fontWeight="500">
            Body text
          </Typography>
          <Heading title="More text" headingType="h2" divider={false} />
          <Typography>Even more text</Typography>
        </CardColumn>
      </CardRow>
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
                <Button p={0} buttonType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button buttonType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        footer={
          <CardFooter px={2} py={1}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} buttonType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button buttonType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        footer={
          <CardFooter px={3} py={1}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} buttonType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button buttonType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        footer={
          <CardFooter px={4} py={1}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} buttonType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button buttonType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        footer={
          <CardFooter px={5} py={1}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} buttonType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button buttonType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
      <Card
        footer={
          <CardFooter px={5} py={2}>
            <Box width="100%" display="flex" justifyContent="space-around">
              <Box flexGrow={1}>
                <Button p={0} buttonType="tertiary" iconType="edit">
                  Edit Button
                </Button>
              </Box>
              <Box>
                <Button buttonType="primary"> Button </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
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
                <IconButton aria-label="Phone icon button" onClick={() => {}}>
                  <Icon bgSize="medium" type="phone" />
                </IconButton>
                <IconButton aria-label="Phone icon button" onClick={() => {}}>
                  <Icon bgSize="medium" type="phone" />
                </IconButton>
                <IconButton aria-label="Phone icon button" onClick={() => {}}>
                  <Icon bgSize="medium" type="phone" />
                </IconButton>
                <IconButton aria-label="Phone icon button" onClick={() => {}}>
                  <Icon bgSize="medium" type="phone" />
                </IconButton>
              </Box>
              <Box>
                <Button buttonType="tertiary"> Button </Button>
                <Button buttonType="primary" ml={2}>
                  Button
                </Button>
              </Box>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
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
                buttonType="tertiary"
              >
                Edit Button
              </Button>
              <Divider py={0} px={2} h={30} />
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                buttonType="tertiary"
                ml={2}
              >
                Edit Button
              </Button>
              <Divider py={0} px={2} h={30} />
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                buttonType="tertiary"
                ml={2}
              >
                Edit Button
              </Button>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
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
                buttonType="tertiary"
              >
                Edit Button
              </Button>
              <Divider py={0} px={2} h={30} />
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                buttonType="tertiary"
                ml={2}
              >
                Edit Button
              </Button>
              <Divider py={0} px={2} h={30} />
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                buttonType="tertiary"
                ml={2}
              >
                Edit Button
              </Button>
            </Box>
          </CardFooter>
        }
      >
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
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
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="500">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
      </Card>
    </Box>
  );
};
MoreExamplesOfCardFooter.storyName = "More Examples of Card Footer";

export const WithStringAsChild: Story = () => {
  return <Card>String passed as child</Card>;
};
WithStringAsChild.parameters = { chromatic: { disableSnapshot: true } };
WithStringAsChild.storyName = "With String as Child";
