```tsx
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
```