import React, { useState } from "react";
import { Card, CardRow, CardFooter, CardColumn, CardProps } from ".";
import Link from "../link";
import Heading from "../heading";
import Typography from "../typography";
import Icon from "../icon";
import Box from "../box";
import Button from "../button";
import IconButton from "../icon-button";
import Divider from "../divider";

export const CardComponent = (props: Partial<CardProps>) => {
  return (
    <Card
      {...props}
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
    </Card>
  );
};

export const SmallSpacing = () => (
  <Card spacing="small">
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

export const LargeSpacing = () => (
  <Card spacing="large">
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

export const WithWidthProvided = () => (
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
        <Typography fontSize="16px" m={0} fontWeight="bold">
          Body text
        </Typography>
        <Heading title="More text" divider={false} />
        <Typography>Even more text</Typography>
      </CardColumn>
    </CardRow>
  </Card>
);

export const WithCustomHeight = (props: Partial<CardProps>) => (
  <Card height="500px" {...props}>
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

export const WithCustomBoxShadow = () => (
  <Card boxShadow="boxShadow400" hoverBoxShadow="boxShadow200">
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

export const DifferentCardFooterPadding = () => {
  return (
    <Box>
      <Card>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
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
      </Card>
      <Card>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
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
      </Card>
      <Card>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
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
      </Card>
      <Card>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
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
      </Card>
      <Card>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
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
      </Card>
      <Card>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
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
      </Card>
    </Box>
  );
};

export const DifferentCardRowPadding = () => {
  return (
    <Card>
      <CardRow pt={2} pb={0}>
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
      <CardRow pt={0} pb={4}>
        <CardColumn>
          <Typography fontSize="16px" m={0} fontWeight="bold">
            Stripe Balance
          </Typography>
          <Heading title="£ 0.00" divider={false} />
          <Typography>LAST ENTRY: 5 DAYS AGO</Typography>
        </CardColumn>
      </CardRow>
      <CardRow pt={0} pb={4}>
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

export const MoreExamplesOfCardFooter = () => {
  return (
    <Box>
      <Card>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
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
      </Card>
      <Card width="400px">
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
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
      </Card>
      <Card width="400px">
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
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
      </Card>
      <Card>
        <CardRow>
          <CardColumn>
            <Typography fontSize="16px" mt={2} mb={0} fontWeight="bold">
              Here is some text
            </Typography>
          </CardColumn>
        </CardRow>
        <CardFooter p={2}>
          <Box display="flex" width="100%" justifyContent="center">
            <Link icon="link" href="https://carbon.sage.com/">
              View Stripe Dashboard
            </Link>
          </Box>
        </CardFooter>
      </Card>
    </Box>
  );
};

export const WithStringAsChild = () => {
  return <Card>String passed as child</Card>;
};
