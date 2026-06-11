```tsx
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
```