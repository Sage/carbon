import React, { useState } from "react";
import { Card, CardFooter, CardProps } from ".";
import Link from "../link";
import Typography from "../typography";
import Icon from "../icon";
import Box from "../box";
import Button from "../button/__next__";
import Divider from "../divider";

export const CardComponent = (props: Partial<CardProps>) => {
  return (
    <Card
      {...props}
      footer={
        <CardFooter>
          <Box pl="16px" pr="16px" pt="24px" pb="24px" flexGrow={1}>
            <Typography mb="0" textAlign="center">
              <Link icon="link" href="https://carbon.sage.com/">
                View Stripe Dashboard
              </Link>
            </Typography>
          </Box>
        </CardFooter>
      }
    >
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h1">Stripe - [account name]</Typography>
          <Typography size="L" m={0}>
            user.name@sage.com
          </Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
      <Box display="flex" pt="24px" pb="24px">
        <Box flexGrow={1}>
          <Typography m={0} weight="medium">
            Stripe Balance
          </Typography>
          <Typography variant="h2">£ 0.00</Typography>
          <Typography>LAST ENTRY: 15 DAYS AGO</Typography>
        </Box>
      </Box>
    </Card>
  );
};

export const SmallSpacing = () => (
  <Card
    spacing="small"
    footer={
      <CardFooter>
        <Box pl="16px" pr="16px" pt="24px" pb="24px" flexGrow={1}>
          <Typography mb="0" textAlign="center">
            <Link icon="link" href="https://carbon.sage.com/">
              View Stripe Dashboard
            </Link>
          </Typography>
        </Box>
      </CardFooter>
    }
  >
    <Box display="flex">
      <Box flexGrow={1}>
        <Typography variant="h1">Stripe - [account name]</Typography>
        <Typography size="L" m={0}>
          user.name@sage.com
        </Typography>
      </Box>
      <Box flexGrow={1} display="flex" justifyContent="flex-end">
        <Icon type="image" />
      </Box>
    </Box>
    <Box display="flex" pt="var(--spacing200)" pb="var(--spacing200)">
      <Box flexGrow={1}>
        <Typography m={0} weight="medium">
          Stripe Balance
        </Typography>
        <Typography variant="h2">£ 0.00</Typography>
        <Typography>LAST ENTRY: 15 DAYS AGO</Typography>
      </Box>
    </Box>
  </Card>
);

export const LargeSpacing = () => (
  <Card
    spacing="large"
    footer={
      <CardFooter>
        <Box pl="16px" pr="16px" pt="24px" pb="24px" flexGrow={1}>
          <Typography mb="0" textAlign="center">
            <Link icon="link" href="https://carbon.sage.com/">
              View Stripe Dashboard
            </Link>
          </Typography>
        </Box>
      </CardFooter>
    }
  >
    <Box display="flex">
      <Box flexGrow={1}>
        <Typography variant="h1">Stripe - [account name]</Typography>
        <Typography size="L" m={0}>
          user.name@sage.com
        </Typography>
      </Box>
      <Box flexGrow={1} display="flex" justifyContent="flex-end">
        <Icon type="image" />
      </Box>
    </Box>
    <Box display="flex" pt="32px" pb="32px">
      <Box flexGrow={1}>
        <Typography m={0} weight="medium">
          Stripe Balance
        </Typography>
        <Typography variant="h2">£ 0.00</Typography>
        <Typography>LAST ENTRY: 15 DAYS AGO</Typography>
      </Box>
    </Box>
  </Card>
);

export const WithWidthProvided = () => (
  <Card
    width="500px"
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
    <Box display="flex" pt="32px" pb="32px">
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

export const WithCustomHeight = (props: Partial<CardProps>) => (
  <Card
    height="500px"
    {...props}
    footer={
      <CardFooter>
        <Box pl="16px" pr="16px" pt="24px" pb="24px" flexGrow={1}>
          <Typography mb="0" textAlign="center">
            <Link icon="link" href="https://carbon.sage.com/">
              View Stripe Dashboard
            </Link>
          </Typography>
        </Box>
      </CardFooter>
    }
  >
    <Box display="flex">
      <Box flexGrow={1}>
        <Typography variant="h1">Stripe - [account name]</Typography>
        <Typography size="L" m={0}>
          user.name@sage.com
        </Typography>
      </Box>
      <Box flexGrow={1} display="flex" justifyContent="flex-end">
        <Icon type="image" />
      </Box>
    </Box>
    <Box display="flex" pt="24px" pb="24px">
      <Box flexGrow={1}>
        <Typography m={0} weight="medium">
          Stripe Balance
        </Typography>
        <Typography variant="h2">£ 0.00</Typography>
        <Typography>LAST ENTRY: 15 DAYS AGO</Typography>
      </Box>
    </Box>
  </Card>
);

export const DifferentCardFooterPadding = () => {
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

export const DifferentCardRowPadding = () => {
  return (
    <Card
      footer={
        <CardFooter>
          <Box pl="16px" pr="16px" pt="24px" pb="24px" flexGrow={1}>
            <Typography mb="0" textAlign="center">
              <Link icon="link" href="https://carbon.sage.com/">
                View Stripe Dashboard
              </Link>
            </Typography>
          </Box>
        </CardFooter>
      }
    >
      <Box display="flex" pt={2} pb={0}>
        <Box flexGrow={1}>
          <Typography variant="h1">Stripe - [account name]</Typography>
          <Typography size="L" m={0}>
            user.name@sage.com
          </Typography>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Icon type="image" />
        </Box>
      </Box>
      <Box display="flex" pt={0} pb={4}>
        <Box flexGrow={1}>
          <Typography m={0} weight="medium">
            Stripe Balance
          </Typography>
          <Typography variant="h2">£ 0.00</Typography>
          <Typography>LAST ENTRY: 5 DAYS AGO</Typography>
        </Box>
      </Box>
      <Box display="flex" pt={0} pb={4}>
        <Box flexGrow={1}>
          <Typography m={0} weight="medium">
            Stripe Balance
          </Typography>
          <Typography variant="h2">£ 0.00</Typography>
          <Typography>LAST ENTRY: 15 DAYS AGO</Typography>
        </Box>
      </Box>
    </Card>
  );
};

export const Interactive = () => {
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
            <Box pl="16px" pr="16px" pt="24px" pb="24px" flexGrow={1}>
              <Typography mb="0" textAlign="center">
                <Link href="https://carbon.sage.com/">Footer link</Link>
              </Typography>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pt={3}>
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
            <Box pl="16px" pr="16px" pt="24px" pb="24px" flexGrow={1}>
              <Typography mb="0" textAlign="center">
                <Link href="https://carbon.sage.com/">Footer link</Link>
              </Typography>
            </Box>
          </CardFooter>
        }
      >
        <Box display="flex" pt={3}>
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

export const MoreExamplesOfCardFooter = () => {
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
                />
                <Button
                  aria-label="Phone icon button"
                  onClick={() => {}}
                  iconType="phone"
                  variantType="subtle"
                  size="small"
                />
                <Button
                  aria-label="Phone icon button"
                  onClick={() => {}}
                  iconType="phone"
                  variantType="subtle"
                  size="small"
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

export const WithStringAsChild = () => {
  return <Card>String passed as child</Card>;
};
