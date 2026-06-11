```tsx
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
```