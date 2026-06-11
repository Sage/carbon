```tsx
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
```